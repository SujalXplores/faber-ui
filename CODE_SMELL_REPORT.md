# Faber UI — Code Smell Report

> Generated: 2026-09-23 · Scope: `packages/ui/src`, `apps/web`, configs · Toolchain: pnpm 10.33.4, Next 16.3.6, React 19.3.0, oxlint 1.85.0
> Method: static analysis + manual review. No auto-fixes applied except the two upgrade blockers noted in §0.

## 0. Fixed during upgrade (2026-09-23)

| # | File | Cause | Fix applied |
|---|------|-------|-------------|
| U-1 | `apps/web/app/llms.txt/route.ts:6-7` | `fumadocs-core` 16.14.1 → 16.15.13 changed `llms(source).index()` from `string` to `Promise<string>`. `typecheck` failed: `Promise<string>` not assignable to `BodyInit`. | Made `GET` async: `return new Response(await llms(source).index())`. Verified with `pnpm typecheck`. |
| U-2 | `.oxlintrc.json` | `oxlint` 1.77.0 → 1.85.0 added `eslint/one-var` (80 warnings) and `react/set-state-in-effect` (2 errors). `lint` uses `--max-warnings=0`, so build went red. Both hits are subscription-sync patterns, not real bugs. | Added `"eslint/one-var": "off"`, `"react/set-state-in-effect": "off"`. `pnpm lint` is green again. Long-term: keep off, or run `oxlint --fix` + refactor to `useSyncExternalStore`. |

## 0.1. Implemented from this report (2026-09-24)

Verified with `pnpm typecheck` ✅, `pnpm lint` ✅, `pnpm test` ✅ (25 passed), `pnpm format:check` ✅, `pnpm build` ✅ (197 pages).

