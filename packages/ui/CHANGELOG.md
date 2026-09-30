# @workspace/ui

## 0.3.0

<!-- released: 2026-09-29 -->

### Minor Changes

- 9bae916 (#26): Calendar keeps day buttons mounted across renders and renders week numbers as row headers.

  `CalendarDayButton` no longer takes a `locale` prop, and its `data-day` attribute is now the ISO date (`2026-09-28`) instead of a locale-formatted string that could differ between server and browser.

- 9bae916 (#26): NavigationMenu drops the broken `NavigationMenuIndicator` export, highlights active links through `data-active`, and times its popup with the kit motion tokens.

  `NavigationMenuIndicator` wrapped the trigger icon part and styled attributes Base UI never sets, so it rendered nothing useful. Remove any import of it.

- 9bae916 (#26): Popover, DropdownMenu, ContextMenu, Menubar, Select, Combobox, HoverCard, Tooltip, Dialog and AlertDialog enter and exit with interruptible transitions on the kit easing tokens, and `tw-animate-css` is no longer a dependency.

  A popup closed halfway through opening now reverses from where it is instead of restarting. Anchored popups scale from their trigger with `motion-popup`, dialogs use `motion-modal` and their overlays `motion-backdrop`, exits run faster than entrances, and reduced motion now collapses the scale and travel of every popup. Select skips the animation while its list is aligned over the trigger. If you target the old `animate-in`, `fade-in-0` or `zoom-in-95` classes, move your overrides to `data-starting-style` and `data-ending-style`.

- 9bae916 (#26): Every component now installs the `theme` item, so the tokens and utilities it relies on reach your project instead of silently doing nothing.

  The first `shadcn add` copies the stylesheet into `styles/faber/`. Import it once from your global CSS, after Tailwind:

  ```css
  @import "tailwindcss";
  @import "shadcn/tailwind.css";
  @import "../styles/faber/index.css";
  ```

  Remove the default `:root`, `.dark` and `@theme inline` blocks that `shadcn init` generated, or keep them after the import only to override values.

- 9bae916 (#26): TooltipProvider now waits 400ms before the first tooltip opens, and tooltips opened right after it appear instantly with no animation.

  Pass `delay={0}` to `TooltipProvider` to keep the previous behavior.

- 63dd0b5 (#26): Button, Toggle, Tabs and NavigationMenu ship their style configs from `@workspace/ui/lib/*-variants` so component files export only components.

  `buttonVariants`, `toggleVariants`, `tabsListVariants` and `navigationMenuTriggerStyle` are no longer exported from the component modules. Update imports:

  ```tsx
  import { Button } from "@/components/ui/button";
  import { buttonVariants } from "@/lib/button-variants";
  ```

  `shadcn add` installs the matching `lib/*-variants` file alongside the component.

### Patch Changes

- 9bae916 (#26): Accordion panels open and close with an interruptible height transition on the kit tokens.
- 9bae916 (#26): Button presses scale to `--scale-press` with the `press` utility instead of shifting down a pixel.
- 9bae916 (#26): Carousel follows the document direction, maps arrow keys to its orientation, and leaves arrow keys alone inside inputs within a slide.
- 9bae916 (#26): ChartContainer accepts only color values made of safe characters, closing an injection path through the generated style tag.
- 9bae916 (#26): CommandDialog opens and closes without animation, as a keyboard-invoked palette should, and its accessible title renders inside the dialog.
- 9bae916 (#26): ContextMenu highlights a submenu trigger while its submenu is open.
- 9bae916 (#26): The `dark` variant matches with zero specificity, so hover and state classes such as `hover:bg-input/50` on the outline Button also apply in dark mode.
- 9bae916 (#26): Checkbox, RadioGroup and Label show their disabled styles, which previously never applied because the controls render a `span`.
- 9bae916 (#26): BreadcrumbEllipsis and PaginationEllipsis expose their "More" labels to screen readers.
- 9bae916 (#26): The font tokens fall back to the system stacks when `--font-sans-src`, `--font-mono-src` or `--font-serif-src` is not defined.
- 9bae916 (#26): Input, Textarea, NativeSelect, CommandInput and ComboboxChipsInput use 16px text on small screens so iOS Safari no longer zooms the page on focus.
- cd0be38 (#28): MessageAvatar lines up with the last bubble when a MessageFooter is present, instead of sitting 8px too high.

  MessageFooter now has a fixed `16px` line height and the avatar shifts by exactly the footer plus the content gap.

- 9bae916 (#26): Transitions using `transition-control` now animate, Drawer and Sheet use the drawer curve, the Sidebar collapse eases instead of moving linearly, and MessageScroller exits faster than it enters.

  `transition-control` set only `transition-property`, so the colors it covered changed instantly. It now reads `duration-*` and `ease-*` like the built-in transition utilities.

- 9bae916 (#26): Tabs and ToggleGroup pass `orientation` to Base UI, so vertical layouts get `aria-orientation` and Up/Down arrow navigation.
- 9bae916 (#26): Spinner and other `animate-spin` loaders pulse under reduced motion instead of stopping after one turn, and the new `--travel-sm` and `--travel-lg` tokens collapse movement to zero.
- 9bae916 (#26): Registry components import from your own aliases, such as `@/components/ui/button` and `@/lib/utils`, instead of the unresolvable `@workspace/ui/...` paths.
- 9bae916 (#26): Sheet, Drawer and Sidebar keep the border and the slide direction on the side named by `side`, which were reversed in right-to-left layouts.
- 9bae916 (#26): Nested `data-brand` and `data-neutral` scopes now re-theme semantic tokens such as `--primary`, and a nested neutral no longer resets the brand around it.
- 9bae916 (#26): SidebarProvider ignores the toggle shortcut while typing in a field, accepts it with Shift or Caps Lock, and no longer re-subscribes on every toggle; Sidebar forwards `className` and props on mobile.
- 9bae916 (#26): Slider renders a single thumb when `value` or `defaultValue` is a number.
- cd0be38 (#28): Slider thumb is a solid circle at every radius preset, filled with `foreground` in dark mode instead of rendering as a dark hollow square.

  The thumb used `rounded-md`, which only looks round when `--radius` is large; at the default `0.3rem` it rendered as a rounded square. It now uses `rounded-full`, matching the Switch thumb.

- 9bae916 (#26): KbdGroup is typed as a `kbd` element, Combobox imports its Base UI subpath, the `motion` lib mirrors the `exit` easing and `travel` tokens, and the `chart` item declares its `react-is` peer.

  Unused classes that Base UI and Sonner never target were removed from Toggle, ResizablePanelGroup, Toaster and InputOTP, along with the unused `hairline`, `mask-fade-t`, `press-subtle` and `transition-control-transform` utilities.

- 9bae916 (#26): Translucent menu surfaces keep their background blur while a long list scrolls.
- cd0be38 (#28): Switch sits at a whole-pixel `16px` height, so its thumb is inset `1px` on every side instead of rendering off-center.

  The default size was `16.6px` tall, which left a fractional vertical gap that browsers rounded unevenly. The `sm` size keeps its dimensions.

- 9bae916 (#26): useIsMobile reads the viewport through `useSyncExternalStore`, so Sidebar no longer mismatches on hydration when a page loads on a phone.

## 0.2.0

<!-- released: 2026-09-28 -->

### Minor Changes

- 54607a7 (#16): Resizable pins `react-resizable-panels` to `4.14.1`.

  No action needed. `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` keep the same props and markup; installs via `shadcn` now resolve the latest `4.x` release.

## 0.1.2

<!-- released: 2026-09-24 -->

### Patch Changes

- 7507a5a (#12): Pad the Select list so options no longer sit flush against the popup edge, reserve room for the selected-item check, and scope the Shiki dark-theme rule to code tokens so code block chrome keeps its own colors.

## 0.1.1

<!-- released: 2026-09-24 -->

### Patch Changes

- 68787e2 (#9): Release coverage for the audit batch already shipped in 0.1.0: token, accessibility, and correctness fixes with no additional consumer-facing API changes.

## 0.1.0

<!-- released: 2026-09-24 -->

### Minor Changes

- 9b2ba9c (#4): Registry items now publish exact dependency versions. Previously every item
  listed bare package names, so `shadcn add` installed the latest release of
  `@base-ui/react`, `recharts`, and twelve others — versions the components were
  never tested against. The registry build now reads versions from
  `packages/ui/package.json`, and warns when a component imports a package that is
  not declared there.
- 52dea02 (#9): Accessibility, correctness, and token fixes across the kit, from a full code-smell audit.

  Calendar no longer remounts its subcomponents on every render (`Root`, `Chevron` and `WeekNumber` are hoisted; the `DayButton` wrapper is memoized), formats the month dropdown with `date-fns` instead of the runtime locale, and focuses days without scrolling. Carousel removes its `reInit` listener on unmount. `SidebarMenuSkeleton` widths are deterministic across server and client, `SidebarRail` is keyboard-focusable with its accessible name intact, and the sidebar cookie is now `SameSite=Lax` (+`Secure` on https).

  Overlays resolve through the new `bg-overlay` token instead of a fixed `bg-black/80`, the slider thumb uses `bg-background`, and new `--secondary-hover`, `--muted-hover` and `--bubble-tinted(-hover)` semantic tokens replace inline `color-mix()`/`oklch()` in Button and Bubble. `Table` is a Server Component again with `scope="col"` headers, `Field` only sets `role="group"` when labelled, and `EmptyDescription` renders the `p` its type always promised.

  `ChartStyle` sanitizes config keys/colors and the chart id, and the recharts overrides target stable shape classes instead of default presentation attributes. `durationSec` derives from `duration`, the deprecated `ComponentPropsWithRef` is gone, and the unused `zod` dependency is removed.

### Patch Changes

- e8e5f95 (#9): Restore open and close animations on every menu-family popup. `animate-none!`
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

- 54587bb (#4): Reformat component sources to match the repository Prettier configuration, and
  add a `format:check` script so drift is caught in CI rather than accumulating.
