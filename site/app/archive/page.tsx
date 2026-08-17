import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { archiveGroups } from "./archiveContent";

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
        <section className="archive-intro shell" data-anna-prompt="What else have you made?">
          <p className="eyebrow">The archive</p>
          <h1>Real work that hasn&rsquo;t gotten the full case-study treatment yet.</h1>
          <p className="archive-deck">
            These are not case studies and they are not pretending to be. Some of it is old
            enough that there is no research left to point to and the people who could
            confirm it have long since moved on. Some of it is current, just not written up
            here yet. Either way, what is here is the idea and what I made. Click through for
            the full images, or ask me about any of it directly.
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
            <a className="next-case-status" href="/#work">
              View the case studies
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
