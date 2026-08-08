import type { Metadata } from "next";
import SiteFooter from "./SiteFooter";
import PersonaChrome from "./PersonaChrome";
import HomeBody from "./HomeBody";

export const metadata: Metadata = {
  title: "Anna Rovedo · Principal Experience Designer",
  description:
    "Anna Rovedo designs complex enterprise systems and makes them understandable. 20+ years across AI, search, design systems, and information architecture.",
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
