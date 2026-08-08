"use client";

import { useState } from "react";

type ModuleId = "hero" | "product" | "testimonials" | "features" | "pricing" | "roi";
type ModuleState = "plain" | "moved" | "new" | "personalized" | "faded";

type Row = {
  id: ModuleId;
  label: string;
  descriptor: string;
  state: ModuleState;
  tag?: string;
};

type Stage = {
  key: string;
  button: string;
  caption: string;
  rows: Row[];
};

const stages: Stage[] = [
  {
    key: "arrival",
    button: "Arrival",
    caption: "First touch. A search query or a campaign click, nothing else.",
    rows: [
      { id: "hero", label: "Hero", descriptor: "Default headline, no assumptions", state: "plain" },
      { id: "product", label: "Product overview", descriptor: "Generic, all use cases", state: "plain" },
      { id: "testimonials", label: "Testimonials", descriptor: "Mixed industries", state: "plain" },
      { id: "features", label: "Feature comparison", descriptor: "Full matrix shown", state: "plain" },
      { id: "pricing", label: "Pricing", descriptor: "All tiers, no emphasis", state: "plain" },
    ],
  },
  {
    key: "midsession",
    button: "Mid-session",
    caption: "Behavior detected. They lingered on technical content and watched a demo.",
    rows: [
      { id: "hero", label: "Hero", descriptor: "Unchanged, behavior noted", state: "plain" },
      { id: "features", label: "Feature comparison", descriptor: "Narrowed to viewed features", state: "moved", tag: "moved up" },
      { id: "product", label: "Product overview", descriptor: "Technical depth surfaced", state: "plain" },
      { id: "roi", label: "ROI calculator", descriptor: "Blank, ready for input", state: "new", tag: "new" },
      { id: "testimonials", label: "Testimonials", descriptor: "Enterprise-focused", state: "plain" },
      { id: "pricing", label: "Pricing", descriptor: "Deprioritized", state: "faded" },
    ],
  },
  {
    key: "signedin",
    button: "Signed in",
    caption: "Identity resolved. Known products, prior conversations, usage history.",
    rows: [
      { id: "hero", label: "Hero", descriptor: "References your current product", state: "personalized", tag: "personalized" },
      { id: "roi", label: "ROI calculator", descriptor: "Pre-filled from your usage data", state: "personalized", tag: "personalized" },
      { id: "features", label: "Feature comparison", descriptor: "vs. tools already in your stack", state: "plain" },
      { id: "product", label: "Product overview", descriptor: "Your deployment, not the generic", state: "plain" },
      { id: "testimonials", label: "Testimonials", descriptor: "Deprioritized", state: "faded" },
    ],
  },
];

const allIds: ModuleId[] = ["hero", "product", "testimonials", "features", "pricing", "roi"];

/* Row height and gap live in CSS custom properties so they can change at
   breakpoints without the slide maths going out of sync. */

function Glyph({ id }: { id: ModuleId }) {
  const bar = "var(--pp-glyph)";
  switch (id) {
    case "hero":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          <rect x="2" y="7" width="36" height="4" fill={bar} />
          <rect x="7" y="15" width="26" height="3" fill={bar} />
          <rect x="13" y="22" width="14" height="6" rx="1" fill={bar} />
        </svg>
      );
    case "product":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          <rect x="2" y="9" width="16" height="3" fill={bar} />
          <rect x="2" y="15" width="13" height="3" fill={bar} />
          <rect x="2" y="21" width="16" height="3" fill={bar} />
          <rect x="23" y="8" width="15" height="16" fill={bar} />
        </svg>
      );
    case "testimonials":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          <circle cx="9" cy="16" r="6" fill={bar} />
          <rect x="19" y="12" width="19" height="3" fill={bar} />
          <rect x="19" y="18" width="13" height="3" fill={bar} />
        </svg>
      );
    case "features":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={7 + c * 10} y={5 + r * 8} width="7" height="6" fill={bar} />
            ))
          )}
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          <rect x="1" y="7" width="11" height="18" fill="none" stroke={bar} strokeWidth="2" />
          <rect x="14.5" y="7" width="11" height="18" fill="none" stroke={bar} strokeWidth="2" />
          <rect x="28" y="7" width="11" height="18" fill="none" stroke={bar} strokeWidth="2" />
        </svg>
      );
    case "roi":
      return (
        <svg viewBox="0 0 40 32" aria-hidden="true">
          <rect x="2" y="8" width="36" height="9" fill="none" stroke={bar} strokeWidth="2" />
          <rect x="2" y="21" width="16" height="6" rx="1" fill={bar} />
        </svg>
      );
  }
}

export default function PagePersonalization() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  const maxRows = Math.max(...stages.map((s) => s.rows.length));

  return (
    <div className="pp">
      <div className="pp-head">
        <h3>The page doesn&rsquo;t wait to be told twice.</h3>
        <p>The same page, rebuilding itself as signals arrive.</p>
      </div>

      <div className="pp-toggle" role="tablist" aria-label="Personalization stage">
        {stages.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            type="button"
            aria-selected={i === active}
            className={i === active ? "is-active" : undefined}
            onClick={() => setActive(i)}
          >
            <span className="pp-step">{`0${i + 1}`}</span>
            {s.button}
          </button>
        ))}
      </div>

      <p className="pp-caption" aria-live="polite">{stage.caption}</p>

      <div className="pp-frame">
        <div className="pp-chrome" aria-hidden="true">
          <span /><span /><span />
          <div className="pp-urlbar" />
        </div>
        <div
          className="pp-stack"
          style={{ "--pp-rows": maxRows } as React.CSSProperties}
        >
          {allIds.map((id) => {
            const index = stage.rows.findIndex((r) => r.id === id);
            const row = index === -1 ? undefined : stage.rows[index];
            const present = Boolean(row);
            return (
              <div
                key={id}
                className={`pp-row${row ? ` is-${row.state}` : ""}${present ? "" : " is-absent"}`}
                style={{ "--pp-i": present ? index : 0 } as React.CSSProperties}
                aria-hidden={present ? undefined : true}
              >
                {row?.tag ? <span className="pp-tag">{row.tag}</span> : null}
                <span className="pp-glyph-slot">
                  <Glyph id={id} />
                </span>
                <span className="pp-copy">
                  <span className="pp-label">{row ? row.label : ""}</span>
                  <span className="pp-descriptor">{row ? row.descriptor : ""}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="pp-footnote">
        Nothing here was requested. Every change came from a signal the visitor gave without asking for anything.
      </p>
    </div>
  );
}
