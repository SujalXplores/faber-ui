---
"@workspace/ui": minor
---

Popover, DropdownMenu, ContextMenu, Menubar, Select, Combobox, HoverCard, Tooltip, Dialog and AlertDialog enter and exit with interruptible transitions on the kit easing tokens, and `tw-animate-css` is no longer a dependency.

A popup closed halfway through opening now reverses from where it is instead of restarting. Anchored popups scale from their trigger with `motion-popup`, dialogs use `motion-modal` and their overlays `motion-backdrop`, exits run faster than entrances, and reduced motion now collapses the scale and travel of every popup. Select skips the animation while its list is aligned over the trigger. If you target the old `animate-in`, `fade-in-0` or `zoom-in-95` classes, move your overrides to `data-starting-style` and `data-ending-style`.
