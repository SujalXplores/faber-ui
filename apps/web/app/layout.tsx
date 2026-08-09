import { Geist, Geist_Mono, Inter } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { cn } from "@workspace/ui/lib/utils";
import { Toaster } from "@workspace/ui/components/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="flex min-h-svh flex-col">
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
