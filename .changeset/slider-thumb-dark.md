---
"@workspace/ui": patch
---

Slider thumb is a solid circle at every radius preset, filled with `foreground` in dark mode instead of rendering as a dark hollow square.

The thumb used `rounded-md`, which only looks round when `--radius` is large; at the default `0.3rem` it rendered as a rounded square. It now uses `rounded-full`, matching the Switch thumb.
