# All case study copy, compiled

Pulled directly from the live page files (`site/app/*/page.tsx`) on 2026-08-05. This is
every word of body copy currently on the site's five case studies, in reading order,
with headings kept so the structure is legible. Layout/component code stripped out.

Recruiter persona only, this is the base version everything else builds from.

---

## 1. IBM MaaS360 Chat Concierge, part one — `/concierge`

**Eyebrow:** IBM.com · Generative AI · Part one of the Concierge story
**Headline:** Designing an AI concierge for the enterprise buying journey.

IBM needed prospective customers to evaluate a complex enterprise product without a
salesperson in the room. The answer was not another chatbot. It was a guided
experience that could help buyers understand, compare, decide, and keep moving.

**Role:** Lead UX designer · **Methods:** Journey mapping, prototyping, validation ·
**Team:** IBM.com UX, research, visual design, content

### Executive summary — The opportunity was larger than chat.

Enterprise software is rarely bought by one person in one sitting. Buyers move
between research, demos, internal conversations, approvals, setup, and support. The
existing experience treated those moments as separate transactions.

The Concierge explored a different model: make help available in context, preserve
continuity across the journey, and turn conversation into something a buying team
could act on.

**The shift:** From "a chat window on a page" → To "a guided layer across the journey"

### 01 · The assignment — Make the future tangible enough to evaluate.

I owned UX for the concept on a multidisciplinary team led by IBM's Global Head of
UX. My job was to connect the buyer journey, the interaction model, and the evidence
into one direction people could see, question, and test.

That meant working across research, journey architecture, conversational patterns,
prototyping, and validation. It also meant resisting the temptation to start with the
chat interface. The journey came first.

- **01 Frame the opportunity** — Connect scattered buying moments into one coherent experience.
- **02 Prototype the behavior** — Show what useful assistance looks like before the system exists.
- **03 Put the idea in front of buyers** — Test comprehension, trust, and interest with real participants.

### 02 · Research and journey mapping — We started with two people trying to make one enterprise decision.

A developer evaluating technical fit and a decision-maker evaluating organizational
value needed different kinds of evidence. The design had to serve both without
turning the experience into two disconnected journeys.

Competitive research helped separate familiar chat conventions from the patterns an
enterprise buying journey actually needed.

David, the evaluator, needed enough product depth to judge technical fit. Sara, the
decision-maker, needed confidence, clarity, and a case she could carry forward.

David's journey revealed where evaluation stalled, where expert help mattered, and
where a useful artifact could reduce repetition. Sara's journey made the buying
committee visible and expanded the problem beyond a single chat session.

### 03 · Interaction model — Make help available without turning the page into a chat window.

The first concept used a bottom-docked conversational layer that stayed connected to
the page beneath it. Buyers could ask, explore, and continue without losing the
product context they were evaluating.

> The interface was intentionally quiet. The intelligence had to feel present, not intrusive.

- **Context** — Respond to what the buyer is already looking at.
- **Continuity** — Carry useful information into the next step.
- **Control** — Let the buyer decide when the assistant enters the experience.

### 04 · Prototype — The prototype had to prove more than a conversation.

A polished chatbot would have answered the smallest version of the brief. The
prototype instead followed the relationship from first interest through purchase and
setup, showing how AI could reduce friction across the whole journey.

Six-step flow:
1. **Ask for a demonstration** — The conversation begins in the context of the product page, without forcing the buyer into a separate tool.
2. **Explore the product** — An interactive demo replaces a generic sales pitch with something the buyer can actually evaluate.
3. **Clarify the need** — A short assessment gathers enough context to make the next response useful, not merely conversational.
4. **Shape a plan** — Recommendations are tied to the buyer's situation and stay visible as a decision artifact.
5. **Carry the decision forward** — The experience creates a summary that can move beyond the chat and into the buying committee.
6. **Continue after purchase** — The same relationship can support onboarding and setup instead of disappearing at conversion.

### 05 · Validation — We tested whether buyers understood it, trusted it, and wanted to continue.

Two rounds of unmoderated UserZoom testing moved the work beyond internal enthusiasm.
Participants evaluated the prototype as prospective buyers, giving the team evidence
about comprehension and interest before the experience advanced.

Testing produced strong comprehension and interest signals, giving the team evidence
that buyers could follow the model and wanted to continue the experience.

**Study design:** Unmoderated desktop prototype testing, two rounds in UserZoom,
three demo-style buying journeys. 3 research goals · 5 hours of testing · 15 participants.

What we needed to learn:
1. Are users open to using a chatbot for product discovery and research?
2. Can conversational assistance add value to purchase-related workflows?
3. Will users trust it enough to share information and make a purchase?

Participant profile: IT and business functions, InsurTech/EdTech/telecoms
industries, desktop demo-style journeys.

### 06 · The Concierge — AI became more useful when it stopped behaving like a feature.

The design turned chat from a separate destination into a persistent layer within
the product experience. It could explain what was on the page, help a buyer make
progress, and preserve enough context to make the next interaction better.

Available, not demanding. Contextual, not generic. Continuous, not disposable.

### 07 · From vision to live experience — The concept did not end when the presentation did.

