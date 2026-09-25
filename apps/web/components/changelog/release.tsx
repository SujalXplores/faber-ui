import Link from "next/link";
import {
  RiArrowLeftRightLine,
  RiGitCommitLine,
  RiGitPullRequestLine,
  RiGithubFill,
  RiHashtag,
} from "@remixicon/react";

import { cn } from "@workspace/ui/lib/utils";

import { EntryBody } from "@/components/changelog/entry-body";
import {
  formatReleaseDate,
  links,
  releaseAnchor,
  type BumpType,
  type ChangelogEntry,
  type Release as ReleaseData,
} from "@/lib/changelog";

const SECTION_ORDER: BumpType[] = ["major", "minor", "patch"];

const SECTION_LABEL: Record<BumpType, string> = {
  major: "Major changes",
  minor: "Minor changes",
  patch: "Patch changes",
};

const BUMP_STYLE: Record<BumpType, string> = {
  major: "bg-destructive-subtle text-destructive-subtle-foreground",
  minor: "bg-primary-subtle text-primary-subtle-foreground",
  patch: "bg-muted text-muted-foreground",
};

export function BumpBadge({
  type,
  className,
}: {
  type: BumpType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full px-2 font-mono text-2xs font-medium tracking-caps uppercase",
        BUMP_STYLE[type],
        className,
      )}
    >
      {type}
    </span>
  );
}

const metaLink =
  "inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground transition-colors hover:text-foreground";

function Entry({ entry }: { entry: ChangelogEntry }) {
  return (
    <li
      id={entry.id}
      data-changelog-entry
      data-type={entry.type}
      data-components={entry.components.map((c) => c.name).join(" ")}
      className="group/entry relative scroll-mt-32 border-t py-5 first:border-t-0 first:pt-0"
    >
      <EntryBody markdown={entry.markdown} />

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        {entry.commit ? (
          <a
            href={links.commit(entry.commit)}
            target="_blank"
            rel="noopener noreferrer"
            className={metaLink}
            aria-label={`Commit ${entry.commit}`}
          >
            <RiGitCommitLine className="size-3.5" aria-hidden />
            {entry.commit}
          </a>
        ) : null}
        {entry.pullRequest ? (
          <a
            href={links.pullRequest(entry.pullRequest)}
            target="_blank"
            rel="noopener noreferrer"
            className={metaLink}
            aria-label={`Pull request ${entry.pullRequest}`}
          >
            <RiGitPullRequestLine className="size-3.5" aria-hidden />#
            {entry.pullRequest}
          </a>
        ) : null}
        {entry.components.length ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Components">
            {entry.components.map((component) => (
              <li key={component.name}>
                <Link
                  href={component.url}
                  className="inline-flex h-5 items-center rounded-sm border bg-surface-2 px-1.5 font-mono text-2xs text-foreground/80 transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {component.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <a
          href={`#${entry.id}`}
          className={cn(
            metaLink,
            "ms-auto opacity-0 group-hover/entry:opacity-100 focus-visible:opacity-100",
          )}
          aria-label="Link to this change"
        >
          <RiHashtag className="size-3.5" aria-hidden />
        </a>
      </div>
    </li>
  );
}

export function Release({
  release,
  latest,
}: {
  release: ReleaseData;
  latest: boolean;
}) {
  const anchor = releaseAnchor(release.version);
  const sections = SECTION_ORDER.map((type) => ({
    type,
    entries: release.entries.filter((entry) => entry.type === type),
  })).filter((section) => section.entries.length > 0);

  return (
    <li
      id={anchor}
      data-changelog-release
      aria-labelledby={`${anchor}-heading`}
      className="relative grid scroll-mt-28 gap-x-10 gap-y-4 border-t py-10 first:border-t-0 md:grid-cols-[11rem_1fr]"
    >
      <header className="flex flex-col gap-2 self-start md:sticky md:top-32">
        <div className="flex items-center gap-2">
          <h2
            id={`${anchor}-heading`}
            className="font-mono text-xl font-semibold tracking-tight"
          >
            <a href={`#${anchor}`} className="hover:text-primary">
              v{release.version}
            </a>
          </h2>
          {latest ? (
            <span className="inline-flex h-5 items-center rounded-full border border-primary/30 px-2 text-2xs font-medium text-primary">
              Latest
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <BumpBadge type={release.type} />
          {release.date ? (
            <time dateTime={release.date} className="tabular-nums">
              {formatReleaseDate(release.date)}
            </time>
          ) : null}
        </div>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1.5 md:flex-col">
          <a
            href={links.release(release.version)}
            target="_blank"
            rel="noopener noreferrer"
            className={metaLink}
          >
            <RiGithubFill className="size-3.5" aria-hidden />
            Release notes
          </a>
          {release.previousVersion ? (
            <a
              href={links.compare(release.previousVersion, release.version)}
              target="_blank"
              rel="noopener noreferrer"
              className={metaLink}
            >
              <RiArrowLeftRightLine className="size-3.5" aria-hidden />
              {release.previousVersion}…{release.version}
            </a>
          ) : null}
        </div>
      </header>

      <div className="flex min-w-0 flex-col gap-8">
        {sections.map((section) => (
          <section
            key={section.type}
            data-changelog-section
            aria-label={SECTION_LABEL[section.type]}
          >
            <h3 className="mb-4 flex items-center gap-2 text-2xs font-medium tracking-caps text-muted-foreground uppercase">
              {SECTION_LABEL[section.type]}
              <span className="font-mono tabular-nums">
                {section.entries.length}
              </span>
            </h3>
            <ul>
              {section.entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </li>
  );
}
