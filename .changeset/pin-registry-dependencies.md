---
"@workspace/ui": minor
---

Registry items now publish exact dependency versions. Previously every item
listed bare package names, so `shadcn add` installed the latest release of
`@base-ui/react`, `recharts`, and twelve others — versions the components were
never tested against. The registry build now reads versions from
`packages/ui/package.json`, and warns when a component imports a package that is
not declared there.
