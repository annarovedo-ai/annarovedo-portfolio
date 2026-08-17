/**
 * RELEASE TESTS
 *
 * Replaces tests/rendered-html.test.mjs, which asserted the starter template's
 * loading skeleton ("Your site is taking shape", title "Starter Project") and
 * has therefore been failing since the real site replaced it.
 *
 * Scope is deliberately narrow: the things that are invisible until they are
 * wrong. Redirects, canonical hosts, what the sitemap advertises, and whether
 * the fonts and responsive images actually survived the build. Layout, copy
 * and visual quality are not testable here and are checked by eye.
 */
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { cannedAnswers, findCannedAnswer } from "../app/lib/annaAnswers.ts";

const root = new URL("../", import.meta.url);

/**
 * The redirect tests import worker/redirects.mjs directly rather than the
 * built worker: dist/server imports "cloudflare:workers" (for the chat log's
 * D1 binding), a scheme Node cannot load, and every redirect test died of it
 * the day the chat log landed. The logic is a pure function, so it is tested
 * as one. Plain .mjs, stock Node, no transpiler.
 */
import { redirectTarget } from "../worker/redirects.mjs";

async function hit(url) {
  const target = redirectTarget(url);
  return target
    ? { status: 301, headers: new Map([["location", target]]) }
    : { status: 200, headers: new Map() };
}

/* ---------------------------------------------------------- redirects --- */

test("www is canonicalised to the apex domain, permanently", async () => {
  const res = await hit("https://www.annarovedo.com/about");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/about");
});

test("www canonicalisation keeps the query string", async () => {
  const res = await hit("https://www.annarovedo.com/about?utm_source=linkedin");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/about?utm_source=linkedin");
});

test("a legacy path redirects to its new home", async () => {
  const res = await hit("https://annarovedo.com/ford");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/archive/ford");
});

test("a legacy path keeps the query string", async () => {
  const res = await hit("https://annarovedo.com/ford?utm_source=linkedin");
  assert.equal(res.status, 301);
  assert.equal(
    res.headers.get("location"),
    "https://annarovedo.com/archive/ford?utm_source=linkedin",
  );
});

test("a legacy path on www resolves in ONE hop, not two", async () => {
  const res = await hit("https://www.annarovedo.com/ford?utm_source=linkedin");
  assert.equal(res.status, 301);
  // Host and path both corrected by the single response.
  assert.equal(
    res.headers.get("location"),
    "https://annarovedo.com/archive/ford?utm_source=linkedin",
  );
});

test("a trailing slash does not defeat the legacy map", async () => {
  const res = await hit("https://annarovedo.com/ford/");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/archive/ford");
});

test("a legacy target carrying a fragment keeps it out of the path", async () => {
  const res = await hit("https://annarovedo.com/portfolio");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/#work");
});

test("a live page is not redirected", async () => {
  const res = await hit("https://annarovedo.com/about");
  assert.notEqual(res.status, 301);
});

/* ------------------------------------------------------------ sitemap --- */

test("the sitemap does not advertise redirecting or unlinked pages", async () => {
  const src = await readFile(new URL("app/sitemap.ts", root), "utf8");
  const pages = src.slice(src.indexOf("const PAGES"), src.indexOf("const ARCHIVE"));
  // /work redirects to /#work; listing it produces Search Console errors.
  assert.doesNotMatch(pages, /"work"/);
  // /this-site has no inbound links by decision (b6076d4).
  assert.doesNotMatch(pages, /"this-site"/);
  // Sanity: the real pages are still there.
  for (const p of ["about", "contact", "concierge", "nike"]) {
    assert.match(pages, new RegExp(`"${p}"`));
  }
});

