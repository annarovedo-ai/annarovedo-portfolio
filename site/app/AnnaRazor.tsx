"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import AlmostAnnaChat from "./AlmostAnnaChat";

/**
 * Almost Anna, docked along the bottom of the page.
 *
 * The IBM Concierge pattern turned on the portfolio that documents it (see
 * /concierge, "Why the bottom"): docked along the bottom rather than parked in
 * a corner, reading whichever section is on screen and offering a line about
 * it.
 *
 * ONE setting, not two. "Do I want company while I read?" is a single
 * question, so hiding the hints and shrinking the bar are the same action:
 *
 *   razor — the bar, with a contextual hint at the far end. The default for
 *           anyone who wants that extra context while going through the work.
 *           Desktop and tablet only; phones get no hints.
 *   quiet — a single button in the corner. Nothing moves, nothing suggests.
 *
 * The way back matters more than the way out. A reader who goes quiet can
 * always still open the conversation from the corner, so the switch to bring
 * the bar back lives INSIDE the conversation, at the foot of the panel. That
 * is the only surface guaranteed to be reachable from every state.
 *
 * The corner button opens the chat outright. It is a way to talk to her, not a
 * way to restore chrome.
 *
 * Sections opt in with a short line:
 *   <section data-anna-prompt="Why the bottom?">
 *
 * SHAPE, not swap. The three states below (quiet/razor/open) are one object
 * changing form, not three independent widgets that happen to trade places.
 * They share a single `layoutId`, so leaving one and entering another animates
 * the actual box — position, size, corner radius — from where it was to where
 * it's going, instead of cutting between three unrelated layouts. That is the
 * whole point of the exercise: tap the corner button and the conversation
 * visibly grows out of the spot you tapped, rather than appearing somewhere
 * else on screen.
 */

/**
 * Where the razor is switched on while the interaction is being worked out.
 * The per-section lines are already written across every case study, so this
 * is all that holds the rollout back. Set to null for site-wide.
 */
const ENABLED_PATHS: string[] | null = ["/"];

const MODE_KEY = "pp-anna-razor";
// Shown once per tab: a brief label explaining this is an AI, not a search
// box or a newsletter signup. First-time visitors were scrolling past the
// bar without registering what it was, so this earns it a single explicit
// beat before settling into the quieter, icon-only state everyone sees
// afterward. Independent of MODE_KEY: dismissing to quiet or reopening
// doesn't bring it back, only a brand new tab does.
const INTRO_KEY = "pp-anna-razor-intro";
const INTRO_DURATION = 4200;
// How long the "Hidden…" notice stays before the bar collapses. Long enough
// to read the sentence and reach the Undo inside it.
const DISMISS_NOTICE = 2100;
type Mode = "quiet" | "razor";

// One transition, shared by every shape change: mode switches and the settle
// after a drag. Anna's other motion on the site is eased tweens, not springs,
// so this matches that rather than introducing a bouncier feel that would
// stand out as belonging to a different system.
const SHAPE_TRANSITION = { duration: 0.38, ease: [0.22, 0.61, 0.36, 1] } as const;
const CONTENT_IN = { duration: 0.2, ease: "easeOut" } as const;
const CONTENT_OUT = { duration: 0.12, ease: "easeIn" } as const;

