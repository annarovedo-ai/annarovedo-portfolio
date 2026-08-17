"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";

/**
 * A one-line aside that only the Ex persona sees.
 *
 * The case-study voice layer originally stopped at the hero, which meant ex
 * mode was one joke followed by two thousand words of recruiter. These are
 * the voice continuing through the body: dry, one sentence, placed where the
 * story can hold an interruption. They render as margin commentary, not as
 * part of the argument, and the other two personas never see them.
 *
 * Rules, same as everywhere: one laugh, understatement over punchline, and
 * the facts are never touched. An aside comments on the story; it never
 * changes it.
 */
export default function ExAside({ children }: { children: string }) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (persona !== "ex") return null;
  return <p className="ex-aside">{children}</p>;
}
