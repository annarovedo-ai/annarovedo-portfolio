import BrandLockup from "./BrandLockup";
import PersonaSwitch from "./PersonaSwitch";
import SiteNav from "./SiteNav";

export default function SiteHeader() {
  return (
    <header className="site-header home-header is-docked">
      <BrandLockup />

      <div className="home-header-switch">
        <PersonaSwitch compact label="I’m a" />
      </div>

      <SiteNav />
    </header>
  );
}
