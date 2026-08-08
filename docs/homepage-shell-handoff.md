# Homepage shell — handoff

Written 2026-08-06. Covers the header, persona switcher, hero copy and the Almost Anna razor. Pick up from here in a new chat.

Repo: `~/website portfolio`. App lives in `site/app`. Dev server on `:3000`.

---

## 1. Voice rules — read before writing any copy

These were arrived at by getting them wrong first. They apply to every string on the site.

**Plain, not clever.** Anna picked "Plain" from three sample registers (Plain / Mid-conversation / Turned-toward-you). Confidence through understatement. Rejected outright: "What's the hard part? / That's the part I do" (boasting), "Complex problems. Clearer ways forward." (tagline).

**The tagline tell:** two noun phrases with a full stop between them is a tagline, not a sentence. If you write one, delete it.

**No em dashes.** Standing preference recorded in `docs/facts.md`. Use commas or full stops.

**Never invite doubt about the work.** A razor line reading "Which of these did you actually work on?" over the client logo strip was rejected for exactly this. Nothing on the site should read as anticipating disbelief.

**Voice of the razor is the system offering, never the visitor asking.** Model it on IBM's "Have a question about device support?" Not "Which project should I visit?"

**Demonstrate, don't assert.** The About paragraph was rewritten from a list of industries into the fashion-school/Kmart story for this reason. The pullquote ("Culture is always the brief underneath the brief") now pays off something.

**Don't reduce her to a product designer.** She has visual design training — graphic design, 3D, Flash, couture, brand, design systems. "Products" alone flattens it. `facts.md` and `site/app/lib/almostAnna.ts` are the source of truth for biography; read them before writing anything biographical.

---

## 2. Current homepage copy (recruiter persona)

Locked unless Anna says otherwise. In `site/app/homeContent.ts`.

| Slot | Value |
|---|---|
| `onboardingText` | I set this up to answer what you'd ask me on a first call. |
| `headline` | `["I design products, systems, and brands.", ""]` |
| `subtext` | Twenty years, from Flash websites to AI. |
| `conciergeHeading` | You don't have to piece me together from a few case studies. |
| `conciergeBody` | I gave an AI my work and my opinions and taught it how I talk. Ask it why I made a decision, what went wrong, or whether any of this fits the role you're filling. |
| `workEyebrow` | Selected work |
| `casesHeader` | This is the work I'd walk you through. |
| `footerHeadline` | Have a role you think might fit? |
| `footerBody` | Message me, or book a time and talk to the version that occasionally needs a minute to think. |
| `footerButton` | Book a time |

Notes:
- `headline` is a `[string, string]` tuple; an empty second element renders as one line (the soft span is conditional in `HomeBody.tsx`).
- An `availability` field was built, then removed at Anna's request. Do not reinstate. "US hours" in particular was rejected because it implies she is not in the US.
- **Never state location.** She is in Spain and does not want it advertised. `facts.md` rule: lead with the US career, US clients and US-compatible availability, never the location. If asked, the chat answers briefly then moves to the practical concern.
- `workEyebrow` is persona-switched. "What I've been up to" is the Ex's line only — it implies absence and read as a gap on the recruiter page.

---

## 3. Header — the critical distinction

**`is-docked` vs `is-scrolled`. Get this wrong and you break every inner page.**

`SiteHeader.tsx` (every page except `/`) is hardcoded as `className="site-header home-header is-docked"` — it wears `is-docked` permanently as a styling shortcut. So **any rule scoped to `.home-header.is-docked` fires on every page in the site, always.**

`is-scrolled` is set only by `PersonaChrome.tsx`, only on `/`, only once scrolled. Use it for anything that should be scroll-dependent.

This already caused one regression: a "hide the wordmark on scroll" rule keyed to `is-docked` blanked the brand on every inner page.

