---
"@workspace/ui": minor
---

NavigationMenu drops the broken `NavigationMenuIndicator` export, highlights active links through `data-active`, and times its popup with the kit motion tokens.

`NavigationMenuIndicator` wrapped the trigger icon part and styled attributes Base UI never sets, so it rendered nothing useful. Remove any import of it.
