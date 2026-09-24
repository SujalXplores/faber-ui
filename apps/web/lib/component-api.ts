import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import * as ts from "typescript";

const COMPONENTS_DIR = path.resolve(
  process.cwd(),
  "../../packages/ui/src/components",
);

const BASE_UI_PREFIX = "@base-ui/react/";
const BASE_UI_UTILS = new Set([
  "direction-provider",
  "csp-provider",
  "merge-props",
  "use-render",
]);
const KIT_PREFIX = "@workspace/ui/components/";

export type ApiSource = { name: string; href?: string | undefined };

export type ApiProp = {
  name: string;
  type: string;
  default?: string | undefined;
  required: boolean;
};

export type ApiPart = {
  name: string;
  kind: "component" | "hook" | "utility";
  renders?: string | undefined;
  source?: ApiSource | undefined;
  slot?: string | undefined;
  props: ApiProp[];
};

type ImportBinding = { module: string; imported: string };

function bindingsOf(statement: ts.ImportDeclaration) {
  const module = (statement.moduleSpecifier as ts.StringLiteral).text;
  const clause = statement.importClause;
  const bindings: [string, ImportBinding][] = [];
  if (clause?.name) {
    bindings.push([clause.name.text, { module, imported: clause.name.text }]);
  }
  const named = clause?.namedBindings;
  if (named && ts.isNamedImports(named)) {
    for (const element of named.elements) {
      bindings.push([
        element.name.text,
        { module, imported: (element.propertyName ?? element.name).text },
      ]);
    }
  } else if (named && ts.isNamespaceImport(named)) {
    bindings.push([named.name.text, { module, imported: named.name.text }]);
  }
  return bindings;
}

function collectImports(file: ts.SourceFile) {
  return new Map(
    file.statements.filter(ts.isImportDeclaration).flatMap(bindingsOf),
  );
}

function collectDeclarations(file: ts.SourceFile) {
  const declarations = new Map<string, ts.Node>();
  for (const statement of file.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      declarations.set(statement.name.text, statement);
    } else if (ts.isTypeAliasDeclaration(statement)) {
      declarations.set(statement.name.text, statement);
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
          declarations.set(declaration.name.text, declaration.initializer);
        }
      }
    }
  }
  return declarations;
}

type ExportEntry = { name: string; from?: ImportBinding | undefined };

function collectExports(file: ts.SourceFile) {
  const entries: ExportEntry[] = [];
  for (const statement of file.statements) {
    if (
      ts.isExportDeclaration(statement) &&
      !statement.isTypeOnly &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      const module = statement.moduleSpecifier
        ? (statement.moduleSpecifier as ts.StringLiteral).text
        : undefined;
      for (const element of statement.exportClause.elements.filter(
        (candidate) => !candidate.isTypeOnly,
      )) {
        const name = element.name.text;
        const imported = (element.propertyName ?? element.name).text;
        entries.push({ name, from: module ? { module, imported } : undefined });
      }
    }
    const exported =
      ts.canHaveModifiers(statement) &&
      ts
        .getModifiers(statement)
        ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (exported && ts.isFunctionDeclaration(statement) && statement.name) {
      entries.push({ name: statement.name.text });
    }
  }
  return entries;
}

function describeSource(module: string): ApiSource {
  if (module.startsWith(BASE_UI_PREFIX)) {
    const slug = module.slice(BASE_UI_PREFIX.length);
    const section = BASE_UI_UTILS.has(slug) ? "utils" : "components";
    return {
      name: "Base UI",
      href: `https://base-ui.com/react/${section}/${slug}`,
    };
  }
  if (module.startsWith(KIT_PREFIX)) {
    return {
      name: "Faber UI",
      href: `/docs/components/${module.slice(KIT_PREFIX.length)}`,
    };
  }
  return { name: module, href: `https://www.npmjs.com/package/${module}` };
}

type JsxTarget = { tag: string; slot?: string | undefined };

function jsxTag(node: ts.JsxOpeningLikeElement) {
  return node.tagName.getText();
}

function jsxSlot(node: ts.JsxOpeningLikeElement) {
  for (const attribute of node.attributes.properties) {
    if (
      ts.isJsxAttribute(attribute) &&
      attribute.name.getText() === "data-slot" &&
      attribute.initializer &&
      ts.isStringLiteral(attribute.initializer)
    ) {
      return attribute.initializer.text;
    }
  }
  return undefined;
}

function renderTagOf(call: ts.CallExpression) {
  const [options] = call.arguments;
  if (!options || !ts.isObjectLiteralExpression(options)) return undefined;
  for (const property of options.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      property.name.getText() === "defaultTagName" &&
      ts.isStringLiteral(property.initializer)
    ) {
      return property.initializer.text;
    }
  }
  return undefined;
}

