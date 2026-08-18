import { Geist_Mono, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

import "@workspace/ui/globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { cn } from "@workspace/ui/lib/utils";
import { Toaster } from "@workspace/ui/components/sonner";

/**
 * The `-src` suffix is required. next/font declares onto `<html>` and
 * Tailwind's `@theme` emits `--font-sans` onto `:root`, the same element, so
 * sharing the name makes the theme entry a self-reference that resolves to
 * nothing. typography.css composes these into `--font-family-sans`.
 */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faber-ui.vercel.app"),
  title: {
    default: "Faber UI",
    template: "%s | Faber UI",
  },
  description:
    "A component library built on shadcn/ui, Base UI, and Tailwind CSS v4. Copy-paste friendly, RTL-ready, and instantly familiar to AI agents.",
  openGraph: {
    title: "Faber UI",
    description:
      "A component library built on shadcn/ui, Base UI, and Tailwind CSS v4.",
    url: "https://faber-ui.vercel.app",
    siteName: "Faber UI",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      /* Values in packages/ui/src/styles/tokens/presets.css. */
      data-brand="blue"
      data-neutral="brand-tinted"
      data-radius="sm"
      data-density="default"
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
    >
      <body className="flex min-h-svh flex-col">
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