I continued working on IBM's live chat experience, auditing the current state,
clarifying how conversation history should work, and translating the future vision
into patterns the team could prioritize and build toward.

The work moved between near-term product decisions and the larger question behind
them: how should assistance behave when it becomes part of the site rather than a
widget attached to it?

### 08 · What if the AI was the page?

While the live chat work continued, I began working directly with Amy Clark, IBM's
Global Head of UX, on a much bigger question: what if AI didn't just respond inside
a page, but orchestrated the journey itself, adapting content, surfacing tools, and
scoring intent in real time? That direction outgrew a single chapter here, so it has
its own case study.

### 09 · Reflection — The interface was never the most interesting part.

The most important decision was to treat conversation as connective tissue across a
complicated buying journey, not as a novelty placed at the edge of a page.

That shift created room for better questions: what context should persist, what
should become an artifact, when should a person enter, and how transparent should an
adaptive system be about what it knows? Those questions shaped the Concierge and
continue to shape how I think about agentic products now.

---

## 2. AI-driven journey orchestration, part two — `/journey-orchestration`

**Eyebrow:** IBM.com · Part two of the Concierge story · Concept direction
**Headline:** What if every page rewrote itself around the person reading it?

After the Concierge shipped its first chat-based direction, I kept working on the
live experience with IBM's team. A few weeks into that work, alongside Amy Clark,
IBM's Global Head of UX, we realized the bigger opportunity wasn't a smarter
chatbot. It was a smarter interface, one where AI orchestrates the entire journey,
not just a conversation docked to the bottom of it.

**Role:** UX lead, concept & system design · **Partner:** Amy Clark, Global Head of
UX, IBM.com · **Status:** Concept direction · not launched

### Where this picks up — The first version was still a chat. This is not.

The Concierge's first direction (the full story is in part one) proved something
real: buyers were open to conversational help inside a product page, and would trust
it enough to keep going. It used a bottom-docked layer, an early concept internally
nicknamed for its thin, blade-like shape, deliberately positioned like the AI panes
people already trust (ChatGPT, Gemini, Claude), not a sales popup in the corner.

That version still treated AI as a feature bolted onto a page. This direction asks a
different question: what if the AI became the page's operating system instead,
shaping what a visitor sees next, not just answering what they ask?

**The reframe:** From "an assistant that responds inside the page" → To "a system
that orchestrates the page around the journey"

### 01 · Why now — The market had already started answering this question.

Looking around at where AI interfaces were moving made the direction feel less
speculative and more overdue. The pattern across every reference point was the same:
the interesting move wasn't a better chatbot, it was AI reshaping the surface around
it.

- **Salesforce Einstein Copilot** — An AI assistant that doesn't live in a chat box, it reconfigures dashboards and recommendations based on intent.
- **Google's generative search** — Teaching people to expect adaptive, AI-curated journeys instead of a static list of links.
- **Walmart × OpenAI** — An AI-first shopping experience that lets customers plan, shop, and check out through ChatGPT, the whole funnel becomes a conversation.

(Reference points gathered while framing the direction, not products Anna built,
evidence the interface pattern was already moving this way industry-wide.)

### 02 · The thesis — A chatbot answers. This orchestrates.

*AI-driven journey orchestration + lead scoring*

The same intelligence that powers a conversation can also drive orchestration:
detecting intent, adapting content, and reshaping what a visitor sees next. Instead
of living in a corner, the AI becomes the conductor of the whole experience, turning
a passive page into something responsive and alive. Lead scoring turns every one of
those interactions into a measurable signal, so the system learns who's engaged,
who's ready, and where to focus next. Every page becomes a conversation. Every
action becomes a signal.

**Meet the buying committee — One purchase, four very different questions.**

Enterprise deals aren't decided by one visitor. To make the system concrete, we
followed Jamal Cross, a technical lead, through the journey, but the same page would
adapt just as readily for the finance, strategy, or risk stakeholder evaluating the
same purchase alongside him.

- **Jamal Cross**, Lead AI/Integration Architect (persona followed) — "Will the code actually work, and will it integrate with our existing systems?"
- **Elaine Vance**, VP of Finance — "What is the guaranteed ROI, and what's the cheapest way to structure the deal?"
- **Richard Sterling**, CEO / Owner — "Is this a sound strategic investment that positions us well for the next five years?"
- **Dr. Mei Lin**, Head of Risk & Governance — "Does this solution violate data privacy laws, and are we safe from compliance risk?"

### 03 · Walking the journey — Three phases, one visitor, a page that keeps rewriting itself.

Every action Jamal takes, a click, a scroll, a demo watched, feeds a live lead score
behind the scenes. The score doesn't just get logged; it decides what the page shows
him next.

Five-step loop, running continuously: observe signals → form intent → adapt the page
→ create an artifact → orchestrate handoff → (feeds back into observing signals).

**Phase 1: Awareness → Predictive entry**
Jamal googles "find root cause, lower MTTR" and lands on the page already
mid-intent, not in browse mode. The system already has a sense of why he's here, so
instead of a generic headline, he sees a message that names his own search back to
him and a page pre-assembled around it. The CTAs are framed as prompt options that
match what he came looking for, instant relevance from the first second, before he's
typed anything.
Lead-scoring triggers: 5 pts, arrival from a targeted campaign or high-intent
keyword. 10 pts, clicks the tailored hero CTA (ROI calculator or demo).

