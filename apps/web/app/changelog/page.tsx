import type { Metadata } from "next";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  RiBracesLine,
  RiGithubFill,
  RiMarkdownLine,
  RiRssLine,
} from "@remixicon/react";

import { ChangelogFilter } from "@/components/changelog/changelog-filter";
import { Release } from "@/components/changelog/release";
import { baseOptions } from "@/lib/layout.shared";
import {
  changelogPackage,
  formatReleaseDate,
  getReleases,
  links,
} from "@/lib/changelog";

const description =
  "Every consumer-facing change to Faber UI, generated from changesets on release. Each entry links to the commit and pull request that shipped it.";

export const metadata: Metadata = {
  title: "Changelog",
  description,
  alternates: {
    canonical: "/changelog",
    types: {
      "application/rss+xml": [{ url: "/changelog/rss.xml", title: "Faber UI" }],
      "application/json": "/changelog.json",
      "text/markdown": "/changelog.md",
    },
  },
  openGraph: { title: "Faber UI changelog", description, url: "/changelog" },
};

const FEEDS = [
  { label: "RSS", href: "/changelog/rss.xml", icon: RiRssLine },
  { label: "JSON", href: "/changelog.json", icon: RiBracesLine },
  { label: "Markdown", href: "/changelog.md", icon: RiMarkdownLine },
];

export default async function ChangelogPage() {
  const releases = await getReleases();
  const [latest] = releases;
  const entries = releases.flatMap((release) => release.entries);
  const components = [
    ...new Set(entries.flatMap((e) => e.components.map((c) => c.name))),
  ].sort((a, b) => a.localeCompare(b));

  const stats = [
    { label: "Latest", value: latest ? `v${latest.version}` : "—" },
    {
      label: "Released",
      value: latest?.date ? formatReleaseDate(latest.date) : "—",
    },
    { label: "Releases", value: String(releases.length) },
    { label: "Changes", value: String(entries.length) },
  ];

  return (
    <HomeLayout {...baseOptions()}>
      <main className="w-full pb-32">
        <section className="relative isolate overflow-hidden border-b">
          <div
            className="pointer-events-none absolute inset-0 -z-10 dot-field opacity-50"
            aria-hidden
          />
          <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12 sm:pt-24">
            <p className="font-mono text-xs text-muted-foreground">
              {changelogPackage}
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl/display font-semibold tracking-display text-balance sm:text-5xl/display">
              Every change,{" "}
              <em className="font-serif text-primary italic">on the record</em>.
            </h1>
            <p className="mt-5 max-w-2xl text-base/body text-pretty text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {FEEDS.map((feed) => (
                <a
                  key={feed.href}
                  href={feed.href}
                  className="inline-flex h-8 press items-center gap-1.5 rounded-md border bg-surface-2/60 px-3 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <feed.icon className="size-3.5 text-muted-foreground" />
                  {feed.label}
                </a>
              ))}
              <a
                href={`${links.repo}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RiGithubFill className="size-3.5" />
                GitHub releases
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface-2 px-5 py-4">
                  <dt className="text-2xs font-medium tracking-caps text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 font-mono text-lg font-semibold tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="sticky top-14 z-10 -mx-6 border-b bg-background/85 px-6 py-3 backdrop-blur-md">
            <ChangelogFilter
              entries={entries.map((entry) => ({
                type: entry.type,
                components: entry.components.map((c) => c.name),
              }))}
              components={components}
            />
          </div>

          <ol data-changelog-list aria-label="Releases">
            {releases.map((release, index) => (
              <Release
                key={release.version}
                release={release}
                latest={index === 0}
              />
            ))}
          </ol>
          <p
            data-changelog-empty
            className="hidden py-16 text-center text-sm text-muted-foreground"
          >
            No changes match this filter.
          </p>

          <p className="mt-6 border-t pt-6 text-xs text-muted-foreground">
            Generated from{" "}
            <a
              href={links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline-offset-4 hover:text-foreground hover:underline"
            >
              packages/ui/CHANGELOG.md
            </a>
            . Versioning follows semver: minor releases carry changes consumers
            must adapt to, patches are fixes and additions.
          </p>
        </div>
      </main>
    </HomeLayout>
  );
}
