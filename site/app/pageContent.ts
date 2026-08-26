import type { PersonaId } from "./personaStore";

/**
 * Per-persona framing for Resume and Contact. About lives in aboutContent.ts.
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
    // "Leadership roles" read as wanting to manage people (Anna’s testing
    // note, 2026-08-19); principal says senior without saying manager.
    deck: "I am currently exploring full-time principal roles, advisory contracts, and selected collaborative projects.",
    fields: [
      { label: "Full name", placeholder: "Sarah Jenkins" },
      { label: "Work email", placeholder: "s.jenkins@firm.com" },
      { label: "Company / firm", placeholder: "Vanguard Recruiting" },
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
      // The resume, reachable from the contact page too (Anna’s testing
      // note, 2026-08-19: "link resume here too") — a recruiter mid-form
      // shouldn’t have to leave to double-check the CV.
      { label: "Resume", value: "Download resume", href: "/anna-rovedo-resume.pdf" },
      // "Professional network" pointed at an unclaimed LinkedIn vanity URL.
      // Removed 2026-08-07; put it back when linkedin.com/in/anna-paperpixel
      // actually resolves, or swap in the real profile URL.
    ],
  },

  client: {
    eyebrow: "Collaboration & consulting",
    // Reframed 2026-08-24 from external review (a VP reading as a buyer:
    // "On Contact - I would make it a bit more specific - right now it
    // reads as desperate. 'Taking on limited number of new clients that
    // xxxx'"). Open availability signals need; selective capacity signals
    // demand. The studio genuinely is one person who can only run a few
    // engagements at once, so the scarcity is true, not manufactured.
    headline: "Taking on a limited number of new clients",
    // Rewritten in the visitor’s direction (Anna’s testing note, 2026-08-19:
    // "It should be all about them"). The engagement-length range lives in
    // sideBody, stated once, matching engagements.ts.
    // The specificity half of the same note: name what the limited slots
    // are FOR, so the headline reads as a bar to clear rather than a
    // waiting room. Keeps "bring it in whatever shape it’s in" — the most
    // visitor-friendly line on the page — as the closer.
    deck: "The fit: product, brand, or campaign work that needs direction, whether a complex enterprise system or a new idea that needs a clear path to market. Bring it in whatever shape it’s in.",
    fields: [
      { label: "What’s your name?", placeholder: "Jane Doe" },
      { label: "Where should I reply?", placeholder: "jane@yourstartup.io" },
      {
        label: "Brief project overview",
        placeholder: "Modernizing an enterprise data layer and need…",
        multiline: true,
      },
      { label: "Expected timeline", placeholder: "Nov 2026 start, roughly 4 months" },
    ],
    submit: "Start a conversation",
    sideHeading: "How engagements work",
    // Rewritten 2026-08-18, external review: the old copy promised flat-rate
    // monthly billing, weekly sprints, daily Slack, and production-ready code
    // as if every engagement worked identically, which the three packages
    // say is not true. This describes the actual range and the actual next
    // step, and promises nothing a 2–3 week sprint would break.
    sideBody:
      "Engagements range from a focused 2–3 week direction sprint to 3–6 months of embedded design leadership. After a short working session, I’ll recommend the smallest useful engagement and send a clear scope, fee, decision-maker, and working rhythm.",
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
      { label: "Where do I reach you, assuming that is still current?", placeholder: "yourname@gmail.com" },
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
    // The About/Resume merge stands (2026-08-19), but the label stays
    // "Resume": Anna overruled "Experience" the same day, and rightly —
    // Resume is the word recruiters scan for.
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
