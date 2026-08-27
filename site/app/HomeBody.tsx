"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import type { CaseStudy, HomeContent } from "./homeContent";
import {
  caseFor,
  clients,
  homeContent,
  orderedCaseStudies,
} from "./homeContent";
import { engagements } from "./engagements";
import { HomeImage } from "./CaseCard";
import { aboutContent } from "./aboutContent";

/**
 * Recruiter/Ex hero portrait, 2026-08-20 (Anna: "remember the still image
 * you had for my video? make it a profile image on the homepage on the
 * side"). These are the same frames HeroVideo.tsx used as poster stills
 * before the hero video was cut entirely on 2026-08-18 — not a grab from
 * footage, but the frame Anna picked from a full contact sheet. HeroVideo.tsx
 * itself stays unused/undeleted (this sandbox can’t delete files), so this is
 * a fresh, much smaller read of the same two assets rather than a dependency
 * on that component. Client keeps its own hero photography (client-hero-proof)
 * and never reads this.
 */
/* The Fukunaga credit line came along from the old video treatment and was
   cut 2026-08-24 (Anna: "remove this line") — a joke caption made sense
   under a fake film still; under a plain portrait it was just a stray line. */
const heroPortrait: Record<PersonaId, { src: string; srcSmall: string; alt: string }> = {
  recruiter: { src: "/video-recruiter-2.webp", srcSmall: "/video-recruiter-2-480.webp", alt: "Anna Rovedo" },
  client: { src: "/video-recruiter-2.webp", srcSmall: "/video-recruiter-2-480.webp", alt: "Anna Rovedo" },
  ex: { src: "/video-ex.webp", srcSmall: "/video-ex-480.webp", alt: "Anna Rovedo" },
};

/**
 * The six, in the one order both pages use — see orderedCaseStudies in
 * homeContent.ts for why the sequence is what it is. The homepage renders
 * them as compact tiles (no body copy) and /work as full CaseCards, but the
 * order and the three-column grid are now identical (2026-08-24, Anna: "lay
 * out case study cards same as home").
 */
const allCaseStudies: CaseStudy[] = orderedCaseStudies;

/**
 * The homepage’s small case-study tile (2026-08-20): the "6 big tiles" moved
 * to /work wholesale, and the homepage now shows a compact preview of the
 * same six, still linking straight to the case study itself rather than to
 * /work. Deliberately no body paragraph — that is the thing that made the old
 * tiles big, and the preview’s job is recognition, not the pitch.
 */
function CaseTile({ cs, persona }: { cs: CaseStudy; persona: PersonaId }) {
  const c = caseFor(cs, persona);
  return (
    <a href={c.href} className="home-work-tile">
      <span className="home-work-tile-media">
        {c.image ? (
          <HomeImage
            src={c.image}
            alt=""
            sizes="(max-width: 560px) calc(100vw - 36px), (max-width: 1000px) 50vw, 320px"
          />
        ) : null}
      </span>
      <span className="home-work-tile-content">
        <span className="home-work-tile-tag">{c.tag}</span>
        <h3>{c.title}</h3>
        <span className="home-work-tile-cta">View case study &rarr;</span>
      </span>
    </a>
  );
}

/**
 * The grid plus its one remaining exit: the archive. Shared by every
 * persona’s homepage rather than re-typed per branch, since the six tiles
 * and the archive line are identical across all three — only the section
 * eyebrow, heading and hint attributes around this still vary by persona,
 * and those stay with each call site.
 *
 * Used to also carry a "See all the work →" link to /work, styled to match
 * this row (2026-08-20 pass fixing a style mismatch between the two). Cut
 * the same day, one question later (Anna, looking at the result: "why are
 * there two CTAs in one line here?"): every tile already links straight to
 * its own case study, so a second, generic exit to "more of what you’re
 * already looking at" had no job the tiles weren’t doing. /work is still one
 * click away from the primary nav on every page, so nothing became harder to
 * find — this row just stopped competing with itself. */
