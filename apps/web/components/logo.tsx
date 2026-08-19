const GLYPH =
  "M1.75 0H15.25A1.75 1.75 0 0 1 17 1.75V3.25A1.75 1.75 0 0 1 15.25 5H5V9.5H11.25A1.75 1.75 0 0 1 13 11.25V12.75A1.75 1.75 0 0 1 11.25 14.5H5V18.25A1.75 1.75 0 0 1 3.25 20H1.75A1.75 1.75 0 0 1 0 18.25V1.75A1.75 1.75 0 0 1 1.75 0Z";

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
