/**
 * Motion tokens for JavaScript-driven animation. Mirrors
 * `packages/ui/src/styles/tokens/motion.css`; keep the two in sync.
 *
 * Prefer CSS where the animation is expressible in CSS. CSS animations run off
 * the main thread and hold their frames while the browser is busy routing or
 * hydrating, where requestAnimationFrame-driven libraries drop them.
 */

/** Cubic-bezier control points, in the order Motion and WAAPI expect. */
export const easing = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
  hover: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  exit: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Milliseconds. */
export const duration = {
  instant: 0,
  fast: 120,
  quick: 160,
  base: 200,
  moderate: 250,
  slow: 320,
  deliberate: 480,
} as const;

/** Seconds. Motion's `transition.duration` is in seconds, not milliseconds. */
export const durationSec: { [K in keyof typeof duration]: number } =
  Object.fromEntries(
    Object.entries(duration).map(([key, value]) => [key, value / 1000]),
  ) as { [K in keyof typeof duration]: number };

export const staggerStep = 45;

/**
 * `bounce` maps to a damping ratio: 0 is critically damped and settles without
 * overshoot. Default to `smooth`; overshoot is only right when the user's own
 * gesture supplied the momentum.
 */
export const spring = {
  smooth: { type: "spring", bounce: 0, duration: 0.4 },
  move: { type: "spring", bounce: 0.1, duration: 0.4 },
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 },
  drawer: { type: "spring", bounce: 0.15, duration: 0.35 },
} as const;

export const scale = {
  press: 0.97,
  enter: 0.96,
  exit: 0.98,
} as const;

/** Pixels. */
export const travel = {
  sm: 6,
  lg: 40,
} as const;

/**
 * Distance in px a flick travels past `velocity` (px/s at release), so a
 * gesture can snap to the target nearest its momentum. Exponential decay,
 * matching scroll; the textbook `v^2 / 2a` feels noticeably worse.
 * `decelerationRate` 0.998 matches normal scroll, 0.99 is snappier.
 */
export function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. `overshoot` is px dragged past it,
 * `dimension` the size of the draggable axis in px.
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/**
 * Returns false during SSR so the first client paint matches the server. Call
 * it in an effect or event handler, not during render.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
