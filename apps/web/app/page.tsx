import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  RiArrowRightLine,
  RiGithubFill,
  RiSparkling2Line,
} from "@remixicon/react";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { CopyButton } from "@/components/copy-button";
import { TechStack } from "@/components/tech-stack";
import { FeatureGrid } from "@/components/feature-grid";
import { ShowcaseLazy as Showcase } from "@/components/showcase-lazy";

const INSTALL_COMMAND =
  "pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json";

/* Every figure is counted from the source, not estimated: theme axes from
 * presets.css, tokens from semantic.css, entries from registry.json. */
function getStats(componentCount: number) {
  return [
    {
      label: "Components",
      value: String(componentCount),
      note: "documented and installable",
    },
    {
      label: "Themes",
      value: "1,170",
      note: "13 hues × 5 neutrals × 6 radii × 3 densities",
    },
    {
      label: "Semantic tokens",
      value: "122",
      note: "resolved from an oklch ramp",
    },
    {
      label: "Runtime deps",
      value: "0",
      note: "the source lives in your repo",
    },
  ];
}

/** Read from the page tree so it cannot go stale. */
function getComponents() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === "components" && page.slugs.length > 1)
    .map((page) => ({ title: page.data.title, url: page.url }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

function CodeWindow({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-surface-2">
      <div className="flex items-center gap-2 border-b bg-surface-3/40 py-2 ps-3.5 pe-1.5">
        <span className="flex-1 truncate font-mono text-2xs tracking-caps text-muted-foreground">
          {title}
        </span>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function Page() {
  const components = getComponents();
  const stats = getStats(components.length);

  return (
    <HomeLayout {...baseOptions()}>
      <main className="w-full pb-32">
        <section className="relative isolate overflow-hidden border-b">
          <div
            className="pointer-events-none absolute inset-0 -z-10 hero-glow"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 dot-field opacity-60"
            aria-hidden
          />
          <div className="mx-auto w-full max-w-4xl px-6 pt-20 pb-16 sm:pt-28">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-surface-2/60 py-1 ps-2 pe-3 text-xs font-medium text-muted-foreground">
              <RiSparkling2Line className="size-3.5 text-primary" />
              {components.length} components, MIT licensed
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl/display font-semibold tracking-display text-balance sm:text-5xl/display">
              Components you{" "}
              <em className="font-serif text-primary italic">own</em> outright.
            </h1>

            <p className="mt-5 max-w-2xl text-lg/body text-pretty text-muted-foreground">
              React components built on Base UI primitives and Tailwind CSS v4,
              with a shadcn-compatible variant API. The source is copied into
              your repository, so there is no runtime dependency to upgrade and
              nothing to override when a design changes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Link
                href="/docs"
                className="group inline-flex h-9 press items-center gap-1.5 rounded-md bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Documentation
                <RiArrowRightLine className="size-4 transition-transform pointer-fine:group-hover:translate-x-0.5" />
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

            <div className="mt-12">
              <p className="text-xs font-medium tracking-caps text-muted-foreground uppercase">
                Built on
              </p>
              <div className="mt-3">
                <TechStack />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-4xl px-6">
          <section
            className="mt-16 flex flex-col gap-4"
            aria-labelledby="quickstart-heading"
          >
            <h2 id="quickstart-heading" className="sr-only">
              Quickstart
            </h2>

            <CodeWindow
              title="terminal"
              action={
                <CopyButton
                  value={INSTALL_COMMAND}
                  label="Copy install command"
                />
              }
            >
              <div className="p-4">
                <code className="block scrollbar-subtle overflow-x-auto font-mono text-sm whitespace-nowrap text-foreground">
                  <span className="text-muted-foreground select-none">$ </span>
                  {INSTALL_COMMAND}
                </code>
              </div>
            </CodeWindow>
          </section>

          <p className="mt-4 text-sm text-muted-foreground">
            The CLI resolves its own dependencies, installs the npm packages it
            needs, and copies the source into{" "}
            <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-xs">
              components/ui/
            </code>
            . Every component is addressable the same way.
          </p>

          <section className="mt-16" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">
              By the numbers
            </h2>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface-2 p-5">
                  <dt className="text-2xs font-medium tracking-caps text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-heading text-2xl font-semibold tracking-display tabular-nums">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    {stat.note}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-20" aria-labelledby="showcase-heading">
            <h2
              id="showcase-heading"
              className="max-w-2xl font-heading text-2xl font-semibold tracking-display text-balance sm:text-3xl"
            >
              Every tile below is the{" "}
              <em className="font-serif text-primary italic">real</em>{" "}
              component.
            </h2>
            <p className="mt-3 max-w-2xl text-sm/relaxed text-pretty text-muted-foreground">
              Not a screenshot, not a video. Toggle the switch, drag the slider.
              This page runs the same source the CLI copies into your
              repository.
            </p>

            <div className="mt-8">
              <Showcase count={components.length} />
            </div>
          </section>

          <section className="mt-20" aria-labelledby="craft-heading">
            <h2
              id="craft-heading"
              className="max-w-2xl font-heading text-2xl font-semibold tracking-display text-balance sm:text-3xl"
            >
              Engineered to the point where you stop noticing it.
            </h2>
            <p className="mt-3 max-w-2xl text-sm/relaxed text-pretty text-muted-foreground">
              Every decision here is a token, a contract, or a deliberate
              omission. The pay-off is that a design change lands in one place,
              an agent can read the whole library without a browser, and nothing
              surprises you six months in.
            </p>

            <div className="mt-8">
              <FeatureGrid />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="index-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="index-heading"
                className="text-xs font-medium tracking-caps text-muted-foreground uppercase"
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
        </div>
      </main>
    </HomeLayout>
  );
}
