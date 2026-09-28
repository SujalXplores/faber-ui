import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const UI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.resolve(UI, process.argv[2] ?? "../../apps/web/public/r");

/* The shadcn CLI only remaps `@/` imports onto a consumer's aliases. */
const ALIASES = [
  ["@workspace/ui/components/", "@/components/ui/"],
  ["@workspace/ui/hooks/", "@/hooks/"],
  ["@workspace/ui/lib/", "@/lib/"],
];

function rewrite(content) {
  return ALIASES.reduce(
    (text, [from, to]) => text.replaceAll(`"${from}`, `"${to}`),
    content,
  );
}

const names = await readdir(OUT);
const changedFlags = await Promise.all(
  names.map(async (name) => {
    if (!name.endsWith(".json") || name === "registry.json") return false;
    const file = path.join(OUT, name);
    const item = JSON.parse(await readFile(file, "utf8"));
    if (!Array.isArray(item.files)) return false;
    let changed = false;
    for (const entry of item.files) {
      if (typeof entry.content !== "string") continue;
      const next = rewrite(entry.content);
      if (next !== entry.content) {
        entry.content = next;
        changed = true;
      }
    }
    if (changed) {
      await writeFile(file, `${JSON.stringify(item, null, 2)}\n`);
      return true;
    }
    return false;
  }),
);
const rewritten = changedFlags.filter(Boolean).length;

const jsonNames = (await readdir(OUT)).filter((name) => name.endsWith(".json"));
const leftover = (
  await Promise.all(
    jsonNames.map(async (name) => ({
      name,
      text: await readFile(path.join(OUT, name), "utf8"),
    })),
  )
)
  .filter(({ text }) => text.includes("@workspace/"))
  .map(({ name }) => name);
if (leftover.length) {
  console.error(`workspace imports left in: ${leftover.join(", ")}`);
  process.exit(1);
}
console.log(
  `registry imports: rewrote ${rewritten} items for consumer aliases`,
);
