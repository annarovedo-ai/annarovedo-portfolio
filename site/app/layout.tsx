import type { Metadata } from "next";
import "./globals.css";
import AnnaRazor from "./AnnaRazor";

export const metadata: Metadata = {
  title: "IBM MaaS360 Chat Concierge · Anna Rovedo",
  description:
    "How Anna Rovedo designed and validated an AI concierge for the enterprise buying journey on IBM.com.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Site-wide: it reads whichever section is on screen and offers a
            line about it, on every page rather than just the homepage. */}
        <AnnaRazor />
      </body>
    </html>
  );
}
