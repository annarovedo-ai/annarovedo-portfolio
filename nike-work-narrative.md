# Anna Rovedo — Nike

*Working narrative, not a case study yet. Everything below is drawn from Anna's own presentation script, her presentation slides, and the Figma source files. Items I could not verify are marked. No metrics or outcomes have been invented.*

---

## The shape of it

Anna spent roughly two years at Nike across two products, moving from sole designer on an acquired data platform to lead designer on a global order management system.

**2022 — Datalogue.** Nike acquired Datalogue, a data-pipelining company. Anna joined as senior UX designer and was the sole UX designer on the product.

**2023 — Nike Operations Workspace (NOW).** Anna moved to NOW as lead UX designer, working on inventory availability. That work shipped.

Two different kinds of design problem, which is what makes the pair interesting: one is maintaining and extending a live system nobody gets to redesign, the other is adding a genuinely new capability to a platform mid-global-rollout.

---

## Chapter 1 — Datalogue (2022)

### What it was

A data pipelining platform Nike acquired and absorbed. Users built, scheduled, monitored, and maintained data pipelines — connecting sources like Snowflake, defining schemas and data types, applying post-processing, and watching for failures.

### What Anna was doing

Sole UX designer, shipping **incremental improvements to software already in production**. This is not a redesign story. The Figma files are organized feature by feature, each following the same discipline:

- a cover page marked with the product name
- a status key — **To do / WIP / Approved**
- an **Overview / Context** page stating the problem, intended outcome, value, and target personas
- working pages, then a page explicitly labeled **"USE FOR DEV >>"** or **"MVP for Dev"**

That last detail matters: these were handoff artifacts feeding engineering, not concept work. Several files are named after ticket numbers (DTL-2869, DTL-3097, Sprint 27), which places the work directly inside the delivery process.

### The surface area she covered

Across ~20 files: pipeline creation, dataflow creation, advanced pipeline options, scheduling and batch actions, pipeline deletion, post-processing, data types, resiliency and field validation, health monitoring, alerting integration, filters, jobs tables, adding new resources, connecting to Snowflake, main menu, and settings.

Plus the entire first-run experience: **landing page, onboarding email sequence, onboarding videos, and a help section** containing how-to guides, SDK documentation, and a glossary.

That last cluster is the strongest evidence of range. She wasn't only designing screens — she designed how a new user meets the product for the first time, including lifecycle email and a support system.

### A representative example — deletion

The "Delete pipelines" file shows the level she was working at. Her own annotations on the canvas:

> "Trash can appears on tile hover. User clicks on trash can to delete individual pipeline. No multi-select for MVP."

> "Warning to user before deletion."

And the confirmation copy she wrote:

> "This will delete the selected pipeline and all applied transformations. It cannot be undone."

Scoped deliberately (no multi-select for MVP), destructive action guarded, consequences stated plainly. Small, but it's the texture of someone maintaining a real system rather than presenting an ideal one.

### Verified vs. not

- **Verified:** sole UX designer; files are real production work with dev handoff pages; the feature list above.
- **Not established:** whether each individual feature shipped, how the team was structured, or why the Datalogue chapter ended.

---

## Chapter 2 — Nike Operations Workspace (2023)

### What NOW is

In Anna's own words from the deck:

> "Nike Operations Workspace is a one stop shop for Nike ordering and order management. Our goal is to create a global, scalable, and seamless experience across the customer order management ecosystem."

It went live in Greater China in August 2023, with North America planned for 2024. Anna joined the team after the China launch, while the team was adding features, tuning the experience, and fixing known issues — again, live software, not a greenfield build.

### The problem

Order management staff had no single view of product availability. To answer one question they ran multiple reports and moved between separate tools, including SAP AFS and point-solution reporting.

The deck states it in one line:

> "Using multiple, fragmented tools results in a time consuming and inefficient process. **Delayed orders mean lost revenue.**"

That's a clean chain from user friction to business consequence, and it's the right altitude to open a case study at.

### Who it was for

Two personas: an **MPO Specialist** (marketplace operations specialist — manages customer purchase orders from capture through delivery, tracks orders, runs reports, coordinates with account contacts and internal partners) and an **MPO Supervisor** (onboards and manages specialists, allocates resources, oversees the work).

### The best part of the story — research under constraint

Anna was **blocked from interviewing actual end users** by internal process. Rather than stopping or designing on assumption, she went two routes:

1. Ran **proto-persona workshops** with internal stakeholders and SMEs — theming exercises clustering user goals, history, inefficiencies, and tasks.
2. When those left gaps, sent a **Qualtrics survey** to marketplace operations distribution lists across North America, collecting **47 responses**.

