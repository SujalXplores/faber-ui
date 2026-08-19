import { createMDX } from "fumadocs-mdx/next";
import { createNextStory } from "@fumadocs/story/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llms.mdx/docs/:path*/content.md",
      },
    ];
  },
};

const withMDX = createMDX();
const withStory = createNextStory();

export default withStory(withMDX(nextConfig));
