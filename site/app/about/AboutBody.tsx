"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { aboutContent } from "../aboutContent";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export default function AboutBody() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  /**
   * Ex reads its own copy again as of 2026-08-31, for the same reason /contact
   * does: this line was `store === "ex" ? "recruiter" : store` under "utility
   * pages serve the Recruiter content" (2026-08-19), while a full ex block sat
   * in aboutContent the whole time — "Still designing. New everything else.",
   * the plan-or-improvising callback, the shortcut. None of it had ever
   * rendered.
   *
   * The page still left the Recruiter/Ex nav in the About/Resume merge and is
   * reachable by URL rather than by link. That is a reason to leave it
   * unlinked, not a reason to serve the wrong persona to whoever arrives.
   *
   * showResume below now goes false for ex, which is correct: the resume block
   * is a hiring artifact and this version of the page is a catch-up.
   */
  const persona = store;
  const c = aboutContent[persona];
  const showResume = persona === "recruiter";

  return (
    <main>
      <SiteHeader />

      <article id="top">
        <section
          className="about-intro shell"
          data-anna-prompt="Why not just pick one discipline?"
          data-anna-prompt-ex="Do you think I changed?"
        >
          {/* The portrait placeholder was removed 2026-08-12. It was an empty
              div with a border and a fill, holding a 4:5 slot for a photograph
              that does not exist, and on a page whose whole job is to be
              believed, an empty frame reads as unfinished rather than as
              considered. If a real photograph arrives, put an <img> back here
              and restore the two column grid on .about-intro. */}
          <div className="about-intro-copy">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>{c.headline}</h1>
            {/* Both variants render; CSS shows one. See introMobile in
                aboutContent.ts for why this is not a JS swap. */}
            <div className="about-intro-long">
              {c.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {c.introMobile ? (
              <div className="about-intro-short">
                {c.introMobile.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}
            {showResume ? (
              <div className="cv-contact-row">
                <a className="cv-download" href="/anna-rovedo-resume.pdf" download>
                  Download resume
                </a>
                <a className="cv-view-link" href="/resume">
                  View the resume &rarr;
                </a>
              </div>
            ) : null}
          </div>
        </section>

        {/* The full ResumeSheet was embedded here from 2026-08-12 to
            2026-08-18, a workaround for the era when Resume was hidden from
            the primary nav and About was the only path to it. Resume is back
            in the nav, so the embed made /about and /resume the same page
            twice (Anna: "about and resume contain the exact same info").
            About is the story again; /resume is the evidence. */}

        {/* Exact canonical wording: this hint hits the canned-answer lookup
            and returns Anna’s locked copy without a model call. */}
        <section className="about-points" data-anna-prompt="How do you work when the roadmap isn’t clear?">
          <div className="shell">
            <p className="eyebrow">{c.pointsKicker}</p>
            <ol className="about-points-grid">
              {c.points.map((p, i) => (
                <li key={p.title}>
                  <span className="about-point-number">{`0${i + 1}`}</span>
                  <h2>{p.title}</h2>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {c.closing ? (
          <section className="about-closing" data-anna-prompt="How does the fashion training show up in the work?">
            <div className="shell about-closing-inner">
              <p className="eyebrow">{c.closing.kicker}</p>
              {c.closing.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="about-cta shell">
          <h2>{c.ctaHeadline}</h2>
          {c.ctaBody ? <p>{c.ctaBody}</p> : null}
          <a className="about-cta-button" href={c.ctaHref}>
            {c.ctaButton}
          </a>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
