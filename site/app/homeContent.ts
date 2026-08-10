import type { PersonaId } from "./personaStore";

/**
 * Homepage copy per persona. Transcribed verbatim from Anna's Figma Make
 * build (Homepage Variants Implementation), which is the source of truth for
 * this page's wording. Facts are identical across personas; only emphasis and
 * voice change.
 */

/**
 * A card's copy for one persona, holding only the fields that actually differ
 * from the default. Anything left out falls back, so a variant is a diff and
 * not a second copy of the card. Title, href, part and image never vary: the
 * work is the work, only the account of it changes.
 */
export type CaseVariant = {
  tag?: string;
  body?: string;
  outcome?: string;
};

export type CaseStudy = {
  href: string;
  tag: string;
  /** Set on the two IBM Concierge studies so the pair reads as one story. */
  part?: string;
  title: string;
  body: string;
  outcome: string;
  /** Optional card thumbnail. Falls back to the plain placeholder block when unset. */
  image?: string;
  /**
   * The defaults above are the recruiter's, because that is who they were
   * written for. A client asks a different question of the same card, not
   * "did this work and were you really the one who did it" but "what can you
   * do for me", so the client variant leads with the skill and lists
   * deliverables where the default lists validation.
   *
   * `ex` exists and is deliberately unused. Ex variants were written on
   * 2026-08-07 (plain-language bodies, tags rewritten as a timeline: "Chicago,
   * 2010", "Fintech, a long stretch") and removed the same day, because the
   * premise was wrong in a way worth recording.
   *
   * THE EX PERSONA IS NOT READ BY EXES. It is read by recruiters and clients
   * who saw the pill and could not resist, which probably makes it the most
   * clicked of the three. Writing its cards for an actual ex meant the version
   * most people open was the one where the evidence got thinner: vaguer dates,
   * no scope, no proof. A joke that costs you the work is not worth the joke.
   *
   * So the cards are identical across recruiter and ex, and that is also the
   * better idea. The persona sets the terms of the encounter and the work
   * refuses to play along. "It turns out I was busy" only lands because the
   * next thing you see is IBM, Nike and Bloomberg, described exactly as they
   * would be to someone hiring. If the cards wink too it collapses into a bit.
   * Keep the joke in the frame (hero, section headers, chat, footer) and leave
   * the evidence alone.
   */
  client?: CaseVariant;
  ex?: CaseVariant;
};

/**
 * Resolve a card for a persona. Falls back field by field rather than
 * requiring a whole variant, so a card with only a different tag is one line.
 */
export function caseFor(cs: CaseStudy, persona: PersonaId): CaseStudy {
  const v = persona === "client" ? cs.client : persona === "ex" ? cs.ex : null;
  if (!v) return cs;
  return {
    ...cs,
    tag: v.tag ?? cs.tag,
    body: v.body ?? cs.body,
    outcome: v.outcome ?? cs.outcome,
  };
}

export type HomeContent = {
  eyebrow: string;
  onboardingText: string;
  headline: [string, string];
  subtext: string;
  conciergeHeading: string;
  conciergeBody: string;
  conciergeAside?: string;
  prompts: string[];
  /**
   * Was hardcoded as "What I've been up to" in HomeBody. That phrasing is
   * written for the Ex — it implies absence — and read as a gap on the
   * recruiter page. Persona-switched as of this pass.
   */
  workEyebrow: string;
  casesHeader: string;
  /**
   * The About block on the homepage. Was hardcoded in HomeBody until
   * 2026-08-07, so all three personas read copy written for the recruiter.
   *
   * It is deliberately SHORT here. The long version belongs on /about, and a
   * homepage About block that satisfies is one that removes the reason to
   * click through. This one leads with the payoff and lets the link carry the
   * rest.
   */
  about: {
    eyebrow: string;
    headline: string;
    body: string[];
    pullquote: string;
    link: string;
  };
  /**
   * The label above the metadata line on every case card. Was hardcoded as
   * "Outcome" in HomeBody, which is a recruiter's question. The slot holds a
   * different question per persona, so the label has to move with it.
   */
  outcomeLabel: string;
  footerHeadline: string;
  footerBody: string;
  footerButton: string;
  /**
   * Where the primary button actually goes. Added 2026-08-07, because it used
   * to be hardcoded to /contact for everyone while the button said "Book a
   * time" — and /contact leads with a message form, offering "Book a call
   * instead" only as a secondary link. So the most committed visitor on the
   * page clicked a specific promise, landed on something else, and had to go
   * find the thing they had just asked for.
   */
  footerButtonHref: string;
  /**
   * The second path, when there is one. Recruiter and client already say
   * "Message me, OR book a time" in footerBody: the copy offered two routes
   * while the UI offered one button, so the other route was invisible.
   *
   * Optional on purpose. The Ex's footer is deliberately a single door ("if
   * you have a real reason to get in touch, I'm listening"), and pointing an
   * ex straight at a booking calendar is a different joke from the one that
   * persona is making.
   */
  footerSecondary?: { label: string; href: string };
};

