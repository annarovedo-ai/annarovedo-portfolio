import type { MetadataRoute } from "next";

/**
 * Nearly everything here is meant to be found, so the site is crawlable.
 *
 * Two exclusions:
 *  - /api, which only answers POSTs from the chat and would otherwise be a
 *    crawler burning her Anthropic credit on 405s.
 *  - /admin, the Almost Anna chat log. It is key-gated, but it should not be
 *    indexed or advertised either. robots.txt is a request, not a lock, so
 *    the key check on the page is what actually protects it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://annarovedo.com/sitemap.xml",
    host: "https://annarovedo.com",
  };
}
