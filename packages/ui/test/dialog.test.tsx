import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

function TestDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open settings</DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Adjust your preferences.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens on trigger and exposes a labelled dialog", async () => {
    render(<TestDialog />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Open settings" }),
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Settings" }),
    ).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<TestDialog />);

    await userEvent.click(
      screen.getByRole("button", { name: "Open settings" }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
