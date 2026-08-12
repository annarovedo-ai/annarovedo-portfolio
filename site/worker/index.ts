/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

/**
 * OLD SQUARESPACE URLS.
 *
 * The previous site lived at these paths for six years, so they are in
 * Google's index, in her LinkedIn profile, and in the signature of every
 * email she has sent since 2019. Moving the nameservers did not move them; it
 * turned them into 404s.
 *
 * Only paths that would otherwise 404 are listed, and every destination is a
 * page that exists. /kmart, /about, /contact and /resume kept their names on
 * the new site and are deliberately absent from this map.
 *
 * 301, not 302: these are permanent, and a permanent redirect is the only one
 * that passes the old page's search ranking to the new one.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
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

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Trailing slashes are normalised so /ford/ matches /ford.
    const legacyPath = url.pathname.replace(/\/+$/, "") || "/";
    const legacy = LEGACY_REDIRECTS[legacyPath];
    if (legacy) {
      return Response.redirect(new URL(legacy, url.origin).toString(), 301);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
