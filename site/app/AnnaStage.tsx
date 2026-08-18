"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useSyncExternalStore } from "react";

/** useLayoutEffect on the client, useEffect during SSR (where layout
    effects warn and neither runs). The departing side of the focus handoff
    must use a LAYOUT effect: passive-effect cleanup for an unmounting
    subtree runs after the commit, by which point the input has left the
    document and document.activeElement can no longer identify it. Layout
    cleanup runs synchronously during the commit, before the node detaches. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
import { motion, MotionConfig } from "motion/react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import {
  carryFocus,
  ensurePersona,
  getChat,
  getServerChat,
  sendChat,
  setChatInput,
  setStageDocked,
  subscribeChat,
  takeFocusCarry,
} from "./chatStore";
import { homeContent } from "./homeContent";

/**
 * THE STAGE (2026-08-18 spec pass): the full-viewport chat section that sits
 * directly after the hero on / and /studio. It is one of four visual states
 * of a single experience — stage, dock, panel, mini — all reading the same
 * chatStore, with the composer morphing between stage and dock via the
 * shared Motion layoutId ("anna-razor-shape", the same id the dock, panel
 * and mini already trade between themselves).
 *
 * Contract with AnnaRazor:
 * - This component owns the sentinel observers and writes
 *   chatStore.stageDocked. On stage routes the razor renders nothing until
 *   stageDocked is true, so exactly one element carries the layoutId at any
 *   moment and Motion animates the handoff.
 * - While the panel is open, dock/undock decisions freeze (the spec's "do
 *   not collapse the panel because the page crossed the boundary"); when the
 *   panel closes, the sentinel is re-measured once to decide which form the
 *   composer returns in.
 * - The composer's draft and caret live in chatStore, so typing survives the
 *   morph; focus is restored explicitly because the DOM node changes.
 */

// Two observers on one sentinel = hysteresis. The sentinel must rise 56px
// above the viewport top before the composer docks, but re-entering the
// viewport at all undocks it. Between those lines nothing changes, so the
// boundary cannot flicker. The stage keeps its height when the composer
// leaves the flow (the ghost below), so docking does not move the page and
// cannot re-trigger the observer it came from.
const DOCK_MARGIN = "-56px 0px 0px 0px";

const STAGE_HEADINGS: Partial<Record<PersonaId, string>> = {
  recruiter: "Ask Anna about the work.",
  client: "Start with the project as it exists now.",
  // Ex deliberately absent: the Ex voice already has its opening line in
  // homeContent (conciergeHeading) and inventing new intimacy is off-limits.
};

