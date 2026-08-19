<div align="center">

# Faber UI

**Components you own outright.**

60 React components built on Base UI primitives and Tailwind CSS v4, with a shadcn-compatible variant API. The source is copied into your repository, so there is no runtime dependency to upgrade and nothing to override when a design changes.

[Documentation](https://faber-ui.vercel.app/docs) · [Components](https://faber-ui.vercel.app/docs/components/button) · [GitHub](https://github.com/SujalXplores/faber-ui)

</div>

---

## Why

Most component libraries ship as an npm package. You install them, wrap your app in a provider, and hope the next major release does not break your layout. When it does, you are stuck reading a migration guide instead of shipping.

Faber UI takes a different approach. Every component is copied into your repository through the shadcn CLI. You own the source file, you edit it, you delete the parts you do not need. There is no `@faber-ui/react` to add to your dependencies, no provider to wrap your app in, no version to upgrade. The CLI is how you get components in. After that, they are yours.

## What you get

- **60 components** from buttons and dialogs to charts, carousels, and chat bubbles, all vendored and editable.
- **Base UI primitives** under every interactive component. Accessible, unstyled, and maintained by the Base UI team.
- **shadcn-compatible API.** Variants, sizes, and `asChild` composition that match the conventions you already know.
- **Tailwind CSS v4.** Zero-runtime styling with CSS variables and oklch color tokens.
- **RTL ready.** Right-to-left layouts work out of the box across the entire kit.
- **Token-based theming.** A layered CSS token system (primitives, presets, typography, motion, elevation, semantic) that lets you re-theme the entire kit by editing one file.
- **Remixicon.** A consistent icon set wired into every component that needs one.

## Quick start

Add a component to your project with the shadcn CLI:

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json
```

The CLI reads your `components.json` for aliases, resolves any components the item depends on, installs the npm packages it needs, and copies the source into your project. Nothing is added to your dependency tree beyond those packages.

Then import it:

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button>Continue</Button>;
}
```

## Working inside this repository

Faber UI is a pnpm monorepo with two workspaces:

| Workspace       | Path          | Purpose                                                 |
| --------------- | ------------- | ------------------------------------------------------- |
| `@workspace/ui` | `packages/ui` | The component library. All 60 components, hooks, utils. |
| `web`           | `apps/web`    | The Next.js app that hosts the documentation site.      |

### Prerequisites

- Node.js 20 or newer
- pnpm 10 or newer

### Development

```bash
pnpm install
pnpm dev
```

The docs site runs on `localhost:3000`.

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

## Theming

Every visual decision resolves through a token. No component holds a color, a duration, or an easing curve of its own. The token system is layered, and each layer only references the one above it:

| Layer      | File                    | Holds                                                             |
| ---------- | ----------------------- | ----------------------------------------------------------------- |
| Primitives | `tokens/primitives.css` | The knobs (hue, chroma, radius, spacing) and the raw color ramps. |
| Presets    | `tokens/presets.css`    | Named overrides of those knobs, addressed by data attribute.      |
| Typography | `tokens/typography.css` | Families, size scale, tracking, leading.                          |
| Motion     | `tokens/motion.css`     | Durations, easings, and the reduced-motion collapse.              |
| Elevation  | `tokens/elevation.css`  | The layered, hue-tinted shadow scale.                             |
| Semantic   | `tokens/semantic.css`   | What components consume: `--primary`, `--muted`, `--border`.      |
| Theme      | `theme.css`             | Publishes all of it as Tailwind utilities.                        |

The rule that matters: **components use the semantic layer, never the primitives.** A `bg-brand-600` in a component is a color that will not follow a future theme change. `bg-primary` is.

Switch the brand by setting a data attribute on `<html>`:

```html
<html data-brand="emerald" data-neutral="stone" data-radius="lg"></html>
```

Read the [theming guide](https://faber-ui.vercel.app/docs/theming) for the full system.

## Component catalog

Accordion, Alert, AlertDialog, AspectRatio, Attachment, Avatar, Badge, Breadcrumb, Bubble, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, Dialog, Direction, Drawer, DropdownMenu, Empty, Field, HoverCard, Input, InputOTP, Item, Kbd, Label, Marker, Menubar, Message, MessageScroller, NativeSelect, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip.

Browse the full catalog with live previews at [faber-ui.vercel.app/docs/components/button](https://faber-ui.vercel.app/docs/components/button).

## Tech stack

- [Base UI](https://base-ui.com) for accessible, unstyled primitives
- [shadcn/ui](https://ui.shadcn.com) for the CLI workflow and component conventions
- [Tailwind CSS v4](https://tailwindcss.com) for zero-runtime styling
- [Remixicon](https://remixicon.com) for icons
- [Fuma Docs](https://fumadocs.vercel.app) for the documentation site
- [Next.js 16](https://nextjs.org) with Turbopack
- [Turborepo](https://turbo.build) for task orchestration
- [pnpm](https://pnpm.io) for package management

## License

MIT
