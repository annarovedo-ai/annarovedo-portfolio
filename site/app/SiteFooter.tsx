"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";
import BrandLockup from "./BrandLockup";
import ResumeNavLink from "./ResumeNavLink";

/**
 * Studio description, per Anna's About designs.
 *
 * None of these open with a name any more. The wordmark sits directly above
 * this paragraph and the copyright sits directly below it, so "Anna Rovedo is
 * a..." and "Paper Pixel is an..." were each repeating, in a sentence, the
 * thing the reader had just read in display type an inch higher. Between the
 * header lockup, the footer wordmark, the bio and the copyright, the same two
 * names appeared five times in one viewport.
 *
 * The Ex version already did this correctly and is unchanged.
 */
const bio: Record<string, string> = {
  recruiter:
    "Principal Experience Designer, working across complex products, emerging technology, and future vision.",
  // "helping ambitious teams" was flattery in a sentence that did not need
  // it. The claim is what the studio does, not who deserves it.
  client:
    "Paper Pixel is the independent design studio of Anna Rovedo. It turns complicated ideas into products, experiences, and systems people can understand and use.",
  // First person, no surname: the Ex persona is someone who already knows her.
  ex: "I work on complex products, future vision, and emerging technology. Independently, which is either personal growth or exactly what you predicted.",
};

export default function SiteFooter({
  personaOverride,
}: {
  /** See /studio: forces the footer's voice for entrance routes. */
  personaOverride?: PersonaId;
} = {}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;

  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div className="site-footer-brand">
          {/* Shared with both headers, so the name a visitor is given at the
              top of the page is the one that signs it at the bottom. */}
          <BrandLockup personaOverride={personaOverride} />
          <p>{bio[persona]}</p>
        </div>

        <div className="site-footer-cols">
          <div>
            <p className="eyebrow">Navigation</p>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <ResumeNavLink personaOverride={personaOverride} />
              </li>
              <li>
                <a href="/archive">Earlier work</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          {/* The Social column held exactly one link, to
              linkedin.com/in/anna-paperpixel, and that vanity URL is not
              claimed yet, so it was a broken link in the footer of every page
              on the site. Removed 2026-08-07 rather than left pointing at a
              404, since a dead social link on a portfolio costs more than a
              missing one. Restore the column, not just the link, once the URL
              resolves: a heading with nothing under it is worse than neither. */}
        </div>
      </div>


      {/* The copyright band lived here and was removed 2026-08-07.
          It said "© 2026 Paper Pixel", one line under a wordmark already
          reading Paper Pixel, which made the name's third appearance in a
          single viewport counting the header lockup.

          It also was not doing anything. Copyright is automatic on creation
          under the Berne Convention; the notice has not been required
          anywhere since 1989 and confers nothing on a portfolio site. What it
          does do is carry a hardcoded year that silently goes stale, so from
          next January the site would have advertised its own neglect at the
          bottom of every page.

          If it ever comes back it should be generated, not typed. */}
    </footer>
  );
}