### Brand lockup
- Markup is duplicated between `PersonaChrome.tsx` and `SiteHeader.tsx`. **They should be one shared component.** This will drift again otherwise. The `PP` mark placeholder currently exists only in `PersonaChrome`.
- `.brand-mark` is a placeholder for a logo Anna is making. Swap the `<span>PP</span>` for an `<img>`; nothing else needs to change.
- The mark replaces the lockup **at `max-width: 900px` when scrolled** — width-driven, not scroll-driven. Anna's rule: swap only when the full lockup genuinely stops fitting. Above 900px the scrolled row holds lockup + switcher + nav comfortably.
- Mobile lockup holds one line via `white-space: nowrap` plus reduced type at ≤720px. The flex row never wrapped; the words inside each item did.

### Persona switcher
- **Always visible**, at every width and scroll position, on every page. The old fade/collapse handoff is gone.
- Label is `"I'm a"` on both headers. Anna's reasoning: a deep link never shows the hero, so three unexplained pills is not enough. It is the visitor's own voice, matching the removed hero framing.
- The hero (`.persona-intro`) switcher was **removed** — it was a duplicate once the header carried it permanently. That band now holds only the persona-specific `onboardingText` line.
- `.persona-switch button` has `white-space: nowrap` and `flex: none`. "EX BOYFRIEND" breaking in half was doubling the row height.

### Nav
- `.site-nav` is the grid child, not the inner `<nav>`. Target `.site-nav`.
- At ≤1140px the grid is two columns; the desktop rule pinning `.site-nav` to `grid-column: 3` created a phantom column and floated the hamburger off the corner.
- A legacy rule hid nav links 2 and 3 below 720px. Removed — it predated the hamburger and was hiding About and Resume from inside the mobile menu.
- Mobile panel is `position: fixed` rather than absolute, because `.site-nav` is not a positioned ancestor.

---

## 4. Almost Anna razor

`site/app/AnnaRazor.tsx`, mounted in `app/layout.tsx`, gated by `ENABLED_PATHS`.

### Why it exists
It is the IBM Concierge pattern applied to the portfolio that documents it. See `/concierge` §03 "Why the bottom": a corner bubble reads as a support widget and gets dismissed; a bottom-docked input reads as a tool for working something out. The corner state is therefore the *dismissed* state, chosen by the reader — which is consistent with the third principle on that page, that the visitor decides when the assistant enters.

### State machine

| State | What it is | Enter | Exit |
|---|---|---|---|
| `quiet` | 46px button, lower-right | × on the bar, or Close in the panel | Tap it → opens the conversation |
| `razor` | 44px bottom bar: avatar, input, send, contextual hint, × | Minimise in the panel; or the control at the foot of the panel | × → quiet |
| `open` | The conversation | Corner button, send, or clicking a hint | Minimise → razor; Close → quiet |

Persisted in `sessionStorage` under `pp-anna-razor`. Survives navigation, resets on a new tab.

### Rules settled with Anna
- **One setting, not two.** Hiding the hints and shrinking the bar are the same intent. Do not split them again.
- **The corner button opens the chat.** It is a way to talk to her, not a way to restore chrome.
- **The way back lives inside the conversation**, because the conversation is reachable from every state. Two routes: the Minimise icon next to Close, and a worded button at the foot of the panel. (These are now redundant — Anna to decide whether to drop the worded one.)
- **Teaching moment on dismissal.** × does not vanish the bar. It shows "Hidden. You can bring the bar back any time from the chat" for ~2.1s, then collapses. A dismissal whose undo lives elsewhere is only fair if you are told where, once, at the moment you create the problem.
- **Retract on scroll.** The bar leaves while scrolling down, returns on scroll up or ~170ms of stillness. Rationale: nobody reads a suggestion mid-scroll, and the hint changing in peripheral vision while moving is the distracting case. Pinned while the input is focused; never retracts while open.
- **Hints are desktop and tablet only** (`min-width: 768px`). Phones get no hints at all.
- **Phones default to `quiet`**, and never see the bar unless they ask for it. Swipe up opens, swipe down closes; the element tracks the finger then commits past 54px or springs back.

