# Claude Cowork handoff — Anna Rovedo portfolio

Last updated: 2026-08-03

## Immediate assignment

Continue rebuilding the State Street Alpha case study at:

- Route: `/Users/arovedo/website portfolio/site/app/state-street/page.tsx`
- Shared CSS: `/Users/arovedo/website portfolio/site/app/globals.css`
- Case-study assets: `/Users/arovedo/website portfolio/site/public/case-study/state-street`
- Local preview: `http://localhost:3001/state-street`

The existing State Street page uses an early product iteration and is not authoritative. Replace those visuals and revise the story using the three original Figma exports below.

## Authoritative State Street source files

- `/Users/arovedo/Desktop/Alpha Case Study Deck.fig`
  - Use as the primary story source and for the verified before/iteration/final sequence.
- `/Users/arovedo/Desktop/Alpha UX.fig`
  - Use as the source for product UX and final application screens.
- `/Users/arovedo/Desktop/UI Kit alpha anna's copy.fig`
  - Use as the system evidence: grid, spacing, color, type, components, templates, and design-system progression.

Treat the deck as narrative evidence, Alpha UX as product evidence, and the UI kit as system evidence. Do not substitute earlier portfolio screenshots when an authoritative frame exists in these files.

## Verified State Street story

State Street Alpha was not merely a dashboard redesign. It was a complex financial platform intended to help investors manage products and business lines in one place, with aggregated data, analytics, and real-time insights.

The key challenge stated in the source deck:

> Enable users to get a quick snapshot of the most important information at-a-glance, and easily deep-dive into areas of interest or concern.

Primary users in the source material:

- Operations managers
- Oversights
- Analysts

Verified deliverables:

- Sketches
- Low-fidelity Figma prototypes for testing
- Polished templates
- Token-based UI kit
- Grid
- Type styles
- ADA-compliant color palette
- Data-visualization guidance
- Component library

Anna's role/context:

- Associate Creative Director at Publicis Sapient
- Sole UI designer on this work
- Worked with UX and stakeholders
- Created the visual language and North Star for the product
- Built the atomic design system and tokenized UI kit
- Do not invent adoption, revenue, efficiency, or other outcome metrics that are not in the source files

## Recommended narrative arc

The page should support Anna's UI-design story, not bury it beneath generic process language.

1. **Hero — a visual language for a platform with no single screen**
   - Current headline, “Designing the visual language for a financial operating system,” is viable.
   - Lead with a verified final North Star screen, not an early iteration.
   - State Anna's sole-UI role clearly.

2. **The platform was unified in strategy, fragmented in experience**
   - Explain that many workflows and user roles needed to feel like one product.
   - The core UI problem was hierarchy, not decoration.

3. **Designing around the workday**
   - Use the operations-manager persona and journey evidence.
   - Show why glanceability, density, escalation, and deep dives mattered.

4. **The first problem was not color. It was hierarchy.**
   - Show before → iteration → final.
   - Explain how KPI hierarchy, table structure, chart priority, and progressive disclosure changed.

5. **The North Star**
   - Show the verified final light and dark dashboards at useful scale.
   - Emphasize that the same architecture survives both modes; this is system proof, not cosmetic theming.

6. **From a screen to a system**
   - Organize the atomic design evidence as foundations → molecules → organisms → templates.
   - Do not present every UI-kit board at the same visual weight.
   - Foundations: grid, spacing, typography, accessible color/data-viz palette.
   - Molecules: fields, buttons, controls, table elements.
   - Organisms: cards, tables, pagination, modal patterns.
   - Templates: the product layouts that prove the system works at full density.

7. **Data visualization and accessibility**
   - Show how categorical, sequential, and divergent palettes support meaning.
   - Avoid claiming formal compliance beyond what the source deck supports.

8. **Implementation quality**
   - If implementation drift/QA evidence is retained, frame it as protecting system integrity, not policing engineers.

9. **Reflection**
   - End on the idea that the visual system became a way for many teams to make consistent decisions, not merely a collection of components.

## Verified frame inventory

### Alpha Case Study Deck

The long top-level deck frame is `0:4` (`deck start`, 2400 × 14959).

