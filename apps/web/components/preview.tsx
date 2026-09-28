import { Pre } from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import { cn } from "@workspace/ui/lib/utils";

import { PreviewCode } from "@/components/preview-code";
import { codeBlockLabel, codeThemes } from "@/lib/code-theme";

export async function Preview({
  code,
  children,
  className,
  lang = "tsx",
  title,
  flat = false,
}: {
  /** Source shown in the code panel. */
  code: string;
  /** The live example. */
  children: React.ReactNode;
  /** Layout classes for the preview canvas: `flex`, `gap-*`, and so on. */
  className?: string;
  lang?: string;
  /** Filename shown above the code. */
  title?: string;
  /** Drop the dot field, for examples that draw their own background. */
  flat?: boolean;
}) {
  const highlighted = await highlight(code, {
    lang,
    themes: codeThemes,
    components: { pre: Pre },
  });

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border">
      <div
        className={cn(
          "demo rounded-none border-0",
          flat && "demo-flat",
          className,
        )}
      >
        {children}
      </div>

      <PreviewCode
        lineCount={code.trimEnd().split("\n").length}
        title={
          title ?? (
            <span className="font-mono text-2xs tracking-caps text-muted-foreground">
              {codeBlockLabel(`language-${lang}`)}
            </span>
          )
        }
      >
        {highlighted}
      </PreviewCode>
    </figure>
  );
}
