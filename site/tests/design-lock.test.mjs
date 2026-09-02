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
const LOCKED_SHA256 = "71d5bec0b00dbbe2499902d194927ef1df1d0ef63a31e387d80610973827a3c5";

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

test("button radii come from the two radius tokens", () => {
  // The button law (Anna, 2026-09-01: "make sure everything follows these
  // guidelines in the future. commit to it"). Every control and choice
  // surface below must take its corner from var(--radius-pill) or
  // var(--radius-control), never a literal. Exhibits (.pp-toggle,
  // .attribute-chip) simulate client UIs and are exempt by omission.
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const guarded = [
    ".persona-switch", ".aa-prompts button", ".aa-composer button",
    ".anna-razor-send", ".anna-razor-dismiss", ".anna-razor-undo",
    ".anna-razor-min", ".anna-razor-hint", ".anna-razor-offer",
    ".anna-chat-send", ".anna-chat-close", ".anna-chat-menu button",
    ".anna-chat-followups button",
  ];
  const offenders = [];
  for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = rule[1].trim();
    const radius = rule[2].match(/border-radius:\s*([^;]+);/);
    if (!radius) continue;
    if (guarded.some((g) => sel.includes(g)) && /\d+px/.test(radius[1]) && !radius[1].includes("var(")) {
      offenders.push(`${"$"}{sel.split("\n").pop().trim()} -> ${"$"}{radius[1]}`);
    }
  }
  assert.deepEqual(offenders, [], "a button re-hardcoded its corner; use var(--radius-pill) or var(--radius-control)");
});

test("the Services CTA obeys the unified button geometry", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.svc-secondary,\n\.svc-cta a \{/, ".svc-cta a left the unified button group");
});