function WorkTilesGrid({ persona }: { persona: PersonaId }) {
  return (
    <>
      <div className="home-work-tiles">
        {allCaseStudies.map((cs) => (
          <CaseTile key={cs.href} cs={cs} persona={persona} />
        ))}
      </div>
      <div className="home-work-more">
        <p className="home-other-archive-link">
          Client work, agency work, and twenty years of things I haven&rsquo;t written
          up yet. <a href="/archive">See the archive &rarr;</a>
        </p>
      </div>
    </>
  );
}

// "Selected clients" implied Paper Pixel itself contracted with IBM and
// Nike. "Selected experience" claims the same logos honestly: companies
// Anna has designed for, in whatever contractual wrapper. Same reason the
// section hint asks about Anna rather than the studio.
function ClientLogoStrip() {
  return (
    <section className="home-clients" data-anna-prompt="Who has Anna designed for?">
      <div className="shell">
        <p className="eyebrow">Selected experience</p>
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
    // "Brand" contradicted the case study one click away, which proves a
    // platform and a design system. The label is a promise of what the case
    // demonstrates, so it has to match the evidence.
    label: "Platform",
    title: "State Street Alpha",
    image: "/case-study/thumbs/state-street.jpg",
  },
  {
    // Was IBM Global Search on a search-results screenshot, which read as a
    // grey page of links at thumbnail size and made the middle of the trio
    // the weakest image (2026-08-24, Anna: "change the product one to the
    // chat in the hero"). The Concierge card hero is the same asset the
    // homepage and /work already use for this study: a real product shot
    // with the AI conversation visible, and AI is the thing a client is
    // most likely to be shopping for.
    href: "/concierge",
    label: "Product",
    title: "IBM Chat Concierge",
    image: "/case-study/concierge/concierge-card-hero.png",
  },
  {
    href: "/kmart",
    label: "Campaign",
    title: "Kmart SHHHHH",
    image: "/case-study/kmart/card-cover.png",
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
  return (
    <article id="top" className="client-home">
      {/* Hero and Overview combined into one section 2026-08-20 (Anna,
          looking at the recruiter homepage: "combine into one section") —
          applied here too for the same reason: a divider between the
          headline and "Founder and design lead" read as two separate ideas
          when they are one continuous introduction. Reordered the same day
          per Anna’s homepage wireframe: hero-plus-overview leads, before
          Work and Brands. Founder/about and Ways to work together both moved
          up here from further down the page; What I Bring moved here from
          /about the same day (Anna: "put this on the home page and remove
          the about tab"). Client has no closing block in aboutContent.ts, so
          only the points grid renders for this persona. */}
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

        {/* The client hero lost its chat stage the same day as the recruiter
            hero (2026-08-19); Ask Paper Pixel lives in the razor sitewide. */}

        {/* Eyebrow, its own h2 ("Anna Rovedo leads every project."), and two
            paragraphs, until 2026-08-20 (Anna: "make this one hero section.
            edit it down for impact"). One line now; the h1 already carries
            the headline. */}
        {/* The whole about band is gone. First the paragraph (redundant with
            the new hero subtext), then the pull quote too (Anna, 13 August).
            The client hero now hands straight to the ways-to-work points.
            The quote still lives in the chat grounding, where it belongs as
            something she says rather than something the page declaims. */}
      </section>

      <section
        className="about-points"
        data-anna-prompt="How can we start working together?"
      >
        <div className="shell">
          <p className="eyebrow">{aboutContent.client.pointsKicker}</p>
          <ol className="about-points-grid">
            {aboutContent.client.points.map((p, i) => (
              <li key={p.title}>
                <span className="about-point-number">{`0${i + 1}`}</span>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Replaced the Brand/Product/Campaign capability cards 2026-08-17:
          that triad was already carried by the hero headline, the hero proof
          images, and the Selected Work heading, so the cards were a fourth
          telling. What the page did NOT answer was how an engagement actually
          starts, which is the question a prospective client arrives with. */}
      <section
        className="client-capabilities shell"
        data-anna-prompt="How can we start working together?"
      >
        <div className="client-section-intro">
          <p className="eyebrow">Ways to work together</p>
          <h2>Where a project can start.</h2>
          <p>
            You do not need to arrive with a finished brief. Start with a focused
            sprint, bring Anna into the team, or shape a larger engagement around
            the work.
          </p>
        </div>
        <div className="client-engagement-grid">
          {engagements.map((e) => (
            <article key={e.id}>
              <h3>{e.title}</h3>
              <span className="client-engagement-duration">{e.duration}</span>
              <p>{e.summary}</p>
            </article>
          ))}
        </div>
        {/* One shared CTA, not one per card: describing the situation should
            not require first diagnosing which engagement model fits it. */}
        <div className="client-engagement-actions">
          <a className="home-cta-button" href="/contact">
            {/* "Tell me what you’re working on" was Anna’s voice on the
                visitor’s button (Anna, 2026-08-19: "the CTA is for the
                user - it feels clunky"). A button labels the clicker’s
                action; this now matches the Services page CTAs. */}
            Share what you&rsquo;re working on
          </a>
          <a className="client-engagement-secondary" href="/resume#engagements">
            See all services
          </a>
        </div>
      </section>

      <ClientLogoStrip />

      <section
        className="home-work client-work shell"
        id="client-work"
        data-anna-prompt="Which case study should I start with?"
      >
        <p className="eyebrow">Selected work</p>
        <h2>Brand, product, and campaign, in practice.</h2>
        <WorkTilesGrid persona="client" />
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
        </div>
      </section>

      {/* The mid-page "Project guide" chat card was removed 2026-08-18
          (final review of the continuous-chat pass): after the full-screen
          stage establishes Ask Paper Pixel as the primary interaction, a
          second boxed chat here was a competing surface, and the dock is
          already following the reader by this point. Its section hint moved
          nowhere; the engagements section above still carries its own. Founder
          and design lead, and What I Bring, both moved up to the Overview band
          right after the hero (2026-08-20) — see the note there. */}

      <section className="home-cta client-cta" data-anna-prompt="What should I include when I reach out?">
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

export default function HomeBody({
  entryPersona,
}: {
  /** Set by /studio so the Client homepage is the server-rendered output,
      not a post-hydration swap. See app/studio/page.tsx. */
  entryPersona?: PersonaId;
} = {}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = entryPersona ?? store;
  const c = homeContent[persona];

  if (persona === "client") {
    return <ClientHomeBody c={c} />;
  }

  return (
    <article id="top">
      {/* Hero and Overview combined into one section 2026-08-20 (Anna,
          looking at this exact spot: "combine into one section") — a divider
          between the headline and "About" read as two separate ideas when
          they are one continuous introduction. Reordered the same day per
          Anna’s homepage wireframe: hero-plus-overview leads, before Work
          and Brands. What I Bring / Why The Range Matters moved here from
          /about the same day too (Anna: "put this on the home page and
          remove the about tab"). Ex reads its own persona’s points/closing
          here as well, same as the case cards: the joke stays in the frame,
          the content underneath does not get thinner for it. */}
      <section className="home-hero shell">
        <div className="home-hero-layout">
          <div className="home-hero-main">
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
              {/* "Book 30 minutes" was cut 2026-08-19. It arrived as the video’s
                  companion ("someone the video convinces should not have to
                  hunt for the next step") and outlived its reason when the
                  video went. A booking ask five seconds in requests commitment
                  before evidence; booking lives where post-proof happens — the
                  footer CTA, the contact page, and the chat. */}
            </div>

            {/* The chat left the hero for good on 2026-08-19, by Anna’s own
                question ("do you think the chat belongs in the hero? at all?")
                and this answer: a hero’s job is identity and credibility in
                five seconds, and chat asks for effort before showing proof.
                Almost Anna lives in the razor now — commentary alongside the
                work, not the opening act. A day of fighting voids and
                redundancy in this slot was the evidence. */}

            {/* The pullquote is gone (2026-08-27, Anna: "remove: The problem
                comes first. The medium follows." and the Culture line with
                it). It was the last survivor of the about band; the hero is
                now h1, subtext, portrait, done. The long-form thinking still
                lives in the chat answers and on /about, unlinked. */}
          </div>

          {/* Portrait, new 2026-08-20 (Anna: "make it a profile image on the
              homepage on the side as a square"). See the heroPortrait note
              above for provenance. */}
          <div className="home-hero-portrait">
            <img
              className="home-hero-portrait-img"
              src={heroPortrait[persona].src}
              srcSet={`${heroPortrait[persona].srcSmall} 480w, ${heroPortrait[persona].src} 720w`}
              sizes="(max-width: 900px) 40vw, 260px"
              alt={heroPortrait[persona].alt}
              width={480}
              height={480}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section
        className="about-points"
        data-anna-prompt="How do you work when the roadmap isn’t clear?"
      >
        <div className="shell">
          <p className="eyebrow">{aboutContent[persona].pointsKicker}</p>
          <ol className="about-points-grid">
            {aboutContent[persona].points.map((p, i) => (
              <li key={p.title}>
                <span className="about-point-number">{`0${i + 1}`}</span>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* "Why the range matters" closing block removed from the homepage
          2026-08-20 (Anna: "do we need this?"). Its one paragraph restated
          the pullquote just above the points grid — "the idea determines the
          medium" is the same claim as "the problem comes first, the medium
          follows" — so the page argued the same point twice a few inches
          apart. Cutting it also removed a second serif interruption between
          two sans sections (Anna, same moment: "the typefaces are out of
          control now"): hero pullquote (serif) → points (sans) → closing
          (sans eyebrow, serif body) → logos was three registers in a row.
          The block still exists on /about, unlinked but intact, closing
          argument and all. */}

      <ClientLogoStrip />

      <section
        className="home-work shell"
        id="work"
        data-anna-prompt="Which case study best shows how Anna thinks?"
        data-anna-prompt-ex="Did you know I’d click “Ex-Boyfriend”?"
      >
        <p className="eyebrow">{c.workEyebrow}</p>
        <h2>{c.casesHeader}</h2>

        <WorkTilesGrid persona={persona} />

        {/* NO LINK TO /this-site HERE, AND THAT IS DELIBERATE.
            Removed 10 August at Anna’s instruction (b6076d4): it read as the
            AI selling its own involvement. The page still exists and still
            has no inbound links, which is the decision rather than an
            oversight. Re-added 12 August by an audit that treated the orphan
            as a bug and reverted the same day. Check the history before
            "fixing" this again. */}
      </section>

      {/* THE RESUME BAND IS GONE (2026-08-24). Added four days earlier from
          Anna's homepage wireframe — eyebrow, "Twenty years, one document",
          one line, and a link — and cut once it was built and read: it
          spent a full band saying "there is a resume", which the nav says
          on every page, under a subtext that restated the hero's own. A
          scanner met the same claim twice and was handed an exit they
          already had. The link survives where it is actually useful, as
          the third action in the closing CTA below, next to Book a time. */}

      <section className="home-cta" data-anna-prompt="What kind of role is Anna looking for?">
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
            {/* The resume link is gone from this band too (2026-08-27,
                Anna: "remove VIEW THE RESUME from this section"). It was
                rehomed here on 2026-08-24 when its own band was cut, and
                survived three days. The CTA pair now stands alone, and the
                resume keeps its one entrance: the nav. Do not rehome the
                link a third time. */}
          </div>
        </div>
      </section>
    </article>
  );
}
