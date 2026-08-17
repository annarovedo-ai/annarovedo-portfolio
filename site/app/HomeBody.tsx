"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import type { CaseStudy, HomeContent } from "./homeContent";
import {
  caseFor,
  clients,
  flagshipCaseStudies,
  homeContent,
  supportingCaseStudies,
} from "./homeContent";
import AlmostAnnaChat from "./AlmostAnnaChat";
import HeroVideo from "./HeroVideo";

const homeImageVariants: Record<string, string> = {
  "/case-study/concierge/concierge-card-hero.png":
    "/case-study/concierge/concierge-card-hero-480.webp 480w, /case-study/concierge/concierge-card-hero-960.webp 960w, /case-study/concierge/concierge-card-hero-1280.webp 1280w",
  "/case-study/thumbs/journey-orchestration.jpg":
    "/case-study/thumbs/journey-orchestration-480.webp 480w, /case-study/thumbs/journey-orchestration-960.webp 960w, /case-study/thumbs/journey-orchestration-1280.webp 1280w",
  "/case-study/thumbs/state-street.jpg":
    "/case-study/thumbs/state-street-480.webp 480w, /case-study/thumbs/state-street-960.webp 960w, /case-study/thumbs/state-street-1280.webp 1280w",
  "/case-study/search/search-card-hero.png":
    "/case-study/search/search-card-hero-480.webp 480w, /case-study/search/search-card-hero-960.webp 960w, /case-study/search/search-card-hero-1280.webp 1280w",
  "/case-study/kmart/card-cover.png":
    "/case-study/kmart/card-cover-480.webp 480w, /case-study/kmart/card-cover-800.webp 800w",
  "/case-study/nike/hero-w.png":
    "/case-study/nike/hero-w-480.webp 480w, /case-study/nike/hero-w-960.webp 960w, /case-study/nike/hero-w-1280.webp 1280w",
  "/case-study/thumbs/search.jpg":
    "/case-study/thumbs/search-480.webp 480w, /case-study/thumbs/search-960.webp 960w, /case-study/thumbs/search-1280.webp 1280w",
};

function HomeImage({
  src,
  alt,
  sizes,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  sizes: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <img
      src={src}
      srcSet={homeImageVariants[src]}
      sizes={sizes}
      alt={alt}
      width={1280}
      height={720}
      loading={loading}
      decoding="async"
    />
  );
}

/**
 * Shared card markup for both the flagship pair and the supporting row.
 *
 * The card resolves its own copy rather than receiving it resolved, so every
 * call site stays a one-liner and no caller can forget to switch. caseFor
 * falls back field by field, so a card with no variant for this persona
 * renders exactly what it always did.
 */
function CaseCard({
  cs,
  persona,
}: {
  cs: CaseStudy;
  persona: PersonaId;
}) {
  const c = caseFor(cs, persona);
  return (
    <a href={c.href} className="home-case">
      {/* Part label lives on the media, so the media span cannot be aria-hidden
          any more. The img keeps alt="" and stays decorative either way. */}
      <span className="home-case-media">
        {c.image ? (
          <HomeImage
            src={c.image}
            alt=""
            sizes="(max-width: 720px) calc(100vw - 36px), (max-width: 1100px) 50vw, 580px"
          />
        ) : null}
      </span>
      <span className="home-case-content">
        <span className="home-case-tags">
          <span className="home-case-tag">{c.tag}</span>
          {c.part ? <span className="home-case-part">{c.part}</span> : null}
        </span>
        <h3>{c.title}</h3>
        <p>{c.body}</p>
        <span className="home-case-cta">View case study &rarr;</span>
      </span>
    </a>
  );
}