Useful verified frames:

- `0:40` — Operations - Manager, 1986 × 1129
- `0:134` — Operations - Analyst, 1985 × 1413
- `0:237` — Operations Manager - Daily Routine Copy, 1986 × 1131
- `0:591` — Portfolio Monitor #1 - Risk Analyst, 1440 × 720; this is early/before work
- `0:785` — Group 2264, 1920 × 1080; parent of the verified final **light-mode** dashboard (`0:786` Grid)
- `0:1052` — Group 2263, 1920 × 1080; parent of the verified final **dark-mode** dashboard (`0:1053` Grid)

Deck labels:

- `0:588` — Before
- `0:590` — Round One
- `0:784` — Final

### UI Kit

Relevant verified frames:

- `0:1681` — Grid, 1920 × 1080
- `0:1688` — Spacing, 1920 × 1024
- `0:1715` — Core Colors, 1920 × 1097
- `0:2018` — Grays, 1920 × 1097
- `0:2118` — Sequential, 1920 × 1097
- `0:2673` — Divergent
- `0:2762` — Categorical, 1920 × 2505
- `0:3219` — Color Tokens, 634 × 1735
- `0:5230` — Text Styles, 1440 × 1702
- `0:5301` — Type Tokens, 530 × 1735
- `0:5419` — Buttons, 1920 × 5795
- `0:5697` — Fields, 1920 × 8050
- `0:6139` — Modals, 1920 × 7575
- `0:6207` — Snackbars, 1920 × 4705
- `0:6270` — Column Reorder, 1920 × 4705
- `0:6888` and `0:6909` — Pagination
- `0:6950` — Definition, 1920 × 960
- `0:6954` — Cards, 1920 × 1590
- `0:7176`, `0:7437`, `0:7717` — Templates / Grid, each 1920 × 1080

UI Kit page names explicitly confirm the system progression:

- Atoms | Grid
- Atoms | Spacing
- Atoms | Color Guidance
- Atoms | Type Styles
- Atoms | Icons
- Molecules
- Organisms
- Templates

## Temporary exports already produced

These files may still exist in `/private/tmp` during the same machine session:

- `/private/tmp/ss-before.png`
- `/private/tmp/ss-final-dark.png` — despite its temporary name, this is the final **light** dashboard from frame `0:785`
- `/private/tmp/ss-final-light.png` — despite its temporary name, this is the final **dark** dashboard from frame `0:1052`
- `/private/tmp/ss-persona-manager.png`
- `/private/tmp/ss-journey.png`
- `/private/tmp/ss-kit-grid.png`
- `/private/tmp/ss-kit-colors.png`
- `/private/tmp/ss-kit-sequential.png`
- `/private/tmp/ss-kit-type.png`
- `/private/tmp/ss-kit-buttons.png`
- `/private/tmp/ss-kit-cards.png`
- `/private/tmp/ss-kit-template.png`

Before using them, visually verify each one and rename it accurately when copying into the site's asset directory.

## Figma extraction tooling available

OpenPencil CLI:

`/private/tmp/open-pencil-cli/node_modules/@open-pencil/cli/dist/index.mjs`

Bun:

`/private/tmp/bun-runtime/node_modules/.bin/bun`

Invocation pattern:

```bash
/private/tmp/bun-runtime/node_modules/.bin/bun \
  /private/tmp/open-pencil-cli/node_modules/@open-pencil/cli/dist/index.mjs \
  <command> <fig-file> ...
```

## Current site state

Existing State Street assets at the start of this handoff:

- `alpha-platform.png`
- `brand-guide.png`
- `color-system.png`
- `dashboard-dark.png`
- `dashboard-light.png`
- `portfolio-analysis.png`

The existing dashboard assets appear low-resolution and/or tied to an early iteration. Replace them only after visually verifying the authoritative final exports.

The current page already contains a long draft structure, including:

- Hero
- Executive summary
- Product constraint
- Foundations
- A red/decision section
- Atomic system
- Implementation drift
- Reflection

Read the complete file before editing. Preserve useful structure, but remove generic or unsupported claims and re-sequence the page around the verified story above.

