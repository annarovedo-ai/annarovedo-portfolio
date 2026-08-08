# Almost Anna Input Questions

A working checklist of what Anna still needs to answer to feed Almost Anna (the site's AI chat, renamed from "the Concierge" 2026-08-03 — see `decisions-log.md`) — both its own case study and the follow-up chip trees discussed for each project. Cross-referenced against `facts.md` so nothing already answered gets asked twice; only genuine gaps are listed. Answers can go straight into `facts.md` (Professional Layer) once written, since that's Almost Anna's actual source of truth.

---

## A. About Almost Anna itself (feeds `concierge-case-study-draft.md`)

Already known from `facts.md` — no need to re-answer: built on the Anthropic API, deployed on Vercel, backend-proxied via `api/chat.js`, and Anna's own tool list includes Claude Code for direct file editing, which points to a self-directed technical build rather than one handed to a developer.

Still open:

- [ ] Is "designed, wrote, and built end-to-end" an accurate claim, or did anyone else touch the technical implementation at any point?
- [ ] Rough timeframe — when did work on Almost Anna start, and when did it first go live?
- [ ] Roughly how many iterations did the master system-prompt doc go through ("master doc" → "v2" → "full detail" → "verbatim"), and roughly how long did that take — hours, days, longer?
- [ ] Beyond the current message-cap blocker (already tracked in `decisions-log.md`), was there an earlier version of Almost Anna's tone or scope that didn't work and got rewritten?
- [ ] Looking back, what would you change about how you trained it?

---

## B. Per-project follow-up content (feeds the chat's follow-up chip trees)

For each project, four angles, matched to the case study template: **Decisions & Tradeoffs**, **Obstacles**, **Reflection**, **Process/Validation**. These are judgment calls, not facts already sitting in `facts.md` — the raw project details exist, but not Anna's reflective take on them.

### IBM MaaS360 Chat Concierge (flagship)

- [ ] Across Crawl / Walk / Run, which single decision would you most defend if someone pushed back on it?
- [ ] The internal codename "the Razor" for the bottom-docked chat pattern — was there resistance to that concept before it was accepted, or was it an easy sell?
- [ ] Phase 2 reframed the concept from "a chat tool on a page" to "AI as the operating system of the page" — what was the alternative you didn't choose, and why was the reframe worth the risk?
- [ ] How did the two rounds of UserZoom testing actually change the design, beyond just confirming it worked?

### State Street Alpha

- [ ] Was there resistance to the atomic/tokenized system from teams used to a less systematic approach? How did you handle it?
- [ ] The Ali / Eve / Fey / Pan color-naming system — why name them at all instead of using functional labels, and did that choice pay off or cause confusion anywhere?
- [ ] What's the one part of the design system you'd rebuild differently if you started Alpha today?

### IBM Global Search

- [ ] Why a three-tier typeahead instead of a simpler single-tier search — what did testing or stakeholder pushback teach you there?
- [ ] The "silent autocorrection" principle is a specific, opinionated choice — what's the failure mode you were designing against, and did anyone push back on making autocorrection invisible rather than visible?
- [ ] What was the hardest part of getting the zero-results redesign approved?

### IBM Connected Product Experience

- [ ] You explored product-pictogram hero imagery on this project, then argued against it — what tipped that decision, and would you make the same call again?
- [ ] Reframing IBM.com from a flat catalog to a connected portfolio is a big structural bet — what was the strongest objection you had to overcome to ship it?
- [ ] How did the Type A/B/C product taxonomy hold up once real products got mapped into it — did it need revision?

---

## C. Outcome metrics still missing

Already flagged in `homepage-copy.md` as **[NEEDS REAL NUMBER]** — listed here only because Almost Anna will get asked about outcomes directly, and "I don't have a number for that" is a worse answer live in chat than it is in static copy:

- [ ] IBM Chat Concierge: comprehension/interest signals from the two UserZoom rounds.
- [ ] State Street Alpha: adoption across teams or products.
- [ ] IBM Global Search: any measured change in search success rate or zero-result rate.

---

## D. Tracked elsewhere — don't duplicate here

These are real open items but belong to `decisions-log.md`, not this doc — listed only as a pointer so nothing falls through the cracks:

- Exact per-session message-cap number (hard requirement before republishing).
- CMS choice and timing (post-beta).
- Final copy for the chat-logging disclosure.
- Which of the two "still open" candidates fills the third case-study slot (Global Search vs. Connected Product Experience / "Product Discovery" framing) — note this doc already drafted follow-up questions for both, so answering either doesn't block this checklist.
