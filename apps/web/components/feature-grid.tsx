import { RiRobot2Line } from "@remixicon/react";

const BRAND_HUES = [
  "amber",
  "azure",
  "blue",
  "cyan",
  "emerald",
  "indigo",
  "lime",
  "magenta",
  "mono",
  "orange",
  "rose",
  "teal",
  "violet",
] as const;

const AGENT_SURFACES = [
  { path: "/llms.txt", note: "index" },
  { path: "/llms-full.txt", note: "whole corpus" },
  { path: "/llms.mdx/docs/*", note: "any page as raw markdown" },
  { path: "/r/<name>.json", note: "installable by URL" },
];

/* Counted from the source: theme axes in presets.css, logical utilities and
 * rtl: variants across src/components, tokens in semantic.css. */
const SPECS = [
  {
    term: "1,170 themes",
    swatches: true,
    detail:
      "13 brand hues, 5 neutrals, 6 radii and 3 densities compose from data-* attributes on the root element. No rebuild, no per-component overrides.",
  },
  {
    term: "Bidirectional",
    detail:
      "147 logical-property utilities and 40 direction-aware variants. Nothing hardcodes left or right, so RTL mirrors without a second stylesheet.",
  },
  {
    term: "Motion under contract",
    detail:
      "Components never hardcode a millisecond. Reduced-motion collapses distance and overshoot while keeping the opacity that aids comprehension.",
  },
  {
    term: "Accessible by inheritance",
    detail:
      "Focus management, roles and keyboard behaviour come from Base UI primitives rather than being reimplemented per component.",
  },
  {
    term: "Perceptual colour",
    detail:
      "122 semantic tokens resolve from an oklch ramp, so contrast holds at every brand, neutral and density combination.",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="group ring-glow relative overflow-hidden rounded-xl border bg-surface-2 p-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md border bg-background text-primary [&_svg]:size-3.5">
            <RiRobot2Line />
          </span>
          <span className="text-2xs font-medium tracking-caps text-muted-foreground uppercase">
            AI first
          </span>
        </div>

        <h3 className="mt-4 font-heading text-lg font-medium tracking-subheading text-balance">
          Agents read this library the way they read your code.
        </h3>
        <p className="mt-2 text-sm/relaxed text-pretty text-muted-foreground">
          Machine-addressable by design, not by scraper. Point a model at a path
          and it gets the real source, not rendered HTML.
        </p>

        <ul className="mt-5 space-y-1.5">
          {AGENT_SURFACES.map((surface) => (
            <li
              key={surface.path}
              className="flex items-baseline gap-2 text-xs"
            >
              <code className="rounded-sm bg-background px-1.5 py-0.5 font-mono text-2xs text-foreground">
                {surface.path}
              </code>
              <span className="text-muted-foreground">{surface.note}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted-foreground">
          The shadcn MCP server ships wired up in{" "}
          <code className="font-mono text-2xs">.vscode/mcp.json</code>, so an
          agent in your editor installs a component without leaving the chat.
        </p>
      </div>

      <dl className="divide-y">
        {SPECS.map((spec) => (
          <div key={spec.term} className="py-4 first:pt-0 last:pb-0">
            <dt className="flex flex-wrap items-center gap-3 font-heading text-sm font-medium tracking-subheading">
              {spec.term}
              {spec.swatches ? (
                <span
                  className="flex flex-wrap gap-1"
                  role="img"
                  aria-label="13 brand hues"
                >
                  {BRAND_HUES.map((hue) => (
                    <span
                      key={hue}
                      data-brand={hue}
                      className="size-3 rounded-full bg-primary ring-1 ring-foreground/10"
                    />
                  ))}
                </span>
              ) : null}
            </dt>
            <dd className="mt-1 text-sm/relaxed text-pretty text-muted-foreground">
              {spec.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
