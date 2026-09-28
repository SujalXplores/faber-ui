---
"@workspace/ui": minor
---

Every component now installs the `theme` item, so the tokens and utilities it relies on reach your project instead of silently doing nothing.

The first `shadcn add` copies the stylesheet into `styles/faber/`. Import it once from your global CSS, after Tailwind:

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";
@import "../styles/faber/index.css";
```

Remove the default `:root`, `.dark` and `@theme inline` blocks that `shadcn init` generated, or keep them after the import only to override values.
