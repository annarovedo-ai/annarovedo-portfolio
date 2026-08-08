"use client";

/**
 * The Client persona sees a Services page in place of the résumé, per Anna's
 * design (resume-client). Nav label switches from "Resume" to "Services".
 */

const capabilities = [
  {
    title: "Brand and Identity",
    body: "Positioning, naming, visual identity, brand systems, guidelines, and launch-ready creative.",
  },
  {
    title: "Product and App Design",
    body: "Product strategy, user experience, interface design, prototypes, research, and scalable design systems.",
  },
  {
    title: "Websites and Commerce",
    body: "Marketing sites, editorial experiences, service platforms, and commerce, from structure and content through design and build.",
  },
  {
    title: "Campaigns, Content, and Social",
    body: "Campaign concepts, launch systems, channel-ready content, social templates, motion, and supporting creative.",
  },
  {
    title: "Platforms and Complex Systems",
    body: "Enterprise tools, dashboards, connected workflows, information architecture, and data-rich interfaces.",
  },
  {
    title: "Development and Production",
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
    title: "One Accountable Lead",
    body: "You work directly with Anna throughout the engagement, from the first strategic question through final delivery.",
  },
  {
    title: "The Right-Sized Team",
    body: "Designers, writers, developers, researchers, motion specialists, and production partners are added according to what the work requires.",
  },
  {
    title: "End-to-End Delivery",
    body: "Brand systems, working products, websites, applications, launch assets, and implementation support, not just concepts or presentation decks.",
  },
];

export default function ServicesBody() {
  return (
    <article id="top">
      <section className="svc-hero shell">
        <p className="eyebrow">Senior-led creative and product studio</p>
        <h1>One senior partner. The right team for the whole thing.</h1>
        <p className="svc-deck">
          I lead the strategy and creative direction, then bring together the specialists your
          project needs, from brand and product design to websites, applications, content,
          development, and launch.
        </p>
        <div className="svc-actions">
          <a className="svc-primary" href="/contact">
            Bring me the brief &rarr;
          </a>
          <a className="svc-secondary" href="/#work">
            See selected work &rarr;
          </a>
        </div>
        <p className="svc-note">Senior-led from first question through final delivery.</p>
      </section>

      <section className="svc-block">
        <div className="shell">
          <p className="eyebrow">What we can create</p>
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
              Every engagement is led directly by Anna. A trusted team of specialists is
              assembled around the brief, giving each project the capabilities it needs without
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
            Tell me what you&rsquo;re building, even if the brief is still messy. I can help
            define the direction, assemble the right team, and take it from first idea to launch.
          </p>
          <a href="/contact">Bring me the brief &rarr;</a>
        </div>
      </section>
    </article>
  );
}
