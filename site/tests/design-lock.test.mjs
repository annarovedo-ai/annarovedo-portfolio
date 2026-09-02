import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/**
 * THE LOCK on app/design-tokens.css (Anna, 2026-09-01: "put this into an
 * untouchable file that the entire website refers to", "no fonts outside
 * of this", "size and color are locked in").
 *
 * Run alongside the release suite:
 *   node --test tests/release.test.mjs tests/design-lock.test.mjs
 *
 * If the fingerprint test fails, someone edited the locked file. That is
 * only legitimate when Anna herself ordered the change; the same commit
 * must then update LOCKED_SHA256 below and quote her instruction in the
 * commit message. Any other failure means: revert the tokens file.
 */
const LOCKED_SHA256 = "165149d0bee05d8e4b710126b03f867ca6aae91fd2a22e7db54be43fea4b61aa";

test("design-tokens.css is untouched", () => {
  const actual = createHash("sha256")
    .update(readFileSync(new URL("../app/design-tokens.css", import.meta.url)))
    .digest("hex");
  assert.equal(
    actual,
    LOCKED_SHA256,
    "app/design-tokens.css changed. If Anna ordered this, update LOCKED_SHA256 in the same commit and quote her; otherwise revert."
  );
});

test("no typeface is declared outside the locked file", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const literal = [...css.matchAll(/font-family:\s*([^;]+);/g)]
    .map((m) => m[1].trim())
    .filter((f) => !f.startsWith("var(") && f !== "inherit");
  // The documented exception: simulated client UI inside a case study.
  const allowed = new Set(["Lato, Arial, sans-serif"]);
  const strays = literal.filter((f) => !allowed.has(f));
  assert.deepEqual(
    strays,
    [],
    "globals.css declares a typeface outside design-tokens.css. Fonts are locked; use var(--font-display) or var(--font-body), or document a new simulated-UI exception here."
  );
});
