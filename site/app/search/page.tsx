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
            A search results page looks small until it has to make an ecosystem as complex as IBM understandable. I led the redesign of the result system connecting products, documentation, training, support, and technical content.
          </p>

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
                The existing experience exposed those organizational boundaries directly. I led the move from six competing tab experiences to one ranked result set, then designed the filters, labels, recovery paths, and connections that made it usable.
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
                <span>Option A · Explored</span>
                <h3>Multi-select</h3>
                <p>More flexible and consistent with finder behavior, but it required a credible way to rank content selected from several categories.</p>
              </article>
              <article>
                <span>Option B · Shipped</span>
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
              Single-select shipped in the US-English MVP. Customers can narrow one ranked result set by content type without returning to the old model of six separate searches. The broader journey work continued to inform masthead and typeahead exploration in parallel.
            </p>
          </section>

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
              <h2>Three levels of help before the query is finished.</h2>
            </div>
            <div>
              <p className="lead">
                We also prototyped and tested a three-tier typeahead model, moving from simple query completion to richer suggestions and guided destinations. The question was larger than autocomplete: could search help people form a useful intent before they reached a results page?
              </p>
              {/* SILENT AUTOCORRECTION. Documented in facts.md and claimed on
                  the homepage card for months while this page never named it,
                  which made the card read as an invention rather than as a
                  principle. It is the sharpest judgment call in the section, so
                  it gets its own paragraph rather than a slot in the grid
                  below, which is a fixed three columns. */}
              <p>
                One design principle came out of that work that I would carry into any search I worked on again. When someone misspells a query and the intent is obvious, correct it and return the right results without announcing the mistake. Silent autocorrection, because nobody needs to be told they cannot spell.
              </p>
              <p>
                This work remains a tested direction, separate from the launched SERP. It belongs here because it shows how the project extended from fixing a result page to reconsidering the role of search across IBM.com.
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

        <section className="search-launch-band" data-anna-prompt="What's actually live">
          <div className="shell">
            <SectionNumber>06 · Launch</SectionNumber>
            <div className="search-launch-heading">
              <h2>The redesign is live. Search is not finished.</h2>
              <p className="lead">
                After a dark launch at a dedicated v3 URL, US-English traffic began moving to the new experience. Shipping made the design real, and it exposed the edge cases a prototype could not.{" "}
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

            <figure className="search-launch-figure">
              <div className="search-launch-image">
                <img
                  src={`${assetRoot}/launched-results.webp`}
                  alt="The launched IBM.com search experience for watsonx, showing a single ranked result set with single-select content filters and visible product labels"
                  width={2320}
                  height={1344}
                  loading="lazy"
                />
              </div>
              <figcaption>
                The shipped IBM.com experience: one ranked result set, single-select content filtering, visible content labels, and a clearer hierarchy for scanning.
              </figcaption>
            </figure>

            <div className="search-scope-table">
              <div>
                <span>Live in the US-English MVP</span>
                <p>Unified result journey</p>
                <p>Single-select content filters replacing tabs</p>
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

        <section className="search-future-section" data-anna-prompt="Testing AI before scaling it">
          <div className="shell">
            <div className="search-future-kicker">
              <SectionNumber>07 · Testing the next layer</SectionNumber>
              <span>Product Finder test in design</span>
            </div>
            <div className="search-future-heading">
              <h2>AI belongs in Global Search only when its results deserve the reach.</h2>
              <div>
                <p className="lead">
                  The live SERP gives people a clearer way to navigate IBM content without asking them to trust an unexplained answer. AI search quality is not yet consistent enough for a surface as broad as Global Search, so we are not integrating it there yet.
                </p>
                <p>
                  Instead, I am designing a narrower test on the Product Finder page. Product intent is more focused there, giving us a credible place to learn whether AI results can help customers identify relevant products without removing the cards, filters, and direct paths they already understand.
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

            <div className="search-ai-model">
              <div className="search-ai-prompt">
                <span>Example product need</span>
                <p>I need security tools for monitoring a hybrid cloud environment.</p>
              </div>
              <div className="search-ai-steps">
                <article>
                  <span>01</span>
                  <div><h3>Accept natural language</h3><p>Let customers describe a use case without translating it into catalog terminology first.</p></div>
                </article>
                <article>
                  <span>02</span>
                  <div><h3>Recommend in the page</h3><p>Present relevant products as structured results, not as a detached chat transcript.</p></div>
                </article>
                <article>
                  <span>03</span>
                  <div><h3>Explain the match</h3><p>Make AI involvement visible and help customers understand why each result appeared.</p></div>
                </article>
                <article>
                  <span>04</span>
                  <div><h3>Preserve customer control</h3><p>Keep filters, product cards, direct links, and a clear route back to standard discovery.</p></div>
                </article>
              </div>
            </div>

            <div className="search-ai-guardrails">
              <div><span>Relevance</span><p>Do AI results help customers reach genuinely useful products faster?</p></div>
              <div><span>Transparency</span><p>Can customers see what the system understood and why it made each recommendation?</p></div>
              <div><span>Control</span><p>Can people refine, browse, and recover without being forced into conversation?</p></div>
              <div><span>Quality gate</span><p>What evidence would justify giving AI the broader reach of Global Search?</p></div>
            </div>

            <p className="future-note search-future-note">
              AI in Global Search is a conditional future direction, not a committed launch state. The Product Finder test is designed to establish whether the quality is strong enough to earn that reach.
            </p>
          </div>
        </section>

        <section className="reflection shell" data-anna-prompt="What I'd do differently">
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
