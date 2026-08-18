import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { LogoMark } from "@/components/logo";

function Logo() {
  return (
    <span className="flex items-center gap-2">
      {/* Bare mark rather than the plated favicon variant: `text-primary` lets it
          track `data-brand`, which a baked-in plate colour could not. */}
      <LogoMark className="h-[18px] w-auto text-primary" />
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
    ],
  };
}
