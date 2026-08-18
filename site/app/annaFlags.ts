/**
 * KILL SWITCH (2026-08-19, Anna: "remove almost anna until we are able to
 * fix it").
 *
 * false = no Almost Anna / Ask Paper Pixel anywhere: no stage on / and
 * /studio, no dock, no mini, no panel. Everything else about the site is
 * untouched, and all the machinery (chatStore, AnnaStage, AnnaRazor, the
 * canned answers, the three suggested-question enforcement layers, the
 * /api/chat route, the release tests over the answer copy) stays intact
 * and tested, so turning it back on is this one line.
 */
export const ALMOST_ANNA_ENABLED = false;
