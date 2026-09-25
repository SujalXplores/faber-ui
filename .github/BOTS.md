# Automation

What runs without being asked, and the one-time setup each piece needs.

## What runs

| Bot | Trigger | What it does |
| --- | --- | --- |
| **CI** (`ci.yml`) | every PR and push to `main` | lint → format check → build → typecheck, unit tests, `registry.json` drift, built-registry publish guard, workflow lint, changeset presence |
| **Renovate** (`renovate.json5`) | Mondays before 06:00 UTC | grouped dependency PRs, auto-merges the safe ones, weekly lockfile refresh, off-schedule PRs for vulnerabilities |
| **React Doctor** (`react-doctor.yml`) | PR opened or pushed | scans the changed React code for correctness, performance, a11y, and security issues; comments inline and posts a sticky summary |
| **Labeler** (`labeler.yml`) | PR opened or pushed | applies `area:` and `dependencies` labels from changed paths |
| **Audit** (`audit.yml`) | Mondays 04:00 UTC | opens or updates one issue for high-severity advisories, closes it when clean |
| **Stale** (`stale.yml`) | daily 03:00 UTC | warns then closes inactive issues (45d) and PRs (21d) |
| **Release** (`release.yml`) | push to `main`, manual | opens or updates the version PR while changesets are pending; once it merges, tags each new version and creates its GitHub release |

## One-time setup

**1. Renovate** — install the app and grant it this repo:
<https://github.com/apps/renovate>. It opens an onboarding PR; merge it. The
config here already applies, so the onboarding PR should be near-empty.

**2. React Doctor** — nothing to install. It runs `millionco/react-doctor@v2`
on the stock `GITHUB_TOKEN`, needs no app and no secret, and reports only the
issues a PR introduces rather than the existing backlog. To reproduce a finding
locally:

```
npx react-doctor@latest
```

Rules are configurable through a `doctor.config.ts` at the repo root; there is
none yet, so the default ruleset applies. The action pins a major tag, so
Renovate's `github actions` group carries the upgrades.

**3. Repository settings** — auto-merge must be on or Renovate cannot merge
anything itself:

```
gh repo edit --enable-auto-merge --enable-delete-branch-on-merge
```

**4. Branch protection** — make these checks required on `main` so auto-merge
has something to wait for:

```
Lint, typecheck, build
Test
Lint workflows
Changeset present
```

`Lint, typecheck, build` includes the publish guard that asserts every declared
registry item has a built file under `apps/web/public/r`. Keep it required — a
docs build that succeeds without emitting the registry serves install commands
that 404, which is exactly how that broke before.

Leave `Scan React changes` and `Audit` unrequired. React Doctor runs with
`blocking: none`, so it reports and exits clean by design — a finding is a prompt
to look, not a verdict. Advisories are usually transitive and not fixable from
this repo.

**5. Release app** — the version PR has to be opened by a GitHub App, not
`GITHUB_TOKEN`: GitHub triggers no workflows for a PR that `GITHUB_TOKEN`
opens, so CI never runs on it and required checks never report.

1. Create a GitHub App (Settings → Developer settings → GitHub Apps) with
   repository permissions **Contents: read and write** and **Pull requests:
   read and write**, no webhook, installable only on this account.
2. Install it on this repository.
3. Save its client ID as the Actions variable `RELEASE_APP_CLIENT_ID` and a
   generated private key as the Actions secret `RELEASE_APP_PRIVATE_KEY`.

Without the app, `release.yml` falls back to `GITHUB_TOKEN`. That needs
Settings → Actions → General → **Allow GitHub Actions to create and approve pull
requests**, and CI will not run on the version PR.

Tagging needs no setup. Every package is private, so `changeset publish`
publishes nothing to npm; `privatePackages.tag` in `.changeset/config.json`
turns each new version into a git tag, and `changesets/action/publish` pushes it
and creates the GitHub release from the CHANGELOG. Re-run a missed release from
the Actions tab (**Release → Run workflow** on `main`; runs on any other branch
do nothing); it only tags versions that have no tag yet.

**6. Dependabot alerts** — free on private repositories and complements
Renovate's `vulnerabilityAlerts`. Settings → Advanced Security → Dependabot alerts.

## Things the bots deliberately will not touch

- **`next-themes`** is patched in `patches/`. Renovate parks bumps on the
  dependency dashboard because a new version silently invalidates the patch.
- **`next` minors and majors.** `AGENTS.md` warns that this line changes
  conventions between releases; these need a human reading the upgrade guide.
- **Runtime dependencies of `packages/ui`.** They ship into consumer projects
  through the registry, so they get the `needs-changeset` label and wait.
- **Majors, anywhere.** Labelled `major`, never auto-merged.

## Escape hatches

- A change that genuinely needs no release: `pnpm changeset add --empty`.
- Renovate ignoring something: add it to the dependency dashboard checklist, or
  a `packageRules` entry with `enabled: false`.
- Keeping an issue open forever: the `pinned` label.
- Making a React Doctor finding actually fail a PR: set `blocking: warning` or
  `blocking: error` in `react-doctor.yml`, and add `Scan React changes` to the
  required checks.

## Known state

`pnpm audit` currently reports 4 high-severity transitive advisories
(`nanoid` via `next > postcss`, `brace-expansion` via `@fumadocs/story`). Neither
is reachable from a direct dependency. They clear on an upstream release or via
`pnpm.overrides` in `pnpm-workspace.yaml`.
