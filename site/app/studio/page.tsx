import type { Metadata } from "next";
import SiteFooter from "../SiteFooter";
import PersonaChrome from "../PersonaChrome";
import HomeBody from "../HomeBody";
import StudioEntry from "../StudioEntry";

/**
 * /studio — the permanent, shareable entrance for prospective Paper Pixel
 * clients. One site, two doors: / defaults new visitors to Recruiter, and
 * this route is the same homepage entered as the studio.
 *
 * It renders the existing Client experience, not a copy of it: the same
 * PersonaChrome, HomeBody and SiteFooter as /, each given an explicit
 * entry persona so the server-rendered HTML is Client from the first
 * meaningful paint, with no Recruiter flash before hydration. StudioEntry
 * then writes the choice into the persona store so Client persists across
 * the rest of the site.
 *
 * Choosing a different persona from the switcher here navigates to /, where
 * the selection shows without a URL that contradicts it. A future external
 * Paper Pixel domain can redirect here; that is a DNS decision, not a code
 * one.
 */
export const metadata: Metadata = {
  title: "Paper Pixel · Independent Design Studio led by Anna Rovedo",
  description:
    "Paper Pixel is the independent design studio of Anna Rovedo, working across product direction, complex digital experiences, design systems, brand, campaign, and launch.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Paper Pixel · Independent Design Studio led by Anna Rovedo",
    description:
      "Paper Pixel is the independent design studio of Anna Rovedo, working across product direction, complex digital experiences, design systems, brand, campaign, and launch.",
    url: "/studio",
    images: ["/og.png"],
  },
};

export default function Studio() {
  return (
    <main>
      <StudioEntry />
      <PersonaChrome entryPersona="client" />
      <HomeBody entryPersona="client" />
      <SiteFooter personaOverride="client" />
    </main>
  );
}
