import type { Metadata } from "next";
import "./globals.css";
import AnnaRazor from "./AnnaRazor";

export const metadata: Metadata = {
  // Without this, Next resolves the relative /og.png against its development
  // fallback and ships <meta property="og:image" content="http://localhost:3000/og.png">
  // to production. The tag is present, the file exists, and every link preview
  // is still blank, because the URL points at a machine only Anna has. Now
  // that the domain is live it can be stated once here and every page inherits
  // it. Verified in the build output: "localhost:3000" was in the shipped HTML.
  metadataBase: new URL("https://annarovedo.com"),

  // Was the concierge case study’s own title, left behind as the SITE-WIDE
  // default, so every page without its own metadata introduced her as an IBM
  // product rather than as herself. Pages that export their own metadata (the
  // homepage does) still override this.
  title: "Anna Rovedo · Principal Experience Designer",
  // The fallback for any page that does not set its own. Carries the studio
  // name too, since descriptions run to about 155 characters and this one has
  // room where the titles do not.
  description:
    "Anna Rovedo, Principal Experience Designer and founder of Paper Pixel. Digital products, systems, brands, campaigns, and emerging technology.",
  // One SVG rather than a light/dark PNG pair. The vector is exact at 16, 32
  // and 180px where a 32x32 raster is soft on a retina tab and unusable as an
  // apple-touch icon, and it carries its own prefers-color-scheme rule inside
  // the file, so the colour logic lives with the drawing instead of in this
  // metadata block. The PNGs remain in the repo, unreferenced: they were drawn
  // from the earlier version of the mark, and wiring both up would have given
  // the site a different logo depending on the visitor’s colour scheme.
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
      <body>
        {children}
        {/* Site-wide: it reads whichever section is on screen and offers a
            line about it, on every page rather than just the homepage. */}
        <AnnaRazor />
      </body>
    </html>
  );
}
