<div align="center">

<img src="./apps/web/public/logo.png" alt="Faber UI logo" width="88" height="88" />

# Faber UI

**Components you own outright.**

60 React components built on Base UI primitives and Tailwind CSS v4, with a shadcn-compatible variant API. The source is copied into your repo, so there is no Faber UI package to upgrade, no provider to wrap, and nothing to override.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Base UI](https://img.shields.io/badge/Base_UI-primitives-black)](https://base-ui.com)

[Documentation](https://faber-ui.vercel.app/docs) · [Components](https://faber-ui.vercel.app/docs/components/button) · [Theming](https://faber-ui.vercel.app/docs/theming) · [Report a bug](https://github.com/SujalXplores/faber-ui/issues/new?template=bug_report.yml) · [Request a component](https://github.com/SujalXplores/faber-ui/issues/new?template=component_request.yml)

</div>

---

## Quick start

Add a component with the shadcn CLI:

```bash
pnpm dlx shadcn@latest add https://faber-ui.vercel.app/r/button.json
```

`npx`, `yarn dlx` and `bunx` work the same way. The CLI reads your `components.json` for aliases, resolves dependencies between components, installs the npm packages the item needs, and copies the source into your project.

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button>Continue</Button>;
}
```

Every component is addressed the same way: `https://faber-ui.vercel.app/r/<name>.json`.

## Why Faber UI

| Traditional library                                 | Faber UI                                               |
| --------------------------------------------------- | ------------------------------------------------------ |
| `npm install @acme/react` adds a runtime dependency | `shadcn add …/r/button.json` copies source             |
| Theming through provider props and CSS overrides    | Theming through data attributes and CSS tokens         |
| Breaking majors force rewrites                      | You own the file: edit it, delete parts, keep shipping |
| The bundle carries what you don't use               | The bundle carries exactly what you vendored           |

## Features

- **Accessible by default.** Base UI primitives under every interactive component handle focus, portals and keyboard support.
- **shadcn-compatible API.** Variants, sizes and composition follow the conventions you already know.
- **Token-based theming.** 1,170 themes (13 hues × 5 neutrals × 6 radii × 3 densities) from 122 semantic tokens on an `oklch` ramp.
- **RTL ready.** Right-to-left layouts work across the whole kit.
- **One icon set.** Remixicon is wired into every component that needs an icon.
- **Live docs.** A Fumadocs site where every preview runs the real component.

<details>
<summary><strong>All 60 components</strong></summary>

<br/>

Accordion · Alert · AlertDialog · AspectRatio · Attachment · Avatar · Badge · Breadcrumb · Bubble · Button · ButtonGroup · Calendar · Card · Carousel · Chart · Checkbox · Collapsible · Combobox · Command · ContextMenu · Dialog · Direction · Drawer · DropdownMenu · Empty · Field · HoverCard · Input · InputGroup · InputOTP · Item · Kbd · Label · Marker · Menubar · Message · MessageScroller · NativeSelect · NavigationMenu · Pagination · Popover · Progress · RadioGroup · Resizable · ScrollArea · Select · Separator · Sheet · Sidebar · Skeleton · Slider · Sonner · Spinner · Switch · Table · Tabs · Textarea · Toggle · ToggleGroup · Tooltip

</details>

## Theming

Every visual decision resolves through a token, and each layer only references the one above it:

| Layer      | File                    | Holds                                                        |
| ---------- | ----------------------- | ------------------------------------------------------------ |
| Primitives | `tokens/primitives.css` | The knobs (hue, chroma, radius, spacing) and raw color ramps |
| Presets    | `tokens/presets.css`    | Named overrides of those knobs, addressed by data attribute  |
| Typography | `tokens/typography.css` | Families, size scale, tracking, leading                      |
| Motion     | `tokens/motion.css`     | Durations, easings, and the reduced-motion collapse          |
| Elevation  | `tokens/elevation.css`  | The layered, hue-tinted shadow scale                         |
| Semantic   | `tokens/semantic.css`   | What components consume: `--primary`, `--muted`, `--border`  |
| Theme      | `theme.css`             | Publishes all of it as Tailwind utilities                    |

Components use the semantic layer, never the primitives: `bg-primary` follows a theme change, `bg-brand-600` does not. Switch the theme with data attributes on `<html>`:

```html
<html data-brand="emerald" data-neutral="stone" data-radius="lg"></html>
```

See the [theming guide](https://faber-ui.vercel.app/docs/theming) for the full system.

## Development

A pnpm + Turborepo monorepo. It needs Node 20+ (`.nvmrc` pins 22) and pnpm 10+.

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

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). In short: build on Base UI primitives, style with the design tokens (hardcoded colors get sent back), and name things so comments are unnecessary. Bugs and component ideas go in [issues](https://github.com/SujalXplores/faber-ui/issues/new/choose).

## License

MIT, see [`LICENSE`](./LICENSE).
