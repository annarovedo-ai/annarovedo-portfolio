"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  function moveSelection(from: number, direction: 1 | -1) {
    const next = (from + direction + personas.length) % personas.length;
    setPersona(personas[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div className={`persona-switch-group${compact ? " is-compact" : ""}`}>
      {label ? <span className="persona-switch-label">{label}</span> : null}
      {/* This is a page-wide preference, so radio semantics are a better fit
          than tabs. The selected option is the group's single Tab stop; arrow
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
            onClick={() => setPersona(p.id)}
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
                setPersona(personas[0].id);
                buttons.current[0]?.focus();
              } else if (event.key === "End") {
                event.preventDefault();
                const last = personas.length - 1;
                setPersona(personas[last].id);
                buttons.current[last]?.focus();
              }
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
