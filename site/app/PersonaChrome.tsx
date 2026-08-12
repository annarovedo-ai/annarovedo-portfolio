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
    // THE SWITCHER IS NEVER HALF A SWITCHER.
    //
    // Three things had to be true at once, and each earlier attempt fixed one
    // and left the others.
    //
    // 1. WATCH THE SWITCHER, NOT THE BAND. This first observed .persona-intro,
    //    the whole navy block: switcher on top, onboarding line beneath. The
    //    band counts as on screen until its LAST pixel clears the header, so
    //    the switcher slid under while the line below was still visible and
    //    the header had not yet picked it up.
    //
    // 2. FLIP BEFORE IT CLIPS, NOT AFTER IT VANISHES. threshold 0 means "some
    //    part is still visible", so the handoff waited until the pill was
    //    ENTIRELY hidden. Every scroll passed through a stretch where the
    //    control was sliced in half by the header edge: a rounded pill with
    //    its top shaved off, which reads as broken rather than as scrolling.
    //    threshold 1 means "all of it is visible", so the moment the first
    //    pixel would be covered, the header takes over instead.
    //
    // 3. MEASURE THE HEADER, DO NOT GUESS IT. The margin was hardcoded to
    //    68px. The header is 84px tall, and 62px under 720px wide, so the
    //    trigger line sat inside the header at every size and the handoff was
    //    always late. It is measured now, and remeasured on resize.
    //
    // The intro's own copy also hides while docked (see .is-handed-off), so
    // the two can never be on screen together at the instant of handoff.
    const anchor = document.querySelector(".persona-intro-switch");
    if (!anchor) return;

    let io: IntersectionObserver | null = null;

    const build = () => {
      io?.disconnect();
      const header = document.querySelector(".home-header");
      const h = header ? Math.ceil(header.getBoundingClientRect().height) : 84;
      io = new IntersectionObserver(
        ([entry]) => setSwitcherDocked(!entry.isIntersecting),
        { rootMargin: `-${h}px 0px 0px 0px`, threshold: 1 }
      );
      io.observe(anchor);
    };

    build();
    window.addEventListener("resize", build);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", build);
    };
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
      <div className={`persona-intro${switcherDocked ? " is-handed-off" : ""}`}>
        <div className="persona-intro-switch">
          <PersonaSwitch label="I’m a" />
        </div>
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>

    </>
  );
}
