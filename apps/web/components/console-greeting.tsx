"use client";

import * as React from "react";

const REPO_URL = "https://github.com/SujalXplores/faber-ui";

const WORDMARK = [
  "███████╗ █████╗ ██████╗ ███████╗██████╗    ██╗   ██╗██╗",
  "██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗   ██║   ██║██║",
  "█████╗  ███████║██████╔╝█████╗  ██████╔╝   ██║   ██║██║",
  "██╔══╝  ██╔══██║██╔══██╗██╔══╝  ██╔══██╗   ██║   ██║██║",
  "██║     ██║  ██║██████╔╝███████╗██║  ██║   ╚██████╔╝██║",
  "╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝",
].join("\n");

let greeted = false;

function resolveColor(token: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  document.body.append(probe);
  const { color } = getComputedStyle(probe);
  probe.remove();
  return color;
}

export function ConsoleGreeting() {
  React.useEffect(() => {
    if (greeted) return;
    greeted = true;

    const primary = resolveColor("--primary");
    const muted = resolveColor("--muted-foreground");

    console.log(
      `%c${WORDMARK}\n\n%cComponents you own outright.`,
      `color: ${primary}; font-family: monospace; font-weight: bold; line-height: 1.15;`,
      `color: ${muted}; font-size: 12px;`,
    );
    console.log(
      [
        "Found a bug?          " +
          `${REPO_URL}/issues/new?template=bug_report.yml`,
        "Want a component?     " +
          `${REPO_URL}/issues/new?template=component_request.yml`,
        `Star or contribute:   ${REPO_URL}`,
      ].join("\n"),
    );
  }, []);

  return null;
}
