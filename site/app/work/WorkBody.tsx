"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { homeContent, orderedCaseStudies } from "../homeContent";
import { CaseCard } from "../CaseCard";
import { archiveGroups } from "../archive/archiveContent";

const archiveAssetRoot = "/archive";

/**
 * /work — the full six-case record, split out of the homepage on 2026-08-20
 * (Anna: "the homepage will just have 6 smaller case studies, not the 6 big
 * tiles"). This page carries the full-detail CaseCard markup the homepage
 * used to show directly: the Concierge/Journey Orchestration pair as a linked
 * 50/50 story, then the four independent case studies in a row. The homepage
 * now links here rather than duplicating any of it.
 *
 * The archive groups render below the six case studies too, added the same
 * day (Anna: "add the archive onto the work page") — the same markup
 * /archive/page.tsx uses, so a card here and a card there never drift apart.
 * /archive still exists as its own page rather than being deleted or
 * redirected: this only stopped /work from having to send someone away to
 * see the rest of the work.
 *
 * Persona-aware like every other interior page: reads the live persona store
 * rather than taking an entryPersona prop, since nothing routes a visitor
 * straight to /work as an entrance the way /studio does. Whatever persona a
 * visitor carries in from the homepage or the switcher is the one whose copy
 * variant renders here.
 */
export default function WorkBody() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const c = homeContent[persona];
  /**
   * This page's own frame — eyebrow, h1, deck, archive heading — was hardcoded
   * until 2026-08-31, so every persona read the recruiter's version of a page
   * the switcher claims to change. The footer band at the bottom of this same
   * file was already per-persona, which is how the seam showed: the bottom of
   * /work spoke to whoever you picked and the top did not.
   *
   * Recruiter is the baseline and the fallback, matching the rest of the voice
   * layer, so a persona with nothing written here renders exactly what it
   * always did. Only ex has a variant today; client inherits deliberately.
   */
  const r = homeContent.recruiter;
  const workHeadline = c.workPageHeadline ?? r.workPageHeadline;
  const workDeck = c.workPageDeck ?? r.workPageDeck;
  const archiveHeading = c.workArchiveHeading ?? r.workArchiveHeading;

  return (
    <article id="top" className="work-index">
      <section
        className="archive-intro shell"
        data-anna-prompt="Which case study should I start with?"
        data-anna-prompt-ex="Did you know I’d click “Ex-Boyfriend”?"
      >
        <p className="eyebrow">{c.workEyebrow}</p>
        <h1>{workHeadline}</h1>
        <p className="archive-deck">{workDeck}</p>
      </section>

      {/* The Concierge pair used to render as a joined two-card panel under
          a shared "From AI widget to AI operating system" label, visually
          unlike every other card on the page — which three separate
          reviewers read as two case studies accidentally crammed together.
          Broken up 2026-08-24 (Anna: "break up the part one and part 2, put
          part two below"): all six are now equal cards in one grid, ordered
          so part two sits directly beneath part one in the next row. The
          "Part one" / "Part two" badges still carry the relationship, which
          is the honest amount of emphasis for it. */}
      <section className="home-work shell">
        <div className="home-case-row">
          {orderedCaseStudies.map((cs) => (
            <CaseCard key={cs.href} cs={cs} persona={persona} />
          ))}
        </div>

        {/* The "Also / There's more than this" teaser was removed here
            2026-08-24 (Anna: "remove this section on the work page"): it
            announced the archive that begins immediately below it ON THIS
            PAGE, so it was a signpost pointing at something already in
            view. It still earns its place on the homepage, where the
            archive really is somewhere else. */}
      </section>

      {/* ONE SECTION, NOT FOUR (2026-08-24, Anna: "put all the other work
          together, it gets cut off"). The archive's four groups (named
          engagements, agency, apparel, editorial) each rendered their own
          headed section here, so the back half of this page was four
          restarts in a row and the run of work read as chopped up. On
          /archive the groups still earn their headings — that page is
          about the range and how it divides. Here the archive is one
          answer to one question, so it is one grid, four across. */}
      <section className="archive-group" id="more">
        <div className="shell">
          <header className="archive-group-head">
            <p className="eyebrow">Also</p>
            <h2>{archiveHeading}</h2>
            <p>
              Client work, agency work, apparel and editorial: real, documented
              engagements without the research, decisions, and outcome depth a full
              case study promises.
            </p>
          </header>

          <div className="archive-card-grid">
            {archiveGroups.flatMap((group) => group.entries).map((entry) => {
              const href = entry.href ?? `/archive/${entry.slug}`;
              const thumb = entry.images?.[0];
              return (
                <a className="archive-card" href={href} key={entry.slug}>
                  <span className="archive-card-media" aria-hidden={!thumb}>
                    {thumb ? (
                      <img
                        src={`${archiveAssetRoot}/${thumb.src}`}
                        alt=""
                        loading="lazy"
                      />
                    ) : null}
                  </span>
                  <span className="archive-card-body">
                    <span className="archive-card-client">{entry.client}</span>
                    <span className="archive-card-meta">{entry.meta}</span>
                    <span className="archive-card-cta">
                      {entry.href ? (entry.hrefLabel ?? "Read more") : "View"} &rarr;
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing contact band, new 2026-08-20 (Anna’s work-page wireframe:
          "CONTACT ME" as the last thing on the page). Reuses the same
          per-persona footer fields the homepage’s own closing CTA does,
          rather than writing a third version of this copy. */}
      <section className="home-cta" data-anna-prompt="What should I include when I reach out?">
        <div className="shell home-cta-inner">
          <div>
            <h2>{c.footerHeadline}</h2>
            <p>{c.footerBody}</p>
          </div>
          <div className="home-cta-actions">
            <a className="home-cta-button" href={c.footerButtonHref}>
              {c.footerButton}
            </a>
            {c.footerSecondary ? (
              <a className="home-cta-secondary" href={c.footerSecondary.href}>
                {c.footerSecondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
