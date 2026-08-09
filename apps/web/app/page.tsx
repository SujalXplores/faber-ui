import Link from "next/link";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import {
  RiGithubFill,
  RiArrowRightLine,
  RiSparklingLine,
  RiCheckboxCircleLine,
  RiLayoutGridLine,
  RiPaletteLine,
  RiGlobalLine,
  RiPuzzleLine,
  RiCodeBoxLine,
} from "@remixicon/react";

const features = [
  {
    icon: RiPuzzleLine,
    title: "shadcn-compatible",
    description:
      "Variants, sizes, and asChild composition that match the conventions you already know.",
  },
  {
    icon: RiLayoutGridLine,
    title: "Base UI primitives",
    description:
      "Accessible, unstyled components from @base-ui/react power every interaction.",
  },
  {
    icon: RiPaletteLine,
    title: "Tailwind CSS v4",
    description:
      "Zero-runtime styling with CSS variables and oklch color tokens.",
  },
  {
    icon: RiGlobalLine,
    title: "RTL ready",
    description: "Right-to-left layouts work out of the box across the kit.",
  },
  {
    icon: RiSparklingLine,
    title: "Remixicon",
    description: "A consistent icon set wired into every component that needs one.",
  },
  {
    icon: RiCodeBoxLine,
    title: "62 components",
    description: "From buttons and dialogs to charts and carousels, all vendored.",
  },
];

const stats = [
  { value: "62", label: "Components" },
  { value: "100%", label: "Accessible" },
  { value: "0", label: "Runtime deps" },
  { value: "v4", label: "Tailwind CSS" },
];

export default function Page() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="relative flex flex-1 flex-col items-center overflow-hidden">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[size:32px_32px] bg-[image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_30%,transparent_80%)]"
          aria-hidden
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
          aria-hidden
        />

        {/* Hero */}
        <section className="flex w-full flex-col items-center gap-6 px-6 pt-28 pb-16 text-center sm:pt-36">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
          >
            <span className="flex size-1.5 rounded-full bg-primary" />
            v1.0 is here, explore the docs
            <RiArrowRightLine className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Build interfaces with{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.25_300)] bg-clip-text text-transparent">
              components that just work
            </span>
          </h1>

          <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            A component library built on shadcn/ui, Base UI, and Tailwind CSS v4.
            Copy-paste friendly, RTL-ready, and instantly familiar to AI agents.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/docs" className={buttonVariants({ variant: "primary" }) + " h-9 gap-1.5 px-3 text-sm"}>
              Get Started
              <RiArrowRightLine className="size-4" />
            </Link>
            <a
              href="https://github.com/SujalXplores/faber-ui"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" }) + " h-9 gap-1.5 px-3 text-sm"}
            >
              <RiGithubFill className="size-4" />
              GitHub
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 pb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="w-full max-w-5xl px-6 pb-24">
          <Cards className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  title={
                    <span className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </span>
                      {feature.title}
                    </span>
                  }
                  description={feature.description}
                />
              );
            })}
          </Cards>
        </section>

        {/* CTA */}
        <section className="flex w-full flex-col items-center gap-6 px-6 pb-32 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start building today
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            Copy any component into your project and make it yours. No lock-in,
            no runtime dependency, just source code you own.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs/components/button" className={buttonVariants({ variant: "primary" }) + " h-9 gap-1.5 px-3 text-sm"}>
              Browse Components
              <RiArrowRightLine className="size-4" />
            </Link>
            <Link href="/docs/getting-started" className={buttonVariants({ variant: "outline" }) + " h-9 gap-1.5 px-3 text-sm"}>
              <RiCheckboxCircleLine className="size-4" />
              Quick Start
            </Link>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
