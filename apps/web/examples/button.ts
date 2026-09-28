export const buttonWithIcon = `import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <Button>
      Continue
      <RiArrowRightLine />
    </Button>
  );
}`;

export const buttonAsLink = `import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";

export default function Example() {
  return (
    <Link href="/docs" className={buttonVariants()}>
      Go to docs
    </Link>
  );
}`;
