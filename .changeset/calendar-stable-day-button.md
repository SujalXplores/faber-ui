---
"@workspace/ui": minor
---

Calendar keeps day buttons mounted across renders and renders week numbers as row headers.

`CalendarDayButton` no longer takes a `locale` prop, and its `data-day` attribute is now the ISO date (`2026-09-28`) instead of a locale-formatted string that could differ between server and browser.