/**
 * One booking link, defined once. It was already hardcoded in four other
 * places (ContactBody twice, AlmostAnnaChat's rate-limit message, and three
 * entries in pageContent), which is three too many for a URL that changes if
 * she ever moves scheduler.
 */
export const BOOKING_URL = "https://calendly.com/anna-rovedo/30min";

/**
 * Concierge and Journey Orchestration are one story told across two linked
 * pages (see docs/decisions-log.md, "Concierge case study split into two").
 * Kept in their own array, rendered as a connected 50/50 pair rather than
 * folded into the grid of independent case studies below — the split into
 * "part one" / "part two" only reads correctly if the layout treats them as
 * one unit. Neither card carries the old "featured" badge any more: a 50/50
 * pair has no room for one half to outrank the other. Order matters, part
 * one first. Restructured 2026-08-05.
 */
export const flagshipCaseStudies: CaseStudy[] = [
  {
    href: "/concierge",
    tag: "UX / Systems",
    part: "Part one",
    title: "IBM Chat Concierge",
    body: "The brief was a chatbot. The useful question turned out to be who was actually buying, so I designed for two people at once: the developer evaluating it and the manager who had to approve it. The guide runs from first look through demo, purchase and support. Sole UX designer, on a team led by IBM’s Global Head of UX.",
    outcome: "V1 shipped. Two buyer personas validated. Two rounds of user testing.",
    // concierge-card.webp is a PURPOSE-MADE 16:9 crop (2026-08-10) from the
    // hi-res demo capture, framed so the card fills edge to edge with UI and
    // conversation. Its two predecessors both failed in the card slot:
    // thumbs/concierge.jpg centre-cropped the Concierge bar out entirely, and
    // hero-demo.jpg carried its own dead space and cropped into a mess Anna
    // called ugly. Card images get their own crop; page figures do not moonlight
    // as thumbnails.
    image: "/case-study/concierge/concierge-card.webp",
    client: {
      tag: "AI product design",
      body: "IBM’s marketing site and its product were owned by different teams, so customers hit a seam halfway through buying. I designed a generative-AI guide that crosses it, from first look through demo, purchase, onboarding and support. Sole designer on it.",
      outcome: "Strategy, two validated personas, two rounds of testing, and the shipped V1.",
    },
  },
  {
    href: "/journey-orchestration",
    tag: "UX / Product",
    part: "Part two",
    title: "AI-driven journey orchestration",
    body: "I argued the chat was the wrong unit. If the assistant already knows who you are, the page should rearrange around that rather than host a conversation in a box, and the same signals should score the lead while it happens. I built the model and the case for funding it.",
    outcome: "Concept direction, not launched.",
    image: "/case-study/thumbs/journey-orchestration.jpg",
    client: {
      tag: "Product strategy",
      body: "Where the Concierge goes next. Instead of a chat sitting on the page, the page rearranges around what it learns about you, and scores the lead while it does it. I built the concept, the model under it, and the case for funding it.",
      // Stays honest. A client who later finds out this never launched will
      // discount everything else on the page, and the willingness to say so
      // is worth more than the card.
      outcome: "A concept direction and the argument for it. Not launched.",
    },
  },
];

/**
 * Independent case studies, each its own story, rendered as an equal-weight
 * row of three beneath the Concierge pair. Kmart joined this row on
 * 2026-08-05, folded in from its earlier separate "different register"
 * treatment — the homepage now groups case studies by structure (one story
 * in two parts, vs. standalone stories) rather than by register, since
 * Kmart, State Street and Search are the only three case-study pages that
 * exist outside the Concierge pair.
 */
