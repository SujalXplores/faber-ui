/**
 * The Faber mark: a uniform-weight ribbon folded into an F, drawn as one path so
 * a `fill-opacity` on the glyph cannot reveal seams where the arms meet the stem.
 *
 * The geometry lives in a tight 17x20 box with no padding of its own, so callers
 * decide the inset. Two plate variants carry the same path and must be updated
 * alongside it:
 *
 *   app/icon.svg          32 square, rx 7.5, glyph at translate(7.5 6)
 *   assets/apple-icon.svg 180 square, full bleed, glyph at scale(5.625)
 *
 * app/apple-icon.png is rasterised from that second file at 180x180 and opaque.
 * Next's `apple-icon` convention only matches jpg/jpeg/png, so the svg cannot
 * live in app/ under that name -- it would be silently ignored. Regenerate with
 * sharp: .resize(180, 180).flatten({ background: "#0b0d11" }).png()
 */
const GLYPH =
  "M1.75 0H15.25A1.75 1.75 0 0 1 17 1.75V3.25A1.75 1.75 0 0 1 15.25 5H5V9.5H11.25A1.75 1.75 0 0 1 13 11.25V12.75A1.75 1.75 0 0 1 11.25 14.5H5V18.25A1.75 1.75 0 0 1 3.25 20H1.75A1.75 1.75 0 0 1 0 18.25V1.75A1.75 1.75 0 0 1 1.75 0Z";

/** Icon only, no wordmark. Inherits `currentColor`, so it follows `data-brand`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 17 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d={GLYPH} />
    </svg>
  );
}
