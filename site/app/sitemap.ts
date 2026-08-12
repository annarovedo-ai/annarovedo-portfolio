import type { MetadataRoute } from "next";

const BASE = "https://annarovedo.com";

/** Every real route on the site. Case studies first, because they are what a
 *  search result should land on; the archive entries follow at lower priority
 *  because they are one-card summaries rather than pages anyone should arrive
 *  at cold. Kept as a literal list rather than generated from the filesystem:
 *  the route set changes about twice a year and a wrong sitemap is worse than
 *  no sitemap. */
const PAGES = [
  "",
  "about",
  "contact",
  "resume",
  "work",
  "archive",
  "this-site",
  "concierge",
  "journey-orchestration",
  "state-street",
  "search",
  "kmart",
  "nike",
];

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
  "kmart",
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
