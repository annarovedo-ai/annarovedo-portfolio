import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";
import CaseHero from "../CaseHero";
import { caseVoices } from "../caseVoices";
import ExAside from "../ExAside";

export const metadata: Metadata = {
  title: "Redesigning search across IBM.com · Anna Rovedo",
  description:
    "How Anna Rovedo led the UX from audit and research through interaction design, testing, and launch for IBM.com search.",
  alternates: { canonical: "/search" },
};

const assetRoot = "/case-study/search";

function SectionNumber({ children }: { children: string }) {
  return <p className="section-number">{children}</p>;
}

const findings = [
  {
    number: "01",
    title: "Tabs behaved like separate search engines",
    body: "People had to understand IBM’s content structure before they could find an answer. A result could exist in another tab while the active tab appeared empty.",
    response: "Led to one ranked result set with filters.",
  },
  {
    number: "02",
    title: "Results were difficult to scan",
    body: "Dense lists offered too few signals about what each result was, which made comparing products, documentation, learning, and support content unnecessarily slow.",
    response: "Led to visible content types and a clearer result hierarchy.",
  },
  {
    number: "03",
    title: "Dead ends hid the next useful path",
    body: "When results failed, the page offered weak recovery guidance and made specialized product, learning, and documentation experiences difficult to discover.",
    response: "Led to query-preserving recovery and purposeful destinations.",
  },
];

const decisions = [
  {
    title: "Unify the result journey",
    body: "Replace six tabbed searches with one ranked result set, then let people narrow it without losing context.",
  },
  {
    title: "Make results recognizable",
    body: "Use content labels and clearer hierarchy so products, documentation, learning, support, and editorial pages can be distinguished before clicking.",
  },
  {
    title: "Design the way forward",
    body: "Keep the journey moving with continuous results, query-preserving recovery, and relevant paths into specialized IBM experiences.",
  },
];

