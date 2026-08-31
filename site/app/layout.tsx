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
        alt: "Anna Rovedo + Paper Pixel. Experience Design.",
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
    <html lang="en" suppressHydrationWarning>
      {/* PERSONA BEFORE PAINT (2026-08-27, Anna: "the internal pages do not
          match the homepage color. apply throughout as a system"). The
          persona color tokens are scoped to html[data-persona], but that
          attribute was only set from PersonaSwitch's mount effect, so every
          full page load painted recruiter navy first and re-colored after
          hydration: instant on the homepage where you just clicked the pill,
          seconds late on a heavy case study, which read as interior pages
          ignoring the scheme. This inline script mirrors personaStore.read()
          (same key, same recruiter default, same try/catch) and runs before
          first paint, so the whole site holds one color from frame one.
          suppressHydrationWarning on <html> is required: the server renders
          no data-persona and this script may add one before React hydrates.
          If the storage key or default ever changes in personaStore.ts, this
          script changes with it. */}
      <body>
        {/* First child of body on purpose: a synchronous script here blocks
            rendering of everything after it, which is exactly the guarantee
            needed, and unlike a child of <html> it is valid HTML that the
            parser will not relocate. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var p=sessionStorage.getItem("pp-persona-session");var t=Number(sessionStorage.getItem("pp-persona-at"));if((p==="client"||p==="ex")&&t&&Date.now()-t<=18e5){sessionStorage.setItem("pp-persona-at",String(Date.now()));document.documentElement.dataset.persona=p}else{sessionStorage.removeItem("pp-persona-session");sessionStorage.removeItem("pp-persona-at")}}catch(e){}',
          }}
        />
        {children}
        {/* Site-wide: it reads whichever section is on screen and offers a
            line about it, on every page rather than just the homepage. */}
        <AnnaRazor />
      </body>
    </html>
  );
}
