---
"@workspace/ui": patch
---

MessageAvatar lines up with the last bubble when a MessageFooter is present, instead of sitting 8px too high.

MessageFooter now has a fixed `16px` line height and the avatar shifts by exactly the footer plus the content gap.