export default function AnnaRazor() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("razor");
  const [visible, setVisible] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [drag, setDrag] = useState<number | null>(null);
  const [dismissing, setDismissing] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const dragFrom = useRef(0);
  const dismissTimer = useRef<number | null>(null);
  // What the reader had before they opened the conversation, so closing it
  // can put them back rather than deciding for them. See the panel's close
  // button for why that matters.
  const modeBeforeOpen = useRef<Mode>("razor");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Phones default to quiet: the hint layer is the reason for the bar, and
  // phones do not get hints, so the bar would be cost without benefit.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(MODE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (stored === "quiet" || stored === "razor") {
      setMode(stored);
      return;
    }
    setMode(window.matchMedia("(max-width: 767px)").matches ? "quiet" : "razor");
  }, []);

  // Dismissing runs on a timer so the notice has time to be read, and the
  // timer is held so Undo can cancel it. The 2.1s window used to be dead
  // time: it is the exact moment someone realises they hit the wrong thing,
  // and the bar was inert for all of it, so reversing a misclick meant
  // watching it disappear, finding the corner button, opening a
  // conversation, and hunting for the setting. Four steps to undo one click.
  function dismissToQuiet() {
    setDismissing(true);
    dismissTimer.current = window.setTimeout(() => {
      dismissTimer.current = null;
      setDismissing(false);
      choose("quiet");
    }, DISMISS_NOTICE);
  }

  function undoDismiss() {
    if (dismissTimer.current !== null) {
      window.clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    setDismissing(false);
  }

  function choose(next: Mode) {
    setMode(next);
    try {
      window.sessionStorage.setItem(MODE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }

  useEffect(() => {
    // The hero handoff exists so the corner button never competes with the
    // inline chat card. On a phone the hero is several screens tall, so
    // waiting for all of it means the button is missing for most of the page.
    // Phones fall back to a plain scroll threshold instead.
    const hero = isPhone ? null : document.querySelector(".home-hero");
    if (hero) {
      const io = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { rootMargin: "-68px 0px 0px 0px", threshold: 0 }
      );
      io.observe(hero);
      return () => io.disconnect();
    }
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // pathname matters: this is client-side routing, so the component does
    // not remount between pages. Without it, the observer keeps watching the
    // .home-hero node from whatever page you arrived from, which is by then
    // detached from the document, and `visible` freezes at whatever it was
    // when you left. Harmless while ENABLED_PATHS is ["/"]; a real bug the
    // day the razor goes site-wide.
  }, [isPhone, pathname]);

  // Fires once the razor is first visible in this tab, provided the visitor
  // hasn't already opened the conversation on their own (someone who's
  // already tapped it doesn't need telling what it is). sessionStorage keeps
  // it to a single showing per tab, same lifetime as MODE_KEY.
  useEffect(() => {
    if (!visible || open) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setShowIntro(true);
    const t = window.setTimeout(() => setShowIntro(false), INTRO_DURATION);
    return () => window.clearTimeout(t);
  }, [visible, open]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anna-prompt]")
    );
    if (nodes.length === 0) return;

    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target, entry.intersectionRatio);
        let bestEl: HTMLElement | null = null;
        let bestRatio = 0;
        for (const node of nodes) {
          const r = ratios.get(node) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestEl = node;
          }
        }
        const raw = bestEl?.dataset.annaPrompt ?? "";
        setPrompts(raw.split("|").map((t) => t.trim()).filter(Boolean));
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // Same reason as the visibility observer above: re-query the tagged
    // sections on navigation. Without this the hint chip stays frozen on the
    // last section of the page you came from, so the razor would offer
    // "What I did for these" over a case study about something else.
  }, [pathname]);

  // Retract-on-scroll (hide while scrolling down, return on scroll up or a
  // pause) was removed 2026-08-06 at Anna's request — she didn't like the bar
  // disappearing during a scroll, full stop, independent of how the
  // thresholds were tuned. The bar now just stays put once visible; it no
  // longer reacts to scroll motion at all, only to mode/open changes and the
  // scroll-past-hero visibility gate above.

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus follows the conversation, and comes back when it ends.
  //
  // Opening moved the visual centre of the page without moving the keyboard
  // caret, so anyone not using a mouse got a panel they had to go hunting for
  // with Tab, and anyone using a screen reader was told nothing had happened.
  // On open, focus lands in the composer, which is what the reader came to do.
  // On close, it returns to whatever opened the panel, so pressing Escape puts
  // you back exactly where you were rather than at the top of the document.
  //
  // Deliberately NOT a focus trap: the page behind stays visible and readable
  // by design (see the panel height note in globals.css), so this is a
  // non-modal dialog. Trapping focus in a panel the reader can still see past
  // would take the page hostage.
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      // One frame, so the panel has actually mounted before we reach into it.
      const t = window.setTimeout(() => {
        const field = document.querySelector<HTMLInputElement>(
          ".anna-razor-panel .aa-composer input"
        );
        field?.focus();
      }, 0);
      return () => window.clearTimeout(t);
    }
    const back = returnFocus.current;
    returnFocus.current = null;
    // Only if it is still on the page and still focusable — the element that
    // opened this may well have been the bar that has since become a corner
    // button, in which case there is nothing sensible to return to.
    if (back && document.contains(back)) back.focus();
  }, [open]);

  const enabled = ENABLED_PATHS === null || ENABLED_PATHS.includes(pathname);

  // Only reserve room at the foot of the document where the bar is mounted.
  useEffect(() => {
    const el = document.documentElement;
    if (enabled && mode === "razor" && !open) el.dataset.annaRazor = "bar";
    else delete el.dataset.annaRazor;
    return () => {
      delete el.dataset.annaRazor;
    };
  }, [enabled, mode, open]);

  if (!enabled) return null;

  const offer = !isPhone && mode === "razor" ? prompts[0] : undefined;

  function openWith(text?: string) {
    // Remember what they had, so closing restores it instead of choosing for
    // them. Captured here rather than in an effect because this is the only
    // path into the panel.
    modeBeforeOpen.current = mode;
    setSeed(text);
    setOpen(true);
    // Opening always cuts the intro short: someone who has just started a
    // conversation does not need to be told what the thing is. Done here
    // rather than in an effect watching `open`, which was an extra render
    // pass to express something that only ever happens on this one path.
    setShowIntro(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    setDraft("");
    openWith(text);
  }

  // Two positions, not free placement: a sheet that can be parked anywhere can
  // be parked somewhere useless, and a drag with no detents cannot be operated
  // without a pointer. The bar tracks the finger, then commits or springs back
  // through the same shape transition everything else uses.
  const SWIPE_COMMIT = 54;
  const SWIPE_MAX = 96;

  function onTouchStart(e: React.TouchEvent) {
    if (!isPhone) return;
    dragFrom.current = e.touches[0].clientY;
    setDrag(0);
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isPhone || drag === null) return;
    const dy = e.touches[0].clientY - dragFrom.current;
    setDrag(
      open
        ? Math.min(SWIPE_MAX, Math.max(0, dy))
        : Math.max(-SWIPE_MAX, Math.min(0, dy))
    );
  }

  function onTouchEnd() {
    if (!isPhone || drag === null) return;
    const dy = drag;
    setDrag(null);
    if (!open && dy < -SWIPE_COMMIT) openWith(undefined);
    if (open && dy > SWIPE_COMMIT) setOpen(false);
  }

  // While a touch is active the shape follows the finger 1:1 with no easing
  // of its own — the shared transition only ever plays once the finger lifts,
  // either into the open panel or back to rest.
  const dragTransition = drag === null ? SHAPE_TRANSITION : { duration: 0 };
  const dragY = drag ?? 0;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            layoutId="anna-razor-shape"
            layout
            transition={SHAPE_TRANSITION}
            className="anna-razor-panel"
            role="dialog"
            aria-label="Almost Anna"
            style={{ borderRadius: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: CONTENT_OUT }}
          >
            {isPhone ? (
              <span
                className="anna-razor-grip"
                aria-hidden="true"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            ) : null}
            {/* ONE CLOSE, AND IT NEVER COSTS YOU ANYTHING.
                There were two buttons here: Minimise (–), which closed the
                panel and turned the bar on, and Close (×), which closed the
                panel and turned the bar OFF for the rest of the session, in
                sessionStorage. Two near-identical glyphs, an inch apart,
                with different persistent consequences.

                That was a trap rather than a rough edge, because × is what
                "close this" means everywhere on the internet, so × is what
                everyone reached for — and × was the lossy one. They landed in
                a state they never picked and never learned they had changed a
                setting. Escape, meanwhile, only ever called setOpen(false)
                and left the mode alone, so the keyboard path was safer than
                the visible button. Backwards.

                Now closing the panel restores whatever the reader had before
                they opened it, and does nothing else. Came from the bar, go
                back to the bar; came from the corner, go back to the corner.
                Escape and × finally agree.

                Changing the mode for real now happens in exactly two places,
                both of which say so: the bar's own × (which shows the notice,
                with an Undo in it), and the settings row at the foot of this
                panel. One destructive control per direction, each with a
                warning attached, instead of three scattered ones. */}
            <div className="anna-razor-panel-controls">
              <button
                type="button"
                className="anna-razor-close"
                onClick={() => {
                  setOpen(false);
                  choose(modeBeforeOpen.current);
                }}
                aria-label="Close the conversation"
                title="Close the conversation"
              >
                &times;
              </button>
            </div>

            <AlmostAnnaChat variant="dock" seed={seed} />

            {/* THE WAY BACK, and only the way back.
                This used to be a two-way switch, which meant that with the bar
                already on it offered "Stop showing the bar while I read" — a
                second control for something the × in this panel's own header
                already does, two inches away. A settings-shaped duplicate of a
                button you can see at the same time is worse than no control at
                all: it implies a distinction that isn't there.

                So it now appears in one direction only, when the bar is off,
                which is the one job nothing else can do. Dismissal is easy to
                do by accident and easy to forget doing, and this panel is
                reachable from every state including quiet, so it is the only
                place an undo can't get stranded.

                The wording is an offer, not a setting: it says where the thing
                will appear and what it will do there, in the reader's words
                rather than ours. "The bar" meant nothing to anyone who hadn't
                built it. */}
            {!isPhone && mode === "quiet" ? (
              <div className="anna-razor-settings">
                <button
                  type="button"
                  onClick={() => {
                    choose("razor");
                    // Also move the restore point. Close puts the reader back
                    // in whatever they had when they opened the panel, and
                    // what they had was quiet — so without this line, turning
                    // the bar on here and then closing would quietly undo the
                    // choice they just made, which is the exact failure this
                    // whole pass was fixing.
                    modeBeforeOpen.current = "razor";
                  }}
                >
                  Show suggestions at the bottom as I browse
                </button>
              </div>
            ) : null}
          </motion.div>
        ) : mode === "quiet" ? (
          <motion.button
            key="mini"
            layoutId="anna-razor-shape"
            layout
            transition={dragTransition}
            type="button"
            className={`anna-razor-mini${visible ? " is-visible" : ""}`}
            style={{ borderRadius: 23, y: dragY }}
            whileHover={{ y: dragY - 2 }}
            onClick={() => openWith(undefined)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-label="Open the conversation with Almost Anna"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            exit={{ opacity: 0, transition: CONTENT_OUT }}
          >
            <span className="anna-razor-avatar-photo" aria-hidden="true">
              <img
                src="/anna-avatar.jpg"
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </span>
            <AnimatePresence>
              {showIntro ? (
                <motion.span
                  key="intro-mini"
                  className="anna-razor-intro anna-razor-intro--mini"
                  role="status"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={CONTENT_IN}
                >
                  An AI trained on Anna&rsquo;s work. Ask it anything.
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        ) : (
          <motion.form
            key="bar"
            layoutId="anna-razor-shape"
            layout
            transition={dragTransition}
            className={`anna-razor-bar${visible ? " is-visible" : ""}`}
            style={{ borderRadius: 0, y: dragY }}
            onSubmit={submit}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-hidden={!visible}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            exit={{ opacity: 0, transition: CONTENT_OUT }}
          >
            {isPhone ? <span className="anna-razor-grip" aria-hidden="true" /> : null}

            {/* Shown once per tab, anchored over the photo rather than
                centered, so the eye lands on the face first and the sentence
                explains what the face is. Absolutely positioned so it never
                changes the bar's own height, which would defeat the point of
                a bar that holds still. */}
            <AnimatePresence>
              {showIntro && !dismissing ? (
                <motion.span
                  key="intro-bar"
                  className="anna-razor-intro"
                  role="status"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={CONTENT_IN}
                >
                  An AI trained on Anna&rsquo;s work. Ask it anything.
                </motion.span>
              ) : null}
            </AnimatePresence>

            {/* Content only, never the shape: dismissing swaps what the bar
                says without moving or resizing it, so the "you can bring it
                back" notice reads as the same object, mid-thought, rather than
                a different control replacing it. */}
            <AnimatePresence mode="wait" initial={false}>
              {dismissing ? (
                <motion.div
                  key="notice"
                  className="anna-razor-bar-inner anna-razor-notice"
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={CONTENT_IN}
                >
                  <span className="anna-razor-avatar" aria-hidden="true">
                    <img
                      src="/anna-avatar.jpg"
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                  <p>Hidden. You can bring it back any time from the chat.</p>
                  {/* The undo, at the one moment it is actually wanted. The
                      notice used to only say where the way back lived, which
                      is the right instinct aimed slightly past the target:
                      these two seconds are exactly when someone realises they
                      hit the wrong thing, and the bar was inert for all of
                      them. Now the sentence still teaches where the setting
                      lives, for anyone who meant it, and the button fixes it
                      in one click for anyone who didn't. */}
                  <button
                    type="button"
                    className="anna-razor-undo"
                    onClick={undoDismiss}
                  >
                    Undo
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="controls"
                  className="anna-razor-bar-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={CONTENT_IN}
                >
                  <span className="anna-razor-avatar" aria-hidden="true">
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
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask Almost Anna anything…"
                    aria-label="Ask Almost Anna"
                    tabIndex={visible ? 0 : -1}
                  />

                  {/* Left of send, and only while there's nothing typed: once
                      you have a draft, the chip would sit between you and the
                      button that sends it, which is confusing about what
                      "send" even acts on. Gone the instant you start typing,
                      back the instant you clear it. */}
                  {offer && !draft.trim() ? (
                    <span className="anna-razor-offer-wrap">
                      <button
                        key={offer}
                        type="button"
                        className="anna-razor-offer"
                        onClick={() => openWith(offer)}
                        tabIndex={visible ? 0 : -1}
                      >
                        {/* No aria-live. This text changes every time a new
                            section scrolls into view, so announcing it meant a
                            screen-reader user got interrupted with a fresh
                            question every few seconds while trying to read the
                            page. It is a suggestion sitting on screen, not an
                            event worth interrupting for; the button's own
                            label is read normally when tabbed to. */}
                        <span>{offer}</span>
                      </button>
                    </span>
                  ) : null}

                  <button
                    type="submit"
                    className="anna-razor-send"
                    aria-label="Send"
                    disabled={!draft.trim()}
                    tabIndex={visible ? 0 : -1}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* One control, one meaning: leave me alone with the page. */}
                  <button
                    type="button"
                    className="anna-razor-dismiss"
                    onClick={dismissToQuiet}
                    aria-label="Collapse to the corner"
                    title="Collapse to the corner"
                    tabIndex={visible ? 0 : -1}
                  >
                    &times;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
