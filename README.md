![Faber UI: motion-crafted React components](./apps/web/public/banner.svg)

<div align="center">

**React components with considered motion in every interaction.**

60 components on Base UI primitives and Tailwind CSS v4 with one shared easing/duration scale, enter and exit transitions, and reduced-motion that keeps comprehension. Vendored into your repo with the shadcn CLI. Zero runtime dependencies.

60 components · 0 runtime deps · 122 design tokens · MIT licensed

[![CI](https://github.com/SujalXplores/faber-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/SujalXplores/faber-ui/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Base UI](https://img.shields.io/badge/Base_UI-primitives-black)](https://base-ui.com)

[Live demo](https://faber-ui.vercel.app) · [Documentation](https://faber-ui.vercel.app/docs) · [Components](https://faber-ui.vercel.app/docs/components/button) · [Theming](https://faber-ui.vercel.app/docs/theming) · [Changelog](https://faber-ui.vercel.app/changelog) · [Report a bug](https://github.com/SujalXplores/faber-ui/issues/new?template=bug_report.yml) · [Request a component](https://github.com/SujalXplores/faber-ui/issues/new?template=component_request.yml)

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json
```

</div>

---

## Motion is the feature

Most kits animate the demo and ship static defaults. Here motion is load-bearing. Every interactive component draws from one scale, and contributions pass animation review before they merge:

- **One scale, everywhere.** 7 named easings and 7 duration steps (plus a 45ms stagger), consumed as tokens. Components never hardcode a curve or a millisecond value.
- **No ease-in on enter.** The scale deliberately omits a general ease-in: it delays the first frame, the exact moment the user is watching, so anything entering would read as sluggish.
- **Exits exist.** Menus, dialogs, and popovers ship exit transitions, not just entrances. Nothing disappears without one.
- **Never `transition-all`.** Named properties only, so an unrelated layout change applies instead of animating by accident.
- **Reduced-motion keeps comprehension.** Distances collapse to zero and durations shorten, but the opacity cues that aid understanding stay.

## You own the source

| Traditional library                                 | Faber UI                                               |
| --------------------------------------------------- | ------------------------------------------------------ |
| `npm install @acme/react` adds a runtime dependency | `shadcn add …/r/button.json` copies source             |
| Theming through provider props and CSS overrides    | Theming through data attributes and CSS tokens         |
| Breaking majors force rewrites                      | You own the file: edit it, delete parts, keep shipping |
| The bundle carries what you don't use               | The bundle carries exactly what you vendored           |

## Quick start

**1. Add a component** with your package manager. The CLI reads your `components.json` for aliases, resolves dependencies between components, installs the npm packages the item needs, and copies the source into your project.

```bash
# pnpm
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json

# npm / yarn / bun
npx shadcn@latest add https://faber-ui.vercel.app/r/button.json
yarn dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json
bunx shadcn@latest add https://faber-ui.vercel.app/r/button.json
```

**2. Use it.** Variants and sizes work the shadcn way:

```tsx
import { Button } from "@/components/ui/button";

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Continue</Button>
    </div>
  );
}
```

**3. Stack more in one command.** Every component lives at `https://faber-ui.vercel.app/r/<name>.json`:

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/dialog.json https://faber-ui.vercel.app/r/calendar.json https://faber-ui.vercel.app/r/chart.json
```

Undecided? Try any component live in the [docs](https://faber-ui.vercel.app/docs/components/button) first. It is the same source the CLI copies.

## Browse the kit

Every name links to its live docs page. Each one runs the real component, not a screenshot.

<details>
<summary><strong>All 60 components, grouped</strong></summary>

<br/>

#### Overlays & menus (12)

[AlertDialog](https://faber-ui.vercel.app/docs/components/alert-dialog) · [Command](https://faber-ui.vercel.app/docs/components/command) · [ContextMenu](https://faber-ui.vercel.app/docs/components/context-menu) · [Dialog](https://faber-ui.vercel.app/docs/components/dialog) · [Drawer](https://faber-ui.vercel.app/docs/components/drawer) · [DropdownMenu](https://faber-ui.vercel.app/docs/components/dropdown-menu) · [HoverCard](https://faber-ui.vercel.app/docs/components/hover-card) · [Menubar](https://faber-ui.vercel.app/docs/components/menubar) · [Popover](https://faber-ui.vercel.app/docs/components/popover) · [Sheet](https://faber-ui.vercel.app/docs/components/sheet) · [Sonner](https://faber-ui.vercel.app/docs/components/sonner) · [Tooltip](https://faber-ui.vercel.app/docs/components/tooltip)

#### Forms & controls (18)

[Button](https://faber-ui.vercel.app/docs/components/button) · [ButtonGroup](https://faber-ui.vercel.app/docs/components/button-group) · [Calendar](https://faber-ui.vercel.app/docs/components/calendar) · [Checkbox](https://faber-ui.vercel.app/docs/components/checkbox) · [Combobox](https://faber-ui.vercel.app/docs/components/combobox) · [Field](https://faber-ui.vercel.app/docs/components/field) · [Input](https://faber-ui.vercel.app/docs/components/input) · [InputGroup](https://faber-ui.vercel.app/docs/components/input-group) · [InputOTP](https://faber-ui.vercel.app/docs/components/input-otp) · [Label](https://faber-ui.vercel.app/docs/components/label) · [NativeSelect](https://faber-ui.vercel.app/docs/components/native-select) · [RadioGroup](https://faber-ui.vercel.app/docs/components/radio-group) · [Select](https://faber-ui.vercel.app/docs/components/select) · [Slider](https://faber-ui.vercel.app/docs/components/slider) · [Switch](https://faber-ui.vercel.app/docs/components/switch) · [Textarea](https://faber-ui.vercel.app/docs/components/textarea) · [Toggle](https://faber-ui.vercel.app/docs/components/toggle) · [ToggleGroup](https://faber-ui.vercel.app/docs/components/toggle-group)

#### Navigation (5)

[Breadcrumb](https://faber-ui.vercel.app/docs/components/breadcrumb) · [NavigationMenu](https://faber-ui.vercel.app/docs/components/navigation-menu) · [Pagination](https://faber-ui.vercel.app/docs/components/pagination) · [Sidebar](https://faber-ui.vercel.app/docs/components/sidebar) · [Tabs](https://faber-ui.vercel.app/docs/components/tabs)

#### Data display (19)

[Accordion](https://faber-ui.vercel.app/docs/components/accordion) · [Alert](https://faber-ui.vercel.app/docs/components/alert) · [AspectRatio](https://faber-ui.vercel.app/docs/components/aspect-ratio) · [Avatar](https://faber-ui.vercel.app/docs/components/avatar) · [Badge](https://faber-ui.vercel.app/docs/components/badge) · [Card](https://faber-ui.vercel.app/docs/components/card) · [Carousel](https://faber-ui.vercel.app/docs/components/carousel) · [Chart](https://faber-ui.vercel.app/docs/components/chart) · [Collapsible](https://faber-ui.vercel.app/docs/components/collapsible) · [Empty](https://faber-ui.vercel.app/docs/components/empty) · [Item](https://faber-ui.vercel.app/docs/components/item) · [Kbd](https://faber-ui.vercel.app/docs/components/kbd) · [Marker](https://faber-ui.vercel.app/docs/components/marker) · [Message](https://faber-ui.vercel.app/docs/components/message) · [MessageScroller](https://faber-ui.vercel.app/docs/components/message-scroller) · [Progress](https://faber-ui.vercel.app/docs/components/progress) · [Skeleton](https://faber-ui.vercel.app/docs/components/skeleton) · [Spinner](https://faber-ui.vercel.app/docs/components/spinner) · [Table](https://faber-ui.vercel.app/docs/components/table)

#### Layout & flow (6)

[Attachment](https://faber-ui.vercel.app/docs/components/attachment) · [Bubble](https://faber-ui.vercel.app/docs/components/bubble) · [Direction](https://faber-ui.vercel.app/docs/components/direction) · [Resizable](https://faber-ui.vercel.app/docs/components/resizable) · [ScrollArea](https://faber-ui.vercel.app/docs/components/scroll-area) · [Separator](https://faber-ui.vercel.app/docs/components/separator)

The registry also ships the [`use-mobile`](https://faber-ui.vercel.app/r/use-mobile.json) hook and the [`motion`](https://faber-ui.vercel.app/r/motion.json) / [`utils`](https://faber-ui.vercel.app/r/utils.json) primitives the components are built from.

</details>

## Features

- **Accessible by default.** Base UI primitives under every interactive component handle focus, portals and keyboard support.
- **shadcn-compatible API.** Variants, sizes and composition follow the conventions you already know.
- **Token-based theming.** 1,170 themes (13 hues × 5 neutrals × 6 radii × 3 densities) from 122 semantic tokens on an `oklch` ramp.
- **RTL ready.** Right-to-left layouts work across the whole kit.
- **One icon set.** Remixicon is wired into every component that needs an icon.
- **Live docs.** A Fumadocs site where every preview runs the real component: toggle it, drag it, it is the source you vendor.

## Theming

Every visual decision resolves through a token: primitives (hue, chroma, radius, ramps) → presets → typography, motion, elevation → semantic (`--primary`, `--muted`, `--border`) → Tailwind utilities. Components consume the semantic layer only, so `bg-primary` follows a theme change and nothing hardcoded can drift.

```html
<html data-brand="emerald" data-neutral="stone" data-radius="lg"></html>
```

See the [theming guide](https://faber-ui.vercel.app/docs/theming) for the full system.

## Development

A pnpm + Turborepo monorepo. It needs Node 22+ (`.nvmrc` pins 22) and pnpm 12+.

| Workspace       | Path          | Purpose                                                   |
| --------------- | ------------- | --------------------------------------------------------- |
| `@workspace/ui` | `packages/ui` | Components, hooks, utils, styles and the registry builder |
| `web`           | `apps/web`    | The Next.js 16 documentation site                         |

```bash
pnpm install
pnpm dev          # docs on localhost:3000, UI edits reload live
pnpm registry     # rebuild apps/web/public/r from packages/ui/src
pnpm lint && pnpm format && pnpm build && pnpm typecheck && pnpm test
```

- Add a component from `packages/ui` with `pnpm dlx shadcn@latest add <name>`; the export map updates itself.
- Run `pnpm registry` after adding, renaming or changing imports. CI fails on a stale registry, and dependency versions come from `packages/ui/package.json`.
- Add a changeset with `pnpm changeset` (patch for fixes and additions, minor for changes consumers must adapt to, `--empty` for no release).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). In short: build on Base UI primitives, style with the design tokens (hardcoded colors get sent back), name things so comments are unnecessary, and put motion through the shared scale. Bugs and component ideas go in [issues](https://github.com/SujalXplores/faber-ui/issues/new/choose).

## License

MIT, see [`LICENSE`](./LICENSE).
