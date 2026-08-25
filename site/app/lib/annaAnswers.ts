import type { PersonaId } from "../personaStore";

/**
 * Canonical answers to the printed prompts.
 *
 * The four chips beside the chat are the highest-traffic questions on the
 * site and, for most visitors, the first thing Almost Anna ever says. Left to
 * the model they were improvised fresh every time: same question, different
 * answer, different emphasis, occasionally a different claim. That is the one
 * place variance actually costs something.
 *
 * So these are written, not generated. When a visitor clicks a chip, the API
 * returns the text below word for word and never calls the model. Anything
 * they type themselves still goes to Haiku as before.
 *
 * The wording is drawn from the ANSWERING THE OPENING QUESTIONS guidance in
 * almostAnna.ts, which stays in place: it still governs free-form questions,
 * and it is the source these were written from. If a fact changes, change it
 * in both.
 *
 * HOUSE STYLE: no em dashes, commas and full stops. The chat route strips em
 * dashes from model output for this reason; these are written without them so
 * nothing needs stripping.
 *
 * A null answer means "no canonical version, let the model handle it". All
 * twelve printed prompts currently have approved answers.
 */

/**
 * An image a canned answer can carry (2026-08-24, from LukeW's "Ask LukeW"
 * retrieval write-up: "some questions are best answered visually, and the
 * response should be an image, not a paragraph describing one"). On a
 * visual designer's portfolio, a text-only answer about the Kmart campaign
 * is the wrong medium. The image links into its case study, so the chat
 * demonstrates the work AND routes the visitor to it.
 *
 * Curated per answer, never model-attached: the model cannot add images,
 * only prewritten answers carry them, so nothing can pair the wrong image
 * with a claim. Assets are the same 480px webp variants the homepage cards
 * already ship, so no new files and no heavy payloads.
 */
export type ChatImage = {
  src: string;
  alt: string;
  /** Case study the image belongs to; the whole figure links here. */
  href: string;
  /** Link label under the image, e.g. "View the Kmart case study". */
  label: string;
};

export type CannedAnswer = {
  question: string;
  answer: string | null;
  image?: ChatImage;
};

