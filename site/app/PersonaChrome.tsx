"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { LayoutGroup, motion } from "motion/react";
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

  // ARRIVE AT THE TOP.
  // The switcher and the line that explains it are the first thing this site
  // says, and on a phone they occupy most of the opening screen. A visitor who
  // lands mid-band sees a stripe of navy and a cut-off control, which is the
  // one place the site cannot afford to look broken. Browsers restore scroll
  // on reload and Chrome sometimes lands short on a soft navigation, so this
  // asserts the top explicitly. Skipped when the URL carries a hash, because
  // then the visitor asked for a specific place on the page.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

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
    <LayoutGroup>
      <header
        className={`site-header home-header${
          switcherDocked ? " is-docked is-scrolled" : ""
        }`}
      >
        <BrandLockup />

        {/* ONE SWITCHER, TWO HOMES, AND IT TRAVELS BETWEEN THEM.
            There has only ever been one of these on screen at a time, but it
            used to CUT between the band and the header, and a cut is what made
            the clipping visible: for the frames around the swap the control
            was half under an opaque header, which reads as broken rather than
            as scrolling. Sharing a layoutId with the copy in the band below
            means Motion measures both boxes and animates the difference, so it
            physically slides up into the header and stops there. Same
            technique the razor uses to morph between its three shapes.

            Out of the hero's context the pills are three unexplained words,
            and anyone arriving on a deep link never sees the hero at all, so
            the docked control keeps a short label. */}
        {switcherDocked ? (
          <div className="home-header-switch">
            <motion.div layoutId="persona-switch" layout="position">
              <PersonaSwitch compact label="I’m a" />
            </motion.div>
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
          {switcherDocked ? null : (
            <motion.div layoutId="persona-switch" layout="position">
              <PersonaSwitch label="I’m a" />
            </motion.div>
          )}
        </div>
        <p className="persona-intro-note">{homeContent[persona].onboardingText}</p>
      </div>
    </LayoutGroup>
  );
}
