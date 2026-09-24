import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

import {
  getComponentApi,
  partAnchor,
  type ApiPart,
  type ApiProp,
} from "@/lib/component-api";

const KIND_LABELS: Record<ApiPart["kind"], string | undefined> = {
  component: undefined,
  hook: "Hook",
  utility: "Class helper",
};

function BuiltOn({ part }: { part: ApiPart }) {
  const label = KIND_LABELS[part.kind];
  if (!part.renders) {
    return <span className="text-muted-foreground">{label ?? "—"}</span>;
  }

  const code = (
    <code className="font-mono text-foreground">{part.renders}</code>
  );
  const href = part.source?.href;

  return (
    <span className="flex flex-col gap-0.5">
      {href ? (
        <Link
          href={href}
          className="w-fit underline-offset-4 hover:underline"
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {code}
        </Link>
      ) : (
        code
      )}
      {part.source ? (
        <span className="text-2xs text-muted-foreground">
          {label ? `${label} · ` : null}
          {part.source.name}
        </span>
      ) : null}
    </span>
  );
}

function PropList({ props }: { props: ApiProp[] }) {
  if (props.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {props.map((prop) => (
        <li key={prop.name} className="flex flex-col gap-0.5">
          <span className="font-mono">
            <span className="text-foreground">{prop.name}</span>
            {prop.required ? null : (
              <span className="text-muted-foreground">?</span>
            )}
            {prop.default ? (
              <span className="text-muted-foreground"> = {prop.default}</span>
            ) : null}
          </span>
          <code className="font-mono text-2xs wrap-break-word whitespace-normal text-muted-foreground">
            {prop.type}
          </code>
        </li>
      ))}
    </ul>
  );
}

export async function ApiTable({ component }: { component: string }) {
  const parts = await getComponentApi(component);

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Each part forwards every prop of what it is built on, including{" "}
        <code className="font-mono text-foreground">className</code> and{" "}
        <code className="font-mono text-foreground">render</code> where Base UI
        supports it. The props column lists only what Faber UI adds on top.
      </p>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-surface-2">
            <TableRow>
              <TableHead className="w-[32%]">Part</TableHead>
              <TableHead className="w-[28%]">Built on</TableHead>
              <TableHead>Props</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow
                key={part.name}
                id={partAnchor(part.name)}
                className="scroll-mt-24 align-top hover:bg-transparent"
              >
                <TableCell className="whitespace-normal">
                  <span className="flex flex-col gap-0.5">
                    <code className="font-mono font-medium text-foreground">
                      {part.name}
                    </code>
                    {part.slot ? (
                      <span className="font-mono text-2xs text-muted-foreground">
                        data-slot=&quot;{part.slot}&quot;
                      </span>
                    ) : null}
                  </span>
                </TableCell>
                <TableCell className="whitespace-normal">
                  <BuiltOn part={part} />
                </TableCell>
                <TableCell className="whitespace-normal">
                  <PropList props={part.props} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
