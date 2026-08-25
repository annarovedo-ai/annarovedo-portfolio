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

test("http is upgraded to https", async () => {
  const res = await hit("http://annarovedo.com/about");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/about");
});

test("http and www are corrected together, in one hop", async () => {
  const res = await hit("http://www.annarovedo.com/about");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://annarovedo.com/about");
});

// Caught live 2026-08-20: an earlier version of the http upgrade checked
// protocol only, so http://localhost:3000 also got 301'd to an https URL
// that local dev cannot serve, and `npm run dev` broke into
// ERR_SSL_PROTOCOL_ERROR on every request. The upgrade must stay scoped to
// the production hostnames.
test("http is NOT upgraded on localhost, so local dev never sees a redirect loop", async () => {
  const res = await hit("http://localhost:3000/");
  assert.notEqual(res.status, 301);
});

test("http on a legacy path resolves protocol, host, and path in one hop", async () => {
  const res = await hit("http://www.annarovedo.com/ford?utm_source=linkedin");
  assert.equal(res.status, 301);
  assert.equal(
    res.headers.get("location"),
    "https://annarovedo.com/archive/ford?utm_source=linkedin",
  );
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

// Was "a legacy target carrying a fragment keeps it out of the path",
// testing /portfolio -> /#work. /work became a real page 2026-08-20, so
// /portfolio and /projects now land on it directly and no legacy target in
// LEGACY_REDIRECTS carries a "#" any more. redirectTarget still splits one
// out if a future entry needs it (see worker/redirects.mjs); there is just
// nothing live to assert that against right now.
test("old work-page aliases land on the real /work page", async () => {
  for (const path of ["/portfolio", "/projects"]) {
    const res = await hit(`https://annarovedo.com${path}`);
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "https://annarovedo.com/work");
  }
});

test("a live page is not redirected", async () => {
  const res = await hit("https://annarovedo.com/about");
  assert.notEqual(res.status, 301);
});

test("/work is a real page now, not a redirect", async () => {
  const res = await hit("https://annarovedo.com/work");
  assert.notEqual(res.status, 301);
});

/* ------------------------------------------------------------ sitemap --- */

test("the sitemap does not advertise redirecting or unlinked pages", async () => {
  const src = await readFile(new URL("app/sitemap.ts", root), "utf8");
  const pages = src.slice(src.indexOf("const PAGES"), src.indexOf("const ARCHIVE"));
  // /this-site has no inbound links by decision (b6076d4).
  assert.doesNotMatch(pages, /"this-site"/);
  // /about left the nav and footer 2026-08-20; same "reachable, not
  // promoted" treatment as /this-site.
  assert.doesNotMatch(pages, /"about"/);
  // Sanity: the real pages are still there, /work included now that it is a
  // real page rather than a redirect to /#work (2026-08-20).
  for (const p of ["work", "contact", "concierge", "nike"]) {
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

  // Recruiter and Client: exactly the four printed chips, nothing else.
  // Ex: the four printed chips FIRST, then the preset bank (Anna's locked
  // off-topic answers, 2026-08-19), which is not printed on the homepage
  // and is allowed to grow.
  for (const persona of ["recruiter", "client", "ex"]) {
    const answers = cannedAnswers[persona];
    if (persona === "ex") {
      assert.ok(answers.length >= 4, "ex must keep its four chips");
    } else {
      assert.equal(answers.length, 4);
    }
    for (const [i, { question, answer }] of answers.entries()) {
      assert.ok(answer?.trim(), `${persona}: missing answer for ${question}`);
      assert.doesNotMatch(answer, /—/, `${persona}: em dash in ${question}`);
      if (persona !== "ex" || i < 4) {
        assert.ok(home.includes(question), `${persona}: chip is not printed: ${question}`);
      }
      // findCannedAnswer returns the whole entry as of 2026-08-24 (answers
      // can carry a curated case-study image); the text lives on .answer.
      assert.equal(findCannedAnswer(persona, question)?.answer, answer);
    }
  }

  assert.equal(
    findCannedAnswer("ex", "Be honest. Was the frog actually real?")?.answer,
    "Yes. The frog was real. That is the complete answer.",
  );
  assert.equal(findCannedAnswer("client", "Be honest. Was the frog actually real?"), null);
  assert.equal(findCannedAnswer("recruiter", "A question Anna did not prewrite"), null);
});

test("every page hint, every persona, has a pre-scripted answer", async () => {
  // Anna, 2026-08-19: "make sure all of the question prompts asked has a
  // pre-scripted answer." Suggested questions never reach the model: the
  // persona chip sets and the shared hint bank (annaHintAnswers.ts) cover
  // every data-anna-prompt* attribute in the app. A hint whose wording
  // drifts from its script silently hands the question to generation, so
  // this walks the app and proves every variant round-trips for every
  // persona that can see it.
  const { readdir } = await import("node:fs/promises");
  const appDir = new URL("app/", root);
  const files = (await readdir(appDir, { recursive: true }))
    .filter((f) => f.endsWith(".tsx"));
  let found = 0;
  for (const f of files) {
    const src = await readFile(new URL(`app/${f}`, root), "utf8");
    for (const m of src.matchAll(/data-anna-prompt="([^"]+)"/g)) {
      found++;
      for (const persona of ["recruiter", "client", "ex"]) {
        assert.ok(
          findCannedAnswer(persona, m[1]),
          `hint has no script for ${persona}: ${m[1]} (${f})`,
        );
      }
    }
    for (const m of src.matchAll(/data-anna-prompt-client="([^"]+)"/g)) {
      found++;
      assert.ok(
        findCannedAnswer("client", m[1]),
        `client hint has no script: ${m[1]} (${f})`,
      );
    }
    for (const m of src.matchAll(/data-anna-prompt-ex="([^"]+)"/g)) {
      found++;
      assert.ok(
        findCannedAnswer("ex", m[1]),
        `Ex hint has no preset: ${m[1]} (${f})`,
      );
    }
  }
  assert.ok(found >= 60, `expected hints across the site, found ${found}`);

  // The shared bank obeys the same copy rules as the chips.
  const { sharedHintAnswers } = await import("../app/lib/annaAnswers.ts");
  for (const { question, answer } of sharedHintAnswers) {
    assert.ok(answer?.trim(), `shared: missing answer for ${question}`);
    assert.doesNotMatch(answer, /—/, `shared: em dash in ${question}`);
  }

  // Two shared entries duplicate printed recruiter chips so every persona
  // resolves them on About and Resume; the text must never drift apart.
  for (const q of [
    "How do you work when the roadmap isn’t clear?",
    "What did working across so many brands teach you?",
  ]) {
    const shared = sharedHintAnswers.find((a) => a.question === q);
    assert.ok(shared, `canonical copy missing in shared bank: ${q}`);
    assert.equal(
      shared.answer,
      findCannedAnswer("recruiter", q)?.answer,
      `canonical drift between chip and shared bank: ${q}`,
    );
  }
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
  const skip = new Set(["/work/[slug]", "/admin/chat"]); // redirects + keyed admin page
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
  // homeImageVariants and HomeImage moved out of HomeBody.tsx and into
  // CaseCard.tsx on 2026-08-20, when /work needed the same responsive image
  // handling the homepage already had. One definition, shared by both.
  const src = await readFile(new URL("app/CaseCard.tsx", root), "utf8");
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

// "the hero poster is prioritised for mobile LCP" was deleted 2026-08-18:
// the hero video (and then its poster still) was removed from the site
// entirely per Anna, so the recruiter hero's LCP element is now the
// headline text and there is no poster to guard. If hero media ever
// returns, restore an LCP test with it.
