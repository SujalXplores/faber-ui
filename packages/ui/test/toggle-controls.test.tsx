import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";

describe("Switch", () => {
  it("toggles aria-checked on click", async () => {
    render(<Switch aria-label="Reduced motion" />);

    const toggle = screen.getByRole("switch", { name: "Reduced motion" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggles with the keyboard when paired with a label", async () => {
    render(
      <div className="flex items-center gap-2.5">
        <Switch defaultChecked id="notifications" />
        <Label htmlFor="notifications">Notifications</Label>
      </div>,
    );

    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).toHaveAttribute("aria-checked", "true");

    toggle.focus();
    await userEvent.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});

describe("Checkbox", () => {
  it("toggles aria-checked on click", async () => {
    render(<Checkbox aria-label="Copy source into repo" />);

    const box = screen.getByRole("checkbox", {
      name: "Copy source into repo",
    });
    expect(box).toHaveAttribute("aria-checked", "false");

    await userEvent.click(box);
    expect(box).toHaveAttribute("aria-checked", "true");
  });
});