**Phase 2: Engagement → Adaptive content & micro-incentives**
Jamal never has to open the chat for the system to keep learning. As he scrolls, the
page listens and reshuffles: watching a demo pulls a case study forward, lingering
on technical content pushes in comparisons and data sheets. When he does engage,
asking to "estimate ROI savings", the conversation happens inline, in the same
space, with no pop-up and no redirect. He never loses his place in the journey.
Lead-scoring triggers: 5 pts, engages with a secondary content module (case study,
pricing, calculator). 20 pts, completes the "upload your data" or "generate roadmap"
interaction.
(Note: the ROI calculator screenshot shows the tool's own example output, MTTR
reduction, ROI, annual savings figures, not a claimed business result.)

**Phase 3: Conversion → Human-assisted orchestration**
When Jamal finishes the calculator, the system offers to save his results, signing
in turns that ROI report into a persistent artifact in his workspace, not just a
page he'll lose track of. As his score climbs, the AI adjusts its offer: a medium
score surfaces proof points or a free trial; a high score unlocks a personalized
demo. Past a threshold, the payoff moment arrives, he's introduced to a specialist
who already knows what he's interested in, so the handoff starts mid-conversation
instead of from zero.
Lead-scoring triggers: 25 pts, opts in for a summary or consult via AI chat. Medium
score → proof points or trial · High score → personalized demo + human handoff.

### 04 · The payoff — The moment a page hands off to a person, on purpose.

Once Jamal is a qualified lead, the system doesn't just push him toward a form. It
unlocks a specific person, already briefed on what he's explored, and lets him book
time directly. The handoff is the reward for engagement, not an interruption to it.

**Key system decisions — The hardest questions were about agency, not animation.**

- **Context is provisional** — Intent stays a revisable hypothesis, not an invisible, permanent profile.
- **Artifacts outlive conversations** — A saved ROI report or comparison gives the buying committee something concrete to act on after the tab closes.
- **Qualification needs a handoff** — Lead scoring matters only if it helps the system introduce the right human at the right moment, not just tag a record in a CRM.
- **Personalization must be legible** — Buyers should understand why the page changed and stay able to inspect or reset what the system remembers.
- **Control is reversible** — Agentic mode is a visible toggle, on by default in the concept but always off with one click if someone would rather browse a plain page.

**Frameworks that followed — Designing for the realities around the interface.**

- **Buying committee** — Model how evaluators, decision-makers, finance, and risk each contribute different evidence to one shared purchase decision.
- **Honest comparison** — Let buyers compare alternatives credibly, trust compounds, and a franker comparison surfaces what people actually value.
- **Consent architecture** — Define what the system remembers, why it adapted the page, and how a buyer can inspect or undo that relationship.

This entire case study is a concept direction, not a shipped claim. It shows the
system-level thinking that grew out of the Concierge's first release and the
questions it opened, worked through with Amy Clark and IBM's UX team, not a launched
product.

### 05 · Reflection — The interesting problem was never the chat window.

Once conversation stops being a destination and starts being connective tissue
across a whole journey, the real design questions show up: what should the system
remember, what should become a durable artifact, when should a person step in, and
how transparent should an adaptive page be about what it knows and why it changed.

Those questions were bigger than the Concierge's original brief, and they're the
ones I'd want to keep working on next, for IBM or anywhere buyers are asked to make
a complicated decision alone.

---

## 3. Redesigning search across IBM.com — `/search`

**Eyebrow:** IBM.com · Search · Live and evolving
**Headline:** Redesigning search across IBM.com.

A search results page looks small until it has to make an ecosystem as complex as
IBM understandable. I led the UX from audit and research through interaction design,
testing, and launch.

**Role:** Lead UX designer · **Scope:** Audit, research, interaction design,
prototyping · **Launch:** US-English MVP live, with continued iteration

Before: six destinations (All, Products, Downloads, Learning, Support, Developers)
competing to answer one question. Launched direction: one result set, filter without
losing context; clearer content signals, recognize the answer before clicking.

### Executive summary — Search was doing more work than the interface admitted.

People use search when the site has not yet given them a clear way forward. On
IBM.com, that often means navigating products, documentation, support, learning, and
technical content at the same time.

The existing experience exposed those organizational boundaries directly. The
redesign created one clearer result journey, then used filters, labels, recovery
paths, and specialized destinations to help people move through it.

Three jobs of the search experience: **Findability** (reach known content faster),
**Discoverability** (recognize relevant content along the way), **Recovery** (keep
moving when the first query fails).

### 01 · The starting point — One query became six different searches.

The old result page asked people to choose between All, Products & services,
Downloads, Learning, Support & documentation, and For developers before they could
understand where IBM had classified the answer.

Each tab carried its own result behavior, filters, counts, and dead ends. The
interface made the company's content model visible at exactly the moment a person
needed clarity.

### 02 · From audit to evidence — The audit gave us hypotheses. Research told us which ones mattered.

