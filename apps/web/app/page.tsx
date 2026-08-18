import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RiArrowRightLine, RiGithubFill } from "@remixicon/react";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { CopyButton } from "@/components/copy-button";

const INSTALL_COMMAND = "pnpm dlx shadcn@latest add button";

const USAGE = `import { Button } from "@workspace/ui/components/button";

export function Example() {
  return <Button>Continue</Button>;
}`;

/** Read from the page tree so it cannot go stale. */
function getComponents() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === "components" && page.slugs.length > 1)
    .map((page) => ({ title: page.data.title, url: page.url }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default function Page() {
  const components = getComponents();

  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto w-full max-w-4xl px-6 pb-32 pt-20 sm:pt-28">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-display leading-display text-balance">
            Components you own outright.
          </h1>
          <p className="mt-5 text-lg leading-body text-pretty text-muted-foreground">
            {components.length} React components built on Base UI primitives and
            Tailwind CSS v4, with a shadcn-compatible variant API. The source is
            copied into your repository, so there is no runtime dependency to
            upgrade and nothing to override when a design changes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/docs"
              className="press inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Documentation
              <RiArrowRightLine className="size-4" />
            </Link>
            <a
              href="https://github.com/SujalXplores/faber-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RiGithubFill className="size-4" />
              Source
            </a>
          </div>
        </header>
        <section className="mt-16" aria-labelledby="install-heading">
          <h2
            id="install-heading"
            className="text-xs font-medium uppercase tracking-caps text-muted-foreground"
          >
            Add a component
          </h2>

          <div className="mt-3 flex items-center gap-2 rounded-lg border bg-surface-2 py-1.5 pe-1.5 ps-4">
            <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground scrollbar-subtle">
              <span className="select-none text-muted-foreground">$ </span>
              {INSTALL_COMMAND}
            </code>
            <CopyButton value={INSTALL_COMMAND} label="Copy install command" />
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Run from{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              packages/ui
            </code>
            . The source lands in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              src/components/
            </code>{" "}
            and the export map updates itself.
          </p>
        </section>
        <section className="mt-12" aria-labelledby="usage-heading">
          <h2
            id="usage-heading"
            className="text-xs font-medium uppercase tracking-caps text-muted-foreground"
          >
            Then import it
          </h2>

          <pre className="mt-3 overflow-x-auto rounded-lg border bg-surface-2 p-4 font-mono text-sm leading-relaxed scrollbar-subtle">
            <code>{USAGE}</code>
          </pre>
        </section>
        <section className="mt-16" aria-labelledby="index-heading">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="index-heading"
              className="text-xs font-medium uppercase tracking-caps text-muted-foreground"
            >
              All components
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {components.length}
            </span>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-x-8 border-t sm:grid-cols-3 lg:grid-cols-4">
            {components.map((component) => (
              <li key={component.url} className="border-b">
                <Link
                  href={component.url}
                  className="group flex items-center justify-between gap-2 py-2.5 text-sm transition-colors hover:text-primary"
                >
                  <span className="truncate">{component.title}</span>
                  <RiArrowRightLine
                    className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-[opacity,transform] pointer-fine:group-hover:translate-x-0.5 pointer-fine:group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16 border-t pt-6">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
            {[
              ["Primitives", "Base UI"],
              ["Styling", "Tailwind CSS v4"],
              ["Icons", "Remixicon"],
              ["Direction", "LTR and RTL"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-caps text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </HomeLayout>
  );
}
