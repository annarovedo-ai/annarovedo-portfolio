import type { Voiced } from "../PersonaCopy";

/**
 * The archive intro, voiced (2026-09-01, Anna: "this is still the same
 * across personas. write different copy for each").
 *
 * Recruiter is the page's own baseline, verbatim, and what the server
 * renders. The persona-content rules apply: the entries below the intro
 * never change, only the argument over them does. Client re-aims the same
 * drawer at a buyer: the archive is the range behind the case studies,
 * which is the "starts with the problem, picks the medium" claim made
 * visible. Ex keeps the evidence straight and puts the one joke in the
 * frame, landing on him, never on the work — and invents no shared
 * history, per the standing rule in homeContent.ts.
 *
 * The ex h1 continues /work's ex archive heading ("And that's just the
 * ones I wrote up."): this page is, literally, the ones she didn't.
 */
export const archiveCopy = {
  heading: {
    recruiter: "Real work that hasn’t gotten the full case-study treatment yet.",
    client: "The range behind the case studies.",
    ex: "The ones I didn’t write up.",
  } satisfies Voiced,

  deck: {
    recruiter:
      "These are not case studies and they are not pretending to be. Some of it is old enough that there is no research left to point to and the people who could confirm it have long since moved on. Some of it is current, just not written up here yet. Either way, what is here is the idea and what I made. Click through for the full images, or ask me about any of it directly.",
    client:
      "These are not case studies and they are not pretending to be. They are the range behind them: client engagements, advertising, shopper marketing, apparel graphics, brand identity, editorial design. Twenty years of choosing the medium after the problem, which is the habit Paper Pixel is built on. Click through for the full images, or ask about any of it directly.",
    ex:
      "These are not case studies and they are not pretending to be. Some of it is old enough that there is no research left to point to, some of it is recent, just not written up yet. Either way, what is here is the idea and what I made. Click through for the full images, or ask me about any of it directly, if you can think of a casual way to do that.",
  } satisfies Voiced,
};