The work began in May 2025 with an audit of result quality, user journeys, and
friction. That review exposed questions analytics alone could not answer, so the
next step was research focused on how people interpreted the page and where they
became stuck.

Process: audit the system → follow the friction → test the mental model → design
from evidence.

Findings:
1. **Tabs behaved like separate search engines** — People had to understand IBM's content structure before they could find an answer. A result could exist in another tab while the active tab appeared empty.
2. **Results were difficult to scan** — Dense lists offered too few signals about what each result was, which made comparing products, documentation, learning, and support content unnecessarily slow.
3. **No results ended the journey** — The page explained that nothing was found, but gave people weak recovery paths and little help deciding what to try next.
4. **Specialized search paths were hidden** — Product, support, and learning experiences existed, but the general search page did not make those destinations easy to discover at the right moment.

### 03 · The design response — Five changes turned a result list into a way forward.

The goal was not to decorate the old page. It was to remove the organizational logic
users were being asked to carry and replace it with decisions that supported
finding, discovering, and recovering.

1. **Replace tabs with filters** — Keep one coherent result set, then let people narrow it without losing context or wondering whether another tab contains the answer.
2. **Label content types** — Make product pages, documentation, learning, support, and editorial content recognizable before a user commits to a click.
3. **Continue instead of paginate** — Use a continuous "See more" pattern so the result journey does not reset at every page boundary.
4. **Design recovery paths** — Treat zero results as a moment to reformulate, broaden, or move into a more specialized IBM experience.
5. **Connect specialized search** — Create clearer pathways to tools such as Product Finder when a general list is not the most useful answer.

**A decision before a design — Filter behavior determined the system underneath the screen.**

Prototyping paused while the team resolved whether filters should allow one
selection or several. That choice affected ranking, consistency with IBM's finder
experiences, and the journey a user would have after narrowing the result set.

- **Option A, multi-select** — More flexible and consistent with finder behavior, but it required a credible way to rank content selected from several categories.
- **Option B, single-select** — Faster to implement and simpler to rank, but potentially inconsistent with the behavior people encountered in specialized finders.

Information architecture: documented current journeys from entry point to query to
destination, using the 50 most recurrent queries. User research: defined the ideal
state for target audiences through the needs and expectations of different personas.
UX: resumed prototyping once the behavioral decision was clear enough to design and
evaluate.

Once the filter definition was resolved, SERP prototyping moved forward. Journey
work remained useful for the masthead and typeahead exploration, which continued in
parallel.

### 04 · Recovery — Zero results had to become a recovery state, not a verdict.

The old page apologized, offered generic search tips, and scattered possible next
steps across unrelated cards. It acknowledged failure without helping people
diagnose it.

The redesign treated no results as part of the search journey: preserve the query,
offer relevant ways to broaden or revise it, and reveal a specialized destination
when it can do a better job.

Recovery model: 1) Broaden the scope, search all IBM content without losing the
query. 2) Revise the language, edit spelling, phrasing, or specificity in place. 3)
Choose a specialist, move to Product Finder, Support, or another purpose-built
experience.

### 05 · Tested next — Help before the query is finished. (Concept, not launched)

We also prototyped and tested three typeahead directions. The question was larger
than autocomplete: could the search box help people form a useful intent, reach a
specialty experience, or act before they reached a results page?

This work remains a tested direction, separate from the launched SERP. It belongs
here because it shows how the project extended from fixing a result page to
reconsidering the role of search across IBM.com.

Query suggestions: help people complete or reformulate language without taking over
the decision. Guided actions: offer a useful next step when the intent is clearer
than the exact destination. Specialized destinations: route product, support, and
learning needs into experiences designed for them.

### 06 · Launch — The redesign is live. Search is not finished.

The team dark-launched the MVP at a dedicated v3 URL, then began redirecting
US-English traffic to the new experience. The release simplified navigation,
introduced filtering and clearer result signals, replaced pagination with
continuous results, improved no-results recovery, and created better paths to
specialized search experiences. Global rollout was planned as the next deployment
phase.

Live in the US-English MVP: unified result journey, filters replacing tabs,
content-type labels in the primary result experience, continuous "See more"
results, no-results recovery, specialized search pathways.

Post-launch iteration: correct labeling for promoted Suggested Matches, consistent
query-term emphasis in titles/URLs/descriptions, clearer relevance signals when a
promoted result leads the list, globalization beyond US English.

**What the launch exposed — Production revealed the edge cases the prototype could not.**

Suggested Matches, promoted results managed through IBM's Kepler tool, could surface
a non-product URL inside the Products filter without the expected label. Query terms
were also not consistently emphasized across the title, URL, or description.

These issues did not block deployment, but they mattered because they affected the
exact signals people use to understand why a result is present. They became
concrete iteration work rather than being erased from the story after launch.

The launch brought together Design, Research, Information Architecture, Unified
Search, PMO, engineering, content strategy, accessibility, and testing across
IBM.com.

### 07 · Future state — What happens when search can help interpret the question? (In exploration, not live)

The live SERP improves how people navigate results. The future state asks a
different question: where can AI reduce the work of forming the query, evaluating
the evidence, and deciding what to do next?

