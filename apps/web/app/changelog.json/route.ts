import { getReleases, releasesToJson } from "@/lib/changelog";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(releasesToJson(await getReleases()));
}
