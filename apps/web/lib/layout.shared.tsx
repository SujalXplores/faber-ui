import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

function BrandTintedMark() {
  return (
    <span className="relative isolate size-[18px] shrink-0">
      <Image
        src="/logo.png"
        alt=""
        width={18}
        height={18}
        priority
        className="size-full grayscale"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-primary mask-[url(/logo.png)] mask-contain mask-center mask-no-repeat mix-blend-color"
      />
    </span>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <BrandTintedMark />
      <span className="font-medium tracking-subheading">Faber UI</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
    },
    githubUrl: "https://github.com/SujalXplores/faber-ui",
    links: [
      {
        type: "main",
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        type: "main",
        text: "Components",
        url: "/docs/components/button",
        active: "nested-url",
      },
      {
        type: "main",
        text: "Changelog",
        url: "/changelog",
        active: "url",
      },
    ],
  };
}
