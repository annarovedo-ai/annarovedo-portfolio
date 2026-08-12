"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./personaStore";
import type { PersonaId } from "./personaStore";

/**
 * ONE VIDEO PER PERSONA.
 *
 * The recruiter and the ex are not owed the same thirty seconds, so they do
 * not get them. Everything else on this page already switches; the introduction
 * was the last thing still saying the same words to everybody.
 *
 * The client shares the recruiter's cut for now, because it is the one that
 * talks about work rather than about history. Give this map a third entry the
 * day a client-specific take exists.
 *
 * NO CAPTURED POSTER BY DEFAULT. Stills pulled from talking footage catch a
 * face between expressions, which is why the first three attempts were all
 * rejected: it is mechanical, not fussy. Each poster below is a deliberate
 * choice from a full contact sheet, and the credit line is optional because it
 * belongs to a specific piece of footage rather than to the slot.
 */
type Intro = { src: string; poster: string; credit?: string };

const INTRO: Record<PersonaId, Intro> = {
  recruiter: {
    src: "/video-recruiter.mp4",
    poster: "/video-recruiter.webp",
  },
  client: {
    src: "/video-recruiter.mp4",
    poster: "/video-recruiter.webp",
  },
  ex: {
    src: "/video-ex.mp4",
    poster: "/video-ex.webp",
    credit: "Written, filmed and directed by Cary Fukunaga",
  },
};

export default function HeroVideo() {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const intro = INTRO[persona] ?? INTRO.recruiter;

  const video = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Switching persona swaps the file underneath a playing element, so stop
  // first. Otherwise the new clip inherits the old one's playhead and starts
  // mid-sentence with no way back to the cover.
  useEffect(() => {
    setPlaying(false);
    video.current?.pause();
  }, [persona]);

  function start() {
    const el = video.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  }

  return (
    <div className="home-video-block">
      <div className={`home-video${playing ? " is-playing" : ""}`}>
        <video
          key={intro.src}
          ref={video}
          className="home-video-el"
          src={intro.src}
          preload="metadata"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
        />

        {playing ? null : (
          <button className="home-video-cover" type="button" onClick={start}>
            <img
              className="home-video-still"
              src={intro.poster}
              alt=""
              width={720}
              height={900}
            />
            <span className="home-video-cover-inner">
              <span className="home-video-play" aria-hidden="true">
                ▶
              </span>
              <span className="home-video-cover-title">
                Thirty seconds, in my own voice.
              </span>
              <span className="home-video-cover-cta">Play the introduction</span>
            </span>
          </button>
        )}

        {/* The label bar was a caption. It is now the one thing a visitor
            might want after watching thirty seconds of somebody they like:
            a way to talk to the actual person. Sits above the cover so it
            stays clickable whether or not the video is playing. */}
        <a
          className="home-video-label"
          href="https://calendly.com/anna-rovedo/30min"
          target="_blank"
          rel="noreferrer"
        >
          Book a call
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      {/* Outside the frame: .home-video clips its overflow so the poster and
          the video can fill it, and the credit lived at bottom:-30px where it
          was never drawn. */}
      {intro.credit ? (
        <p className="home-video-credit">{intro.credit}</p>
      ) : null}
    </div>
  );
}
