import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";

export const metadata: Metadata = {
  title: "Designing the visual language for State Street Alpha · Anna Rovedo",
  description:
    "How Anna Rovedo created the visual language, color architecture, and component system for State Street Alpha, a financial operating system for institutional investing.",
};

const assetRoot = "/case-study/state-street";

const componentGroups = [
  {
    number: "01",
    name: "Foundations",
    detail: "Grid, spacing, typography, and an accessible color and data-visualization palette",
    demoSrc: "system-semantic-colors.png",
    demoAlt: "Crop of the semantic color palette from the working UI kit",
  },
  {
    number: "02",
    name: "Atoms",
    detail: "Buttons, labels, inputs, tooltips, cursors, and progress indicators",
    demoSrc: "system-buttons.png",
    demoAlt: "Crop of the button system from the working UI kit",
  },
  {
    number: "03",
    name: "Molecules",
    detail: "Fields, dropdowns, list groups, tabs, pagination, and snackbars",
    demoSrc: "system-pagination.png",
    demoAlt: "Crop of the pagination component from the working UI kit",
  },
  {
    number: "04",
    name: "Organisms",
    detail: "Tables, cards, alerts, navigation, modals, accordions, and popovers",
    demoSrc: "system-cards.png",
    demoAlt: "Crop of the card organisms from the working UI kit",
  },
  {
    number: "05",
    name: "Product templates",
    detail: "Complete financial workflows assembled from the same rules",
    demoSrc: "product-template.png",
    demoAlt: "Crop of the full portfolio-analysis template built from the component system",
  },
];

const componentIndex = [
  "Buttons",
  "Forms",
  "Labels",
  "Snackbars",
  "Cards",
  "Dropdowns",
  "List groups",
  "Input groups",
  "Tooltips",
  "Cursors",
  "Tables",
  "Alerts",
  "Tabs",
  "Media objects",
  "Progress bars",
  "Spinners",
  "Navigation",
  "Modals",
  "Pagination",
  "Popovers",
  "Accordions",
  "Toasts",
];

const productDecisions = [
  {
    title: "Design for scanning",
    body: "Right-aligned values, row striping, and persistent column structure made dense financial tables easier to compare horizontally.",
  },
  {
    title: "Preserve working context",
    body: "Pagination replaced infinite scroll so users could orient themselves in large datasets and return to a known position.",
  },
  {
    title: "Let meaning control color",
    body: "Semantic states, chart series, and brand accents each received distinct roles across light and dark environments.",
  },
];

const changeLog = [
  ["Controls", "Two save buttons did the same thing from two places. Save and close moved to one location, at the bottom of the flyout."],
  ["Iconography", "A refresh icon meant “run” in one context and “delete” in another. It became a plain “Apply” button instead."],
  ["Color", "Brand green was read as a sequential scale for comparing percentages, when the values needed no secondary visual cue at all."],
  ["Data display", "A bubble chart encoded the same value twice, in both size and position. Size became constant so position could carry the meaning - and every bubble got easier to read and to click."],
];

const foundationsGallery = [
  {
    src: "system-semantic-colors.png",
    alt: "Semantic color palette for error, warning, informational, and success states, documented in light and dark mode with AA and AAA contrast ratings",
    caption: "Semantic color · light and dark mode, contrast-rated",
  },
  {
    src: "system-text-styles.png",
    alt: "Text style specimen showing five heading levels and paragraph styles across regular, medium, bold, and black weights, alongside use-case-named styles like card header and table header",
    caption: "Type styles · heading scale plus use-case names",
  },
  {
    src: "system-spacing.png",
    alt: "Spacing scale from 4 to 48 pixels used from micro spacing through section padding",
    caption: "Spacing scale · 4px to 48px",
  },
];

const moleculesGallery = [
  {
    src: "system-buttons.png",
    alt: "Button system showing main-menu and secondary-menu links plus primary, secondary, text, and icon button variants across default, hover, focus, disabled, and pressed states",
    caption: "Buttons · states across default, hover, focus, disabled, pressed",
  },
  {
    src: "system-fields.png",
    alt: "Column search field component with a results dropdown, shown in light and dark themes",
    caption: "Fields · search input with results dropdown",
  },
  {
    src: "system-pagination.png",
    alt: "Pagination control with page numbers and a rows-per-page selector, shown in light and dark themes",
    caption: "Pagination · light and dark",
  },
];

