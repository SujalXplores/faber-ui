export const avatarUsage = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  );
}`;

export const avatarSizes = `<Avatar size="sm">
  <AvatarFallback>S</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>M</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>L</AvatarFallback>
</Avatar>`;

export const avatarBadge = `<Avatar>
  <AvatarFallback>AB</AvatarFallback>
  <AvatarBadge />
</Avatar>`;

export const avatarGroup = `<AvatarGroup>
  <Avatar>
    <AvatarFallback>A</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>B</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>C</AvatarFallback>
  </Avatar>
</AvatarGroup>`;
