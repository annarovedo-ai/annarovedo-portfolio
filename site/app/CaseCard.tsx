import type { PersonaId } from "./personaStore";
import type { CaseStudy } from "./homeContent";
import { caseFor } from "./homeContent";

/**
 * Full-size case study card, split out of HomeBody.tsx on 2026-08-20 when the
 * homepage stopped showing the six big tiles directly (Anna: "the homepage
 * will just have 6 smaller case studies, not the 6 big tiles"). This is the
 * full-detail version now, used on /work (app/work/WorkBody.tsx); the
 * homepage renders its own smaller tile, defined in HomeBody.tsx, which does
 * not share this markup.
 *
 * No hooks here, so this file carries no "use client" of its own — it is
 * fine to import from either a client or a server component.
 */

export const homeImageVariants: Record<string, string> = {
  "/case-study/concierge/concierge-card-hero.png":
    "/case-study/concierge/concierge-card-hero-480.webp 480w, /case-study/concierge/concierge-card-hero-960.webp 960w, /case-study/concierge/concierge-card-hero-1280.webp 1280w",
  "/case-study/thumbs/journey-orchestration.jpg":
    "/case-study/thumbs/journey-orchestration-480.webp 480w, /case-study/thumbs/journey-orchestration-960.webp 960w, /case-study/thumbs/journey-orchestration-1280.webp 1280w",
  "/case-study/thumbs/state-street.jpg":
    "/case-study/thumbs/state-street-480.webp 480w, /case-study/thumbs/state-street-960.webp 960w, /case-study/thumbs/state-street-1280.webp 1280w",
  "/case-study/search/search-card-hero.png":
    "/case-study/search/search-card-hero-480.webp 480w, /case-study/search/search-card-hero-960.webp 960w, /case-study/search/search-card-hero-1280.webp 1280w",
  "/case-study/kmart/card-cover.png":
    "/case-study/kmart/card-cover-480.webp 480w, /case-study/kmart/card-cover-800.webp 800w",
  "/case-study/nike/hero-w.png":
    "/case-study/nike/hero-w-480.webp 480w, /case-study/nike/hero-w-960.webp 960w, /case-study/nike/hero-w-1280.webp 1280w",
  "/case-study/thumbs/search.jpg":
    "/case-study/thumbs/search-480.webp 480w, /case-study/thumbs/search-960.webp 960w, /case-study/thumbs/search-1280.webp 1280w",
};

export function HomeImage({
  src,
  alt,
  sizes,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  sizes: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <img
      src={src}
      srcSet={homeImageVariants[src]}
      sizes={sizes}
      alt={alt}
      width={1280}
      height={720}
      loading={loading}
      decoding="async"
    />
  );
}

/**
 * Shared card markup for both the flagship pair and the supporting row.
 *
 * The card resolves its own copy rather than receiving it resolved, so every
 * call site stays a one-liner and no caller can forget to switch. caseFor
 * falls back field by field, so a card with no variant for this persona
 * renders exactly what it always did.
 */
export function CaseCard({
  cs,
  persona,
}: {
  cs: CaseStudy;
  persona: PersonaId;
}) {
  const c = caseFor(cs, persona);
  return (
    <a href={c.href} className="home-case">
      {/* Part label lives on the media, so the media span cannot be aria-hidden
          any more. The img keeps alt="" and stays decorative either way. */}
      <span className="home-case-media">
        {c.image ? (
          <HomeImage
            src={c.image}
            alt=""
            sizes="(max-width: 720px) calc(100vw - 36px), (max-width: 1100px) 50vw, 580px"
          />
        ) : null}
      </span>
      <span className="home-case-content">
        <span className="home-case-tags">
          <span className="home-case-tag">{c.tag}</span>
          {c.part ? <span className="home-case-part">{c.part}</span> : null}
        </span>
        <h3>{c.title}</h3>
        <p>{c.body}</p>
        <span className="home-case-cta">View case study &rarr;</span>
      </span>
    </a>
  );
}
