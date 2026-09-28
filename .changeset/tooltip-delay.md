---
"@workspace/ui": minor
---

TooltipProvider now waits 400ms before the first tooltip opens, and tooltips opened right after it appear instantly with no animation.

Pass `delay={0}` to `TooltipProvider` to keep the previous behavior.
