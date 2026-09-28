"use client";

import * as React from "react";
import { RiCodeSSlashLine } from "@remixicon/react";
import { CodeBlock } from "fumadocs-ui/components/codeblock";
import { cn } from "@workspace/ui/lib/utils";

const COLLAPSED_HEIGHT = "10.5rem";

/** Below this, collapsing saves so little that the toggle is just noise. */
const COLLAPSE_THRESHOLD = 8;

export function PreviewCode({
  lineCount,
  title,
  children,
}: {
  lineCount: number;
  title: React.ReactNode;
  /** The highlighted code, rendered on the server. */
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [fullHeight, setFullHeight] = React.useState<number | null>(null);
  const codeId = React.useId();
  const codeRef = React.useRef<HTMLDivElement>(null);

  const collapsible = lineCount > COLLAPSE_THRESHOLD;
  const open = expanded || !collapsible;

  React.useEffect(() => {
    if (!open || !codeRef.current) return;
    setFullHeight(codeRef.current.scrollHeight);
  }, [open]);

  return (
    <div className="border-t bg-background">
      <div
        id={codeId}
        ref={codeRef}
        /* The clipped remainder is invisible, so Tab focus landing inside it
         * would strand the ring somewhere the reader cannot see. */
        inert={!open}
        className={cn(
          "relative overflow-hidden",
          "transition-[max-height] duration-(--duration-moderate) ease-out",
          !open && "mask-fade-b",
        )}
        style={{
          maxHeight: !collapsible
            ? "none"
            : open && fullHeight !== null
              ? fullHeight
              : COLLAPSED_HEIGHT,
        }}
      >
        <CodeBlock
          allowCopy
          title={title}
          className="m-0 rounded-none border-none"
        >
          {children}
        </CodeBlock>
      </div>

      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={open}
          aria-controls={codeId}
          className="flex w-full press items-center justify-center gap-1.5 border-t py-2 text-xs font-medium text-muted-foreground hover:bg-surface-2 hover:text-foreground"
        >
          <RiCodeSSlashLine className="size-3.5" />
          {open ? "Hide code" : `Show all ${lineCount} lines`}
        </button>
      ) : null}
    </div>
  );
}
