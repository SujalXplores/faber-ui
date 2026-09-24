---
"@workspace/ui": minor
---

Accessibility, correctness, and token fixes across the kit, from a full code-smell audit.

Calendar no longer remounts its subcomponents on every render (`Root`, `Chevron` and `WeekNumber` are hoisted; the `DayButton` wrapper is memoized), formats the month dropdown with `date-fns` instead of the runtime locale, and focuses days without scrolling. Carousel removes its `reInit` listener on unmount. `SidebarMenuSkeleton` widths are deterministic across server and client, `SidebarRail` is keyboard-focusable with its accessible name intact, and the sidebar cookie is now `SameSite=Lax` (+`Secure` on https).

Overlays resolve through the new `bg-overlay` token instead of a fixed `bg-black/80`, the slider thumb uses `bg-background`, and new `--secondary-hover`, `--muted-hover` and `--bubble-tinted(-hover)` semantic tokens replace inline `color-mix()`/`oklch()` in Button and Bubble. `Table` is a Server Component again with `scope="col"` headers, `Field` only sets `role="group"` when labelled, and `EmptyDescription` renders the `p` its type always promised.

`ChartStyle` sanitizes config keys/colors and the chart id, and the recharts overrides target stable shape classes instead of default presentation attributes. `durationSec` derives from `duration`, the deprecated `ComponentPropsWithRef` is gone, and the unused `zod` dependency is removed.