export const supportingCaseStudies: CaseStudy[] = [
  {
    href: "/state-street",
    tag: "Design systems",
    title: "State Street Alpha",
    body: "The call I made early was to build the system before the screens, atomic and tokenized, so every team after me could ship without redrawing anything. The visual language became the North Star for State Street’s broader suite.",
    outcome: "Atomic, tokenized, 22 component categories, WCAG AA",
    image: "/case-study/thumbs/state-street.jpg",
    client: {
      tag: "Design systems",
      body: "I built the visual language for a fintech platform and the design system underneath it, atomic and tokenized, so every team after me could ship without redrawing anything. It became what the rest of State Street got measured against.",
      outcome: "A tokenized system, 22 component categories, WCAG AA, and the brand guide with it.",
    },
  },
  {
    href: "/search",
    tag: "UX / Search",
    title: "IBM Global Search",
    // REWRITTEN 2026-08-08. The card sold a different, smaller project than
    // the page delivers, and it was the one place this case study failed.
    //
    // It said "how customers find products across IBM’s catalog". The page
    // is not about a product catalogue: it is six destinations competing to
    // answer one question across products, documentation, support, learning
    // and developer content, collapsed into a single result set that is live
    // on IBM.com. The card shrank a whole-site search redesign to a catalogue
    // search.
    //
    // It led on "three-tier typeahead". The page calls that work "three
    // typeahead directions" and puts it in section 05 under a kicker reading
    // "Concept, not launched". The card presented the unshipped half as the
    // headline and left the shipped half out.
    //
    // And it claimed a "silent autocorrection principle" as an outcome. That
    // phrase appears nowhere on the page, nowhere in resumeData, and nowhere
    // in lib/almostAnna. A recruiter who clicked this card to see the named
    // principle found no trace of it, which is the worst possible outcome for
    // the one card on the site advertising a shipped, live, public product.
    //
    // The rule this restates: a card is a promise the page has to keep. Sell
    // what launched, name the unlaunched work on the page where there is room
    // to label it honestly.
    body: "Six tabs competed to answer one question: products, downloads, learning, support, developers, and an All that mixed them together. I led the UX from audit and research through to launch, and replaced them with one result set you can filter without losing your place.",
    outcome: "US-English MVP live on IBM.com. A three-tier typeahead and the silent-autocorrection principle, tested, not launched.",
    image: "/case-study/thumbs/search.jpg",
    client: {
      tag: "Search and IA",
      body: "People could not find things across IBM.com, which is a revenue problem before it is a design one. I ran the audit and the research, then designed the result experience that replaced six competing tabs with one filterable set. It is live.",
      outcome: "Audit, research, interaction design and prototyping, through to a launched MVP. Plus a three-tier typeahead, tested.",
    },
  },
  {
    href: "/kmart",
    tag: "Brand / Campaign",
    title: "SHHHHH",
    body: "A new business pitch to relaunch Kmart's clothing lines, built around the one thing nobody wanted to admit: shop there anyway. The same device runs across every surface, from the bag to the hangtags to the site.",
    outcome: "New business pitch. DraftFCB Chicago, 2010.",
    image: "/case-study/kmart/card-cover.png",
    client: {
      tag: "Brand and campaign",
      body: "Kmart’s clothes were fine and nobody would admit shopping there. I built the relaunch on the admission itself, and ran the same device across every surface, from the bag to the hangtags to the site.",
      outcome: "Positioning, art direction, and every surface it runs on. A pitch for DraftFCB Chicago.",
    },
  },
  {
    href: "/nike",
    tag: "UX / Research",
    title: "Nike Datalogue & Operations Workspace",
    body: "Forty specified search attributes, reduced to the five people actually used, built without access to a single end-user interview.",
    outcome: "Shipped. All four usability testers finished unaided.",
    image: "/case-study/nike/hero-w.png",
    client: {
      // The most persuasive card on the page for a client, because the
      // constraint is theirs too. Nobody has the research access they should
      // have, and this is the one card that says so out loud.
      tag: "Research under constraint",
      body: "Forty specified search attributes, and no access to a single end-user interview. I found the five people actually used, and designed the workspace around those.",
      outcome: "A shipped tool. All four usability testers finished it unaided, with no training.",
    },
  },
];

