import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Slider } from "@workspace/ui/components/slider";

function thumbs(container: HTMLElement) {
  return container.querySelectorAll('[data-slot="slider-thumb"]').length;
}

describe("Slider", () => {
  it("renders one thumb for a scalar value", () => {
    const { container } = render(<Slider defaultValue={40} />);
    expect(thumbs(container)).toBe(1);
  });

  it("renders one thumb per value in a range", () => {
    const { container } = render(<Slider defaultValue={[20, 80]} />);
    expect(thumbs(container)).toBe(2);
  });

  it("falls back to a min/max range without a value", () => {
    const { container } = render(<Slider />);
    expect(thumbs(container)).toBe(2);
  });
});
