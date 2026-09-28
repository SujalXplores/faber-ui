import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { isValidElement, type ComponentProps, type ReactNode } from "react";

import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Card, Cards } from "fumadocs-ui/components/card";

import { ApiTable } from "@/components/api-table";
import { Preview } from "@/components/preview";
import { codeBlockLabel } from "@/lib/code-theme";

type PreProps = ComponentProps<"pre"> & {
  title?: ReactNode;
  icon?: ReactNode;
};

/** rehype-code stamps `language-*` on the inner `code`, not on the `pre`. */
function languageOf(children: ReactNode) {
  if (!isValidElement<{ className?: string }>(children)) return undefined;
  return codeBlockLabel(children.props.className);
}

function CodeBlockWithHeader({ title, icon, children, ...props }: PreProps) {
  const language = codeBlockLabel(props.className) ?? languageOf(children);
  const heading = title ?? (
    <span className="font-mono text-2xs tracking-caps text-muted-foreground">
      {language}
    </span>
  );

  return (
    <CodeBlock {...props} icon={icon} title={heading}>
      <Pre>{children}</Pre>
    </CodeBlock>
  );
}

/** Available to every MDX page without an import. */
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,

    pre: CodeBlockWithHeader,

    Accordion,
    Accordions,
    ApiTable,
    Card,
    Cards,
    Preview,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,

    ...components,
  } satisfies MDXComponents;
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
