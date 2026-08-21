import * as React from "react";

type ModuleLike = Record<string, unknown>;

function getExportNames(mod: ModuleLike): string[] {
  return Object.keys(mod).filter(
    (key) =>
      key !== "default" &&
      !key.startsWith("__") &&
      typeof mod[key] !== "undefined",
  );
}

function describeExport(name: string, value: unknown): string {
  if (value == null) return "";
  if (typeof value === "function") {
    return "Component";
  }
  if (typeof value === "object") {
    if (React.isValidElement(value)) return "Element";
    if (Array.isArray(value)) return "Value";
    return "Value";
  }
  return "Value";
}

export function ApiTable({ module }: { module: ModuleLike }) {
  const names = getExportNames(module);
  if (names.length === 0) {
    return <p className="text-sm text-muted-foreground">No exports.</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name) => (
          <tr key={name}>
            <td>
              <code>{name}</code>
            </td>
            <td>{describeExport(name, module[name])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
