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
 * hardcoded top:84px copied from the header's min-height. That holds only
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
 * under the picker is missing and we don't get the scroll effect of the
 * picker sticking").
 *
 * V6, this one: BOTH sticky, at different offsets. The header is a slim
 * brand+nav bar, sticky at top:0 like every interior page. The switcher
 * band (label above pill) is its own element below, sticky at
 * top:var(--site-header-bottom) — it scrolls with the page and pins when
 * it reaches the header's bottom edge, tucking in underneath it. The
 * explainer note sits in the intro band just below and scrolls away
 * normally. One layout per element in all states, so nothing flips; the
 * only motion is position, which is the scroll-and-stick Anna asked for
 * with the logo and nav still on screen. --site-header-bottom is already
 * live-published from the header (the mobile nav panel needs it), so the
 * band's offset tracks the real header height instead of a hardcoded 84px.
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
       so it needs the header's real bottom edge. The header scrolls with the
       page now (see the V4 note above), so its bottom is the live viewport
       position, not just its height — tracked on scroll as well as resize,
       clamped at zero once the header has left the screen. */
    const publish = () => {
      const bottom = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
      document.documentElement.style.setProperty("--site-header-bottom", bottom + "px");
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

      {/* The picker band: scrolls with the page, pins under the header
          when it gets there (V6 note above). Full-size switch, label
          above — the rest-state presentation, kept identical while
          pinned so there is no state flip. */}
      <div className="persona-band">
        <PersonaSwitch
          label="View as:"
          entryPersona={entryPersona}
          onSelect={(id) => {
            if (entryPersona && id !== entryPersona) router.push("/");
          }}
        />
      </div>

      <div className="persona-intro">
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </>
  );
}
