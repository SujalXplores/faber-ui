import * as React from "react";
import { Tab, Tabs, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";
import { Pre, CodeBlock } from "fumadocs-ui/components/codeblock";

export function Preview({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="preview" className="not-prose overflow-hidden rounded-lg border">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <Tab value="preview" className="p-4">
        {children}
      </Tab>
      <Tab value="code" className="p-0">
        <CodeBlock>
          <Pre>{code}</Pre>
        </CodeBlock>
      </Tab>
    </Tabs>
  );
}
