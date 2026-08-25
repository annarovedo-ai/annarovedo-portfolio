"use client";

import { useLayoutEffect } from "react";
import { setPersona } from "./personaStore";

/**
 * Walking through the /studio door chooses the Client persona.
 *
 * The page itself renders Client from the first server-rendered byte via
 * explicit persona props, so this component is not what makes /studio look
 * right: it is what makes the REST of the site look right afterward. Writing
 * the choice into the store (and so into sessionStorage) means About,
 * Services, Contact and the case studies all stay in Client mode after
 * entering here, for the rest of this visit.
 *
 * useLayoutEffect rather than useEffect so the store is updated before the
 * browser paints the hydrated frame: components that read the store directly
 * never get a painted frame of the Recruiter default.
 *
 * The storage rules from personaStore hold unchanged: as of 2026-08-20
 * Client is session-scoped, same as Ex, so it does not follow a visitor back
 * on a future visit the way it used to. An Ex session in this tab is ended
 * by explicitly walking through the client entrance, which is a selection in
 * its own right.
 */
export default function StudioEntry() {
  useLayoutEffect(() => {
    setPersona("client");
  }, []);
  return null;
}
