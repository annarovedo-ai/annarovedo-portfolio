export type PersonaId = "recruiter" | "client" | "ex";

export const personas: { id: PersonaId; label: string }[] = [
  { id: "recruiter", label: "Recruiter" },
  { id: "client", label: "Client" },
  { id: "ex", label: "Ex Boyfriend" },
];

const STORAGE_KEY = "pp-persona";
const SESSION_KEY = "pp-persona-session";

/**
 * Persona rules (docs/decisions-log.md; default changed per Anna 2026-08-18):
 * - Client is the default for un-gated traffic, bots and direct links. It was
 *   Recruiter until the pre-outreach pass; with client outreach starting, a
 *   cold visitor should land in the studio, and a recruiter following her
 *   résumé link has the switcher one tap away.
 * - Recruiter and Client persist across visits (localStorage).
 * - Ex Boyfriend is reachable only by explicit selection. It lives in
 *   sessionStorage so it survives navigation inside one tab but dies when the
 *   tab closes, is never written to localStorage, and has no URL of its own,
 *   so it cannot be linked, bookmarked, shared or crawled. Note that mobile
 *   browsers restore tabs WITH sessionStorage, so a tab where Ex was chosen
 *   stays Ex across days of reopening: that is the same tab, not a default.
 */
function read(): PersonaId {
  if (typeof window === "undefined") return "client";
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === "ex") return "ex";
  } catch {
    /* session storage unavailable */
  }
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "recruiter" || v === "client") return v;
  } catch {
    /* storage unavailable */
  }
  return "client";
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

/** Server snapshot is always the default, so crawlers only ever see Client.
    This must match read()'s fallback: a cold visitor's first paint and their
    hydrated page have to agree, or the homepage flashes between personas. */
export function getServerSnapshot(): PersonaId {
  return "client";
}

export function setPersona(id: PersonaId) {
  current = id;
  try {
    if (id === "ex") {
      window.sessionStorage.setItem(SESSION_KEY, "ex");
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.setItem(STORAGE_KEY, id);
    }
  } catch {
    /* storage unavailable, selection simply is not persisted */
  }
  if (typeof document !== "undefined") {
    document.documentElement.dataset.persona = id;
  }
  listeners.forEach((fn) => fn());
}
