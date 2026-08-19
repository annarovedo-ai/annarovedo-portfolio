"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import ResumeSheet from "../ResumeSheet";
import ServicesBody from "./ServicesBody";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export default function ResumeBody() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Ex is one page (2026-08-19, Anna's annotations): the homepage carries
  // the whole joke, and the nav leads to the Recruiter content rather than
  // an Ex-voiced parallel universe. The case studies keep their Ex voices;
  // the utility pages do not.
  const persona = store === "ex" ? "recruiter" : store;

  if (persona === "client") {
    return (
      <main>
        <SiteHeader />
        <ServicesBody />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <SiteHeader />

      <article id="top" className="cv">
        <ResumeSheet persona={persona} />

        {/* The résumé used to end with Contact only, which asked for commitment
            before showing any evidence. The work comes first now. */}
        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next</p>
              {/* "any of this" until 2026-08-07. "Any" carried a doubt the
                  sentence did not intend — it read as whether any of the work
                  exists rather than how much of it is written up. "Some" is
                  just a quantifier, and an accurate one: six case studies out
                  of twenty years, with the archive holding the rest. */}
              <h2>See what some of this looked like.</h2>
            </div>
            <a className="next-case-status" href="/#work">
              View the work
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
