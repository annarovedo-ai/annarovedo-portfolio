# Nike case study — image export list

**Source file:** Inventory Availability (`lUoyo1YMDlvFhTYFESFh3U`)

**How to jump straight to a frame:** paste this into your browser, swapping in the node ID:
`https://www.figma.com/design/lUoyo1YMDlvFhTYFESFh3U/Inventory-Availability?node-id=NODE-ID`
(replace the colon with a dash — e.g. `177-651399`)

**Naming:** use the filename in each row exactly. Save to `site/public/case-study/nike/`.

## Export settings — read this first, it's modal-specific

This case study renders in a **modal**, and the site's content column maxes out around **920px**. That has two consequences:

**1. Export at 1.5x, not 2x.** Frames are 1440×1024. At 1.5x you get 2160×1536, which is a clean 2x for a 920–1080px display width. Exporting at 2x (2880px) triples the file weight for detail nobody will see, and modals load everything at once — weight matters more here than on a normal page.

**2. Full-width screens will be illegible, so several need crops too.** A 1440px screen shown at 920px is scaled to 64%. Body text and table labels won't survive that. For the three frames marked **CROP** below, export twice:

- the **full frame** at 1.5x, for context
- a **tight crop** of just the region that matters, at 2x, so the detail is actually readable

I'll show the full frame at column width and the crop beneath it, or pair them side by side. Either way the reader gets both the layout and the legible detail.

**Anything wider than ~2500px is unusable in a modal** — see the note on #10.

---

## Priority 1 — the spine of the story (7 images)

These carry the narrative. If you only do one batch, do this one.

| # | Node ID | What it is | Filename | Notes |
|---|---------|-----------|----------|-------|
| 1 | `31:219845` | The existing order screen with "Inventory Check" in the menu — the *before* | `before-order-screen.png` | sketches page, 1440×958 |
| 2 | `31:219964` | Concept label bar: "1.0 — Quick Inventory Search, Flyout" | `concept-1-label.png` | 7690×190 — see note below |
| 3 | `31:220029` | The flyout panel — sizes SM/M/L/XL with quantities | `concept-1-flyout.png` | 448×1024, narrow vertical |
| 4 | `177:651399` | The refined filter set — Availability Date, Quality, Plant, General Availability, ISEG, See More Filters | `filters-final.png` + `filters-final-crop.png` | **CROP** — the 40→5 payoff shot. Crop tight to the filter row; those five field labels are the entire argument and must be readable |
| 5 | `180:661074` | Results populated — 12 of 12, Material / Stock Type / Order Number / Quantity | `results-grid.png` + `results-grid-crop.png` | **CROP** — crop to the table header + first 3–4 rows. Only frame with real data |
| 6 | `150:1001315` | Two filter chips applied: "Plant: 4325" + "ISEG: A" | `results-chips-two.png` + `results-chips-two-crop.png` | **CROP** — crop to just the chip row above the grid. Chips are small and this beat depends on seeing them |
| 7 | `150:982325` | "Would you like to download an Excel version of this?" | `excel-download.png` | Prompt is large enough to read at full width — no crop needed |

**On #2:** those label bars are 7690px wide and mostly empty space. Rather than export them, it's cleaner to select the label bar *plus the frames sitting under it* and export the group as one wide image — that way each concept reads as a labelled row. If that's fiddly, skip the labels entirely and I'll set the concept titles in HTML.

---

## Priority 2 — the three concepts side by side

For the "three doors" section. Ideally all three at the same crop so they line up.

| # | Node ID | What it is | Filename |
|---|---------|-----------|----------|
| 8 | `31:219905` | Dedicated page, table/data viz view | `concept-2-dedicated.png` |
| 9 | `31:219932` | Filter layout variant — Plant, Clear All | `concept-3-flat.png` |
| 10 | `176:642408` | The wide board showing concepts 2.0 and 3.0 together | `concepts-overview.png` |

**#10 is 7690×2014 — probably skip it.** At modal width that's a 7:2 strip rendered about 240px tall; it'll read as a grey smear. Either skip it, or export at **0.3x** (≈2300px) purely as a decorative "here's the scale of the exploration" band, and don't expect anyone to read it. Showing #8 and #9 side by side communicates the same thing better.

---

## Priority 3 — supporting states

Nice to have; the story survives without them.

| # | Node ID | What it is | Filename |
|---|---------|-----------|----------|
| 11 | `150:860646` | Empty state — "Apply filters to display Inventory Availability" | `empty-state.png` |
| 12 | `177:652060` | Filter modal, expanded (1320×827) | `filters-modal.png` |
| 13 | `190:318363` | Single chip applied — "Plant: 4325" | `results-chips-one.png` |
| 14 | `182:663265` | Flyout in context, inside the order screen | `flyout-in-context.png` |

---

## Not from Figma

**15. The feedback grid** (`feedback-grid.png`) — the sticky-note board from your deck. Export as large as you have it, 2000px+ ideally. This is one of the strongest artifacts in the story because the contradiction is legible in the users' own words.

Also export **`feedback-grid-crop.png`** — a tight crop of just the red "What I didn't like / am nervous about" column. In the modal, the full board will be a field of unreadable confetti; the crop is what actually lets someone read *"Having too many options"* directly above *"Missing fields that are important."* That crop might be the single most persuasive image in the case study, so it's worth doing properly.

**16. The proto-persona workshop board** (`workshop-board.png`) — same, from the deck. The Miro link is dead so the screenshot is all we have.

**17. Paul and Shelly personas** (`personas.png`) — from the deck. Optional; the illustrations are generic and the copy may carry them better than the art does.

---

## Before you export — two things to scrub

1. **`before-order-screen.png` and any frame showing real data.** The reference screenshots in this file contain live customer PO numbers, material numbers, and account IDs (e.g. PO 15723268, customer 8006981). Blur or overwrite them before these go on a public site.

2. **`results-grid.png`** shows material and order numbers. They're probably dummy values, but give them a look before publishing — worth thirty seconds.

---

## What I still can't get

There's no user-flow diagram in the file (that page is empty), and no visualization of the survey results — the five-attribute finding exists only as a claim in your script. If you have a chart of that anywhere, it'd be the single most valuable addition, since it's the evidence behind the story's central decision. A simple bar chart would do, and I can build that in HTML if you'd rather not make one.
