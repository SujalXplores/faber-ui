# Contributing

## Setup

```bash
pnpm install
pnpm dev
```

Node 22 (see `.nvmrc`); `engine-strict` is on, so a mismatch fails the install.
Dependencies are pinned exact — `.npmrc` sets `save-exact`, so never commit a
`^` or `~`.

## Working on a component

Components live in `packages/ui/src/components`. The documentation site in
`apps/web` consumes them directly through `transpilePackages`, so `pnpm dev`
shows changes without a rebuild step.

After adding, renaming, or changing the imports of a component:

```bash
pnpm registry
```

That regenerates `packages/ui/registry.json` and the served files under
`apps/web/public/r`. CI fails if `registry.json` is stale, or if any declared
item has no built file. Dependency versions in the registry are read from
`packages/ui/package.json`, so a new import needs a declared dependency or
consumers get an unpinned one.

Every component needs a matching page in `apps/web/content/docs/components` —
its frontmatter `title` and `description` are what the registry publishes.

## Before opening a pull request

```bash
pnpm lint
pnpm format
pnpm build
pnpm typecheck
pnpm test
```

Then add a changeset if you touched `packages/ui`:

```bash
pnpm changeset
```

Patch for fixes and additions, minor for changes consumers must adapt to. A
change that genuinely needs no release: `pnpm changeset add --empty`. CI enforces
this, because registry consumers receive the source directly.

## Conventions

- **No code comments.** Name things so the comment is unnecessary. Existing code
  follows this; matching it matters more than personal preference.
- Prettier and oxlint own formatting and style. Do not argue with them in review.
- Styling uses design tokens from `packages/ui/src/styles/tokens`. A hardcoded
  colour that only works in one theme will be sent back.
- Components build on Base UI primitives. Prefer extending a primitive over
  reimplementing focus management, portalling, or keyboard handling.

## Automation

A bot reviews every pull request, and `@claude` in a comment will make changes
directly. See [`.github/BOTS.md`](.github/BOTS.md) for what runs and what it
deliberately leaves alone.
