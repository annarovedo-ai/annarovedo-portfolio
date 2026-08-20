/**
 * Shared resume data: the structured CV content (expertise, experience,
 * earlier roles, education, and the default Profile paragraphs). Lives here,
 * separate from any one page, so /resume and the About page's embedded
 * resume (recruiter and ex personas) read from one source instead of two
 * copies that could drift apart.
 */

/**
 * BRAND AND CAMPAIGN IS A GROUP, NOT A WORD BURIED IN CRAFT.
 *
 * This list had three groups and thirteen items, of which exactly one --
 * "Visual Design", fifth of six in the last group -- pointed at anything
 * visual, and nothing at all pointed at campaign, art direction or concept
 * work. Set against a homepage that opens "UX is my specialty, not my
 * boundary", it contradicted the site's central claim: a recruiter skimming
 * the rail read a pure UX practitioner and stopped considering her for the
 * other half of her career.
 *
 * A heading is what gets skimmed, so the range needs one of its own rather
 * than a word tucked into a list about prototyping. Every item below is
 * evidenced in facts.md: Art Director at DraftFCB across Kmart, State Farm,
 * Jell-O, A1, Valspar and SC Johnson; 360 campaigns, outdoor, print and
 * animated banners; storyboards for McDonald's menu boards and for eBay and
 * KitchenAid pitches; interactive concepts with a writer for Oreo and Sour
 * Patch Kids; the West Indian Carnival identity; freelance Art/Creative
 * Director as Anna Rovedo Design, Inc.
 */
export const expertise = [
  {
    group: "Strategy",
    items: ["Future Vision", "Product Strategy", "Early Product Direction"],
  },
  /**
   * Renamed from "Experience", which sat inches from "Selected experience"
   * in the same column and made one word mean two things on one screen.
   *
   * Design Systems and User Research moved up out of Craft: they are the two
   * claims with case studies behind them (State Street is a design system,
   * Nike is a research story), and they were buried at the bottom of the
   * longest list. Craft is now hands-on output only.
   */
  {
    group: "Product",
    items: [
      "AI Experiences",
      "Search and Discovery",
      "Complex Enterprise UX",
      "Design Systems",
      "User Research",
      "Interaction Design",
    ],
  },
  {
    group: "Brand and Campaign",
    items: [
      "Creative Direction",
      "Campaign Concepts",
      "Visual Identity",
    ],
  },
  {
    group: "Craft",
    items: [
      "Prototyping",
      "Information Architecture",
      "Visual Design",
      "Data Visualization",
    ],
  },
];

