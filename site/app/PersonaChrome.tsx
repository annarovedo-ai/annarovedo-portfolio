"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import BrandLockup from "./BrandLockup";
import PersonaSwitch from "./PersonaSwitch";
import SiteNav from "./SiteNav";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import { homeContent } from "./homeContent";

/**
 * ONE SWITCHER. IT SCROLLS, THEN IT STICKS.
 *
 * Every earlier version of this rendered the control TWICE, once in the navy
 * intro band and once in the header, and swapped between them on an
 * IntersectionObserver. That is a teleport, and no amount of tuning fixes a
 * teleport: threshold changes moved when it happened, hiding the other copy
 * stopped it doubling, a Motion layout animation made it flash, and a CSS
 * rise made it a prettier teleport. All of it was treating the symptom.
 *
 * The control is now a single element, wrapped WITH the header in one sticky
 * container. The first version of this fix stuck them separately, the header
 * at top:0 and the switcher at a hardcoded top:84px, which held only while the
 * header rendered at exactly its min-height. It does not always, and when the
 * header is taller the switcher pins behind it and looks like it never stuck.
 * Sticking them as one box removes the measurement, so there is nothing left
 * to drift.
 *
 * The trade is a permanent navy strip under the header. That is the honest
 * cost of "always reachable", and it is the thing Anna asked for.
 */
export default function PersonaChrome() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dockRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dock = dockRef.current;
    const header = headerRef.current;
    if (!dock || !header) return;

    /* .is-scrolled compacts the header below 1140px: the wordmark and credit
       step out, the 30px mark takes over, and the switcher joins the brand row
       instead of stacking under it. The rules for all of that survived the
       rewrite; the code that applied the class did not, so the header had been
       rendering permanently in its tall, unscrolled state at every width. */
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    /* The mobile nav panel is fixed-position and drops from below the dock, so
       it needs the dock's real height rather than a guess. This is the only
       place a header measurement is still needed, and it is observed rather
       than hardcoded so it survives a font swap or a wrapped nav. */
    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-bottom",
        Math.round(dock.getBoundingClientRect().height) + "px",
      );
    };

    onScroll();
    publishHeight();

    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(publishHeight);
    ro.observe(dock);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Must stay a direct child of <main>: nest this and its containing
          block shrinks to the parent, and it stops sticking the moment that
          parent scrolls away. */}
      <div className="persona-dock" ref={dockRef}>
        <header className="site-header home-header" ref={headerRef}>
          <BrandLockup />
          <SiteNav />
        </header>

        <div className="persona-sticky">
          <PersonaSwitch label="I’m a" />
        </div>
      </div>

      <div className="persona-intro">
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </>
  );
}
