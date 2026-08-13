import type { Metadata } from "next";
import SiteFooter from "./SiteFooter";
import PersonaChrome from "./PersonaChrome";
import HomeBody from "./HomeBody";

export const metadata: Metadata = {
  // Paper Pixel appeared in no title and no description anywhere on the site,
  // so anyone who heard the studio name and searched for it did not find this.
  // Added here rather than sitewide: Google truncates titles around 55 to 60
  // characters, this one lands at 57, and the case-study titles are already
  // over 70 and being cut off. The homepage is also the page that ranks for a
  // name search, so it is where the studio name does the work.
  //
  // Note that a title cannot switch by persona, since it is rendered on the
  // server before a persona exists. Recruiters see the studio name too. That
  // is a deliberate trade: being findable by the name clients engage is worth
  // more than keeping the studio out of one persona's browser tab.
  title: "Anna Rovedo · Principal Experience Designer · Paper Pixel",
  description:
    "Anna Rovedo, Principal Experience Designer and founder of Paper Pixel. UX, AI experiences, search and discovery, design systems, brand and campaign work.",
  alternates: { canonical: "/" },
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
