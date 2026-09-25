import Link from "next/link";
import { RiHistoryLine } from "@remixicon/react";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

function ChangelogLink() {
  return (
    <Link
      href="/changelog"
      className="text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-accent-foreground mt-2 flex items-center gap-2 rounded-lg p-2 text-sm transition-colors [&_svg]:size-4"
    >
      <RiHistoryLine aria-hidden />
      Changelog
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      /* The shared nav links also render at the top of the docs sidebar,
       * where "Docs" duplicates "Introduction" (both go to /docs) while
       * staying highlighted on every page, and "Components" duplicates the
       * folder below it. The page tree already reaches every destination and
       * the logo links home, so the docs sidebar drops them. The changelog is
       * outside the page tree, so it sits in the sidebar footer instead. */
      links={[]}
      sidebar={{
        collapsible: true,
        defaultOpenLevel: 1,
        footer: <ChangelogLink />,
      }}
      data-scroll-behavior="smooth"
    >
      {children}
    </DocsLayout>
  );
}