const SLOT_KEYS = new Set(['"data-slot"', "slot"]);

function findSlot(node: ts.Node): string | undefined {
  let slot: string | undefined = undefined;
  const visit = (child: ts.Node) => {
    if (slot) return;
    if (
      ts.isPropertyAssignment(child) &&
      SLOT_KEYS.has(child.name.getText()) &&
      ts.isStringLiteral(child.initializer)
    ) {
      slot = child.initializer.text;
      return;
    }
    ts.forEachChild(child, visit);
  };
  visit(node);
  return slot;
}

function spreadsRest(node: ts.JsxOpeningLikeElement, rest: string | undefined) {
  return (
    rest !== undefined &&
    node.attributes.properties.some(
      (attribute) =>
        ts.isJsxSpreadAttribute(attribute) &&
        attribute.expression.getText() === rest,
    )
  );
}

function findTarget(
  body: ts.Node,
  rest: string | undefined,
): JsxTarget | undefined {
  let first: JsxTarget | undefined = undefined;
  let slotted: JsxTarget | undefined = undefined;
  let spread: JsxTarget | undefined = undefined;
  const visit = (node: ts.Node) => {
    if (spread) return;
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      const target = { tag: jsxTag(opening), slot: jsxSlot(opening) };
      first ??= target;
      if (target.slot) slotted ??= target;
      if (spreadsRest(opening, rest)) {
        spread = target;
        return;
      }
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText() === "useRender"
    ) {
      const tag = renderTagOf(node);
      if (tag) {
        spread = { tag, slot: findSlot(node) };
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(body);
  return spread ?? slotted ?? first;
}

function restName(parameter: ts.ParameterDeclaration | undefined) {
  if (!parameter) return undefined;
  if (ts.isIdentifier(parameter.name)) return parameter.name.text;
  if (!ts.isObjectBindingPattern(parameter.name)) return undefined;
  const element = parameter.name.elements.find(
    (candidate) => candidate.dotDotDotToken,
  );
  return element && ts.isIdentifier(element.name)
    ? element.name.text
    : undefined;
}

export function partAnchor(name: string) {
  return `api-${name.toLowerCase()}`;
}

function resolveTag(
  tag: string,
  imports: Map<string, ImportBinding>,
  declarations: Map<string, ts.Node>,
): Pick<ApiPart, "renders" | "source"> {
  if (/^[a-z]/.test(tag)) {
    return { renders: `<${tag}>`, source: { name: "HTML" } };
  }
  const [head, ...rest] = tag.split(".");
  const binding = imports.get(head!);
  if (!binding) {
    return declarations.has(tag)
      ? {
          renders: tag,
          source: { name: "Faber UI", href: `#${partAnchor(tag)}` },
        }
      : { renders: tag };
  }
  return {
    renders: [binding.imported, ...rest].join("."),
    source: describeSource(binding.module),
  };
}

function textOf(node: ts.Node) {
  return node.getText().replace(/\s+/g, " ").trim();
}

function unionOfKeys(object: ts.ObjectLiteralExpression) {
  return object.properties
    .map((property) => property.name?.getText())
    .filter((name): name is string => Boolean(name))
    .map((name) => (name.startsWith('"') ? name : `"${name}"`))
    .join(" | ");
}

function propertyOf(object: ts.ObjectLiteralExpression, key: string) {
  const match = object.properties.find(
    (property) => property.name?.getText() === key,
  );
  return match && ts.isPropertyAssignment(match)
    ? match.initializer
    : undefined;
}

function variantProps(initializer: ts.Node | undefined): ApiProp[] {
  if (!initializer || !ts.isCallExpression(initializer)) return [];
  const [, config] = initializer.arguments;
  if (!config || !ts.isObjectLiteralExpression(config)) return [];
  const variants = propertyOf(config, "variants");
  const defaults = propertyOf(config, "defaultVariants");
  if (!variants || !ts.isObjectLiteralExpression(variants)) return [];
  return variants.properties.flatMap((property) => {
    if (!ts.isPropertyAssignment(property)) return [];
    if (!ts.isObjectLiteralExpression(property.initializer)) return [];
    const name = property.name.getText();
    const fallback =
      defaults && ts.isObjectLiteralExpression(defaults)
        ? propertyOf(defaults, name)
        : undefined;
    return [
      {
        name,
        type: unionOfKeys(property.initializer),
        default: fallback ? textOf(fallback) : undefined,
        required: false,
      },
    ];
  });
}

function displayName(text: string, imports: Map<string, ImportBinding>) {
  const [head, ...rest] = text.replace(/\.Props$/, "").split(".");
  const binding = imports.get(head!);
  return [binding?.imported ?? head, ...rest].join(".");
}

function collectTypeProps(
  type: ts.TypeNode | undefined,
  imports: Map<string, ImportBinding>,
  declarations: Map<string, ts.Node>,
): ApiProp[] {
  if (!type) return [];
  if (ts.isIntersectionTypeNode(type) || ts.isUnionTypeNode(type)) {
    return type.types.flatMap((member) =>
      collectTypeProps(member, imports, declarations),
    );
  }
  if (ts.isParenthesizedTypeNode(type)) {
    return collectTypeProps(type.type, imports, declarations);
  }
  if (ts.isTypeLiteralNode(type)) {
    return type.members.flatMap((member) => {
      if (!ts.isPropertySignature(member) || !member.type) return [];
      return [
        {
          name: member.name.getText(),
          type: textOf(member.type),
          required: !member.questionToken,
        },
      ];
    });
  }
  if (!ts.isTypeReferenceNode(type)) return [];

  const reference = type.typeName.getText();
  const [first, second] = type.typeArguments ?? [];

  if (reference === "VariantProps" && first && ts.isTypeQueryNode(first)) {
    return variantProps(declarations.get(first.exprName.getText()));
  }

  if (reference === "Pick" && first && second) {
    return literalKeys(second).map((key) => ({
      name: key,
      type: `${displayName(textOf(first), imports)}["${key}"]`,
      required: false,
    }));
  }

  const alias = declarations.get(reference);
  if (alias && ts.isTypeAliasDeclaration(alias)) {
    return collectTypeProps(alias.type, imports, declarations);
  }
  return [];
}

function literalKeys(type: ts.TypeNode): string[] {
  if (ts.isUnionTypeNode(type)) return type.types.flatMap(literalKeys);
  if (ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)) {
    return [type.literal.text];
  }
  return [];
}

function collectDefaults(parameter: ts.ParameterDeclaration | undefined) {
  const defaults = new Map<string, string>();
  if (!parameter || !ts.isObjectBindingPattern(parameter.name)) return defaults;
  for (const element of parameter.name.elements) {
    if (element.initializer && ts.isIdentifier(element.name)) {
      defaults.set(element.name.text, textOf(element.initializer));
    }
  }
  return defaults;
}

function describePart(
  { name, from }: ExportEntry,
  imports: Map<string, ImportBinding>,
  declarations: Map<string, ts.Node>,
): ApiPart {
  const node = declarations.get(name);
  const kind = /^use[A-Z]/.test(name) ? "hook" : "component";

  if (from) {
    return {
      name,
      kind,
      renders: from.imported,
      source: describeSource(from.module),
      props: [],
    };
  }

  if (kind === "hook") return { name, kind, props: [] };

  if (node && (ts.isPropertyAccessExpression(node) || ts.isIdentifier(node))) {
    return {
      name,
      kind,
      ...resolveTag(node.getText(), imports, declarations),
      props: [],
    };
  }

  const fn =
    node &&
    (ts.isFunctionDeclaration(node) ||
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node))
      ? node
      : undefined;

  if (!fn?.body) {
    const callee =
      node && ts.isCallExpression(node)
        ? imports.get(node.expression.getText())
        : undefined;
    return {
      name,
      kind: "utility",
      renders: callee ? `${callee.imported}()` : undefined,
      source: callee ? describeSource(callee.module) : undefined,
      props: [],
    };
  }

  const [parameter] = fn.parameters;
  const defaults = collectDefaults(parameter);
  const props = collectTypeProps(parameter?.type, imports, declarations).map(
    (prop) => ({ ...prop, default: defaults.get(prop.name) ?? prop.default }),
  );
  const target = findTarget(fn.body, restName(parameter));

  return {
    name,
    kind: "component",
    ...(target ? resolveTag(target.tag, imports, declarations) : {}),
    slot: target?.slot,
    props,
  };
}

export const getComponentApi = cache(async (component: string) => {
  if (!/^[a-z0-9-]+$/.test(component)) {
    throw new Error(`Invalid component name: ${component}`);
  }
  const filename = path.join(COMPONENTS_DIR, `${component}.tsx`);
  const source = await readFile(filename, "utf8");
  const file = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const imports = collectImports(file);
  const declarations = collectDeclarations(file);

  const position = (entry: ExportEntry) =>
    declarations.get(entry.name)?.pos ?? Number.MAX_SAFE_INTEGER;

  return collectExports(file)
    .sort((a, b) => position(a) - position(b))
    .map((entry) => describePart(entry, imports, declarations));
});
