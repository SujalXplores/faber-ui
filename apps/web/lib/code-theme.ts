export const codeThemes = {
  light: "github-light-default",
  dark: "github-dark-default",
} as const;

export const codeLangs = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "bash",
  "sh",
  "css",
  "json",
  "mdx",
] as const;

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "terminal",
  sh: "terminal",
  shell: "terminal",
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  json: "json",
  css: "css",
  mdx: "mdx",
};

export function codeBlockLabel(className?: string): string | undefined {
  const lang = /language-([\w-]+)/.exec(className ?? "")?.[1];
  if (!lang) return undefined;
  return LANGUAGE_LABELS[lang] ?? lang;
}