The goal is not to replace search results with an unexplained answer. It is to add
an intelligent layer that can clarify intent, synthesize grounded information, and
preserve direct access to the sources and specialist experiences underneath it.

Live foundation: "Find and filter results", a clearer interface helps people
navigate IBM's content ecosystem. → AI-integrated future: "Understand, answer, and
act", an intelligent layer helps interpret intent while keeping evidence and user
control visible.

Example prompt: "I need to secure employee devices across several countries. Where
should I start?"

1. **Clarify the intent** — Ask only for the missing context that would materially change the answer.
2. **Ground the response** — Synthesize from trusted IBM content and make every source available for inspection.
3. **Keep the result set** — Let people move between an AI-supported answer and the underlying products, documentation, and support content.
4. **Offer the next useful action** — Compare products, refine the query, open Product Finder, or continue into a specialist experience.

Guardrails: **Evidence** (answers show where the information came from), **Control**
(users can edit intent, inspect sources, or return to standard results),
**Boundaries** (the system is explicit about uncertainty and hands off when a
specialist is more useful), **Continuity** (the query and context can carry into
product, support, or learning journeys).

This chapter describes the next design direction and the questions still being
worked through. It is intentionally separate from the live SERP release.

### 08 · Reflection — The simplest experiences often have the longest stories behind them.

The project did not begin with a redesign. It began with an audit, followed the
questions that evidence could not answer, and gradually changed the model
underneath the interface.

That is the part of search design I find most compelling. A result page is not
merely a list. It is where a company reveals how it understands its own information
and whether it can help someone make sense of it.

---

## 4. Designing the visual language for State Street Alpha — `/state-street`

**Eyebrow:** State Street Alpha · Visual language and design system
**Headline:** Designing the visual language for a financial operating system.

Alpha brings investment operations, oversight, and analysis onto one platform. I was
the sole UI designer who defined the visual language, accessibility foundations, and
component system that makes its dozens of workflows feel like one product.

**Role:** Associate Creative Director · Sole UI designer · **Scope:** Visual
language, accessibility, design system, product UI, implementation QA ·
**Engagement:** One year · Publicis Sapient for State Street Bank

### Executive summary — Unified in strategy. Fragmented in experience.

Alpha pulls data from internal and external sources, Bloomberg among them, into
real-time visualizations of positions, exposures, and investable cash for operations
managers, oversight teams, and analysts, all working from the same platform. A
shared product name did not create a shared product language.

My job was to define the rules underneath the screens: how typography, color,
hierarchy, interaction, and data display should behave across teams and products.
The core problem was never decoration. It was hierarchy, what to show first, what to
let users find, and what to let them ignore.

The system's three jobs: **Interpret complexity** (help expert users scan without
removing the information they need), **Protect meaning** (give color, type, and
interaction consistent jobs across the platform), **Scale decisions** (turn one
visual point of view into reusable product infrastructure).

### The real constraint — Get the details wrong and users stop trusting the numbers.

This was not a matter of applying a logo and choosing a few interface colors.
Financial users read meaning into every alignment, hue, decimal, and state.

The system had to make complexity easier to interpret without flattening it, and
preserve the same hierarchy across dense tables, charts, controls, and separately
optimized light and dark environments.

- **Color** — Red meaning four different things makes it easy to misread.
- **Data** — A decimal point can change the meaning of an entire row.
- **Density** — Removing information can make an expert workflow harder.
- **Behavior** — One inconsistent component can create uncertainty across products.

### 01 · Designing around the workday — Glanceable at rest, deep at the point of concern.

The brief, verbatim: enable users to get a quick snapshot of the most important
information at-a-glance, and easily deep-dive into areas of interest or concern.

That meant designing for two speeds of attention, the daily scan and the focused
investigation, for operations managers, oversight teams, and analysts who each open
Alpha for a different reason.

Three personas: **Debra M.**, Operations Manager, 20 years at State Street, manages
a team of 5 to 8 and needs simplicity across her most-used tools. **Rebecca C.**,
Oversight Manager, owns reporting quality and reconciliation, and needs one place to
see and route a problem. **Ralph W.**, Operations Analyst, fields escalations from
teams in India and Poland and needs a faster way through funds with thousands of
assets.

> "Success for me is a system that only shows me what me and my team need to do our
> jobs, integrates common sense tools so I don't have multiple applications open,
> and is smart enough to know what to automate and make into a template for future
> ease of use and access." — Debra M., Operations Manager, from the persona research

Debra's day starts at 4 or 5am, checking email and Teams for issues from other time
zones. By 9:30 she has a running list and is assigning it to her team, then she and
Ralph spend the rest of the day in meetings just to communicate where everyone
stands, re-running calculations by hand along the way. The opportunity was obvious:
surface errors and warnings on the platform itself, automate the calculations, and
stop making people meet about a to-do list a tool could show them.

Across all 6 users interviewed for this research, automation of redundant tasks came
up as the strongest single theme, alongside data accuracy, tool integration, and
system latency.

### 02 · The first problem was not color, it was hierarchy.

The client had already started building Alpha before this engagement, and a beta
launch was approaching. Early on, I audited the existing product and logged the
fixes with the most impact for the least effort, unglamorous work, but it set the
terms for everything that followed.

