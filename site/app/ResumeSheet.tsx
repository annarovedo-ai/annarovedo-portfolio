import type { PersonaId } from "./personaStore";
import { resumeContent } from "./pageContent";
import { expertise, experience, earlier, education, defaultProfile } from "./resumeData";

type ResumeSheetProps = {
  persona: PersonaId;
  /**
   * The About page already has its own intro (portrait, headline, a short
   * blurb). Set this to false there so the résumé doesn't repeat itself with
   * a second eyebrow/headline/blurb — it skips straight from a shared
   * contact/download row into Core expertise and Selected experience.
   * Defaults to true for /resume, which has no other intro on the page.
   */
  showIntro?: boolean;
  /**
   * The contact links and download button. On /resume these stay in the
   * masthead. On the About page they're hoisted up into the page's own
   * intro section instead (see AboutBody.tsx), so the download button is
   * visible near the top of the page rather than after the intro copy.
   * Defaults to true.
   */
  showContact?: boolean;
};

/**
 * The full CV block. Masthead, then a short "about me" blurb (the Profile
 * paragraphs), then a two-column layout: Core expertise sits in a left rail
 * alongside the main column, rather than interrupting the read between the
 * blurb and Selected experience. Rendered on /resume for every persona
 * except Client (who gets ServicesBody instead), and embedded on the About
 * page for Recruiter and Ex. Shared here so both places read the same facts.
 */
export default function ResumeSheet({
  persona,
  showIntro = true,
  showContact = true,
}: ResumeSheetProps) {
  const c = resumeContent[persona];

  return (
    <div className="shell cv-sheet">
      {showIntro || showContact ? (
        <header className="cv-masthead">
          {showIntro ? (
            <>
              <p className="eyebrow">{c.eyebrow}</p>
              <h1>{c.headline}</h1>
              {c.intro.map((t) => (
                <p className="cv-title" key={t}>
                  {t}
                </p>
              ))}
            </>
          ) : null}
          {showContact ? (
            <>
              {/* LinkedIn sat here behind an unclaimed vanity URL, removed
                  2026-08-07. The middot went with it: it existed only to
                  separate two items, and one item does not need a separator. */}
              <p className="cv-contact">
                <a href="mailto:anna.rovedo@gmail.com">Email Anna</a>
              </p>
              <a className="cv-download" href="/anna-rovedo-resume.pdf" download>
                Download résumé
              </a>
            </>
          ) : null}
        </header>
      ) : null}

      {showIntro ? (
        <section className="cv-block cv-about">
          <h2 className="cv-rule-label">About</h2>
          {(c.profile ?? defaultProfile).map((p) => (
            <p className="cv-profile" key={p}>
              {p}
            </p>
          ))}
        </section>
      ) : null}

      <div className="cv-body">
        <aside className="cv-rail">
          <h2 className="cv-rule-label">Core expertise</h2>
          <div className="cv-rail-expertise">
            {expertise.map((e) => (
              <div className="cv-expertise-group" key={e.group}>
                <span>{e.group}</span>
                <ul>
                  {e.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="cv-main">
          <section className="cv-block cv-block-first">
            <h2 className="cv-rule-label">Selected experience</h2>
            <ol className="cv-roles">
              {experience.map((r) => (
                <li key={r.client}>
                  <h3>{r.client}</h3>
                  <p className="cv-role-title">{r.role}</p>
                  {r.via ? <p className="cv-role-via">{r.via}</p> : null}
                  <ul>
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section className="cv-block">
            <h2 className="cv-rule-label">Earlier selected experience</h2>
            <div className="cv-earlier">
              {earlier.map((e) => (
                <div key={e.org}>
                  <strong>{e.org}</strong>
                  {e.role ? <span className="cv-earlier-role">{e.role}</span> : null}
                  <p>{e.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-block">
            <h2 className="cv-rule-label">Education</h2>
            <div className="cv-education">
              {education.map((e) => (
                <div key={e.school}>
                  <strong>{e.school}</strong>
                  <p>{e.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
