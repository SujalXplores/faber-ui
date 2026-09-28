"use client";

import * as React from "react";

import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select";
import { cn } from "@workspace/ui/lib/utils";

import type { BumpType } from "@/lib/changelog";

type FilterableEntry = { type: BumpType; components: string[] };

const TYPES: BumpType[] = ["major", "minor", "patch"];

function matchSelector(type: BumpType | "", component: string) {
  return [
    "[data-changelog-entry]",
    type && `[data-type="${type}"]`,
    component && `[data-components~="${component}"]`,
  ].join("");
}

function filterStyles(type: BumpType | "", component: string) {
  if (!type && !component) return "";
  const match = matchSelector(type, component);
  return [
    `[data-changelog-entry]:not(${match}){display:none}`,
    `[data-changelog-section]:not(:has(${match})){display:none}`,
    `[data-changelog-release]:not(:has(${match})){display:none}`,
    `[data-changelog-list]:not(:has(${match}))~[data-changelog-empty]{display:block}`,
  ].join("\n");
}

function readParams(types: BumpType[], components: string[]) {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") as BumpType | null;
  const component = params.get("component");
  return {
    type: type && types.includes(type) ? type : "",
    component: component && components.includes(component) ? component : "",
  } as const;
}

function writeParams(type: BumpType | "", component: string) {
  const url = new URL(window.location.href);
  if (type) url.searchParams.set("type", type);
  else url.searchParams.delete("type");
  if (component) url.searchParams.set("component", component);
  else url.searchParams.delete("component");
  window.history.replaceState(null, "", url);
}

export function ChangelogFilter({
  entries,
  components,
}: {
  entries: FilterableEntry[];
  components: string[];
}) {
  const types = TYPES.filter((type) => entries.some((e) => e.type === type));
  const [type, setType] = React.useState<BumpType | "">("");
  const [component, setComponent] = React.useState("");

  React.useEffect(() => {
    const present = TYPES.filter((t) => entries.some((e) => e.type === t));
    const initial = readParams(present, components);
    setType(initial.type);
    setComponent(initial.component);
  }, [entries, components]);

  const update = (nextType: BumpType | "", nextComponent: string) => {
    setType(nextType);
    setComponent(nextComponent);
    writeParams(nextType, nextComponent);
  };

  const matching = entries.filter(
    (entry) =>
      (!type || entry.type === type) &&
      (!component || entry.components.includes(component)),
  ).length;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <style>{filterStyles(type, component)}</style>

      <div
        role="group"
        aria-label="Filter by release type"
        className="inline-flex items-center gap-0.5 rounded-md border bg-surface-2 p-0.5"
      >
        {(["", ...types] as const).map((option) => (
          <button
            key={option || "all"}
            type="button"
            aria-pressed={type === option}
            onClick={() => update(option, component)}
            className={cn(
              "h-6 rounded-sm px-2.5 text-xs font-medium capitalize transition-colors",
              type === option
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option || "All"}
          </button>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        Component
        <NativeSelect
          value={component}
          onChange={(event) => update(type, event.target.value)}
          aria-label="Filter by component"
        >
          <NativeSelectOption value="">Any</NativeSelectOption>
          {components.map((name) => (
            <NativeSelectOption key={name} value={name}>
              {name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </label>

      <p
        className="ms-auto font-mono text-xs text-muted-foreground tabular-nums"
        aria-live="polite"
      >
        {matching} of {entries.length} changes
      </p>
    </div>
  );
}