Three stages tell the real story: the legacy portal I inherited, my own first
redesign pass, and the North Star that came out of what that first pass got right
and wrong. Nothing here is a mockup standing in for "before", every screen below is
a real, dated build.

Early change log:
1. **Controls** — Two save buttons did the same thing from two places. Save and close moved to one location, at the bottom of the flyout.
2. **Iconography** — A refresh icon meant "run" in one context and "delete" in another. It became a plain "Apply" button instead.
3. **Color** — Brand green was read as a sequential scale for comparing percentages, when the values needed no secondary visual cue at all.
4. **Data display** — A bubble chart encoded the same value twice, in both size and position. Size became constant so position could carry the meaning, and every bubble got easier to read and to click.

**Stage 1, Before, the legacy portal:** six identical KPI tiles, five reference
tables, unbranded and undifferentiated, everything given equal weight, which is the
same as giving nothing weight. Lesson for Round One: fix the hierarchy before
touching a single chart.

**Stage 2, Round One, my first redesign pass:** real progress, a subject, a brand, a
KPI row, a composition chart, a movers list. Also three problems still unsolved, a
donut chart asking users to compare slice angles, a table burying 15 identifier
columns under a sparkline and a range slider, and a KPI card colored only because it
happened to be built first. Those three became the brief for the Final.

**Stage 3, Final, North Star dashboard:** the same job, redone, a growth-over-time
chart in place of the donut, two ranked bar lists in place of guessing at slice
sizes, and a data grid rebuilt around exceptions, errors, warnings, status, and who
owns the fix, instead of static security identifiers.

What changed between Round One and Final:
1. **Comparison over composition** — A donut chart asks a viewer to compare angles, one of the hardest visual judgments there is. Ranked horizontal bars ask them to compare lengths, which people read precisely and fast. Same allocation data, a chart that's actually easier to use.
2. **One KPI card, not one loud one** — Round One gave Total Market Value a solid color block and left the other two KPIs plain, an accident of build order, not a decision. In the final, all three KPIs share one visual weight, and color is reserved for the value itself: green for a gain, red for a loss.
3. **The table's job changed** — Round One's table described every security, 15 columns of identifiers, a sparkline and a range slider in every row. The final grid is built around exceptions: errors and warnings flagged and color-coded, status and an owner visible per row, so the person using it can act instead of just read.

### 03 · The North Star — One architecture, two environments.

The final dashboard forced the visual language to work under pressure: KPIs,
allocation, movers, a growth chart, and a dense holdings table, all expected to hold
up in both a light and a dark environment.

Light theme: a high-information workspace organized for scanning, comparison, and
repeat use. Dark theme: the same information architecture, component behavior, and
semantic color roles carried across environments, system proof, not a cosmetic
re-theme.

1. **Design for scanning** — Right-aligned values, row striping, and persistent column structure made dense financial tables easier to compare horizontally.
2. **Preserve working context** — Pagination replaced infinite scroll so users could orient themselves in large datasets and return to a known position.
3. **Let meaning control color** — Semantic states, chart series, and brand accents each received distinct roles across light and dark environments.

Not a concept, a system running on real screens. Looker powers the visualizations,
and early on, powered the data grid itself. Every tile on a page, a ledger, a
compliance check, a country exposure view, is its own named component pulling from a
Looker or CRIMS source, which is what lets the same system scale to dozens of
workflows instead of one screen.

Working prototype, Performance Report: performance against benchmark, from one
month to since-inception, with a client-by-client portfolio summary below it.

### 04 · From a screen to a system — The visual language became product infrastructure.

Each level inherited the decisions beneath it. That made the system flexible enough
to compose, but constrained enough to keep teams from inventing a new product
language screen by screen.

The color system is anchored on three brand colors from the Alpha marketing site,
green, yellow, and blue, and every other hue in the system is derived from them by
shifting hue alone against their HSB values, then calculated into full tint stacks
using the Eva Design System. The one deliberate exception: an early version reused
the brand red as the primary data-point color, but it read too strongly as an error
state, so it became its own color, distinct from system red, reserved only for
marking a value.

Type styles follow the same logic. Alongside a standard heading and paragraph scale,
the system names styles for what they're used for, card header, table header,
column group title, so another designer could find the right style by the job it
does, not by guessing which heading level looks right.

Five-level atomic structure: **01 Foundations** (grid, spacing, typography, and an
accessible color and data-visualization palette), **02 Atoms** (buttons, labels,
inputs, tooltips, cursors, and progress indicators), **03 Molecules** (fields,
dropdowns, list groups, tabs, pagination, and snackbars), **04 Organisms** (tables,
cards, alerts, navigation, modals, accordions, and popovers), **05 Product
templates** (complete financial workflows assembled from the same rules).

Component coverage: 22 categories across states, sizes, and themes (buttons, forms,
labels, snackbars, cards, dropdowns, list groups, input groups, tooltips, cursors,
tables, alerts, tabs, media objects, progress bars, spinners, navigation, modals,
pagination, popovers, accordions, toasts).

### 05 · Data visualization and accessibility — Color had to carry meaning, not just brand.