export const experience = [
  {
    client: "IBM",
    role: "Principal Experience Designer",
    via: "A long-running relationship across several distinct engagements, initially through VSA Partners and later through Gather.",
    bullets: [
      "Shaped future-facing direction across AI experiences, global search, product discovery, and journey orchestration.",
      "Turned emerging technologies and abstract possibilities into experience visions and tangible prototypes.",
      "Used research to understand how people interpreted conversational and emerging interaction models.",
      "Helped multidisciplinary teams translate exploratory concepts into actionable product direction.",
      "Led experience design for IBM's C-suite partner ecosystem, including THINK Leaders, event experiences, digital tools, and supporting content.",
      "Created interactive experiences and visual guidance for IBM Watson and Watson Health.",
    ],
  },
  {
    client: "LinkedIn",
    role: "Senior Product Designer",
    bullets: [
      "Developed future-state concepts for publishing experiences and enterprise content workflows.",
      "Designed experiences supporting an Adobe Experience Manager migration.",
      "Reviewed design and implementation quality across complex workflows.",
      "Worked within a cross-functional product, design, engineering, and content environment.",
    ],
  },
  {
    client: "Nike",
    role: "Senior UX Designer",
    bullets: [
      "Designed enterprise products supporting complex internal operations and workflows.",
      "Translated specialized operational requirements into clear, scalable interfaces.",
      "Developed reusable interaction approaches across related product areas.",
      "Partnered with product and engineering through implementation.",
    ],
  },
  {
    client: "State Street Alpha",
    role: "Associate Creative Director and Lead UI Designer",
    via: "Through Publicis Sapient",
    bullets: [
      "Led UI design and established a coherent visual language across a complex financial platform.",
      "Helped create a design system spanning 22 categories of interface elements and patterns.",
      "Defined accessible approaches for information-dense workflows and financial-data visualization.",
      "Designed coordinated light and dark modes.",
      "Created brand, interface, and data-visualization guidance for the State Street Alpha platform.",
    ],
  },
  {
    client: "Bloomberg KYC",
    role: "Senior Art Director and Product Designer",
    via: "Through Isobar",
    bullets: [
      "Led UI design for Bloomberg's Know Your Client compliance product.",
      "Simplified complex review, documentation, and decision-making workflows.",
      "Created a comprehensive digital design system spanning iconography, interface components, style guidance, and quality-assurance standards.",
      "Developed reusable patterns to improve clarity and consistency across the product.",
      "Combined product design and art direction across information-dense enterprise experiences.",
    ],
  },
  {
    client: "Ford, Lincoln, and Mercedes-Benz",
    role: "Interaction and Visual Designer",
    via: "Through Razorfish",
    bullets: [
      "Designed dashboard-interface concepts for Ford and Lincoln vehicles.",
      "Created icons, layouts, interaction principles, and visual guidance for in-vehicle experiences.",
      "Developed information architectures for glanceable, context-sensitive interactions.",
      "Created interaction and visual prototypes for emerging automotive systems.",
      "Contributed interface work for Mercedes-Benz automotive experiences.",
    ],
  },
];

export const earlier = [
  {
    org: "Razorfish and Euro RSCG",
    role: "Freelance Art Director",
    body: "Digital campaigns, mobile experiences, brand concepts, and interactive design for State Farm and other consumer brands.",
  },
  {
    org: "Digitas",
    role: "Art Director",
    body: "Digital concepts, campaign work, interactive games, and touch-screen experiences for eBay, KitchenAid, Oreo, and Sour Patch Kids.",
  },
  {
    org: "Critical Mass",
    role: "Art Director",
    body: "A customizable banking dashboard for USAA, plus digital interface and visual-design work for Hewlett-Packard and Clorox.",
  },
  {
    org: "Arc Worldwide / Leo Burnett",
    role: "Art Director",
    body: "Interactive campaigns, digital brand experiences, and interface concepts for McDonald's, Norton Internet Security, and other consumer brands.",
  },
  {
    org: "Draftfcb",
    role: "Art Director",
    body: "Art direction, digital campaign design, mobile concepts, and integrated advertising for State Farm and other brands.",
  },
  {
    org: "Edelman Interactive",
    role: "Interactive Designer",
    body: "Web experiences and visual guidance for the National Dairy Association, Clorox, Wrigley, and Burger King.",
  },
];

/**
 * The professional Profile. Used by every persona that does not override it in
 * pageContent, so the facts stay in one place. Paragraph three frames the length
 * of the client list before a reader can mistake it for short tenure, grounded
 * in facts.md: contractor everywhere except DraftFCB (2008), open to full-time.
 */
export const defaultProfile = [
  "Principal Experience Designer with more than 20 years across enterprise UX, future-facing concepts, AI, search, design systems, visual identity, advertising, and fashion. Combines product strategy, systems thinking, and visual craft to carry ideas across digital and physical touchpoints.",
  "Particularly effective when the technology is new, the problem is still taking shape, and teams need a direction they can examine, test, and turn into a roadmap. Leads the design direction on the work itself and stays hands-on through it.",
  "Contract by choice for most of that career, with one staff role along the way. That is why the client list runs long and the strongest engagements repeat: IBM came back across a decade. Open to a full-time role now, for the right problem and the right team.",
];

export const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    detail: "BFA, Graphic Design",
  },
  {
    school: "Felicidad Duce School of Design and Fashion",
    detail: "Masters in Fashion Design, Barcelona",
  },
  {
    school: "Buenos Aires",
    detail:
      "Postgraduate programs in couture sewing and product development, alongside a year designing and producing a runway collection",
  },
];
