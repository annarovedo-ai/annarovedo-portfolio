import { redirect } from "next/navigation";

/**
 * The "Other work" tier merged into the archive on 2026-08-05 (see
 * decisions-log.md): Bloomberg, Ford, and Sour Patch Kids moved to
 * /archive/[slug], and Nike was promoted to a full case study at /nike.
 * This redirect keeps any existing /work/[slug] links working.
 */
const moved: Record<string, string> = {
  nike: "/nike",
  bloomberg: "/archive/bloomberg",
  ford: "/archive/ford",
  "sour-patch-kids": "/archive/sour-patch-kids",
};

type Params = { slug: string };

export default async function OtherWorkRedirect({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  redirect(moved[slug] ?? "/archive");
}
