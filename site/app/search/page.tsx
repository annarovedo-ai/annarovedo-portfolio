import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";

export const metadata: Metadata = {
  title: "Redesigning search across IBM.com · Anna Rovedo",
  description:
    "How Anna Rovedo led the UX from audit and research through interaction design, testing, and launch for IBM.com search.",
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
  },
  {
    number: "02",
    title: "Results were difficult to scan",
    body: "Dense lists offered too few signals about what each result was, which made comparing products, documentation, learning, and support content unnecessarily slow.",
  },
  {
    number: "03",
    title: "No results ended the journey",
    body: "The page explained that nothing was found, but gave people weak recovery paths and little help deciding what to try next.",
  },
  {
    number: "04",
    title: "Specialized search paths were hidden",
    body: "Product, support, and learning experiences existed, but the general search page did not make those destinations easy to discover at the right moment.",
  },
];

const decisions = [
  {
    title: "Replace tabs with filters",
    body: "Keep one coherent result set, then let people narrow it without losing context or wondering whether another tab contains the answer.",
  },
  {
    title: "Label content types",
    body: "Make product pages, documentation, learning, support, and editorial content recognizable before a user commits to a click.",
  },
  {
    title: "Continue instead of paginate",
    body: "Use a continuous See more pattern so the result journey does not reset at every page boundary.",
  },
  {
    title: "Design recovery paths",
    body: "Treat zero results as a moment to reformulate, broaden, or move into a more specialized IBM experience.",
  },
  {
    title: "Connect specialized search",
    body: "Create clearer pathways to tools such as Product Finder when a general list is not the most useful answer.",
  },
];