/**
 * Client logo strip. Every brand here is documented in docs/facts.md, either as
 * a named engagement or as a client of a named agency engagement. Order runs
 * from the enterprise product work outward to the earlier agency brands, so the
 * strip reads as positioning first and range second.
 *
 * Supersedes the earlier "approved six only" rule in decisions-log.md, which
 * was written before the CV was transcribed into facts.md. The six brands added
 * here were unverifiable then and are documented now.
 */
export type Client = { name: string; src: string };

export const clients: Client[] = [
  { name: "IBM", src: "/logos/logo-ibm.png" },
  { name: "LinkedIn", src: "/logos/logo-linkedin.png" },
  { name: "Nike", src: "/logos/logo-nike.png" },
  { name: "Bloomberg", src: "/logos/logo-bloomberg.png" },
  { name: "State Street", src: "/logos/logo-state-street.png" },
  { name: "Ford", src: "/logos/logo-ford.png" },
  { name: "USAA", src: "/logos/logo-usaa.png" },
  { name: "HP", src: "/logos/logo-hp.png" },
  { name: "eBay", src: "/logos/logo-ebay.png" },
  { name: "McDonald’s", src: "/logos/logo-mcdonalds.png" },
  { name: "Oreo", src: "/logos/logo-oreo.png" },
  { name: "Zara", src: "/logos/logo-zara.png" },
];

