import BrandLockup from "./BrandLockup";
import PersonaSwitch from "./PersonaSwitch";
import SiteNav from "./SiteNav";

/**
 * The full segmented persona control, on every page. A quieter "Viewing as"
 * menu (PersonaMenu) was tried here 2026-08-18 per an external review and
 * reverted the same day at Anna’s call: the segmented control is part of the
 * site’s personality, not interface weight.
 */
export default function SiteHeader() {
  return (
    <header className="site-header home-header is-docked">
      <BrandLockup />

      <div className="home-header-switch">
        <PersonaSwitch compact label="You are?" />
      </div>

      <SiteNav />
    </header>
  );
}
