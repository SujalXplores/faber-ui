import { loader } from "fumadocs-core/source";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";

import { codeThemes } from "@/lib/code-theme";

const PACKAGE_MANAGERS = [
  {
    name: "pnpm",
    command: (cmd: string) => cmd.replace(/^npx /gm, "pnpm dlx "),
  },
  { name: "npm", command: (cmd: string) => cmd },
  {
    name: "yarn",
    command: (cmd: string) => cmd.replace(/^npx /gm, "yarn dlx "),
  },
  { name: "bun", command: (cmd: string) => cmd.replace(/^npx /gm, "bunx ") },
];

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    lastModified: true,
    mdxOptions: applyMdxPreset({
      preset: "fumadocs",
      rehypeCodeOptions: { themes: codeThemes, addLanguageClass: true },
      remarkNpmOptions: {
        persist: { id: "package-manager" },
        packageManagers: PACKAGE_MANAGERS,
      },
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const gitConfig = {
  user: "SujalXplores",
  repo: "faber-ui",
  branch: "main",
  /* Docs live inside the web app, not at the repository root. Without this the
   * "Edit on GitHub" link resolved to /blob/main/content/docs/… and 404'd. */
  contentPath: "apps/web/content/docs",
};

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...docsImageRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...docsContentRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
