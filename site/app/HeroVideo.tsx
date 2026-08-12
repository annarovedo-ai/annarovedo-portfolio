"use client";

import { useRef, useState } from "react";

/**
 * NO FREEZE FRAME.
 *
 * A poster pulled from the clip was tried and rejected, and the reason is
 * mechanical rather than fussy: the whole thirty seconds is speech, so every
 * frame catches a face between expressions, mouth open or eyes half closed.
 * Sampling harder does not fix that, it just costs more time to arrive at the
 * same answer.
 *
 * So the resting state is designed instead of captured. A navy panel in the
 * site's own type, with the one control it needs. It cannot be unflattering,
 * it is sharp at any density because it is text rather than a 720px still,
 * and it reads as deliberate, which a bad still never does.
 *
 * If a portrait Anna likes turns up later, this becomes an <img> behind the
 * same button and nothing else changes.
 */
export default function HeroVideo() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function start() {
    const el = video.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  }

  return (
    <div className={`home-video${playing ? " is-playing" : ""}`}>
      <video
        ref={video}
        className="home-video-el"
        src="/meet-anna.mp4"
        preload="metadata"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
      />

      {playing ? null : (
        <button className="home-video-cover" type="button" onClick={start}>
          <span className="home-video-play" aria-hidden="true">
            ▶
          </span>
          <span className="home-video-cover-title">
            Thirty seconds, in my own voice.
          </span>
          <span className="home-video-cover-cta">Play the introduction</span>
        </button>
      )}

      <span className="home-video-label">Meet actual Anna</span>
    </div>
  );
}
