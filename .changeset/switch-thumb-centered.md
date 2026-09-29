---
"@workspace/ui": patch
---

Switch sits at a whole-pixel `16px` height, so its thumb is inset `1px` on every side instead of rendering off-center.

The default size was `16.6px` tall, which left a fractional vertical gap that browsers rounded unevenly. The `sm` size keeps its dimensions.
