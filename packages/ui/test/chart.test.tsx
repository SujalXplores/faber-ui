import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "@workspace/ui/components/chart";

function styleFor(color: string) {
  const html = renderToString(
    <ChartContainer id="probe" config={{ value: { label: "Value", color } }}>
      <div />
    </ChartContainer>,
  );
  return /<style>([\s\S]*?)<\/style>/.exec(html)?.[1] ?? "";
}

describe("ChartContainer color sanitizing", () => {
  it.each([
    "#2563eb",
    "oklch(0.62 0.19 252 / 80%)",
    "var(--chart-1)",
    "color-mix(in oklab, var(--primary) 60%, transparent)",
  ])("keeps %s", (color) => {
    expect(styleFor(color)).toContain(`--color-value: ${color};`);
  });

  it.each([
    "</style><img src=x onerror=alert(1)>",
    "red; background: url(https://example.com)",
    "url(https://example.com/x.png)",
    "red} body{display:none",
    "",
  ])("drops %j", (color) => {
    const style = styleFor(color);
    expect(style).not.toContain("--color-value");
    expect(style).not.toContain("<");
  });
});