export default function SearchCaseStudy() {
  return (
    <main className="search-case">
      <SiteHeader />
      <Breadcrumb label="IBM Global Search" meta="Live and evolving" />

      <article id="top">
        <section className="hero shell search-hero">
          <h1>Redesigning search across IBM.com.</h1>
          <p className="hero-deck">
            A search results page looks small until it has to make an ecosystem as complex as IBM understandable. I led the UX from audit and research through interaction design, testing, and launch.
          </p>

          <div className="hero-meta search-hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>Lead UX designer</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>Audit, research, interaction design, prototyping</strong>
            </div>
            <div>
              <span>Launch</span>
              <strong>US-English MVP live, with continued iteration</strong>
            </div>
          </div>

          <div className="search-hero-model" aria-label="The search redesign moved from a fragmented tab model to one coherent result experience">
            <div className="search-model-before">
              <span className="search-model-label">Before</span>
              <p className="search-model-query">data</p>
              <div className="search-model-tabs" aria-hidden="true">
                <span>All</span>
                <span>Products</span>
                <span>Downloads</span>
                <span>Learning</span>
                <span>Support</span>
                <span>Developers</span>
              </div>
              <p>Six destinations competing to answer one question.</p>
            </div>
            <div className="search-model-arrow" aria-hidden="true">→</div>
            <div className="search-model-after">
              <span className="search-model-label">Launched direction</span>
              <p className="search-model-query">data</p>
              <div className="search-model-result">
                <span>Product</span>
                <strong>One result set</strong>
                <small>Filter without losing context</small>
              </div>
              <div className="search-model-result">
                <span>Documentation</span>
                <strong>Clearer content signals</strong>
                <small>Recognize the answer before clicking</small>
              </div>
            </div>
          </div>
        </section>

        <section className="summary-band" id="story" data-anna-prompt="What search was really doing">
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
                The existing experience exposed those organizational boundaries directly. The redesign created one clearer result journey, then used filters, labels, recovery paths, and specialized destinations to help people move through it.
              </p>
            </div>
          </div>
          <div className="shell search-job-grid" aria-label="Three jobs of the search experience">
            <div><span>01</span><strong>Findability</strong><p>Reach known content faster.</p></div>
            <div><span>02</span><strong>Discoverability</strong><p>Recognize relevant content along the way.</p></div>
            <div><span>03</span><strong>Recovery</strong><p>Keep moving when the first query fails.</p></div>
          </div>
        </section>

        <section className="chapter shell" id="role" data-anna-prompt="One query, six searches">
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

          <figure className="search-inspect-figure">
            <div className="search-inspect-heading">
              <div>
                <span>Captured before state</span>
                <strong>The full result page for a single query</strong>
              </div>
              <p>Scroll inside the frame to inspect the original experience.</p>
            </div>
            <div className="search-scroll-shot" tabIndex={0} aria-label="Scrollable capture of the old IBM.com search results page">
              <img
                src={`${assetRoot}/before-all-results.png`}
                alt="Full capture of the old IBM.com search results page for the query data, showing tabs, a long result list, pagination, and the IBM footer"
              />
            </div>
            <figcaption>The captured page shows how much structure a user had to parse before deciding whether any result was useful.</figcaption>
          </figure>
        </section>

        <section className="search-evidence-band" data-anna-prompt="What research changed">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>02 · From audit to evidence</SectionNumber>
                <h2>The audit gave us hypotheses. Research told us which ones mattered.</h2>
              </div>
              <div>
                <p className="lead">
                  The work began in May 2025 with an audit of result quality, user journeys, and friction. That review exposed questions analytics alone could not answer, so the next step was research focused on how people interpreted the page and where they became stuck.
                </p>
              </div>
            </div>

            <div className="search-evidence-chain" aria-label="Evidence process">
              <div><span>01</span><strong>Audit the system</strong><p>Map the tabs, filters, result patterns, and recovery states.</p></div>
              <div><span>02</span><strong>Follow the friction</strong><p>Turn observed inconsistencies into research questions.</p></div>
              <div><span>03</span><strong>Test the mental model</strong><p>Watch how people searched, scanned, narrowed, and recovered.</p></div>
              <div><span>04</span><strong>Design from evidence</strong><p>Connect each interaction change to a specific user problem.</p></div>
            </div>

            <div className="search-findings">
              {findings.map((finding) => (
                <article key={finding.number}>
                  <span>{finding.number}</span>
                  <h3>{finding.title}</h3>
                  <p>{finding.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="The five that mattered">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>03 · The design response</SectionNumber>
              <h2>Five changes turned a result list into a way forward.</h2>
            </div>
            <div>
              <p className="lead">
                The goal was not to decorate the old page. It was to remove the organizational logic users were being asked to carry and replace it with decisions that supported finding, discovering, and recovering.
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
                Prototyping paused while the team resolved whether filters should allow one selection or several. That choice affected ranking, consistency with IBM’s finder experiences, and the journey a user would have after narrowing the result set.
              </p>
            </div>
            <div className="search-filter-options">
              <article>
                <span>Option A</span>
                <h3>Multi-select</h3>
                <p>More flexible and consistent with finder behavior, but it required a credible way to rank content selected from several categories.</p>
              </article>
              <article>
                <span>Option B</span>
                <h3>Single-select</h3>
                <p>Faster to implement and simpler to rank, but potentially inconsistent with the behavior people encountered in specialized finders.</p>
              </article>
            </div>
            <div className="search-filter-evidence">
              <div><span>Information architecture</span><p>Document current journeys from entry point to query to destination, using the 50 most recurrent queries.</p></div>
              <div><span>User research</span><p>Define the ideal state for target audiences through the needs and expectations of different personas.</p></div>
              <div><span>UX</span><p>Resume prototyping once the behavioral decision was clear enough to design and evaluate.</p></div>
            </div>
            <p className="search-filter-outcome">
              Once the filter definition was resolved, SERP prototyping moved forward. Journey work remained useful for the masthead and typeahead exploration, which continued in parallel.
            </p>
          </section>

          <div className="search-anatomy" role="img" aria-label="Diagram of one search result journey with filters, content labels, and continuous results">
            <div className="search-anatomy-title">
              <p className="eyebrow">Launch anatomy</p>
              <h3>One result journey, with stronger signals at the right moments.</h3>
            </div>
            <div className="search-anatomy-ui" aria-hidden="true">
              <div className="search-anatomy-query">Search all of IBM <strong>data</strong></div>
              <div className="search-anatomy-body">
                <aside>
                  <span>Filter results</span>
                  <b>Products</b>
                  <b>Documentation</b>
                  <b>Learning</b>
                  <b>Support</b>
                </aside>
                <div>
                  <article><span>Product</span><strong>IBM data platform</strong><p>A clear content type and a scannable result description.</p></article>
                  <article><span>Documentation</span><strong>Work with enterprise data</strong><p>The same result set can contain several useful forms of content.</p></article>
                  <span className="search-anatomy-button">See more results</span>
                </div>
              </div>
            </div>
            <p className="search-diagram-note">This simplified diagram isolates the interaction model from the final visual design.</p>
          </div>
        </section>

        <section className="search-recovery-section" data-anna-prompt="Fixing zero results">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>04 · Recovery</SectionNumber>
                <h2>Zero results had to become a recovery state, not a verdict.</h2>
              </div>
              <div>
                <p className="lead">
                  The old page apologized, offered generic search tips, and scattered possible next steps across unrelated cards. It acknowledged failure without helping people diagnose it.
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
              <div className="search-recovery-model">
                <span className="search-recovery-label">Recovery model</span>
                <p className="search-recovery-query">watsonx.ai</p>
                <h3>No matching results. Here are useful ways forward.</h3>
                <div><span>01</span><p><strong>Broaden the scope</strong>Search all IBM content without losing the query.</p></div>
                <div><span>02</span><p><strong>Revise the language</strong>Edit spelling, phrasing, or specificity in place.</p></div>
                <div><span>03</span><p><strong>Choose a specialist</strong>Move to Product Finder, Support, or another purpose-built experience.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="chapter shell search-tested-next" data-anna-prompt="What got tested next">
          <div className="chapter-intro two-column-copy">
            <div>
              <div className="search-concept-kicker">
                <SectionNumber>05 · Tested next</SectionNumber>
                <span>Concept, not launched</span>
              </div>
              <h2>Help before the query is finished.</h2>
            </div>
            <div>
              <p className="lead">
                We also prototyped and tested three typeahead directions. The question was larger than autocomplete: could the search box help people form a useful intent, reach a specialty experience, or act before they reached a results page?
              </p>
              {/* SILENT AUTOCORRECTION. Documented in facts.md and claimed on
                  the homepage card for months while this page never named it,
                  which made the card read as an invention rather than as a
                  principle. It is the sharpest judgment call in the section, so
                  it gets its own paragraph rather than a slot in the grid
                  below, which is a fixed three columns. */}
              <p>
                One principle came out of it that I would carry into any search I worked on again. When someone misspells a query and the intent is obvious, correct it and return the right results without announcing the mistake. Silent autocorrection, because nobody needs to be told they cannot spell.
              </p>
              <p>
                This work remains a tested direction, separate from the launched SERP. It belongs here because it shows how the project extended from fixing a result page to reconsidering the role of search across IBM.com.
              </p>
            </div>
          </div>

          <figure className="search-typeahead-figure">
            <div className="search-typeahead-image">
              <img
                src={`${assetRoot}/tested-typeahead.png`}
                alt="IBM presentation exploring typeahead suggestions and promotional space in the global search experience"
                loading="lazy"
              />
            </div>
            <figcaption>One of the tested directions explored suggestions and guided destinations inside global search.</figcaption>
          </figure>

          <div className="search-typeahead-principles">
            <div><span>Query suggestions</span><p>Help people complete or reformulate language without taking over the decision.</p></div>
            <div><span>Guided actions</span><p>Offer a useful next step when the intent is clearer than the exact destination.</p></div>
            <div><span>Specialized destinations</span><p>Route product, support, and learning needs into experiences designed for them.</p></div>
          </div>
        </section>

        <section className="search-launch-band" data-anna-prompt="What's actually live">
          <div className="shell">
            <SectionNumber>06 · Launch</SectionNumber>
            <div className="search-launch-heading">
              <h2>The redesign is live. Search is not finished.</h2>
              <p className="lead">
                The team dark-launched the MVP at a dedicated v3 URL, then began redirecting US-English traffic to the new experience. The release simplified navigation, introduced filtering and clearer result signals, replaced pagination with continuous results, improved no-results recovery, and created better paths to specialized search experiences. Global rollout was planned as the next deployment phase.{" "}
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

            {/* THE LAUNCHED-RESULTS FIGURE IS PARKED, NOT DEAD.
                It pointed at launched-results.png, which was never saved to
                disk; the screenshot exists only in a chat. A broken frame on
                the launch band is worse than no figure. When Anna saves the
                capture (ibm.com/search results for "watsonx", the Search-by
                rail with content-type labels) to her Desktop, process it to
                public/case-study/search/launched-results.webp at 2320 wide
                and restore the figure that lived here (see git history,
                commit "Show the launched search, and link to it"). Until
                then the live link survives below in the lead. */}

            <div className="search-scope-table">
              <div>
                <span>Live in the US-English MVP</span>
                <p>Unified result journey</p>
                <p>Filters replacing tabs</p>
                <p>Content-type labels in the primary result experience</p>
                <p>Continuous See more results</p>
                <p>No-results recovery</p>
                <p>Specialized search pathways</p>
              </div>
              <div>
                <span>Post-launch iteration</span>
                <p>Correct labeling for promoted Suggested Matches</p>
                <p>Consistent query-term emphasis in titles, URLs, and descriptions</p>
                <p>Clearer relevance signals when a promoted result leads the list</p>
                <p>Globalization beyond US English</p>
              </div>
            </div>
            <div className="search-launch-reality">
              <div>
                <span>What the launch exposed</span>
                <h3>Production revealed the edge cases the prototype could not.</h3>
              </div>
              <div>
                <p>
                  Suggested Matches, promoted results managed through IBM’s Kepler tool, could surface a non-product URL inside the Products filter without the expected label. Query terms were also not consistently emphasized across the title, URL, or description.
                </p>
                <p>
                  These issues did not block deployment, but they mattered because they affected the exact signals people use to understand why a result is present. They became concrete iteration work rather than being erased from the story after launch.
                </p>
              </div>
            </div>
            <p className="search-collaboration-note">
              The launch brought together Design, Research, Information Architecture, Unified Search, PMO, engineering, content strategy, accessibility, and testing across IBM.com.
            </p>
          </div>
        </section>

        <section className="search-future-section" data-anna-prompt="Search with AI in it">
          <div className="shell">
            <div className="search-future-kicker">
              <SectionNumber>07 · Future state</SectionNumber>
              <span>In exploration, not live</span>
            </div>
            <div className="search-future-heading">
              <h2>What happens when search can help interpret the question?</h2>
              <div>
                <p className="lead">
                  The live SERP improves how people navigate results. The future state asks a different question: where can AI reduce the work of forming the query, evaluating the evidence, and deciding what to do next?
                </p>
                <p>
                  The goal is not to replace search results with an unexplained answer. It is to add an intelligent layer that can clarify intent, synthesize grounded information, and preserve direct access to the sources and specialist experiences underneath it.
                </p>
              </div>
            </div>

            <div className="search-ai-shift" aria-label="Future search model">
              <div>
                <span>Live foundation</span>
                <strong>Find and filter results</strong>
                <p>A clearer interface helps people navigate IBM’s content ecosystem.</p>
              </div>
              <div className="search-ai-shift-arrow" aria-hidden="true">→</div>
              <div>
                <span>AI-integrated future</span>
                <strong>Understand, answer, and act</strong>
                <p>An intelligent layer helps interpret intent while keeping evidence and user control visible.</p>
              </div>
            </div>

            <div className="search-ai-model">
              <div className="search-ai-prompt">
                <span>Natural-language search</span>
                <p>I need to secure employee devices across several countries. Where should I start?</p>
              </div>
              <div className="search-ai-steps">
                <article>
                  <span>01</span>
                  <div><h3>Clarify the intent</h3><p>Ask only for the missing context that would materially change the answer.</p></div>
                </article>
                <article>
                  <span>02</span>
                  <div><h3>Ground the response</h3><p>Synthesize from trusted IBM content and make every source available for inspection.</p></div>
                </article>
                <article>
                  <span>03</span>
                  <div><h3>Keep the result set</h3><p>Let people move between an AI-supported answer and the underlying products, documentation, and support content.</p></div>
                </article>
                <article>
                  <span>04</span>
                  <div><h3>Offer the next useful action</h3><p>Compare products, refine the query, open Product Finder, or continue into a specialist experience.</p></div>
                </article>
              </div>
            </div>

            <div className="search-ai-guardrails">
              <div><span>Evidence</span><p>Answers show where the information came from.</p></div>
              <div><span>Control</span><p>Users can edit intent, inspect sources, or return to standard results.</p></div>
              <div><span>Boundaries</span><p>The system is explicit about uncertainty and hands off when a specialist is more useful.</p></div>
              <div><span>Continuity</span><p>The query and context can carry into product, support, or learning journeys.</p></div>
            </div>

            <p className="future-note search-future-note">
              This chapter describes the next design direction and the questions still being worked through. It is intentionally separate from the live SERP release.
            </p>
          </div>
        </section>

        <section className="reflection shell" data-anna-prompt="What I'd do differently">
          <SectionNumber>08 · Reflection</SectionNumber>
          <div className="reflection-grid">
            <h2>The simplest experiences often have the longest stories behind them.</h2>
            <div>
              <p className="lead">
                The project did not begin with a redesign. It began with an audit, followed the questions that evidence could not answer, and gradually changed the model underneath the interface.
              </p>
              <p>
                That is the part of search design I find most compelling. A result page is not merely a list. It is where a company reveals how it understands its own information and whether it can help someone make sense of it.
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
