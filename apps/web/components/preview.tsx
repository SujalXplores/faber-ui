"use client";

import * as React from "react";
import { RiCodeLine, RiEyeLine } from "@remixicon/react";
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
  const [view, setView] = React.useState<"preview" | "code">("preview");

  return (
    <div className="not-prose group/preview relative overflow-hidden rounded-lg border">
      <div className="absolute inset-end-2 top-2 z-10 flex items-center gap-1 rounded-md border border-border/50 bg-background/80 p-0.5 opacity-0 backdrop-blur transition-opacity group-hover/preview:opacity-100">
        <button
          type="button"
          onClick={() => setView("preview")}
          className={cn(
            "flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors",
            view === "preview"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <RiEyeLine className="size-3.5" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setView("code")}
          className={cn(
            "flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors",
            view === "code"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <RiCodeLine className="size-3.5" />
          Code
        </button>
      </div>

      {view === "preview" ? (
        <div className={cn("flex min-h-20 flex-wrap items-center gap-2 p-4", className)}>
          {children}
        </div>
      ) : (
        <pre className="m-0 overflow-x-auto bg-fd-muted/50 p-4 text-xs leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
