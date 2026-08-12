"use client";

import { useSyncExternalStore } from "react";
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
 * The control is now a single element that is a direct child of <main>, so
 * its containing block is the whole page and `position: sticky` works the way
 * it reads: it scrolls up with the page, meets the header, and pins there for
 * good. The browser does the movement, which is why it is smooth. There is no
 * observer, no docked state, no second copy, and nothing to get out of sync.
 *
 * The trade is a permanent navy strip under the header. That is the honest
 * cost of "always reachable", and it is the thing Anna asked for.
 */
export default function PersonaChrome() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      <header className="site-header home-header">
        <BrandLockup />
        <SiteNav />
      </header>

      {/* Sticky. Must stay a direct child of <main>: nest it and its
          containing block shrinks to the parent, and it stops sticking the
          moment that parent scrolls away. */}
      <div className="persona-sticky">
        <PersonaSwitch label="I’m a" />
      </div>

      <div className="persona-intro">
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </>
  );
}
