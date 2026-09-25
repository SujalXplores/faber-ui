import { source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

import { changelogRoute, siteUrl } from "@/lib/changelog";

export const revalidate = false;

const changelogSection = `

## Changelog

- [Changelog](${siteUrl}/changelog.md): every release of @workspace/ui with dates, semver type, commits, pull requests, and affected components. Structured JSON at ${siteUrl}/changelog.json, human view at ${siteUrl}${changelogRoute}.
`;

export async function GET() {
  return new Response((await llms(source).index()) + changelogSection);
}
