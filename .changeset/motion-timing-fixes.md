---
"@workspace/ui": patch
---

Transitions using `transition-control` now animate, Drawer and Sheet use the drawer curve, the Sidebar collapse eases instead of moving linearly, and MessageScroller exits faster than it enters.

`transition-control` set only `transition-property`, so the colors it covered changed instantly. It now reads `duration-*` and `ease-*` like the built-in transition utilities.
