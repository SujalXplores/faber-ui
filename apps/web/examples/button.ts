export const buttonWithIcon = `import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@workspace/ui/components/button";

export default function Example() {
  return (
    <Button>
      Continue
      <RiArrowRightLine />
    </Button>
  );
}`;

export const buttonAsLink = `import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function Example() {
  return (
    <Button render={<Link href="/docs" />}>
      Go to docs
    </Button>
  );
}`;