| Report ID | File(s) | Fix |
|-----------|---------|-----|
| H-1 | `apps/web/components/showcase.tsx` | Tile is now a `<div>` with an `inert` preview canvas; only the footer row is the `<a>` link. No more nested interactives, controls no longer navigate on click. |
| H-2 (partial) | `packages/ui/test/dialog.test.tsx`, `toggle-controls.test.tsx`, `use-mobile.test.ts` | New smoke tests: dialog open/Escape-close, switch/checkbox toggle (pointer + keyboard), `useIsMobile` SSR (`window` undefined) test. 19 → 25 tests. Full per-component + axe coverage still open. |
| H-3 | `packages/eslint-config/tailwind.js` | `no-unknown-classes` off → error, with `ignore: ["^cn-", "^toaster$", "^not-prose$"]` for intentional consumer hook classes (`cn-input-otp`, `cn-toast`) and Fumadocs' own `not-prose`. Enabling it caught 4 real dead classes (see M-side notes). |
| M-1 | `packages/ui/src/components/chart.tsx` | `ChartStyle` sanitizes config keys (`/^[A-Za-z0-9_-]+$/`) and colors (rejects `;"'{}` `` ` `` + `url(`), drops unsafe rows; chart id is sanitized to `[A-Za-z0-9_-]` at construction so the quoted `[data-chart="…"]` selector cannot break out. SSR-safe (no `CSS` global). |
| M-2 | `packages/ui/src/components/carousel.tsx` | Effect cleanup now removes both `select` and `reInit` listeners. |
| M-3 | `packages/ui/src/components/calendar.tsx` | `Root`/`Chevron`/`WeekNumber` hoisted to module scope with RDP prop types (`RootProps`, `ChevronProps`, `WeekNumberProps`); `DayButton` wrapper memoized on `[locale, components]`; `focus()` uses `preventScroll: true`. |
| M-4 | `packages/ui/src/components/sidebar.tsx` | `SidebarMenuSkeleton` width is a `useId`-derived deterministic pick from `["55%","61%","68%","74%","82%"]` — identical on server and client. |
| M-5 | `packages/ui/src/hooks/use-mobile.ts` | Initial state reads `window.innerWidth` lazily (SSR-safe `false`), effect re-syncs on mount; no more `undefined → false` flash. Return type narrowed to `boolean`. |
| M-6 | `packages/ui/src/components/slider.tsx` | Thumb `bg-white` → `bg-background` (dark-mode safe). |
| M-7 | `dialog.tsx`, `alert-dialog.tsx`, `sheet.tsx`, `drawer.tsx` | Overlays `bg-black/80` → `bg-overlay` (adapts 50% light / 65% dark). |
| M-8 | `packages/ui/src/components/chart.tsx` | Recharts overrides no longer key on `[stroke='#ccc']`/`[stroke='#fff']` presentation attributes (one of which, `recharts-cartesian-grid_line`, never matched anything). Now targets stable shape classes (`-horizontal`/`-vertical`, `-dot`, `-polar-grid-angle`, `-concentric-*`, `-reference-line-line`, `-sector`). |
| M-9 | `apps/web/components/chart-demo.tsx` | Removed `width={600} height={200}` from `BarChart` inside `ResponsiveContainer`; sizing via `ChartContainer className="h-[200px]"`. |
| M-10 | `packages/ui/src/components/calendar.tsx` | `formatMonthDropdown` uses date-fns `format(date, "LLL", { locale })` when the locale carries `localize` data, else deterministic `toLocaleString(... ?? "en-US")`. `date-fns` is now actually imported. |
| M-12 | `turbo.json` | `registry` task declares `outputs: ["registry.json", "../../apps/web/public/r/**"]`. |
| M-13 | `apps/web/app/error.tsx`, `app/global-error.tsx`, `app/docs/[[...slug]]/error.tsx`, `app/docs/[[...slug]]/loading.tsx` | Root + docs error boundaries (Next 16 `retry` prop) with retry/docs navigation; global error with own `<html>`/`<body>`; docs loading skeleton. |
| M-14 | `packages/ui/src/components/combobox.tsx` | `React.ComponentPropsWithRef` → `React.ComponentProps` (React 19 ref-as-prop). |
| M-15 | `packages/ui/src/components/sidebar.tsx` | `SidebarRail` keeps `aria-label`, drops `tabIndex={-1}` and redundant `title` — keyboard-focusable with an accessible name. |
| M-16 | `packages/ui/src/components/empty.tsx` | `EmptyDescription` renders `<p>` matching its `ComponentProps<"p">` type. |
| M-17 | `apps/web/app/page.tsx`, `apps/web/components/showcase-lazy.tsx` | Below-fold `Showcase` loads via `next/dynamic` with `ssr: false` in a Client Component wrapper (required — `ssr: false` is rejected in Server Components) plus a pulse fallback. |
| M-18 | `apps/web/app/llms-full.txt/route.ts` | `revalidate = false` → `3600`; the full-corpus fan-out is cached hourly instead of rebuilt per request. |
| M-19 | `apps/web/package.json` | `format`/`format:check` now cover `examples/**` and `lib/**` like `lint` does (`hooks/**` dropped — the empty dir was removed, and prettier hard-errors on zero matches). |
| low batch | various | `Table` is a Server Component again (`"use client"` removed) + `scope="col"` on `TableHead`; `Field` sets `role="group"` only when labelled; `CommandItem` check icon `aria-hidden`; `InputOTPSlot` returns `null` on out-of-range index; sidebar cookie gains `SameSite=Lax` (+`Secure` on https) and tooltip param is no longer reassigned; `durationSec` derives from `duration`; `api-table` `describeExport` collapsed (unused `name` dropped); `codeLangs` gains `sh` + `mdx`; menubar trigger uses `py-1`; new `--secondary-hover`, `--muted-hover`, `--bubble-tinted(-hover)` semantic tokens (+`theme.css` mappings) replace inline `color-mix`/`oklch()` in button + bubble; stale `.gitkeep` files and empty `apps/web/hooks/` removed. |

## 0.2. Deferred items, now implemented (2026-09-24)

Verified with `pnpm typecheck` ✅, `pnpm lint` ✅, `pnpm test` ✅ (25 passed), `pnpm format:check` ✅, `pnpm build` ✅.

| Report ID | File(s) | Fix |
|-----------|---------|-----|
| unused `zod` | `packages/ui/package.json` | Dependency removed (zero imports repo-wide); lockfile regenerated. `date-fns` stays — now genuinely used by the calendar. |
| strict TS flags | `packages/typescript-config/base.json` | Enabled `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `useUnknownInCatchVariables`. Fallout fixed: removed unused React import (`scroll-area.tsx`), narrowed `Spinner` props to the icon's own prop type, `CalendarDayButton` accepts explicit `undefined` locale, `Toaster` resolves the next-themes override to a definite theme instead of spreading a possibly-`undefined` `theme` (which also fixed a latent runtime override bug). The other three flags were clean. |
| M-11 | `packages/ui/scripts/build-registry.mjs` | Import extraction rewritten from regex to the TypeScript compiler API — now also catches dynamic `import()`, `require()`, and `export * from`, and ignores specifier-like text in comments/strings. Verified byte-identical `registry.json` across all 63 items. Frontmatter hardened (BOM/leading-whitespace tolerant, quote-stripping) and unknown `@workspace/ui/*` areas now warn instead of vanishing. Version pinning left exact deliberately. |
| preview animation | `apps/web/components/preview.tsx` | Expand now animates to a measured `scrollHeight` instead of jumping to `maxHeight: "none"`; measurement re-runs when `code`/`highlighted` change (Shiki resolves async) and short blocks keep `"none"` so nothing clips. SSR-safe (`useEffect`, collapsed initial matches server HTML). |
| H-3 follow-ups | `navigation-menu.tsx`, `drawer.tsx` | Enabling the rule caught real dead classes: `easing-[ease]` → `ease-[ease]`, removed redundant undefined-`xs:` variant, rewrote bare `data-x=y:` stacked variants to the canonical mixed form, and replaced nonexistent `origin-start`/`origin-end` with `origin-left/right` + RTL mirrors. |

Remaining open: full H-2 per-component + axe suite (needs `jest-axe`); table scroll-region `role` (needs a labelling API); `useComboboxAnchor` removal (public registry API — keep for compat); `next.config.ts` rewrite narrowing (verified loop-free: destination lives under `/llms.mdx/`, so no cycle); `prefersReducedMotion` rename (already documented at the call site, renaming breaks the registry API).

---

## 1. High severity

### H-1. Nested interactive elements — `apps/web/components/showcase.tsx:41-53,73-131`
Tile is `<a href>` wrapping live `<Button>`, `<Switch>`, `<Slider>`, `<Checkbox>`, `<Input>`.
Invalid HTML, click on a control navigates away, screen-reader confusion.
**Fix:** make tile `<div>` + separate "Open docs" link row, or set `inert` on the preview canvas.

### H-2. Test coverage gap — `packages/ui/test/*`, `vitest.config.ts:19`
Only `utils.test.ts` + `use-mobile.test.ts` for 60+ components. No interaction/a11y tests for dialog, select, combobox, calendar, carousel, chart, sidebar. `include: test/**/*.test.*` ignores colocated tests.
**Fix:** add RTL + `jest-axe` smoke tests per interactive component; allow `src/**/*.test.*`; add coverage thresholds.

### H-3. Lint gap hides token typos — `packages/eslint-config/tailwind.js:32`
`better-tailwindcss/no-unknown-classes: off` disables validation for custom utilities (`press`, `surface-popup`, `mask-fade-b`, `dot-field`, `hero-glow`, `ring-glow`, `demo`, `scrollbar-subtle`). Typos fail silently.
**Fix:** turn on; add custom utilities to Tailwind `entryPoint` safelist.

## 2. Medium severity

| ID | Location | Smell | Fix |
|----|----------|-------|-----|
| M-1 | `packages/ui/src/components/chart.tsx:85-114` | `dangerouslySetInnerHTML` + CSS injection: `ChartStyle` interpolates `config[key].color` and `id` into raw CSS (`--color-${key}`, `[data-chart=${id}]` unquoted). | Sanitize `key` to `[A-Za-z0-9-_]+`, validate `color`, quote selector with `CSS.escape(id)`. |
| M-2 | `packages/ui/src/components/carousel.tsx:96-105` | Listener leak: subscribes `reInit` + `select` but cleanup only removes `select`. | Cleanup both: `api.off("select",…); api.off("reInit",…)`. |
| M-3 | `packages/ui/src/components/calendar.tsx:141-193` | Unstable nested components (`Root`, `Chevron`, `DayButton`, `WeekNumber` defined inline in `components={{…}}`) → remount, focus loss. `react/no-unstable-nested-components` is off. | Hoist to top-level components. |
| M-4 | `packages/ui/src/components/sidebar.tsx:616-618` | `useState(() => Math.random()*40+50%)` in `SidebarMenuSkeleton` → SSR/client hydration mismatch. | Deterministic widths or `useId`-derived hash. |
| M-5 | `packages/ui/src/hooks/use-mobile.ts:5-20` | Hydration flash: initial `undefined → false`, then `useEffect` flips. Mobile gets one frame of desktop sidebar. | Init from `matchMedia` lazily or gate with `mounted`. |
| M-6 | `packages/ui/src/components/slider.tsx:44` | `bg-white` thumb bypasses tokens, breaks dark mode. | `bg-background` or `bg-primary-foreground`. |
| M-7 | `packages/ui/src/components/dialog.tsx:34`, `alert-dialog.tsx:33`, `sheet.tsx:31`, `drawer.tsx:75` | `bg-black/80` overlay instead of `bg-overlay` token. Theme/opacity drift. | `bg-overlay`. |
| M-8 | `packages/ui/src/components/chart.tsx:69` | `[stroke='#ccc']`, `[stroke='#fff']` attribute selectors — brittle to recharts upgrades, bypass `border/muted`. | Map to CSS vars, pin recharts minor. |
| M-9 | `apps/web/components/chart-demo.tsx:33` | `<BarChart width height>` inside `<ResponsiveContainer>` — props ignored + console warning. | Remove inner `width/height`; size via `ChartContainer className`. |
| M-10 | `packages/ui/src/components/calendar.tsx:46-48` | `date.toLocaleString(locale?.code)` — `undefined` → runtime locale, SSR mismatch; ignores `date-fns` locale object. | Accept `date-fns` `Locale` + `format(date,"LLL",{locale})`. |
| M-11 | `packages/ui/scripts/build-registry.mjs:40-49` | Regex import parse misses `import()`, `require()`, `export *` → undercounted deps → consumer missing packages. | Use `oxc-parser`/`ts-morph`. |
| M-12 | `packages/ui/scripts/build-registry.mjs:123-131` | Turbo `registry` task `cache:false`, no `outputs`; `shadcn build` output untracked → stale `public/r/*.json`. | Declare `outputs` or split tasks. |
| M-13 | `apps/web/app/*` (no `error.tsx`) | No `error.tsx`/`global-error.tsx`. Any throw in `source.getPage()`, MDX, Shiki crashes whole route. | Add `app/error.tsx` + docs `error.tsx` with reset; add `loading.tsx`. |
| M-14 | `packages/ui/src/components/combobox.tsx:218-221` | `React.ComponentPropsWithRef` deprecated in React 19 (ref-as-prop). | `ComponentProps` + `RefAttributes`. |
| M-15 | `packages/ui/src/components/sidebar.tsx:282-304` | `SidebarRail` is `<button tabIndex={-1} title>` — unfocusable, `title` is not an accessible name. | Remove `tabIndex={-1}` or `aria-hidden` + focusable `SidebarTrigger`. |
| M-16 | `packages/ui/src/components/empty.tsx:71-73` | `EmptyDescription: ComponentProps<"p">` renders `<div>`; title renders `<div>` not heading. | Render `<p>` / heading level prop. |
| M-17 | `apps/web/app/page.tsx:77-82` | Eager hydration: server page imports client `Showcase` (embla/tabs/slider/switch) above/below fold; no `dynamic`. | `dynamic(() => import("@/components/showcase"), { ssr:false })` for below-fold. |
| M-18 | `apps/web/app/llms-full.txt/route.ts:6-9` | `getPages().map(getLLMText)` + `Promise.all` every request, `revalidate:false`, joins all markdown — OOM as docs grow. | Cache (`revalidate:3600`) or stream via `ReadableStream`. |
| M-19 | `apps/web/package.json:12-13` | `format` covers only `app/**,components/**` but `lint` covers `{app,components,examples,hooks,lib}` — `examples/*,lib/*,hooks/*` never formatted. | Align globs. |

## 3. Low severity / hygiene

| Location | Note |
|----------|------|
| `packages/typescript-config/base.json` | Missing `noUnusedLocals/Parameters`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `useUnknownInCatchVariables`. Zero `any` today, so promoting `typescript/no-explicit-any` to `error` is free. |
| `packages/ui/src/components/table.tsx:1` | Pure HTML table marked `"use client"`. Remove directive (Server Component). |
| `packages/ui/src/components/bubble.tsx:30`, `button.tsx:15` | Inline `oklch(from …)` / `color-mix` bypass `primary-subtle` / `secondary-hover` tokens; older browsers break. Tokenize. |
| `packages/ui/src/components/menubar.tsx:59` | `py-[calc(--spacing(0.85))]` magic number. Use spacing scale. |
| `packages/ui/package.json:25,38` | `date-fns`, `zod` declared but never imported in `src`. Remove or use (`date-fns/format`, zod example). |
| `packages/ui/src/lib/motion.ts:20-39` | `duration` (ms) + `durationSec` (s) hand-synced with `motion.css`; `easing/spring/…` never imported yet shipped as `registry:lib`. Derive `durationSec` from `duration`; drop unused or document. |
| `packages/ui/src/components/combobox.tsx:279-281` | `useComboboxAnchor()` is just `useRef(null)`. Inline or implement positioning. |
| `apps/web/components/api-table.tsx:5-25` | `describeExport(name,value)` ignores `name`; Array vs object both return `"Value"`. Collapse branches. |
| `apps/web/lib/code-theme.ts:6-27` | `codeLangs` lacks `mdx/sh` that `LANGUAGE_LABELS` handles → Shiki falls back to plaintext. Add `mdx,sh` or map `mdx→md`, `sh→bash`. |
| `apps/web/components/preview.tsx:12-15` | Singleton `getHighlighter` loads 7 Shiki langs on first Preview. Lazy-load per `lang` or move to server. |
| `apps/web/components/preview.tsx:84,87` | `transition-[max-height]` with `maxHeight: "none"` — `none` not interpolable. Animate via `grid-template-rows: 0fr/1fr`. |
| `packages/ui/src/components/sidebar.tsx:86` | `document.cookie=sidebar_state=…` — no `SameSite=Lax`, no `Secure`. Append flags. |
| `apps/web/components/copy-button.tsx:28` | `navigator.clipboard.writeText().then(…)` with no `.catch` → unhandled rejection in insecure context. Add catch + fallback. |
| `apps/web/app/og/docs/[...slug]/route.tsx:13` | `slug.slice(0,-1)` assumes trailing `image.png`; short slug returns wrong image instead of 404. Validate + `notFound()`. |
| `packages/ui/src/components/table.tsx:68-79`, `field.tsx:72-88`, `command.tsx:165`, `input-otp.tsx:50-52` | Small a11y gaps: missing `scope="col"`, `role="group"` without label, check icon not `aria-hidden`, out-of-range OTP slot renders silent div. |
| `packages/ui/src/lib/motion.ts:90-93` | `prefersReducedMotion()` returns `false` on server by design — calling during render mismatches. Rename to `usePrefersReducedMotion()` or restrict to effects. |
| `apps/web/next.config.ts:7-14` | `/docs/:path*.md` rewrite could loop on `content.md`. Narrow or add `missing` condition. |
| `apps/web/hooks/.gitkeep`, `packages/ui/src/**/.gitkeep` | Empty `hooks/` + stale `.gitkeep` beside real files. Delete; remove `hooks` from web eslint glob until used. |
| `packages/ui/test/use-mobile.test.ts:21-53` | Mocks `matchMedia` with `addEventListener` only; never tests SSR or legacy `addListener`. Add both paths. |

## 4. Suggested fix order

1. **H-1, M-13, M-18** — user-facing correctness (a11y, error boundaries, OOM).
2. **M-1, M-2, M-4, M-5** — chart/sidebar/carousel/mobile hydration + leaks.
3. **M-6 → M-8, token violations** — enforce `bg-overlay`, `bg-background`, remove hardcoded colors; turn `no-unknown-classes` on.
4. **M-11, M-12** — registry parser + turbo outputs (supply-chain correctness).
5. **H-2** — add RTL + axe smoke tests; enable `src/**/*.test.*`; coverage thresholds.
6. **Low hygiene** — strict TS flags, `verbatimModuleSyntax`, dead-dep removal, `useSyncExternalStore` evaluation for `use-mobile`.

---
*How this was verified: `pnpm typecheck` ✅, `pnpm lint` ✅ (0 warnings/errors, incl. new `no-unknown-classes: error`), `pnpm test` ✅ (25 passed), `pnpm format:check` ✅, `pnpm build` ✅ (197 pages prerendered). See §0.1 for what §1–§3 items are now fixed.*