const organismsGallery = [
  {
    src: "system-cards.png",
    alt: "Card organisms including a KPI value card and a sector-weighting chart card, shown in light and dark themes",
    caption: "Cards · KPI and chart variants",
  },
  {
    src: "system-column-reorder.png",
    alt: "Column reorder field states and the full column-reorder modal, shown in light and dark themes",
    caption: "Column reorder · field states and full modal",
  },
  {
    src: "system-modals.png",
    alt: "Modal size variants from small to large used across the product",
    caption: "Modals · size scale",
  },
  {
    src: "system-snackbars.png",
    alt: "Snackbar notification variants for warning, error, informational, and success messages",
    caption: "Snackbars · semantic states",
  },
];

const dataVizGallery = [
  {
    src: "system-sequential.png",
    alt: "Sequential data-visualization palettes in green, blue, and yellow, each stepped for ordered comparisons",
    caption: "Sequential · ordered comparisons",
  },
  {
    src: "system-divergent.png",
    alt: "Divergent data-visualization palette moving from yellow to blue around a neutral midpoint",
    caption: "Divergent · deviation from a midpoint",
  },
  {
    src: "system-categorical.png",
    alt: "Categorical data-visualization palette applied to a donut chart, stacked bar chart, bubble chart, and line chart",
    caption: "Categorical · applied across chart types",
  },
];

function SectionNumber({ children }: { children: string }) {
  return <p className="section-number">{children}</p>;
}

