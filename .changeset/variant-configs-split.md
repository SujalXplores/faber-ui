---
"@workspace/ui": minor
---

Button, Toggle, Tabs and NavigationMenu ship their style configs from `@workspace/ui/lib/*-variants` so component files export only components.

`buttonVariants`, `toggleVariants`, `tabsListVariants` and `navigationMenuTriggerStyle` are no longer exported from the component modules. Update imports:

```tsx
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
```

`shadcn add` installs the matching `lib/*-variants` file alongside the component.
