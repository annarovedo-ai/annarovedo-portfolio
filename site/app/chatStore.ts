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
};

let state: ChatState = {
  persona: null,
  messages: [],
  busy: false,
  capped: false,
  error: null,
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
};

export function getServerChat(): ChatState {
  return SERVER_CHAT;
}

/**
 * Switching persona starts a fresh conversation: the voice changes, so
 * carrying the old thread across would read as a continuity error. Safe to
 * call from every mounted instance; it only resets on an actual change.
 */
export function ensurePersona(persona: PersonaId) {
  if (state.persona === persona) return;
  state = { persona, messages: [], busy: false, capped: false, error: null };
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
