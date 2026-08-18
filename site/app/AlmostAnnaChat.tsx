"use client";

import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import {
  ensurePersona,
  getChat,
  getServerChat,
  sendChat,
  subscribeChat,
} from "./chatStore";
import { homeContent } from "./homeContent";

export default function AlmostAnnaChat({
  variant = "inline",
  seed,
  personaOverride,
}: {
  /**
   * "inline": the boxed card (client Project guide section).
   * "dock": the razor's open panel.
   * "hero": the homepage hero conversation bar (2026-08-18, replacing the
   * video): one input with the chips beneath it, no card chrome; the thread
   * expands in place above the bar once the first question is asked.
   */
  variant?: "inline" | "dock" | "hero";
  /** Opening question handed over from the razor, sent once on mount. */
  seed?: string;
  /** The Client homepage passes "client" so the guide is Ask Paper Pixel in
      the server-rendered HTML too, not only after the store hydrates. */
  personaOverride?: import("./personaStore").PersonaId;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  const c = homeContent[persona];
  const isClient = persona === "client";
  const assistantName = isClient ? "Ask Paper Pixel" : "Almost Anna";
  const assistantDisclosure = isClient
    ? "Guided by Anna’s work and point of view."
    : "Trained on my work and how I think.";
  const assistantPlaceholder = isClient
    ? "Ask about your project…"
    : "Ask Almost Anna anything…";

  // The thread lives in chatStore, shared by every instance of this
  // component on the page (hero bar, inline card, razor dock), so a
  // conversation started in one continues in the others. See chatStore.ts.
  const chat = useSyncExternalStore(subscribeChat, getChat, getServerChat);
  const { messages, busy, capped, error } = chat;
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement | null>(null);

  // Persona switches reset the shared thread; the store ignores the call
  // when nothing changed, so every mounted instance can say it safely.
  useEffect(() => {
    ensurePersona(persona);
  }, [persona]);

  // Land on the START of the answer, not the end of it.
  //
  // This used to pin scrollTop to scrollHeight on every change, which is the
  // right behaviour for a messaging app, where the newest line is the whole
  // point and everything above it is already read. It is the wrong behaviour
  // here. An answer from Almost Anna arrives complete and is often six or
  // seven paragraphs, so jumping to the bottom dropped the reader at the last
  // sentence of something they had not started, and they had to scroll UP to
  // find out what was said.
  //
  // So: bring the top of the newest exchange to the top of the card. The
  // question sits at the top, the answer begins directly under it, and reading
  // continues downward the way reading does. While the reply is still coming
  // back, follow the bottom instead, because there the newest thing on screen
  // is the thinking indicator and it should stay visible.
  useEffect(() => {
    if (messages.length === 0) return;
    const el = scroller.current;
    if (!el) return;

    if (busy) {
      el.scrollTop = el.scrollHeight;
      return;
    }

    // The last question asked. Anchoring on the question rather than the reply
    // keeps the thing being answered on screen, which is what makes a long
    // answer legible.
    const items = el.querySelectorAll<HTMLLIElement>(".aa-thread > li.is-user");
    const lastAsk = items[items.length - 1];
    if (!lastAsk) {
      el.scrollTop = el.scrollHeight;
      return;
    }

    // offsetTop is measured against the nearest positioned ancestor, which is
    // not reliably the scroller, so go through the rects instead.
    const target =
      lastAsk.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop;

    el.scrollTo({ top: Math.max(0, target - 12), behavior: "smooth" });
  }, [messages, busy]);

  // The network round-trip and the `suggested` contract live in the store
  // now (sendChat); this wrapper only clears this instance's own input.
  function send(text: string, suggested = false) {
    sendChat(persona, text, suggested);
    setInput("");
  }

  // The razor carries the first question across when it expands, so the
  // conversation opens already answering rather than asking again.
  const seeded = useRef(false);
  useEffect(() => {
    if (!seed || seeded.current) return;
    seeded.current = true;
    void send(seed, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const started = messages.length > 0;

  if (variant === "hero") {
    return (
      <div className="aa aa-hero">
        {/* Identity and disclosure in one quiet line: the card masthead's
            job, without the card. */}
        <p className="aa-hero-id">
          <strong>{assistantName}</strong>
          <span>{assistantDisclosure}</span>
        </p>

        {started ? (
          <div className="aa-hero-thread" ref={scroller}>
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
        ) : null}

        <form
          className="aa-hero-bar"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <span className="aa-avatar" aria-hidden="true">
            <img
              src="/anna-avatar.jpg"
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={capped ? "That's the limit for now." : assistantPlaceholder}
            aria-label={
              isClient ? "Ask Paper Pixel about your project" : "Ask Almost Anna a question"
            }
            disabled={capped}
          />
          <button type="submit" disabled={busy || capped || !input.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

        {error ? (
          <p className="aa-error" role="alert">
            {error}
            {capped ? (
              <>
                {" "}
                <a href="https://calendly.com/anna-rovedo/30min">Book a call</a>.
              </>
            ) : null}
          </p>
        ) : null}

        {!started && !busy ? (
          <div className="aa-hero-prompts">
            <span>{c.promptsLabel ?? "You could ask"}</span>
            <div>
              {c.prompts.map((p) => (
                <button key={p} type="button" onClick={() => send(p, true)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`aa aa-${variant}`}>
      <div className="aa-head">
        {/* Her face, not initials, and the same face at every size and in
            every one of the three places this chat appears (hero card, razor
            bar, open panel). "AA" told a first-time visitor nothing. */}
        <span className="aa-avatar" aria-hidden="true">
          <img
            src="/anna-avatar.jpg"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </span>
        <div>
          <strong>{assistantName}</strong>
          <span className="aa-disclosure">{assistantDisclosure}</span>
        </div>
        {/* The persona tag ("Recruiter" / "Client" / "Ex boyfriend") used to
            sit here. Removed 2026-08-07: the switcher is directly above this
            card in the intro band and already says which version you are
            reading, so the tag was labelling the chat with something that was
            never a property of the chat. The eyebrow string is still in
            homeContent and still used by the switcher. */}
      </div>

      <div className="aa-body" ref={scroller}>
        {!started ? (
          <div className="aa-intro">
            {/* h2, not h3. In the hero this card sits directly under the
                page's h1 with nothing between them, so an h3 skipped a level
                — the one break in an otherwise correct outline, and the first
                thing an audit flags on a site whose State Street study
                advertises WCAG AA. */}
            <h2>{c.conciergeHeading}</h2>
            <p>{c.conciergeBody}</p>
            {c.conciergeAside ? <p className="aa-aside">{c.conciergeAside}</p> : null}
          </div>
        ) : (
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
        )}

        {busy ? (
          <p className="aa-typing" role="status">
            <span />
            <span />
            <span />
            <span className="aa-sr">{assistantName} is thinking</span>
          </p>
        ) : null}

        {error ? (
          <p className="aa-error" role="alert">
            {error}
            {capped ? (
              <>
                {" "}
                <a href="https://calendly.com/anna-rovedo/30min">Book a call</a>.
              </>
            ) : null}
          </p>
        ) : null}

        {!started && !busy ? (
          <div className="aa-prompts">
            <span className="aa-prompts-label">{c.promptsLabel ?? "You could ask"}</span>
            <div>
              {c.prompts.map((p) => (
                <button key={p} type="button" onClick={() => send(p, true)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <form
        className="aa-composer"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={capped ? "That's the limit for now." : assistantPlaceholder}
          aria-label={isClient ? "Ask Paper Pixel about your project" : "Ask Almost Anna a question"}
          disabled={capped}
        />
        {/* Same arrow, drawn the same way, as the razor bar's send. The bare
            &rarr; entity read as a dash at this size and rendered differently
            depending on the font that resolved. */}
        <button type="submit" disabled={busy || capped || !input.trim()} aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

      {/* The fine print under the composer ("An AI version of me, built from
          my own work…") was removed 2026-08-07. The header already discloses
          it, once, in four words: "Trained on my work and how I think." A
          second disclosure directly under the input said the same thing at
          greater length, in the position a reader looks at while deciding
          what to type, and it was the largest block of grey text in the
          component. Saying it twice does not make it more honest, it just
          makes the honest bit easier to skip. */}
    </div>
  );
}
