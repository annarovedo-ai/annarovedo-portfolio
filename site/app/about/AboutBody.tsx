"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { aboutContent } from "../aboutContent";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export default function AboutBody() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const c = aboutContent[persona];
  const showResume = persona === "recruiter" || persona === "ex";

  return (
    <main>
      <SiteHeader />

      <article id="top">
        <section className="about-intro shell">
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
                  Download résumé
                </a>
                <a className="cv-view-link" href="/resume">
                  View the résumé &rarr;
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

        <section className="about-points">
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
          <section className="about-closing">
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
