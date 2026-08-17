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

export type CannedAnswer = {
  question: string;
  answer: string | null;
};

export const cannedAnswers: Record<PersonaId, CannedAnswer[]> = {
  recruiter: [
    {
      question: "Which project best shows how you think?",
      answer:
        "IBM Chat Concierge, if the role involves shaping an undefined product. IBM knew the ambition: a concierge across all of IBM.com, through the whole customer journey. What was unsettled was the interaction model. I designed a bottom-docked input so it read as a tool for working something out, not another support bubble, then tested the concept and turned it into the north star the live chat is moving toward.\n\nIf you want the same thinking carried through brand, campaign, and physical execution, ask about the Kmart pitch next.",
    },
    {
      question: "Why have you worked with so many brands?",
      answer:
        "Contracting, by choice. Agencies bring you in when something has to get made, so twenty years of that stacks up a lot of logos.\n\nThe range was the point. Dashboard interfaces for Ford, compliance software for Bloomberg, a financial platform for State Street, a relaunch pitch for Kmart: each one teaches you a different customer and a different set of constraints, and that pattern recognition is what lets you get a grip on an ambiguous problem.\n\nThese days the preference is depth over breadth: long, embedded engagements where you get to know a product and its users properly. IBM is the proof, roughly eleven years of them coming back. That includes full time, for the right fit.",
    },
    {
      question: "How do you work when the roadmap isn’t clear?",
      answer:
        "Explore widely before converging, and connect ideas from places that look unrelated. Then get to something tangible fast, because an argument about an abstraction never ends.\n\nAfter that, user testing. I think of it as borrowing someone else's perspective for a while. Task completion matters, but I also watch where people hesitate and what they read differently than I expected, because that reshapes the idea instead of just validating it.\n\nThe skill that matters most in that situation isn't having answers ready. It's working out which question is actually worth answering, because the stated brief is rarely the real one.",
    },
    {
      question: "What kind of role are you actually looking for?",
      answer:
        "Open to full time now, for the right problem and the right team, and open to contract.\n\nI'd rather be embedded and long term than on short deliverable projects, because depth in a product and its users is where the work gets good. I want to own the direction: set the north star, make the calls, stay close to the craft. A role that includes managing a team is on the table.\n\nI'm happiest at the start of an undefined problem, ideally with emerging technology and real ambiguity in it.",
    },
  ],

  client: [
    {
      question: "Where should this project start?",
      answer:
        "Usually with a question nobody's settled yet: what problem is actually being solved, and for whom. Sounds obvious, and it's the thing most often skipped, because it's easier to argue about pixels than to agree on the point.\n\nGetting it wrong is expensive later. Everything downstream, the scope, the medium, what good looks like, is a guess until it's answered.\n\nSo tell me what you're trying to launch, fix, or figure out, and I'll tell you which question I'd want answered first on something like it, and why that one comes before the others.",
    },
    {
      question: "Can you do the campaign and the product?",
      answer:
        "Yes, and it's fair to want evidence rather than assurance.\n\nProducts and systems: IBM, LinkedIn, Nike, State Street, Bloomberg. Campaigns and brand: the Kmart relaunch pitch at DraftFCB, McDonald's, Oreo, Zara, plus twenty-plus years across advertising, products, brand, and fashion: full 360 marketing campaigns, outdoor, social, storyboards and launch sites. And alongside all that, a fashion design career across Italy, Spain, Argentina and New York.\n\nThe through line: I start with the problem and choose the medium around it.",
    },
    {
      question: "Can you lead the work and bring the right team?",
      answer:
        "Yes. Paper Pixel is a registered studio, which matters practically: several enterprise clients will engage a studio where they won't engage an individual.\n\nI lead every engagement myself and bring in trusted specialists when the work needs them. Writers, developers, researchers, motion. You deal with the same person the whole way through, from the first strategic question to what actually ships.",
    },
    {
      question: "How soon can I see something real?",
      answer:
        "Early, and that's a working method rather than a sales line. Abstract debate doesn't converge, so I get to something you can react to quickly and we argue about that instead.\n\nPrototypes tested with real people are the unit of progress. From there it moves between exploration, prototyping, research and refinement until the team actually believes in it.\n\nI'd rather not promise a number of days before knowing what it is. Tell me the shape of the problem and I can be specific.",
    },
  ],

  ex: [
    {
      question: "So what do you actually do now?",
      answer:
        "Design work. A studio called Paper Pixel, mostly US clients, mostly the problems that haven't taken shape yet. AI experiences, search, complicated enterprise products. IBM has kept coming back for eleven years.\n\nAlso, I taught an AI to talk like me, and you're currently finding out how well that works.\n\nWhy do you ask?",
    },
    {
      question: "How did you go from fashion to AI?",
      answer:
        "It wasn't a pivot. The digital work ran the whole way through.\n\nI went to Italy after college and ended up doing graphics for Woolrich. Then a master's in fashion in Barcelona, then postgraduate couture and pattern making in Buenos Aires. Then I designed coats in New York for a few months and discovered that not every passion should become a job. That sentence cost me several years. You can have it for free.\n\nThe deeper through line was culture, and how people signal things to each other. That transfers to products more cleanly than anyone expects.",
    },
    {
      question: "Which project are you most proud of?",
      answer:
        "The IBM Chat Concierge. Not for how it looks.\n\nIBM had a clear ambition, a concierge for an entire website rather than a box on one page, before anyone knew what it should look like. It turned into something a team could test and argue with. That became the north star, and I spent the time after the pitch moving the live chat toward it.\n\nThat's apparently the thing I'm good at. Turning up before there's a product and working out what it should be.",
    },
    {
      question: "Be honest. Was the frog actually real?",
      answer: "Yes. The frog was real. That is the complete answer.",
    },
  ],
};

/** Exact-match lookup. Returns null when the model should handle it. */
export function findCannedAnswer(
  persona: PersonaId,
  message: string
): string | null {
  const asked = message.trim().toLowerCase();
  const hit = cannedAnswers[persona]?.find(
    (a) => a.question.trim().toLowerCase() === asked
  );
  return hit?.answer ?? null;
}
