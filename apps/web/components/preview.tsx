"use client";

import * as React from "react";
import { RiCodeSSlashLine } from "@remixicon/react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { useShiki } from "fumadocs-core/highlight/shiki/react";
import { getHighlighter } from "fumadocs-core/highlight";
import { cn } from "@workspace/ui/lib/utils";

import { codeBlockLabel, codeLangs, codeThemes } from "@/lib/code-theme";

const highlighter = getHighlighter("js", {
  langs: [...codeLangs],
  themes: [codeThemes.light, codeThemes.dark],
});

const COLLAPSED_HEIGHT = "10.5rem";

/** Below this, collapsing saves so little that the toggle is just noise. */
const COLLAPSE_THRESHOLD = 8;

export function Preview({
  code,
  children,
  className,
  lang = "tsx",
  title,
  flat = false,
}: {
  /** Source shown in the code panel. */
  code: string;
  /** The live example. */
  children: React.ReactNode;
  /** Layout classes for the preview canvas: `flex`, `gap-*`, and so on. */
  className?: string;
  lang?: string;
  /** Filename shown above the code. */
  title?: string;
  /** Drop the dot field, for examples that draw their own background. */
  flat?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const codeId = React.useId();

  const highlighted = useShiki(
    () => highlighter,
    code,
    {
      lang,
      themes: codeThemes,
      components: { pre: Pre },
    },
    [code, lang],
  );

  const lineCount = React.useMemo(
    () => code.trimEnd().split("\n").length,
    [code],
  );

  const collapsible = lineCount > COLLAPSE_THRESHOLD;
  const open = expanded || !collapsible;

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border">
      <div
        className={cn("demo rounded-none border-0", flat && "demo-flat", className)}
      >
        {children}
      </div>

      <div className="border-t bg-background">
        <div
          id={codeId}
          /* The clipped remainder is invisible, so Tab focus landing inside it
           * would strand the ring somewhere the reader cannot see. */
          inert={!open}
          className={cn(
            "relative overflow-hidden",
            "transition-[max-height] duration-[var(--duration-moderate)] ease-out",
            !open && "mask-fade-b",
          )}
          style={{ maxHeight: open ? "none" : COLLAPSED_HEIGHT }}
        >
          <CodeBlock
            allowCopy
            title={
              title ?? (
                <span className="font-mono text-2xs tracking-caps text-muted-foreground">
                  {codeBlockLabel(`language-${lang}`)}
                </span>
              )
            }
            className="m-0 rounded-none border-none"
          >
            {highlighted}
          </CodeBlock>
        </div>

        {collapsible ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={open}
            aria-controls={codeId}
            className="press flex w-full items-center justify-center gap-1.5 border-t py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <RiCodeSSlashLine className="size-3.5" />
            {open ? "Hide code" : `Show all ${lineCount} lines`}
          </button>
        ) : null}
      </div>
    </figure>
  );
}
