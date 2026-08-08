"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { aboutContent } from "../aboutContent";
import ResumeSheet from "../ResumeSheet";
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
          <div
            className="about-portrait"
            role="img"
            aria-label="Portrait of Anna Rovedo"
          />
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
              </div>
            ) : null}
          </div>
        </section>

        {showResume ? (
          <section className="about-resume">
            <ResumeSheet persona={persona} showIntro={false} showContact={false} />
          </section>
        ) : null}

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
