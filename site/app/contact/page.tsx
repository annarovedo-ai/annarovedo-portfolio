import type { Metadata } from "next";
import ContactBody from "./ContactBody";

export const metadata: Metadata = {
  title: "Contact · Anna Rovedo",
  description:
    "Get in touch with Anna Rovedo at Paper Pixel about UX, product, brand, and campaign work.",
};

export default function Contact() {
  return <ContactBody />;
}
