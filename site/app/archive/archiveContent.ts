/**
 * The archive: everything real that doesn't have a full case study.
 *
 * Merged 2026-08-05 from two previously separate systems: the homepage's
 * "Other work" cards (thin engagements with real facts.md backing, formerly
 * in otherWorkContent.ts) and this page's pre-2011 groups. Anna pointed out
 * that visitors had no way to know the "Other work" tier and the archive
 * tier were different things, since both are "real work, no full case
 * study" at the same weight. They're one tier now, rendered as one grid,
 * with an individual page per project at `/archive/[slug]`.
 *
 * Nike was pulled out of this list the same day and promoted to a full case
 * study (see homeContent.ts): its page has real research, testing and a
 * shipped outcome, closer to the four flagship case studies than to a
 * paragraph-and-a-photo entry.
 *
 * Every description is written from what's documented: the extracted images
 * plus docs/facts.md for the older groups, docs/live-site-inventory.md for
 * the newer client work. Where the brief, agency, or outcome is unknown, the
 * copy does not speculate.
 */

export type ArchiveEntry = {
  slug: string;
  client: string;
  meta: string;
  body: string;
  role?: string;
  /** Full-size images, in display order. Omitted where none exist yet. */
  images?: { src: string; alt: string }[];
  /** Optional Vimeo embed, rendered above the image gallery. */
  video?: { vimeoId: string; title: string };
  /** Links out to a full case study instead of the entry's own /archive/[slug] page. */
  href?: string;
  hrefLabel?: string;
};

export type ArchiveGroup = {
  id: string;
  kicker: string;
  heading: string;
  intro: string;
  entries: ArchiveEntry[];
};

const img = (src: string, alt: string) => ({ src, alt });

