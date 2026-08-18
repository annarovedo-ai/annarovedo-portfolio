/**
 * Thin breadcrumb shown at the top of every case study and "not featured"
 * work page, right under the site header. Always points back to the work
 * grid on the homepage rather than browser back, so it works the same way
 * whether someone landed here from the grid, a shared link, or search.
 *
 * `meta` was added 2026-08-08. Every case study used to carry a breadcrumb AND
 * a hero eyebrow directly beneath it, both uppercase, both tracked, both the
 * same size, separated by a large gap. They read as two breadcrumbs. On State
 * Street and Nike the eyebrow repeated the breadcrumb's own label word for
 * word, and on Search the status it carried appeared a third time in the hero
 * meta below. One line now: navigation on the left, the status or structural
 * note on the right, visually distinct so they do not read as the same thing.
 */
import WorkLink from "./WorkLink";

type BreadcrumbProps = {
  /** Current page label, e.g. the case study or project title. */
  label: string;
  /**
   * Optional status or structural note, e.g. "Part one of two" or
   * "Live and evolving". Only pass what the h1, deck and hero meta below do
   * not already say.
   */
  meta?: string;
};

export default function Breadcrumb({ label, meta }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb shell" aria-label="Breadcrumb">
      <WorkLink />
      <span aria-hidden="true">/</span>
      <span className="breadcrumb-current">{label}</span>
      {meta ? <span className="breadcrumb-meta">{meta}</span> : null}
    </nav>
  );
}
