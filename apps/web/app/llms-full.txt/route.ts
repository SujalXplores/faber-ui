import { source, getLLMText } from "@/lib/source";
import { getReleases, releasesToMarkdown } from "@/lib/changelog";

export const revalidate = 3600;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const [scanned, releases] = await Promise.all([
    Promise.all(scan),
    getReleases(),
  ]);

  return new Response([...scanned, releasesToMarkdown(releases)].join("\n\n"));
}