export const cannedAnswers: Record<PersonaId, CannedAnswer[]> = {
  recruiter: [
    {
      question: "Which project best shows how you think?",
      answer:
        "IBM Chat Concierge, if the role involves shaping an undefined product. IBM knew the ambition: a concierge across all of IBM.com, through the whole customer journey. What was unsettled was the interaction model. I designed a bottom-docked input so it read as a tool for working something out, not another support bubble, then tested the concept and turned it into the north star the live chat is moving toward.\n\nIf you want the same thinking carried through brand, campaign, and physical execution, ask about the Kmart pitch next.",
      image: {
        src: "/case-study/concierge/concierge-card-hero-480.webp",
        alt: "IBM Chat Concierge concept on an IBM.com product page",
        href: "/concierge",
        label: "View the Concierge case study",
      },
    },
    {
      // Question reframed 2026-08-19 (Anna: make the breadth a positive
      // callout, not a red flag to explain). The answer is her locked copy,
      // reordered so the first line answers the new question directly;
      // every sentence is from the previous version.
      question: "What did working across so many brands teach you?",
      answer:
        "A different customer and a different set of constraints every time. Dashboard interfaces for Ford, compliance software for Bloomberg, a financial platform for State Street, a relaunch pitch for Kmart: that pattern recognition is what lets you get a grip on an ambiguous problem.\n\nThe logos stack up because of contracting, by choice. Agencies bring you in when something has to get made, and twenty years of that adds up.\n\nThese days the preference is depth over breadth: long, embedded engagements where you get to know a product and its users properly. IBM is the proof, roughly eleven years of them coming back. That includes full time, for the right fit.",
    },
    {
      question: "How do you work when the roadmap isn’t clear?",
      answer:
        "Explore widely before converging, and connect ideas from places that look unrelated. Then get to something tangible fast, because an argument about an abstraction never ends.\n\nAfter that, user testing. I think of it as borrowing someone else’s perspective for a while. Task completion matters, but I also watch where people hesitate and what they read differently than I expected, because that reshapes the idea instead of just validating it.\n\nThe skill that matters most in that situation isn’t having answers ready. It’s working out which question is actually worth answering, because the stated brief is rarely the real one.",
    },
    {
      question: "What kind of role are you actually looking for?",
      answer:
        "Open to full time now, for the right problem and the right team, and open to contract.\n\nI’d rather be embedded and long term than on short deliverable projects, because depth in a product and its users is where the work gets good. I want to own the direction: set the north star, make the calls, stay close to the craft. A role that includes managing a team is on the table.\n\nI’m happiest at the start of an undefined problem, ideally with emerging technology and real ambiguity in it.",
    },
  ],

  client: [
    {
      question: "Where should this project start?",
      answer:
        "Usually with a question nobody’s settled yet: what problem is actually being solved, and for whom. Sounds obvious, and it’s the thing most often skipped, because it’s easier to argue about pixels than to agree on the point.\n\nGetting it wrong is expensive later. Everything downstream, the scope, the medium, what good looks like, is a guess until it’s answered.\n\nSo tell me what you’re trying to launch, fix, or figure out, and I’ll tell you which question I’d want answered first on something like it, and why that one comes before the others.",
    },
    {
      question: "Can you do the campaign and the product?",
      answer:
        "Yes, and it’s fair to want evidence rather than assurance.\n\nProducts and systems: IBM, LinkedIn, Nike, State Street, Bloomberg. Campaigns and brand: the Kmart relaunch pitch at DraftFCB, McDonald’s, Oreo, Zara, plus twenty-plus years across advertising, products, brand, and fashion: full 360 marketing campaigns, outdoor, social, storyboards and launch sites. And alongside all that, a fashion design career across Italy, Spain, Argentina and New York.\n\nThe through line: I start with the problem and choose the medium around it.",
      image: {
        src: "/case-study/kmart/card-cover-480.webp",
        alt: "Kmart SHHHHH campaign: duct tape over the label",
        href: "/kmart",
        label: "View the Kmart case study",
      },
    },
    {
      question: "Can you lead the work and bring the right team?",
      answer:
        "Yes. Paper Pixel is a registered studio, which matters practically: several enterprise clients will engage a studio where they won’t engage an individual.\n\nI lead every engagement myself and bring in trusted specialists when the work needs them. Writers, developers, researchers, motion. You deal with the same person the whole way through, from the first strategic question to what actually ships.",
    },
    {
      question: "How soon can I see something real?",
      answer:
        "Early, and that’s a working method rather than a sales line. Abstract debate doesn’t converge, so I get to something you can react to quickly and we argue about that instead.\n\nPrototypes tested with real people are the unit of progress. From there it moves between exploration, prototyping, research and refinement until the team actually believes in it.\n\nI’d rather not promise a number of days before knowing what it is. Tell me the shape of the problem and I can be specific.",
    },
  ],

  ex: [
    {
      question: "So what do you actually do now?",
      answer:
        "Design work. A studio called Paper Pixel, mostly US clients, mostly the problems that haven’t taken shape yet. AI experiences, search, complicated enterprise products. IBM has kept coming back for eleven years.\n\nAlso, I taught an AI to talk like me, and you’re currently finding out how well that works.",
    },
    {
      question: "How did you go from fashion to AI?",
      answer:
        "It wasn’t a pivot, because the digital work never stopped. It funded the curiosity.\n\nI went to Italy after college and did design work, kiosks, websites, then graphics for Woolrich. That work paid for a master’s in fashion in Barcelona, then postgraduate couture and pattern making in Buenos Aires. Then I designed coats in New York for a few months and discovered that not every passion should become a job. That sentence cost me several years. You can have it for free.\n\nThe through line was culture, and how people signal things to each other. That transfers to products more cleanly than anyone expects.",
    },
    {
      question: "Which project are you most proud of?",
      answer:
        "The IBM Chat Concierge. Not for how it looks.\n\nIBM had a clear ambition, a concierge for an entire website rather than a box on one page, before anyone knew what it should look like. It turned into something a team could test and argue with. That became the north star, and I spent the time after the pitch moving the live chat toward it.\n\nThat’s apparently the thing I’m good at. Turning up before there’s a product and working out what it should be.",
    },
    {
      question: "Be honest. Was the frog actually real?",
      answer: "Yes. The frog was real. That is the complete answer.",
    },

    // THE EX PRESET BANK (Anna, 2026-08-19, approved as written). Off-topic
    // relationship questions with locked deadpan answers, served verbatim by
    // exact match so generation never improvises personal history. One of
    // these rides each page’s hint bar in Ex mode; the rest are here so a
    // typed version of any of them also hits the preset. These are the ONLY
    // sanctioned relationship material: near-misses that don’t exact-match
    // still get the model’s two-sentence boundary, never an extension of
    // these.
    {
      question: "Did you know I’d click “Ex-Boyfriend”?",
      answer: "Yes. Recruiter never stood a chance.",
    },
    {
      question: "Do you remember me the way I remember you?",
      answer: "Probably not. Memory is a terrible co-author.",
    },
    {
      question: "Do you think I changed?",
      answer: "You found my portfolio and clicked “Ex-Boyfriend.” The evidence is mixed.",
    },
    {
      question: "Would you answer me now?",
      answer: "You are being answered by a carefully governed simulation. Read into that what you will.",
    },
    {
      question: "Do you still love me?",
      answer: "In the way you love a finished chapter. Quietly, and from a distance.",
    },
    {
      question: "Did you ever wonder what would have happened?",
      answer: "Of course. Curiosity is not the same as regret.",
    },
    {
      question: "Did I get a nickname in the group chat?",
      answer: "Not one you need to know.",
    },
    {
      question: "Did your mom say “I told you so”?",
      answer: "She had the good manners not to say it out loud.",
    },
    {
      question: "Can I have those Korean horror movie DVDs back?",
      answer: "They have been accruing storage fees.",
    },
    {
      question: "Would you swipe right on me now?",
      answer: "I would read the bio this time.",
    },
    {
      question: "Did you keep one thing on purpose?",
      answer: "Yes. Perspective.",
    },
    {
      question: "Do I count as an ex-boyfriend?",
      answer: "If you have to ask, you probably count.",
    },
    {
      question: "Did you delete my Netflix profile immediately?",
      answer: "Immediately would suggest haste. I was thorough.",
    },
    {
      question: "Did you finish the series without me?",
      answer: "Yes. It was the closure available at the time.",
    },
    {
      question: "Do you still have my mug?",
      answer: "No. I have boundaries now.",
    },
    {
      question: "Did you ever figure out whose charger that was?",
      answer: "It was mine. I have documentation.",
    },
    {
      question: "Did you ever check whether I got married?",
      answer: "Once. You seemed fine. That was enough research.",
    },
    {
      question: "Did you ever date someone normal after me?",
      answer: "Briefly. It lacked narrative momentum.",
    },
    {
      question: "Did I ruin an entire personality type for you?",
      answer: "No. I simply learned to identify it faster.",
    },
    {
      question: "Which friend was happiest when we broke up?",
      answer: "There was competition.",
    },
    {
      question: "Did you ever write to me and not send it?",
      answer: "Yes. Deleting it was the most mature part.",
    },
    {
      question: "Do you ever look me up?",
      answer: "Once. Research, not longing.",
    },
    {
      question: "Did you keep any photos?",
      answer: "A few. I am sentimental, not reckless.",
    },
    {
      question: "Did you ever almost call?",
      answer: "Yes. Then the feeling passed.",
    },
    {
      question: "Am I still blocked?",
      answer: "You found the website, so clearly the perimeter needs work.",
    },
    {
      question: "Do you still have my hoodie?",
      answer: "Possession is nine-tenths of the law.",
    },
    {
      question: "Did I ruin that song for you?",
      answer: "For a while. It recovered.",
    },
    {
      question: "Did you know it was over before I did?",
      answer: "Yes. I was waiting for the rest of us to catch up.",
    },
    {
      question: "Was it really my fault?",
      answer: "Not entirely. That is the most generous answer available.",
    },
    {
      question: "Do you regret meeting me?",
      answer: "No. I regret the extended edition.",
    },
    {
      question: "Were you waiting for me to apologize?",
      answer: "No. Waiting would imply I put my life on hold.",
    },
    {
      question: "Who moved on first?",
      answer: "I stopped keeping score. That was the moving-on part.",
    },
    {
      question: "Did you keep the playlist?",
      answer: "Yes. It aged better than parts of the relationship.",
    },
    {
      question: "Did you ever reread the messages?",
      answer: "Once. Everyone was very young, including the punctuation.",
    },
    {
      question: "Did you ever tell your friends I was right?",
      answer: "No. I was not trying to frighten them.",
    },
    {
      question: "Do you remember the last thing I said?",
      answer: "Yes. It improved with silence.",
    },
  ],
};

