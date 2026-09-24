import { source, getLLMText } from "@/lib/source";

export const revalidate = 3600;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
