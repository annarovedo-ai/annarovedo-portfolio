"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ResumeNavLink from "./ResumeNavLink";
import WorkLink from "./WorkLink";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";

/**
 * Primary navigation, shared by both headers.
 *
 * Above the mobile breakpoint this renders as a plain inline row and the toggle
 * is hidden by CSS. Below it, the links collapse behind a hamburger and open as
 * a panel under the header. The links are always in the DOM so nothing changes
 * for crawlers or for anyone with CSS disabled.
 */
export default function SiteNav({
  personaOverride,
}: {
  /** Entrance routes (/studio) force their persona; see PersonaChrome. */
  personaOverride?: PersonaId;
} = {}) {
  const [open, setOpen] = useState(false);
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Still resolved for ResumeNavLink below, which does vary by persona
  // (Resume vs. Services). Work itself no longer does: see WorkLink.
  const persona = personaOverride ?? store;
  const wrap = useRef<HTMLDivElement | null>(null);

  // Close on Escape, on outside click, and whenever the viewport grows past the
  // breakpoint, so the panel can never be left open on a desktop layout.
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    const wide = window.matchMedia("(min-width: 721px)");
    function onWide(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div className={`site-nav${open ? " is-open" : ""}`} ref={wrap}>
      <button
        type="button"
        className="site-nav-toggle"
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav id="primary-navigation" aria-label="Primary navigation">
        {/* Points at the case study grid rather than "/", so it does something
            the wordmark does not already do. The work is the primary content of
            the site and until now had no entry in the nav at all. */}
        <WorkLink onClick={() => setOpen(false)}>Work</WorkLink>
        {/* About left the nav 2026-08-20 (Anna: "put this on the home page
            and remove the about tab") — the page’s two strongest sections,
            What I Bring and Why The Range Matters, now render directly on
            the homepage for every persona (see HomeBody.tsx), so the tab was
            pointing at content that had moved. /about itself still exists
            and is not deleted, same treatment as /this-site: reachable, not
            promoted. This is the third time About’s nav presence has
            flipped this project (removed for merge experiment 2026-08-19,
            restored the same day, removed again here) — check
            docs/decisions-log.md before flipping it a fourth time. */}
        <ResumeNavLink
          personaOverride={personaOverride}
          onNavigate={() => setOpen(false)}
        />
        <a href="/contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </nav>
    </div>
  );
}
