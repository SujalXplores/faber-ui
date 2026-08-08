"use client";

import * as React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { cn } from "@workspace/ui/lib/utils";

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
          <pre className="m-0 overflow-x-auto bg-fd-muted/30 p-4 text-xs leading-relaxed">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="relative">
            <pre className="m-0 overflow-hidden bg-fd-muted/30 p-4 text-xs leading-relaxed">
              <code>{previewLines}</code>
            </pre>
            <div
              className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3"
              style={{
                background:
                  "linear-gradient(to top, var(--color-fd-muted), color-mix(in oklab, var(--color-fd-muted) 60%, transparent), transparent)",
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