export default function SearchCaseStudy() {
  return (
    <main className="search-case">
      <SiteHeader />
      <Breadcrumb label="IBM Global Search" meta="Live and evolving" />

      <article id="top">
        <section className="hero shell search-hero">
          <CaseHero voices={caseVoices.search} />

          <div className="hero-meta search-hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>Lead UX designer</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>Global SERP, filters, recovery, and typeahead</strong>
            </div>
            <div>
              <span>Launch</span>
              <strong>
                <a
                  className="search-hero-live"
                  href="https://www.ibm.com/search"
                  target="_blank"
                  rel="noreferrer"
                >
                  US-English MVP live on IBM.com ↗
                </a>
              </strong>
            </div>
          </div>

          <div
            className="search-hero-comparison"
            aria-label="Before and after comparison of IBM.com search"
          >
            <figure className="search-comparison-panel">
              <figcaption className="search-comparison-caption">
                <div>
                  <span>Before</span>
                  <strong>Six tabbed result systems</strong>
                </div>
                <p>People had to guess which IBM content category contained the answer.</p>
              </figcaption>
              <div className="search-comparison-media">
                <img
                  src={`${assetRoot}/compare-before.webp`}
                  alt="Old IBM.com search results for data, showing six content tabs, a dense result list, and a separate product rail"
                  width={2215}
                  height={1165}
                  loading="eager"
                />
              </div>
            </figure>

            <div className="search-comparison-transition" aria-hidden="true">
              <span>Redesigned into</span>
              <strong>↓</strong>
            </div>

            <figure className="search-comparison-panel">
              <figcaption className="search-comparison-caption">
                <div>
                  <span>After · Shipped</span>
                  <strong>One ranked result experience</strong>
                </div>
                <p>Filters preserve context while labels make mixed results easier to recognize.</p>
              </figcaption>
              <div className="search-comparison-media">
                <img
                  src={`${assetRoot}/compare-after.webp`}
                  alt="The shipped IBM.com search experience showing one ranked result list with single-select filters and visible content labels"
                  width={2320}
                  height={1140}
                  loading="eager"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="summary-band" id="story" data-anna-prompt="What job was search really doing?">
          <div className="shell search-summary">
            <div>
              <p className="eyebrow">Executive summary</p>
              <h2>Search was doing more work than the interface admitted.</h2>
            </div>
            <div className="summary-copy">
              <p>
                People use search when the site has not yet given them a clear way forward. On IBM.com, that often means navigating products, documentation, support, learning, and technical content at the same time.
              </p>
              <p>
                The existing experience exposed those organizational boundaries directly. I led the move from six competing tab experiences to one ranked result set, then designed the filters, labels, recovery paths, and connections that made it usable.
              </p>
            </div>
          </div>
        </section>

        <section className="chapter shell" id="role" data-anna-prompt="Why were there six searches?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>01 · The starting point</SectionNumber>
              <h2>One query became six different searches.</h2>
            </div>
            <div>
              <p className="lead">
                The old result page asked people to choose between All, Products &amp; services, Downloads, Learning, Support &amp; documentation, and For developers before they could understand where IBM had classified the answer.
              </p>
              <p>
                Each tab carried its own result behavior, filters, counts, and dead ends. The interface made the company’s content model visible at exactly the moment a person needed clarity.
              </p>
            </div>
          </div>

        </section>

        <section className="search-evidence-band" data-anna-prompt="What did research change?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>02 · From audit to evidence</SectionNumber>
                <h2>Three observations determined the redesign.</h2>
              </div>
              <div>
                <p className="lead">
                  Beginning in May 2025, I audited result types and found the gaps in hierarchy, labeling and filter clarity. The user research was run by Sally, our researcher, and my job was to turn what she found into changes a team could actually build: what people did with mixed results, how they scanned them, and where they gave up.
                </p>
                <p>
                  Then I tested my own screens. Synthesis is a guess until somebody who has never seen the page tries to use it, so the revised layout went into a round of moderated sessions before any of it scaled.
                </p>
              </div>
            </div>

            <div className="search-evidence-method" aria-label="Research method">
              <span>Evidence path</span>
              <ol>
                <li><small>01</small><strong>Audit current behavior</strong></li>
                <li><small>02</small><strong>Trace recurring journeys</strong></li>
                <li><small>03</small><strong>Test interpretation and recovery</strong></li>
                <li><small>04</small><strong>Connect findings to decisions</strong></li>
              </ol>
            </div>

            <div className="search-findings">
              {findings.map((finding) => (
                <article key={finding.number}>
                  <span>{finding.number}</span>
                  <h3>{finding.title}</h3>
                  <div>
                    <p>{finding.body}</p>
                    <strong className="search-finding-response">{finding.response}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="Which decisions mattered most?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>03 · The design response</SectionNumber>
              <h2>Three decisions turned a result list into a way forward.</h2>
            </div>
            <div>
              <p className="lead">
                Each decision answers one of the research observations above. Together they remove organizational logic customers were being asked to carry and replace it with a coherent finding, scanning, and recovery model.
              </p>
            </div>
          </div>

          <div className="search-decisions">
            {decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>

          <section className="search-filter-decision" aria-labelledby="filter-decision-title">
            <div className="search-filter-decision-heading">
              <p className="eyebrow">A decision before a design</p>
              <h3 id="filter-decision-title">Filter behavior determined the system underneath the screen.</h3>
              <p>
                Prototyping paused while the team resolved whether filters should allow one selection or several. The visible control was simple; the underlying questions about cross-category ranking, ecosystem consistency, and MVP feasibility were not.
              </p>
            </div>
            <div className="search-filter-options">
              <article>
                <span>Option A · Explored</span>
                <h3>Multi-select</h3>
                <div className="search-filter-model search-filter-model-multi" aria-hidden="true">
                  <div className="search-filter-model-rail">
                    <b>Filter results</b>
                    <div className="search-filter-model-choice is-selected"><i>✓</i><span>Products</span><small>82</small></div>
                    <div className="search-filter-model-choice is-selected"><i>✓</i><span>Documentation</span><small>46</small></div>
                    <div className="search-filter-model-choice"><i /><span>Training</span><small>21</small></div>
                    <div className="search-filter-model-choice"><i /><span>Support</span><small>18</small></div>
                  </div>
                  <div className="search-filter-model-results">
                    <div><em>Product</em><b /><b /></div>
                    <div><em>Documentation</em><b /><b /></div>
                    <div><em>Product</em><b /><b /></div>
                  </div>
                </div>
                <p>More flexible and consistent with finder behavior, but it required a credible way to rank content selected from several categories.</p>
              </article>
              <article>
                <span>Option B · Shipped</span>
                <h3>Single-select</h3>
                <div className="search-filter-model search-filter-model-single" aria-hidden="true">
                  <div className="search-filter-model-rail">
                    <b>Search by</b>
                    <div className="search-filter-model-choice"><span>All</span><small>10k+</small></div>
                    <div className="search-filter-model-choice is-selected"><span>Products</span><small>82</small></div>
                    <div className="search-filter-model-choice"><span>Documentation</span><small>46</small></div>
                    <div className="search-filter-model-choice"><span>Training</span><small>21</small></div>
                  </div>
                  <div className="search-filter-model-results">
                    <div><em>Product</em><b /><b /></div>
                    <div><em>Product</em><b /><b /></div>
                    <div><em>Product</em><b /><b /></div>
                  </div>
                </div>
                <p>Credible to rank and feasible for the MVP, but intentionally less flexible than the behavior people encountered in specialized finders.</p>
              </article>
            </div>
            <div className="search-filter-evidence">
              <div><span>Ranking integrity</span><p>Several selected categories would require a credible way to compare unlike content in one order.</p></div>
              <div><span>Ecosystem consistency</span><p>Specialized finders used more flexible filtering, so a simpler global behavior created a known tension.</p></div>
              <div><span>MVP feasibility</span><p>Single-select preserved one result journey without implying ranking support the system did not yet have.</p></div>
            </div>
          </section>

          <div className="search-filter-outcome">
            <span>Decision takeaway</span>
            <p>
              Single-select did not resolve every cross-IBM consistency question. It did remove six result silos without pretending the ranking model could credibly combine several selected categories at once.
            </p>
          </div>

        </section>

        <section className="search-recovery-section" data-anna-prompt="What about zero results?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>04 · Completing the shipped system</SectionNumber>
                <h2>Zero results had to become a recovery state, not a verdict.</h2>
              </div>
              <div>
                <p className="lead">
                  One of the clearest tests of the shipped model was what happened when it had no result to show. The old page apologized, offered generic search tips, and scattered possible next steps across unrelated cards.
                </p>
                <p>
                  The redesign treated no results as part of the search journey: preserve the query, offer relevant ways to broaden or revise it, and reveal a specialized destination when it can do a better job.
                </p>
              </div>
            </div>

            <div className="search-recovery-grid">
              <figure>
                <div className="search-recovery-label">Before</div>
                <div className="search-recovery-image">
                  <img
                    src={`${assetRoot}/before-no-results.png`}
                    alt="Old IBM.com no-results page for watsonx.ai with a Check all results button, generic search tips, popular searches, and separate support and product cards"
                    loading="lazy"
                  />
                </div>
                <figcaption>Several competing recovery ideas, none clearly connected to the failed query.</figcaption>
              </figure>
              <figure>
                <div className="search-recovery-label">Shipped · desktop</div>
                <div className="search-recovery-image search-recovery-image-desktop">
                  <img
                    src={`${assetRoot}/no-results-desktop.png`}
                    alt="The shipped desktop IBM.com no-results experience preserving the query and offering Product Finder, Learning Hub, and Documentation as next steps"
                    loading="lazy"
                  />
                </div>
                <figcaption>The failed query stays visible while three purpose-built destinations offer a clear next move.</figcaption>
              </figure>
            </div>

            <figure className="search-recovery-mobile">
              <figcaption>
                <span>Shipped · mobile</span>
                <h3>The recovery model survives the smaller screen.</h3>
                <p>The query remains editable, guidance becomes more direct, and the same destinations stack into a clear vertical path.</p>
              </figcaption>
              <div className="search-recovery-mobile-image">
                <img
                  src={`${assetRoot}/no-results-mobile.png`}
                  alt="The shipped mobile IBM.com no-results experience with query guidance, a return to all results, and stacked Product Finder, Learning Hub, and Documentation cards"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        <ExAside>{"When it has nothing to offer, it suggests a next step instead of apologizing. Take notes."}</ExAside>

        </section>

        <section className="search-launch-band" data-anna-prompt="What did production reveal?">
          <div className="shell">
            <SectionNumber>05 · Launch</SectionNumber>
            <div className="search-launch-heading">
              <h2>The MVP launched. Production showed what came next.</h2>
              <p className="lead">
                After a dark launch at a dedicated v3 URL, the new result experience began moving to US-English traffic—and revealed the quality gaps only real use could expose.{" "}
                <a
                  className="search-launch-live"
                  href="https://www.ibm.com/search"
                  target="_blank"
                  rel="noreferrer"
                >
                  Use it on IBM.com
                </a>
              </p>
            </div>

            <div className="search-launch-summary">
              <article>
                <span>Shipped</span>
                <h3>One result journey</h3>
                <p>Unified results, single-select filters, recognizable content types, continuous results, and recovery paths.</p>
              </article>
              <article>
                <span>Production exposed</span>
                <h3>The signals still needed work</h3>
                <p>Promoted results needed accurate labels, query terms needed consistent emphasis, and the experience still needed globalization.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="chapter shell search-tested-next" data-anna-prompt="Why test typeahead separately?">
          <div className="chapter-intro two-column-copy">
            <div>
              <div className="search-concept-kicker">
                <SectionNumber>06 · Tested in parallel</SectionNumber>
              </div>
              <h2>Three levels of help before the query is finished.</h2>
            </div>
            <div>
              <p className="lead">
                Separate from the launched SERP, we tested three levels of typeahead support: simple completion, guided tasks, and a richer discovery surface. The question was whether search could help people form useful intent before they reached a result page.
              </p>
              <p>
                The durable principle was simpler: when intent is obvious, correct a misspelling and return the right results without making the customer manage the mistake.
              </p>
            </div>
          </div>

          <div className="search-typeahead-gallery" aria-label="Three typeahead concepts tested for IBM Global Search">
            <figure className="search-typeahead-variant">
              <figcaption>
                <span>01 · Simple</span>
                <h3>Suggested searches</h3>
                <p>Stay close to conventional autocomplete: complete the query and offer a small set of likely searches.</p>
              </figcaption>
              <div className="search-typeahead-variant-image">
                <img
                  src={`${assetRoot}/typeahead-simple.jpg`}
                  alt="Simple IBM Global Search typeahead concept showing three suggested searches for SPSS"
                  width={1800}
                  height={1280}
                  loading="lazy"
                />
              </div>
            </figure>

            <figure className="search-typeahead-variant">
              <figcaption>
                <span>02 · Guided</span>
                <h3>Suggestions plus example tasks</h3>
                <p>Add goal-shaped prompts that show customers the kinds of questions search can help them answer.</p>
              </figcaption>
              <div className="search-typeahead-variant-image">
                <img
                  src={`${assetRoot}/typeahead-guided.jpg`}
                  alt="Guided IBM Global Search typeahead concept showing suggested searches and example SPSS tasks"
                  width={1800}
                  height={1280}
                  loading="lazy"
                />
              </div>
            </figure>

            <figure className="search-typeahead-variant">
              <figcaption>
                <span>03 · Rich</span>
                <h3>A discovery surface</h3>
                <p>Combine suggestions with task links, example queries, products, and popular searches when the query signals a broader need.</p>
              </figcaption>
              <div className="search-typeahead-variant-image">
                <img
                  src={`${assetRoot}/typeahead-rich.jpg`}
                  alt="Rich IBM Global Search typeahead concept showing suggested searches, task links, example queries, products, and popular searches for SPSS"
                  width={1800}
                  height={1280}
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="search-future-section" data-anna-prompt="How do you test AI?">
          <div className="shell">
            <div className="search-future-kicker">
              <SectionNumber>07 · Testing the next layer</SectionNumber>
              <span>Product Finder test in design</span>
            </div>
            <div className="search-future-heading">
              <h2>AI belongs in Global Search only when its results deserve the reach.</h2>
              <div>
                <p className="lead">
                  AI quality is not yet consistent enough for a surface as broad as Global Search. Instead, I am designing a narrower Product Finder test, where focused product intent gives us a credible place to evaluate relevance, explanation, and customer control.
                </p>
              </div>
            </div>

            <div className="search-ai-shift" aria-label="From the live Global Search foundation to a focused AI test">
              <div>
                <span>Global Search · Live</span>
                <strong>Find and filter results</strong>
                <p>One ranked result set helps people navigate IBM’s broad content ecosystem.</p>
              </div>
              <div className="search-ai-shift-arrow" aria-hidden="true">→</div>
              <div>
                <span>Product Finder · Test in design</span>
                <strong>Evaluate AI results in context</strong>
                <p>A narrower product task lets us test relevance, explanation, and control before considering broader reach.</p>
              </div>
            </div>

            <p className="future-note search-future-note">
              The quality gate is deliberate: AI earns broader reach only if customers receive more relevant products, can understand why they were recommended, and can still refine or recover without being forced into a conversation.
            </p>
          </div>
        </section>

        <section className="reflection shell" data-anna-prompt="What would you do differently?">
          <SectionNumber>08 · Reflection</SectionNumber>
          <div className="reflection-grid">
            <h2>The interface was visible. Ranking and quality were the real design material.</h2>
            <div>
              <p className="lead">
                The filter decision taught me to resolve the behavior underneath an interaction before polishing the interaction itself. The current AI work is reinforcing the same lesson: reach should follow quality, not precede it.
              </p>
              <p>
                A result page is not merely a list. It is where a company reveals how it understands its own information and whether it can help someone make sense of it.
              </p>
            </div>
          </div>
        </section>

        <section className="next-case search-back-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2>Designing the visual language for State Street Alpha</h2>
            </div>
            <a className="next-case-status" href="/state-street">Read the State Street story</a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
