import type { PersonaId } from "./personaStore";

/**
 * ONE CONVERSATION, TWO COSTUMES (2026-08-18).
 *
 * The chat used to live as component state inside each AlmostAnnaChat
 * instance, which was fine while only one instance existed per page. The
 * hero redesign broke that assumption: the homepage hero bar and the razor
 * are both entrances to the same assistant, and a visitor who asks a
 * question in the hero then scrolls away was met by a razor that had never
 * heard of them. Two chats wearing the same face is a continuity error, the
 * exact thing the persona system spends so much code avoiding.
 *
 * So the thread lives here, in a module store with the same
 * useSyncExternalStore shape as personaStore. Every AlmostAnnaChat variant
 * (hero, inline card, razor dock) reads and writes this one conversation.
 * In-memory only: a reload starts fresh, deliberately. The chat log on the
 * server is the record; the widget is a conversation, not an archive.
 */

export type ChatMsg = { role: "user" | "assistant"; content: string };

export type ChatState = {
  persona: PersonaId | null;
  messages: ChatMsg[];
  busy: boolean;
  capped: boolean;
  error: string | null;
  /** The composer's draft, shared across stage, dock, and panel so typed
      but unsent text survives every change of costume. */
  input: string;
  /** Whether the conversation panel is open. Owned here rather than in
      AnnaRazor so the stage can freeze its dock/undock decisions while the
      panel is up. */
  open: boolean;
  /** True once the visitor has scrolled past the stage composer on / or
      /studio. The stage writes it (IntersectionObserver on its sentinel);
      the razor reads it to decide when the dock exists at all. */
  stageDocked: boolean;
};

let state: ChatState = {
  persona: null,
  messages: [],
  busy: false,
  capped: false,
  error: null,
  input: "",
  open: false,
  stageDocked: false,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function subscribeChat(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Snapshot identity is stable between mutations, as the hook requires. */
export function getChat(): ChatState {
  return state;
}

const SERVER_CHAT: ChatState = {
  persona: null,
  messages: [],
  busy: false,
  capped: false,
  error: null,
  input: "",
  open: false,
  stageDocked: false,
};

export function getServerChat(): ChatState {
  return SERVER_CHAT;
}

export function setChatInput(value: string) {
  if (state.input === value) return;
  state = { ...state, input: value };
  emit();
}

export function setChatOpen(open: boolean) {
  if (state.open === open) return;
  state = { ...state, open };
  emit();
}

export function setStageDocked(docked: boolean) {
  if (state.stageDocked === docked) return;
  state = { ...state, stageDocked: docked };
  emit();
}

/**
 * Focus handoff between composers. When the composer changes form (stage to
 * dock or back) the DOM node is different, so the losing side records the
 * caret here in its cleanup and the arriving side claims it exactly once.
 * Kept outside the reactive state on purpose: a caret position is not
 * something to re-render over.
 */
let focusCarry: { start: number | null; end: number | null } | null = null;

export function carryFocus(sel: { start: number | null; end: number | null }) {
  focusCarry = sel;
}

export function takeFocusCarry() {
  const c = focusCarry;
  focusCarry = null;
  return c;
}

/**
 * Switching persona starts a fresh conversation: the voice changes, so
 * carrying the old thread across would read as a continuity error. Safe to
 * call from every mounted instance; it only resets on an actual change.
 */
export function ensurePersona(persona: PersonaId) {
  if (state.persona === persona) return;
  // The thread and draft reset with the voice; the visitor's view state
  // (panel open, scrolled past the stage) is theirs and survives.
  state = {
    ...state,
    persona,
    messages: [],
    busy: false,
    capped: false,
    error: null,
    input: "",
  };
  emit();
}

/**
 * `suggested` marks questions that came from the interface itself (prompt
 * chips, per-section hints) rather than the visitor's own typing. The API
 * forwards it so the model knows the site asked on the visitor's behalf:
 * a clicked chip must be answered directly, never met with "why do you ask".
 */
export function sendChat(persona: PersonaId, text: string, suggested = false) {
  const trimmed = text.trim();
  if (!trimmed || state.busy || state.capped) return;
  ensurePersona(persona);

  const next: ChatMsg[] = [...state.messages, { role: "user", content: trimmed }];
  state = { ...state, messages: next, busy: true, error: null };
  emit();

  void (async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, messages: next, suggested }),
      });
      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        capped?: boolean;
      };

      if (!res.ok || !data.reply) {
        state = {
          ...state,
          busy: false,
          capped: state.capped || Boolean(data.capped),
          error: data.error ?? "Something went wrong. Try again in a moment.",
        };
        emit();
        return;
      }

      state = {
        ...state,
        busy: false,
        messages: [...state.messages, { role: "assistant", content: data.reply }],
      };
      emit();
    } catch {
      state = {
        ...state,
        busy: false,
        error: "I couldn't reach the server. Try again in a moment.",
      };
      emit();
    }
  })();
}
