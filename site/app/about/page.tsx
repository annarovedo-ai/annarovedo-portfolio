import type { Metadata } from "next";
import AboutBody from "./AboutBody";

export const metadata: Metadata = {
  title: "About · Anna Rovedo",
  description:
    "Anna Rovedo is a Principal Experience Designer and founder of Paper Pixel, with 20+ years across UX, products, brands, campaigns, fashion, advertising, and AI.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutBody />;
}
