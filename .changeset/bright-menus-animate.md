---
"@workspace/ui": patch
---

Restore open and close animations on every menu-family popup. `animate-none!`
compiled to `animation: none !important`, which beat the non-important
`animation` shorthand that `data-open:animate-in` sets, so DropdownMenu,
ContextMenu, Menubar, Select and Combobox opened and closed as hard cuts.
MenubarContent additionally had no exit classes at all, and Dialog now uses the
same 200ms as the shadcn reference rather than 120ms.

HoverCard was the only component with a non-zero `alignOffset`. With
`align="center"` Base UI maps it onto Floating UI's `crossAxis`, so the card sat
4px off-centre from its trigger on every open.

Interactive elements built from divs now get a pointer cursor: the base rule
only covered `button` and `[role="button"]`, while menu items, options, tabs and
switch/checkbox/radio roles either inherited the default arrow or explicitly set
`cursor-default`.

Also removes eight dead `data-[motion=*]` classes from NavigationMenu. Those are
Radix attributes that Base UI never emits, and they compiled to twelve CSS rules
that could never match.