function ClientLogoStrip() {
  return (
    <section className="home-clients" data-anna-prompt="Who has Paper Pixel worked with?">
      <div className="shell">
        <p className="eyebrow">Selected clients</p>
        <ul>
          {clients.map((cl) => (
            <li key={cl.name}>
              <img
                src={cl.src}
                alt={cl.name}
                width={396}
                height={158}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const clientHeroProof = [
  {
    href: "/state-street",
    label: "Brand",
    title: "State Street Alpha",
    image: "/case-study/thumbs/state-street.jpg",
  },
  {
    href: "/search",
    label: "Product",
    title: "IBM Global Search",
    image: "/case-study/thumbs/search.jpg",
  },
  {
    href: "/kmart",
    label: "Campaign",
    title: "Kmart SHHHHH",
    image: "/case-study/kmart/card-cover.png",
  },
];

const clientCapabilityCards = [
  {
    number: "01",
    title: "Brand",
    body: "Positioning, identity, and the visual system that holds it together.",
  },
  {
    number: "02",
    title: "Product",
    body: "Product direction, UX, interface design, and a path to a working build.",
  },
  {
    number: "03",
    title: "Campaign",
    body: "Concept, art direction, and the launch system across channels.",
  },
];

const clientProcessSteps = [
  {
    number: "01",
    title: "Find the real problem",
    body: "Turn the brief, business pressure, and customer need into a decision the team can act on.",
  },
  {
    number: "02",
    title: "Make direction tangible",
    body: "Use concepts and prototypes to compare possibilities before the expensive choices become fixed.",
  },
  {
    number: "03",
    title: "Design the system",
    body: "Build the identity, experience, and rules that let the work hold together beyond one screen or launch.",
  },
  {
    number: "04",
    title: "Build and launch",
    body: "Work with the team already in place, or bring the specialists needed to get the work into the world.",
  },
];

function ClientHomeBody({ c }: { c: HomeContent }) {
  const featuredHrefs = ["/state-street", "/search", "/kmart"];
  const featuredCases = featuredHrefs
    .map((href) => supportingCaseStudies.find((cs) => cs.href === href))
    .filter((cs): cs is CaseStudy => Boolean(cs));

  const moreWork = [
    flagshipCaseStudies[0],
    supportingCaseStudies.find((cs) => cs.href === "/nike"),
    flagshipCaseStudies[1],
  ].filter((cs): cs is CaseStudy => Boolean(cs));

  return (
    <article id="top" className="client-home">
      <section className="home-hero client-home-hero shell">
        <div className="client-hero-layout">
          <div className="client-hero-copy">
            <h1>{c.headline[0]}</h1>
            <p className="home-hero-deck">{c.subtext}</p>
            <div className="client-hero-actions">
              <a className="client-hero-primary" href="#client-work">
                See selected work
              </a>
              <a className="client-hero-secondary" href="/contact">
                Discuss a project
              </a>
            </div>
          </div>

          <div className="client-hero-proof" aria-label="Selected work across brand, product, and campaign">
            {clientHeroProof.map((item) => (
              <a href={item.href} className="client-hero-proof-card" key={item.href}>
                <HomeImage
                  src={item.image}
                  alt=""
                  sizes="(max-width: 720px) 33vw, 200px"
                  loading="eager"
                />
                <span className="client-hero-proof-caption">
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClientLogoStrip />

      <section
        className="client-capabilities shell"
        data-anna-prompt="Can Paper Pixel handle brand, product, and campaign?"
      >
        <div className="client-section-intro">
          <p className="eyebrow">What Paper Pixel can take on</p>
          <h2>Start with one part, or connect the whole path to market.</h2>
          <p>
            A project can begin in one discipline and extend into the others without
            changing hands halfway through.
          </p>
        </div>
        <div className="client-capability-grid">
          {clientCapabilityCards.map((item) => (
            <article key={item.title}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-work client-work shell"
        id="client-work"
        data-anna-prompt="Which project is most relevant to mine?"
      >
        <p className="eyebrow">Selected work</p>
        <h2>Brand, product, and campaign, in practice.</h2>
        <div className="client-work-grid">
          {featuredCases.map((cs) => (
            <CaseCard
              key={cs.href}
              cs={cs}
              persona="client"
            />
          ))}
        </div>

        <div className="client-more-work">
          <p className="eyebrow">More work</p>
          <div>
            {moreWork.map((cs) => {
              const item = caseFor(cs, "client");
              return (
                <a href={item.href} key={item.href}>
                  <span>{item.tag}</span>
                  <strong>{item.title}</strong>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              );
            })}
            <a href="/archive">
              <span>Archive</span>
              <strong>More client and agency work</strong>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="client-process"
        data-anna-prompt="How would a project move from brief to launch?"
      >
        <div className="shell">
          <div className="client-section-intro client-section-intro-light">
            <p className="eyebrow">How projects move</p>
            <h2>From an unclear brief to something real.</h2>
          </div>
          <div className="client-process-grid">
            {clientProcessSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <p className="client-engagement-line">
            Anna can join your team, lead a defined project, or bring the right
            collaborators around it.
          </p>
        </div>
      </section>

      <section
        className="client-guide shell"
        data-anna-prompt="Where should my project start?"
      >
        <div className="client-guide-intro">
          <p className="eyebrow">Project guide</p>
          <h2>Not sure where your project fits? Ask Paper Pixel.</h2>
          <p>
            Describe the situation as it exists now. The guide will connect it to
            relevant work and show you the questions Anna would start with.
          </p>
        </div>
        <AlmostAnnaChat variant="inline" />
      </section>

      <section
        className="home-about client-about shell"
        data-anna-prompt="Who would lead the work?"
      >
        <p className="eyebrow">Founder and design lead</p>
        <h2>Anna Rovedo leads every project.</h2>
        <div className="client-about-grid">
          <div className="home-about-copy">
            <p>
              Anna is a designer and product strategist with more than twenty years
              across product teams and ad agencies, from IBM and State Street to
              McDonald&rsquo;s and Kmart.
            </p>
            <p>
              Paper Pixel stays deliberately small. Anna owns the direction and
              brings in specialists when the work needs them.
            </p>
          </div>
          <blockquote className="home-pullquote">
            Culture is always the brief underneath the brief.
          </blockquote>
        </div>
        <a className="home-inline-link" href="/about">
          Meet Anna &rarr;
        </a>
      </section>

      <section className="home-cta client-cta" data-anna-prompt="Ready to talk?">
        <div className="shell home-cta-inner">
          <div>
            <h2>What are you trying to bring to market?</h2>
            <p>
              Send the brief as it exists. A rough idea, a live product, or a launch
              that needs direction is enough.
            </p>
          </div>
          <div className="home-cta-actions">
            <a className="home-cta-button" href={c.footerButtonHref}>
              Book a time
            </a>
            <a className="home-cta-secondary" href="/contact">
              Send a brief
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default function HomeBody() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const c = homeContent[persona];

  if (persona === "client") {
    return <ClientHomeBody c={c} />;
  }

  return (
    <article id="top">
      <section className="home-hero shell">
        <div className="home-hero-copy">
          <h1>
            {c.headline[0]}
            {c.headline[1] ? (
              <>
                {" "}
                <span className="home-headline-soft">{c.headline[1]}</span>
              </>
            ) : null}
          </h1>
          <p className="home-hero-deck">{c.subtext}</p>
        </div>

        <div className="home-hero-grid">
          <HeroVideo />

          <AlmostAnnaChat variant="inline" />
        </div>
      </section>

      <ClientLogoStrip />

      <section className="home-work shell" id="work" data-anna-prompt="Where to start?">
        <p className="eyebrow">{c.workEyebrow}</p>
        <h2>{c.casesHeader}</h2>

        <div className="home-flagship">
          <p className="home-flagship-label">From AI widget to AI operating system</p>
          <div className="home-flagship-grid">
            {flagshipCaseStudies.map((cs) => (
              <CaseCard
                key={cs.href}
                cs={cs}
                persona={persona}
              />
            ))}
          </div>
        </div>

        <div className="home-case-row">
          {supportingCaseStudies.map((cs) => (
            <CaseCard
              key={cs.href}
              cs={cs}
              persona={persona}
            />
          ))}
        </div>

        <div className="home-other">
          <p className="eyebrow">Also</p>
          <h3>There&rsquo;s more than this.</h3>
          <p className="home-other-archive-link">
            Client work, agency work, and twenty years of things I haven&rsquo;t written
            up yet.{" "}
            <a href="/archive">See the archive &rarr;</a>
          </p>
          {/* NO LINK TO /this-site HERE, AND THAT IS DELIBERATE.
              Removed 10 August at Anna's instruction (b6076d4): it read as the
              AI selling its own involvement. The page still exists and still
              has no inbound links, which is the decision rather than an
              oversight. Re-added 12 August by an audit that treated the orphan
              as a bug and reverted the same day. Check the history before
              "fixing" this again. */}
        </div>
      </section>

      {/* Persona-switched as of 2026-08-07, and cut to roughly half its length.
          See the note on HomeContent.about for why the old opener had to go. */}
      <section className="home-about shell" data-anna-prompt="Graphic design to AI?">
        <p className="eyebrow">{c.about.eyebrow}</p>
        <h2>{c.about.headline}</h2>
        <div className="home-about-copy">
          {c.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <blockquote className="home-pullquote">{c.about.pullquote}</blockquote>
        <a className="home-inline-link" href="/about">
          {c.about.link} &rarr;
        </a>
      </section>

      <section className="home-cta" data-anna-prompt="What are you looking for?">
        <div className="shell home-cta-inner">
          <div>
            <h2>{c.footerHeadline}</h2>
            <p>{c.footerBody}</p>
          </div>
          {/* Two paths, because footerBody above already promises two. The
              button used to point at /contact regardless of what it said, and
              /contact leads with a message form, so "Book a time" delivered a
              form plus a smaller link to the thing you had just asked for.
              Now the primary does exactly what it says, and the alternative it
              was hiding is offered out loud. */}
          <div className="home-cta-actions">
            <a className="home-cta-button" href={c.footerButtonHref}>
              {c.footerButton}
            </a>
            {c.footerSecondary ? (
              <a className="home-cta-secondary" href={c.footerSecondary.href}>
                {c.footerSecondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
