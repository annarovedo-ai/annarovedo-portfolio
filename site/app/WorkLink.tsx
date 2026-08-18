"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";

/**
 * The one Work link that knows which door the visitor came through.
 *
 * A Client's work grid lives on /studio#client-work; everyone else's lives on
 * /#work. This exists so the breadcrumb (a server component) and anything
 * else that links "back to the work" resolve that question in one place
 * instead of each inferring route state on their own.
 *
 * Server-rendered output is the Recruiter default, same as every other
 * store-reading component; a persisted Client gets the studio href on
 * hydration. Entrance routes that must be right in SSR pass personaOverride.
 */
export default function WorkLink({
  personaOverride,
  className,
  children = "Work",
}: {
  personaOverride?: PersonaId;
  className?: string;
  children?: React.ReactNode;
}) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const persona = personaOverride ?? store;
  const href = persona === "client" ? "/studio#client-work" : "/#work";
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
