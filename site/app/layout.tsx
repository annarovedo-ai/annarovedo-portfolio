import type { Metadata } from "next";
import "./globals.css";
import AnnaRazor from "./AnnaRazor";

export const metadata: Metadata = {
  // Was "IBM MaaS360 Chat Concierge · Anna Rovedo" — the concierge case
  // study's title, left behind as the SITE-WIDE default, so every page
  // without its own metadata introduced her as an IBM product. Pages that
  // export their own metadata (the homepage does) still override this.
  title: "Anna Rovedo · Principal Experience Designer",
  description:
    "Anna Rovedo is a Principal Experience Designer working across digital products, systems, brands, campaigns, and emerging technology.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Paper Pixel: From idea to market. Brand. Product. Campaign.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
