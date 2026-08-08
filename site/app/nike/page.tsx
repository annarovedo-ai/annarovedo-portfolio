import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";

export const metadata: Metadata = {
  title: "Forty fields, five that mattered · Nike Operations Workspace · Anna Rovedo",
  description:
    "How Anna Rovedo designed inventory availability for Nike Operations Workspace, reducing a forty-attribute requirement to the five fields users actually searched by.",
};

const assetRoot = "/case-study/nike";

const concepts = [
  {
    number: "1.0",
    name: "Quick search, flyout",
    body: "A panel pulls in from the side, answers the question, and gets out of the way. Deliberately limited.",
  },
  {
    number: "2.0",
    name: "Dedicated page, filters hidden",
    body: "Room for real digging, filters tucked away. Tidy — and it means opening that panel every single time.",
  },
  {
    number: "3.0",
    name: "Dedicated page, filters exposed",
    body: "The bet: most people reach for the same handful every time. This was the hypothesis I had to prove.",
  },
];

const attributes = [
  "Material number",
  "Plant code",
  "ISEG",
  "Quality",
  "Quantity",
];

/**
 * Positions of the five surviving attributes within the forty specified.
 * Arbitrary placement — the requirements document had no meaningful order.
 * The point is the ratio, not which slot each field occupied.
 */
const keptPositions = new Set([3, 11, 18, 27, 34]);

function ReductionDiagram() {
  return (
    <figure className="reduction">
      <div
        className="reduction-grid"
        role="img"
        aria-label="Diagram: of forty searchable attributes specified in the requirements, five were kept as the primary interface"
      >
        {Array.from({ length: 40 }, (_, i) => (
          <span
            key={i}
            className={keptPositions.has(i) ? "reduction-cell is-kept" : "reduction-cell"}
          />
        ))}
      </div>
      <figcaption>
        <strong>Forty specified. Five kept.</strong> The other thirty-five did not disappear — they moved behind &ldquo;See More Filters,&rdquo; where the people who genuinely need them can still find them.
      </figcaption>
    </figure>
  );
}

function SectionNumber({ children }: { children: string }) {
  return <p className="section-number">{children}</p>;
}

