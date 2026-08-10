"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import type { CaseStudy } from "./homeContent";
import {
  caseFor,
  clients,
  flagshipCaseStudies,
  homeContent,
  supportingCaseStudies,
} from "./homeContent";
import AlmostAnnaChat from "./AlmostAnnaChat";

/**
 * Shared card markup for both the flagship pair and the supporting row.
 *
 * The card resolves its own copy rather than receiving it resolved, so every
 * call site stays a one-liner and no caller can forget to switch. caseFor
 * falls back field by field, so a card with no variant for this persona
 * renders exactly what it always did.
 */
function CaseCard({
  cs,
  persona,
  outcomeLabel,
}: {
  cs: CaseStudy;
  persona: PersonaId;
  outcomeLabel: string;
}) {
  const c = caseFor(cs, persona);
  return (
    <a href={c.href} className="home-case">
      {/* Part label lives on the media, so the media span cannot be aria-hidden
          any more. The img keeps alt="" and stays decorative either way. */}
      <span className="home-case-media">
        {c.image ? <img src={c.image} alt="" loading="lazy" /> : null}
        {c.part ? <span className="home-case-part">{c.part}</span> : null}
      </span>
      <span className="home-case-content">
        <span className="home-case-tags">
          <span className="home-case-tag">{c.tag}</span>
        </span>
        <h3>{c.title}</h3>
        <p>{c.body}</p>
        <span className="home-case-outcome">
          {/* The label is persona-switched, because the slot below it holds a
              different question for each reader: what it achieved, what you
              would be buying, or when and where this was. */}
          <span>{outcomeLabel}</span>
          {c.outcome}
        </span>
        <span className="home-case-cta">View case study &rarr;</span>
      </span>
    </a>
  );
}

export default function HomeBody() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const c = homeContent[persona];

  return (
    <article id="top">
      <section className="home-hero shell">
        <div className="home-hero-copy">
          <h1>
            {c.headline[0]}
            {c.headline[1] ? (
              <>
                {" "}
                <span className="home-headline-soft">{c.headline[1]}</span>
              </>
            ) : null}
          </h1>
          <p className="home-hero-deck">{c.subtext}</p>
        </div>

        <div className="home-hero-grid">
          <div className="home-video" role="img" aria-label="Introduction video placeholder">
            <span className="home-video-label">Meet actual Anna</span>
          </div>

          <AlmostAnnaChat variant="inline" />
        </div>
      </section>

      <section className="home-clients" data-anna-prompt="What I did for these">
        <div className="shell">
          <p className="eyebrow">Selected clients and agency partners</p>
          <ul>
            {clients.map((cl) => (
              <li key={cl.name}>
                <img src={cl.src} alt={cl.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-work shell" id="work" data-anna-prompt="Where to start?">
        <p className="eyebrow">{c.workEyebrow}</p>
        <h2>{c.casesHeader}</h2>

        <div className="home-flagship">
          <p className="home-flagship-label">From AI widget to AI operating system</p>
          <div className="home-flagship-grid">
            {flagshipCaseStudies.map((cs) => (
              <CaseCard
                key={cs.href}
                cs={cs}
                persona={persona}
                outcomeLabel={c.outcomeLabel}
              />
            ))}
          </div>
        </div>

        <div className="home-case-row">
          {supportingCaseStudies.map((cs) => (
            <CaseCard
              key={cs.href}
              cs={cs}
              persona={persona}
              outcomeLabel={c.outcomeLabel}
            />
          ))}
        </div>

        <div className="home-other">
          <p className="eyebrow">Also</p>
          <h3>There&rsquo;s more than this.</h3>
          <p className="home-other-archive-link">
            Client work, agency work, and twenty years of things I haven&rsquo;t written
            up yet.{" "}
            <a href="/archive">See the archive &rarr;</a>
          </p>
        </div>
      </section>

      {/* Persona-switched as of 2026-08-07, and cut to roughly half its length.
          See the note on HomeContent.about for why the old opener had to go. */}
      <section className="home-about shell" data-anna-prompt="Graphic design to AI?">
        <p className="eyebrow">{c.about.eyebrow}</p>
        <h2>{c.about.headline}</h2>
        <div className="home-about-copy">
          {c.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <blockquote className="home-pullquote">{c.about.pullquote}</blockquote>
        <a className="home-inline-link" href="/about">
          {c.about.link} &rarr;
        </a>
      </section>

      <section className="home-cta" data-anna-prompt="What I'm looking for">
        <div className="shell home-cta-inner">
          <div>
            <h2>{c.footerHeadline}</h2>
            <p>{c.footerBody}</p>
          </div>
          {/* Two paths, because footerBody above already promises two. The
              button used to point at /contact regardless of what it said, and
              /contact leads with a message form, so "Book a time" delivered a
              form plus a smaller link to the thing you had just asked for.
              Now the primary does exactly what it says, and the alternative it
              was hiding is offered out loud. */}
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
