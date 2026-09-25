import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHANGELOGS = ["packages/ui/CHANGELOG.md"];

const VERSION_HEADING = /^## \d+\.\d+\.\d+\S*$/;
const RELEASED_MARKER = /^<!-- released: \d{4}-\d{2}-\d{2} -->$/;

const today = new Date().toISOString().slice(0, 10);

function nextContentLine(lines, from) {
  for (let index = from; index < lines.length; index++) {
    if (lines[index].trim() !== "") return lines[index].trim();
  }
  return "";
}

function stamp(source) {
  const lines = source.split("\n");
  const stamped = [];
  let added = 0;

  lines.forEach((line, index) => {
    stamped.push(line);
    if (!VERSION_HEADING.test(line)) return;
    if (RELEASED_MARKER.test(nextContentLine(lines, index + 1))) return;
    stamped.push("", `<!-- released: ${today} -->`);
    added++;
  });

  return { text: stamped.join("\n"), added };
}

for (const relative of CHANGELOGS) {
  const file = path.join(ROOT, relative);
  const source = await readFile(file, "utf8").catch(() => null);
  if (source === null) continue;

  const { text, added } = stamp(source);
  if (added === 0) continue;

  await writeFile(file, text);
  console.log(`${relative}: stamped ${added} release(s) with ${today}`);
}
