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
 * Sixty frames were reviewed at half-second intervals. 30.0s is the chosen
 * one and it is the last frame of the clip, which is not a coincidence: the
 * speaker has stopped talking and the face has settled. If a proper portrait
 * turns up later it drops straight into this <img> and nothing else changes.
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
          {/* The still is the frame at 30.0s, the last of the clip: the only
              one where the eyes are open, the mouth is closed and the
              expression has settled. Every other frame is mid-speech, which is
              why they read as unflattering. Decorative here, because the
              button's own text says what pressing it does. */}
          <img
            className="home-video-still"
            src="/meet-anna-poster.webp"
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

      <span className="home-video-label">Meet actual Anna</span>
    </div>
  );
}