### Explicitly rejected
- **Right-side dock.** Her pages are a linear read with wide diagrams; docking right squeezes every figure. Also multiplies states, which makes the "how do I get back" problem worse. If it ever returns, use an explicit toggle, not a drag — a drag has no keyboard or screen-reader equivalent.
- **Free drag positioning.** Two detents only. A sheet parkable anywhere can be parked somewhere useless, and detents are what make "drag the sheet" separable from "scroll the thread".
- **A floating strip of chips above the bar.** Too much vertical space. The hint now sits inline at the far right of the bar, behind a rule, opposite the cursor.
- **Always-present at a slimmer height** — considered, lost to retract-on-scroll.

### Content model
Sections opt in with `data-anna-prompt`, pipe-separated for more than one:

```jsx
<section data-anna-prompt="Why the bottom?">
```

Whichever tagged section is most in view wins (IntersectionObserver on ratio). Untagged pages show no hint and the bar still works.

**52 lines are already written** across the homepage and every case study. They are inert until `ENABLED_PATHS` opens up. Longest is 31 characters — keep them short, they sit in an inline slot that truncates around 30ch.

### Rollout
`ENABLED_PATHS = ["/"]` — homepage only, on purpose, while the interaction settles. **Set to `null` for site-wide.** Anna: "once we have the design locked we will push to other pages."

The bottom gutter is scoped too: `AnnaRazor` sets `data-anna-razor="bar"` on `<html>`, and only that selector applies `padding-bottom` to `body`. Pages without the razor keep their own footing.

---

## 5. Open items

- **Two client-side errors** show in the Next dev overlay. Server render is clean (200, no server errors). Unresolved — get the console text.
- **Logo** to replace the `PP` placeholder.
- **The worded restore button** at the foot of the chat panel may be redundant now that Minimise exists.
- **Brand markup duplication** between the two headers.
- `layout.tsx` `<title>` is still "IBM MaaS360 Chat Concierge · Anna Rovedo" — a site-wide title bug, unrelated to the shell but worth fixing.
- **MaaS360 rename** half-done: the homepage card is now "IBM Chat Concierge", but `concierge/page.tsx`, `layout.tsx` and `lib/almostAnna.ts` still say MaaS360.
- Two unreferenced persona-sheet PNGs (~9.6MB) in `public/case-study/concierge/`, plus scratch files in `_to_delete/`.
- `persona-sara.jpg` in that folder is actually David's journey map — mislabelled, unused.

---

## 6. Process warnings

**Assert both ends of a slice.** A CSS edit located its cut points with two searches; the second didn't match and returned `-1`, so `text[:start] + new + text[-1:]` appended a near-complete second copy of `globals.css` (16,657 lines, `@import` shaved to `mport`). PostCSS failed with "Unknown word mport". Always assert that the end offset is greater than the start.

**Validate CSS after every edit.** The project has PostCSS in `node_modules`:

```bash
node -e "const fs=require('fs'),postcss=require('postcss');
const r=postcss.parse(fs.readFileSync('app/globals.css','utf8'),{from:'g.css'});
let n=0;r.walkRules(()=>n++);console.log('OK',n);"
```

Also check brace balance and that `@import` appears exactly once.

**Typecheck ignores three pre-existing errors.** `db/index.ts` and `worker/index.ts` fail on Cloudflare Workers ambient types. Filter them:

```bash
npx --no-install tsc --noEmit 2>&1 | grep -Ev "cloudflare:workers|Fetcher|D1Database"
```

`next build` will fail on these too — that is not your change.

**Check whether a rule is global before writing it.** Because of the `is-docked` situation above, most header CSS reaches every page.

**Read `docs/facts.md` and `docs/tone-guide.md` before writing copy.** 71KB and 30KB respectively. `lib/almostAnna.ts` is the chat's compiled knowledge and should be updated whenever a case study's facts change — it currently carries the "why the bottom" reasoning, which was added there so the chat can make the same argument the page does.
