import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Faber UI",
      transparentMode: "top",
    },
    githubUrl: "https://github.com/faber-ui/faber-ui",
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
