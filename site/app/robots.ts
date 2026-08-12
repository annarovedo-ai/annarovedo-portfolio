import type { MetadataRoute } from "next";

/**
 * Nothing here is secret and the whole point of the site is to be found, so
 * everything is crawlable. The one thing worth excluding is /api, which only
 * answers POSTs from the chat and would otherwise be a crawler burning her
 * Anthropic credit on 405s.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://annarovedo.com/sitemap.xml",
    host: "https://annarovedo.com",
  };
}
