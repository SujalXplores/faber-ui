import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span
        className="flex size-5.5 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        aria-hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 8.5H21.5V11.2H13.2V14.8H19.8V17.5H13.2V23.5H10.5V8.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>Faber UI</span>
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
