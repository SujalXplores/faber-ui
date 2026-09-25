import Link from "next/link";

import { BumpBadge } from "@/components/changelog/release";
import {
  changelogRoute,
  formatReleaseDate,
  getComponentHistory,
} from "@/lib/changelog";

export const componentHistoryAnchor = "changelog";

export async function ComponentHistory({
  componentName,
}: {
  componentName: string;
}) {
  const history = await getComponentHistory(componentName);
  if (history.length === 0) return null;

  return (
    <section
      aria-labelledby={componentHistoryAnchor}
      className="not-prose mt-12 border-t pt-8"
    >
      <h2
        id={componentHistoryAnchor}
        className="scroll-mt-24 text-lg font-semibold tracking-subheading"
      >
        Changelog
      </h2>
      <ol className="mt-4 flex flex-col">
        {history.map(({ release, entry }) => (
          <li key={entry.id} className="border-b last:border-b-0">
            <Link
              href={`${changelogRoute}#${entry.id}`}
              className="group grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-3 text-sm sm:grid-cols-[4.5rem_1fr_auto]"
            >
              <span className="font-mono text-xs font-medium text-foreground">
                v{release.version}
              </span>
              <span className="text-pretty text-muted-foreground transition-colors group-hover:text-foreground">
                {entry.headline}
              </span>
              <span className="col-start-2 flex items-center gap-2 sm:col-start-auto">
                <BumpBadge type={entry.type} />
                {release.date ? (
                  <time
                    dateTime={release.date}
                    className="text-xs whitespace-nowrap text-muted-foreground tabular-nums"
                  >
                    {formatReleaseDate(release.date)}
                  </time>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href={`${changelogRoute}?component=${encodeURIComponent(componentName)}`}
        className="mt-3 inline-block text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Full {componentName} history
      </Link>
    </section>
  );
}