export const archiveGroups: ArchiveGroup[] = [
  {
    id: "clients",
    kicker: "Named engagements",
    heading: "More client work",
    intro:
      "Real, documented engagements that don't have the research, decisions, and outcome depth a full case study promises. Some are recent and just haven't been written up yet; a few have real images below.",
    entries: [
      {
        slug: "bloomberg",
        client: "Bloomberg",
        meta: "Isobar · Compliance product",
        body: "Led UI design for Bloomberg's Know Your Client compliance product and built the design system behind it: iconography, components, style guidance and QA standards, developed alongside Bloomberg's in-house engineering team.",
        role: "Senior Art Director and Product Designer",
        images: [
          img("bloomberg/summary.webp", "Entity Exchange company profile summary screen, showing entity type, investment manager, master and feeder structure"),
          img("bloomberg/hierarchy.webp", "Entity Exchange hierarchy view with a control-responsibility diagram and a tooltip showing percentage of control"),
          img("bloomberg/hierarchy-landing.webp", "Entity Exchange hierarchy landing state prompting a user to create an entity hierarchy diagram"),
          img("bloomberg/auto-match.webp", "Diagram of the Auto-Match process moving data between banks, brokers and hedge funds through Entity Exchange"),
        ],
      },
      {
        slug: "west-indian-carnival",
        client: "West Indian Carnival",
        meta: "Visual identity",
        body: "A full identity system: logo, color palette, a pattern library, a custom typeface, posters, banners, an Instagram filter and a brochure. Whether this was client work or self-directed isn't documented here. Ask if it's relevant.",
        images: [
          img("carnival/cover.png", "A carnival performer in green and pink feathers and a jeweled headpiece and collar, smiling"),
          img("carnival/brochure.webp", "Taste West Indian Carnival trifold food vendor guide with a map of the tasting route down Eastern Parkway"),
          img("carnival/banners.webp", "DANCE and WEST INDIAN CARNIVAL lamp post banners on a street pole"),
          img("carnival/stationery.webp", "West Indian Carnival letterhead, business cards and envelope"),
          img("carnival/instagram-filter.webp", "West Indian Carnival Instagram camera filter mockup on a phone screen"),
          img("carnival/poster.webp", "Experience West Indian Carnival subway platform poster"),
        ],
      },
      {
        slug: "sour-patch-kids",
        client: "Sour Patch Kids",
        meta: "Digital product · Interactive spot",
        body: "Concept and execution for an interactive digital vending-machine screen. Brainstormed with a writer, pitched the client, then executed the vision and produced the assets for animation.",
        images: [
          img("sour-patch-kids/vending-machine.webp", "Diji-touch digital vending machine mockup with a person walking past"),
          img("sour-patch-kids/storyboard.webp", "Eight-panel storyboard for the Sour Patch Kids joy-buzzer spot: first they're sour, then they're sweet, sour sweet gone"),
        ],
      },
      {
        slug: "watson-health",
        client: "IBM Watson Health",
        meta: "IBM · Brand and digital",
        body: "IBM.com experiences, social templates, a brand book for Simpler Consulting, and downloadable media templates for the Watson Health brand team, across a six-plus year IBM relationship.",
        video: { vimeoId: "451881924", title: "IBM Watson Works Readiness Quiz" },
        images: [
          img("watson-health/brand-guidelines.gif", "Simpler by IBM Watson Health brand guidelines: brand hierarchy, logo use, color use, and applications across web, events and collateral"),
          img("watson-health/templates.webp", "Grid of Watson Health social and presentation templates across four color themes"),
        ],
      },
      {
        slug: "think-leaders",
        client: "IBM THINK Leaders",
        meta: "VSA Partners · Brand and digital",
        body: "THINK Leaders is a community for current and aspiring C-suite executives seeking insight on business and technology, with peer connections and access to special events for approved executive members. As creative and art director, responsible for the visual branding, direction and tone, plus overseeing the programming and production of all associated materials: the website and portal, event app, illustration library, weekly email newsletter, Twitter and LinkedIn graphics, real-time infographics produced during events, and printed materials for event promotion.",
        role: "Creative Director, VSA Partners",
        images: [
          img("think-leaders/cio-leadership-app.webp", "Berlin CIO Leadership event app screens: agenda, attendees, speakers and messages"),
          img("think-leaders/website.webp", "THINK Leaders website on IBM.com with a leadership-role personalization dropdown"),
          img("think-leaders/pattern-library.webp", "Illustrated pattern library used across THINK Leaders touchpoints"),
          img("think-leaders/article-and-pdf.webp", "THINK Marketing how-to article and its downloadable PDF version"),
          img("think-leaders/brochure.webp", "THINK Marketing tri-fold brochure"),
        ],
      },
      {
        slug: "usaa",
        client: "USAA",
        meta: "Critical Mass · Digital product",
        body: "A customizable banking dashboard built around movable tiles, plus icon illustration and modular design.",
        images: [
          img("usaa/dashboard.webp", "USAA My Accounts dashboard with banking, insurance and services tiles"),
          img("usaa/market-news.webp", "USAA Market News widget in expanded and collapsed states across indices, news and analysis tabs"),
          img("usaa/place-a-trade.webp", "USAA Place a Trade widget flow from selecting a stock through purchase confirmation"),
        ],
      },
      {
        slug: "think-2019",
        client: "IBM Think 2019",
        meta: "IBM · Event and conference",
        body: "Maps, the conference guide, apparel and merchandise, event branding, wayfinding signage and a bus wrap for IBM's Think 2019 conference.",
        images: [
          img("think-2019/think-mark.webp", "Abstract particle rendering of the Think 2019 mark in IBM blue"),
          img("think-2019/site-map.webp", "Think 2019 campus site map alongside a rendering of the map on a large outdoor sign"),
          img("think-2019/conference-guide.webp", "Think 2019 conference guide book cover and an interior wayfinding spread"),
          img("think-2019/lanyards.webp", "Think 2019 attendee badges on IBM-branded lanyards"),
          img("think-2019/bus-wrap.webp", "VMware-sponsored bus wrap for Think 2019"),
        ],
      },
      {
        slug: "ford",
        client: "Ford, Lincoln, Mercedes-Benz",
        meta: "Razorfish · Vehicle interface",
        body: "Interaction and visual design for the in-vehicle touchscreen dashboard: icons, layouts, interaction principles and a style guide for glanceable, context-sensitive use behind the wheel. Oversaw implementation and prepared production assets for the engineering team.",
        images: [
          img("ford/console-detail.webp", "Touchscreen home screen rendered in the physical center console"),
          img("ford/touchscreen-states.webp", "Grid of six in-vehicle touchscreen states: audio, volume, connected services, phone, navigation and climate"),
          img("ford/day-night-mode.webp", "Audio screen shown side by side in night and day display modes"),
        ],
      },
      {
        slug: "hp",
        client: "Hewlett-Packard",
        meta: "Critical Mass · Website",
        body: "Content layout and graphics for the Cloud and Security sections of hp.com.",
        images: [
          img("hp/cover.png", "HP Security and Risk Management page detail: a man in a plaid shirt carrying a server, with stat callouts for attack throughput, correlation speed and storage reduction"),
        ],
      },
      {
        slug: "lightpost",
        client: "Lightpost",
        // TODO, Anna: the agency. She confirmed this was client work through an
        // agency, but neither the live site nor docs/live-site-inventory.md
        // recorded which one, and every sibling in this group carries the
        // attribution ("Isobar · Compliance product", "Critical Mass ·
        // Website"). Swap "Agency engagement" for the name when she has it.
        // Not guessed, per this file's rule at the top.
        meta: "Agency engagement · Brand and product",
        // Rewritten 2026-08-08. The old copy described what the app was ABOUT
        // and said nothing about the design, on the one entry that
        // docs/live-site-inventory.md calls "the only piece that is brand plus
        // product on one thing, which is the shape of work she described
        // wanting". Everything below is visible in the images.
        body: "Brand and product design for an app that helps people think through big life decisions: changing careers, caregiving, moving, having children. A lightpost points the way, so the arrow became the mark, the shape every screen is built from, and the control you press to move forward. One idea doing the branding and the navigation at once.",
        role: "UX/UI, branding and creative direction",
        // Wired up 2026-08-18 from the two exports Anna supplied. NOTE: the
        // stale 01.png and 02.png sitting beside these in
        // site/public/archive/lightpost/ are a Nike screenshot pair and a
        // State Street dashboard, uploaded there by mistake and never
        // referenced. Delete them; nothing points at them.
        images: [
          img("lightpost/tablet.png", "The Lightpost opening screen on a tablet held in two hands: the green arrow form filling the screen, the headline Discover what you want most out of your work, and a Get Started action"),
          img("lightpost/screens.png", "Four screens of the onboarding carousel side by side: Discover what you want most out of your work, Change is good, The journey from scientist to teacher, and Get clear on what you want, with the arrow motif carrying the navigation across all four"),
        ],
      },
    ],
  },

  {
    id: "agency",
    kicker: "Chicago",
    heading: "Agency work",
    intro:
      "Art direction and design across advertising, retail, packaging, digital and broadcast. Campaigns that had to work in a magazine, on a shelf, in a banner and on a phone, usually at the same time.",
    entries: [
      {
        slug: "kmart",
        client: "SHHHHH",
        meta: "DraftFCB · New business pitch",
        body: "A campaign to launch Kmart's redesigned clothing lines, built around the one thing nobody wanted to admit. This one has a full write up.",
        role: "Art director and designer",
        href: "/kmart",
        hrefLabel: "Read the case study",
        images: [
          img("kmart-kmart1.jpg", "The SHHH.com login screen"),
          img("kmart-kmart3.jpg", "The pink Kmart bag with the logo taped over"),
        ],
      },
      {
        slug: "statefarm",
        client: "State Farm",
        meta: "DraftFCB · Campaign and digital",
        body: "Outdoor, transit, display and mobile for a brand competing on price against much louder spenders. The strongest run of it put the message where the person already was: expressway banners naming the expressway, a stadium board about the ninety thousand people around you, a shelter poster about standing there waiting.",
        role: "Art director. Imagery and animation storyboards; copy by the writer.",
        images: [
          img("statefarm-statefarm6.jpg", "Vertical banners pairing presidents on currency with Chicago expressway names"),
          img("statefarm-statefarm7.jpg", "Stadium board reading: now that you're surrounded by 90,000 neighbors"),
          img("statefarm-statefarm8.jpg", "Bus shelter poster addressing someone waiting"),
          img("statefarm-statefarm3.jpg", "Discount Double Check display banners"),
          img("statefarm-statefarm5.jpg", "Motorcycle insurance landing page"),
          img("statefarm-statefarm2.jpg", "Mobile screens showing discount and coverage messaging"),
        ],
      },
      {
        slug: "a1",
        client: "A1",
        meta: "DraftFCB · Shopper marketing",
        body: "In-store work built around a line about ownership: it's your chicken, it's your right. Shelf talkers, produce and meat case takeovers, on-pack and point of sale, designed to catch someone already holding a basket.",
        role: "Art director",
        images: [
          img("a1-a4.jpg", "Produce display with A1 bottles and the line: open a bottle, open your mind"),
          img("a1-a5.jpg", "Meat case takeover reading: it's your chicken, it's your right"),
          img("a1-a2.jpg", "Shelf strip with A1 bottles and shelf talkers"),
          img("a1-a3.jpg", "A1 bottle with on-pack tag"),
        ],
      },
      {
        slug: "jello",
        client: "Jell-O",
        meta: "DraftFCB · Integrated campaign",
        body: "Track the Happy, a campaign with a live counter at the middle of it. A running national tally carried onto a billboard, a microsite mapping it by region, and street level media reporting the same number back.",
        role: "Art director and designer",
        images: [
          img("jello-jello3.jpg", "Billboard showing a live counter reading 162,027,863"),
          img("jello-jello1.jpg", "Campaign microsite with a US map and regional content"),
          img("jello-jello4.jpg", "Street banner: team happy was here"),
          img("jello-jello2.jpg", "Hello Jell-O identity"),
        ],
      },
      {
        slug: "scjohnson",
        client: "SC Johnson",
        meta: "DraftFCB · Campaign",
        body: "An ingredient transparency campaign for a company that wanted to publish what was in its products before it had to. Handwritten type and photography, arguing honesty as a product feature rather than a policy statement.",
        role: "Art director and designer",
        images: [
          img("scjohnson-scj1.jpg", "Advertisement: it's an ingredient called honesty"),
          img("scjohnson-scj2.jpg", "Companion execution: we're not a company, we're a family"),
        ],
      },
      {
        slug: "meow-mix",
        client: "Meow Mix",
        meta: "Del Monte · Shopper marketing",
        body: "Coupon and cross-promotion work sold into the aisle, pairing cat food with a household product on the theory that the same person buys both.",
        role: "Designer",
        images: [
          img("meow-mix-meow1.jpg", "Coupon layout offering money off Meow Mix treats"),
          img("meow-mix-meow2.jpg", "Cross-promotion pairing Meow Mix with a fabric sweeper"),
        ],
      },
      {
        slug: "norton",
        client: "Norton",
        meta: "Arc Worldwide / Leo Burnett · Digital",
        body: "Media placements built around the thing they were interrupting rather than dropped on top of it. A Pandora unit about hearing something you don't want to hear, and a Hulu takeover about what gets between you and what you came for.",
        role: "Art director",
        images: [
          img("norton-norton1.jpg", "Pandora ad unit: there are some things no one likes to hear"),
          img("norton-norton3.jpg", "Hulu page takeover for Norton"),
          img("norton-norton4.jpg", "Norton support page layout"),
        ],
      },
      {
        slug: "motorola",
        client: "Motorola",
        meta: "Campaign · Display",
        body: "Banner work for the MOTONAV personal navigation device, around a line about discovery rather than directions: the best spots aren't mapped, they're found.",
        role: "Art director and designer",
        images: [img("motorola-moto.jpg", "Four MOTONAV banner executions")],
      },
      {
        slug: "kfc",
        client: "KFC",
        meta: "Promotion · Digital",
        body: "A product launch promotion and the homepage takeover that carried it, built to survive being seen for about two seconds inside somebody else's page.",
        role: "Designer",
        images: [
          img("kfc-kfc1.jpg", "KFC Twister promotional site"),
          img("kfc-kfc2.jpg", "Newspaper homepage takeover"),
        ],
      },
      {
        slug: "valspar",
        client: "Valspar",
        meta: "Digital product",
        body: "A colour tool rather than an advertisement. Pick a colour, name it, describe it in your own words, and put it on a shared wall. Closer to product design than anything else on this page.",
        role: "Designer",
        images: [
          img("valspar-valspar1.jpg", "Valspar colour picker interface with a colour wheel and swatch wall"),
          img("valspar-valspar2.jpg", "Companion site layouts"),
        ],
      },
    ],
  },

  {
    id: "apparel",
    kicker: "Italy, Spain",
    heading: "Apparel graphics and brand",
    intro:
      "Six years designing for clothing brands before advertising. Print and embroidery artwork, hangtags, woven labels, in-store graphics and full identity systems. This is where the instinct for the object in someone's hand came from, and it is the reason I was pulled onto fashion briefs years later.",
    entries: [
      {
        slug: "stradivarius",
        client: "Stradivarius",
        meta: "Inditex · Apparel graphics",
        body: "Print and positional graphics for a fast fashion label: repeating patterns, placement illustration, lettering and seasonal motifs, drawn to survive being scaled, recoloured and reprinted across a range.",
        role: "Apparel graphics designer",
        images: [
          img("stradivarius-str11.jpg", "Girls Gold script lettering illustration"),
          img("stradivarius-str2.jpg", "Ornate owl illustration"),
          img("stradivarius-str13.jpg", "Pink snake print repeat"),
          img("stradivarius-str6.jpg", "Lightning bolt repeat pattern"),
          img("stradivarius-str10.jpg", "Ornamental outerwear illustration"),
          img("stradivarius-str1.jpg", "Polaroid camera illustration reading click whirrr"),
          img("stradivarius-str5.jpg", "Speech bubble pattern of yes and no"),
          img("stradivarius-str8.jpg", "Line drawn portrait illustration"),
        ],
      },
      {
        slug: "woolrich",
        client: "Woolrich",
        meta: "Bologna · Apparel graphics",
        body: "Artwork for an Italian-made luxury line under an American heritage brand. Screen print and embroidery graphics, garment illustration, hangtags and woven labels, and in-store and window graphics.",
        role: "Graphic designer",
        images: [
          img("woolrich-wool2.jpg", "Woolrich sun and motorcycle graphic"),
          img("woolrich-wool3.jpg", "Proud to be a Woolrich farmer's daughter lettering"),
          img("woolrich-wool1.jpg", "Two hooded sweatshirts carrying applied graphics"),
          img("woolrich-wool4.jpg", "Hangtag designs for a classic rugby shirt"),
          img("woolrich-wool5.jpg", "Woven and printed label designs"),
        ],
      },
      {
        slug: "encuentro",
        client: "Encuentro",
        meta: "Barcelona · Brand identity",
        body: "A full identity for a clothing label and its sub-brand: pattern system, hangtags, woven labels, size and care marking, worked out as one family rather than a logo with applications bolted on afterwards.",
        role: "Designer",
        images: [
          img("encuentro-encuentro3.jpg", "Encuentro Collection hangtags and labels"),
          img("encuentro-encuentro5.jpg", "Encuentro Basics label system"),
          img("encuentro-encuentro1.jpg", "Floral repeat pattern in brown and cream"),
          img("encuentro-encuentro2.jpg", "Line drawn botanical repeat"),
        ],
      },
    ],
  },

  {
    id: "other",
    kicker: "Elsewhere",
    heading: "Editorial and personal",
    intro:
      "Work that does not belong to a client list and is still the clearest evidence of how I think about type, image and craft.",
    entries: [
      {
        slug: "duchamp",
        client: "Marcel Duchamp",
        meta: "Book design",
        body: "An editorial volume on Duchamp. Contents, essay setting, plates and running furniture, designed so the argument is easy to follow and the images are given room to be looked at.",
        role: "Designer",
        images: [
          img("duchamp-duch3.jpg", "Spread with Fountain plated full bleed opposite supporting images"),
          img("duchamp-duch2.jpg", "Essay spread with marginal images"),
          img("duchamp-duch1.jpg", "Contents spread"),
          img("duchamp-duch4.jpg", "Plate and caption spread"),
        ],
      },
      {
        slug: "faa",
        client: "Wire drawings",
        meta: "Poster panels",
        body: "Line drawings made in wire and photographed in place, so the drawing sits in the real scene rather than on top of it. A figure at a piano, a building outlined against the street it replaced, a dancer mid extension.",
        role: "Concept, fabrication and art direction",
        images: [
          img("faa-faa1.jpg", "Wire figure seated at a grand piano"),
          img("faa-faa2.jpg", "Wire outline of a building standing in a streetscape"),
          img("faa-faa3.jpg", "Wire figure of a dancer in a dark interior"),
        ],
      },
    ],
  },
];

/** Flat lookup used by the /archive/[slug] detail page. */
export function findArchiveEntry(slug: string): ArchiveEntry | undefined {
  for (const group of archiveGroups) {
    const entry = group.entries.find((e) => e.slug === slug);
    if (entry) return entry;
  }
  return undefined;
}
