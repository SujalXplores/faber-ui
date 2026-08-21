# Security policy

## Reporting a vulnerability

Report vulnerabilities privately through GitHub, not in a public issue:

**[Open a private security advisory](https://github.com/SujalXplores/faber-ui/security/advisories/new)**

If that link 404s, private reporting needs enabling once under
Settings → Advanced Security → Private vulnerability reporting.

Expect an acknowledgement within a few days. Please include the affected
component, the version or commit you tested, and a reproduction.

## Scope

Faber UI distributes component **source code** through a shadcn registry —
consumers copy it into their own projects rather than installing a package.
That shapes what counts as a vulnerability here:

**In scope**

- A component that mishandles user-supplied content in a way that enables XSS,
  for example rendering unsanitised HTML.
- A registry item that resolves to unexpected files, or dependencies that do not
  match what the repository declares.
- Focus traps, portals, or overlays that can be escaped in a way that allows
  clickjacking against the host application.

**Out of scope**

- Advisories in transitive dependencies of the documentation site that are not
  reachable from any published component. These are tracked in the open
  dependency advisories issue.
- Findings that require a consumer to have already introduced the flaw in their
  own integration.

## Supported versions

The registry serves one version: whatever is currently on `main`. There are no
maintained release branches, so fixes land on `main` and reach consumers the next
time they run `shadcn add` or `shadcn diff`.