export const homeContent: Record<PersonaId, HomeContent> = {
  recruiter: {
    eyebrow: "Recruiter",
    // Was "I set this up to answer what you'd ask me on a first call." The
    // line renders directly under the persona pills, so the nearest
    // antecedent for "this" was the switcher, not the site — it read as a
    // comment about the buttons. "This version" is what the client line
    // already says, has an unambiguous referent (the pill you just picked),
    // and makes recruiter and client structurally parallel while the Ex
    // breaks the pattern on purpose.
    onboardingText:
      "This version answers what you’d ask me on a first call.",
    // Single-line headline: headline[1] is intentionally empty and the soft
    // span does not render. Client and Ex keep the two-part question/answer.
    headline: ["I design products, systems, and brands.", ""],
    subtext: "Twenty years, from Flash websites to AI.",
    conciergeHeading:
      "You don’t have to piece me together from a few case studies.",
    conciergeBody:
      "I gave an AI my work and my opinions and taught it how I talk. Ask it why I made a decision, what went wrong, or whether any of this fits the role you’re filling.",
    prompts: [
      "Which project should I visit?",
      "What kind of roles suit you best?",
      "How do you work when the roadmap isn’t clear?",
      "What do you bring that a resume won’t show?",
    ],
    workEyebrow: "Selected work",
    casesHeader: "This is the work I’d walk you through.",
    // Cut from ~200 words to two short paragraphs, and reordered so the proof
    // comes first. The old opener was "We get paid for output, so the years
    // that don't produce anything measurable tend to look like gaps" — a
    // defence, forty words before the payoff, against an accusation nobody
    // had made. It raised the possibility that the CV has holes so it could
    // then resolve it, which is the one thing docs/facts.md says never to do:
    // never invite doubt about the work. On /about that framing earns its
    // place, because the reader opted into the longer story and it gives that
    // story a shape. On the homepage it answers a question nobody asked.
    //
    // "the fashion years" also had to become "the years I spent in fashion".
    // Without the paragraph that used to precede it, the original phrase had
    // no antecedent — the same pronoun-without-a-referent problem as the
    // razor's "What I did for these" hint.
    about: {
      // "About" alone. "About Anna" put the name a fourth time on a page that
      // already carries it in the header lockup, in "Meet actual Anna", and in
      // "Almost Anna" — and this section is written in first person, so the
      // third-person heading was arguing with the paragraph beneath it.
      eyebrow: "About",
      headline: "I’ve worked in more than one field.",
      body: [
        "I was put on a Kmart pitch because of the years I spent in fashion, not in spite of them. The brief was to relaunch their clothing line, and I was the one who knew the category. Trends, objects, interfaces and products all come from the same human place, and you only see that if you have worked in more than one of them.",
        "I do the same thing now on harder problems, usually the ones that need conceptual clarity and serious design craft at the same time.",
      ],
      pullquote: "Culture is always the brief underneath the brief.",
      link: "More about me",
    },
    // A recruiter is asking whether it worked and whether you really did it.
    outcomeLabel: "Outcome",
    footerHeadline: "Have a role you think might fit?",
    footerBody:
      "Message me, or book a time and talk to the version that occasionally needs a minute to think.",
    footerButton: "Book a time",
    footerButtonHref: BOOKING_URL,
    footerSecondary: { label: "Message me", href: "/contact" },
  },

  client: {
    eyebrow: "Client",
    onboardingText: "This version answers what clients usually ask me first.",
    // Three versions, and the middle one is the cautionary tale.
    //
    // 1. "What are you trying to build?" — the most common headline on studio
    //    and consultancy sites, it put the work on the visitor before giving
    //    them a reason to do it, and it collided with footerHeadline, which
    //    asks nearly the same question in the same shape.
    //
    // 2. "I work on the parts nobody has figured out yet." — cut on the day
    //    it was written. It makes a claim about everyone else's inadequacy in
    //    order to make one about hers: confidence through comparison, where
    //    the whole voice is confidence through understatement. It is also
    //    unfalsifiable, which is the reliable tell for a boast. Worth leaving
    //    on the record because it is an easy line to write again.
    //
    // 3. "I work out what to build, then design it." — right instinct, one
    //    stop short. It ended at the design, and the design is no longer
    //    where her work ends.
    //
    // 4. The current one. The real answer to "what do I get" is now: a
    //    designed product AND a built one. She either directs the build or
    //    does it herself, so a client is not buying a deck, and not buying
    //    screens that then need an engineering budget to become real. That
    //    is a different category of hire from a design consultant, and the
    //    headline should say so before anything else on the page does.
    //
    //    "get them built" is deliberately agnostic about who does the
    //    building. It is true when she runs an engineering team and true
    //    when she builds it herself, and it does not over-claim to be an
    //    engineer. The specifics of how belong further down the page, not in
    //    an h1, where naming a particular tool would date the line badly.
    headline: ["I design products, and I can get them built.", ""],
    // THE SUBTEXT DOES NOT SELL. That is the whole rule here, and it took
    // four tries and one good catch from Anna to arrive at it.
    //
    // The versions that failed, in order: "I'm independent. I work with
    // product teams" (two flat facts answering a question nobody asked);
    // "I work inside product teams, not beside them" (fixed the overhead
    // worry, but foreclosed half the offer by implying embedding is the only
    // way to work with her); "Independent. I join a product team, or run the
    // project myself" ("myself" says solo, and solo is a ceiling a client
    // with real scope will notice); "Independent. I join a product team, or
    // bring one" (accurate, covers every case, and read as machine-written).
    //
    // That last failure is the instructive one. Set against the headline it
    // looked like this:
    //
    //     I design products, and I can get them built.
    //     Independent. I join a product team, or bring one.
    //
    // Identical shape twice: statement, comma, second clause that widens it,
    // landing on a short confident closer. Both lines straining to be
    // complete, leaving no engagement mode unmentioned. People do not write
    // two symmetrical lines in a row and do not answer everything before
    // being asked; they say one thing and let the rest come up in
    // conversation. Completeness plus symmetry is the tell.
    //
    // The recruiter pair never had this problem, because only its first line
    // sells and the second just rests on a fact. That asymmetry is what makes
    // it sound like a person. So this now borrows the recruiter's line
    // verbatim, which is legitimate: per the note at the top of this file the
    // facts are identical across personas, only emphasis and voice change.
    //
    // What this costs: the team point leaves the hero. It survives in the
    // third chat prompt ("Do you join our team, or bring your own?"), which
    // is arguably where it belonged all along, since it is an answer to a
    // question rather than an opening claim. If it must return to the hero,
    // put it in the headline and leave this line alone.
    //
    // Also kept quiet about AI, even though building with it is what makes
    // the headline's "get them built" possible at this scale. Leading with
    // the tool invites the wrong question ("is this AI slop?") before the
    // work has had a chance to answer it, and tool names age badly in a hero.
    // The proof is better made than claimed: this site was designed and built
    // exactly that way. If it should be explicit, the honest place is About
    // or a case study, where there is room to show rather than say.
    subtext: "Twenty years, from Flash websites to AI.",
    conciergeHeading:
      "You don’t need another portfolio where everything went perfectly.",
    conciergeBody:
      "I gave an AI my work and my opinions and taught it how I talk. Tell it what you’re working on. It’ll pull up the relevant projects and give you a fairly honest sense of how I’d think about it, including the parts I’d push back on.",
    prompts: [
      // Four prompts, four things a client is actually deciding: can she
      // handle ambiguity, is she right for this kind of problem, what does
      // having her around cost us, and how fast can we move.
      //
      // The third one used to be "Can you plug into an existing product
      // team?", which only asks about half the offer, and the half that
      // assumes the client already has a team. Widened 2026-08-07 so someone
      // with no design function sees their own situation in it too. "Plug
      // into" also undersold it; it is the language of a contractor filling a
      // gap rather than someone taking responsibility for an outcome. Phrased
      // to mirror the subtext above, so a client who noticed the claim there
      // finds the question waiting for them here.
      "We have no clear direction. Where do we start?",
      "What kinds of problems are you best at solving?",
      "Do you join our team, or bring your own?",
      "How quickly can we get to something testable?",
    ],
    workEyebrow: "Selected work",
    // The recruiter's "This is the work I'd walk you through" is right for
    // someone imagining an interview. A client is not imagining an interview.
    // They want to know whether their own situation is one she has been in,
    // so this frames the cases below as evidence rather than as a portfolio,
    // and demonstrates the positioning instead of asserting it.
    // Shortened from "Most of these started with a problem nobody could
    // describe yet." — 63 characters against the recruiter's 38 and the Ex's
    // 24, which set at a visibly different size in the same slot. Same claim,
    // and "somewhere unclear" is closer to how she actually talks than the
    // longer clause was.
    casesHeader: "Most of these started somewhere unclear.",
    // A client is not asking whether she is senior enough, they are asking
    // whether she will understand their problem. Same proof, but the second
    // paragraph names the sectors instead of the seniority, because "is she
    // done anything like mine" is the question actually being asked. The
    // eyebrow changes too: "About Anna" is a biography heading, and a client
    // is sizing up a working relationship.
    about: {
      // A label, not a sentence. This slot is an eyebrow: 11px, uppercase,
      // wide-tracked, sitting above a headline. "Who you'd be working with"
      // was 25 characters of set-in-caps text competing with the h2 under it
      // while the recruiter's said "About" in five.
      eyebrow: "About",
      headline: "I’ve worked in more than one field.",
      body: [
        "I was put on a Kmart pitch because of the years I spent in fashion, not in spite of them. The brief was to relaunch their clothing line, and I was the one who knew the category. Trends, objects, interfaces and products all come from the same human place, and you only see that if you have worked in more than one of them.",
        "Most of what I get called in for now is enterprise software, fintech, automotive and AI. It is the same habit, pointed at harder problems.",
      ],
      pullquote: "Culture is always the brief underneath the brief.",
      link: "More about me",
    },
    // A client is asking what they would be buying. The slot holds
    // deliverables, not validation, so the label names the transaction.
    outcomeLabel: "What I did",
    footerHeadline: "Tell me what you’re trying to figure out.",
    footerBody:
      "Message me, or book a time and tell the actual me what’s going on.",
    // Was "Start a conversation", which does not say what happens when you
    // press it, and sitting a few inches from a chat widget it reads as if it
    // opens the chat. Matches the recruiter's button, and now goes where it
    // says it goes.
    footerButton: "Book a time",
    footerButtonHref: BOOKING_URL,
    footerSecondary: { label: "Message me", href: "/contact" },
  },

  ex: {
    eyebrow: "Ex Boyfriend",
    onboardingText: "This was almost certainly not the button you were supposed to click.",
    // Two rewrites on 2026-08-07. First from ["What happened?", "You missed a
    // few seasons."] — the only two-part headline on the site, a setup and a
    // punchline using the soft span the other personas leave empty. It told
    // you a joke was happening. Then the two lines swapped, which is the
    // version below and the right one.
    //
    // The greeting leads because that is the actual first thing to say to
    // this visitor. He did not arrive wondering what she does for a living,
    // he arrived wondering whether this is going to be awkward, and the
    // headline answers the question he actually has. Setting the terms of
    // the encounter IS the work this hero has to do.
    //
    // The demotion is the good part. The subtext is now the recruiter's
    // headline verbatim plus one word, which means the whole pitch for a
    // stranger is the small print for someone who knew her. That is true,
    // and a reader feels it without being able to name it: to a recruiter
    // the career is the headline, to an ex it is a thing mentioned on the
    // way past. "now" still carries the gap, the implied "as opposed to
    // whenever you knew me", and the refusal to elaborate, in three letters.
    //
    // Structure holds across all three personas: line one works, line two
    // rests on a fact. Only the kind of work changes. Recruiter and client
    // open by selling, this one opens by disarming, and all three then stop
    // arguing and let a plain fact sit there.
    headline: ["It’s been a while… let’s not make it weird.", ""],
    subtext: "I design products, systems, and brands now.",
    conciergeHeading: "I had a feeling you’d show up eventually.",
    // Was "Since you're here — I gave an AI…". The em dash is the one hard
    // rule in docs/facts.md and this was the last one left in any persona's
    // copy. "Anyway." does the same work with a full stop: it is the verbal
    // shrug of someone who has just decided not to make it weird, which is
    // the exact instruction the subtext two lines up gives. A comma would
    // have been the safe swap, but the sentence already carries three of
    // them and a fourth turns the shrug into a clause.
    conciergeBody:
      "Anyway. I gave an AI my work, my history, and my opinions, then taught it how I think and talk. So it doesn’t just know things about me, it answers like me. Ask it almost anything.",
    // KEEP. This is the one place the Ex persona is allowed to be structurally
    // different from the other two, confirmed 2026-08-07 during a pass that
    // brought everything else into line. Do not remove it in a future parity
    // sweep: it is deliberate, not an oversight.
    //
    // It earns the exception by answering, in seven words, the only question
    // this visitor actually has when a chat window appears in front of them —
    // and by answering it as a joke, so the answer costs nobody anything.
    conciergeAside: "It has absolutely no opinions about you.",
    prompts: [
      "So what do you actually do now?",
      "How did you go from fashion to AI?",
      "Which project are you most proud of?",
      "Be honest. Was the frog actually real?",
    ],
    workEyebrow: "What I’ve been up to",
    casesHeader: "It turns out I was busy.",
    // The joke stays in the frame, the evidence stays straight — the same rule
    // that governs the case cards for this persona, and for the same reason:
    // recruiters and clients read this version too. So the headline and the
    // closing line carry the register, and the paragraph in between is the
    // identical argument the other two personas make. The headline is also
    // doing real work: someone who knew her then would remember the fashion
    // degree, so "I did end up using it" is both the joke and the thesis.
    about: {
      // Short label like the other two, with the persona in it rather than a
      // whole joke. Mirrors how workEyebrow works: recruiter and client share
      // a neutral label, the Ex gets its own, and all three stay label-length.
      eyebrow: "Since then",
      headline: "I did end up using the fashion degree.",
      body: [
        "I was put on a Kmart pitch because of the years I spent in fashion, not in spite of them. The brief was to relaunch their clothing line, and I was the one who knew the category. Trends, objects, interfaces and products all come from the same human place, and you only see that if you have worked in more than one of them.",
        "Enterprise software, fintech, automotive, AI. Not where I thought it was going either.",
      ],
      pullquote: "Culture is always the brief underneath the brief.",
      link: "The longer version",
    },
    // Deliberately the recruiter's label, because the ex persona now carries
    // the recruiter's cards verbatim. See the note on CaseStudy.ex.
    outcomeLabel: "Outcome",
    footerHeadline: "This is probably not that.",
    footerBody: "But if you have a real reason to get in touch, I’m listening.",
    // Two paths here as well, as of 2026-08-07, for the same reason the case
    // cards are identical to the recruiter's: this version gets read by people
    // who are not exes, and giving them a worse route to reach her is a real
    // cost paid for a joke nobody asked to pay for.
    //
    // The hierarchy is flipped rather than copied, which is the honest way to
    // keep the persona intact. The message form leads, because "if you have a
    // real reason to get in touch" points at writing something rather than at
    // putting time in a calendar. Booking is still right there for whoever
    // actually wants it.
    footerButton: "Contact, for real",
    footerButtonHref: "/contact",
    footerSecondary: { label: "Book a time", href: BOOKING_URL },
  },
};
