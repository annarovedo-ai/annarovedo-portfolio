"use client";

import { useEffect, useRef } from "react";
import { useSyncExternalStore } from "react";
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
 * THE CHAT SURFACE, menu model (2026-08-19, Anna's razor redesign).
 * Rendered inside the razor's open panel, under the panel's own header row
 * (photo, name, disclosure, minimise, close — those live in AnnaRazor
 * because they drive razor state).
 *
 * - Empty: the four suggested questions as a menu of chips on the navy
 *   ground, then the composer. No greeting, no explainer, no reserved
 *   height: the panel is as tall as its contents until a conversation
 *   exists. (The greeting-line era ended here; the header's disclosure is
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
}: {
  /** Opening question handed over from the razor bar's hint, sent once on
      mount with suggested: true. */
  seed?: string;
  /** Entrance routes force their persona for correct server render. */
  personaOverride?: import("./personaStore").PersonaId;
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
          {c.prompts.map((p) => (
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
          placeholder={capped ? "That's the limit for now." : assistantPlaceholder}
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
      </form>
    </div>
  );
}
