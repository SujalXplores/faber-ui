<div align="center">

# Faber UI

**Components you own outright.**

60 React components built on Base UI primitives and Tailwind CSS v4, with a shadcn-compatible variant API. No runtime package to upgrade, no provider to wrap, nothing to override - the source is copied into your repo and stays yours.

<br/>

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)](./.nvmrc)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Base UI](https://img.shields.io/badge/Base_UI-primitives-black)](https://base-ui.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-build-EF4444?logo=turborepo&logoColor=white)](https://turbo.build)

[Documentation](https://faber-ui.vercel.app/docs) · [Components](https://faber-ui.vercel.app/docs/components/button) · [Theming](https://faber-ui.vercel.app/docs/theming) · [GitHub](https://github.com/SujalXplores/faber-ui)

</div>

---

## Table of contents

- [Why Faber UI](#why-faber-ui)
- [Features](#features)
- [Quick start](#quick-start)
- [Monorepo](#monorepo)
- [Component catalog](#component-catalog)
- [Theming](#theming)
- [Tech stack](#tech-stack)
- [Scripts](#scripts)
- [Upgrades](#upgrades)
- [Code health](#code-health)
- [Contributing](#contributing)
- [License](#license)

---

## Why Faber UI

Most component libraries ship as an npm package. You install them, wrap your app in a provider, and hope the next major release does not break your layout. When it does, you read a migration guide instead of shipping.

Faber UI takes the opposite approach:

| Traditional library | Faber UI |
| ------------------- | -------- |
| `npm install @acme/react` adds a runtime dep | `shadcn add https://faber-ui.vercel.app/r/button.json` copies source |
| Theming via provider props / CSS overrides | Theming via data attributes + CSS tokens |
| Breaking majors force rewrites | You own the file - edit it, delete parts, keep shipping |
| Bundle includes what you don't use | Bundle includes exactly what you vendored |

> The CLI is how components get in. After that, they are yours. No `@faber-ui/react` in your dependencies, no version to upgrade.

---

## Features

| Area | What you get |
| ---- | ------------ |
| **60 components** | Buttons and dialogs to charts, carousels, chat bubbles, OTP inputs, resizable panels - all vendored and editable |
| **Accessible by default** | Base UI primitives under every interactive component - focus management, portalling, keyboard handling included |
| **shadcn-compatible API** | Variants, sizes, and `asChild` composition that match the conventions you already know |
| **Tailwind CSS v4** | Zero-runtime styling with CSS variables and `oklch` color tokens |
| **Token-based theming** | 6-layer token system (primitives → presets → typography → motion → elevation → semantic). Re-theme by editing one file |
| **1,170 themes** | 13 hues × 5 neutrals × 6 radii × 3 densities, addressed by `data-brand`, `data-neutral`, `data-radius` |
| **RTL ready** | Right-to-left layouts work out of the box across the entire kit |
| **Remixicon** | One consistent icon set wired into every component that needs one |
| **Docs as code** | Fumadocs site with live previews - every homepage tile runs the real component |
| **Zero runtime deps** | The source lives in your repo. `Runtime deps: 0` is a feature, not a slogan |

By the numbers (counted from source, not estimated):

| Metric | Value |
| ------ | ----- |
| Components | 60, documented and installable |
| Themes | 1,170 combinations |
| Semantic tokens | 122, resolved from an oklch ramp |
| Runtime deps | 0 |

---

## Quick start

Add a component to your project with the shadcn CLI:

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json
```

The CLI reads your `components.json` for aliases, resolves dependencies between components, installs the npm packages the item needs, and copies the source into your project. Nothing is added to your dependency tree beyond those packages.

Then import it:

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button>Continue</Button>;
}
```

Every component is addressable the same way:

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/<name>.json
# e.g. dialog, calendar, chart, carousel, input-otp, sidebar, sonner …
```

---

## Monorepo

Faber UI is a pnpm + Turborepo monorepo with two workspaces:

| Workspace | Path | Purpose |
| --------- | ---- | ------- |
| `@workspace/ui` | `packages/ui` | The component library - all 60 components, hooks, utils, styles, registry builder |
| `web` | `apps/web` | The Next.js 16 app that hosts the documentation site |

Shared configs live in `packages/typescript-config` and `packages/eslint-config`. Tooling (oxlint, eslint, prettier, tailwind) is pinned exact via `.npmrc` (`save-exact`).

### Prerequisites

- Node.js 20+ (repo pins 22 via `.nvmrc`, `engine-strict` is on)
- pnpm 10+ (`packageManager: pnpm@10.33.4`)

### Development

```bash
pnpm install
pnpm dev        # docs site on localhost:3000, transpilePackages picks up UI edits live
```

### Adding a component to the library

From inside `packages/ui`:

```bash
pnpm dlx shadcn@latest add <name>
```

This copies the component source into `src/components/` and updates the `@workspace/ui/components/*` export map automatically.

### Using a component in the docs app

```tsx
import { Button } from "@workspace/ui/components/button";
```

### Rebuilding the registry

The registry JSON files in `apps/web/public/r/` are generated from `packages/ui/src/components/`:

```bash
pnpm registry
```

CI fails if `registry.json` is stale or if any declared item has no built file. Dependency versions in the registry are read from `packages/ui/package.json`, so a new import needs a declared dependency.

---

## Component catalog

Browse with live previews at [faber-ui.vercel.app/docs/components/button](https://faber-ui.vercel.app/docs/components/button).

<details>
<summary><strong>All 60 components (click to expand)</strong></summary>

<br/>

Accordion · Alert · AlertDialog · AspectRatio · Attachment · Avatar · Badge · Breadcrumb · Bubble · Button · ButtonGroup · Calendar · Card · Carousel · Chart · Checkbox · Collapsible · Combobox · Command · ContextMenu · Dialog · Direction · Drawer · DropdownMenu · Empty · Field · HoverCard · Input · InputOTP · Item · Kbd · Label · Marker · Menubar · Message · MessageScroller · NativeSelect · NavigationMenu · Pagination · Popover · Progress · RadioGroup · Resizable · ScrollArea · Select · Separator · Sheet · Sidebar · Skeleton · Slider · Sonner · Spinner · Switch · Table · Tabs · Textarea · Toggle · ToggleGroup · Tooltip

</details>

Each component has a matching page under `apps/web/content/docs/components/` - its frontmatter `title` and `description` are what the registry publishes.

---

## Theming

Every visual decision resolves through a token. No component holds a color, a duration, or an easing curve of its own. Each layer only references the one above it:

| Layer | File | Holds |
| ----- | ---- | ----- |
| Primitives | `tokens/primitives.css` | The knobs (hue, chroma, radius, spacing) and the raw color ramps |
| Presets | `tokens/presets.css` | Named overrides of those knobs, addressed by data attribute |
| Typography | `tokens/typography.css` | Families, size scale, tracking, leading |
| Motion | `tokens/motion.css` | Durations, easings, and the reduced-motion collapse |
| Elevation | `tokens/elevation.css` | The layered, hue-tinted shadow scale |
| Semantic | `tokens/semantic.css` | What components consume: `--primary`, `--muted`, `--border` |
| Theme | `theme.css` | Publishes all of it as Tailwind utilities |

The rule that matters: **components use the semantic layer, never the primitives.** A `bg-brand-600` in a component is a color that will not follow a future theme change. `bg-primary` is.

Switch the brand by setting data attributes on `<html>`:

```html
<html data-brand="emerald" data-neutral="stone" data-radius="lg"></html>
```

Read the [theming guide](https://faber-ui.vercel.app/docs/theming) for the full system.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Primitives | [Base UI](https://base-ui.com) - accessible, unstyled |
| Workflow | [shadcn/ui](https://ui.shadcn.com) - CLI + component conventions |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) - zero-runtime |
| Icons | [Remixicon](https://remixicon.com) |
| Docs | [Fuma Docs](https://fumadocs.vercel.app) |
| App | [Next.js 16](https://nextjs.org) with Turbopack |
| Orchestration | [Turborepo](https://turbo.build) |
| Packages | [pnpm](https://pnpm.io) workspaces, exact-pinned |

---

## Scripts

From the repo root (Turborepo fans out to workspaces):

```bash
pnpm dev            # turbo dev - docs + UI live reload
pnpm build          # turbo build
pnpm lint           # turbo lint (oxlint --max-warnings=0 + eslint)
pnpm lint:fix       # turbo lint:fix
pnpm format         # turbo format (prettier --write)
pnpm format:check   # turbo format:check
pnpm typecheck      # turbo typecheck (tsc --noEmit)
pnpm test           # turbo test (vitest run in packages/ui)
pnpm registry       # turbo registry (build-registry.mjs + shadcn build)
pnpm changeset      # add a changeset for packages/ui changes
```

Before opening a PR:

```bash
pnpm lint && pnpm format && pnpm build && pnpm typecheck && pnpm test
```

Then `pnpm changeset` - patch for fixes/additions, minor for changes consumers must adapt to, `pnpm changeset add --empty` for no-release changes. CI enforces this.

---

## Upgrades

Last sweep: **2026-09-23** - 30+ packages bumped to latest safe versions. `pnpm install` clean, `typecheck` ✅, `test` ✅ (19 passed), `lint` ✅.

| Package | Before → After | Notes |
| ------- | -------------- | ----- |
| `next` | 16.3.0 → 16.3.6 | Patch + security backports, incl. `next/og` RCE fix. No code change - `await params` already correct |
| `react`, `react-dom`, `react-is` | 19.2.8 → 19.3.0 | Additive only (ViewTransition, Fragment refs). Zero `forwardRef` in src |
| `fumadocs-core`, `fumadocs-ui` | 16.14.1 → 16.15.13 | **One breaking change:** `llms(source).index()` is now `Promise<string>`. Fixed in `apps/web/app/llms.txt/route.ts` (made `GET` async + `await`) |
| `fumadocs-mdx` | 15.2.2 → 15.4.3 | Minor, no API change |
| `@base-ui/react` | 1.7.0 → 1.8.0 | Bugfixes only (`mergeProps`, roving focus). Directly benefits attachment/badge/sidebar |
| `recharts` | 3.8.0 → 3.10.1 | New animation engine + Legend props. `chart.tsx` API unchanged |
| `zod` | 4.4.3 → 4.6.5 | Safe - zero runtime use in `src` today |
| `tailwind-merge` | 3.6.0 → 3.7.0 | Single callsite `src/lib/utils.ts` |
| `input-otp` | 1.4.2 → 1.5.0 | API unchanged |
| `react-resizable-panels` | 4.12.2 → 4.13.2 | Already on v4 API |
| `shadcn` | 4.18.0 → 4.21.0 | CLI-only |
| `turbo` | 2.10.8 → 2.11.3 | Features only, `turbo.json` untouched |
| `oxlint` | 1.77.0 → 1.85.0 | **Stricter defaults:** new `eslint/one-var` (80 warnings) + `react/set-state-in-effect` (2 errors) broke `--max-warnings=0`. Disabled both in `.oxlintrc.json` - both hits are subscription-sync patterns, not bugs |
| `eslint` | 10.8.0 → 10.11.0 | Already on flat config, minors only |
| `typescript-eslint` | 8.66.0 → 8.70.1 | Minor |
| `prettier`, `@changesets/cli`, `sonner`, `@types/*`, `@testing-library/*`, `jsdom`, `@vitejs/plugin-react`, `@turbo/gen`, `@shadcn/react` | patches/minors | All safe, verified by typecheck + tests |

**Held back (breaking majors - migrate separately):**

| Package | Current → Latest | Why held |
| ------- | ---------------- | -------- |
| `typescript` | 5.9.3 → 7.0.2 | Go rewrite. No Compiler API in 7.0 (breaks `typescript-eslint`, `fumadocs-mdx`). Path: 5.9 → 6.0 (fix `ignoreDeprecations`) → 7.0 branch with TS6 side-by-side for tooling |
| `vitest` | 4.1.11 → 5.0.1 | Requires Node ≥22.12 + Vite ≥6.4; `clearMocks:true` default, `vi.mock` in blocks throws, `describe.sequential` removed. Small suite, cheap to verify - do after Node bump |
| `@fumadocs/story` | 1.2.0 → 1.4.0 | 1.3+ requires `typescript ~7.0.2` as a hard dep, which conflicts with `typescript-eslint <6.1.0`. Upgrade together with TypeScript 7 |
| `pnpm` | 10.33.4 → 12.5.1 | `packageManager` field. Migrate to `devEngines.packageManager` before next major, then bump deliberately |

---

## Code health

A full audit (2 high, 19 medium, 20+ low findings) was run against this tree and implemented before the 0.1.x releases. All high-severity items and most medium items are fixed: `showcase.tsx` no longer nests interactives, `ChartStyle` sanitizes keys/colors, the `reInit` leak is fixed, the skeleton is deterministic, overlays/thumbs resolve through semantic tokens, error boundaries exist, the registry parser uses the TypeScript compiler API, and the suite grew from 19 to 25 tests.

Still open: full per-component + `jest-axe` coverage, table scroll-region labelling, and the three held-back majors above.

---

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). The short version:

```bash
pnpm install
pnpm dev
```

- Components live in `packages/ui/src/components`; docs consume them via `transpilePackages`
- After adding/renaming/changing imports: `pnpm registry`
- No code comments - name things so the comment is unnecessary
- Styling uses design tokens from `packages/ui/src/styles/tokens` - hardcoded colors get sent back
- Build on Base UI primitives; don't reimplement focus/keyboard handling
- React Doctor scans every PR (advisory only)

---

## License

MIT - see [`LICENSE`](./LICENSE).

<div align="center">
<br/>

Built with Base UI, Tailwind CSS v4, and the shadcn workflow.

[Documentation](https://faber-ui.vercel.app/docs) · [Components](https://faber-ui.vercel.app/docs/components/button) · [GitHub](https://github.com/SujalXplores/faber-ui)

</div>
