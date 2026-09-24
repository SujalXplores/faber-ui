import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt=""
        width={18}
        height={18}
        priority
        className="h-[18px] w-auto"
      />
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
