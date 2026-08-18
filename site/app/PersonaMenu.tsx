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
 * UNUSED — safe to delete. This "Viewing as" menu replaced the segmented
 * control in SiteHeader for a few hours on 2026-08-18 (external review
 * suggestion) and was reverted the same day at Anna's call: the segmented
 * control is part of the site's personality. Its CSS has been removed from
 * globals.css, so wiring this back in means restoring that too. Kept only
 * because this file was created from a sandbox that cannot delete files.
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
