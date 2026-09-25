# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

Every change that should appear in the changelog needs a changeset. Add one with:

```bash
pnpm changeset
```

`@workspace/ui` is the versioned package, because it is what the registry ships.
`web` is ignored: the documentation app is deployed, not released. Both packages
are private, so `privatePackages.version` and `privatePackages.tag` are enabled
to version and tag them without publishing to npm.

## What happens on release

1. Merging to `main` opens or updates the "chore: version packages" PR. It runs
   `pnpm version-packages`, which writes `CHANGELOG.md` through
   `changelog.mjs` (adds the commit and pull request to each entry) and
   `stamp-release-dates.mjs` (adds the release date).
2. Merging that PR tags the version and publishes a GitHub release from the
   `CHANGELOG.md` entry.
3. The docs deploy renders the same file at `/changelog`, `/changelog.json`,
   `/changelog.md`, `/changelog/rss.xml`, and in each component page's history.

See `.claude/skills/write-changeset/SKILL.md` for how to word a changeset.
