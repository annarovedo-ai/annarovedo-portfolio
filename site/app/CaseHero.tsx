"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";

export type HeroVoice = {
  h1: string;
  deck: string;
};

/**
 * The case-study hero, in the visitor’s persona.
 *
 * Case studies were the last pages on the site that read identically for all
 * three personas: an Ex visitor got the same recruiter-grade headline as a
 * hiring manager. This swaps the voice layer only, the headline and the deck.
 * Everything below the hero, the work, the figures, the evidence, stays
 * identical for everyone, because the work is not a bit.
 *
 * Server-rendered output is the recruiter version (the store’s server
 * snapshot), which is also what crawlers index; the client swaps on mount the
 * same way the rest of the site does.
 */
export default function CaseHero({
  voices,
}: {
  voices: Record<PersonaId, HeroVoice>;
}) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const v = voices[persona] ?? voices.recruiter;
  return (
    <>
      <h1>{v.h1}</h1>
      <p className="hero-deck">{v.deck}</p>
    </>
  );
}
