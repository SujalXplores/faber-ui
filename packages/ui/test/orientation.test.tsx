import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";

describe("orientation reaches the Base UI primitive", () => {
  it("marks a vertical tab list for assistive tech", () => {
    render(
      <Tabs orientation="vertical" defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("moves focus with the vertical arrow keys in a vertical toggle group", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup orientation="vertical" aria-label="Align">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "B" })).toHaveFocus();
  });
});
