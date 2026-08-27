"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import BrandLockup from "./BrandLockup";
import PersonaSwitch from "./PersonaSwitch";
import SiteNav from "./SiteNav";
import { useRouter } from "next/navigation";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import { homeContent } from "./homeContent";

/**
 * ONE SWITCHER, ONE LAYOUT, POSITION:STICKY. (V4)
 *
 * The history matters, because four versions of this file chased the same
 * bug from different directions.
 *
 * V1 rendered the control TWICE, once in the navy intro band and once in the
 * header, and swapped between them on an IntersectionObserver. That is a
 * teleport, and no amount of tuning fixes a teleport.
 *
 * V2 made it one element and stuck it separately from the header at a
 * hardcoded top:84px copied from the header’s min-height. That holds only
 * while the header renders at exactly its minimum, which it does not.
 *
 * V3 put the switcher inside a position:fixed header with a named grid: two
 * rows at rest, one row once scrolled, plus a measured spacer to stop the
 * collapse moving the page. Same DOM node throughout — but the LAYOUT still
 * flipped at a scroll threshold (stacked-and-centered to inline-in-the-bar,
 * full-size pill to compact pill), and a layout flip reads as a jump no
 * matter how it is triggered (Anna, 2026-08-24: "the switcher jumps. make
 * it scroll with the rest of the page, and then sticks at the top").
 *
 * V4 removed the state machine instead of retiming it: header as ordinary
 * scrolling content, switcher in its own sticky navy band. One layout, no
 * jump — but once pinned, the logo and nav had scrolled away with the
 * header (Anna, same day: "now we lose the logo and nav").
 *
 * V5 folded the switcher into one sticky header row, interior-page style.
 * Logo and nav stayed put — but the switcher was now pinned from the first
 * frame, so there was no scroll-then-stick moment at all, and the
 * explainer line lost its place under the pill (Anna: "now just the label
 * under the picker is missing and we don’t get the scroll effect of the
 * picker sticking").
 *
 * V6, this one: BOTH sticky, at different offsets. The header is a slim
 * brand+nav bar, sticky at top:0 like every interior page. The switcher
 * band (label above pill) is its own element below, sticky at
 * top:var(--site-header-bottom) — it scrolls with the page and pins when
 * it reaches the header’s bottom edge, tucking in underneath it. The
 * explainer note sits in the intro band just below and scrolls away
 * normally. One layout per element in all states, so nothing flips; the
 * only motion is position, which is the scroll-and-stick Anna asked for
 * with the logo and nav still on screen. --site-header-bottom is already
 * live-published from the header (the mobile nav panel needs it), so the
 * band’s offset tracks the real header height instead of a hardcoded 84px.
 */
export default function PersonaChrome({
  entryPersona,
}: {
  /**
   * Set by an entrance route (/studio) that must render one persona from the
   * first server-rendered paint, before the store has hydrated or been
   * written. Selecting a DIFFERENT persona from such a route navigates to /,
   * so the URL and the visible persona never contradict each other.
   */
  entryPersona?: PersonaId;
} = {}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = entryPersona ?? store;
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    /* The mobile nav panel is fixed-position and drops from below the header,
       so it needs the header’s real bottom edge. The header scrolls with the
       page now (see the V4 note above), so its bottom is the live viewport
       position, not just its height — tracked on scroll as well as resize,
       clamped at zero once the header has left the screen. */
    const publish = () => {
      const bottom = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
      document.documentElement.style.setProperty("--site-header-bottom", bottom + "px");

      /* The bar paints no navy of its own while the persona block is behind
         it (see .home-header-plain): that is what stops "VIEW AS:" being
         sliced as it scrolls up through the bar. Once the block has passed,
         the ground behind the bar is paper and white nav text would be
         unreadable, so the navy comes back. Toggled off the block's real
         bottom edge rather than a guessed scroll distance. */
      const note = document.querySelector(".persona-note");
      const blockGone = note ? note.getBoundingClientRect().bottom <= bottom : false;
      header.classList.toggle("is-solid", blockGone);
    };

    publish();
    window.addEventListener("scroll", publish, { passive: true });
    const ro = new ResizeObserver(publish);
    ro.observe(header);

    return () => {
      window.removeEventListener("scroll", publish);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Slim brand+nav bar, sticky at top:0 via the base .site-header
          rules — the same stickiness interior pages get, minus the
          switcher column (see .home-header-plain). */}
      <header className="site-header home-header home-header-plain" ref={headerRef}>
        <BrandLockup personaOverride={entryPersona} />
        <SiteNav personaOverride={entryPersona} />
      </header>

      {/* V7, and the spec is finally Anna's own words (2026-08-24): "the
          persona picker scrolls with the page until it reaches the top
          navigation, and then ONLY the picker stays. The 'View as' and the
          sub copy roll on past... and that navigation blue bar becomes only
          as high as that content."

          So three siblings, and only the middle one is sticky:
          - .persona-lead   the "View as:" label, navy, ordinary flow. Its
                            bottom padding reserves the navy the pill sits
                            on at rest (the pill's own wrapper is
                            transparent and cannot paint it).
          - .persona-band   ONLY the pill. Transparent, sticky, pulled up
                            into the lead's reserved padding by a negative
                            margin. When it pins under the nav bar, nothing
                            navy travels with it: the pill floats alone,
                            and the only remaining blue is the bar itself.
          - .persona-note   the explainer line, navy, ordinary flow. Rolls
                            past the pinned pill like any other content. */}
      <div className="persona-lead" aria-hidden="true">
        <span className="persona-switch-label">You are?</span>
      </div>
      <div className="persona-band">
        <PersonaSwitch
          label={null}
          entryPersona={entryPersona}
          onSelect={(id) => {
            if (entryPersona && id !== entryPersona) router.push("/");
          }}
        />
      </div>
      <div className="persona-note">
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </>
  );
}
