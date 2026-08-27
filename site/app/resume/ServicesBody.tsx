"use client";

import { engagements } from "../engagements";

/**
 * The Client persona sees a Services page in place of the resume, per Anna’s
 * design (resume-client). Nav label switches from "Resume" to "Services".
 */

/**
 * Cut from six to three, 2026-08-18, external review: the six-item menu
 * (identity, apps, commerce, campaigns, platforms, production) read as a
 * full-service agency and attracted poorly matched work. The engagement is
 * the product; these are supporting evidence of range, so three areas that
 * map to the actual case studies is the honest size.
 */
const capabilities = [
  {
    title: "Product and platform design",
    body: "Product strategy, user experience, interface design, research, prototypes, design systems, and complex, data-rich enterprise tools.",
  },
  {
    title: "Brand, campaigns, and content",
    body: "Positioning, visual identity, campaign concepts, launch systems, and channel-ready creative.",
  },
  {
    title: "Websites and build",
    body: "Marketing sites, editorial experiences, commerce, and working software, from structure and content through front-end development and launch.",
  },
];

const specialists = [
  "Strategy",
  "Brand",
  "Product",
  "Content",
  "Engineering",
  "Motion",
  "Production",
];

const process = [
  {
    n: "01",
    title: "Understand",
    body: "Start with the real problem: what needs to change, who it is for, what already exists, and what success should look like.",
  },
  {
    n: "02",
    title: "Define",
    body: "Turn the brief into a clear strategy, creative direction, experience model, and plan for making it real.",
  },
  {
    n: "03",
    title: "Make",
    body: "Design, write, prototype, build, test, and refine the brand, product, website, application, or campaign.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Launch working products and production-ready assets with documentation, quality assurance, and a foundation your team can continue evolving.",
  },
];

const partners = [
  "IBM",
  "LinkedIn",
  "Nike",
  "Bloomberg",
  "State Street",
  "Ford",
  "Razorfish",
  "Critical Mass",
  "Arc Worldwide",
  "Edelman",
  "Inditex",
  "Woolrich",
];

const whatYouGet = [
  {
    title: "One accountable lead",
    body: "You work directly with Anna, from the first strategic question through final delivery.",
  },
  {
    title: "The right-sized team",
    body: "Designers, writers, developers, researchers, motion specialists, and production partners are added according to what the work requires.",
  },
  {
    title: "End-to-end delivery",
    body: "Brand systems, working products, websites, applications, launch assets, and implementation support, not just concepts or presentation decks.",
  },
];

export default function ServicesBody() {
  return (
    <article id="top">
      <section className="svc-hero shell">
        <p className="eyebrow">Independent creative and product studio</p>
        {/* Was "One senior partner. The right team for the whole thing." — two
            noun phrases with a full stop between them, which is the tagline
            structure the voice rules say to delete on sight. One comma turns
            it back into a sentence somebody would say. */}
        <h1>One senior partner, with the right team for the whole thing.</h1>
        <p className="svc-deck">
          Anna leads the strategy and creative direction, then brings together the specialists your
          project needs, from brand and product design to websites, applications, content,
          development, and launch.
        </p>
        <div className="svc-actions">
          {/* "Bring us the brief" contradicted this page twice over: the CTA
              band below says "even if the brief is still messy", and her whole
              positioning is that defining the thing IS the work — asking for a
              finished brief filters out exactly the client she wants. It was
              also an order aimed at the person paying. This echoes the client
              chat copy, which already says "Tell it what you’re working on". */}
          <a className="svc-primary" href="/contact">
            Share what you&rsquo;re working on &rarr;
          </a>
          {/* This page only renders for the Client persona. Pointed at
              /studio#client-work while /work was not a real page; now that it
              is, that’s the honest "selected work" destination for every
              persona, this one included. */}
          <a className="svc-secondary" href="/work">
            See selected work &rarr;
          </a>
        </div>
        {/* Was "Senior-led from first question through final delivery." — the
            second "senior-led" on one screen, in a dialect (agency-brochure)
            the rest of the site does not speak. This says the same thing the
            way she talks. */}
        <p className="svc-note">You deal with the same person the whole way through.</p>
      </section>

      {/* Linked from the client homepage’s "See all services". Same data as
          the homepage cards (app/engagements.ts), longer form: the homepage
          answers "where can a project start", this answers "what would that
          actually be like". Moved directly below the hero 2026-08-18,
          external review: the engagements are the clearest commercial idea
          on the site, so they lead. Capabilities follow as evidence. */}
      <section className="svc-block" id="engagements">
        <div className="shell">
          <p className="eyebrow">Ways to work together</p>
          <div className="svc-engagements">
            {engagements.map((e) => (
              <article key={e.id}>
                <h2>{e.title}</h2>
                <p>{e.expanded}</p>
                <p className="svc-engagement-best">
                  <strong>Best for:</strong> {e.bestFor}
                </p>
              </article>
            ))}
          </div>
          <a className="svc-engagement-cta" href="/contact">
            Share what you&rsquo;re working on <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">What gets made</p>
          <div className="svc-capabilities">
            {capabilities.map((c) => (
              <div key={c.title}>
                <h2>{c.title}</h2>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">How the studio works</p>
          <div className="svc-model">
            <p className="svc-model-name">Anna Rovedo</p>
            <p className="svc-model-role">Strategy, creative direction, and delivery</p>
            <p className="svc-model-network">collaborating with a flexible network of specialists</p>
            <ul className="svc-model-chips">
              {specialists.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="svc-model-body">
              Anna leads every engagement herself, and assembles a trusted team of specialists
              around the work, so each project gets the capabilities it needs without
              unnecessary layers.
            </p>
          </div>
        </div>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">From first question to working product</p>
          <ol className="svc-process">
            {process.map((p) => (
              <li key={p.n}>
                <span>{p.n}</span>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">Selected experience</p>
          <ul className="svc-partners">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="svc-partners-note">
            More than 20 years across enterprise platforms, consumer brands, financial systems,
            automotive interfaces, campaigns, and emerging technology.
          </p>
        </div>
      </section>

      {/* Added 2026-08-27, Anna: "i want to position myself for VCs", both
          the funds and their portfolio companies, client version first. Sits
          after Selected experience on purpose: the logos establish the
          pedigree, this band says what that pedigree looks like inside a
          portfolio. Reuses the svc-get card pattern so it costs no new CSS.
          "LPs" is deliberate: it is the audience's own word, not jargon to
          them, and it signals she knows whose money is in the room. No past
          startup or VC clients are claimed anywhere in this band, because
          none are documented; the claim is fit, not history. */}
      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">For venture funds and their portfolios</p>
          <div className="svc-get">
            <div>
              <h2>Inside a portfolio company</h2>
              <p>
                A direction sprint before committing a build, an embedded design lead through the
                ambiguous stretch, or a brand and product taken to launch. Senior direction when it
                matters most, without an agency retainer or a full-time hire.
              </p>
            </div>
            <div>
              <h2>For the fund itself</h2>
              <p>
                Identity, website, and story work for the firm: how the fund looks, reads, and
                explains itself to founders and LPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">What you get</p>
          <div className="svc-get">
            {whatYouGet.map((w) => (
              <div key={w.title}>
                <h2>{w.title}</h2>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-cta">
        <div className="shell">
          <h2>Have something difficult to figure out?</h2>
          <p>
            Bring the messy brief. I can help define the direction, assemble the right team,
            and take it from first idea to launch.
          </p>
          <a href="/contact">Share what you&rsquo;re working on &rarr;</a>
        </div>
      </section>
    </article>
  );
}
