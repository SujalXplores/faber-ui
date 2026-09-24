import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

const UI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(UI, "src");
const DOCS = path.resolve(UI, "../../apps/web/content/docs/components");

const BASE = (process.env.REGISTRY_BASE_URL ?? "https://faber-ui.vercel.app").replace(/\/$/, "");

const EXTERNAL_IGNORE = new Set(["react", "react-dom"]);

const MANIFEST = JSON.parse(await readFile(path.join(UI, "package.json"), "utf8"));
const VERSIONS = MANIFEST.dependencies ?? {};
const undeclared = new Set();

function versioned(pkg) {
  const version = VERSIONS[pkg];
  if (!version) {
    undeclared.add(pkg);
    return pkg;
  }
  return `${pkg}@${version}`;
}

const GROUPS = [
  { dir: "components", ext: ".tsx", type: "registry:ui", target: "components/ui" },
  { dir: "hooks", ext: ".ts", type: "registry:hook", target: "hooks" },
  { dir: "lib", ext: ".ts", type: "registry:lib", target: "lib" },
];

const MANUAL_DESCRIPTIONS = {
  utils: "The cn helper that merges class names through clsx and tailwind-merge.",
  motion:
    "Easing and duration tokens for JavaScript-driven animation, mirroring the motion CSS tokens.",
  "use-mobile": "Tracks whether the viewport is below the 768px mobile breakpoint.",
};

function specifiers(source, filename) {
  const found = new Set();
  const ast = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      const specifier = node.moduleSpecifier;
      if (specifier && ts.isStringLiteralLike(specifier)) {
        found.add(specifier.text);
      }
    } else if (
      ts.isCallExpression(node) &&
      node.arguments.length === 1 &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      const callee = node.expression;
      if (
        callee.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(callee) && callee.text === "require")
      ) {
        found.add(node.arguments[0].text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return found;
}

function packageName(specifier) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function unquote(value) {
  if (value === undefined) return undefined;
  const quoted = /^["'](.*)["']$/.exec(value);
  return quoted ? quoted[1] : value;
}

async function frontmatter(name) {
  const file = path.join(DOCS, `${name}.mdx`);
  if (!existsSync(file)) return {};
  const text = (await readFile(file, "utf8")).replace(/^\uFEFF/, "");
  const block = /^\s*---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!block) return {};
  return {
    title: unquote(/^title:\s*(.+?)\s*$/m.exec(block[1])?.[1]),
    description: unquote(/^description:\s*(.+?)\s*$/m.exec(block[1])?.[1]),
  };
}

function titleCase(name) {
  return name.replace(/(^|-)([a-z])/g, (_, sep, ch) => (sep ? " " : "") + ch.toUpperCase());
}

async function buildItem(group, file) {
  const name = path.basename(file, group.ext);
  const relative = path.posix.join("src", group.dir, path.basename(file));
  const source = await readFile(path.join(SRC, group.dir, file), "utf8");

  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const specifier of specifiers(source, file)) {
    if (specifier.startsWith(".")) continue;
    if (specifier.startsWith("@workspace/ui/")) {
      const rest = specifier.slice("@workspace/ui/".length);
      const [area, ...tail] = rest.split("/");
      if (!["components", "hooks", "lib"].includes(area)) {
        console.warn(
          `warning: ${name} imports from untracked workspace area "${area}" (${specifier}); add it to GROUPS or the dep will be missed`,
        );
        continue;
      }
      const dep = tail.join("/");
      if (dep && dep !== name) registryDependencies.add(dep);
      continue;
    }
    if (specifier.startsWith("node:")) continue;
    const pkg = packageName(specifier);
    if (!EXTERNAL_IGNORE.has(pkg)) dependencies.add(versioned(pkg));
  }

  const { title, description } = await frontmatter(name);
  const item = {
    name,
    type: group.type,
    title: title ?? titleCase(name),
    description: description ?? MANUAL_DESCRIPTIONS[name],
    files: [{ path: relative, type: group.type, target: `${group.target}/${path.basename(file)}` }],
  };
  if (!item.description) delete item.description;
  if (dependencies.size) item.dependencies = [...dependencies].sort();
  if (registryDependencies.size) {
    item.registryDependencies = [...registryDependencies]
      .sort()
      .map((dep) => `${BASE}/r/${dep}.json`);
  }
  return item;
}

const items = [];
for (const group of GROUPS) {
  const dir = path.join(SRC, group.dir);
  if (!existsSync(dir)) continue;
  const files = (await readdir(dir))
    .filter((f) => f.endsWith(group.ext) && !f.includes(".test."))
    .sort();
  for (const file of files) items.push(await buildItem(group, file));
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "faber-ui",
  homepage: BASE,
  items,
};

await writeFile(path.join(UI, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
console.log(`registry.json: ${items.length} items, base ${BASE}`);

if (undeclared.size) {
  console.warn(
    `warning: imported but not declared in packages/ui/package.json dependencies, so consumers get an unpinned version: ${[...undeclared].sort().join(", ")}`,
  );
}