export default function StateStreetCaseStudy() {
  return (
    <main className="state-street-case">
      <SiteHeader />
      <Breadcrumb label="State Street Alpha" />

      <article id="top">
        <section className="hero shell ss-hero">
          <p className="eyebrow">State Street Alpha · Visual language and design system</p>
          <h1>Designing the visual language for a financial operating system.</h1>
          <p className="hero-deck">
            Alpha brings investment operations, oversight, and analysis onto one platform. I was the sole UI designer who defined the visual language, accessibility foundations, and component system that makes its dozens of workflows feel like one product.
          </p>

          <div className="hero-meta ss-hero-meta" aria-label="Project details" id="role">
            <div>
              <span>Role</span>
              <strong>Associate Creative Director · Sole UI designer</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>Visual language, accessibility, design system, product UI, implementation QA</strong>
            </div>
            <div>
              <span>Engagement</span>
              <strong>One year · Publicis Sapient for State Street Bank</strong>
            </div>
          </div>

          <figure className="ss-hero-figure">
            <div className="ss-dashboard-frame">
              <div className="ss-window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>State Street Alpha · North Star dashboard · Light theme</p>
              </div>
              <img
                src={`${assetRoot}/north-star-light.png`}
                alt="Final State Street Alpha dashboard in light theme, showing total market value, percent return, MCSI performance, a portfolio growth chart, and a dense holdings data grid"
              />
            </div>
            <figcaption>
              The verified final dashboard: the proof that the system could hold dense, consequential information without losing hierarchy.
            </figcaption>
          </figure>
        </section>

        <section className="summary-band" id="story" data-anna-prompt="What fragmented meant">
          <div className="shell ss-summary">
            <div>
              <p className="eyebrow">Executive summary</p>
              <h2>Unified in strategy. Fragmented in experience.</h2>
            </div>
            <div className="summary-copy">
              <p>
                Alpha pulls data from internal and external sources - Bloomberg among them - into real-time visualizations of positions, exposures, and investable cash for operations managers, oversight teams, and analysts, all working from the same platform. A shared product name did not create a shared product language.
              </p>
              <p>
                My job was to define the rules underneath the screens: how typography, color, hierarchy, interaction, and data display should behave across teams and products. The core problem was never decoration. It was hierarchy - what to show first, what to let users find, and what to let them ignore.
              </p>
            </div>
          </div>
          <div className="shell ss-thesis-grid" aria-label="The system's three jobs">
            <div><span>01</span><strong>Interpret complexity</strong><p>Help expert users scan without removing the information they need.</p></div>
            <div><span>02</span><strong>Protect meaning</strong><p>Give color, type, and interaction consistent jobs across the platform.</p></div>
            <div><span>03</span><strong>Scale decisions</strong><p>Turn one visual point of view into reusable product infrastructure.</p></div>
          </div>
        </section>

        <section className="chapter shell ss-context-section" data-anna-prompt="Trust in the numbers">
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="eyebrow">The real constraint</p>
              <h2>Get the details wrong and users stop trusting the numbers.</h2>
            </div>
            <div>
              <p className="lead">
                This was not a matter of applying a logo and choosing a few interface colors. Financial users read meaning into every alignment, hue, decimal, and state.
              </p>
              <p>
                The system had to make complexity easier to interpret without flattening it, and preserve the same hierarchy across dense tables, charts, controls, and separately optimized light and dark environments.
              </p>
            </div>
          </div>

          <div className="ss-constraint-grid">
            <article>
              <span>Color</span>
              <h3>Red meaning four different things makes it easy to misread.</h3>
            </article>
            <article>
              <span>Data</span>
              <h3>A decimal point can change the meaning of an entire row.</h3>
            </article>
            <article>
              <span>Density</span>
              <h3>Removing information can make an expert workflow harder.</h3>
            </article>
            <article>
              <span>Behavior</span>
              <h3>One inconsistent component can create uncertainty across products.</h3>
            </article>
          </div>
        </section>

        <section className="chapter shell ss-workday-section" data-anna-prompt="Designing around the workday">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>01 · Designing around the workday</SectionNumber>
              <h2>Glanceable at rest, deep at the point of concern.</h2>
            </div>
            <div>
              <p className="lead">
                The brief, verbatim: enable users to get a quick snapshot of the most important information at-a-glance, and easily deep-dive into areas of interest or concern.
              </p>
              <p>
                That meant designing for two speeds of attention - the daily scan and the focused investigation - for operations managers, oversight teams, and analysts who each open Alpha for a different reason.
              </p>
            </div>
          </div>

          <div className="persona-grid ss-persona-grid-3">
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/persona-ops-manager.png`}
                  alt="Persona profile for Debra M., a State Street Alpha Operations Manager, listing her responsibilities, pain points, and product needs"
                  loading="lazy"
                />
              </div>
              <figcaption>Debra M., Operations Manager - 20 years at State Street, manages a team of 5 to 8 and needs simplicity across her most-used tools.</figcaption>
            </figure>
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/persona-ops-oversight.png`}
                  alt="Persona profile for Rebecca C., a State Street Alpha Oversight Manager, listing her responsibilities, pain points, and product needs"
                  loading="lazy"
                />
              </div>
              <figcaption>Rebecca C., Oversight Manager - owns reporting quality and reconciliation, and needs one place to see and route a problem.</figcaption>
            </figure>
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/persona-ops-analyst.png`}
                  alt="Persona profile for Ralph W., a State Street Alpha Operations Analyst, listing his responsibilities, pain points, and product needs"
                  loading="lazy"
                />
              </div>
              <figcaption>Ralph W., Operations Analyst - fields escalations from teams in India and Poland and needs a faster way through funds with thousands of assets.</figcaption>
            </figure>
          </div>

          <blockquote>
            &ldquo;Success for me is a system that only shows me what me and my team need to do our jobs, integrates common sense tools so I don&rsquo;t have multiple applications open, and is smart enough to know what to automate and make into a template for future ease of use and access.&rdquo;
            <footer>&mdash; Debra M., Operations Manager, from the persona research</footer>
          </blockquote>

          <div className="journey-stack wide-figure">
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/journey-daily-routine.png`}
                  alt="Daily routine journey map for an Operations Manager showing actions, thinking, feelings, and opportunities across a seven-step workday"
                  loading="lazy"
                />
              </div>
              <figcaption>
                Debra&rsquo;s day starts at 4 or 5am, checking email and Teams for issues from other time zones. By 9:30 she has a running list and is assigning it to her team - then she and Ralph spend the rest of the day in meetings just to communicate where everyone stands, re-running calculations by hand along the way. The opportunity was obvious: surface errors and warnings on the platform itself, automate the calculations, and stop making people meet about a to-do list a tool could show them.
              </figcaption>
            </figure>
          </div>

          <div className="journey-stack wide-figure">
            <figure className="figure">
              <div className="figure-image-wrap">
                <img
                  src={`${assetRoot}/research-thematic-map.png`}
                  alt="Operations thematic map from user interviews, grouping findings into themes: data accuracy, communication tools, task management, automation, integration, IT, system latency, and legacy systems"
                  loading="lazy"
                />
              </div>
              <figcaption>Across all 6 users interviewed for this research, automation of redundant tasks came up as the strongest single theme - alongside data accuracy, tool integration, and system latency.</figcaption>
            </figure>
          </div>
        </section>

        <section className="chapter shell ss-before-after">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>02 · The first problem was not color</SectionNumber>
              <h2>It was hierarchy.</h2>
            </div>
            <div>
              <p className="lead">
                The client had already started building Alpha before this engagement, and a beta launch was approaching. Early on, I audited the existing product and logged the fixes with the most impact for the least effort - unglamorous work, but it set the terms for everything that followed.
              </p>
              <p>
                Three stages tell the real story: the legacy portal I inherited, my own first redesign pass, and the North Star that came out of what that first pass got right and wrong. Nothing here is a mockup standing in for &ldquo;before&rdquo; - every screen below is a real, dated build.
              </p>
            </div>
          </div>

          <div className="ss-drift-list" aria-label="Early change log">
            {changeLog.map(([category, issue], index) => (
              <div key={category}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category}</strong>
                <p>{issue}</p>
              </div>
            ))}
          </div>

          <div className="ss-stage-sequence" aria-label="Before, Round One, and Final comparison">
            <figure className="ss-product-figure ss-product-figure-compact">
              <div className="ss-final-figure-label">
                <span>Stage 1 · Before</span>
                <strong>The legacy portal</strong>
              </div>
              <img
                src={`${assetRoot}/before-legacy-portal.png`}
                alt="The pre-existing Alpha Data Portal, a plain gray and white fund-analysis screen with six undifferentiated KPI tiles and five dense reference tables for security types, sector exposure, holdings, currency, and country of risk"
                loading="lazy"
              />
              <figcaption>Six identical KPI tiles, five reference tables, unbranded and undifferentiated - everything given equal weight, which is the same as giving nothing weight. Lesson for Round One: fix the hierarchy before touching a single chart.</figcaption>
            </figure>

            <figure className="ss-product-figure ss-product-figure-compact">
              <div className="ss-final-figure-label">
                <span>Stage 2 · Round One</span>
                <strong>My first redesign pass</strong>
              </div>
              <img
                src={`${assetRoot}/early-prototype.png`}
                alt="Round One redesign: a Growth Investing Alpha Capital prototype for a risk-analyst workflow, with a composition donut chart, KPI cards, a portfolio movers list, and a securities table"
                loading="lazy"
              />
              <figcaption>Real progress: a subject, a brand, a KPI row, a composition chart, a movers list. Also three problems still unsolved - a donut chart asking users to compare slice angles, a table burying 15 identifier columns under a sparkline and a range slider, and a KPI card colored only because it happened to be built first. Those three became the brief for the Final.</figcaption>
            </figure>

            <figure className="ss-product-figure">
              <div className="ss-final-figure-label">
                <span>Stage 3 · Final</span>
                <strong>North Star dashboard</strong>
              </div>
              <img
                src={`${assetRoot}/north-star-light.png`}
                alt="Final State Street Alpha dashboard with a clear KPI row, a growth-over-time chart, two ranked allocation lists, and a workflow-oriented data grid with color-coded errors and warnings"
                loading="lazy"
              />
              <figcaption>The same job, redone: a growth-over-time chart in place of the donut, two ranked bar lists in place of guessing at slice sizes, and a data grid rebuilt around exceptions - errors, warnings, status, and who owns the fix - instead of static security identifiers.</figcaption>
            </figure>
          </div>

          <div className="ss-product-decisions" aria-label="What changed between Round One and Final">
            <article>
              <span>01</span>
              <h3>Comparison over composition</h3>
              <p>A donut chart asks a viewer to compare angles - one of the hardest visual judgments there is. Ranked horizontal bars ask them to compare lengths, which people read precisely and fast. Same allocation data, a chart that&rsquo;s actually easier to use.</p>
            </article>
            <article>
              <span>02</span>
              <h3>One KPI card, not one loud one</h3>
              <p>Round One gave Total Market Value a solid color block and left the other two KPIs plain - an accident of build order, not a decision. In the final, all three KPIs share one visual weight, and color is reserved for the value itself: green for a gain, red for a loss.</p>
            </article>
            <article>
              <span>03</span>
              <h3>The table&rsquo;s job changed</h3>
              <p>Round One&rsquo;s table described every security - 15 columns of identifiers, a sparkline and a range slider in every row. The final grid is built around exceptions: errors and warnings flagged and color-coded, status and an owner visible per row, so the person using it can act instead of just read.</p>
            </article>
          </div>
        </section>

        <section className="chapter shell ss-product-proof" data-anna-prompt="One system, two environments">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>03 · The North Star</SectionNumber>
              <h2>One architecture, two environments.</h2>
            </div>
            <div>
              <p className="lead">
                The final dashboard forced the visual language to work under pressure: KPIs, allocation, movers, a growth chart, and a dense holdings table, all expected to hold up in both a light and a dark environment.
              </p>
            </div>
          </div>

          <div className="ss-final-dashboard-pair" aria-label="Final State Street Alpha dashboard in light and dark themes">
            <figure className="ss-product-figure">
              <div className="ss-final-figure-label">
                <span>Final product direction</span>
                <strong>Light theme</strong>
              </div>
              <img
                src={`${assetRoot}/north-star-light.png`}
                alt="Final light-theme State Street Alpha dashboard with portfolio KPIs, sector allocation, top gainers, growth chart, and holdings table"
                loading="lazy"
              />
              <figcaption>A high-information workspace organized for scanning, comparison, and repeat use.</figcaption>
            </figure>

            <figure className="ss-product-figure ss-product-figure-dark">
              <div className="ss-final-figure-label">
                <span>Same architecture</span>
                <strong>Dark theme</strong>
              </div>
              <img
                src={`${assetRoot}/north-star-dark.png`}
                alt="Final dark-theme State Street Alpha dashboard preserving the same hierarchy, data semantics, and interaction structure as the light theme"
                loading="lazy"
              />
              <figcaption>The same information architecture, component behavior, and semantic color roles carried across environments - system proof, not a cosmetic re-theme.</figcaption>
            </figure>
          </div>

          <div className="ss-product-decisions">
            {productDecisions.map((decision, index) => (
              <article key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>

          <div className="chapter-intro two-column-copy ss-subsection">
            <div>
              <p className="eyebrow">Proven across real workflows</p>
              <h2>Not a concept - a system running on real screens.</h2>
            </div>
            <div>
              <p className="lead">
                Looker powers the visualizations, and early on, powered the data grid itself. Every tile on a page - a ledger, a compliance check, a country exposure view - is its own named component pulling from a Looker or CRIMS source, which is what lets the same system scale to dozens of workflows instead of one screen.
              </p>
            </div>
          </div>

          <div className="ss-final-dashboard-pair" aria-label="Real Alpha product screens">
            <figure className="ss-product-figure">
              <div className="ss-final-figure-label">
                <span>Working prototype</span>
                <strong>Performance Report</strong>
              </div>
              <img
                src={`${assetRoot}/prototype-performance-report.png`}
                alt="Alpha Performance Report screen with a multi-year performance-versus-benchmark chart and a portfolio summary table across multiple client tabs"
                loading="lazy"
              />
              <figcaption>Performance against benchmark, from one month to since-inception, with a client-by-client portfolio summary below it.</figcaption>
            </figure>
          </div>
        </section>

        <section className="ss-system-section" data-anna-prompt="Language as infrastructure">
          <div className="shell">
            <div className="ss-system-heading">
              <div>
                <SectionNumber>04 · From a screen to a system</SectionNumber>
                <h2>The visual language became product infrastructure.</h2>
              </div>
              <p className="lead">
                Each level inherited the decisions beneath it. That made the system flexible enough to compose, but constrained enough to keep teams from inventing a new product language screen by screen.
              </p>
              <p>
                The color system is anchored on three brand colors from the Alpha marketing site - green, yellow, and blue - and every other hue in the system is derived from them by shifting hue alone against their HSB values, then calculated into full tint stacks using the Eva Design System. The one deliberate exception: an early version reused the brand red as the primary data-point color, but it read too strongly as an error state, so it became its own color, distinct from system red, reserved only for marking a value.
              </p>
              <p>
                Type styles follow the same logic. Alongside a standard heading and paragraph scale, the system names styles for what they&rsquo;re used for - card header, table header, column group title - so another designer could find the right style by the job it does, not by guessing which heading level looks right.
              </p>
            </div>

            <div className="ss-atomic-stack">
              {componentGroups.map((group, index) => (
                <article key={group.number} className={`ss-atomic-level ss-atomic-level-${index + 1}`}>
                  <div>
                    <span>{group.number}</span>
                    <h3>{group.name}</h3>
                    <p>{group.detail}</p>
                  </div>
                  <div className="ss-atomic-demo ss-atomic-demo-image">
                    <img src={`${assetRoot}/${group.demoSrc}`} alt={group.demoAlt} loading="lazy" />
                  </div>
                </article>
              ))}
            </div>

            <div className="ss-component-index">
              <div>
                <span>Component coverage</span>
                <strong>22 categories across states, sizes, and themes</strong>
              </div>
              <ul>
                {componentIndex.map((component, index) => (
                  <li key={component}><span>{String(index + 1).padStart(2, "0")}</span>{component}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="ss-gallery-band">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <p className="eyebrow">System evidence</p>
                <h2>The same rules, at every level.</h2>
              </div>
              <div>
                <p className="lead">
                  A sample of the working UI kit - not every board carries equal weight, so this shows representative foundations, molecules, and organisms, plus one full product template proving the system at density.
                </p>
              </div>
            </div>

            <div className="ss-gallery-tier">
              <div className="ss-gallery-tier-label">
                <span>Foundations</span>
                <p>Type, color, and spacing tokens that every component inherits</p>
              </div>
              <div className="ss-evidence-grid">
                {foundationsGallery.map((item) => (
                  <figure className="ss-evidence-card" key={item.src}>
                    <img src={`${assetRoot}/${item.src}`} alt={item.alt} loading="lazy" />
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="ss-gallery-tier">
              <div className="ss-gallery-tier-label">
                <span>Molecules</span>
                <p>Small functional groups built from foundation tokens</p>
              </div>
              <div className="ss-evidence-grid">
                {moleculesGallery.map((item) => (
                  <figure className="ss-evidence-card" key={item.src}>
                    <img src={`${assetRoot}/${item.src}`} alt={item.alt} loading="lazy" />
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="ss-gallery-tier">
              <div className="ss-gallery-tier-label">
                <span>Organisms</span>
                <p>Larger assemblies that carry real product content</p>
              </div>
              <div className="ss-evidence-grid ss-evidence-grid-2">
                {organismsGallery.map((item) => (
                  <figure className="ss-evidence-card" key={item.src}>
                    <img src={`${assetRoot}/${item.src}`} alt={item.alt} loading="lazy" />
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="ss-gallery-tier">
              <div className="ss-gallery-tier-label">
                <span>Templates</span>
                <p>The system proving itself at full product density</p>
              </div>
              <figure className="ss-evidence-card ss-evidence-wide">
                <img
                  src={`${assetRoot}/product-template.png`}
                  alt="A full State Street Alpha portfolio-analysis template assembled entirely from the component system, showing KPI cards, a growth chart, and a dense holdings table"
                  loading="lazy"
                />
                <figcaption>A complete portfolio-analysis template, built entirely from foundation, atom, molecule, and organism rules - no one-off decisions.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="chapter shell ss-dataviz-section" data-anna-prompt="Colour that carries meaning">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>05 · Data visualization and accessibility</SectionNumber>
              <h2>Color had to carry meaning, not just brand.</h2>
            </div>
            <div>
              <p className="lead">
                Semantic states, neutral text, and chart series each needed their own palette so the same hue never carried two conflicting meanings. Every swatch was documented against AA and AAA contrast targets for normal and large text.
              </p>
              <p>
                The categorical palette was the hardest of the three: enough contrast between colors that a legend stays legible, not so many hues that the chart turns to noise, and every pairing tested for accessibility. Brand colors are front-loaded so the first few series in any chart still read as Alpha.
              </p>
              <p>
                Designers are trained to make a palette feel harmonious - cool colors and grays, kept close on the wheel, always reads as pleasant. That instinct works against you here. Users build meaning out of unconscious color groupings: if the sector-allocation bars, the top-movers bars, and the background chrome all sit in the same blue family, people will read them as related even when they aren&rsquo;t. Every chart on the North Star dashboard needed its own hue, deliberately, for exactly this reason.
              </p>
            </div>
          </div>

          <div className="ss-product-decisions" aria-label="Color logic operating on one screen">
            <article>
              <span>01</span>
              <h3>Trend · sequential</h3>
              <p>The growth-over-time chart carries one series in one brand hue. Nothing else on the page competes for that color, so a glance tells you it&rsquo;s the headline number.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Ranking · categorical</h3>
              <p>Sector allocation and top movers sit side by side, and each gets its own hue - blue for one ranking, green for the other - so a user&rsquo;s eye never merges two different comparisons into one.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Exceptions · semantic</h3>
              <p>Red and yellow are reserved, system-wide, for errors and warnings. They never appear anywhere else on the dashboard - not in a chart, not in a brand accent - so when a cell turns red, it is never ambiguous.</p>
            </article>
          </div>

          <div className="ss-gallery-tier">
            <div className="ss-evidence-grid ss-evidence-grid-2">
              {dataVizGallery.map((item) => (
                <figure className="ss-evidence-card" key={item.src}>
                  <img src={`${assetRoot}/${item.src}`} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="ss-implementation-band" data-anna-prompt="Surviving the build">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>06 · Implementation quality</SectionNumber>
                <h2>The system had to survive contact with the build.</h2>
              </div>
              <div>
                <p className="lead">
                  Search and sort are never as simple as they look. The easiest way to build search is to search only what the client already has loaded - it&rsquo;s a smaller lift for engineering, and it quietly fails the user, who reasonably expects a search to cover everything in the system.
                </p>
                <p>
                  I pushed back on that shortcut, on search and on sort both. It wasn&rsquo;t about policing engineers - it was about protecting what the system had promised: that a dense, expert-facing tool would still behave the way its users expected it to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="chapter shell ss-outcome" data-anna-prompt="What the system changed">
          <div className="ss-outcome-heading">
            <div>
              <SectionNumber>07 · Scope and outcome</SectionNumber>
              <h2>The work became a shared way of making decisions.</h2>
            </div>
            <div>
              <p className="lead">
                The visual language, accessibility foundations, component system, and product templates were completed, used by other designers, and handed to development.
              </p>
              <p>
                The engagement ended before launch because of agency budget and contract changes unrelated to the work. The honest outcome is a fully articulated system and product direction that reached implementation, not a claim that the final experience shipped.
              </p>
            </div>
          </div>

          <div className="ss-scope-table">
            <div>
              <span>Completed</span>
              <p>Visual language and design tokens</p>
              <p>Accessible color architecture</p>
              <p>22-category component system</p>
              <p>Light and dark product direction</p>
              <p>Implementation review and QA</p>
            </div>
            <div>
              <span>Project boundary</span>
              <p>System handed to development</p>
              <p>Broader design team adopted the work</p>
              <p>Agency engagement ended before launch</p>
            </div>
          </div>
        </section>

        <section className="reflection shell ss-reflection">
          <SectionNumber>08 · Reflection</SectionNumber>
          <div className="reflection-grid">
            <h2>The smallest UI decisions carried the largest system.</h2>
            <div>
              <p className="lead">
                A type size, a semantic color, or the alignment of a number can look incidental in isolation. Across a financial platform used by operations managers, oversight teams, and analysts, those decisions become trust, speed, and shared understanding.
              </p>
              <p>
                The system worked because every visible detail could trace back to the same point of view - and because it gave other designers and engineers a consistent way to make their own decisions, long after I handed it off.
              </p>
            </div>
          </div>
        </section>

        <section className="next-case ss-next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2>Kmart, &ldquo;Keep Your Secret&rdquo;</h2>
            </div>
            <a className="next-case-status" href="/kmart">Read the Kmart story</a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
