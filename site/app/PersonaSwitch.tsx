"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  personas,
  setPersona,
  subscribe,
} from "./personaStore";
import type { PersonaId } from "./personaStore";

/**
 * Label default changed from "I’m a" 2026-08-24, on the loudest consensus
 * item in a round of external portfolio feedback (four independent
 * reviewers): "is 'I’m' me (the visitor) or you (Anna)?", "I’m immediately
 * confused why I’m looking at a portfolio for a Recruiter", and a VP who
 * only worked it out mid-review — "simply changing it to 'View as:' saves
 * all that." "I’m a" was written from the visitor’s mouth; every reader
 * heard it in Anna’s. "View as:" states the mechanic instead of performing
 * it, and matches the wording the interior pages' PersonaMenu ("Viewing
 * as") already uses.
 *
 * Changed again 2026-08-27, Anna, after a workshop that tried "I’m the",
 * "You’re a?", "You are a…?", "You are?", and articled pills ("a recruiter /
 * an ex-boyfriend"): the label landed on "And you are?". Second person, so
 * the pronoun can only be the visitor, which was the confusion that killed
 * "I’m a"; no article, so no a/an trap in front of Ex-Boyfriend; and the
 * "And" implies a conversation already in progress that the visitor just
 * walked into, which is exactly what visiting this site is. The
 * articled-pills variant was parked over pill width on small phones, the
 * exact fight the switcher already lost once.
 */
export default function PersonaSwitch({
  compact = false,
  label = "And you are?",
  reachable = true,
  entryPersona,
  onSelect,
}: {
  compact?: boolean;
  label?: string | null;
  reachable?: boolean;
  /**
   * The persona an entrance route (/studio) forces for its own first paint.
   * Displayed as the active choice until the visitor interacts, so the
   * server-rendered radio state matches the page around it instead of the
   * store’s Recruiter default. Once the visitor touches the control, the
   * store is the only truth again.
   */
  entryPersona?: PersonaId;
  /** Called after a selection is written to the store. */
  onSelect?: (id: PersonaId) => void;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // On an entrance route the entry persona IS the displayed persona: choosing
  // anything else navigates away (see PersonaChrome’s onSelect), so this
  // control never renders a persona the URL contradicts, and there is no
  // render-time ref read for the lint rule to object to.
  const persona = entryPersona ?? store;
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  // Announced to screen readers after a USER selection only; empty on
  // mount so page load stays silent. role="status" is an implicit polite
  // live region, and the span is visually hidden (.sr-only), so this costs
  // no vertical space (2026-08-27, clarity pass).
  const [announcement, setAnnouncement] = useState("");

  function choose(id: PersonaId) {
    // transition: true is what makes a click crossfade; programmatic syncs
    // (entrance routes, initial load) call setPersona without it and stay
    // instant. On an entrance route (/studio) the selection also navigates
    // (PersonaChrome's onSelect pushes "/"), and a crossfade racing a
    // navigation reads as two changes, so entrances skip the transition.
    // See the note on setPersona in personaStore.ts.
    setPersona(id, { transition: !entryPersona });
    const chosen = personas.find((p) => p.id === id);
    if (chosen) setAnnouncement(`Viewing this page as ${chosen.label}.`);
    onSelect?.(id);
  }

  useEffect(() => {
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  function moveSelection(from: number, direction: 1 | -1) {
    const next = (from + direction + personas.length) % personas.length;
    choose(personas[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div className={`persona-switch-group${compact ? " is-compact" : ""}`}>
      {label ? <span className="persona-switch-label">{label}</span> : null}
      {/* This is a page-wide preference, so radio semantics are a better fit
          than tabs. The selected option is the group’s single Tab stop; arrow
          keys move and select as native radio groups do. */}
      <div
        className="persona-switch"
        role="radiogroup"
        aria-label="Choose how to read this site"
      >
        {personas.map((p, index) => (
          <button
            key={p.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={persona === p.id}
            tabIndex={reachable && persona === p.id ? 0 : -1}
            className={persona === p.id ? "is-active" : undefined}
            onClick={() => choose(p.id)}
            onKeyDown={(event) => {
              if (!reachable) return;
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                moveSelection(index, 1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                moveSelection(index, -1);
              } else if (event.key === "Home") {
                event.preventDefault();
                choose(personas[0].id);
                buttons.current[0]?.focus();
              } else if (event.key === "End") {
                event.preventDefault();
                const last = personas.length - 1;
                choose(personas[last].id);
                buttons.current[last]?.focus();
              }
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </div>
  );
}
