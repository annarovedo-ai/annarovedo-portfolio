import type { MetadataRoute } from "next";

const BASE = "https://annarovedo.com";

/** Every route that should be advertised to search engines.
 *
 *  Two deliberate omissions:
 *  /work redirects to /#work, and a sitemap that lists redirecting URLs gets
 *  them reported back as errors in Search Console.
 *  /this-site has no inbound links anywhere on the site, by decision (b6076d4).
 *  Advertising it through the sitemap would reverse that decision by another
 *  route. The page stays reachable and stays canonicalised; it is simply not
 *  promoted.
 *
 *  Every real route on the site. Case studies first, because they are what a
 *  search result should land on; the archive entries follow at lower priority
 *  because they are one-card summaries rather than pages anyone should arrive
 *  at cold. Kept as a literal list rather than generated from the filesystem:
 *  the route set changes about twice a year and a wrong sitemap is worse than
 *  no sitemap. */
const PAGES = [
  "",
  "studio",
  "about",
  "contact",
  "resume",
  "archive",
  "concierge",
  "journey-orchestration",
  "state-street",
  "search",
  "kmart",
  "nike",
];

/* kmart is deliberately absent: its archive entry carries an href override to
   the full case study, and /archive/[slug] returns 404 for overridden entries.
   The sitemap was advertising that 404. The case study itself is in PAGES. */
const ARCHIVE = [
  "bloomberg",
  "west-indian-carnival",
  "sour-patch-kids",
  "watson-health",
  "think-leaders",
  "usaa",
  "think-2019",
  "ford",
  "hp",
  "lightpost",
  "statefarm",
  "a1",
  "jello",
  "scjohnson",
  "meow-mix",
  "norton",
  "motorola",
  "kfc",
  "valspar",
  "stradivarius",
  "woolrich",
  "encuentro",
  "duchamp",
  "faa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PAGES.map((path, i) => ({
      url: path ? `${BASE}/${path}` : BASE,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: i === 0 ? 1 : 0.8,
    })),
    ...ARCHIVE.map((slug) => ({
      url: `${BASE}/archive/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
