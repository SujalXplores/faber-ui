"use client";

import * as React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { CodeBlock } from "fumadocs-ui/components/codeblock";
import { useShiki } from "fumadocs-core/highlight/shiki/react";
import { getHighlighter } from "fumadocs-core/highlight";
import { cn } from "@workspace/ui/lib/utils";

const highlighter = getHighlighter("js", {
  langs: ["tsx", "ts", "jsx", "js", "bash"],
  themes: ["github-light", "github-dark"],
});

export function Preview({
  code,
  children,
  className,
}: {
  code: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const codeLines = code.split("\n");
  const previewLines = codeLines.slice(0, 3).join("\n");

  const highlightedFull = useShiki(
    () => highlighter,
    code,
    {
      lang: "tsx",
      themes: { light: "github-light", dark: "github-dark" },
    },
    [code],
  );

  const highlightedPreview = useShiki(
    () => highlighter,
    previewLines,
    {
      lang: "tsx",
      themes: { light: "github-light", dark: "github-dark" },
    },
    [previewLines],
  );

  return (
    <div className="not-prose group relative mt-4 mb-8 flex flex-col overflow-hidden rounded-lg border">
      <div
        className={cn(
          "preview flex min-h-32 flex-wrap items-center justify-center gap-2 p-6",
          className,
        )}
      >
        {children}
      </div>
      <div data-slot="code" className="relative border-t">
        {expanded ? (
          <CodeBlock allowCopy className="m-0 rounded-none border-none">
            {highlightedFull}
          </CodeBlock>
        ) : (
          <div className="relative">
            <CodeBlock allowCopy={false} className="m-0 rounded-none border-none">
              {highlightedPreview}
            </CodeBlock>
            <div
              className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3"
              style={{
                background:
                  "linear-gradient(to top, var(--color-fd-background), color-mix(in oklab, var(--color-fd-background) 60%, transparent), transparent)",
              }}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? (
            <>
              <RiArrowUpSLine className="size-3.5" />
              Collapse
            </>
          ) : (
            <>
              <RiArrowDownSLine className="size-3.5" />
              View Code
            </>
          )}
        </button>
      </div>
    </div>
  );
}
