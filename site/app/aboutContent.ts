import type { PersonaId } from "./personaStore";

/**
 * About page copy per persona, transcribed from Anna’s Figma designs
 * (about-recruiter / about-client / about-ex-boyfriend).
 */

export type AboutPoint = { title: string; body: string };

export type AboutContent = {
  eyebrow: string;
  headline: string;
  intro: string[];
  /**
   * Short intro for narrow screens. Both variants render into the DOM and CSS
   * picks one, rather than swapping with JS: no hydration mismatch, no flash on
   * load, and crawlers still see the full text. Personas without one fall back
   * to `intro` at every width.
   */
  introMobile?: string[];
  pointsKicker: string;
  points: AboutPoint[];
  /**
   * Reflective closing block. Optional: personas that omit it skip the section
   * entirely. Written from Anna’s own account of why the fashion and travel
   * years turned out to be the useful part, and kept off the case studies
   * deliberately, where it pulls focus from the work.
   */
  closing?: { kicker: string; body: string[] };
  ctaHeadline: string;
  ctaBody?: string;
  ctaButton: string;
  ctaHref: string;
};

export const aboutContent: Record<PersonaId, AboutContent> = {
  recruiter: {
    eyebrow: "Principal Experience Designer",
    headline: "UX is my specialty, not my boundary.",
    intro: [
      "I’m a Principal Experience Designer with more than 20 years of experience. UX is the deepest part of my practice, particularly across enterprise products, AI, search, design systems, and future vision.",
      "My work also spans graphic design, advertising, fashion, brands, and campaigns. That range helps me connect customer behavior, business context, technology, and visual culture, and recognize when the answer needs to extend beyond a screen.",
      // Moved here from the resume’s About block 2026-08-19, when that
      // block was removed: the one fact this page did not already carry.
      "Contract by choice for most of that career, which is why the client list runs long and the strongest engagements repeat: IBM came back across a decade. Open to a full-time role now, for the right problem and the right team.",
    ],
    introMobile: [
      "Principal Experience Designer, 20+ years across enterprise UX, AI, search, design systems, brands, and campaigns.",
      "UX is the deepest part of my practice, not the limit of it.",
      "Contract by choice for twenty years. Open to full time now, for the right problem and team.",
    ],
    pointsKicker: "What I bring",
    points: [
      {
        title: "I’m comfortable with ambiguity",
        body: "I’m most useful when the technology is new, the direction is unclear, and the team needs someone who can find the right question before designing the answer.",
      },
      {
        title: "I follow the idea across mediums",
        body: "I can carry a direction from product strategy and interaction design into brand, campaign, content, and physical experience without losing the central idea.",
      },
      {
        title: "I make complexity understandable",
        body: "I simplify complicated products without stripping away the information, nuance, or control people genuinely need.",
      },
    ],
    closing: {
      kicker: "Why the range matters",
      /**
       * The opening paragraph here restated the intro almost word for word:
       * both said the range is what lets her recognise when a problem needs
       * more than a screen. Saying it twice on one page read as circling
       * rather than emphasis, so the duplicate is gone and the closing keeps
       * only the part the intro does not already make.
       */
      body: [
        "Sometimes the right answer is a product workflow. Sometimes it is a campaign, a brand system, a physical experience, or a combination of them. I want to keep doing work where the idea determines the medium, and where rigorous UX thinking and strong visual craft are equally important.",
      ],
    },
    ctaHeadline: "Looking for someone who can help shape what comes next?",
    ctaButton: "View my resume",
    ctaHref: "/resume",
  },

  client: {
    eyebrow: "Founder, Paper Pixel",
    headline: "The problem comes before the medium.",
    intro: [
      "I work with teams that have an opportunity, a complicated problem, or the beginnings of an idea, but not yet a clear path forward.",
      "UX is the foundation, but the answer may be a product, brand, campaign, website, prototype, or a connected system across several of them. I shape the idea, then bring together the people needed to make it real.",
    ],
    pointsKicker: "What working together looks like",
    points: [
      {
        title: "Senior thinking, directly",
        body: "The person helping shape the direction is also doing the work. There are no layers of account management between the problem and the person solving it.",
      },
      {
        title: "Something tangible, early",
        body: "Ideas become prototypes quickly, exposing assumptions and improving the conversation before expensive decisions become fixed.",
      },
      {
        title: "A direction your team can use",
        body: "The goal is not just a compelling presentation. It is a clear, credible direction your team understands and can continue building.",
      },
    ],
    ctaHeadline: "Have something complicated in mind?",
    ctaButton: "Start a conversation",
    ctaHref: "/contact",
  },

  ex: {
    eyebrow: "Yes, still designing",
    headline: "Still designing. New everything else.",
    intro: [
      "Since we last spoke, I built a career designing complex products for companies including IBM, LinkedIn, Nike, Bloomberg, State Street, and Ford.",
      "I became particularly good at taking ambiguous ideas, finding the real problem underneath them, and turning them into something people can see, test, and build.",
      "You once wondered whether I had a plan or was just improvising. The answer was yes.",
    ],
    pointsKicker: "The relevant updates",
    points: [
      {
        title: "I still ask too many questions",
        body: "It turns out this is useful when the problem is complicated and no one agrees on what should be built.",
      },
      {
        title: "I make ideas tangible quickly",
        body: "I use prototypes and research to move teams out of theoretical conversations and toward informed decisions.",
      },
      {
        title: "I was right about the shortcut",
        body: "Adding forty minutes does not make it a shortcut. We can leave it there.",
      },
    ],
    closing: {
      kicker: "Why the range matters",
      /**
       * The recruiter version of this makes the same argument straight. Here
       * it lands as a callback: the thing that was once a complaint about her
       * is the thing she now gets hired for. The joke only works because the
       * point underneath it is true.
       */
      body: [
        "Sometimes the right answer is a product workflow. Sometimes it is a campaign, a brand system, or something physical you can hold. You once described this as an inability to pick a lane. It is now, more or less, the entire value proposition.",
      ],
    },
    ctaHeadline: "Curious about the work itself?",
    ctaBody: "That would be a more defensible reason for being here.",
    ctaButton: "See what I’ve been doing",
    ctaHref: "/work",
  },
};
