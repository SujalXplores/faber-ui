import { loader } from "fumadocs-core/source";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";

import { codeThemes } from "@/lib/code-theme";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    mdxOptions: applyMdxPreset({
      preset: "fumadocs",
      rehypeCodeOptions: { themes: codeThemes, addLanguageClass: true },
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

export const docsRoute = "/docs";
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
