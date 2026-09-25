---
name: write-changeset
description: Write the changeset for a change to packages/ui so it renders correctly on the /changelog page, the RSS/JSON/Markdown feeds, and each component's docs history. Use when a change touches packages/ui, when asked to "add a changeset", "write release notes", "prepare a release", or before opening a pull request that changes a component, token, style, or dependency.
---

# Write a changeset

The changelog is generated, never hand-written. A changeset in `.changeset/*.md`
becomes an entry in `packages/ui/CHANGELOG.md` when the version PR is created,
and that file feeds:

- `/changelog`: the human page, filterable by type and component
- `/changelog.json`, `/changelog.md`, `/changelog/rss.xml`: machine-readable feeds
- the "Changelog" section at the bottom of every component docs page
- the GitHub release for the version

Commit hashes, pull request numbers, and release dates are added automatically
(`.changeset/changelog.mjs` and `.changeset/stamp-release-dates.mjs`). Never type
them into a changeset and never edit `CHANGELOG.md` by hand.

## Steps

1. Read the diff (`git diff origin/main...HEAD -- packages/ui`). Only
   consumer-facing effects matter: what someone who ran `shadcn add` will see.
2. Pick the bump using this repository's convention:
   - `minor`: consumers must adapt (renamed or removed prop, changed default,
     changed markup that selectors or tests rely on, new required dependency)
   - `patch`: fixes and additions that need no action
   - `major`: reserved; ask before using it
3. Write one changeset per independent change, so each renders as its own entry
   and can be filtered on its own:

   ```md
   ---
   "@workspace/ui": patch
   ---

   Select pads its list so options no longer sit flush against the popup edge.

   Optional detail paragraphs: the cause, what changed, how to migrate.
   ```

   Save it as `.changeset/<kebab-case-summary>.md`, or run `pnpm changeset`.
4. If nothing a consumer receives changed (tests, docs app, CI), add an empty
   changeset instead: `pnpm changeset add --empty`.

## Writing rules

- **The first sentence is the headline.** It appears alone in RSS, JSON
  `headline`, and component history. Make it standalone, present tense, and
  under ~200 characters. Lead with the component: "Dialog closes on…", not
  "Fixed a bug where…".
- **Name components exactly as exported, in PascalCase** (`DropdownMenu`,
  `HoverCard`, `InputOTP`). Tags and docs links are detected from these names;
  subcomponents such as `SidebarRail` tag their parent. Lowercase words
  ("the select list") are not detected.
- Wrap props, tokens, classes, and CSS variables in backticks: `alignOffset`,
  `--secondary-hover`.
- For `minor`, say what the consumer must change, with a before/after snippet if
  it is not obvious.
- No internal jargon, ticket numbers, or process notes ("per review",
  "audit batch 3").

## Reading the changelog as an agent

Prefer the feeds over scraping the page:

- `https://faber-ui.vercel.app/changelog.json`: `releases[].changes[]` with
  `type`, `headline`, `markdown`, `commit`, `pullRequest`, and `components`
- `https://faber-ui.vercel.app/changelog.md`: the same content as Markdown,
  also appended to `/llms-full.txt`
