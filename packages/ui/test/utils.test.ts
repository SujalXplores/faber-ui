import { describe, expect, it } from "vitest";

import { cn } from "@workspace/ui/lib/utils";

describe("cn", () => {
  it("keeps the last of two conflicting utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("does not treat unrelated utilities as conflicting", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("resolves conflicts across shorthand and longhand", () => {
    expect(cn("p-2", "px-4")).toBe("p-2 px-4");
    expect(cn("px-4", "p-2")).toBe("p-2");
  });

  it("drops falsy conditional classes", () => {
    const flags = { hidden: false };

    expect(
      cn("base", flags.hidden && "hidden", null, undefined, false, "", "end"),
    ).toBe("base end");
  });

  it("flattens arrays and objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("respects variant prefixes when resolving conflicts", () => {
    expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe(
      "hover:bg-blue-500",
    );
    expect(cn("bg-red-500", "hover:bg-blue-500")).toBe(
      "bg-red-500 hover:bg-blue-500",
    );
  });
});
