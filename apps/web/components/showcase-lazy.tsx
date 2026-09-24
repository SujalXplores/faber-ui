"use client";

import dynamic from "next/dynamic";

export const ShowcaseLazy = dynamic(
  () => import("@/components/showcase").then((mod) => mod.Showcase),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-64 animate-pulse rounded-xl border bg-surface-2" />
    ),
  },
);
