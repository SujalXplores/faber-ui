"use client";

import * as React from "react";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { cn } from "@workspace/ui/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        if (!navigator.clipboard) return;
        void navigator.clipboard
          .writeText(value)
          .then(() => setCopied(true))
          .catch(() => setCopied(false));
      }}
      className={cn(
        "group/copy inline-grid size-7 press place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
      data-copied={copied}
      aria-label={copied ? "Copied to clipboard" : label}
    >
      <RiFileCopyLine
        aria-hidden
        className="col-start-1 row-start-1 size-3.5 transition-[opacity,scale,filter] duration-base ease-out group-data-[copied=true]/copy:scale-(--scale-enter) group-data-[copied=true]/copy:opacity-0 group-data-[copied=true]/copy:blur-[2px]"
      />
      <RiCheckLine
        aria-hidden
        className="col-start-1 row-start-1 size-3.5 text-success transition-[opacity,scale,filter] duration-base ease-out group-data-[copied=false]/copy:scale-(--scale-enter) group-data-[copied=false]/copy:opacity-0 group-data-[copied=false]/copy:blur-[2px]"
      />
      {/* The icon swap alone conveys nothing to a screen reader. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
