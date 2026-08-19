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
 * ONE SWITCHER, INSIDE THE HEADER, MOVED BY ONE GRID AREA.
 *
 * The history matters, because three different versions of this file were all
 * fixing the wrong thing.
 *
 * V1 rendered the control TWICE, once in the navy intro band and once in the
 * header, and swapped between them on an IntersectionObserver. That is a
 * teleport, and no amount of tuning fixes a teleport: moving the threshold
 * moved when it happened, hiding the other copy stopped it doubling, a Motion
 * layout animation made it flash, and a CSS rise made it a prettier teleport.
 *
 * V2 made it one element and stuck it separately from the header, at a
 * hardcoded top:84px copied from the header's min-height and repeated across
 * three breakpoints. That holds only while the header renders at exactly its
 * minimum, which it does not.
 *
 * V3, this one, puts the switcher INSIDE the header and gives the header a
 * named grid: two rows at rest, one row once scrolled. The control is the same
 * DOM node in both states, carried by the header's own position:sticky, and
 * the only thing that changes is which grid area it occupies. There is no
 * second copy to desync, no observer to mistime, and no measurement to drift.
 *
 * The scrolled state exists because the tall version is an introduction and
 * the short version is a tool. Below the fold, 290px of navy chrome is just
 * page you cannot read.
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

    /* The .is-scrolled rules survived an earlier rewrite; the code that
       applied the class did not, so the header had been rendering permanently
       in its tall state at every width. */
    const onScroll = () => {
      // 8px on desktop: dock almost immediately, since the tall state is an
      // introduction and the short state is a tool. Phones need real intent
      // (2026-08-19, Anna: the pill should stay by its explainer line
      // "until user scrolls and it docks"): at 8px a rubber-band or a
      // thumb-graze collapsed the header at page top, leaving the rest-
      // height spacer as a navy void under the docked row.
      const threshold = window.matchMedia("(max-width: 767px)").matches ? 140 : 8;
      header.classList.toggle("is-scrolled", window.scrollY > threshold);
    };

    /* The mobile nav panel is fixed-position and drops from below the header,
       so it needs the header's real height. Observed rather than hardcoded, so
       it survives a font swap, a wrapped nav, or the row collapsing. */
    const publishHeight = () => {
      const h = Math.round(header.getBoundingClientRect().height);

      /* Drops the mobile nav panel from below the bar at whatever height the
         bar currently is. */
      document.documentElement.style.setProperty("--site-header-bottom", h + "px");

      /* The spacer's height, and therefore the only thing standing between
         the collapse and a 105px lurch. Only measured while the header is at
         rest: read it mid-collapse and the spacer shrinks too, which is the
         jump we are removing. */
      if (!header.classList.contains("is-scrolled")) {
        document.documentElement.style.setProperty("--home-header-rest", h + "px");
      }
    };

    onScroll();
    publishHeight();

    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(publishHeight);
    ro.observe(header);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Holds the bar's resting height open in the document so that when the
          bar collapses over the top of it, nothing below moves. Must stay
          immediately before the header. */}
      <div className="home-header-space" aria-hidden="true" />

      {/* is-home is load-bearing. .home-header is shared with SiteHeader on
          every other page, so the two row layout, the collapse and the fixed
          positioning all have to be scoped or they leak sitewide, and those
          pages have no spacer to hold the space open. */}
      <header className="site-header home-header is-home" ref={headerRef}>
        <BrandLockup personaOverride={entryPersona} />

        {/* Grid area "switcher": row two at rest, centre of row one when
            scrolled. Do not lift this out of the header again. */}
        <div className="persona-sticky">
          <PersonaSwitch
            label="I’m a"
            entryPersona={entryPersona}
            onSelect={(id) => {
              if (entryPersona && id !== entryPersona) router.push("/");
            }}
          />
        </div>

        <SiteNav personaOverride={entryPersona} />
      </header>

      <div className="persona-intro">
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </>
  );
}
