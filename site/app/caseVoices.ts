import type { PersonaId } from "./personaStore";
import type { HeroVoice } from "./CaseHero";

/**
 * Case-study hero copy, per persona.
 *
 * Recruiter is the original hero from each page, verbatim: it is the straight
 * reading and what search engines index. Client re-aims the same facts at
 * someone deciding whether to hire the studio. Ex is the same story told to
 * somebody who knew her before any of it happened: dry, one laugh, no
 * inflation of the facts. The rules from the chat apply here too, an outcome
 * is never upgraded, concept stays concept, pitch stays pitch.
 */
export const caseVoices: Record<string, Record<PersonaId, HeroVoice>> = {
  concierge: {
    recruiter: { h1: "Designing an AI concierge for the enterprise buying journey.", deck: "IBM needed prospective customers to evaluate a complex enterprise product without a salesperson in the room. The answer was not another chatbot. It was a guided experience that could help buyers understand, compare, decide, and keep moving." },
    client: { h1: "IBM asked what AI should do for its buyers. This is the answer.", deck: "A guided experience that helps enterprise buyers understand, compare, and decide without a salesperson in the room. Shaped before anyone knew what it should be, tested with real buyers, and now the north star IBM's live chat is moving toward. This is what the start of an undefined product looks like when it goes well." },
    ex: { h1: "I taught IBM’s website to hold a conversation.", deck: "A concierge for the whole of IBM.com. It talks to strangers about complicated purchases, knows when to hand off to a person, and remembers what you said three messages ago. Listening, it turns out, is something you can design. There’s a smaller one at the bottom of this page." },
  },
  search: {
    recruiter: { h1: "Redesigning search across IBM.com.", deck: "A search results page looks small until it has to make an ecosystem as complex as IBM understandable. I led the redesign of the result system connecting products, documentation, training, support, and technical content." },
    client: { h1: "When search fails, buyers leave. IBM’s couldn’t afford to.", deck: "One query used to hit six separate searches, each with its own opinion. I led the redesign that unified the system: one ranked list, filters people understand, and a recovery path for the moment there’s no result. Live for the US-English MVP." },
    ex: { h1: "You could never find anything on IBM.com. Now you can.", deck: "Six search engines answered one search box, and none of them agreed. I redesigned the system into one ranked list that admits what it doesn’t have. The US version is live. Searching a website with Google is no longer a personality trait." },
  },
  stateStreet: {
    recruiter: { h1: "Designing the visual language for a financial operating system.", deck: "Alpha brings investment operations, oversight, and analysis onto one platform. I was the sole UI designer who defined the visual language, accessibility foundations, and component system that makes its dozens of workflows feel like one product." },
    client: { h1: "Dozens of workflows. One product. That takes a system.", deck: "State Street’s Alpha platform runs investment operations for institutional investors. As sole UI designer I built the visual language that holds it together: 22 categories of components, accessibility built in, light and dark modes tuned separately. The system reached implementation and set the direction for State Street’s broader suite." },
    ex: { h1: "A trillion dollars was hard to read.", deck: "State Street’s platform moves serious money, and serious money deserves better typography. One visual language, 22 component categories, light and dark modes tuned separately, for people who watch numbers all day. The numbers behave now." },
  },
  nike: {
    recruiter: { h1: "Forty fields. Five that mattered.", deck: "Nike’s order management teams had no single view of whether product was actually available, and the requirements listed roughly forty ways to search for it. Standard user interviews were not open to me, so I found another way to reach the same people." },
    client: { h1: "The requirements said forty fields. The users needed five.", deck: "Nike’s order teams juggled three tools to answer one question about availability. I got the real requirements from the people doing the work, 47 of them, then designed the tool that answers it in one place. It shipped. This is what evidence looks like when it sets the scope." },
    ex: { h1: "Yes, that Nike. No, I can’t get you shoes.", deck: "Order management software. The requirements listed forty search fields, the users needed five, and proving that took a survey nobody asked me to run. It shipped. The shoes remain full price." },
  },
  kmart: {
    recruiter: { h1: "Kmart rebuilt a clothing line most people didn’t know existed.", deck: "A new in-house design team, a studio in New York, a genuine relaunch of the clothing line. The product had changed. The assumption about it had not. This four-day pitch turned that perception problem into one idea carried through advertising, a members-only website, packaging, and a physical pop-up." },
    client: { h1: "The product had changed. The perception hadn’t. We had four days.", deck: "A pitch to relaunch Kmart’s redesigned clothing lines: one idea, SHHH, carried through advertising, a members-only site, packaging, and a physical pop-up. Brand, campaign, digital and physical moving as one thing, which is the range this studio is built around." },
    ex: { h1: "The plan for relaunching Kmart: tell no one.", deck: "A four-day pitch to relaunch Kmart’s clothing line as a secret: SHHH, members only, tape over the logo, the bag, the model’s mouth. You’d have called it a phase. It was a strategy." },
  },
  journeyOrchestration: {
    recruiter: { h1: "What if every page rewrote itself around the person reading it?", deck: "After the Concierge shipped its first chat-based direction, I kept working on the live experience with IBM’s team. A few weeks into that work, alongside Amy Clark, IBM’s Global Head of UX, we realized the bigger opportunity wasn’t a smarter chatbot. It was a smarter interface: one where AI orchestrates the entire journey, not just a conversation docked to the bottom of it." },
    client: { h1: "Your website shows everyone the same page. It doesn’t have to.", deck: "Concept direction for IBM: pages that reorganize around each visitor’s journey, an assistant woven into the page rather than boxed beside it, and a lead model fed by real behavior. This is the thinking you bring in before the roadmap exists." },
    ex: { h1: "I designed a website that pays attention.", deck: "Concept work for IBM: the page rearranges itself around whoever is reading it, no chat box required. Paying attention remains an underrated feature." },
  },
};
