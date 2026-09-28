import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@workspace/ui/components/button";
import { buttonVariants } from "@workspace/ui/lib/button-variants";

describe("Button", () => {
  it("renders a native button element", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("calls onClick when activated by pointer and by keyboard", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not fire onClick while disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("resolves conflicts between base and size utilities", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("bg-primary", "text-primary-foreground", "h-7");
    expect(button).toHaveClass("[&_svg:not([class*='size-'])]:size-3.5");
    expect(button).not.toHaveClass("[&_svg:not([class*='size-'])]:size-4");
  });

  it("applies the requested variant and size instead of the defaults", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("bg-destructive/10", "text-destructive", "h-8");
    expect(button).not.toHaveClass("bg-primary");
    expect(button).not.toHaveClass("h-7");
  });

  it("exposes buttonVariants for composing the same styles elsewhere", () => {
    expect(buttonVariants({ variant: "ghost", size: "sm" })).toContain(
      "hover:bg-muted",
    );
  });

  it("lets an incoming className win over the variant it conflicts with", () => {
    render(<Button className="rounded-full">Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("rounded-full");
    expect(button).not.toHaveClass("rounded-md");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Button aria-invalid="true">Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
