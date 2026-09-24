"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";

export default function DocsErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start py-16">
      <p className="text-xs font-medium tracking-caps text-muted-foreground uppercase">
        Something went wrong
      </p>
      <h1 className="mt-4 font-heading text-2xl font-semibold tracking-display text-balance">
        This doc page could not be rendered.
      </h1>
      <p className="mt-3 text-sm/relaxed text-pretty text-muted-foreground">
        The page content failed to load. Try again, or pick another page from
        the sidebar.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Link
          href="/docs"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All docs
        </Link>
      </div>
    </div>
  );
}
