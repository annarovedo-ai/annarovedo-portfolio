"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import { resumeContent } from "./pageContent";

/**
 * Every persona gets this link; the label changes (Client sees "Services",
 * Recruiter and Ex see "Resume").
 *
 * It used to be Client-only, on the theory that the resume was the least
 * persuasive artifact and hiding it kept recruiters on the case studies.
 * Reversed 2026-08-18, external review: a recruiter actively looks for the
 * resume, and making them hunt through About or the footer creates doubt
 * instead of avoiding it. Validation paths should be boring to find.
 */
export default function ResumeNavLink({
  onNavigate,
  personaOverride,
}: {
  onNavigate?: () => void;
  /** Entrance routes (/studio) force their persona so the server-rendered
      nav already says "Services" rather than waiting for hydration. */
  personaOverride?: PersonaId;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  return (
    <a href="/resume" onClick={onNavigate}>
      {resumeContent[persona].navLabel}
    </a>
  );
}
