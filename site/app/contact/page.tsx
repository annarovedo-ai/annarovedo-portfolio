import type { Metadata } from "next";
import ContactBody from "./ContactBody";

export const metadata: Metadata = {
  title: "Contact · Anna Rovedo",
  description:
    "Get in touch with Anna Rovedo at Paper Pixel about senior individual-contributor design work on complex enterprise products.",
};

export default function Contact() {
  return <ContactBody />;
}
