---
"@workspace/ui": patch
---

KbdGroup is typed as a `kbd` element, Combobox imports its Base UI subpath, the `motion` lib mirrors the `exit` easing and `travel` tokens, and the `chart` item declares its `react-is` peer.

Unused classes that Base UI and Sonner never target were removed from Toggle, ResizablePanelGroup, Toaster and InputOTP, along with the unused `hairline`, `mask-fade-t`, `press-subtle` and `transition-control-transform` utilities.
