---
"@workspace/ui": patch
---

SidebarProvider ignores the toggle shortcut while typing in a field, accepts it with Shift or Caps Lock, and no longer re-subscribes on every toggle; Sidebar forwards `className` and props on mobile.
