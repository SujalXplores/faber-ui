import {
  RiNextjsFill,
  RiReactjsFill,
  RiTailwindCssFill,
} from "@remixicon/react";

import { cn } from "@workspace/ui/lib/utils";

/** Brand paths are from Simple Icons (CC0), 24x24 viewBox. */
const BRAND_PATHS = {
  typescript:
    "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
  baseUi:
    "M13.082 6.562a.52.52 0 0 0-.546.529V24a8.727 8.727 0 0 0 .546-17.438M11.446 9.6V24c-4.82 0-8.728-4.298-8.728-9.6V0c4.82 0 8.728 4.298 8.728 9.6Z",
  shadcn:
    "M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z",
} as const;

function BrandGlyph({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/* Official brand colors. Monochrome marks (Next.js, shadcn/ui) follow the
 * theme: near-black in light mode, white in dark mode. Chromatic marks use
 * a darker step in light mode for contrast and the canonical bright step in
 * dark mode. */
const STACK = [
  {
    name: "React",
    icon: <RiReactjsFill />,
    brand: "text-[#149ECA] dark:text-[#61DAFB]",
  },
  {
    name: "Next.js",
    icon: <RiNextjsFill />,
    brand: "text-black dark:text-white",
  },
  {
    name: "TypeScript",
    icon: <BrandGlyph d={BRAND_PATHS.typescript} />,
    brand: "text-[#3178C6] dark:text-[#5FA8E5]",
  },
  {
    name: "Tailwind CSS",
    icon: <RiTailwindCssFill />,
    brand: "text-[#0891B2] dark:text-[#38BDF8]",
  },
  {
    name: "Base UI",
    icon: <BrandGlyph d={BRAND_PATHS.baseUi} />,
    brand: "text-[#007FFF] dark:text-[#3399FF]",
  },
  {
    name: "shadcn/ui",
    icon: <BrandGlyph d={BRAND_PATHS.shadcn} />,
    brand: "text-black dark:text-white",
  },
];

export function TechStack() {
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Built with">
      {STACK.map((tech) => (
        <li key={tech.name}>
          <span className="group inline-flex items-center gap-2 rounded-full border bg-surface-2/60 py-1.5 ps-2.5 pe-3.5 text-xs font-medium text-muted-foreground transition-control pointer-fine:hover:border-border-strong pointer-fine:hover:bg-surface-3 pointer-fine:hover:text-foreground">
            <span
              className={cn(
                "inline-flex shrink-0 transition-opacity [&_svg]:size-4",
                tech.brand,
              )}
              aria-hidden
            >
              {tech.icon}
            </span>
            {tech.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