export default function AnnaStage({
  personaOverride,
}: {
  /** Entrance routes (/studio) force their persona so the server-rendered
      stage already speaks as Ask Paper Pixel. */
  personaOverride?: PersonaId;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  const chat = useSyncExternalStore(subscribeChat, getChat, getServerChat);
  const { messages, busy, capped, error, input, open, stageDocked } = chat;

  const c = homeContent[persona];
  const isClient = persona === "client";
  const assistantName = isClient ? "Ask Paper Pixel" : "Almost Anna";
  const assistantDisclosure = isClient
    ? "Guided by Anna’s work and point of view."
    : "Trained on my work and how I think.";
  const assistantPlaceholder = isClient
    ? "Ask about your project…"
    : "Ask Almost Anna anything…";
  const heading = STAGE_HEADINGS[persona] ?? c.conciergeHeading;

  const started = messages.length > 0;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  // Mirrors chat.open for observer callbacks without re-binding them.
  // Written in an effect, not during render, per the hooks lint rules.
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    ensurePersona(persona);
  }, [persona]);

  // Leaving the page altogether means there is no stage to dock from.
  useEffect(() => {
    return () => setStageDocked(false);
  }, []);

  // The sentinel sits at the composer's position in the flow. Observer A
  // (viewport shrunk 56px at the top) docks the composer once the sentinel
  // has cleared that inset line ABOVE the viewport — never when the stage
  // merely enters from below. Observer B (true viewport) undocks the moment
  // the sentinel is visible again.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const dockObs = new IntersectionObserver(
      ([entry]) => {
        if (openRef.current) return;
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setStageDocked(true);
        }
      },
      { rootMargin: DOCK_MARGIN, threshold: 0 }
    );
    const undockObs = new IntersectionObserver(
      ([entry]) => {
        if (openRef.current) return;
        if (entry.isIntersecting) setStageDocked(false);
      },
      { threshold: 0 }
    );
    dockObs.observe(el);
    undockObs.observe(el);
    return () => {
      dockObs.disconnect();
      undockObs.disconnect();
    };
  }, []);

  // The panel closing is the one moment the observers were told to ignore,
  // so re-measure once: composer returns to the stage if the sentinel is on
  // screen, to the dock if the reader is further down the page.
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current && !open) {
      const el = sentinelRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setStageDocked(rect.top < 0 && rect.bottom < 0);
      }
    }
    prevOpen.current = open;
  }, [open]);

  // Focus handoff, arriving side. When the composer returns from the dock
  // and the caret was in flight, claim it — without scrolling the page.
  useEffect(() => {
    if (stageDocked) return;
    const carry = takeFocusCarry();
    if (!carry) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (carry.start !== null && carry.end !== null) {
      try {
        el.setSelectionRange(carry.start, carry.end);
      } catch {
        /* selection not applicable */
      }
    }
  }, [stageDocked]);

  // Same scroll behavior as the card and panel: land on the start of the
  // newest exchange, follow the bottom only while the reply is arriving.
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

  // Focus handoff, departing side: cleanup runs while the node is still in
  // the DOM, so the caret can be read and carried across the morph.
  function composerWillUnmount() {
    const el = inputRef.current;
    if (el && document.activeElement === el) {
      carryFocus({ start: el.selectionStart, end: el.selectionEnd });
    }
  }

  return (
    <section className="anna-stage" aria-label={assistantName} data-anna-stage>
      {/* One framed chat object (2026-08-19, Anna: "put it into a chat and
          get rid of the negative space"): the section hugs its content and
          everything lives inside a single bordered surface — her message,
          the quick replies, the composer — so it reads as a conversation,
          not as display type floating on the page. */}
      <div className="anna-stage-inner">
        <div className="anna-stage-chat">
        {!started ? (
          <>
            <p className="anna-stage-name">
              <strong>{assistantName}</strong>
              <span>{assistantDisclosure}</span>
            </p>
            <div className="anna-stage-greeting">
              <span className="aa-avatar" aria-hidden="true">
                <img
                  src="/anna-avatar.jpg"
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </span>
              <div className="anna-stage-bubble">
                <h2 className="anna-stage-heading">{heading}</h2>
                <p>{c.conciergeBody}</p>
              </div>
            </div>
            <div className="anna-stage-chips" aria-label="Suggested questions">
              {c.prompts.map((p) => (
                <button key={p} type="button" onClick={() => send(p, true)}>
                  {p}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="anna-stage-thread" ref={scroller} aria-live="polite">
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

        {!stageDocked ? (
          <MotionConfig reducedMotion="user">
            <StageComposerLifecycle onWillUnmount={composerWillUnmount}>
              <motion.form
                layoutId="anna-razor-shape"
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="anna-stage-composer"
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
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={capped ? "That's the limit for now." : assistantPlaceholder}
                  aria-label={
                    isClient
                      ? "Ask Paper Pixel about your project"
                      : "Ask Almost Anna a question"
                  }
                  disabled={capped}
                />
                <button
                  type="submit"
                  className="anna-stage-send"
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
              </motion.form>
            </StageComposerLifecycle>
          </MotionConfig>
        ) : (
          // The composer's seat, held while it is off being the dock, so the
          // page does not jump and the sentinel does not move.
          <div className="anna-stage-ghost" aria-hidden="true" />
        )}
        </div>
      </div>
      <div ref={sentinelRef} className="anna-stage-sentinel" aria-hidden="true" />
    </section>
  );
}

/** Runs the caret-carry callback in cleanup, while the input is still in
    the DOM. A wrapper component because the callback must fire on unmount
    of the composer subtree specifically, not of the stage. */
function StageComposerLifecycle({
  onWillUnmount,
  children,
}: {
  onWillUnmount: () => void;
  children: React.ReactNode;
}) {
  const cb = useRef(onWillUnmount);
  useEffect(() => {
    cb.current = onWillUnmount;
  }, [onWillUnmount]);
  // Layout effect: its cleanup runs during the unmount commit, while the
  // composer's input is still in the document. See useIsoLayoutEffect above.
  useIsoLayoutEffect(() => {
    return () => cb.current();
  }, []);
  return <>{children}</>;
}
