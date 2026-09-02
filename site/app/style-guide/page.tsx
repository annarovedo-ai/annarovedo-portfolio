import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "Style guide · Anna Rovedo",
  description: "The site's type system, written down.",
  // A working reference for Anna and future sessions, not a page for
  // visitors or crawlers.
  robots: { index: false, follow: false },
  // Release test 19 wants a canonical on every route; harmless alongside
  // noindex, and correct if the page is ever shared by URL.
  alternates: { canonical: "/style-guide" },
};

/**
 * THE STYLE GUIDE (2026-09-01, Anna: "the h2 typography is different for
 * EVERY PAGE. Can we make a style guide and type system that the whole
 * site works off of?").
 *
 * The system already existed — the TYPOGRAPHY SYSTEM block in globals.css,
 * 2026-08-27 — but it lived only as tokens and comments, which is why it
 * read as "every page is different". This page renders it, at the real
 * tokens, so drift is visible the moment it happens: if a page stops
 * matching this one, the page is wrong.
 *
 * Rendering rule: every sample uses the live CSS variable, never a copied
 * pixel value, so this page cannot itself drift out of date.
 */

const scale: Array<{ token: string; role: string; used: string }> = [
  { token: "--type-hero", role: "Page hero (h1)", used: "Case-study and interior page titles" },
  { token: "--type-heading-xl", role: "Editorial section (h2)", used: "Case-study sections, summary and next-case banners, CTA bands" },
  { token: "--type-heading-lg", role: "Chapter (h2)", used: "Archive group headings" },
  { token: "--type-heading-band", role: "Band heading (h3)", used: "Fixed-size band titles that must match across a row" },
  { token: "--type-heading-md", role: "Utility section (h2)", used: "Home sections, resume blocks, contact side, about points" },
  { token: "--type-heading-sm", role: "Item title (h2/h3)", used: "Services capabilities, engagement shapes, process steps" },
  { token: "--type-heading-xs", role: "Card title (h3)", used: "Case cards, findings, roles" },
  { token: "--type-lead", role: "Deck", used: "The sentence under every page title, and the homepage hero line" },
  { token: "--type-body", role: "Body", used: "Running text" },
  { token: "--type-small", role: "Small", used: "Captions, meta, supporting notes" },
  { token: "--type-label", role: "Label", used: "Eyebrows and UI labels, uppercase, tracked" },
];

export default function StyleGuide() {
  return (
    <main>
      <SiteHeader />
      <article className="shell styleguide">
        <p className="eyebrow">Internal</p>
        <h1>One type system. Eleven roles. No other sizes.</h1>
        <p className="hero-deck">
          Every size on this page is rendered from the live token, so this page
          cannot lie. If a heading somewhere on the site does not match its row
          here, that heading is the bug.
        </p>

        <section className="sg-rules">
          <h2 style={{ fontSize: "var(--type-heading-md)" }}>The rules</h2>
          <p>
            An h1 is the hero, once per page. An h2 is one of four named roles
            below, chosen by context, never by taste: editorial section on
            long-form pages, chapter on index pages, utility section on
            functional pages, item title inside card patterns. The deck under a
            page title is one size everywhere. Serif for display, sans for
            body and labels. Anything off this scale must carry a comment
            naming itself an exception, next to the rule, with the reason.
          </p>
        </section>

        {scale.map((row) => (
          <section className="sg-row" key={row.token}>
            <p className="sg-meta">
              <code>{row.token}</code>
              <span>{row.role}</span>
              <span>{row.used}</span>
            </p>
            <p
              className="sg-sample"
              style={{
                fontSize: `var(${row.token})`,
                fontFamily: row.token.includes("heading") || row.token === "--type-hero"
                  ? "var(--font-display)"
                  : "var(--font-body)",
                lineHeight: row.token === "--type-hero"
                  ? "var(--leading-display)"
                  : row.token.includes("heading")
                    ? "var(--leading-heading)"
                    : "var(--leading-body)",
                letterSpacing: row.token === "--type-hero" || row.token.includes("heading")
                  ? "var(--tracking-display)"
                  : row.token === "--type-label"
                    ? "var(--tracking-label)"
                    : "normal",
                textTransform: row.token === "--type-label" ? "uppercase" : "none",
                fontWeight: row.token.includes("heading") || row.token === "--type-hero" || row.token === "--type-label" ? 700 : 400,
              }}
            >
              How it works, how it looks, and what it stands for.
            </p>
          </section>
        ))}
      </article>
    </main>
  );
}