test("robots keeps crawlers off the paid chat endpoint", async () => {
  const src = await readFile(new URL("app/robots.ts", root), "utf8");
  // The chat log added /admin/ alongside /api/, turning disallow into an
  // array. Both must stay: /api/ burns her Anthropic credit, /admin/ is the
  // conversation log.
  assert.match(src, /disallow:.*\/api\//is);
  assert.match(src, /disallow:.*\/admin\//is);
  assert.match(src, /sitemap:\s*"https:\/\/annarovedo\.com\/sitemap\.xml"/);
});

/* ------------------------------------------------ canonical chat copy --- */

test("every printed chat prompt has one approved verbatim answer", async () => {
  const home = await readFile(new URL("app/homeContent.ts", root), "utf8");

  for (const persona of ["recruiter", "client", "ex"]) {
    assert.equal(cannedAnswers[persona].length, 4);
    for (const { question, answer } of cannedAnswers[persona]) {
      assert.ok(answer?.trim(), `${persona}: missing answer for ${question}`);
      assert.doesNotMatch(answer, /—/, `${persona}: em dash in ${question}`);
      assert.ok(home.includes(question), `${persona}: chip is not printed: ${question}`);
      assert.equal(findCannedAnswer(persona, question), answer);
    }
  }

  assert.equal(
    findCannedAnswer("ex", "Be honest. Was the frog actually real?"),
    "Yes. The frog was real. That is the complete answer.",
  );
  assert.equal(findCannedAnswer("client", "Be honest. Was the frog actually real?"), null);
  assert.equal(findCannedAnswer("recruiter", "A question Anna did not prewrite"), null);
});

test("the chat route returns approved answers before calling Anthropic", async () => {
  const route = await readFile(new URL("app/api/chat/route.ts", root), "utf8");
  const lookup = route.indexOf("findCannedAnswer(persona");
  const upstream = route.indexOf('fetch("https://api.anthropic.com/v1/messages"');

  assert.ok(lookup >= 0, "canonical answer lookup is not wired into the route");
  assert.ok(upstream > lookup, "Anthropic is called before the canonical lookup");
});

/* --------------------------------------------------------- canonicals --- */

test("every indexable page declares a canonical URL", async () => {
  const skip = new Set(["/work", "/work/[slug]", "/admin/chat"]); // redirects + keyed admin page
  const missing = [];
  async function walk(dir, base = "") {
    for (const entry of await readdir(new URL(dir, root), { withFileTypes: true })) {
      if (entry.isDirectory()) await walk(`${dir}${entry.name}/`, `${base}/${entry.name}`);
      else if (entry.name === "page.tsx") {
        const route = base || "/";
        if (skip.has(route)) continue;
        const src = await readFile(new URL(`${dir}page.tsx`, root), "utf8");
        if (!/canonical/.test(src)) missing.push(route);
      }
    }
  }
  await walk("app/");
  assert.deepEqual(missing, [], `routes without a canonical: ${missing.join(", ")}`);
});

test("metadataBase is the apex domain, so og:image is absolute", async () => {
  const src = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.match(src, /metadataBase:\s*new URL\("https:\/\/annarovedo\.com"\)/);
});

/* --------------------------------------------- fonts and images -------- */

test("fonts are self-hosted, with no render-blocking Google request", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /@font-face/);
  assert.match(css, /url\("\/fonts\/inter-latin\.woff2"\)/);
  assert.match(css, /font-display:\s*swap/);

  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.doesNotMatch(layout, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});

test("redistributed fonts ship their licence, as the OFL requires", async () => {
  const files = await readdir(new URL("public/fonts/", root));
  for (const woff2 of files.filter((f) => f.endsWith(".woff2"))) {
    assert.ok(woff2.length > 0);
  }
  assert.ok(files.includes("inter-OFL.txt"), "Inter licence missing");
  assert.ok(files.includes("newsreader-OFL.txt"), "Newsreader licence missing");

  const inter = await readFile(new URL("public/fonts/inter-OFL.txt", root), "utf8");
  assert.match(inter, /Copyright \(c\) 2016 The Inter Project Authors/);
  assert.match(inter, /SIL OPEN FONT LICENSE Version 1\.1/);

  const news = await readFile(new URL("public/fonts/newsreader-OFL.txt", root), "utf8");
  assert.match(news, /Copyright 2020 The Newsreader Project Authors/);
  assert.match(news, /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("homepage images offer responsive sources, and every variant exists", async () => {
  const src = await readFile(new URL("app/HomeBody.tsx", root), "utf8");
  assert.match(src, /srcSet=\{homeImageVariants\[src\]\}/);

  const variants = src.slice(
    src.indexOf("const homeImageVariants"),
    src.indexOf("function HomeImage"),
  );
  const paths = [...variants.matchAll(/(\/[A-Za-z0-9._/-]+\.webp)\s+\d+w/g)].map((m) => m[1]);
  assert.ok(paths.length > 0, "no variant paths found");
  for (const p of paths) {
    await readFile(new URL(`public${p}`, root)); // throws if missing
  }
});

test("the hero poster is prioritised for mobile LCP", async () => {
  const src = await readFile(new URL("app/HeroVideo.tsx", root), "utf8");
  assert.match(src, /fetchPriority="high"/);
  assert.match(src, /srcSet=/);
});
