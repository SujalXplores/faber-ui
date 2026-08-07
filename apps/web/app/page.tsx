import Link from "next/link";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

const features = [
  {
    title: "shadcn-compatible",
    description:
      "Variants, sizes, and asChild composition that match the conventions you already know.",
  },
  {
    title: "Base UI primitives",
    description:
      "Accessible, unstyled components from @base-ui/react power every interaction.",
  },
  {
    title: "Tailwind CSS v4",
    description:
      "Zero-runtime styling with CSS variables and oklch color tokens.",
  },
  {
    title: "RTL ready",
    description: "Right-to-left layouts work out of the box across the kit.",
  },
  {
    title: "Remixicon",
    description: "A consistent icon set wired into every component that needs one.",
  },
  {
    title: "62 components",
    description: "From buttons and dialogs to charts and carousels, all vendored.",
  },
];

export default function Page() {
  return (
    <HomeLayout {...baseOptions()}>
      <section className="flex flex-1 flex-col items-center gap-8 px-6 py-20 text-center sm:py-28">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Faber UI
          </h1>
          <p className="max-w-xl text-pretty text-fd-muted-foreground sm:text-lg">
            A component library built on shadcn/ui, Base UI, and Tailwind CSS v4.
            Copy-paste friendly, RTL-ready, and instantly familiar to AI agents.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/docs" className={buttonVariants({ variant: "primary" })}>
              Get Started
            </Link>
            <Link
              href="/docs/components/button"
              className={buttonVariants({ variant: "outline" })}
            >
              Browse Components
            </Link>
          </div>
        </div>

        <Cards className="mt-8 w-full max-w-3xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Cards>
      </section>
    </HomeLayout>
  );
}
