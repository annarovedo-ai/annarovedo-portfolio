import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import Breadcrumb from "../../Breadcrumb";
import { archiveGroups, findArchiveEntry } from "../archiveContent";

const assetRoot = "/archive";

type Params = { slug: string };

export function generateStaticParams() {
  // Entries that link straight to a full case study (like Kmart) don't get
  // their own /archive/[slug] page — the href already points elsewhere.
  return archiveGroups
    .flatMap((g) => g.entries)
    .filter((e) => !e.href)
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findArchiveEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.client} · Anna Rovedo`,
    description: entry.body,
  };
}

export default async function ArchiveEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = findArchiveEntry(slug);
  if (!entry || entry.href) notFound();

  return (
    <main>
      <SiteHeader />
      <Breadcrumb label={entry.client} />

      <article className="archive-detail shell">
        <p className="archive-meta">{entry.meta}</p>
        <h1>{entry.client}</h1>
        <p className="archive-detail-body">{entry.body}</p>
        {entry.role ? (
          <p className="archive-role">
            <span>Role</span>
            {entry.role}
          </p>
        ) : null}

        {entry.video ? (
          <div className="archive-detail-video">
            <iframe
              src={`https://player.vimeo.com/video/${entry.video.vimeoId}`}
              title={entry.video.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : null}

        {entry.images && entry.images.length > 0 ? (
          <div className="archive-detail-images">
            {entry.images.map((im) => (
              <figure key={im.src}>
                <img src={`${assetRoot}/${im.src}`} alt={im.alt} loading="lazy" />
                <figcaption>{im.alt}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {/* There used to be an apology here: "No images extracted for this one
            yet. Ask me directly and I'll tell you more." Two problems. It leaked
            build-process vocabulary to visitors, since nothing is "extracted"
            from a reader's point of view. And it invited doubt about the work on
            the one page whose job is to show it, which is the standing voice
            rule. An entry without images now simply reads as a written entry,
            and the writing carries it. */}

        <a className="archive-link" href="/archive">
          &larr; Back to the archive
        </a>
      </article>

      <SiteFooter />
    </main>
  );
}
