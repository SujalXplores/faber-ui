import { createMarkdownRenderer } from "fumadocs-core/content/md";
import { rehypeCode } from "fumadocs-core/mdx-plugins/rehype-code";
import { remarkGfm } from "fumadocs-core/mdx-plugins/remark-gfm";

import { getMDXComponents } from "@/components/mdx";
import { codeThemes } from "@/lib/code-theme";

const renderer = createMarkdownRenderer({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypeCode, { themes: codeThemes }]],
});

export function EntryBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose max-w-none text-sm/relaxed text-pretty *:first:mt-0 *:last:mb-0 [&_p]:my-2">
      <renderer.MarkdownServer components={getMDXComponents()}>
        {markdown}
      </renderer.MarkdownServer>
    </div>
  );
}