export default function NikeCaseStudy() {
  return (
    <main className="nike-case">
      <SiteHeader />
      <Breadcrumb label="Nike, Datalogue & Operations Workspace" />

      <article id="top">
        <section className="hero shell">
          <p className="eyebrow">Nike Operations Workspace · Inventory availability</p>
          <h1>Forty fields. Five that mattered.</h1>
          <p className="hero-deck">
            Nike&rsquo;s order management teams had no single view of whether product was actually available, and the requirements listed roughly forty ways to search for it. I was not permitted to interview a single end user — so I found another way to ask them.
          </p>

          <div className="hero-meta" aria-label="Project details" id="role">
            <div>
              <span>Role</span>
              <strong>Lead UX Designer</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>Research, concepts, prototyping, usability testing</strong>
            </div>
            <div>
              <span>Outcome</span>
              <strong>Shipped</strong>
            </div>
          </div>

          <figure className="figure nike-hero-figure">
            <div className="figure-image-wrap">
              <img
                src={`${assetRoot}/hero-w.png`}
                alt="Nike Operations Workspace, Inventory Availability title card"
              />
            </div>
          </figure>
        </section>

        <section className="chapter shell" id="story" data-anna-prompt="Why three tools">
          <SectionNumber>01</SectionNumber>
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">The problem</p>
              <h2>Three tools to answer one question.</h2>
            </div>
            <div>
              <p className="lead">
                To find out whether product was available, a specialist ran reports in SAP AFS, cross-referenced a separate reporting tool, then returned to the order they were building — assuming they still remembered where they were.
              </p>
              <p>
                I joined after the platform had already gone live in Greater China, so there was no clean slate. Real people depended on this every day.
              </p>
            </div>
          </div>

          <blockquote>
            &ldquo;Using multiple, fragmented tools results in a time consuming and inefficient process. Delayed orders mean lost revenue.&rdquo;
            <footer>&mdash; The problem statement I presented to stakeholders</footer>
          </blockquote>

          <figure className="figure">
            <p className="figure-tag">Before</p>
            <div className="figure-image-wrap">
              <img
                src={`${assetRoot}/before-order.png`}
                alt="Existing order-entry line showing material number, quantity, an availability status dot, and a sizing breakdown with Order Qty, Today and Total columns"
                loading="lazy"
              />
            </div>
            <figcaption>
              What availability looked like inside an order line: a status dot and a size breakdown for <em>today</em>. No forward view, no way to compare plants, and nothing you could hand to a customer.
            </figcaption>
          </figure>
        </section>

        <section className="chapter shell" data-anna-prompt="No user interviews. How?">
          <SectionNumber>02</SectionNumber>
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">The constraint</p>
              <h2>I was not allowed to talk to anyone.</h2>
            </div>
            <div>
              <p className="lead">
                Internal process blocked me from interviewing end users. For a feature whose entire premise is &ldquo;we do not know what people really search for,&rdquo; that is a problem.
              </p>
              <p>
                Proto-persona workshops with stakeholders got me partway, with conspicuous gaps where firsthand knowledge should have been. So I found a side door: a survey to marketplace operations distribution lists across North America.
              </p>
            </div>
          </div>

          <div className="stat-band">
            <strong>47</strong>
            <p>responses from working operations staff — the people I was not permitted to interview, answering in their own words.</p>
          </div>

          <p className="body-copy">
            It is not a substitute for sitting with users, and I would not claim otherwise. What I ended up with is either very thorough proto-personas or semi-validated ones, depending on how generous you are feeling. But it came from the actual population rather than from people describing that population.
          </p>
        </section>

        <section className="chapter shell" data-anna-prompt="The contradiction">
          <SectionNumber>03</SectionNumber>
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">Three doors</p>
              <h2>Then the contradiction.</h2>
            </div>
            <div>
              <p className="lead">
                I sketched three ways in, each making a different assumption about how much of the tool someone needs at the moment they need it.
              </p>
            </div>
          </div>

          <div className="concept-grid">
            {concepts.map((c) => (
              <div className="concept-card" key={c.number}>
                <span>{c.number}</span>
                <strong>{c.name}</strong>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          <p className="body-copy">
            I took all three to the subject matter experts and ran a feedback grid. The enthusiasm was useful. The anxiety was more useful — because in the same session, on the same wall, people told me two things that cannot both be solved by opinion.
          </p>

          <figure className="figure">
            <div className="figure-image-wrap">
              <img
                src={`${assetRoot}/feedback-concerns.png`}
                alt="Concerns column from the feedback grid: sticky notes reading 'Missing fields that are important', 'Having too many options', 'We really need to capture all the features we currently have', and 'Learning curve'"
                loading="lazy"
              />
            </div>
            <figcaption>
              &ldquo;Missing fields that are important&rdquo; sat directly beside &ldquo;Having too many options.&rdquo; Add fields and you are cluttered; remove them and you have broken someone&rsquo;s workflow. That contradiction <em>was</em> the design problem.
            </figcaption>
          </figure>
        </section>

        <section className="chapter shell" data-anna-prompt="Forty fields to five">
          <SectionNumber>04</SectionNumber>
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">The decision</p>
              <h2>Forty down to five, by asking instead of arguing.</h2>
            </div>
            <div>
              <p className="lead">
                My hypothesis was that almost nobody used most of those forty attributes. Rather than argue it in a meeting, I ran a second survey: what are your top four, in order of importance? What has to appear in the results?
              </p>
              <p>
                The answers converged, hard.
              </p>
            </div>
          </div>

          <div className="attribute-band" aria-label="The five attributes users actually searched by">
            {attributes.map((a) => (
              <div className="attribute-chip" key={a}>{a}</div>
            ))}
          </div>

          <ReductionDiagram />

          <p className="body-copy">
            Those became the primary filter set — the panel you get by default, without asking for it. Everything the survey did not surface moved one click away.
          </p>

          <figure className="figure">
            <div className="figure-image-wrap">
              <img
                src={`${assetRoot}/f-primary.png`}
                alt="Inventory Availability filter panel showing Material Number, Availability Date, Size, General Availability, Quality, Plant and ISEG fields, two saved filter slots, and a See More Filters control"
                loading="lazy"
              />
            </div>
            <figcaption>
              The default panel — material number, plant, ISEG and quality all present without hunting, two slots for saved filter sets, and &ldquo;See More Filters&rdquo; holding everything else one click away. Nothing was taken from anyone; it was moved off the default path.
            </figcaption>
          </figure>

          <div className="nike-pair">
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/more-filters-w.png`}
                  alt="More Filters side panel open over the results, listing Plant, Contract Number, Availability Date, Quality, ISEG, Size, Division and Stock Type"
                  loading="lazy"
                />
              </div>
              <figcaption>
                Everything the survey did not surface, one click away. Nothing was taken from anyone — it moved off the default path.
              </figcaption>
            </figure>
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/excel-download-w.png`}
                  alt="Download dialog over the results asking whether the user would like to download an Excel version"
                  loading="lazy"
                />
              </div>
              <figcaption>
                Download to Excel — the one thing the experts asked for that the requirements never mentioned.
              </figcaption>
            </figure>
          </div>

          <p className="body-copy">
            The contradiction dissolved, and not because I picked a side. Both groups were right. They just needed different depths of the same tool.
          </p>
        </section>

        <section className="chapter shell" data-anna-prompt="How it went once it shipped">
          <SectionNumber>05</SectionNumber>
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">Testing and outcome</p>
              <h2>It shipped.</h2>
            </div>
            <div>
              <p className="lead">
                Four users, five tasks: search a material number, filter by plant, filter again by ISEG, download the results, and tell me how many size large are available on December 26th. All four finished unaided.
              </p>
              <p>
                All four also wanted saved filter sets on the flyout — which quietly confirmed concept 1.0 had not been a dead end. It had a different job than I first thought.
              </p>
            </div>
          </div>

          <div className="journey-stack wide-figure">
            <figure className="figure">
              <p className="figure-tag">After</p>
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/f-results.png`}
                  alt="Results grid with three filter chips applied — Material, Plant and ISEG — and a row expanded to show quantities by size across successive availability dates"
                  loading="lazy"
                />
              </div>
              <figcaption>
                The same size breakdown, now running across successive availability dates with a running total. It is how a specialist answers &ldquo;how many size large on December 26th&rdquo; without opening anything else. Chips hold the shape of the question, and &ldquo;Set as Default&rdquo; is the saved filter set all four testers asked for.
              </figcaption>
            </figure>
          </div>

          <p className="body-copy">
            The blocker turned out to be the interesting part. Being denied user interviews forced me to find a population I could actually reach, and forty-seven responses from working operations staff beat a room of stakeholders confidently describing them.
          </p>

          <p className="body-copy">
            The reduction is the piece I would point to. Not because subtraction is virtuous, but because it was the only move that satisfied two groups who appeared to want opposite things. The evidence made it a decision instead of a preference, which is the difference between a design you can defend and one you can only assert.
          </p>
        </section>

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2>Designing an AI concierge for the enterprise buying journey</h2>
            </div>
            <a className="next-case-status" href="/concierge">Read part one</a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
