import type { Metadata } from "next";
import AuditExplorer from "../AuditExplorer";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";
import CaseHero from "../CaseHero";
import { caseVoices } from "../caseVoices";
import ExAside from "../ExAside";

export const metadata: Metadata = {
  title: "IBM Chat Concierge, part one · Anna Rovedo",
  description:
    "Part one of the IBM Concierge story: how Anna Rovedo designed and validated an AI concierge for the enterprise buying journey on IBM.com.",
  alternates: { canonical: "/concierge" },
};

const assetRoot = "/case-study/concierge";

type FigureProps = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  tone?: "light" | "dark";
  className?: string;
  /**
   * Intrinsic pixel size. Optional only because the older assets on this page
   * have never had theirs recorded; pass it on everything new. Without it the
   * browser reserves no space and the page reflows as each image arrives,
   * which is the single largest layout-shift source on the site.
   */
  width?: number;
  height?: number;
};

function Figure({
  src,
  alt,
  caption,
  tone = "light",
  className = "",
  width,
  height,
}: FigureProps) {
  return (
    <figure className={`figure ${tone === "dark" ? "figure-dark" : ""} ${className}`}>
      <div className="figure-image-wrap">
        <img
          src={`${assetRoot}/${src}`}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function SectionNumber({ children }: { children: string }) {
  return <p className="section-number">{children}</p>;
}

const flow = [
  {
    src: "v1-demo-request-hires.png",
    step: "01",
    title: "Ask for a demonstration",
    body: "The conversation begins in the context of the product page, without forcing the buyer into a separate tool.",
  },
  {
    // The demo-redirect capture lives HERE, in the step about the demo, not as
    // a standalone wide figure after the flow. It was appended full-width
    // below the grid first, and Anna's verdict was exact: "this is a strange
    // place to pull this piece out and it's huge." An image belongs inside
    // the thing that explains it, at the size that role earns.
    src: "concierge-demo.webp",
    step: "02",
    title: "Explore the product",
    body: "An interactive demo replaces a generic sales pitch with something the buyer can evaluate, and it is not on rails: midway through, this buyer says his devices are iPads, not iPhones, and the demo rebuilds around iPads.",
  },
  {
    src: "v1-assessment-hires.png",
    step: "03",
    title: "Clarify the need",
    body: "A short assessment gathers enough context to make the next response useful, not merely conversational.",
  },
  {
    src: "v1-plan-hires.png",
    step: "04",
    title: "Shape a plan",
    body: "Recommendations are tied to the buyer’s situation and stay visible as a decision artifact.",
  },
  {
    src: "v1-email-hires.png",
    step: "05",
    title: "Carry the decision forward",
    body: "The experience creates a summary that can move beyond the chat and into the buying committee.",
  },
  {
    src: "v1-setup-hires.png",
    step: "06",
    title: "Continue after purchase",
    body: "The same relationship can support onboarding and setup instead of disappearing at conversion.",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Breadcrumb label="IBM Chat Concierge" meta="Part one of two" />

      <article id="top">
        <section className="hero shell">
          <CaseHero voices={caseVoices.concierge} />

          <div className="hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>Sole UX designer</strong>
            </div>
            <div>
              <span>Methods</span>
              <strong>Journey mapping, prototyping, validation</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Live, still being built</strong>
            </div>
          </div>

          <Figure
            src="v1-final.webp"
            alt="The IBM product marketing page with the Concierge docked along its bottom edge, greeting the visitor and offering to tailor content to their organization"
            label="01 · hero"
            caption="The V1 direction, docked along the bottom. The product page stays the primary experience."
            width={1578}
            height={900}
            className="hero-figure"
          />
        </section>

        <section className="summary-band" id="story" data-anna-prompt="Why not just a chatbot?">
          <div className="shell summary-grid">
            <div>
              <p className="eyebrow">Executive summary</p>
              <h2>The opportunity was larger than chat.</h2>
            </div>
            <div className="summary-copy">
              <p>
                Enterprise software is rarely bought by one person in one sitting. Buyers move between research, demos, internal conversations, approvals, setup, and support. The existing experience treated those moments as separate transactions.
              </p>
              <p>
                The Concierge explored a different model: make help available in context, preserve continuity across the journey, and turn conversation into something a buying team could act on.
              </p>
            </div>
            <aside className="shift-strip">
              <span className="shift-label">The shift</span>
              <div className="shift-state">
                <span>From</span>
                <strong>A chat window on a page</strong>
              </div>
              <div className="shift-arrow" aria-hidden="true">→</div>
              <div className="shift-state shift-state-to">
                <span>To</span>
                <strong>A guided layer across the journey</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="chapter shell" id="role" data-anna-prompt="What was your role?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>01 · The assignment</SectionNumber>
              <h2>Make the future tangible enough to evaluate.</h2>
            </div>
            <div>
              <p className="lead">
                I owned UX for the concept on a multidisciplinary team led by IBM’s Global Head of UX. My job was to connect the buyer journey, the interaction model, and the evidence into one direction people could see, question, and test.
              </p>
              <p>
                That meant working across research, journey architecture, conversational patterns, prototyping, and validation. It also meant resisting the temptation to start with the chat interface. The journey came first.
              </p>
            </div>
          </div>

          <div className="role-grid">
            <div className="role-card">
              <span>01</span>
              <h3>Frame the opportunity</h3>
              <p>Connect scattered buying moments into one coherent experience.</p>
            </div>
            <div className="role-card">
              <span>02</span>
              <h3>Prototype the behavior</h3>
              <p>Show what useful assistance looks like before the system exists.</p>
            </div>
            <div className="role-card">
              <span>03</span>
              <h3>Put the idea in front of buyers</h3>
              <p>Test comprehension, trust, and interest with real participants.</p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" data-anna-prompt="What did mapping the journeys reveal?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>02 · Research and journey mapping</SectionNumber>
                <h2>We started with two people trying to make one enterprise decision.</h2>
              </div>
              <div>
                <p className="lead">
                  A developer evaluating technical fit and a decision-maker evaluating organizational value needed different kinds of evidence. The design had to serve both without turning the experience into two disconnected journeys.
                </p>
              </div>
            </div>

            {/* The heading promises two people, so meet them before anything
                else. Competitive research moved below the journeys: it reads as
                a check against the market, which only lands once you know who
                the journey is for. */}
            {/* Personas as markup, not screenshots of persona sheets. Same
                content, but it reflows, it is selectable and searchable, it is
                readable to a screen reader, and it drops ~9MB of PNG. */}
            <div className="persona-pair">
              <article className="persona-card">
                <div className="persona-card-head">
                  <img
                    className="persona-card-face"
                    src="/case-study/concierge/david-face.jpg"
                    alt="David Rodriguez"
                    width="560"
                    height="560"
                    loading="lazy"
                  />
                  <div>
                    <span className="persona-pair-role">The implementing user</span>
                    <h3>David Rodriguez</h3>
                    <p className="persona-card-meta">
                      Software developer, 32, New York. Works at a rapidly growing fintech
                      company.
                    </p>
                  </div>
                </div>
                <p className="persona-card-lede">
                  He has to live with whatever gets bought, so he is judging whether it
                  actually holds up.
                </p>
                <dl>
                  <div>
                    <dt>What he needs</dt>
                    <dd>
                      A mobile device management solution robust enough to secure a growing
                      fleet of devices, without making them worse to use.
                    </dd>
                  </div>
                  <div>
                    <dt>Existing IBM stack</dt>
                    <dd>None.</dd>
                  </div>
                </dl>
              </article>

              <article className="persona-card">
                <div className="persona-card-head">
                  <img
                    className="persona-card-face"
                    src="/case-study/concierge/sara-face.jpg"
                    alt="Sara Garcia"
                    width="560"
                    height="560"
                    loading="lazy"
                  />
                  <div>
                    <span className="persona-pair-role">The decision-maker</span>
                    <h3>Sara Garcia</h3>
                    <p className="persona-card-meta">
                      Tech-savvy manager, 40, New York. Bridges IT and the business to line
                      solutions up with what the organization actually needs.
                    </p>
                  </div>
                </div>
                <p className="persona-card-lede">
                  She is judging whether it is worth doing at all, and whether she can
                  defend it.
                </p>
                <dl>
                  <div>
                    <dt>What she needs</dt>
                    <dd>
                      To spot where new technology answers a business problem, and to clear
                      roadblocks out of her team&rsquo;s way.
                    </dd>
                  </div>
                  <div>
                    <dt>Existing IBM stack</dt>
                    <dd>Has run the purchase and the negotiations for it before.</dd>
                  </div>
                </dl>
              </article>
            </div>


            <div className="journey-stack">
              <Figure
                src="david-journey-hires.png"
                alt="Mapped enterprise buying journey for David"
                label="02A · David journey"
                caption="David’s journey revealed where evaluation stalled, where expert help mattered, and where a useful artifact could reduce repetition."
              />
              <Figure
                src="sara-journey-hires.png"
                alt="Mapped enterprise buying journey for Sara"
                label="02B · Sara journey"
                caption="Sara’s journey made the buying committee visible and expanded the problem beyond a single chat session."
              />
            </div>
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="Why put the input at the bottom?" data-anna-prompt-ex="Would you answer me now?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>03 · Interaction model</SectionNumber>
              <h2>Make help available without turning the page into a chat window.</h2>
            </div>
            <div>
              <p className="lead">
                The first concept used a bottom-docked conversational layer that stayed connected to the page beneath it. Buyers could ask, explore, and continue without losing the product context they were evaluating.
              </p>
              <blockquote>
                The interface was intentionally quiet. The intelligence had to feel present, not intrusive.
              </blockquote>
            </div>
          </div>

          {/* This is the evidence for the heading above, so it sits with it.
              It was parked at the end of the research section, where it read as
              an afterthought about two people it had nothing to do with. */}
          <Figure
            src="comparative-analysis-hires.png"
            alt="Competitive landscape of conversational AI products and interface references"
            label="03 · interface conventions"
            caption="Scanning the field separated the chat conventions everyone already knew from the ones an enterprise buying journey actually needed. Most of what was familiar assumed a single user in a single sitting."
            className="wide-figure"
          />

          <div className="placement-note">
            <span>Why the bottom</span>
            <div>
              <p>
                Where the input sits tells people what it is before they read a word of
                it. ChatGPT, Claude and Perplexity all run it along the bottom of the
                page, and by now that placement reads as a tool you use to work something
                out.
              </p>
              <p>
                A bubble in the lower right corner reads as a chatbot. It is quicker to
                spot, and people already know how to dismiss it, because it usually means
                support or a sales prompt. This was doing more than that, so it went along
                the bottom.
              </p>
              <p>
                Bottom is where it starts, not where it is stuck. Once a conversation is
                open it can dock to the right of the screen so the buyer can keep reading
                the page beside it, or take the full screen when the answer is the thing
                worth looking at. The buyer decides how much room it gets.
              </p>
            </div>
          </div>

          <div className="principle-row">
            <div><span>Context</span><p>Respond to what the buyer is already looking at.</p></div>
            <div><span>Continuity</span><p>Carry useful information into the next step.</p></div>
            <div><span>Control</span><p>Let the buyer decide when the assistant enters the experience.</p></div>
          </div>
        </section>

        <section className="prototype chapter" data-anna-prompt="What did the prototype have to prove?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <SectionNumber>04 · Prototype</SectionNumber>
                <h2>The prototype had to prove more than a conversation.</h2>
              </div>
              <div>
                <p className="lead">
                  A polished chatbot would have answered the smallest version of the brief. The prototype instead followed the relationship from first interest through purchase and setup, showing how AI could reduce friction across the whole journey.
                </p>
              </div>
            </div>

            <div className="flow-grid">
              {flow.map((item) => (
                <article className="flow-card" key={item.src}>
                  <Figure
                    src={item.src}
                    alt={`${item.title} prototype screen`}
                    label={`${Number(item.step) + 4} · flow`}
                  />
                  <div className="flow-copy">
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter shell testing" data-anna-prompt="What did testing show?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>05 · Validation</SectionNumber>
              <h2>We tested whether buyers understood it, trusted it, and wanted to continue.</h2>
            </div>
            <div>
              <p className="lead">
                Two rounds of unmoderated UserZoom testing moved the work beyond internal enthusiasm. Participants evaluated the prototype as prospective buyers, giving the team evidence about comprehension and interest before the experience advanced.
              </p>
              {/* Softened 2026-08-18: "strong comprehension and interest
                  signals" described confidence rather than findings, and the
                  session-level data is not Anna's to publish. This states
                  what the rounds were built to answer and what the signal
                  earned, which is the honest size of the claim. If Anna
                  supplies two or three specific observed behaviors, they
                  belong here in place of the second sentence. */}
              <p className="fact-note">
                The rounds were built to answer three questions: could buyers follow the model, did they trust what it was doing, and did they want to keep going. The signal was strong enough to earn the next iteration, and testing has continued since in partnership with a dedicated researcher.
              </p>
            </div>
          </div>

          <div className="study-summary" aria-label="User testing study summary">
            <div className="study-method">
              <div className="study-method-copy">
                <span className="study-eyebrow">Study design</span>
                <h3>Unmoderated desktop prototype testing</h3>
                <p>Two rounds in UserZoom, using three demo-style buying journeys.</p>
              </div>

              <dl className="study-metrics">
                <div>
                  <dt>3</dt>
                  <dd>research goals</dd>
                </div>
                <div>
                  <dt>5</dt>
                  <dd>hours of testing</dd>
                </div>
                <div>
                  <dt>15</dt>
                  <dd>participants</dd>
                </div>
              </dl>
            </div>

            <div className="study-questions">
              <div className="study-section-label">
                <span className="study-eyebrow">What we needed to learn</span>
                <p>Three questions connected the concept to actual buyer behavior.</p>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <p>Are users open to using a chatbot for product discovery and research?</p>
                </li>
                <li>
                  <span>02</span>
                  <p>Can conversational assistance add value to purchase-related workflows?</p>
                </li>
                <li>
                  <span>03</span>
                  <p>Will users trust it enough to share information and make a purchase?</p>
                </li>
              </ol>
            </div>

            <div className="study-participants">
              <div>
                <span className="study-eyebrow">Participant profile</span>
                <h3>Technical and business professionals</h3>
              </div>
              <dl>
                <div>
                  <dt>Functions</dt>
                  <dd>IT and business</dd>
                </div>
                <div>
                  <dt>Industries</dt>
                  <dd>InsurTech, EdTech, and telecoms</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>Desktop, demo-style journeys</dd>
                </div>
              </dl>
            </div>
          </div>
        <ExAside>{"Fifteen strangers got what I was going for on the first try. So it was never my explaining."}</ExAside>

        </section>

        <section className="result-section" data-anna-prompt="When did AI stop being just a feature?">
          <div className="shell result-grid">
            <div className="result-copy">
              <SectionNumber>06 · The Concierge</SectionNumber>
              <h2>AI became more useful when it stopped behaving like a feature.</h2>
              <p>
                The design turned chat from a separate destination into a persistent layer within the product experience. It could explain what was on the page, help a buyer make progress, and preserve enough context to make the next interaction better.
              </p>
              {/* A second formatted triad ("Available, not demanding / Contextual,
                  not generic / Continuous, not disposable") sat here, one screen
                  after Context / Continuity / Control. Two triads saying
                  overlapping things is a template showing; section 03's row
                  owns the ideas. Cut 2026-08-10. */}
            </div>
            <Figure
              src="bottom-dock-context.webp"
              alt="The Concierge docked along the bottom of an IBM product page, offering to answer a question about device support while the supported devices section of the page is on screen above it"
              label="12 · context"
              caption="It asks about device support because that is the section the buyer stopped on. The dock reads the page above it."
              width={2320}
              height={1620}
              tone="dark"
            />
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="How did the north star become buildable?">
          <div className="chapter-intro two-column-copy">
            <div>
              <SectionNumber>07 · From vision to live experience</SectionNumber>
              <h2>Shipping the first version was the start of the work, not the end of it.</h2>
            </div>
            <div>
              <p className="lead">
                A first version went live, and the concepts from the future-vision prototype have been developed and tested through the year since. Conversation history across sessions. Prompt hints, so a buyer facing an empty field can see what this thing is actually good for. AI summaries on the Product Finder page, and the harder question underneath them: what the handoff looks like when a summary has answered part of the question and a product page has to take over.
              </p>
              <p>
                So this is a live program rather than a finished deliverable. Each piece ships, gets used, and changes what the next piece should be, which is a slower and more honest way to build than shipping a vision intact.
              </p>
              <p>
                The work moves between those near-term product decisions and the larger question behind them: how should assistance behave when it becomes part of the site rather than a widget attached to it?
              </p>
            </div>
          </div>

          <AuditExplorer />

          <div className="evolution-grid evolution-grid-secondary">
            <Figure
              src="history-direction.jpg"
              alt="Chat history direction and interaction states"
              label="14 · conversation history"
              caption="Define how continuity should work across sessions and states."
            />
            <Figure
              src="production-handoff.jpg"
              alt="Detailed design handoff for the IBM chat experience"
              label="15 · production handoff"
              caption="Turn the north star into concrete patterns the delivery team could use."
            />
          </div>
        </section>

        <section className="future-section" data-anna-prompt="Why did this become journey orchestration?">
          <div className="shell">
            <div className="future-kicker">
              <span>What came next</span>
              <span>Continued in part two</span>
            </div>
            <div className="future-heading" style={{ marginBottom: 0 }}>
              <div>
                <SectionNumber>08 · What if the AI was the page?</SectionNumber>
                <h2>This is where the story keeps going.</h2>
              </div>
              <p>
                While the live chat work continued, I began working directly with Amy Clark, IBM’s Global Head of UX, on a much bigger question: what if AI didn’t just respond inside a page, but orchestrated the journey itself: adapting content, surfacing tools, and scoring intent in real time? That direction outgrew a single chapter here, so it has its own case study.
              </p>
            </div>

            <div className="bridge-note bridge-note-dark" style={{ marginTop: 56 }}>
              <div>
                <span>Part two</span>
                <p>AI-driven journey orchestration + lead scoring, with Amy Clark</p>
              </div>
              <a href="/journey-orchestration">Read part two</a>
            </div>
          </div>
        </section>

        <section className="reflection shell" id="reflection" data-anna-prompt="What did this change about how you design AI?" data-anna-prompt-client="Could an assistant like this work on our site?">
          <SectionNumber>09 · Reflection</SectionNumber>
          <div className="reflection-grid">
            <h2>The interface was never the most interesting part.</h2>
            <div>
              <p className="lead">
                The most important decision was to treat conversation as connective tissue across a complicated buying journey, not as a novelty placed at the edge of a page.
              </p>
              <p>
                That shift created room for better questions: what context should persist, what should become an artifact, when should a person enter, and how transparent should an adaptive system be about what it knows? Those questions shaped the Concierge and continue to shape how I think about agentic products now.
              </p>
            </div>
          </div>
        </section>

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Part two</p>
              <h2>AI-driven journey orchestration</h2>
            </div>
            <a className="next-case-status" href="/journey-orchestration">Read part two</a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
