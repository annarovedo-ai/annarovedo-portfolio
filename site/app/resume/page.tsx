import type { Metadata } from "next";
import ResumeBody from "./ResumeBody";

export const metadata: Metadata = {
  title: "Résumé · Anna Rovedo",
  description:
    "Anna Rovedo, Principal Experience Designer and Product Strategist. More than 20 years across enterprise UX, AI, search, brands, campaigns, and design systems.",
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return <ResumeBody />;
}
