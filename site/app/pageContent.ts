import type { PersonaId } from "./personaStore";

/**
 * Per-persona framing for Résumé and Contact. About lives in aboutContent.ts.
 *
 * Facts are identical across personas — only emphasis and voice shift, per
 * docs/tone-guide.md. Recruiter leans decisions and process, Client leans
 * problem framing and partnership, Ex Boyfriend keeps the same substance with
 * emotional distance and dry restraint.
 */

export type ContactField = {
  label: string;
  placeholder: string;
  multiline?: boolean;
};

export type ContactContent = {
  eyebrow: string;
  headline: string;
  deck: string;
  fields: ContactField[];
  submit: string;
  sideHeading: string;
  sideBody: string;
  sideList?: { label: string; ordered?: boolean }[];
  channels?: { label: string; value: string; href: string }[];
};

export type ResumeContent = {
  navLabel: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  /**
   * Optional override for the Profile block. Personas that leave this undefined
   * fall back to the shared professional version in ResumeBody, so the facts
   * live in one place and only the voice changes.
   */
  profile?: string[];
};

export const contactContent: Record<PersonaId, ContactContent> = {
  recruiter: {
    eyebrow: "Availability status",
    headline: "Taking on new roles and contracts",
    deck: "I am currently exploring full-time leadership roles, advisory contracts, and selected collaborative projects.",
    fields: [
      { label: "Full name", placeholder: "E.g., Sarah Jenkins" },
      { label: "Work email", placeholder: "s.jenkins@firm.com" },
      { label: "Company / firm", placeholder: "E.g., Vanguard Recruiting" },
      {
        label: "Message / opportunity details",
        placeholder: "Tell me about the role, package range, and expectations…",
        multiline: true,
      },
    ],
    submit: "Get in touch",
    sideHeading: "Direct channels",
    sideBody:
      "If your system blocks contact forms or you prefer sending a full spec up front, please email me, or book time directly.",
    channels: [
      { label: "Book a call", value: "Book 30 minutes", href: "https://calendly.com/anna-rovedo/30min" },
      { label: "Email address", value: "anna.rovedo@gmail.com", href: "mailto:anna.rovedo@gmail.com" },
      // "Professional network" pointed at an unclaimed LinkedIn vanity URL.
      // Removed 2026-08-07; put it back when linkedin.com/in/anna-paperpixel
      // actually resolves, or swap in the real profile URL.
    ],
  },

  client: {
    eyebrow: "Collaboration & consulting",
    headline: "What are you working on?",
    deck: "I take on product, brand, and campaign work, from complex enterprise systems to new ideas that need a clear path to market. Partnerships typically run 3–6 months.",
    fields: [
      { label: "What’s your name?", placeholder: "Jane Doe" },
      { label: "Where should I reply?", placeholder: "jane@yourstartup.io" },
      {
        label: "Brief project overview",
        placeholder: "Modernizing an enterprise data layer and need…",
        multiline: true,
      },
      { label: "Expected timeline", placeholder: "E.g., Nov 2026 start (approx. 4 months)" },
    ],
    submit: "Start a conversation",
    sideHeading: "How engagements work",
    sideBody:
      "No bloated pitch meetings. Scope is agreed upfront, work runs in weekly sprints, and artifacts stay lightweight: Figma, production-ready code, and clear documentation.",
    sideList: [
      { label: "Intro brief review & scope alignment", ordered: true },
      { label: "Flat-rate monthly engagement structure", ordered: true },
      { label: "Daily async communication via Slack", ordered: true },
    ],
    channels: [
      { label: "Book a call", value: "Book 30 minutes", href: "https://calendly.com/anna-rovedo/30min" },
    ],
  },

  ex: {
    eyebrow: "Non-professional inquiries",
    headline: "No, this is not that. But if you are actually reaching out, here is where",
    deck: "Genuinely, if you want to say hi, that is fine. Just keep it above 140 characters.",
    fields: [
      { label: "Who are you?", placeholder: "First name (or nickname if you must)" },
      { label: "Where should I send a validation token?", placeholder: "yourname@gmail.com" },
      {
        label: "Your statement",
        placeholder: "Type a civilized, thoughtful message here…",
        multiline: true,
      },
    ],
    submit: "Send (for real this time)",
    sideHeading: "House Rules",
    sideBody:
      "To protect the integrity of my design workspace, all personal outreach must conform to standard UX guidelines.",
    sideList: [
      { label: "Messages under 140 characters (e.g., \"hey\") are automatically filtered out." },
      { label: "Sentiments will be parsed by my custom AI analyzer for defensive tones." },
      { label: "Replies are strictly asynchronous and may take up to 3 business years." },
    ],
    channels: [
      { label: "Book a call", value: "Book 30 minutes", href: "https://calendly.com/anna-rovedo/30min" },
    ],
  },
};

export const resumeContent: Record<PersonaId, ResumeContent> = {
  recruiter: {
    navLabel: "Resume",
    eyebrow: "Principal Experience Designer",
    headline: "I help teams figure out what complex products should become.",
    intro: [
      "Future vision, AI experiences, search and discovery, complex enterprise products, design systems, research, and rapid prototyping.",
    ],
  },
  client: {
    navLabel: "Services",
    eyebrow: "Senior-led creative and product studio",
    headline: "One senior partner, and the right team for the whole thing.",
    intro: [
      "I lead the strategy and creative direction, then bring together the specialists your project needs, from brand and product design to websites, applications, content, development, and launch.",
    ],
  },
  ex: {
    navLabel: "Resume",
    eyebrow: "The professional version",
    headline: "We remember some of this differently.",
    intro: [
      "You never entirely understood what I did for a living. In fairness, it took a while before the work had recognizable job titles.",
      "Here is the version with clients, titles, and considerably better documentation.",
    ],
    // Same three facts as the professional Profile, told in the Ex register.
    // Nothing here contradicts the recruiter version: 20+ years, the same
    // disciplines, contract by choice, IBM across a decade, open to full-time.
    profile: [
      "Principal Experience Designer. That is the actual title, and it was roughly the job the whole time you were telling people I did “something with computers.” Twenty years of it now: enterprise products, AI, search, design systems, and all the parts of a product nobody notices until they are wrong.",
      "Particularly effective when the technology is new, nobody has decided what the thing is yet, and everyone is waiting for someone to say it out loud. You may remember this as a personality trait. It turns out there is a market for it.",
      "Contract by choice for most of that career, with one staff role along the way. So yes, I was freelance for most of the time you knew me, and no, it was not a phase I was going through. IBM kept calling back for ten years. Open to a full-time role now, for the right problem and the right team.",
    ],
  },
};
