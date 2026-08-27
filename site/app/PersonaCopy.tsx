"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";

/**
 * The case-study voice layer, below the hero.
 *
 * CaseHero swaps the headline and deck; this swaps any selected line inside
 * the body: an h2, a lead, an outcome frame, a reflection, a CTA eyebrow.
 * The rules are the persona-content architecture's (2026-08-27): the facts,
 * images, chronology, role, and verified outcomes NEVER change by persona,
 * only the editorial argument does. Recruiter is always the full baseline
 * (it is what the server renders and crawlers index); client and ex are
 * optional overrides, and a slot with no override reads the recruiter line.
 *
 * Deliberately text-only: variants live in a colocated *Copy.ts file as
 * strings, so the shared markup cannot fork per persona and the factual
 * spine cannot drift. If a variant ever needs different MARKUP, that is a
 * sign it is trying to change more than the argument.
 */
export type Voiced = {
  recruiter: string;
  client?: string;
  ex?: string;
};

export default function PersonaText({ t }: { t: Voiced }) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{t[persona] ?? t.recruiter}</>;
}
