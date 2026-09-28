"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { buttonVariants } from "@workspace/ui/lib/button-variants";

export default function ErrorPage({
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
    <main className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-32 text-center">
      <p className="text-xs font-medium tracking-caps text-muted-foreground uppercase">
        Something went wrong
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-display text-balance">
        This page could not be rendered.
      </h1>
      <p className="mt-3 max-w-md text-sm/relaxed text-pretty text-muted-foreground">
        An unexpected error occurred while loading this page. Try again, or
        return to the documentation.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Link href="/docs" className={buttonVariants({ variant: "outline" })}>
          Documentation
        </Link>
      </div>
    </main>
  );
}
