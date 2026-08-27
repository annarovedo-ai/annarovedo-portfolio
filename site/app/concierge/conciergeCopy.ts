import type { Voiced } from "../PersonaCopy";

/**
 * Concierge case study: the persona voice layer below the hero.
 *
 * Recruiter is the page's own baseline, verbatim, and is what ships in the
 * server render. Client re-aims the same facts at a buyer deciding whether
 * to hire the studio: business stakes, risk reduction, what the method
 * transfers to. Ex adds dry beats in a couple of chosen spots and nothing
 * else; the professional evidence stays whole, because a recruiter who
 * clicked Ex-Boyfriend still has to leave convinced.
 *
 * The rules from the chat and caseVoices apply here without exception: an
 * outcome is never upgraded, concept stays concept, pitch stays pitch, and
 * no personal history is invented for a joke. The Concierge STATUS rules in
 * almostAnna.ts bind this file too: the vision became the north star, the
 * live chat iterates toward it, and nothing here may say otherwise.
 */
export const conciergeCopy = {
  summaryHeading: {
    recruiter: "The opportunity was larger than chat.",
    client: "A chatbot answers questions. This moves a sale forward.",
  } satisfies Voiced,

  summaryOpen: {
    recruiter:
      "Enterprise software is rarely bought by one person in one sitting. Buyers move between research, demos, internal conversations, approvals, setup, and support. The existing experience treated those moments as separate transactions.",
    client:
      "If your buyers research, compare, ask around internally, and come back three times before they commit, this problem is yours too. IBM's version of it was simply bigger: every one of those moments was a separate transaction, and the sale went cold between them.",
  } satisfies Voiced,

  assignmentLead: {
    recruiter:
      "I owned UX for the concept on a multidisciplinary team led by IBM’s Global Head of UX. My job was to connect the buyer journey, the interaction model, and the evidence into one direction people could see, question, and test.",
    client:
      "This is what one senior designer on an undefined AI initiative produces: the buyer journey, the interaction model, and the evidence connected into a single direction that leadership could see, question, and fund. Not a deck about AI. A direction you can test.",
  } satisfies Voiced,

  validationLead: {
    recruiter:
      "Two rounds of unmoderated UserZoom testing moved the work beyond internal enthusiasm. Participants evaluated the prototype as prospective buyers, giving the team evidence about comprehension and interest before the experience advanced.",
    client:
      "Before serious build budget moved, real prospective buyers evaluated the prototype across two rounds of testing. That is what de-risking an AI investment looks like in practice: evidence about comprehension and trust arrives before the engineering spend, not after launch.",
  } satisfies Voiced,

  outcomeLead: {
    recruiter:
      "A first version went live, and the concepts from the future-vision prototype have been developed and tested through the year since. Conversation history across sessions. Prompt hints, so a buyer facing an empty field can see what this thing is actually good for. AI summaries on the Product Finder page, and the harder question underneath them: what the handoff looks like when a summary has answered part of the question and a product page has to take over.",
    client:
      "A first version went live, and the work did not stop there, which is the part that matters if you are hiring for implementation rather than inspiration. Through the year since: conversation history across sessions, prompt hints for the empty field, AI summaries on the Product Finder page, and the unglamorous handoff questions underneath each one. Staying through implementation means each piece ships, gets used, and changes what the next piece should be.",
  } satisfies Voiced,

  reflectionHeading: {
    recruiter: "The interface was never the most interesting part.",
    client: "The method is the part that transfers.",
  } satisfies Voiced,

  reflectionLead: {
    recruiter:
      "The most important decision was to treat conversation as connective tissue across a complicated buying journey, not as a novelty placed at the edge of a page.",
    client:
      "Strip away IBM’s scale and the method transfers whole: treat conversation as connective tissue across the buying journey, decide what context should persist, what should become an artifact, and when a person should enter. Those questions apply to any company that sells something complicated. Including yours.",
    ex:
      "The most important decision was treating conversation as connective tissue, and designing for continuity, so context carries forward instead of starting from zero every time. No comment.",
  } satisfies Voiced,

  nextEyebrow: {
    recruiter: "Part two",
    client: "Where this thinking goes next",
    ex: "Part two",
  } satisfies Voiced,
};
