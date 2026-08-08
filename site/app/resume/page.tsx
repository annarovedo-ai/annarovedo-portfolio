import type { Metadata } from "next";
import ResumeBody from "./ResumeBody";

export const metadata: Metadata = {
  title: "Résumé · Anna Rovedo",
  description:
    "Anna Rovedo, Principal Experience Designer and Product Strategist. More than 20 years shaping enterprise products, AI experiences, search and discovery, and design systems.",
};

export default function Resume() {
  return <ResumeBody />;
}
