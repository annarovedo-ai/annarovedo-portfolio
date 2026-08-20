/**
 * Host and path canonicalisation, extracted from worker/index.ts so it can be
 * tested in plain Node. The worker bundle imports "cloudflare:workers" (via
 * db/index.ts), a scheme Node cannot load, which silently killed every
 * redirect test the day the chat log landed. Plain .mjs rather than .ts:
 * tsx/esbuild in this repo are macOS binaries and cannot transpile on the
 * Linux side, and a pure function needs no types to run.
 */

export const LEGACY_REDIRECTS = {
  // Projects that became archive entries.
  "/watson-health": "/archive/watson-health",
  "/ibm-watson-health": "/archive/watson-health",
  "/think-leaders": "/archive/think-leaders",
  "/ibm-think-leaders": "/archive/think-leaders",
  "/think-2019": "/archive/think-2019",
  "/bloomberg": "/archive/bloomberg",
  "/west-indian-carnival": "/archive/west-indian-carnival",
  "/west-indian-day-parade": "/archive/west-indian-carnival",
  "/usaa": "/archive/usaa",
  "/ford": "/archive/ford",
  "/hp": "/archive/hp",
  "/lightpost": "/archive/lightpost",
  "/kraft-digitouch": "/archive/sour-patch-kids",
  "/sour-patch-kids": "/archive/sour-patch-kids",
  "/statefarm": "/archive/statefarm",
  "/state-farm": "/archive/statefarm",
  "/woolrich": "/archive/woolrich",

  // Projects that became full case studies under a shorter name.
  "/state-street-alpha": "/state-street",
  "/statestreet": "/state-street",
  "/global-search": "/search",
  "/ibm-search": "/search",

  // Old nav.
  "/work": "/#work",
  "/projects": "/#work",
  "/portfolio": "/#work",
  "/cv": "/resume",
};

/**
 * Returns the single 301 target for a request URL, or null if no redirect
 * applies. One hop: protocol, host, and path corrected together, query
 * preserved, fragments kept out of the pathname.
 *
 * The http -> https upgrade exists because Cloudflare does not do this for
 * a Worker route by itself: a plain "Always Use HTTPS" zone setting only
 * covers requests that hit Cloudflare's own edge cache/proxy in front of
 * the Worker, not the case caught 2026-08-20 where a link shared as
 * http://www.annarovedo.com was served in full over an insecure connection
 * (browsers/LinkedIn's own interstitial then show the site as untrusted).
 */
export function redirectTarget(rawUrl) {
  const url = new URL(rawUrl);
  const isHttp = url.protocol === "http:";
  const isWww = url.hostname === "www.annarovedo.com";
  const legacyPath = url.pathname.replace(/\/+$/, "") || "/";
  const legacy = LEGACY_REDIRECTS[legacyPath];
  if (!isHttp && !isWww && !legacy) return null;

  const target = new URL(url.toString());
  if (isHttp) target.protocol = "https:";
  if (isWww) target.hostname = "annarovedo.com";
  if (legacy) {
    const [path, hash] = legacy.split("#");
    target.pathname = path || "/";
    target.hash = hash ? `#${hash}` : "";
  }
  return target.toString();
}
