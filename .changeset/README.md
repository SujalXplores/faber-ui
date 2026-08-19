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
