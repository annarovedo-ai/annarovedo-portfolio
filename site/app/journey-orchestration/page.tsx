import type { Metadata } from "next";
import PagePersonalization from "../PagePersonalization";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";
import CaseHero from "../CaseHero";
import { caseVoices } from "../caseVoices";
import ExAside from "../ExAside";

export const metadata: Metadata = {
  title: "AI-driven journey orchestration, part two · Anna Rovedo",
  description:
    "Part two of the IBM Concierge story: reframing an AI chat layer as the orchestration system for an entire buying journey, designed with Amy Clark, IBM's Global Head of UX.",
  alternates: { canonical: "/journey-orchestration" },
};

const assetRoot = "/case-study/journey-orchestration";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

function Figure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={`figure figure-dark phase-figure ${className}`}>
      <div className="figure-image-wrap">
        <img src={`${assetRoot}/${src}`} alt={alt} loading="lazy" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function SectionNumber({ children }: { children: string }) {
  return <p className="section-number">{children}</p>;
}


const stakeholders = [
  {
    src: "personas-grid.jpg",
    name: "Jamal Cross",
    role: "Lead AI/Integration Architect",
    quote: "Will the code actually work, and will it integrate with our existing systems?",
    lead: true,
  },
  {
    name: "Elaine Vance",
    role: "VP of Finance",
    quote: "What is the guaranteed ROI, and what's the cheapest way to structure the deal?",
  },
  {
    name: "Richard Sterling",
    role: "CEO / Owner",
    quote: "Is this a sound strategic investment that positions us well for the next five years?",
  },
  {
    name: "Dr. Mei Lin",
    role: "Head of Risk & Governance",
    quote: "Does this solution violate data privacy laws, and are we safe from compliance risk?",
  },
];

const market = [
  {
    title: "Salesforce Einstein Copilot",
    body: "An AI assistant that doesn’t live in a chat box. It reconfigures dashboards and recommendations based on intent.",
  },
  {
    title: "Google’s generative search",
    body: "Teaching people to expect adaptive, AI-curated journeys instead of a static list of links.",
  },
  {
    title: "Walmart × OpenAI",
    body: "An AI-first shopping experience that lets customers plan, shop, and check out through ChatGPT. The whole funnel becomes a conversation.",
  },
];

const decisions = [
  {
    title: "Context is provisional",
    body: "Intent stays a revisable hypothesis, not an invisible, permanent profile.",
  },
  {
    title: "Artifacts outlive conversations",
    body: "A saved ROI report or comparison gives the buying committee something concrete to act on after the tab closes.",
  },
  {
    title: "Qualification needs a handoff",
    body: "Lead scoring matters only if it helps the system introduce the right human at the right moment, not just tag a record in a CRM.",
  },
  {
    title: "Personalization must be legible",
    body: "Buyers should understand why the page changed and stay able to inspect or reset what the system remembers.",
  },
  {
    title: "Control is reversible",
    body: "Agentic mode is a visible toggle, on by default in the concept but always off with one click if someone would rather browse a plain page.",
  },
];

const frameworks = [
  {
    title: "Buying committee",
    body: "Model how evaluators, decision-makers, finance, and risk each contribute different evidence to one shared purchase decision.",
  },
  {
    title: "Honest comparison",
    body: "Let buyers compare alternatives credibly. Trust compounds, and a franker comparison surfaces what people actually value.",
  },
  {
    title: "Consent architecture",
    body: "Define what the system remembers, why it adapted the page, and how a buyer can inspect or undo that relationship.",
  },
];

