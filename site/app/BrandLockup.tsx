"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";

/**
 * The brand lockup, and who it names.
 *
 * WHY THIS IS PERSONA-SWITCHED
 * A recruiter is hiring a person. Leading with a studio wordmark tells them,
 * before anything else on the page, that she already runs something — which
 * reads as "probably not available", and is the opposite of what that visitor
 * came to find out. A client is engaging a studio, so for them the studio name
 * leading is exactly right.
 *
 * The Ex gets both, and that is the joke rather than a compromise. The full
 * lockup is a business card, and handing one to somebody who knew you before
 * you had a company to put on it is the same gag as "I design products,
 * systems, and brands now." It only works because the other two personas do
 * not see it.
 *
 * WHY IT LIVES HERE
 * This markup was duplicated in PersonaChrome (homepage) and SiteHeader (every
 * other page), and had already drifted: PersonaChrome carried the .brand-mark
 * placeholder and SiteHeader did not. Both now render this, as does the footer,
 * so the three places that name her cannot disagree.
 *
 * The footer's existing CSS (.site-footer .brand-divider, .brand-credit) was
 * already written for a full lockup down there, so nothing new was needed to
 * support it.
 */
const lockup: Record<string, { wordmark: string; credit?: string }> = {
  recruiter: { wordmark: "Anna Rovedo" },
  client: { wordmark: "Paper Pixel" },
  ex: { wordmark: "Paper Pixel", credit: "Anna Rovedo" },
};

export default function BrandLockup() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const l = lockup[persona] ?? lockup.recruiter;

  return (
    <a className="brand" href="/" aria-label="Home">
      {/* Placeholder for the logo Anna is making. Only visible at ≤900px once
          the homepage header has docked, where the full lockup stops fitting.
          Swap the span for an <img> when the logo exists; nothing else changes.
          Deliberately still "PP" for every persona: it is the site's mark, not
          a signature, and it is about to become a drawing rather than letters. */}
      <span className="brand-mark" aria-hidden="true">
        PP
      </span>
      <span className="brand-wordmark">{l.wordmark}</span>
      {l.credit ? (
        <>
          <span className="brand-divider">{"//"}</span>
          <span className="brand-credit">{l.credit}</span>
        </>
      ) : null}
    </a>
  );
}
