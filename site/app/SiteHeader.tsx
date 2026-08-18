import BrandLockup from "./BrandLockup";
import PersonaMenu from "./PersonaMenu";
import SiteNav from "./SiteNav";

/**
 * Internal pages get the quiet "Viewing as" menu rather than the full
 * segmented persona control; see PersonaMenu for the reasoning. The three-way
 * control lives on the entrances (/ and /studio) via PersonaChrome.
 */
export default function SiteHeader() {
  return (
    <header className="site-header home-header is-docked">
      <BrandLockup />

      <div className="home-header-switch">
        <PersonaMenu />
      </div>

      <SiteNav />
    </header>
  );
}
