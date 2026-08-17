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
/**
 * The mark follows the wordmark. It used to be "PP" for everyone, on the
 * reasoning that it is the site's mark rather than a signature. That is wrong
 * for the recruiter: their whole version of this site is a person, the
 * wordmark says Anna Rovedo, and a studio monogram in the corner introduces a
 * company they did not come here to hire. A mark that disagrees with the name
 * beside it is not a mark, it is a second brand.
 */
const lockup: Record<string, { wordmark: string; mark: string; credit?: string }> = {
  recruiter: { wordmark: "Anna Rovedo", mark: "AR" },
  client: { wordmark: "Paper Pixel", mark: "PP" },
  ex: { wordmark: "Paper Pixel", mark: "PP", credit: "Anna Rovedo" },
};

export default function BrandLockup() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const l = lockup[persona] ?? lockup.recruiter;

  // No aria-label on the link. It said "Home", which replaced the visible
  // name for assistive tech: a screen reader announced "Home" where the
  // screen said Anna Rovedo or Paper Pixel, and a voice-control user saying
  // "click Anna Rovedo" got nothing. The link text itself is the right name.
  return (
    <span className="brand">
      <a className="brand-home" href="/">
      {/* THE MARK SITS IN FRONT OF THE WORDMARK, wherever the wordmark reads
          Paper Pixel. Client and Ex only: the Recruiter's version of this site
          is a person, and a studio logo beside her name introduces a company
          they did not come here to hire, which is the same reasoning that made
          the wordmark persona-specific in the first place.

          Inline rather than an <img> so it inherits colour: white against the
          navy header, ink in the footer, from one file. /favicon.svg cannot
          inherit anything, so it carries its own fill and its own dark-mode
          rule instead. */}
      {persona === "recruiter" ? null : (
        <span className="brand-logo" aria-hidden="true">
          {/* Anna's drawing, 13 August. Built entirely from outline, which is
              why it is identical white on navy and ink on paper: an earlier
              version put a solid dog-ear in the corner, and a mass reads as a
              folded flap on paper and as a hole punched through the sheet when
              it inverts. The corner still reads as turned because the stair
              describes its edge rather than filling it.

              fill lives on the <svg> as currentColor, not on the rects as
              black, so one file serves the navy header and the paper footer. */}
          <svg viewBox="0 0 23 28" fill="currentColor" aria-hidden="true">
            <rect x="1" width="22" height="2" />
            <rect y="28" width="28" height="2" transform="rotate(-90 0 28)" />
            <rect x="21" y="20" width="20" height="2" transform="rotate(-90 21 20)" />
            <rect x="1" y="26" width="16" height="2" />
            <rect x="13" y="28" width="8" height="2" transform="rotate(-90 13 28)" />
            <rect x="23" y="20" width="8" height="2" transform="rotate(180 23 20)" />
            <rect x="21" y="20" width="2" height="2" />
            <rect x="19" y="22" width="2" height="2" />
            <rect x="17" y="24" width="2" height="2" />
            <rect x="10" y="9" width="3" height="3" />
          </svg>
        </span>
      )}

      {/* Initials, and only for the Recruiter now: the fallback for ≤900px
          once the header collapses and the full lockup stops fitting. Client
          and Ex keep the logo above, which does that job for them. */}
      {persona === "recruiter" ? (
        <span className="brand-mark" aria-hidden="true">
          {l.mark}
        </span>
      ) : null}

      {/* THE PERSON AND THE STUDIO ARE SET DIFFERENTLY, ON PURPOSE.
          Anna Rovedo stays a serif italic: a signature, a person. Paper Pixel
          takes the sans, because the mark beside it is flat-weight, upright and
          on a grid, and Newsreader italic has stress, contrast and a slant.
          Set together they read as two objects that arrived separately.
          It is the same reasoning that already makes the Recruiter's monogram
          initials rather than a logo, carried into the type. */}
      <span
        className={
          persona === "recruiter" ? "brand-wordmark" : "brand-wordmark is-studio"
        }
      >
        {l.wordmark}
      </span>
      </a>
      {/* The credit sits OUTSIDE the link. It is an attribution, not a
          destination: someone who clicks a person's name expects to land
          somewhere about that person, and this went to the homepage. The
          studio name is the home button; the signature beside it is just a
          signature. */}
      {l.credit ? (
        <>
          <span className="brand-divider">{"//"}</span>
          <span className="brand-credit">{l.credit}</span>
        </>
      ) : null}
    </span>
  );
}
