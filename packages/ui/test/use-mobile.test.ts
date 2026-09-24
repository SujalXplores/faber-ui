import { act, renderHook } from "@testing-library/react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { useIsMobile } from "@workspace/ui/hooks/use-mobile";

const MOBILE_BREAKPOINT = 768;

function mockViewport(initialWidth: number) {
  const listeners = new Set<() => void>();
  let width = initialWidth;

  const setWidth = (next: number) => {
    width = next;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: next,
    });
  };

  setWidth(initialWidth);

  const removeEventListener = vi.fn((_: string, listener: () => void) => {
    listeners.delete(listener);
  });

  window.matchMedia = vi.fn(
    (query: string) =>
      ({
        media: query,
        get matches() {
          return width < MOBILE_BREAKPOINT;
        },
        onchange: null,
        addEventListener: (_: string, listener: () => void) => {
          listeners.add(listener);
        },
        removeEventListener,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );

  return {
    removeEventListener,
    listenerCount: () => listeners.size,
    resizeTo(next: number) {
      setWidth(next);
      for (const listener of listeners) listener();
    },
  };
}

function Probe() {
  return createElement("span", null, String(useIsMobile()));
}

describe("useIsMobile", () => {
  it("reports false at a desktop width", () => {
    mockViewport(1280);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("reports true below the breakpoint", () => {
    mockViewport(375);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("treats the breakpoint itself as not mobile", () => {
    mockViewport(MOBILE_BREAKPOINT);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("updates when the media query reports a change", () => {
    const viewport = mockViewport(1280);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      viewport.resizeTo(400);
    });

    expect(result.current).toBe(true);
  });

  it("removes its listener on unmount", () => {
    const viewport = mockViewport(1280);

    const { unmount } = renderHook(() => useIsMobile());
    expect(viewport.listenerCount()).toBe(1);

    unmount();

    expect(viewport.removeEventListener).toHaveBeenCalledOnce();
    expect(viewport.listenerCount()).toBe(0);
  });

  it("renders false without crashing when window is undefined", () => {
    const win = globalThis.window;
    // @ts-expect-error simulate server-side rendering
    delete globalThis.window;
    try {
      expect(renderToString(createElement(Probe))).toContain("false");
    } finally {
      globalThis.window = win;
    }
  });
});
