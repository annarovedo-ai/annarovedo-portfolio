import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import WorkBody from "./WorkBody";

/**
 * /work — real page as of 2026-08-20. Used to redirect to /#work back when
 * the homepage carried the full six-case grid directly; now the homepage
 * shows a small preview of the same six and this is where the full write-ups
 * live. See docs/decisions-log.md if that changes again.
 */
export const metadata: Metadata = {
  title: "Work · Anna Rovedo · Paper Pixel",
  description:
    "Six case studies: IBM Chat Concierge, AI-driven journey orchestration, State Street Alpha, Kmart SHHHHH, IBM Global Search, and Nike search research.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Anna Rovedo · Paper Pixel",
    description:
      "Six case studies: IBM Chat Concierge, AI-driven journey orchestration, State Street Alpha, Kmart SHHHHH, IBM Global Search, and Nike search research.",
    url: "/work",
    images: ["/og.png"],
  },
};

export default function Work() {
  return (
    <main>
      <SiteHeader />
      <WorkBody />
      <SiteFooter />
    </main>
  );
}
