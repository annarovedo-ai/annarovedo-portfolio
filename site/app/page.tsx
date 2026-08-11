import type { Metadata } from "next";
import SiteFooter from "./SiteFooter";
import PersonaChrome from "./PersonaChrome";
import HomeBody from "./HomeBody";

export const metadata: Metadata = {
  title: "Anna Rovedo · Principal Experience Designer",
  description:
    "Anna Rovedo specializes in UX and works across digital products, systems, brands, campaigns, and emerging technology.",
};

export default function Home() {
  return (
    <main>
      <PersonaChrome />
      <HomeBody />
      <SiteFooter />
    </main>
  );
}