Semantic states, neutral text, and chart series each needed their own palette so the
same hue never carried two conflicting meanings. Every swatch was documented against
AA and AAA contrast targets for normal and large text.

The categorical palette was the hardest of the three: enough contrast between colors
that a legend stays legible, not so many hues that the chart turns to noise, and
every pairing tested for accessibility. Brand colors are front-loaded so the first
few series in any chart still read as Alpha.

Designers are trained to make a palette feel harmonious, cool colors and grays, kept
close on the wheel, always reads as pleasant. That instinct works against you here.
Users build meaning out of unconscious color groupings: if the sector-allocation
bars, the top-movers bars, and the background chrome all sit in the same blue
family, people will read them as related even when they aren't. Every chart on the
North Star dashboard needed its own hue, deliberately, for exactly this reason.

1. **Trend, sequential** — The growth-over-time chart carries one series in one brand hue. Nothing else on the page competes for that color, so a glance tells you it's the headline number.
2. **Ranking, categorical** — Sector allocation and top movers sit side by side, and each gets its own hue, blue for one ranking, green for the other, so a user's eye never merges two different comparisons into one.
3. **Exceptions, semantic** — Red and yellow are reserved, system-wide, for errors and warnings. They never appear anywhere else on the dashboard, not in a chart, not in a brand accent, so when a cell turns red, it is never ambiguous.

### 06 · Implementation quality — The system had to survive contact with the build.

Search and sort are never as simple as they look. The easiest way to build search is
to search only what the client already has loaded, it's a smaller lift for
engineering, and it quietly fails the user, who reasonably expects a search to cover
everything in the system.

I pushed back on that shortcut, on search and on sort both. It wasn't about policing
engineers, it was about protecting what the system had promised: that a dense,
expert-facing tool would still behave the way its users expected it to.

### 07 · Scope and outcome — The work became a shared way of making decisions.

The visual language, accessibility foundations, component system, and product
templates were completed, used by other designers, and handed to development.

The engagement ended before launch because of agency budget and contract changes
unrelated to the work. The honest outcome is a fully articulated system and product
direction that reached implementation, not a claim that the final experience
shipped.

Completed: visual language and design tokens, accessible color architecture,
22-category component system, light and dark product direction, implementation
review and QA. Project boundary: system handed to development, broader design team
adopted the work, agency engagement ended before launch.

### 08 · Reflection — The smallest UI decisions carried the largest system.

A type size, a semantic color, or the alignment of a number can look incidental in
isolation. Across a financial platform used by operations managers, oversight teams,
and analysts, those decisions become trust, speed, and shared understanding.

The system worked because every visible detail could trace back to the same point
of view, and because it gave other designers and engineers a consistent way to make
their own decisions, long after I handed it off.

---

## 5. Kmart, Keep Your Secret — `/kmart`

**Eyebrow:** DraftFCB Chicago · 2010 · New business pitch
**Headline:** Kmart had always sold clothes. Nobody had a reason to look again.

A new in-house design team, a studio in New York, a genuine relaunch of the clothing
line. The product had changed. The assumption about it had not.

**Role:** Art director and designer · **Format:** Four day creative sprint, global
agency team · **Status:** Pitch concept · outcome unknown

### The brief — The product was not the problem. Reappraisal was.

Target had spent years and a lot of money on its design department, and it had
worked. People went to Target on purpose, for the design, and said so afterwards.

Kmart was trying to do the same thing, and this part was real. They had hired a team
of fashion designers, put them in a studio in New York, and were relaunching the
clothing as something worth choosing rather than something that happened to be on
the shelf.

None of it was public yet. The designers were hired and the studio was working, but
the lines had not launched. The work up for grabs was the campaign that would
introduce them, and several agencies were pitching for it. Which is worth sitting
with for a second, because it means we were building a campaign about a secret for
a product that still was one.

The problem in three parts:
1. **Nothing about it read as news.** Kmart had always sold clothing, so "Kmart sells clothes" was not an announcement. What was new was that the clothes were now designed, and nobody had any reason to go and check.
2. **Nobody arrived intending to buy them.** The people who bought clothes there were in the store for something else, passed a rack, and picked something up because it was in front of them. A discovery, not a destination.
3. **The ones who did buy would not say so.** Admitting where the clothes came from carried a cost, and no amount of advertising was going to argue somebody out of that.

### 01 · Fifteen people, four countries, four days.

DraftFCB flew in writers, designers, art directors and creative directors from
offices across its global network. Italy, France, Argentina, Germany. About fifteen
people in the Chicago office over a long weekend, starting Thursday and pitching
Monday night.

We were split into three groups of three or four, each taking the same brief from a
different angle. It was not a competition between us. Creative directors moved
between the teams, and their job was less to judge than to keep the three stories
from converging. On the last day we workshopped all three together and sharpened
them into what got presented.

I was brought in for my fashion background. I had spent years designing apparel
graphics, hangtags and labels in Italy and Spain, and I knew that market, including
how it worked in Europe. That was the reason I was in the room.

The format was closer to how I like to work than anything I have done since.
Brainstorm as a group, break apart, build, come back, critique, break apart again.
Someone ordered Chinese food. It ran for four days and I have rarely enjoyed work
more.

### 02 · We stopped arguing with the embarrassment and made it the mechanic.

