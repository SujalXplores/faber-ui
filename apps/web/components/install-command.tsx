"use client";

import * as React from "react";
import { RiTerminalLine } from "@remixicon/react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { CopyButton } from "@/components/copy-button";

const REGISTRY_URL = "https://faber-ui.vercel.app/r/button.json";

/* One command per package manager. `dlx`/`bunx` resolve the shadcn CLI
 * without adding it to the project. */
const MANAGERS = [
  {
    value: "pnpm",
    label: "pnpm",
    command: `pnpm dlx shadcn@latest add ${REGISTRY_URL}`,
  },
  {
    value: "npm",
    label: "npm",
    command: `npx shadcn@latest add ${REGISTRY_URL}`,
  },
  {
    value: "yarn",
    label: "yarn",
    command: `yarn dlx shadcn@latest add ${REGISTRY_URL}`,
  },
  {
    value: "bun",
    label: "bun",
    command: `bunx shadcn@latest add ${REGISTRY_URL}`,
  },
] as const;

type Manager = (typeof MANAGERS)[number]["value"];

/* Header matches the docs code blocks: solid `bg-surface-3` over the
 * `bg-surface-2` body, mono 2xs label, copy action at the inline-end. */
export function InstallCommand() {
  const [manager, setManager] = React.useState<Manager>("pnpm");
  const active =
    MANAGERS.find((entry) => entry.value === manager) ?? MANAGERS[0];

  return (
    <Tabs
      value={manager}
      onValueChange={(value) => setManager(value as Manager)}
    >
      <div className="overflow-hidden rounded-xl border bg-surface-2">
        <div className="flex items-center gap-2 border-b bg-surface-3 py-1.5 ps-3.5 pe-1.5">
          <RiTerminalLine
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <span className="flex-1 truncate font-mono text-2xs tracking-caps text-muted-foreground">
            Terminal
          </span>
          <TabsList aria-label="Package manager">
            {MANAGERS.map((entry) => (
              <TabsTrigger key={entry.value} value={entry.value}>
                {entry.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <CopyButton value={active.command} label="Copy install command" />
        </div>

        {MANAGERS.map((entry) => (
          <TabsContent key={entry.value} value={entry.value} className="p-4">
            <code className="block scrollbar-subtle overflow-x-auto font-mono text-sm whitespace-nowrap text-foreground">
              <span className="text-muted-foreground select-none">$ </span>
              {entry.command}
            </code>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
