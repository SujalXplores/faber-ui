import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { gitConfig, source } from "@/lib/source";

export const siteUrl = "https://faber-ui.vercel.app";
export const changelogPackage = "@workspace/ui";
export const changelogRoute = "/changelog";

const CHANGELOG_FILE = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "ui",
  "CHANGELOG.md",
);

const VERSION_HEADING = /^## (\d+\.\d+\.\d+\S*)$/;
const SECTION_HEADING = /^### (Major|Minor|Patch) Changes$/;
const RELEASED_MARKER = /^<!-- released: (\d{4}-\d{2}-\d{2}) -->$/;
const ENTRY_REFERENCE = /^([0-9a-f]{7,40})(?: \(#(\d+)\))?: /;

export type BumpType = "major" | "minor" | "patch";

const BUMP_RANK: Record<BumpType, number> = { patch: 0, minor: 1, major: 2 };

export interface ComponentRef {
  name: string;
  url: string;
}

export interface ChangelogEntry {
  id: string;
  type: BumpType;
  commit?: string | undefined;
  pullRequest?: number | undefined;
  markdown: string;
  headline: string;
  components: ComponentRef[];
}

export interface Release {
  version: string;
  date?: string | undefined;
  type: BumpType;
  entries: ChangelogEntry[];
  components: ComponentRef[];
  previousVersion?: string | undefined;
}

const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function tagOf(version: string) {
  return `${changelogPackage}@${version}`;
}

export const links = {
  repo: repoUrl,
  commit: (sha: string) => `${repoUrl}/commit/${sha}`,
  pullRequest: (id: number) => `${repoUrl}/pull/${id}`,
  release: (version: string) =>
    `${repoUrl}/releases/tag/${encodeURIComponent(tagOf(version))}`,
  compare: (from: string, to: string) =>
    `${repoUrl}/compare/${encodeURIComponent(tagOf(from))}...${encodeURIComponent(tagOf(to))}`,
  source: `${repoUrl}/blob/${gitConfig.branch}/packages/ui/CHANGELOG.md`,
};

export function releaseAnchor(version: string) {
  return `v${version}`;
}

export function releaseUrl(version: string) {
  return `${changelogRoute}#${releaseAnchor(version)}`;
}

const getComponentMatcher = cache(() => {
  const components = source
    .getPages()
    .filter((page) => page.slugs[0] === "components" && page.slugs.length > 1)
    .map((page) => ({
      name: page.data.title.replace(/\s+/g, ""),
      url: page.url,
    }))
    .sort((a, b) => b.name.length - a.name.length);

  const byName = new Map(components.map((c) => [c.name, c]));
  const pattern = new RegExp(
    `\\b(${components.map((c) => c.name).join("|")})(?:[A-Z][A-Za-z]*)?\\b`,
    "g",
  );

  return { byName, pattern };
});

function componentsIn(markdown: string): ComponentRef[] {
  const { byName, pattern } = getComponentMatcher();
  const found = new Map<string, ComponentRef>();

  for (const match of markdown.matchAll(pattern)) {
    const component = byName.get(match[1]!);
    if (component) found.set(component.name, component);
  }

  return [...found.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function headlineOf(markdown: string) {
  const firstParagraph = markdown.split(/\n\s*\n/)[0] ?? markdown;
  const plain = firstParagraph
    .replace(/\s+/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
  const sentence = /^(.+?[.!?])(\s|$)/.exec(plain)?.[1] ?? plain;
  return sentence.length > 220 ? `${sentence.slice(0, 217)}…` : sentence;
}

function toEntry({
  lines,
  type,
  release,
}: {
  lines: string[];
  type: BumpType;
  release: Release;
}): ChangelogEntry {
  const body = lines
    .map((line, i) => (i === 0 ? line.slice(2) : line.replace(/^ {2}/, "")))
    .join("\n")
    .trim();

  const reference = ENTRY_REFERENCE.exec(body);
  const markdown = reference ? body.slice(reference[0].length) : body;

  return {
    id: `${releaseAnchor(release.version)}-${reference?.[1] ?? release.entries.length}`,
    type,
    commit: reference?.[1],
    pullRequest: reference?.[2] ? Number(reference[2]) : undefined,
    markdown,
    headline: headlineOf(markdown),
    components: componentsIn(markdown),
  };
}

type ParseState = {
  releases: Release[];
  section?: BumpType | undefined;
  entryLines?: string[] | undefined;
};

function flushEntry(state: ParseState) {
  const release = state.releases.at(-1);
  if (release && state.section && state.entryLines) {
    release.entries.push(
      toEntry({ lines: state.entryLines, type: state.section, release }),
    );
  }
  state.entryLines = undefined;
}

function startRelease(state: ParseState, version: string) {
  flushEntry(state);
  state.releases.push({ version, type: "patch", entries: [], components: [] });
  state.section = undefined;
}

function consumeReleaseLine(state: ParseState, release: Release, line: string) {
  const released = RELEASED_MARKER.exec(line.trim());
  const heading = SECTION_HEADING.exec(line);

  if (released) {
    const [, date] = released;
    release.date = date;
  } else if (heading) {
    flushEntry(state);
    state.section = heading[1]!.toLowerCase() as BumpType;
  } else if (state.section && line.startsWith("- ")) {
    flushEntry(state);
    state.entryLines = [line];
  } else if (state.entryLines) {
    state.entryLines.push(line);
  }
}

function consumeLine(state: ParseState, line: string) {
  const version = VERSION_HEADING.exec(line);
  const release = state.releases.at(-1);

  if (version) startRelease(state, version[1]!);
  else if (release) consumeReleaseLine(state, release, line);
}

function summarize(release: Release, previous: Release | undefined) {
  release.previousVersion = previous?.version;
  release.type = release.entries.reduce<BumpType>(
    (highest, entry) =>
      BUMP_RANK[entry.type] > BUMP_RANK[highest] ? entry.type : highest,
    "patch",
  );
  const components = new Map(
    release.entries.flatMap((entry) =>
      entry.components.map((c) => [c.name, c] as const),
    ),
  );
  release.components = [...components.values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function parseChangelog(text: string): Release[] {
  const state: ParseState = { releases: [] };

  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    consumeLine(state, line);
  }
  flushEntry(state);

  state.releases.forEach((release, index) =>
    summarize(release, state.releases[index + 1]),
  );

  return state.releases;
}

export const getChangelogSource = cache(() => readFile(CHANGELOG_FILE, "utf8"));

export const getReleases = cache(async () =>
  parseChangelog(await getChangelogSource()),
);

export async function getComponentHistory(componentName: string) {
  const releases = await getReleases();
  return releases.flatMap((release) =>
    release.entries
      .filter((entry) => entry.components.some((c) => c.name === componentName))
      .map((entry) => ({ release, entry })),
  );
}

export function formatReleaseDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function releasesToJson(releases: Release[]) {
  return {
    package: changelogPackage,
    homepage: `${siteUrl}${changelogRoute}`,
    source: links.source,
    latest: releases[0]?.version ?? null,
    releases: releases.map((release) => ({
      version: release.version,
      date: release.date ?? null,
      type: release.type,
      url: `${siteUrl}${releaseUrl(release.version)}`,
      githubRelease: links.release(release.version),
      compare: release.previousVersion
        ? links.compare(release.previousVersion, release.version)
        : null,
      components: release.components.map((c) => c.name),
      changes: release.entries.map((entry) => ({
        type: entry.type,
        headline: entry.headline,
        markdown: entry.markdown,
        commit: entry.commit ?? null,
        commitUrl: entry.commit ? links.commit(entry.commit) : null,
        pullRequest: entry.pullRequest ?? null,
        pullRequestUrl: entry.pullRequest
          ? links.pullRequest(entry.pullRequest)
          : null,
        components: entry.components.map((c) => ({
          name: c.name,
          url: `${siteUrl}${c.url}`,
        })),
      })),
    })),
  };
}

export function releasesToMarkdown(releases: Release[]) {
  const header = [
    `# ${changelogPackage} changelog`,
    "",
    `> Every consumer-facing change to Faber UI, newest first. Web: ${siteUrl}${changelogRoute} · JSON: ${siteUrl}/changelog.json · RSS: ${siteUrl}/changelog/rss.xml`,
  ];

  const body = releases.flatMap((release) => {
    const meta = [
      release.date ? `Released ${release.date}` : "Release date not recorded",
      `${release.type} release`,
      release.components.length
        ? `Components: ${release.components.map((c) => c.name).join(", ")}`
        : undefined,
    ].filter(Boolean);

    const entries = release.entries.map((entry) => {
      const refs = [
        entry.commit ? `[${entry.commit}](${links.commit(entry.commit)})` : "",
        entry.pullRequest
          ? `[#${entry.pullRequest}](${links.pullRequest(entry.pullRequest)})`
          : "",
      ]
        .filter(Boolean)
        .join(" ");
      const [first, ...rest] = entry.markdown.split("\n");
      return [
        `- **${entry.type}**${refs ? ` ${refs}` : ""}: ${first}`,
        ...rest.map((line) => (line ? `  ${line}` : line)),
      ].join("\n");
    });

    return [
      "",
      `## ${release.version}`,
      "",
      `_${meta.join(" · ")}_`,
      "",
      ...entries,
    ];
  });

  return [...header, ...body, ""].join("\n");
}
