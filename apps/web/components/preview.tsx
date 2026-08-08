import * as React from "react";
import { Tab, Tabs, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

export function Preview({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <Tabs
      defaultValue="preview"
      className="not-prose overflow-hidden rounded-lg border"
    >
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <Tab value="preview" className="p-4">
        {children}
      </Tab>
      <Tab value="code" className="m-0">
        <pre className="overflow-x-auto p-4 text-xs">
          <code>{code}</code>
        </pre>
      </Tab>
    </Tabs>
  );
}