## Portfolio-wide context and voice rules

Anna's portfolio uses three audience modes:

- Recruiter
- Client
- Ex-boyfriend

The ex-boyfriend selector may be labelled “Ex Boyfriend” or a clearly legible equivalent; prior “It’s Complicated” versions were considered too subtle.

Protected lines that Anna does not want to lose:

- “This was almost certainly not the button you were supposed to click.”
- “I had a feeling you'd show up eventually.”
- “It has absolutely no opinions about you.”

The portfolio chat is called **Almost Anna**. It is Anna's AI stand-in and believes it is essentially Anna. Do not call it “AI Concierge.” “Concierge” refers to the separate IBM product/case study, which was sitewide—not only MaaS360.

Hero tone currently established:

- Recruiter: “What’s next?”
- Client: “What’s possible?”
- Ex: “What happened?” / “You missed a few seasons.”

Client positioning established:

> I turn ambitious ideas into brands and digital products.

Supporting idea: Anna works across media because the right answer is not always one deliverable. Brand, product, story, and experience should grow from one clear point of view. She leads from early direction through launch and brings in trusted artists, designers, and technologists when needed.

General voice:

- Intelligent, direct, human, dryly funny
- Sophisticated but not agency-generic
- Confident without becoming a lone-visionary story
- Evidence and specifics over inflated claims
- Preserve unconventional humanity; avoid AI-polished sameness
- Case studies must clearly distinguish shipped work, tested concepts, and future vision

## Existing flagship case-study status

### IBM Concierge

- **Split into two linked case studies as of 2026-08-04** — supersedes the older "should remain primarily about V1" instruction below. See `docs/decisions-log.md` ("Concierge case study split into two") for full reasoning.
- Route `/` — Part one, shipped V1. Crawl-phase work: research, the bottom-docked chat concept, prototyping, UserZoom validation. Ends with a short bridge section linking into part two instead of the old inline future-vision chapter.
- Route `/journey-orchestration` — Part two, concept direction, not launched. Journey orchestration + lead scoring, the Jamal buying-committee walkthrough, and the Phase 3 frameworks (Buying Committee, Honest Comparison, Consent Architecture). Built with Amy Clark, IBM's Global Head of UX — do not mention "Amy" without naming her role.
- Anna was Lead UX Designer on V1; continued on the live chat, then worked directly with Amy Clark on part two's orchestration/agentic direction.
- "The Razor" (V1's internal nickname for the bottom-docked chat concept) stays out of public copy per `facts.md` — referenced only descriptively, never by name, on both pages.

### IBM Search

- Route: `/search`
- Final SERP is live for US-English MVP; future AI integration is concept/future state.
- Anna was Lead UX.
- The case study already distinguishes shipped work from tested-next concepts.
- Avoid implying a global launch if only US-English launched.

### State Street Alpha

- This is the active rebuild described in this handoff.

## Engineering rules for continuing

- Use `apply_patch` for source edits.
- Preserve unrelated changes in the working tree.
- Do not invent metrics or outcomes.
- Reuse shared case-study patterns where practical; the project already has duplicated CSS across pages.
- Build from `/Users/arovedo/website portfolio/site` with `npm run build`.
- Verify `http://localhost:3001/state-street` at desktop and mobile widths.
- Product screenshots should use `object-fit: contain`, not destructive cover crops.
- Large system boards should be cropped or composed so the evidence is legible; do not drop giant unreadable Figma boards into the page unchanged.
- Keep alt text descriptive and distinguish decorative composites from content-bearing images.

## Suggested next actions

1. Read all of `site/app/state-street/page.tsx` and the State Street-related CSS in `site/app/globals.css`.
2. Visually inspect the temporary UI-kit exports in small batches.
3. Inspect Alpha UX for any final product screens that add something the deck does not already prove.
4. Copy the verified exports into `site/public/case-study/state-street` with accurate filenames.
5. Rewrite the State Street page around the recommended arc.
6. Adjust CSS to match the visual language of the rest of Anna's portfolio.
7. Run the production build.
8. Verify the page in the local browser and correct layout, contrast, responsive behavior, and image legibility.

