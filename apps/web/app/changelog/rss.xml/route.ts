import {
  changelogRoute,
  getReleases,
  links,
  releaseUrl,
  siteUrl,
  type Release,
} from "@/lib/changelog";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function itemHtml(release: Release) {
  const items = release.entries
    .map((entry) => {
      const refs = [
        entry.commit
          ? `<a href="${links.commit(entry.commit)}">${entry.commit}</a>`
          : "",
        entry.pullRequest
          ? `<a href="${links.pullRequest(entry.pullRequest)}">#${entry.pullRequest}</a>`
          : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `<li><strong>${entry.type}</strong> ${escapeXml(entry.headline)}${refs ? ` (${refs})` : ""}</li>`;
    })
    .join("");
  return `<ul>${items}</ul>`;
}

function item(release: Release) {
  const url = `${siteUrl}${releaseUrl(release.version)}`;
  return [
    "<item>",
    `<title>v${escapeXml(release.version)} (${release.type})</title>`,
    `<link>${url}</link>`,
    `<guid isPermaLink="false">${escapeXml(links.release(release.version))}</guid>`,
    release.date
      ? `<pubDate>${new Date(`${release.date}T00:00:00Z`).toUTCString()}</pubDate>`
      : "",
    `<category>${release.type}</category>`,
    ...release.components.map(
      (component) => `<category>${escapeXml(component.name)}</category>`,
    ),
    `<description>${escapeXml(itemHtml(release))}</description>`,
    "</item>",
  ].join("");
}

export async function GET() {
  const releases = await getReleases();
  const latestDate = releases.find((release) => release.date)?.date;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>Faber UI changelog</title>",
    `<link>${siteUrl}${changelogRoute}</link>`,
    `<atom:link href="${siteUrl}${changelogRoute}/rss.xml" rel="self" type="application/rss+xml"/>`,
    "<description>Every consumer-facing change to Faber UI.</description>",
    "<language>en</language>",
    latestDate
      ? `<lastBuildDate>${new Date(`${latestDate}T00:00:00Z`).toUTCString()}</lastBuildDate>`
      : "",
    ...releases.map(item),
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
