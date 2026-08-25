export type PersonaId = "recruiter" | "client" | "ex";

export const personas: { id: PersonaId; label: string }[] = [
  { id: "recruiter", label: "Recruiter" },
  { id: "client", label: "Client" },
  // Hyphenated 2026-08-24 (external feedback, Francesco: "'ex-boyfriend'
  // would be easier to read with the hyphen"). Every string that quotes the
  // pill by name — the canned "Did you know I’d click…" question in
  // annaAnswers.ts, its data-anna-prompt-ex copies, homeContent’s ex
  // eyebrow — moved with it, since the canned-answer lookup matches text
  // exactly.
  { id: "ex", label: "Ex-Boyfriend" },
];

const SESSION_KEY = "pp-persona-session";

/**
 * Persona rules (docs/decisions-log.md):
 * - Recruiter is the default for un-gated traffic, bots and direct links,
 *   and now the default full stop (Anna, 2026-08-20: "it should always
 *   default on recruiter"). Clients get their own entrance at /studio, which
 *   forces the Client persona from first paint; annarovedo.com stays
 *   recruiter territory. If this changes again, getServerSnapshot below and
 *   the chat route’s persona fallback must move with it, or first paint
 *   flashes.
 * - Client and Ex Boyfriend are both session-scoped only, as of 2026-08-20.
 *   Client used to persist across visits in localStorage, which meant
 *   walking through /studio once left the whole site showing Client on every
 *   future visit, days later, until someone thought to flip the switcher
 *   back — Recruiter is supposed to be the thing a visitor lands on, not a
 *   setting that has to be actively restored. Both personas now live in
 *   sessionStorage: they survive navigation inside one tab, so /studio’s
 *   promise ("the rest of the site stays Client after entering here") still
 *   holds for that visit, but neither is ever written to localStorage, has a
 *   URL of its own, or survives the tab closing. Note that mobile browsers
 *   restore tabs WITH sessionStorage, so a tab where Client or Ex was chosen
 *   stays that way across days of reopening: that is the same tab persisting,
 *   not a default changing.
 */
function read(): PersonaId {
  if (typeof window === "undefined") return "recruiter";
  try {
    const v = window.sessionStorage.getItem(SESSION_KEY);
    if (v === "client" || v === "ex") return v;
  } catch {
    /* session storage unavailable */
  }
  return "recruiter";
}

let current: PersonaId | null = null;
const listeners = new Set<() => void>();

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Client snapshot. Cached so repeat calls return a stable reference. */
export function getSnapshot(): PersonaId {
  if (current === null) current = read();
  return current;
}

/** Server snapshot is always the default, so crawlers only ever see Recruiter.
    This must match read()'s fallback: a cold visitor’s first paint and their
    hydrated page have to agree, or the homepage flashes between personas. */
export function getServerSnapshot(): PersonaId {
  return "recruiter";
}

export function setPersona(id: PersonaId) {
  current = id;
  try {
    if (id === "recruiter") {
      window.sessionStorage.removeItem(SESSION_KEY);
    } else {
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    // Cleans up anyone’s browser still holding a pre-2026-08-20 long-lived
    // Client value; read() no longer looks at localStorage at all, but there
    // is no reason to leave a stale key sitting there once we can remove it.
    window.localStorage.removeItem("pp-persona");
  } catch {
    /* storage unavailable, selection simply is not persisted */
  }
  if (typeof document !== "undefined") {
    document.documentElement.dataset.persona = id;
  }
  listeners.forEach((fn) => fn());
}
