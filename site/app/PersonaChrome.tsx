"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import BrandLockup from "./BrandLockup";
import PersonaSwitch from "./PersonaSwitch";
import SiteNav from "./SiteNav";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import { homeContent } from "./homeContent";

export default function PersonaChrome() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // switcherDocked watches the thin .persona-intro bar and drives the header's
  // scrolled treatment: navy-vs-floating background, swapping the lockup for
  // the mark once there is no room for it, and handing the persona switcher
  // off between the intro band (undocked) and the header (docked) so it is
  // never on screen twice and never more than a scroll away.
  // The chat's own docking moved into AnnaRazor, which now mounts from the
  // root layout so it follows the reader onto every page.
  const [switcherDocked, setSwitcherDocked] = useState(false);

  useEffect(() => {
    const intro = document.querySelector(".persona-intro");
    if (!intro) return;

    const introIo = new IntersectionObserver(
      ([entry]) => setSwitcherDocked(!entry.isIntersecting),
      { rootMargin: "-68px 0px 0px 0px", threshold: 0 }
    );
    introIo.observe(intro);
    return () => introIo.disconnect();
  }, []);

  return (
    <>
      <header
        className={`site-header home-header${
          switcherDocked ? " is-docked is-scrolled" : ""
        }`}
      >
        <BrandLockup />

        {/* Only present once the header docks. Undocked, the switcher lives
            below with the onboarding line; showing both at once would be two
            copies of the same control on screen together. */}
        {switcherDocked ? (
          <div className="home-header-switch">
            {/* Out of the hero's context the pills are three unexplained words,
                and anyone arriving on a deep link never sees the hero at all, so
                the docked control has to say what it is. Kept short because it
                shares a row with the mark and the menu. */}
            <PersonaSwitch compact label="I’m a" />
          </div>
        ) : null}

        <SiteNav />
      </header>

      {/* Locked up with the onboarding line: the switcher sits directly above
          it, both centered, so they read as one block rather than two
          separate controls. Once this band scrolls out of view the header
          picks the switcher back up (see switcherDocked above), so it is
          never more than a scroll away. */}
      <div className="persona-intro">
        <div className="persona-intro-switch">
          <PersonaSwitch label="I’m a" />
        </div>
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>

    </>
  );
}