She is openly honest about the compromise in her own script:

> "I do recognize that this isn't the ideal way of arriving at validated personas... now we have either really, really thorough proto personas, or semi-validated ones. Either way, it's a lot more information than we started with. Sometimes you need to get creative with what you have."

That candour is an asset, not a liability. Keep it.

She also asked users *why* availability mattered to them, which produced quotes worth using verbatim:

> "It is the foundation and starting point to be able to order product and determine the status of those units."

> "Knowing where everything is at a moment's notice can help inform cross functional teams and best utilize the resources available to make business decisions."

### Round 1 — three directions

Working from a RICEF (the requirements document format governing feature work), Anna sketched three approaches:

1. **In-line flyout.** Check availability without leaving order creation or maintenance — triggered from the screen or main nav. A limited "inventory search lite," with a route to a fuller search when needed.
2. **Dedicated page with filters in a flyout.** Filters tucked away, full page for deep-diving results. Tidy, but adds steps to open and close the flyout repeatedly.
3. **Flat layout.** Most-used filters exposed at the top of the page, on the hypothesis that most users reach for the same few filters every time.

Her sketch annotations in the Figma file confirm the thinking: *"User can access the Inventory Check at any time through global or main nav," "Apply filters to find inventory," "Deep dive to find which sizes are avail."*

### The feedback grid — the real tension

Taken to SMEs, the responses split in a genuinely useful way. The concerns column includes, simultaneously:

- "Having too many options"
- "Missing fields that are important"
- "Learning curve"

Those pull in opposite directions, and resolving them is the actual design problem. The session also surfaced a feature nobody had asked for in the requirements: **download to Excel**, so results could be shared with clients and teams.

### The decisive move — narrowing the field list

The requirements listed roughly **40 searchable attributes**. Anna's hypothesis was that most users search on a small handful. Rather than argue it, she tested it — a second survey asking for the top four attributes by importance, other attributes they'd search, and what needed to appear in results.

The responses converged on: **material number, plant code, ISEG, material quality, and quantity.**

This is the strongest beat in the whole story. A ~40-field requirement was reduced to a defensible five by evidence, resolving the "too many options / missing important fields" tension without guessing.

### Round 2 and testing

Anna refined the wireframes and built a clickable prototype. Her own critique notes in the V2 file show the iteration in progress:

> "fields to add: distribution channel??? / item category / sales org / dates are too close together / header isn't distinct enough / which are required vs optional?"

In the tested design, performing a search lines the **filter chips up across the top of the data grid**, and the results become downloadable.

Test tasks: search for a material number; filter by plant, then by ISEG; download results; determine how many size large would be available on a specific date. **Four users tested; all completed the tasks unaided.** All four preferred saving filter sets on the flyout menu.

Testing was being extended to Greater China and European partners, with refinements still in progress (a denser grid, among others).

### Outcome

**The work shipped.** (Confirmed by Anna. No performance metrics available — don't claim any.)

---

## The through-line

Across both products, the same designer shows up:

- **She works inside live systems.** Neither story is a redesign fantasy. Both are about improving software people already depend on, where every change has to fit what exists.
- **She narrows scope with evidence.** 40 attributes to 5 via survey. "No multi-select for MVP." Deliberate reduction, defensible each time.
- **She routes around blockers.** Denied user interviews, she found another way to reach 47 real users.
- **She designs past the screen.** Onboarding emails, videos, SDK docs, glossary, help center — the whole first-run experience, not just the UI.
- **She's honest about her own methods.** The proto-persona caveat is the tell. She'd rather be accurate than impressive.

---

## Before anything gets published

Remove from any public version:

- The internal Qualtrics survey URL
- The Miro board link (dead, and internal)
- **The six MPO distribution list names** — internal Nike identifiers, should not be on a public site
- Real customer PO numbers, material numbers, and account IDs visible in the reference screenshots (e.g. the Global Case Management screen showing live order data). Blur or replace before use.

Safe to keep: the "47 responses" figure, the user quotes, the persona roles, the problem framing, and the design work itself.

---

## Open gaps

1. **Visual assets for NOW.** The Round 1 sketches, Round 2 wireframes, and prototype states exist in the Figma file but need exporting as images. The original Nike-workspace file and Miro board are no longer accessible.
2. **The Datalogue ending.** Why that chapter closed is unestablished.
3. **Anything post-launch** — adoption, feedback, whether the five-attribute bet held up in production. If none of this is known, the case study should simply say the work shipped and stop there.