Fashion advertising, in the aspirational titles, showing women who look like they
have something they are not telling you. The line under each one is a confession
that has nothing to do with clothes.

The secret is not that the dress came from Kmart. That is the joke, and it means the
campaign never has to say the embarrassing part out loud.

### 03 · A password is a reason to go somewhere on purpose.

Underneath the campaign sat SHHH.com, a members-only site behind a password.
Exclusive online deals, must-have pieces, trend and news content, and a network of
other people in on it.

That is the part that answers the actual brief. The ads buy you awareness, but you
cannot stumble into a members-only site the way you stumble into a rack on the way
to the checkout. Membership also flips the stigma rather than denying it. The point
is no longer that nobody can know. It is that not everybody does.

Gated deals, insider content and a social layer were still new for a mass retailer
in 2010. The proposal was not a website with a campaign attached. It was a brand you
had to be let into.

### 04 · One device, every surface.

Duct tape. Over the thing you do not want read.

I do not remember who said it first. That weekend was continuous riffing and nobody
owned a single idea. What I can tell you is where mine came from. I had spent years
making hangtags, woven labels and in-store graphics for clothing brands, so I was
thinking about the object in the customer's hand, and the tape went onto the parts
of that object that name the retailer.

I built the site comps, the bag and the print layouts. The writers worked the copy.
We put it in front of each other several times a day.

Every surface:
- **The bag** — Pink, with the Kmart logo covered by tape reading SHHH.COM. The idea compressed into one object you carry out of the store.
- **The K** — The Kmart mark rebuilt out of duct tape, so the brand itself carries the device rather than sitting next to it.
- **Hangtags** — Tape over the label, peeling off to reveal the Kmart logo underneath. The reveal happens in your hands.
- **Print** — The Keep Your Secret ads, placed in the aspirational fashion titles where Kmart had no business being.
- **The site** — A password, then a members' homepage: look of the day, exclusives, video, and the other people who were in on it.
- **Popup stores** — Unbranded shops in major cities, stocked entirely with the new lines. Every label taped over.

### 05 · You find out where it came from after you have already decided you want it.

Popup stores in major cities, stocked entirely with the new Kmart lines. Nothing in
the shop branded Kmart. Every hangtag covered with a strip of duct tape.

You shop the rails and judge the clothes on the clothes. You buy something. It goes
into a bag with the tape over the label. You leave. And somewhere outside, you peel
the tape off and find out you just bought it from Kmart.

This is the part the whole campaign is built to arrive at, and it is why the tape is
the device rather than a graphic style. Every other surface is rehearsing the same
move at lower stakes: the ads withhold the secret, the site puts it behind a
password, the bag holds it until you are out of the shop.

The popup store sequence:
1. **Nothing is branded** — An unbranded shop, stocked entirely with the new lines. No logo anywhere in the room.
2. **Every label is taped** — A strip of tape over each hangtag. You have nothing to judge but the garment.
3. **You buy on the clothes alone** — The decision gets made before the brand ever enters it.
4. **The reveal happens outside** — Peel the tape off the bag or the tag, and there it is. Too late to be embarrassed about a choice you already made on merit.

It answers the brief exactly. Nobody had a reason to look again, so the store
removes the thing that stops people looking, gets an honest verdict on the product,
and only then puts the name back on it.

### 06 · The route we did not take.

The same group also explored MARKT, a harder rebrand that moved further from the
Kmart name, with SHHH living inside it as a section alongside Look of the Day and a
member gallery.

It is the more cautious of the two ideas and it did not go as far. Worth keeping in
the record, because pitch weeks are not one idea arriving fully formed. They are
several, argued out loud, until one of them earns the room.

### What happened — We were the far end of the scale, and I think that was the point.

Three routes went to the client. A safe one, a middle one, and ours. Part of the
reason ours was presented at all was to show how far the territory could go. I did
not present. I made the work.

I do not know which direction the client chose, or whether any of this ended up
anywhere. Sixteen years later I am not going to invent an outcome I never saw. What
I know is what the pitch was, what I made, and what it felt like to make it.

What I can point at is where the brand went. Kmart kept pushing on exactly this
problem, and by 2013 it was launching named celebrity clothing lines, including one
with Nicki Minaj, so that people would come for the clothing by name rather than
find it on the way to something else.

I am not going to claim our weekend caused that, because I have no idea whether it
did. But the argument we were making in 2010 was the same argument: the product had
already changed, and what was missing was a reason to arrive on purpose. We were
three years early to a position the brand eventually took.

### 07 · I was picked for the detour.

Fifteen people flown in from four countries, all of them good, all of them glad to
be there, all pointed at one problem for four days. I had not seen before that it
was possible to assemble that and have it work. I have wanted to be back in that
room ever since.

The second thing is more personal. The years in Italy and Spain designing clothes,
the sewing, the fashion masters I paid for by taking advertising contracts between
terms, all of it read on paper as time spent away from the career. On this project
it was the reason I was useful.

Nobody could have told me that in advance and I would not have believed them. It is
the thing I have relied on ever since: that trends and objects and interfaces all
come from the same human place, and that knowing more than one field is what lets
you see it.
