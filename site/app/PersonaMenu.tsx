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
 * The demoted persona control for internal pages, added 2026-08-18 after an
 * external review. The full three-way segmented control stays on the two
 * entrances (/ and /studio), where choosing a door is the job of the page.
 * On internal pages it had become the dominant object in the header, and on
 * phones the three options wrapped into a tall bubble beside the logo; an
 * enterprise client reading a case study was shown "Ex Boyfriend" at equal
 * weight to Work and Contact. Here the current persona reads as a quiet
 * "Viewing as" state, and the other two wait inside the menu, so the Ex door
 * stays a signature Easter egg instead of primary navigation.
 */
export default function PersonaMenu({
  personaOverride,
}: {
  personaOverride?: PersonaId;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const active = personas.find((p) => p.id === persona) ?? personas[0];

  // The segmented control owned this sync while it lived in the header; the
  // page-level persona styling still depends on it, so it moves here with it.
  useEffect(() => {
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(id: PersonaId) {
    setPersona(id);
    setOpen(false);
  }

  return (
    <div className="persona-menu" ref={rootRef}>
      <button
        type="button"
        className="persona-menu-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="persona-menu-hint">Viewing as</span> {active.label}
        <span className="persona-menu-caret" aria-hidden="true">
          &#9662;
        </span>
      </button>
      {open ? (
        <div className="persona-menu-list" role="menu" aria-label="View this site as">
          {personas.map((p) => (
            <button
              key={p.id}
              type="button"
              role="menuitemradio"
              aria-checked={p.id === persona}
              className={p.id === persona ? "is-active" : undefined}
              onClick={() => choose(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
