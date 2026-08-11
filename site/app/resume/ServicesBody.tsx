"use client";

/**
 * The Client persona sees a Services page in place of the résumé, per Anna's
 * design (resume-client). Nav label switches from "Resume" to "Services".
 */

const capabilities = [
  {
    title: "Brand and identity",
    body: "Positioning, naming, visual identity, brand systems, guidelines, and launch-ready creative.",
  },
  {
    title: "Product and app design",
    body: "Product strategy, user experience, interface design, prototypes, research, and scalable design systems.",
  },
  {
    title: "Websites and commerce",
    body: "Marketing sites, editorial experiences, service platforms, and commerce, from structure and content through design and build.",
  },
  {
    title: "Campaigns, content, and social",
    body: "Campaign concepts, launch systems, channel-ready content, social templates, motion, and supporting creative.",
  },
  {
    title: "Platforms and complex systems",
    body: "Enterprise tools, dashboards, connected workflows, information architecture, and data-rich interfaces.",
  },
  {
    title: "Development and production",
    body: "Working prototypes, front-end development, production design, quality assurance, launch support, and implementation oversight.",
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
              chat copy, which already says "Tell it what you're working on". */}
          <a className="svc-primary" href="/contact">
            Tell us what you&rsquo;re working on &rarr;
          </a>
          <a className="svc-secondary" href="/#work">
            See selected work &rarr;
          </a>
        </div>
        {/* Was "Senior-led from first question through final delivery." — the
            second "senior-led" on one screen, in a dialect (agency-brochure)
            the rest of the site does not speak. This says the same thing the
            way she talks. */}
        <p className="svc-note">You deal with the same person the whole way through.</p>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">What we make</p>
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
          <p className="eyebrow">Selected clients and agency partners</p>
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
            Tell us what you&rsquo;re building, even if the brief is still messy. We can help
            define the direction, assemble the right team, and take it from first idea to launch.
          </p>
          <a href="/contact">Tell us what you&rsquo;re working on &rarr;</a>
        </div>
      </section>
    </article>
  );
}
