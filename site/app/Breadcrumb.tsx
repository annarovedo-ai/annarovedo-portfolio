/**
 * Thin breadcrumb shown at the top of every case study and "not featured"
 * work page, right under the site header. Always points back to the work
 * grid on the homepage rather than browser back, so it works the same way
 * whether someone landed here from the grid, a shared link, or search.
 */
type BreadcrumbProps = {
  /** Current page label, e.g. the case study or project title. */
  label: string;
};

export default function Breadcrumb({ label }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb shell" aria-label="Breadcrumb">
      <a href="/#work">Work</a>
      <span aria-hidden="true">/</span>
      <span className="breadcrumb-current">{label}</span>
    </nav>
  );
}
