# Site Map

## Pages

- **Homepage** — persona picker (default: Recruiter for un-gated/bot traffic), sizzle reel (persona-specific cut), intro "video about me" (persona-specific), Almost Anna chat embedded inline directly under the intro video (see "Placement" in `decisions-log.md`), case study list, persistent persona switcher.
- **Case study × 3** — trailer video (one per case study for beta) at top, full written breakdown below (Overview & Role → Problem → Constraints → Process → Decisions & Tradeoffs → Obstacles → Solution → Outcomes → Reflection), Almost Anna module inline at the bottom of the written breakdown (highest-value placement — visitor has a specific decision to question by this point). Copy and video framed per active persona.
- **About** — bio, background.
- **Resume** — for recruiter persona especially; consider whether client/ex personas see a different version or none at all.
- **Contact** — persona-aware CTA copy.

## Persistent components

- **Persona switcher** — visible at all times, not hidden. On the homepage, shown as an expanded full-width "I'm here as..." bar above the hero; collapses into a compact switcher docked in the main nav once the visitor scrolls past the hero, and appears in that same compact nav form on every other page (never the expanded bar outside the homepage's initial view). Selecting Ex-Boyfriend requires a deliberate click each session (no persistent state).
- **Almost Anna** — embedded inline in the homepage hero on load; once the hero scrolls out of view, it minimizes into a persistent bottom-right corner entry point that follows the visitor across the rest of the homepage and every other page. Also embedded inline at the bottom of each case study — see `decisions-log.md`. Tone and knowledge layer follow active persona. Deliberately not a full-screen gate on load.

## Persona behavior

| Persona | Default? | Persists across visits? | Chat knowledge layer |
|---|---|---|---|
| Recruiter | Yes (default) | Yes (cookie) | Professional only |
| Client | No | Yes (cookie) | Professional only |
| Ex-boyfriend | No, explicit selection only | No — resets every session | Professional + Personal |

## Open questions

- Does Resume differ or disappear for client/ex personas?
- Bot/SEO handling: confirm recruiter-tone content is what's indexed/rendered for crawlers and cold links.
