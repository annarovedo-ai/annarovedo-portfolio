"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import { resumeContent } from "./pageContent";

/**
 * Only the Client persona gets this in the primary nav, labelled "Services".
 *
 * For a studio, services is a top-level job a visitor came to do. A résumé is
 * not: it is evidence for "who is this", and putting it beside Work invites a
 * recruiter to click the least persuasive artifact on the site. Recruiter and Ex
 * reach the résumé from the About page CTA and from /resume directly.
 */
export default function ResumeNavLink({
  onNavigate,
  primaryNav = false,
}: {
  onNavigate?: () => void;
  /** Set in the header. The footer still lists the résumé for every persona. */
  primaryNav?: boolean;
}) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (primaryNav && persona !== "client") return null;
  return (
    <a href="/resume" onClick={onNavigate}>
      {resumeContent[persona].navLabel}
    </a>
  );
}