export default function JourneyOrchestration() {
  return (
    <main>
      <SiteHeader />
      <Breadcrumb label="AI-driven journey orchestration" meta="Part two of two · Concept direction" />

      <article id="top">
        <section className="hero shell">
          <CaseHero voices={caseVoices.journeyOrchestration} />

          <div className="hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>UX lead, concept &amp; system design</strong>
            </div>
            <div>
              <span>Partner</span>
              <strong>Amy Clark, Global Head of UX, IBM.com</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Future vision · concept direction</strong>
            </div>
          </div>

          <Figure
            src="predictive-entry-hero.jpg"
            alt="IBM.com page pre-assembled around a visitor's search intent, with a message reading 'I see you're searching for Find root cause, lower MTTR'"
            caption="A visitor arrives already mid-intent. The page and the assistant’s first line are assembled around what brought them here, not a generic homepage."
          />
        </section>

        <section className="summary-band" id="story" data-anna-prompt="Why wasn't a chatbot enough?">
          <div className="shell summary-grid">
            <div>
              <p className="eyebrow">Where this picks up</p>
              <h2>The first version was still a chat. This is not.</h2>
            </div>
            <div className="summary-copy">
              <p>
                The Concierge’s first direction (the full story is in{" "}
                <a href="/concierge">part one</a>) proved something real: buyers were open to conversational help inside a product page, and would trust it enough to keep going. It used a bottom-docked layer, an early concept for a thin input docked along the bottom of the page, deliberately positioned like the AI panes people already trust (ChatGPT, Gemini, Claude), not a sales popup in the corner.
              </p>
              <p>
                That version still treated AI as a feature bolted onto a page. This direction asks a different question: what if the AI became the page’s operating system instead, shaping what a visitor sees next, not just answering what they ask?
              </p>
            </div>
            <aside className="shift-strip">
              <span className="shift-label">The reframe</span>
              <div className="shift-state">
                <span>From</span>
                <strong>An assistant that responds inside the page</strong>
              </div>
              <div className="shift-arrow" aria-hidden="true">→</div>
              <div className="shift-state shift-state-to">
                <span>To</span>
                <strong>A system that orchestrates the page around the journey</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="chapter shell" id="role" data-anna-prompt="Why did journey orchestration matter now?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>01 · Why now</SectionNumber>
              <h2>The market had already started answering this question.</h2>
            </div>
            <div>
              <p className="lead">
                Looking around at where AI interfaces were moving made the direction feel less speculative and more overdue. The pattern across every reference point was the same: the interesting move wasn’t a better chatbot, it was AI reshaping the surface around it.
              </p>
            </div>
          </div>

          <Figure
            src="market-landscape.jpg"
            alt="Screenshots of Salesforce Einstein Copilot, a Google generative search result, and the Walmart and OpenAI Instant Checkout announcement"
            caption="Reference points gathered while framing the direction: not products I built, but evidence the interface pattern was already moving this way industry-wide."
          />

          <div className="future-framework-grid" style={{ marginTop: 40 }}>
            {market.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="future-section" data-anna-prompt="What is journey orchestration?">
          <div className="shell">
            <div className="future-kicker">
              <span>The thesis</span>
              <span>Future vision · concept direction</span>
            </div>
            <div className="future-heading">
              <div>
                <SectionNumber>02 · The thesis</SectionNumber>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8fb0ce", margin: "0 0 10px" }}>
                  AI-driven journey orchestration + lead scoring
                </p>
                <h2>A chatbot answers. This orchestrates.</h2>
              </div>
              <p>
                The same intelligence that powers a conversation can also drive orchestration: detecting intent, adapting content, and reshaping what a visitor sees next. Instead of living in a corner, the AI becomes the conductor of the whole experience, turning a passive page into something responsive and alive. Lead scoring turns every one of those interactions into a measurable signal, so the system learns who’s engaged, who’s ready, and where to focus next. Every page becomes a conversation. Every action becomes a signal.
              </p>
            </div>

            <PagePersonalization />

            <section className="chapter" aria-labelledby="personas-title">
              <div className="future-subheading">
                <div>
                  <p>Meet the buying committee</p>
                  <h3 id="personas-title">One purchase, four very different questions.</h3>
                </div>
                <p>
                  Enterprise deals aren’t decided by one visitor. To make the system concrete, we followed Jamal Cross, a technical lead, through the journey. The same page would adapt just as readily for the finance, strategy, or risk stakeholder evaluating the same purchase alongside him.
                </p>
              </div>

              {/* personas-grid.jpg used to render here: four persona photos
                  with the same names, roles and questions as the stakeholder
                  cards directly below, plus a baked-in deck annotation band.
                  Anna: "text and image repeat here." The HTML cards win: they
                  are crisper, responsive, and the single source. */}

              <div className="stakeholder-grid" style={{ marginTop: 32 }}>
                {stakeholders.map((person) => (
                  <div
                    key={person.name}
                    className={`stakeholder-card${person.lead ? " stakeholder-lead" : ""}`}
                  >
                    <span>{person.lead ? "Following this persona" : "Buying committee"}</span>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                    <p className="stakeholder-quote">“{person.quote}”</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="future-section" style={{ paddingTop: 0 }} data-anna-prompt="How does the page adapt?" data-anna-prompt-ex="Do you ever look me up?">
          <div className="shell">
            <div className="future-heading" style={{ marginBottom: 0 }}>
              <div>
                <SectionNumber>03 · Walking the journey</SectionNumber>
                <h2>Three phases, one visitor, a page that keeps rewriting itself.</h2>
              </div>
              <p>
                Every action Jamal takes feeds a live lead score behind the scenes: a click, a scroll, a demo watched. The score doesn’t just get logged; it decides what the page shows him next.
              </p>
            </div>

            <figure className="loop-figure">
              <img
                src={`${assetRoot}/orchestration-loop-v2.png`}
                alt="A five-step loop: observe signals, form intent, adapt the page, create an artifact, orchestrate handoff, then a dashed return path back to observing signals."
                width={2320}
                height={1030}
                loading="lazy"
              />
              <figcaption>
                Five moves, running continuously. Every interaction feeds back in as a new signal.
              </figcaption>
            </figure>

            <div className="phase-section" style={{ marginTop: 70 }}>
              <div className="phase-header">
                <span>Phase 1</span>
                <h3>Awareness → Predictive entry</h3>
              </div>
              <div className="phase-body">
                <p>
                  Jamal googles “find root cause, lower MTTR” and lands on the page already mid-intent, not in browse mode. The system already has a sense of why he’s here, so instead of a generic headline, he sees a message that names his own search back to him and a page pre-assembled around it. The CTAs are framed as prompt options that match what he came looking for: instant relevance from the first second, before he’s typed anything.
                </p>
                <div className="phase-triggers">
                  <span>Lead-scoring triggers</span>
                  <ul>
                    <li><strong>5 pts</strong> · arrival from a targeted campaign or high-intent keyword</li>
                    <li><strong>10 pts</strong> · clicks the tailored hero CTA (ROI calculator or demo)</li>
                  </ul>
                </div>
              </div>
              <Figure
                src="google-search-intent.jpg"
                alt="Google search results page showing the query 'Find root cause, lower MTTR'"
                caption="The originating signal: a specific problem, searched with intent, not idle browsing."
              />
            </div>

            <div className="phase-section">
              <div className="phase-header">
                <span>Phase 2</span>
                <h3>Engagement → Adaptive content &amp; micro-incentives</h3>
              </div>
              <div className="phase-body">
                <p>
                  Jamal never has to open the chat for the system to keep learning. As he scrolls, the page listens and reshuffles: watching a demo pulls a case study forward, lingering on technical content pushes in comparisons and data sheets. When he does engage, asking to “estimate ROI savings”, the conversation happens inline, in the same space, with no pop-up and no redirect. He never loses his place in the journey.
                </p>
                <div className="phase-triggers">
                  <span>Lead-scoring triggers</span>
                  <ul>
                    <li><strong>5 pts</strong> · engages with a secondary content module (case study, pricing, calculator)</li>
                    <li><strong>20 pts</strong> · completes the “upload your data” or “generate roadmap” interaction</li>
                  </ul>
                </div>
              </div>
              <Figure
                src="roi-calculator-results.jpg"
                alt="Instana ROI calculator inline within the IBM page, showing MTTR reduction, ROI, annual savings, and investment figures, with an inline chat prompt offering to save the results"
                caption="Prototype screen: the ROI calculator’s own example output, shown inline rather than as a separate tool: the figures are the tool’s demo data, not a claimed business result."
              />
            </div>

            <div className="phase-section">
              <div className="phase-header">
                <span>Phase 3</span>
                <h3>Conversion → Human-assisted orchestration</h3>
              </div>
              <div className="phase-body">
                <p>
                  When Jamal finishes the calculator, the system offers to save his results: signing in turns that ROI report into a persistent artifact in his workspace, not just a page he’ll lose track of. As his score climbs, the AI adjusts its offer: a medium score surfaces proof points or a free trial; a high score unlocks a personalized demo. Past a threshold, the payoff moment arrives: he’s introduced to a specialist who already knows what he’s interested in, so the handoff starts mid-conversation instead of from zero.
                </p>
                <div className="phase-triggers">
                  <span>Lead-scoring triggers</span>
                  <ul>
                    <li><strong>25 pts</strong> · opts in for a summary or consult via AI chat</li>
                    <li>Medium score → proof points or trial · High score → personalized demo + human handoff</li>
                  </ul>
                </div>
              </div>
              <Figure
                src="human-assisted-orchestration.jpg"
                alt="Chat message reading 'Hi, Jamal. You're 35% ready for ROI in your environment. Want to try for free?' alongside an interactive root-cause demo loading"
                caption="The AI adjusts its offer based on lead score rather than repeating the same generic CTA to every visitor."
              />
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" data-anna-prompt="When does it hand off to a person?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>04 · The payoff</SectionNumber>
                <h2>The moment a page hands off to a person, on purpose.</h2>
              </div>
              <div>
                <p className="lead">
                  Once Jamal is a qualified lead, the system doesn’t just push him toward a form. It unlocks a specific person, already briefed on what he’s explored, and lets him book time directly. The handoff is the reward for engagement, not an interruption to it.
                </p>
              </div>
            </div>

            <Figure
              src="qualified-handoff.jpg"
              alt="Chat message reading 'You've just unlocked access to Sara Smith, who can answer your questions' with a profile card and a Schedule a call button"
              caption="Qualification unlocks a real person, introduced with the context the system already gathered, not a generic 'contact sales' link."
              className="wide-figure"
            />
          </div>
        </section>

        <section className="future-section" style={{ paddingTop: 0 }}>
          <div className="shell">
            <section className="future-decisions" aria-labelledby="orchestration-decisions-title">
              <div>
                <p>Key system decisions</p>
                <h3 id="orchestration-decisions-title">The hardest questions were about agency, not animation.</h3>
              </div>
              <div className="future-decision-list">
                {decisions.map((item) => (
                  <div key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="future-frameworks" aria-labelledby="orchestration-frameworks-title">
              <div className="future-frameworks-heading">
                <p>Frameworks that followed</p>
                <h3 id="orchestration-frameworks-title">Designing for the realities around the interface.</h3>
              </div>
              <div className="future-framework-grid">
                {frameworks.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <p className="future-note">
              This entire case study is future vision: the system-level thinking that grew out of the Concierge’s first release and the questions it opened, worked through with Amy Clark and IBM’s UX team.
            </p>
          </div>
        </section>

        <section className="reflection shell" data-anna-prompt="What would you test first?" data-anna-prompt-client="Is my product ready for something like this?">
          <SectionNumber>05 · Reflection</SectionNumber>
          <div className="reflection-grid">
            {/* Rewritten 2026-08-10. This reflection used to end in the same
                paragraph as part one's (connective tissue, what persists, what
                becomes an artifact, how transparent) — the designed reading
                path is part one then part two, and the pair ended on one
                thought twice. Part one keeps that thesis. Part two now closes
                on what a concept owes next: the tests it never got. Which also
                answers the honest objection to this page, that the scoring
                weights read as system design without anyone having pressure
                tested them. */}
            <h2>A concept this confident owes you its doubts.</h2>
            <div>
              <p className="lead">
                The lead-scoring weights on this page are a starting hypothesis, not a finding. Nobody has watched a real cohort hit them. The first thing I would do with funding is try to break my own numbers: run the scoring silently against live traffic and see where it flags the wrong people.
              </p>
              <p>
                Second test: the consent architecture, because an adaptive page is one bad default away from feeling like surveillance. And third, where a person should step in, which is a threshold you can only find by crossing it. A concept earns the word direction when it names what would prove it wrong. This one is ready to be argued with.
              </p>
            </div>
          </div>

          <div className="bridge-note">
            <div>
              <span>Read the first chapter</span>
              <p>See where this direction started: the Concierge’s shipped V1 chat.</p>
            </div>
            <a href="/concierge">Read part one</a>
          </div>
        <ExAside>{"A page that notices what you need without being told. I know. Science fiction."}</ExAside>

        </section>

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2>Redesigning search across IBM.com</h2>
            </div>
            <a className="next-case-status" href="/search">Read the search story</a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