/**
 * THE HINT SCRIPT BANK (2026-08-19, Anna: "make sure all of the question
 * prompts asked has a pre-scripted answer"). Shared across personas: the
 * per-section hints are about the work, and the facts do not change with
 * the reader. Every sentence is sourced from the case studies and the
 * locked chip material; the release test walks the app and fails if any
 * hint lacks a script. Lives in this file so the module stays free of
 * runtime imports (the node test runner loads it directly).
 */
export const sharedHintAnswers: CannedAnswer[] = [
  // ---- Homepage, recruiter ----
  {
    question: "Which case study best shows how Anna thinks?",
    answer:
      "Depends what you’re hiring for. For future vision and AI, start with the IBM Chat Concierge: a concierge for all of IBM.com that became the north star the live chat is iterated toward.\n\nFor a concept designed all the way down, the Kmart pitch: a campaign about a secret, worked out to the level of the shopping bag. If your role is more defined than either, the Global Search redesign is the shipped, measurable one.",
    image: {
      src: "/case-study/concierge/concierge-card-hero-480.webp",
      alt: "IBM Chat Concierge concept on an IBM.com product page",
      href: "/concierge",
      label: "View the Concierge case study",
    },
  },
  {
    question: "Who has Anna designed for?",
    answer:
      "IBM across eleven years of engagements, LinkedIn, Nike, Bloomberg, State Street, Ford, and earlier agency work for McDonald’s, Oreo, Zara and others.\n\nContract by choice for most of that career, which is why the list runs long and the strongest engagements repeat.",
  },
  {
    question: "What kind of role is Anna looking for?",
    answer:
      "Open to contract, and open to full time for the right problem and the right team. I’d rather be embedded and long term than on short deliverable projects.\n\nWhat I want most is to own the direction: set the north star, make the calls, stay close to the craft. Happiest at the start of an undefined problem, ideally with emerging technology in it.",
  },

  // ---- Homepage, client ----
  {
    question: "How can we start working together?",
    answer:
      "Three ways in. A direction sprint of two to three weeks for something important but poorly defined. Embedded design leadership for three to six months when you want me inside the team. A defined engagement of six to twelve weeks for a platform, design system, website, brand or campaign.\n\nAfter a short working session I’ll recommend the smallest useful engagement and send a clear scope, fee, decision-maker and working rhythm.",
  },
  {
    question: "Which case study should I start with?",
    answer:
      "Start with the one closest to your problem. A complex platform or design system: State Street. Search and findability: IBM Global Search. Brand and campaign: the Kmart pitch. AI in your product: the IBM Chat Concierge.\n\nIf you’re not sure which shelf your problem sits on, that’s normal, and it’s usually where I start.",
  },
  {
    question: "How would a project move from brief to launch?",
    answer:
      "Understand the real problem first: what needs to change, who it’s for, what already exists. Then a clear direction you can react to early, because abstract debate never converges. Prototypes, tested with real people, are the unit of progress.\n\nFrom there it’s iteration between exploration, prototyping, research and refinement until the team believes in it, and I stay through detailed design and implementation.",
  },
  {
    question: "Who would lead the work?",
    answer:
      "I do, the whole way through. Paper Pixel is a registered studio, and I bring in trusted specialists when the work needs them, but you deal with the same person from the first strategic question to final delivery.\n\nNobody hands your project to a team you never met.",
  },
  {
    question: "What should I include when I reach out?",
    answer:
      "The situation as it exists: what you’re trying to launch, fix or figure out, a rough timeline, and who decides. A messy brief is fine. Defining the thing is part of the work, not a prerequisite for it.",
  },

  // ---- Concierge ----
  {
    question: "Why not just a chatbot?",
    answer:
      "Because the ambition was bigger than a widget. This was a concierge for IBM.com as a whole, a sales and support partner across the entire customer journey, before a purchase and after it.\n\nA chatbot answers questions on one page. This had to hold up for every kind of visitor at every stage, and that difference is what made it worth designing.",
  },
  {
    question: "What was your role?",
    answer:
      "Sole UX designer on the concept, on a team led by IBM’s Global Head of UX. I designed the interaction model, built the prototypes for both buyer personas, and ran the two rounds of testing that validated the pitch.\n\nAfter that I spent my time moving the live chat toward the vision.",
  },
  {
    question: "What did mapping the journeys reveal?",
    answer:
      "That the useful question wasn’t what the tool should do. It was who was actually buying. Mapping awareness through demo, purchase, onboarding and support surfaced two different people: the developer evaluating the product and the manager who had to approve it.\n\nDesigning for both at once is what shaped the whole concept.",
  },
  {
    question: "Why put the input at the bottom?",
    answer:
      "Because where the input sits tells people what the thing is before they read a word. ChatGPT, Claude and Perplexity all run the input along the bottom, and that placement reads as a tool you use to work something out. A bubble in the corner reads as support, and people already know how to dismiss it.\n\nThe Concierge was doing more than support, so it went along the bottom.",
  },
  {
    question: "What did the prototype have to prove?",
    answer:
      "Three things: could buyers follow the model, did they trust what it was doing, and did they want to keep going. The prototype existed to answer those with evidence rather than enthusiasm.\n\nThe signal was strong enough to earn the next iteration, and testing has continued since in partnership with a dedicated researcher.",
  },
  {
    question: "What did testing show?",
    answer:
      "Two rounds of unmoderated testing, fifteen participants evaluating the prototype as real buyers. The rounds were built to answer whether buyers understood the model, trusted it, and wanted to continue.\n\nThe signal was strong enough to move the work forward, and it became the foundation for ongoing research on the live experience.",
  },
  {
    question: "When did AI stop being just a feature?",
    answer:
      "When the question changed from what the chat could answer to what the whole page should do about it. That’s the moment the assistant stopped being a box beside the content and started becoming the operating system of the experience.\n\nThat reframe is what grew into the journey orchestration work.",
  },
  {
    question: "How did the north star become buildable?",
    answer:
      "Piece by piece. The vision didn’t ship wholesale, and was never meant to: it became the target the live chat was iterated toward. Concepts from the prototype landed along the way: conversation history across sessions, prompt hints so an empty field explains itself, AI summaries on Product Finder and the handoff question beneath them.\n\nThat’s what a north star is for. Not shipping it. Steering by it.",
  },
  {
    question: "Why did this become journey orchestration?",
    answer:
      "Because once the assistant worked, the honest next question was whether it should be a box on the page at all. If the system knows what a visitor needs, why is the page still the same for everyone?\n\nSo I set the next goalpost myself: pages that reorganize around each visitor’s journey. That track is concept direction, and it’s where the thinking goes next.",
  },
  {
    question: "What did this change about how you design AI?",
    answer:
      "It taught me to design the relationship, not the feature. The interesting decisions weren’t about answers. They were about where the thing sits, when it speaks, how much room it takes, and when it hands you to a person.\n\nEvery AI project since starts from those questions, including the chat you’re using right now.",
  },

  // ---- Journey Orchestration ----
  {
    question: "Why wasn’t a chatbot enough?",
    answer:
      "Because a chatbot is a box the page tolerates. It sits beside the content, waiting to be dismissed, while the page shows everyone the same thing.\n\nThe premise here is different: the same signals a conversation produces can drive the page itself. Sections reorder, content changes, and the assistant is woven in rather than boxed beside it.",
  },
  {
    question: "Why did journey orchestration matter now?",
    answer:
      "Because generative AI made it buildable. Pages that adapt to a visitor have been an idea for a long time; what changed is that a system can now read intent from behavior and respond in real language, in real time.\n\nWhen the technology catches up to an old idea, that’s exactly the moment to design what it should become.",
  },
  {
    question: "What is journey orchestration?",
    answer:
      "A page that rebuilds itself around your journey. Sections reorder based on what you care about, the assistant is part of the page rather than a box on it, and the same behavioral signals feed a live lead model while it happens.\n\nOne experience doing the guiding, the selling and the qualifying at once.",
  },
  {
    question: "How does the page adapt?",
    answer:
      "It follows behavioral signals: what you read, what you skip, what you ask. The concept follows a persona through a session where sections reorder around his interest, content changes depth as his intent sharpens, and signing in becomes something he wants to do because it creates an artifact worth keeping.\n\nThe page pays attention so the visitor doesn’t have to navigate.",
  },
  {
    question: "When does it hand off to a person?",
    answer:
      "When the signals say the visitor is ready, not before. The same behavior that shapes the page feeds a lead model, and a qualified lead gets a warm handoff to a human with the context attached.\n\nThe point is that nobody gets ambushed by sales for reading a page.",
  },
  {
    question: "What would you test first?",
    answer:
      "The riskiest assumption: that people are comfortable with a page visibly responding to them. Everything else is engineering; that one is trust.\n\nI’d prototype the reordering moment and watch where people hesitate, because if adaptation reads as surveillance instead of service, the rest of the concept doesn’t matter.",
  },

  // ---- Search ----
  {
    question: "What job was search really doing?",
    answer:
      "Covering for everything the site hadn’t made findable. People search when there’s no clear way forward, and on IBM.com that means products, documentation, support, learning and developer content all at once.\n\nThe old experience exposed the org chart instead of absorbing it, and that’s the job the redesign took on.",
  },
  {
    question: "Why were there six searches?",
    answer:
      "Because the interface mirrored IBM’s content categories: All, Products and services, Downloads, Learning, Support and documentation, For developers. Each tab had its own behaviors, filters, counts and dead ends.\n\nOne query became six different searches, and people had to guess where IBM had classified the answer before they could find it.",
  },
  {
    question: "What did research change?",
    answer:
      "It grounded every decision in observed behavior. I audited result types for gaps in hierarchy, labeling and filter clarity; Sally, our researcher, ran the studies; my job was turning what she found into changes a team could build.\n\nThen I tested my own screens, because synthesis is a guess until somebody who’s never seen the page tries to use it.",
  },
  {
    question: "Which decisions mattered most?",
    answer:
      "One ranked result list instead of six tabs, and single-select filters. That second one looks small and wasn’t: the visible control was simple, but the questions underneath about cross-category ranking and feasibility paused prototyping until they were resolved.\n\nRecognizable content types, continuous results and recovery paths carried the rest.",
  },
  {
    question: "What about zero results?",
    answer:
      "A dead end is a design problem, not an edge case. The zero-results experience was redesigned as part of the shipped system: when search has nothing to offer, it suggests a next step instead of apologizing.\n\nAnd when intent is obvious, it corrects the misspelling and returns the right results without making you manage the mistake.",
  },
  {
    question: "What did production reveal?",
    answer:
      "The quality gaps only real use exposes. After a dark launch, the experience moved to US-English traffic, and production showed what came next: promoted results needed accurate labels, query terms needed consistent emphasis, and globalization was still ahead.\n\nThat’s what an MVP launch is for. It tells you the truth.",
  },
  {
    question: "Why test typeahead separately?",
    answer:
      "Because it answers a different question: whether search can help people form intent before they ever reach a results page. We tested three levels, from simple completion to guided tasks to a richer discovery surface.\n\nIt stayed concept work alongside the shipped result list, and it earned its own testing because bundling it would have muddied both answers.",
  },
  {
    question: "How do you test AI?",
    answer:
      "The same way you test anything, with the humility turned up. Something that answers back can be wrong in fluent sentences, so you watch comprehension and trust, not just completion: where people hesitate, what they double-check, what they believe too easily.\n\nTask success tells you it works. Watching tells you whether anyone should rely on it.",
  },
  {
    question: "What would you do differently?",
    answer:
      "I’d push harder, earlier, on the ranking questions behind the simple controls. The single-select filter debate paused prototyping because the hard questions surfaced late, and late is expensive.\n\nThe interface decisions held up. The lesson was about sequencing the invisible ones.",
  },

  // ---- State Street ----
  {
    question: "What was actually broken?",
    answer:
      "Nothing scannable. The brief, verbatim: enable users to get a quick snapshot of the most important information at a glance, and easily deep-dive into areas of interest or concern.\n\nOperations managers, oversight teams and analysts each open Alpha for a different reason, at two speeds of attention: the daily scan and the focused investigation. The platform had the data and no visual language for either.",
  },
  {
    question: "Why does type matter in finance?",
    answer:
      "Because trust is typographic here. Get the details wrong and users stop trusting the numbers. A decimal point can change the meaning of an entire row, and red meaning four different things makes misreading easy.\n\nSo type, color and spacing were decided against live data in a working prototype, not settled in the abstract.",
  },
  {
    question: "How did users shape this?",
    answer:
      "Directly. An operations manager with twenty years at State Street asked for a system that shows only what her team needs, integrates the common tools, and is smart enough to automate the repetitive parts. An oversight manager needed one place to see and route a problem. An analyst needed a faster way through funds with thousands of assets.\n\nTwo speeds of attention, three jobs, one system.",
  },
  {
    question: "Why two color modes?",
    answer:
      "Because the platform lives in both. The same information architecture, component behavior and semantic color roles carry into light and dark environments, proven against a dense final dashboard: KPIs, allocation, movers, a growth chart, a holdings table.\n\nSystem proof, not a cosmetic re-theme. If the meaning changes when the mode does, the system failed.",
  },
  {
    question: "Why build a design language?",
    answer:
      "Because screens don’t scale and rules do. One good dashboard helps one team; a language of tokens, components and semantic roles lets dozens of workflows get built without inventing a new product language screen by screen.\n\nEvery tile is a named component pulling from a live data source, which is what let one system serve the whole platform.",
  },
  {
    question: "How does the color system work?",
    answer:
      "Three brand colors anchor it, and every other hue is derived from them, calculated into full tint stacks. Semantic states, neutral text and chart series each get their own palette so one hue never carries two meanings, and every swatch is documented against AA and AAA contrast.\n\nThe strictest rule: red and yellow are reserved for errors and warnings, system-wide. When a cell turns red, it’s never ambiguous.",
  },
  {
    question: "How did the design system survive implementation?",
    answer:
      "By being built where systems usually die. Decisions were made against live data in a working prototype, every component was named and mapped to its data source, and the rules were documented well enough for teams to follow without me in the room.\n\nThe work reached implementation and set the direction for State Street’s broader suite. The engagement was the system, and the system was delivered whole.",
  },
  {
    question: "How did it become a shared decision-making system?",
    answer:
      "Because the rules answered arguments before they started. When color, type and spacing each have one documented job, a debate about a screen becomes a lookup instead of a taste contest.\n\nEach level inherits the decisions beneath it: flexible enough to compose, constrained enough that teams can’t drift into private languages. That’s when a style guide becomes infrastructure.",
  },

  // ---- Nike ----
  {
    question: "Why did one question take three tools?",
    answer:
      "To find out if product was available, a specialist ran reports in SAP AFS, cross-referenced a separate reporting tool, then returned to the order they were building and hoped they remembered where they were.\n\nFragmented tools, delayed orders, lost revenue. That was the problem statement I put in front of stakeholders, in almost those words.",
  },
  {
    question: "How did you reach the users?",
    answer:
      "Standard interviews weren’t open to me on this project, and designing from assumptions wasn’t an option for a feature whose whole premise was that nobody knew what people really searched for.\n\nSo I ran a workshop to surface what the team believed, then went around it: a survey straight to marketplace operations distribution lists. Forty-seven working staff described their own job in their own words.",
  },
  {
    question: "What was the contradiction?",
    answer:
      "On the same wall, in the same session: missing fields that are important, pinned beside having too many options. Add fields and you’re cluttered; remove them and you’ve broken someone’s workflow.\n\nThat contradiction was the design problem, and it couldn’t be solved by opinion. Both groups were right. They needed different depths of the same tool.",
  },
  {
    question: "How did forty become five?",
    answer:
      "By asking instead of arguing. The requirements listed roughly forty searchable attributes. A second survey asked working staff for their top four in order of importance, and the answers converged hard: material number, plant code, ISEG, quality, quantity.\n\nThose five became the default panel. The other thirty-five moved behind See More Filters, one click away, taken from no one.",
  },
  {
    question: "What did usability testing validate?",
    answer:
      "Four users, five tasks, all completed unaided, including finding how many size large were available on December 26th. It shipped that way.\n\nThe quiet bonus: all four wanted saved filter sets on the flyout, which confirmed the first concept hadn’t been a dead end. It just had a different job than I first thought.",
  },

  // ---- Kmart ----
  {
    question: "What was the real problem?",
    answer:
      "Reappraisal, not product. Kmart had built a New York design studio and genuinely relaunched the clothing, but most people didn’t know Kmart sold clothes, nobody knew they’d changed, and the customers who did buy them wouldn’t say so out loud.\n\nNo amount of advertising argues someone out of embarrassment. The campaign had to flip it instead.",
  },
  {
    question: "What can four days produce?",
    answer:
      "A full campaign platform. DraftFCB flew about fifteen creatives from four countries into Chicago, Thursday through a Monday-night pitch: three teams on the same brief from different angles, creative directors circulating to keep the stories from converging, one final day to sharpen it all into the pitch.\n\nI was in the room for my fashion background, from years of apparel work in Italy and Spain.",
  },
  {
    question: "Why make it a secret?",
    answer:
      "Because the embarrassment was real, and denying it would have failed. The idea flipped it: if saying where the dress came from is the problem, make not saying it the brand.\n\nSHHH, a members-only line you had to be let into. The point isn’t that nobody can know. It’s that not everybody does. Exclusivity, not shame management.",
  },
  {
    question: "Why a password?",
    answer:
      "Because being let in was the product. A gated site makes membership literal: insider content, member photos, the look of the day, all behind a door.\n\nEvery locked door does two jobs. It keeps the secret, and it makes the people inside feel like the secret is theirs.",
  },
  {
    question: "How far did the tape concept go?",
    answer:
      "All the way down. Duct tape over the logo, over the hangtag, over the model’s mouth. The K rebuilt in strips of tape, the shopping bag with SHHH taped across the label, the site’s wordmark on a strip of tape.\n\nOne device carrying the whole idea, which is what a campaign needs: the concept should survive being shrunk to a bag.",
  },
  {
    question: "How did the reveal work?",
    answer:
      "You find out where it came from after you’ve already decided you want it. Unbranded popup stores stocked with the new lines, nothing in the room saying Kmart, tape over every hangtag. You judge the clothes as clothes, you buy, and outside you peel the tape off the bag.\n\nEvery other surface rehearses that move at lower stakes: the ads withhold, the site gates, the bag holds it to the door.",
  },
  {
    question: "Why did the campaign need this much detail?",
    answer:
      "Because the idea only works if every surface keeps the promise. A secrecy campaign with the logo on the bag is dead on arrival, so the bag was designed. So were the hangtags, the store, the site, the reveal.\n\nThe medium has to support the message all the way down, or the message is just a headline.",
  },

  // ---- This Site ----
  {
    question: "Why three versions?",
    answer:
      "Because a recruiter, a client and one hypothetical ex arrive with different first questions, and pretending otherwise wastes everyone’s first minute. Same facts in every version; only the emphasis and the voice change, which is the honesty test.\n\nMost portfolios ask you to take the case studies on faith. This one hands you the working product.",
  },
  {
    question: "How does this thing work?",
    answer:
      "At IBM I designed a concierge that helps buyers evaluate complex software. This is the same pattern applied to a harder subject: me.\n\nIt’s trained on my work history, case studies and opinions, and it answers the way I talk. The bar along the bottom reads whichever section you’re viewing and offers a question about it.",
  },
  {
    question: "What did the AI actually do?",
    answer:
      "The leverage, not the judgment. I designed the system, wrote the copy and built the product in the same working sessions, with Claude as the pair. Strategy and craft never changed hands.\n\nThe code carries its own design rationale in comments, so every decision is written down where the next person would trip over it.",
  },
  {
    question: "Why so few colors?",
    answer:
      "So each one can carry information instead of decoration. Round means choose. Orange means press. Headlines work, subtexts rest.\n\nNone of those rules is precious alone; what makes them a system is that they hold everywhere. It’s the same discipline I build into client design systems, at portfolio scale, where you can check it against every screen you have.",
  },
  {
    question: "When does a persona-based site make sense?",
    answer:
      "When distinct audiences genuinely arrive with different first questions, and you can serve them different emphasis without changing a single fact. If the versions would need different truths, you don’t have personas, you have a problem.\n\nFor one audience with one question, it’s theater. Skip it.",
  },

  // ---- Archive ----
  {
    question: "What else have you made?",
    answer:
      "Twenty years of it. Museum installations and interactive kiosks in Bologna, Woolrich’s Italian luxury line, Inditex in Barcelona, dashboards for Ford and Lincoln, compliance software for Bloomberg, campaigns for McDonald’s and Oreo, and a stretch of fashion design across Italy, Spain, Argentina and New York.\n\nThe archive holds what the case studies don’t. It’s the range, documented.",
  },

  // ---- Canonical copies ----
  // These two hints reuse printed-chip wording, but the chip answers live in
  // the recruiter persona list and About/Resume are visible to every
  // persona. The text here MUST stay byte-identical to the recruiter chip
  // answers in annaAnswers.ts; the release test enforces the match.
  {
    question: "How do you work when the roadmap isn’t clear?",
    answer:
      "Explore widely before converging, and connect ideas from places that look unrelated. Then get to something tangible fast, because an argument about an abstraction never ends.\n\nAfter that, user testing. I think of it as borrowing someone else’s perspective for a while. Task completion matters, but I also watch where people hesitate and what they read differently than I expected, because that reshapes the idea instead of just validating it.\n\nThe skill that matters most in that situation isn’t having answers ready. It’s working out which question is actually worth answering, because the stated brief is rarely the real one.",
  },
  {
    question: "What did working across so many brands teach you?",
    answer:
      "A different customer and a different set of constraints every time. Dashboard interfaces for Ford, compliance software for Bloomberg, a financial platform for State Street, a relaunch pitch for Kmart: that pattern recognition is what lets you get a grip on an ambiguous problem.\n\nThe logos stack up because of contracting, by choice. Agencies bring you in when something has to get made, and twenty years of that adds up.\n\nThese days the preference is depth over breadth: long, embedded engagements where you get to know a product and its users properly. IBM is the proof, roughly eleven years of them coming back. That includes full time, for the right fit.",
  },

  // ---- About ----
  {
    question: "Why not just pick one discipline?",
    answer:
      "Because the problem comes first and the medium follows. My background runs graphic design, fashion, advertising and digital products; UX became the deepest specialization because it’s the broadest way to solve complex problems.\n\nThe range isn’t indecision. It’s what lets me recognize when the answer needs to extend beyond a screen.",
  },
  {
    question: "How does the fashion training show up in the work?",
    answer:
      "As culture-reading, mostly. Fashion taught me that culture is always the brief underneath the brief: how people signal things to each other, what an object says before anyone reads a word.\n\nThat transfers to products more cleanly than anyone expects, and the digital work never stopped anyway. It funded the curiosity.",
  },

  // ---- Resume ----
  {
    question: "Are you open to full-time roles?",
    answer:
      "Yes, on the record: open to full time now, for the right problem and the right team, and open to contract. I’d rather go deep and long than short and shallow either way.\n\nA role that includes managing a team is on the table. What matters most is owning the direction and staying close to the craft.",
  },
  {
    question: "Which skill should be weighted most heavily?",
    answer:
      "Finding the question worth answering. The stated brief is rarely the real one, and the expensive mistakes happen before anyone opens a design tool.\n\nEverything on this resume serves that: research to locate the real problem, prototyping to make it arguable, testing to check the answer against people instead of opinions.",
  },

  // ---- Client variants on the case studies ----
  {
    question: "Could an assistant like this work on our site?",
    answer:
      "If your visitors arrive with questions your pages don’t answer in order, probably yes. The honest first step isn’t building a chat. It’s mapping the journey to find where people actually get stuck, which is exactly where the IBM work started.\n\nA direction sprint answers whether it’s worth doing before you commit to doing it.",
  },
  {
    question: "Is my product ready for something like this?",
    answer:
      "The prerequisite isn’t technology, it’s signal: do you know what visitor behavior tells you about intent? If yes, a page that adapts is buildable. If no, that’s the first project, and it’s smaller than you think.\n\nEither way the entry point is the same: a short working session, and I’ll tell you honestly which project you actually have.",
  },
  {
    question: "How would you approach our search?",
    answer:
      "Audit first: what people search for, what they get, and where the dead ends are. The IBM work started exactly there, and the findings drove everything: one ranked list, filters that don’t lose your place, recovery instead of apology at zero results.\n\nSearch problems are diagnosable fast. A few weeks of looking usually tells you what a year of building should do.",
    image: {
      src: "/case-study/search/search-card-hero-480.webp",
      alt: "IBM Global Search redesign: one filterable result list",
      href: "/search",
      label: "View the Search case study",
    },
  },
  {
    question: "What would a design system engagement look like?",
    answer:
      "Six to twelve weeks for a defined system, or embedded if the platform is large. The State Street shape: define the visual language against real screens and live data, build the components and tokens, document the rules so teams can decide without me in the room.\n\nThe deliverable isn’t a style guide. It’s fewer arguments and faster screens after I leave.",
    image: {
      src: "/case-study/thumbs/state-street-480.webp",
      alt: "State Street Alpha platform interface",
      href: "/state-street",
      label: "View the State Street case study",
    },
  },
  {
    question: "Could you do this inside our existing tools?",
    answer:
      "That’s the usual case, honestly. The Nike work happened inside live software people depended on daily: no clean slate, real constraints, incremental releases.\n\nConstraints like that are workable. The method survives them: find the real users, get the evidence, ship the reduction that serves the majority without breaking anyone’s workflow.",
  },
  {
    question: "Could a sprint like this work for our brand?",
    answer:
      "If the problem is sharp enough, yes. Four days was enough to build the Kmart pitch because the question was clear and the room was senior; a two-to-three-week direction sprint is the calmer version of the same move: concept, tested against the brief, carried far enough to judge.\n\nWhat makes it work isn’t the speed. It’s deciding what question the sprint has to answer before it starts.",
    image: {
      src: "/case-study/kmart/card-cover-480.webp",
      alt: "Kmart SHHHHH campaign: duct tape over the label",
      href: "/kmart",
      label: "View the Kmart case study",
    },
  },
];


/** Exact-match lookup. Persona-specific answers win; the shared hint bank
    (annaHintAnswers.ts, every per-section question on the site) is the
    fallback, so a suggested question never reaches the model. Returns null
    only for questions Anna did not prewrite.

    Returns the whole entry as of 2026-08-24 (was just the answer string):
    canned answers can now carry a curated image, and the API forwards it
    alongside the text. */
export function findCannedAnswer(
  persona: PersonaId,
  message: string
): CannedAnswer | null {
  const asked = message.trim().toLowerCase();
  const hit =
    cannedAnswers[persona]?.find(
      (a) => a.question.trim().toLowerCase() === asked
    ) ??
    sharedHintAnswers.find((a) => a.question.trim().toLowerCase() === asked);
  return hit?.answer != null ? hit : null;
}
