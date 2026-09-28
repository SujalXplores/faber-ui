import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  outputFileTracingIncludes: {
    "/llms-full.txt": ["../../packages/ui/CHANGELOG.md"],
  },
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

export default withMDX(nextConfig);
