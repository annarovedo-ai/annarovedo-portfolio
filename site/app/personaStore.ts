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
/** How long a chosen persona survives without a page visit. Anna,
 * 2026-08-27: "it should default to recruiter". The persona was already
 * session-scoped, but browsers restore tabs WITH sessionStorage, so her own
 * tab greeted her as the Ex days later, and the persona color system makes
 * that stickiness loud. Thirty minutes keeps continuity within a sitting
 * (every page load refreshes the clock) and returns any fresh sitting to
 * Recruiter. The pre-paint script in layout.tsx mirrors this exactly, keys,
 * TTL and refresh; change them together or first paint will disagree with
 * hydration. */
const SESSION_AT_KEY = "pp-persona-at";
const SESSION_TTL_MS = 30 * 60 * 1000;

function read(): PersonaId {
  if (typeof window === "undefined") return "recruiter";
  try {
    const v = window.sessionStorage.getItem(SESSION_KEY);
    if (v === "client" || v === "ex") {
      const at = Number(window.sessionStorage.getItem(SESSION_AT_KEY));
      if (at && Date.now() - at <= SESSION_TTL_MS) {
        window.sessionStorage.setItem(SESSION_AT_KEY, String(Date.now()));
        return v;
      }
      window.sessionStorage.removeItem(SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_AT_KEY);
    }
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

/**
 * The persona-change crossfade (2026-08-27, clarity pass). Only a USER
 * selection animates: entrance routes (/studio's StudioEntry) and initial
 * sync call setPersona without options and stay instant, so a page's first
 * paint never plays a transition. Feature-detected View Transition API,
 * nothing else: browsers without it (and anyone with reduced motion) get
 * the same immediate swap this function always did. The callback returns a
 * double-rAF promise so the API captures the page AFTER React has
 * re-rendered the new persona; without it the "new" snapshot can be the
 * old frame and the fade shows the wrong persona. Duration and the
 * reduced-motion kill live in globals.css on ::view-transition-*(root).
 */
export function setPersona(id: PersonaId, opts?: { transition?: boolean }) {
  /* THE CROSSFADE IS DISABLED (hotfix, 2026-08-27 evening, Anna: "i can't
     even click on buttons... in particular the persona switcher"). The
     View Transition wrapper that lived here froze input while the browser
     captured the page, and its double-rAF completion signal starved while
     rendering was suspended inside the capture, so a pill click could
     lock the whole page until the API's internal timeout. Every switch is
     immediate again. If a crossfade returns, it must not gate completion
     on animation frames, and it must be proven on the heaviest case-study
     page before it ships. The opts parameter stays so call sites do not
     churn. */
  void opts;
  applyPersona(id);
}

function applyPersona(id: PersonaId) {
  current = id;
  try {
    if (id === "recruiter") {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_AT_KEY);
    } else {
      window.sessionStorage.setItem(SESSION_KEY, id);
      window.sessionStorage.setItem(SESSION_AT_KEY, String(Date.now()));
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
