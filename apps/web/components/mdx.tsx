import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Card, Cards } from "fumadocs-ui/components/card";

import { ApiTable } from "@/components/api-table";
import { Preview } from "@/components/preview";

/** Available to every MDX page without an import. */
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,

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

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
