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
        void navigator.clipboard.writeText(value).then(() => setCopied(true));
      }}
      className={cn(
        "press inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
      aria-label={copied ? "Copied to clipboard" : label}
    >
      {copied ? (
        <RiCheckLine className="size-3.5 text-success" />
      ) : (
        <RiFileCopyLine className="size-3.5" />
      )}
      {/* The icon swap alone conveys nothing to a screen reader. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
