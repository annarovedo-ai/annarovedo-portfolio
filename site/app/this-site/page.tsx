import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";

export const metadata: Metadata = {
  title: "This site · Anna Rovedo",
  description:
    "The portfolio as its own case study: a persona-switching site with an AI trained on Anna Rovedo's work, designed and built by her with an AI pair.",
};

/**
 * The site as its own case study.
 *
 * The homepage claims "I design products, and I can get them built." A claim
 * like that is cheap on a portfolio, which is exactly why this page exists:
 * the site the visitor is already using is the demonstration, and it is the
 * one piece of evidence that cannot be faked with a nice deck. Everything
 * described here is checkable by the reader in the next thirty seconds,
 * which is a standard no other case study on the site can meet.
 *
 * Deliberately reuses the case-study template classes (hero, chapter,
 * two-column-copy, reflection, next-case) rather than inventing its own
 * layout: the argument of the page is "this is a real shipped product like
 * the others", so it should be dressed like the others.
 *
 * This is also the honest home for naming the AI. The hero copy site-wide
 * stays quiet about tooling on purpose (tool names age badly in an h1, and
 * leading with the tool invites "is this AI slop?" before the work can
 * answer). A case study is where there is room to show rather than say.
 */
export default function ThisSitePage() {
  return (
    <main>
      <SiteHeader />
      <Breadcrumb label="This site" />

      <article id="top">
        <section className="hero shell">
          <p className="eyebrow">Paper Pixel · The site itself</p>
          <h1>This site is the seventh case study.</h1>
          <p className="hero-deck">
            The homepage says I design products and can get them built. That is
            an easy thing to type. So the proof is the thing you are using
            right now: a working product with an AI in it, designed, written,
            and built by me, the same way I would build for you.
          </p>

          <div className="hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>Design, copy, and build</strong>
            </div>
            <div>
              <span>Built with</span>
              <strong>Next.js, Motion, and Claude</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Live. You are in it.</strong>
            </div>
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="Why three versions?">
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="section-number">01 · The premise</p>
              <h2>A portfolio should demonstrate, not describe.</h2>
            </div>
            <div>
              <p className="lead">
                Most portfolios ask you to take the case studies on faith. This
                one hands you the working product and lets you test it.
              </p>
              <p>
                The site reads differently depending on who you are. A
                recruiter, a client, and one hypothetical ex boyfriend each get
                the same facts with different emphasis, switched live on the
                page: different headlines, different framing on the work,
                different questions in the chat. Same person, three first
                calls. Switch the pill in the header and watch the page decide
                what matters to you.
              </p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" data-anna-prompt="How does this thing work?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <p className="section-number">02 · Almost Anna</p>
                <h2>The IBM pattern, turned on its designer.</h2>
              </div>
              <div>
                <p className="lead">
                  At IBM I designed a concierge that helps buyers evaluate
                  complex software. Almost Anna is the same pattern applied to
                  a harder subject: me.
                </p>
                <p>
                  It is trained on my work history, my case studies, and my
                  opinions, and it answers the way I talk. The bar along the
                  bottom of the homepage reads whichever section you are
                  viewing and offers a question about it, and the three states
                  it moves between are one shape changing form, not three
                  widgets trading places. Ask it something a website cannot
                  answer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="chapter shell" data-anna-prompt="What did the AI actually do?">
          <div className="chapter-intro two-column-copy">
            <div>
              <p className="section-number">03 · The build</p>
              <h2>One person, no handoff.</h2>
            </div>
            <div>
              <p className="lead">
                I designed the system, wrote the copy, and built the product in
                the same working sessions, with Claude as the pair. Strategy
                and craft never changed hands.
              </p>
              <p>
                The code carries its own design rationale. Why the chat morphs
                as a single shape. Why an accessibility pass moved focus into
                the conversation and back out again. Why a dismissal shows its
                undo at the moment you create the problem. Every decision is
                written down where the next person would trip over it, because
                a system you cannot explain is a system you do not have.
              </p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" data-anna-prompt="Why so few colors?">
          <div className="shell">
            <div className="chapter-intro two-column-copy">
              <div>
                <p className="section-number">04 · The rules</p>
                <h2>Small systems, held without exceptions.</h2>
              </div>
              <div>
                <p className="lead">
                  Round means choose. Orange means press. Headlines work,
                  subtexts rest.
                </p>
                <p>
                  None of these rules is precious on its own. What makes them a
                  system is that they hold everywhere, so each shape and color
                  carries information instead of decoration. It is the same
                  discipline I build into client design systems, at portfolio
                  scale, where you can check it against every screen you have
                  already seen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="reflection shell" data-anna-prompt="Would this work for us?">
          <p className="section-number">05 · Reflection</p>
          <div className="reflection-grid">
            <h2>If I would not ship it for myself, I should not pitch it to you.</h2>
            <div>
              <p className="lead">
                This is the part of the argument a deck cannot make. One
                accountable person carrying strategy, design, copy, and build,
                with AI supplying the leverage, is not a description of a
                process I am selling. It is how the thing you are reading got
                made.
              </p>
              <p>
                The same approach scales up with a team around it, and shrinks
                down to a single hard problem. Either way, what you saw here is
                what you get.
              </p>
            </div>
          </div>
        </section>

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next</p>
              <h2>See where the pattern started.</h2>
            </div>
            <a className="next-case-status" href="/concierge">
              Read the IBM Concierge story
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
