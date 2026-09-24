import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      /* The shared nav links also render at the top of the docs sidebar,
       * where "Docs" duplicates "Introduction" (both go to /docs) while
       * staying highlighted on every page, and "Components" duplicates the
       * folder below it. The page tree already reaches every destination and
       * the logo links home, so the docs sidebar drops them. */
      links={[]}
      sidebar={{
        collapsible: true,
        defaultOpenLevel: 1,
      }}
      data-scroll-behavior="smooth"
    >
      {children}
    </DocsLayout>
  );
}
