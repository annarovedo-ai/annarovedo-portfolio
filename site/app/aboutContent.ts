import type { PersonaId } from "./personaStore";

/**
 * About page copy per persona, transcribed from Anna's Figma designs
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
   * entirely. Written from Anna's own account of why the fashion and travel
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
    headline: "I design the idea, the system, and the screen.",
    intro: [
      "I’m a Principal Experience Designer with more than 20 years of experience across enterprise products, AI, search, design systems, and future vision.",
      "I’ve worked with companies including IBM, LinkedIn, Nike, Bloomberg, State Street, and Ford, usually on complex products that need more than a polished interface. I help teams understand the real problem, explore what the product could become, and turn that direction into something tangible and testable.",
    ],
    introMobile: [
      "Principal Experience Designer, 20+ years across enterprise products, AI, search, design systems, and future vision.",
      "IBM, LinkedIn, Nike, Bloomberg, State Street, Ford. Usually on complex products that need more than a polished interface.",
    ],
    pointsKicker: "What I bring",
    points: [
      {
        title: "I’m comfortable with ambiguity",
        body: "I’m most useful when the technology is new, the direction is unclear, and the team needs someone who can find the right question before designing the answer.",
      },
      {
        title: "I connect strategy to execution",
        body: "I move between future vision, systems thinking, prototyping, research, and detailed interaction design without losing the larger idea.",
      },
      {
        title: "I make complexity understandable",
        body: "I simplify complicated products without stripping away the information, nuance, or control people genuinely need.",
      },
    ],
    closing: {
      kicker: "What the detours were for",
      body: [
        "We get paid for output, so the parts of a life that do not produce anything measurable tend to look like time off. Curiosity does not show up well on a résumé.",
        "I spent years taking advertising contracts to fund the things I actually wanted to learn. A masters in fashion design. Postgraduate work in pattern making and couture sewing. Long stretches in Italy, Spain and Argentina. On paper that reads as gaps.",
        "It turned out to be the useful part. I was put on a Kmart pitch because of the fashion years, not in spite of them. The brief was to relaunch their clothing line, and I was the one who knew the category. Trends, objects, interfaces and products all come from the same human place, and knowing more than one field is what lets you see it.",
        "Nobody could have told me that in advance and I would not have believed them. What I want from the rest of it is the same thing: that the unconnected pieces keep adding up to a way of seeing that is worth more to the people I work with than another decade of the same thing would have been.",
      ],
    },
    ctaHeadline: "Looking for someone who can help shape what comes next?",
    ctaButton: "View my résumé",
    ctaHref: "/resume",
  },

  client: {
    eyebrow: "Founder, Paper Pixel",
    headline: "I turn ambitious ideas into beautiful, usable products.",
    intro: [
      "I work with teams that have an opportunity, a complicated problem, or the beginnings of an idea, but not yet a clear path forward.",
      "That might mean defining a new product, exploring how AI should fit into an experience, redesigning a complex system, or building a prototype that helps everyone decide what to do next.",
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
    headline: "You missed more than a few seasons.",
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
    ctaHeadline: "Curious about the work itself?",
    ctaBody: "That would be a more defensible reason for being here.",
    ctaButton: "See what I’ve been doing",
    ctaHref: "/#work",
  },
};
