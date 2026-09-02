import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PersonaText from "../PersonaCopy";
import { archiveGroups } from "./archiveContent";
import { archiveCopy } from "./archiveCopy";

export const metadata: Metadata = {
  title: "The archive · Anna Rovedo",
  description:
    "Real work without a full case study: client engagements, advertising, shopper marketing, apparel graphics, brand identity and editorial design.",
  alternates: { canonical: "/archive" },
};

const assetRoot = "/archive";

export default function Archive() {
  return (
    <main>
      <SiteHeader />

      <article id="top" className="archive">
        <section className="archive-intro shell" data-anna-prompt="What else have you made?" data-anna-prompt-ex="Did you keep any photos?">
          <p className="eyebrow">The archive</p>
          {/* Voiced since 2026-09-01 — recruiter baseline verbatim in
              archiveCopy.ts, client and ex overrides beside it. */}
          <h1><PersonaText t={archiveCopy.heading} /></h1>
          <p className="archive-deck">
            <PersonaText t={archiveCopy.deck} />
          </p>
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
                            src={`${assetRoot}/${thumb.src}`}
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

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next</p>
              <h2>The work with a full write-up</h2>
            </div>
            <a className="next-case-status" href="/work">
              View the case studies
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
