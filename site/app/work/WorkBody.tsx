"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { flagshipCaseStudies, homeContent, supportingCaseStudies } from "../homeContent";
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

  return (
    <article id="top" className="work-index">
      <section
        className="archive-intro shell"
        data-anna-prompt="Which case study should I start with?"
        data-anna-prompt-ex="Did you know I’d click “Ex-Boyfriend”?"
      >
        <p className="eyebrow">Work</p>
        <h1>Six case studies, in full.</h1>
        <p className="archive-deck">
          The brief, the constraint, and what actually happened, for each one, followed by
          the rest of it further down. The homepage carries a shorter preview of the six case
          studies.
        </p>
      </section>

      <section className="home-work shell">
        <div className="home-flagship">
          <p className="home-flagship-label">From AI widget to AI operating system</p>
          <div className="home-flagship-grid">
            {flagshipCaseStudies.map((cs) => (
              <CaseCard key={cs.href} cs={cs} persona={persona} />
            ))}
          </div>
        </div>

        <div className="home-case-row">
          {supportingCaseStudies.map((cs) => (
            <CaseCard key={cs.href} cs={cs} persona={persona} />
          ))}
        </div>

        <div className="home-other">
          <p className="eyebrow">Also</p>
          <h3>There&rsquo;s more than this.</h3>
          <p className="home-other-archive-link">
            Client work, agency work, and twenty years of things that don&rsquo;t have the
            research, decisions, and outcome depth a full case study promises. Some real
            images below; some just haven&rsquo;t been written up yet.
          </p>
        </div>
      </section>

      {archiveGroups.map((group) => (
        <section className="archive-group" id={group.id} key={group.id}>
          <div className="shell">
            <header className="archive-group-head">
              <p className="eyebrow">{group.kicker}</p>
              <h2>{group.heading}</h2>
              <p>{group.intro}</p>
            </header>

            <div className="archive-card-grid">
              {group.entries.map((entry) => {
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
      ))}

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
