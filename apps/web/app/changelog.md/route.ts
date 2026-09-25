import { getReleases, releasesToMarkdown } from "@/lib/changelog";

export const dynamic = "force-static";

export async function GET() {
  return new Response(releasesToMarkdown(await getReleases()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
