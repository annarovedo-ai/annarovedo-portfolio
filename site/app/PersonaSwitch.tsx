"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  personas,
  setPersona,
  subscribe,
} from "./personaStore";

export default function PersonaSwitch({
  compact = false,
  label = "I’m a",
  reachable = true,
}: {
  compact?: boolean;
  label?: string | null;
  reachable?: boolean;
}) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  return (
    <div className={`persona-switch-group${compact ? " is-compact" : ""}`}>
      {label ? <span className="persona-switch-label">{label}</span> : null}
      {/* radiogroup, not tablist. This used to declare role="tablist" with
          role="tab" and aria-selected, which is half of the ARIA tab pattern:
          the other half is tab panels, aria-controls linking each tab to its
          panel, and arrow-key navigation with a roving tabindex. None of that
          existed. A screen reader announced "tab, 1 of 3, selected", implied a
          panel relationship that is not in the markup, and then arrow keys did
          nothing, which is the first thing someone told "tab" will try.

          It was also the wrong metaphor. Tabs swap one region of content; this
          swaps copy across the whole page — headline, subtext, chat framing,
          work eyebrow, footer. That is a preference, not a tab strip, and
          radiogroup says "pick one of three, it changes things" without
          promising panels or arrow keys. */}
      <div
        className="persona-switch"
        role="radiogroup"
        aria-label="Choose how to read this site"
      >
        {personas.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={persona === p.id}
            tabIndex={reachable ? 0 : -1}
            className={persona === p.id ? "is-active" : undefined}
            onClick={() => setPersona(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
