---
"@workspace/ui": patch
---

useIsMobile reads the viewport through `useSyncExternalStore`, so Sidebar no longer mismatches on hydration when a page loads on a phone.
