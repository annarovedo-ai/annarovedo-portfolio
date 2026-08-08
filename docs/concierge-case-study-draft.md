# Draft: "Almost Anna" as a Case Study

Not committed — see the note in `case-study-template.md`. This is a first pass at what a fourth case study would look like, using the same 9-section structure as the other three. Bracketed items are gaps for Anna to fill; nothing here should be treated as verified fact per the project's own rule against invented placeholders (see `homepage-copy.md`).

Naming note (2026-08-03): the site's AI chat was originally also named "The Concierge" — the same name as the flagship case study, IBM MaaS360 Chat Concierge, a generative-AI chatbot Anna was sole UX designer on. That collision is exactly what prompted the rename to "Almost Anna" (see `decisions-log.md`). The underlying callback still works, just without the name collision: Framed right, this case study becomes a live callback: *"I designed IBM's AI concierge professionally. This is the one I built for myself."* A visitor can be reading about the IBM project and then go ask a live example of the same category of product a direct question.

---

## 1. Overview & Role

Designed, trained, and shaped the knowledge base, tone, and guardrails of the AI chat embedded across this site. Sole author — same practice she brought to IBM's MaaS360 Chat Concierge, applied to her own portfolio.

Per `facts.md`: built on the Anthropic API, deployed on Vercel, with a backend proxy (`api/chat.js`) so the key is never exposed client-side. Anna lists Claude Code (in VS Code) as a working tool for direct file editing — meaning the technical build itself, not just the training content, looks self-directed rather than handed to a developer. Worth confirming explicitly rather than assuming: **[NEEDS: did anyone else touch the technical implementation, or is "designed, wrote, and built end-to-end" accurate? NEEDS: rough timeframe — when did this start / first ship?]**

## 2. The Problem

Portfolios are static — they show a finished decision but can't answer a follow-up. Recruiters and clients most want proof of *how* she thinks, not just what she shipped (per `tone-guide.md`), but a case study can only walk through one path through one decision. There's no way for a visitor to push back, ask "why not the alternative," or test judgment directly — the exact thing an actual interview does.

## 3. Constraints

- Beta scope: professional-knowledge layer only. Personal layer (unlocked in It's Complicated mode) is a fast-follow, not built for beta.
- No CMS — content hardcoded for now, per `decisions-log.md`.
- Non-negotiable even for beta: backend-proxied chat calls (API key never exposed client-side — confirmed on the existing prototype), per-session message cap, rate limiting.
- Hard guardrails: never fabricate beyond the source doc; never expose identifying details about real third parties; nothing defamatory/NSFW in the personal layer.

[NEEDS: any budget/time constraint worth naming — hours invested, whether this was nights/weekends work, etc. This is the section that would carry the "I spent real hours on this" claim with a specific number instead of an assertion.]

## 4. Process

Two-tier knowledge structure: a professional layer (career, process, philosophy, project detail — available to every persona) and a personal layer (dating history, inside jokes — Ex-Boyfriend/It's Complicated mode only).

Per `facts.md`: a consolidated "master" system-prompt document was built and iterated across multiple named passes ("Anna master doc," "Anna master v2," "Anna rovedo full detail," "Anna rovedo verbatim"), organized around identity/positioning, education, career timeline, notable clients & projects, Paper Pixel, skills & tools, design philosophy, the Barcelona-timezone strategic framing, personality & working style, current active projects, and what she's looking for next. That's a real, specific, and slightly funny detail worth keeping in the case study almost verbatim — "verbatim" as a literal draft-name is a good beat. **[NEEDS: roughly how many total iterations, and how long that process took — is "hours" the right unit, or longer?]**

## 5. Key Decisions & Tradeoffs

- **Fact-grounded over free-generating.** Hard rule to never fabricate beyond the source doc — deflect honestly instead of guessing. Trades some conversational fluency for trustworthiness; the alternative (a more "creative" model) risked the chat inventing a credential or project, which is disqualifying on a design portfolio (see the fabrication catalog in `homepage-copy.md` — this project has already been burned by invented specifics once).
- **Manual persona switching, not auto-detection.** Unlike some AI portfolio assistants that infer visitor type from behavior, the switcher here is visible and deliberate — a design choice, not a technical shortcut, and it doubles as a piece of the site's identity rather than hiding the mechanism.
- **Positioned as "probe my thinking," not "search shortcut."** Considered and rejected: framing the chat purely as a faster way to navigate the site (that's real, but it's not the differentiator). See "Positioning reframe" in `decisions-log.md`.

## 6. Obstacles / Pivots

Site currently unpublished — production domain pulled from Vercel (2026-07-31) as a precaution until the per-session message cap is implemented and verified. Project and code are intact; this is a real, current, un-resolved constraint worth naming honestly in a reflection-stage case study rather than glossing over.

[NEEDS: any other real pivot — e.g., did an earlier version of the chat's tone miss the mark and get rewritten? Did scope get cut (e.g., the personal layer, CMS) under time pressure?]

## 7. The Solution

Walkthrough of what an actual conversation looks like — sample exchanges per persona (recruiter gets process/tradeoffs, client gets outcomes/fit, It's Complicated gets the full arc with personality). Include the self-referential prompt as part of the craft, not just the copy: a suggested question like *"Did you actually build this yourself?"* that lets a visitor verify the "hand-built, not generic" claim in the chat itself rather than take it on faith.

## 8. Outcomes

[NEEDS REAL NUMBERS once live — this section can't be filled with plausible-sounding metrics per the project's standing rule. Worth tracking once relaunched: message volume, % of visitors who engage with Almost Anna at all, average conversation length, which persona gets used most. A comparable reference point (not a claim to reuse) is brober.xyz's broberbot case study, which reports response time, intent-recognition rate, and engagement rate — useful as a template for *what to measure*, not what number to expect.]

## 9. Reflection

[NEEDS: what she'd do differently now that some distance/hindsight exists — e.g., CMS timing, whether the personal layer should have shipped with beta, anything about the training process that took longer than expected.]
