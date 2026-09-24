# @workspace/ui

## 0.1.0

### Minor Changes

- 9b2ba9c: Registry items now publish exact dependency versions. Previously every item
  listed bare package names, so `shadcn add` installed the latest release of
  `@base-ui/react`, `recharts`, and twelve others — versions the components were
  never tested against. The registry build now reads versions from
  `packages/ui/package.json`, and warns when a component imports a package that is
  not declared there.
- 52dea02: Accessibility, correctness, and token fixes across the kit, from a full code-smell audit.

  Calendar no longer remounts its subcomponents on every render (`Root`, `Chevron` and `WeekNumber` are hoisted; the `DayButton` wrapper is memoized), formats the month dropdown with `date-fns` instead of the runtime locale, and focuses days without scrolling. Carousel removes its `reInit` listener on unmount. `SidebarMenuSkeleton` widths are deterministic across server and client, `SidebarRail` is keyboard-focusable with its accessible name intact, and the sidebar cookie is now `SameSite=Lax` (+`Secure` on https).

  Overlays resolve through the new `bg-overlay` token instead of a fixed `bg-black/80`, the slider thumb uses `bg-background`, and new `--secondary-hover`, `--muted-hover` and `--bubble-tinted(-hover)` semantic tokens replace inline `color-mix()`/`oklch()` in Button and Bubble. `Table` is a Server Component again with `scope="col"` headers, `Field` only sets `role="group"` when labelled, and `EmptyDescription` renders the `p` its type always promised.

  `ChartStyle` sanitizes config keys/colors and the chart id, and the recharts overrides target stable shape classes instead of default presentation attributes. `durationSec` derives from `duration`, the deprecated `ComponentPropsWithRef` is gone, and the unused `zod` dependency is removed.

### Patch Changes

- e8e5f95: Restore open and close animations on every menu-family popup. `animate-none!`
  compiled to `animation: none !important`, which beat the non-important
  `animation` shorthand that `data-open:animate-in` sets, so DropdownMenu,
  ContextMenu, Menubar, Select and Combobox opened and closed as hard cuts.
  MenubarContent additionally had no exit classes at all, and Dialog now uses the
  same 200ms as the shadcn reference rather than 120ms.

  HoverCard was the only component with a non-zero `alignOffset`. With
  `align="center"` Base UI maps it onto Floating UI's `crossAxis`, so the card sat
  4px off-centre from its trigger on every open.

  Interactive elements built from divs now get a pointer cursor: the base rule
  only covered `button` and `[role="button"]`, while menu items, options, tabs and
  switch/checkbox/radio roles either inherited the default arrow or explicitly set
  `cursor-default`.

  Also removes eight dead `data-[motion=*]` classes from NavigationMenu. Those are
  Radix attributes that Base UI never emits, and they compiled to twelve CSS rules
  that could never match.

- 54587bb: Reformat component sources to match the repository Prettier configuration, and
  add a `format:check` script so drift is caught in CI rather than accumulating.
