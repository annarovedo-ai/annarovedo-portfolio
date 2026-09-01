"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import {
  ensurePersona,
  getChat,
  getServerChat,
  sendChat,
  setChatInput,
  subscribeChat,
} from "./chatStore";
import { homeContent } from "./homeContent";

/**
 * THE CHAT SURFACE, menu model (2026-08-19, Anna’s razor redesign).
 * Rendered inside the razor’s open panel, under the panel’s own header row
 * (photo, name, disclosure, minimise, close — those live in AnnaRazor
 * because they drive razor state).
 *
 * - Empty: the four suggested questions as a menu of chips on the navy
 *   ground, then the composer. No greeting, no explainer, no reserved
 *   height: the panel is as tall as its contents until a conversation
 *   exists. (The greeting-line era ended here; the header’s disclosure is
 *   the one identifier.)
 * - Started: the thread in a light reading area — long answers read on
 *   paper, not on navy — with the composer below.
 *
 * Chip wording is LOCKED to the canonical answers in annaAnswers.ts;
 * changing a chip here silently un-cans its answer and fails the release
 * test. Chips send suggested: true, one of the three protected layers.
 */

export default function AlmostAnnaChat({
  seed,
  personaOverride,
  placeholderOverride,
  onClose,
}: {
  /** Opening question handed over from the razor bar’s hint, sent once on
      mount with suggested: true. */
  seed?: string;
  /** Entrance routes force their persona for correct server render. */
  personaOverride?: import("./personaStore").PersonaId;
  /** The razor passes the short mobile placeholder ("Ask anything…") so
      this component needs no viewport detection of its own. */
  placeholderOverride?: string;
  /** Close, for the composer's own × on phones. The panel header carries the
      real controls, but on iOS the keyboard scrolls a fixed full-screen panel
      so the header leaves the visible viewport the moment the input is
      focused (Anna's screenshot, 2026-09-01: "there's no way to close out of
      the chat on mobile"). The composer is the one element Safari keeps in
      view, so the close lives there too. Hidden above 720px in CSS. */
  onClose?: () => void;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  const c = homeContent[persona];
  const isClient = persona === "client";
  const assistantName = isClient ? "Ask Paper Pixel" : "Almost Anna";
  const assistantPlaceholder = isClient
    ? "Ask about your project…"
    : "Ask Almost Anna anything…";

  const chat = useSyncExternalStore(subscribeChat, getChat, getServerChat);
  const { messages, busy, capped, error, input } = chat;
  const scroller = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // The menu shows the questions that travel down THIS page (Anna,
  // 2026-08-19: "the prompts here should be the same ones that travel down
  // the page"): opening the panel on Nike offers Nike’s questions, not the
  // homepage’s. The homepage and /studio keep their curated persona chips,
  // which are those pages' prompts. In Ex mode, the page’s one off-topic
  // preset question slots in second. Safe to read the DOM here: the panel
  // only ever renders after a client-side interaction, never during SSR.
  const pagePrompts = useMemo(() => {
    // Entrances keep their curated chips; the pathname read inside the memo
    // is also what makes the list recompute on client-side navigation.
    if (pathname === "/" || pathname === "/studio")
      return { pageList: null, exQ: null };
    if (typeof document === "undefined") return { pageList: null, exQ: null };
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-anna-prompt], [data-anna-prompt-ex], [data-anna-prompt-client]"
      )
    );
    const list: string[] = [];
    const seen = new Set<string>();
    let exQ: string | null = null;
    for (const n of nodes) {
      if (persona === "ex" && !exQ && n.dataset.annaPromptEx) {
        exQ = n.dataset.annaPromptEx;
      }
      // Client sees the application-shaped variant where a section has one.
      const q =
        persona === "client"
          ? n.dataset.annaPromptClient ?? n.dataset.annaPrompt
          : n.dataset.annaPrompt;
      if (q && !seen.has(q)) {
        seen.add(q);
        list.push(q);
      }
    }
    // The Ex injection moved OUT of this memo (2026-08-27, Anna, on
    // /contact as Ex: "why is this the only question prompt"). It used to
    // splice the frog in here, which meant a page with zero section hints
    // still returned a one-item list, the "no page prompts, use the
    // persona's curated chips" fallback below never fired, and the Ex got a
    // menu of exactly one frog. The memo now reports what the page actually
    // carries and leaves persona seasoning to the pool below.
    return { pageList: list.length ? list : null, exQ };
  }, [persona, pathname]);
  // The full pool feeds the follow-ups; the empty-state menu shows four,
  // matching the homepage chips (Anna, 2026-08-19): a case study can carry
  // nine section hints, and nine chips read as a wall. The first sections'
  // questions win because they mirror how the page reads. Ex ALWAYS gets
  // one off-topic question slotted second (Anna, 2026-08-19), whether the
  // rest of the menu came from the page or from the persona's curated
  // chips; pages carry their own via data-anna-prompt-ex, and the frog is
  // the fallback, which is never the wrong answer.
  const promptPool = useMemo(() => {
    const base = [...(pagePrompts.pageList ?? c.prompts)];
    if (persona === "ex") {
      const funny = pagePrompts.exQ ?? "Be honest. Was the frog actually real?";
      if (!base.includes(funny)) base.splice(Math.min(1, base.length), 0, funny);
    }
    return base;
  }, [pagePrompts, persona, c]);
  const menuPrompts = promptPool.slice(0, 4);

  // Follow-ups (Anna, 2026-08-19): after each answer, offer the next
  // couple of questions from this page the visitor has not asked yet, so
  // the conversation walks the page the way scrolling would. Every one is
  // pre-scripted, so each tap is another instant answer.
  const followUps = messages.length > 0
    ? promptPool
        .filter(
          (q) =>
            !messages.some(
              (m) => m.role === "user" && m.content.trim() === q
            )
        )
        .slice(0, 2)
    : [];

  useEffect(() => {
    ensurePersona(persona);
  }, [persona]);

  // Land on the START of the answer, not the end of it; follow the bottom
  // only while the reply is arriving, so the thinking indicator stays
  // visible.
  useEffect(() => {
    if (messages.length === 0) return;
    const el = scroller.current;
    if (!el) return;
    if (busy) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    const items = el.querySelectorAll<HTMLLIElement>(".aa-thread > li.is-user");
    const lastAsk = items[items.length - 1];
    if (!lastAsk) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    const target =
      lastAsk.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop;
    el.scrollTo({ top: Math.max(0, target - 12), behavior: "smooth" });
  }, [messages, busy]);

  function send(text: string, suggested = false) {
    sendChat(persona, text, suggested);
    setChatInput("");
  }

  // The razor carries the first question across when it opens, so the
  // conversation opens already answering rather than asking again.
  const seeded = useRef(false);
  useEffect(() => {
    if (!seed || seeded.current) return;
    seeded.current = true;
    send(seed, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const started = messages.length > 0;

  return (
    <div className="anna-chat" aria-label={assistantName}>
      {!started ? (
        <div className="anna-chat-menu" aria-label="Suggested questions">
          {menuPrompts.map((p) => (
            <button key={p} type="button" onClick={() => send(p, true)}>
              {p}
            </button>
          ))}
        </div>
      ) : (
        <div className="anna-chat-body" ref={scroller} aria-live="polite">
          <ul className="aa-thread">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "user" ? "is-user" : "is-anna"}>
                {m.role === "assistant" ? (
                  <span className="aa-avatar aa-avatar-sm" aria-hidden="true">
                    <img
                      src="/anna-avatar.jpg"
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                ) : null}
                <div className="aa-bubble">
                  {m.content.split("\n\n").map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                  {/* Curated case-study image, canned answers only (see
                      ChatImage in annaAnswers.ts): the answer shows the
                      work instead of describing it, and the whole figure
                      links into the case study. */}
                  {m.image ? (
                    <a className="aa-figure" href={m.image.href}>
                      <img src={m.image.src} alt={m.image.alt} loading="lazy" />
                      <span>{m.image.label} &rarr;</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          {busy ? (
            <p className="aa-typing" role="status">
              <span />
              <span />
              <span />
              <span className="aa-sr">{assistantName} is thinking</span>
            </p>
          ) : null}

          {!busy && followUps.length > 0 ? (
            <div className="anna-chat-followups" aria-label="Follow-up questions">
              {followUps.map((q) => (
                <button key={q} type="button" onClick={() => send(q, true)}>
                  {q}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {error ? (
        <p className="aa-error anna-chat-error" role="alert">
          {error}
          {capped ? (
            <>
              {" "}
              <a href="https://calendly.com/anna-rovedo/30min">Book a call</a>.
            </>
          ) : null}
        </p>
      ) : null}

      <form
        className="anna-chat-composer"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder={
            capped
              ? "That’s the limit for now."
              : placeholderOverride ?? assistantPlaceholder
          }
          aria-label={
            isClient ? "Ask Paper Pixel about your project" : "Ask Almost Anna a question"
          }
          disabled={capped}
        />
        <button
          type="submit"
          className="anna-chat-send"
          disabled={busy || capped || !input.trim()}
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {onClose ? (
          <button
            type="button"
            className="anna-chat-close"
            onPointerDown={(e) => e.preventDefault()}
            onClick={onClose}
            aria-label="Close the conversation"
            title="Close the conversation"
          >
            &times;
          </button>
        ) : null}
      </form>
    </div>
  );
}
