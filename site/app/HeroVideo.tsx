"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";

/**
 * UNUSED — safe to delete. The hero video was first reduced to its poster
 * still, then removed from the homepage entirely (Anna, 2026-08-18: "remove
 * the videos from the website"; then confirmed the still and credit should
 * go too). Nothing imports this component; the matching release test was
 * retired the same day. Kept only because this sandbox cannot delete files.
 * Also deletable from Finder: video-recruiter.mp4, video-recruiter-2.mp4,
 * video-ex.mp4, and the video-*.webp posters in site/public/.
 */
type Intro = { poster: string; alt: string; credit?: string };

const INTRO: Record<PersonaId, Intro> = {
  // The poster is not a grab from footage; it is the frame Anna picked from
  // a full contact sheet.
  recruiter: {
    poster: "/video-recruiter-2.webp",
    alt: "Anna Rovedo",
  },
  client: {
    poster: "/video-recruiter-2.webp",
    alt: "Anna Rovedo",
  },
  ex: {
    poster: "/video-ex.webp",
    alt: "Anna Rovedo",
    credit: "Written, filmed and directed by Cary Fukunaga",
  },
};

export default function HeroVideo() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const intro = INTRO[persona] ?? INTRO.recruiter;
  const poster480 = intro.poster.replace(/\.webp$/, "-480.webp");

  return (
    <div className="home-video-block">
      <div className="home-video">
        <img
          className="home-video-still"
          src={intro.poster}
          srcSet={`${poster480} 480w, ${intro.poster} 720w`}
          sizes="(max-width: 720px) calc(100vw - 36px), 46vw"
          alt={intro.alt}
          width={720}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {intro.credit ? (
        <p className="home-video-credit">{intro.credit}</p>
      ) : null}
    </div>
  );
}
