import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Breadcrumb from "../Breadcrumb";
import CaseHero from "../CaseHero";
import { caseVoices } from "../caseVoices";
import ExAside from "../ExAside";

export const metadata: Metadata = {
  title: "SHHHHH · Anna Rovedo",
  description:
    "A new business pitch to launch Kmart's redesigned clothing lines. Written and art directed over a four day creative sprint at DraftFCB Chicago in 2010.",
  alternates: { canonical: "/kmart" },
};

const assetRoot = "/case-study/kmart";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

function Figure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={`figure ${className}`}>
      <div className="figure-image-wrap">
        <img src={`${assetRoot}/${src}`} alt={alt} loading="lazy" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Every surface the one device had to survive. */
const surfaces = [
  {
    title: "The bag",
    body: "Pink, with the Kmart logo covered by tape reading SHHH.COM. The idea compressed into one object you carry out of the store.",
  },
  {
    title: "The K",
    body: "The Kmart mark rebuilt out of duct tape, so the brand itself carries the device rather than sitting next to it.",
  },
  {
    title: "Hangtags",
    body: "Tape over the label, peeling off to reveal the Kmart logo underneath. The reveal happens in your hands.",
  },
  {
    title: "Print",
    body: "The Keep Your Secret ads, placed in the aspirational fashion titles where Kmart had no business being.",
  },
  {
    title: "The site",
    body: "A password, then a members' homepage: look of the day, exclusives, video, and the other people who were in on it.",
  },
  {
    title: "Popup stores",
    body: "Unbranded shops in major cities, stocked entirely with the new lines. Every label taped over. See below.",
  },
];

export default function Kmart() {
  return (
    <main>
      <SiteHeader />
      <Breadcrumb label="SHHHHH" meta="DraftFCB Chicago, 2010 · New business pitch" />

      <article id="top">
        <section className="hero shell">
          <CaseHero voices={caseVoices.kmart} />

          <div className="hero-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>Art director and designer</strong>
            </div>
            <div>
              <span>Format</span>
              <strong>Four day creative sprint, global agency team</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>New business pitch</strong>
            </div>
          </div>

          {/* Moved up from the identity artifacts 2026-08-18, external
              review: a visual campaign story was making the visitor read four
              sections before seeing any of the work. One arresting object
              directly after the deck carries the whole idea; the rest of the
              artifacts stay downstream where the story earns them. */}
          <Figure
            src="bag.jpg"
            alt="A pink Kmart shopping bag with the logo covered by a strip of duct tape reading SHHH, with .com beneath it."
            caption="The campaign in one object: the logo covered, the site named."
          />
        </section>

        <section className="summary-band" id="brief" data-anna-prompt="What was the real problem?">
          <div className="shell summary-grid">
            <div className="summary-copy">
              <p className="eyebrow">The brief</p>
              <h2>The product was not the problem. Reappraisal was.</h2>
              <p>
                Target had spent years and a lot of money on its design department, and it
                had worked. People went to Target on purpose, for the design, and said so
                afterwards.
              </p>
              <p>
                Kmart was trying to do the same thing, and this part was real. They had
                hired a team of fashion designers, put them in a studio in New York, and
                were relaunching the clothing as something worth choosing rather than
                something that happened to be on the shelf.
              </p>
              <p>
                None of it was public yet. The designers were hired and the studio was
                working, but the lines had not launched. The work up for grabs was the
                campaign that would introduce them, and several agencies were pitching for
                it. Which is worth sitting with for a second, because it means we were
                building a campaign about a secret for a product that still was one.
              </p>
            </div>

            <ol className="summary-list" aria-label="The problem in four parts">
              <li>
                <span>01</span>
                <strong>Most people did not know Kmart sold clothes.</strong>
                Clothing was something shoppers discovered after they were already in the
                store, not a category they associated with Kmart or sought out on purpose.
              </li>
              <li>
                <span>02</span>
                <strong>Nobody knew the clothing had been overhauled.</strong>
                Kmart had built a New York design studio and hired an in-house fashion team,
                but customers had no reason to know that anything behind the clothes had
                changed.
              </li>
              <li>
                <span>03</span>
                <strong>The people who did buy them bought for utility.</strong>
                The clothes were affordable, convenient, and already in front of them. They
                were not buying because they saw Kmart as a source of considered design.
              </li>
              <li>
                <span>04</span>
                <strong>The ones who did buy would not say so.</strong>
                Admitting where the clothes came from carried a cost, and no amount of
                advertising was going to argue somebody out of that.
              </li>
            </ol>
          </div>
        </section>

        <section className="chapter shell" id="room" data-anna-prompt="What can four days produce?">
          <p className="section-number">01</p>
          <div className="two-column-copy">
            <div>
              <h2>Fifteen people, four countries, four days.</h2>
            </div>
            <div>
              <p className="lead">
                DraftFCB flew in writers, designers, art directors and creative directors
                from offices across its global network. Italy, France, Argentina, Germany.
                About fifteen people in the Chicago office over a long weekend, starting
                Thursday and pitching Monday night.
              </p>
              <p>
                We were split into three groups of three or four, each taking the same brief
                from a different angle. It was not a competition between us. Creative
                directors moved between the teams, and their job was less to judge than to
                keep the three stories from converging. On the last day we workshopped all
                three together and sharpened them into what got presented.
              </p>
              <p>
                I was brought in for my fashion background. I had spent years designing
                apparel graphics, hangtags and labels in Italy and Spain, and I knew that
                market, including how it worked in Europe. That was the reason I was in the
                room.
              </p>
              <p>
                The format was closer to how I like to work than anything I have done since.
                Brainstorm as a group, break apart, build, come back, critique, break apart
                again. Someone ordered Chinese food. It ran for four days and I have rarely
                enjoyed work more.
              </p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" id="idea" data-anna-prompt="Why make it a secret?" data-anna-prompt-ex="Did I get a nickname in the group chat?">
          <div className="shell">
            <p className="section-number">02</p>
            <div className="two-column-copy">
              <div>
                <h2>We stopped arguing with the embarrassment and built the campaign around it.</h2>
              </div>
              <div>
                <p className="lead">
                  Fashion advertising, in the aspirational titles, showing women who look
                  like they have something they are not telling you. The line under each one
                  is a confession that has nothing to do with clothes.
                </p>
                <p>
                  The secret is not that the dress came from Kmart. That is the joke, and it
                  means the campaign never has to say the embarrassing part out loud.
                </p>
              </div>
            </div>

            <Figure
              src="ad-keep-your-secret-2.jpg"
              alt="Print advertisement: a woman laughing at a party in a pink dress, a confession reading wrote a screenplay about cat astronauts, the line some things are best kept to yourself, and the Keep Your Secret sign-off above the Kmart logo."
              caption="The campaign line, and a confession that has nothing to do with clothes. Written and art directed over the weekend, for the aspirational fashion titles."
              className="figure-portrait"
            />
          </div>
        <ExAside>{"An entire campaign about keeping a secret. I was extremely qualified."}</ExAside>

        </section>

        <section className="chapter shell" id="site" data-anna-prompt="Why a password?">
          <p className="section-number">03</p>
          <div className="two-column-copy">
            <div>
              <h2>A password is a reason to go somewhere on purpose.</h2>
            </div>
            <div>
              <p className="lead">
                Underneath the campaign sat SHHH.com, a members-only site behind a password.
                Exclusive online deals, must-have pieces, trend and news content, and a
                network of other people in on it.
              </p>
              <p>
                That is the part that answers the actual brief. The ads buy you awareness,
                but you cannot stumble into a members-only site the way you stumble into a
                rack on the way to the checkout. Membership also flips the stigma rather
                than denying it. The point is no longer that nobody can know. It is that not
                everybody does.
              </p>
              <p>
                Gated deals, insider content and a social layer were still new for a mass
                retailer in 2010. The proposal was not a website with a campaign attached.
                It was a brand you had to be let into.
              </p>
            </div>
          </div>

          <Figure
            src="site-login.jpg"
            alt="SHHH.com login screen. A model holds a lit fluorescent tube against a pink background. The SHHH wordmark sits on a strip of duct tape, above member email and password fields."
            caption="The door. Member email, password, and an app download in the corner."
            className="wide-figure"
          />

          <Figure
            src="site-members.jpg"
            alt="SHHH.com members homepage showing a video player, look of the day, an exclusives module, a shop link and a grid of member photographs."
            caption="Inside: look of the day, exclusives, video, and the other members."
            className="wide-figure"
          />
        </section>

        <section className="chapter chapter-alt" id="surfaces" data-anna-prompt="How far did the tape concept go?">
          <div className="shell">
            <p className="section-number">04</p>
            <div className="two-column-copy">
              <div>
                <h2>One device, every surface.</h2>
              </div>
              <div>
                <p className="lead">
                  Duct tape. Over the thing you do not want read.
                </p>
                <p>
                  I do not remember who said it first. That weekend was continuous riffing
                  and nobody owned a single idea. What I can tell you is where mine came
                  from. I had spent years making hangtags, woven labels and in-store
                  graphics for clothing brands, so I was thinking about the object in the
                  customer&rsquo;s hand, and the tape went onto the parts of that object
                  that name the retailer.
                </p>
                <p>
                  I built the site comps, the bag and the print layouts. The writers worked
                  the copy. We put it in front of each other several times a day.
                </p>
              </div>
            </div>

            <div className="kmart-surface-grid">
              {surfaces.map((s) => (
                <div className="kmart-surface" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>

            {/* The bag now opens the case from the hero, so this pair holds
                the remaining identity artifacts. */}
            <div className="kmart-artifacts kmart-artifacts--pair">
              <Figure
                src="tape-k.jpg"
                alt="The Kmart K logo rebuilt from strips of black duct tape."
                caption="The mark, rebuilt in tape."
              />
              <Figure
                src="logo-lockup.jpg"
                alt="SHHH.com logo lockup: a card with the wordmark beneath a strip of duct tape carrying a pair of red lips."
                caption="The lockup."
              />
            </div>
          </div>
        </section>

        <section className="chapter shell" id="reveal" data-anna-prompt="How did the reveal work?">
          <p className="section-number">05</p>
          <div className="two-column-copy">
            <div>
              <h2>You find out where it came from after you have already decided you want it.</h2>
            </div>
            <div>
              <p className="lead">
                Popup stores in major cities, stocked entirely with the new Kmart lines.
                Nothing in the shop branded Kmart. Every hangtag covered with a strip of
                duct tape.
              </p>
              <p>
                You shop the rails and judge the clothes on the clothes. You buy something.
                It goes into a bag with the tape over the label. You leave. And somewhere
                outside, you peel the tape off and find out you just bought it from Kmart.
              </p>
              <p>
                This is the part the whole campaign is built to arrive at, and it is why the
                tape is the device rather than a graphic style. Every other surface is
                rehearsing the same move at lower stakes: the ads withhold the secret, the
                site puts it behind a password, the bag holds it until you are out of the
                shop.
              </p>
            </div>
          </div>

          <div className="kmart-reveal">
            <ol aria-label="The popup store sequence">
              <li>
                <span>01</span>
                <strong>Nothing is branded</strong>
                An unbranded shop, stocked entirely with the new lines. No logo anywhere in
                the room.
              </li>
              <li>
                <span>02</span>
                <strong>Every label is taped</strong>
                A strip of tape over each hangtag. You have nothing to judge but the
                garment.
              </li>
              <li>
                <span>03</span>
                <strong>You buy on the clothes alone</strong>
                The decision gets made before the brand ever enters it.
              </li>
              <li>
                <span>04</span>
                <strong>The reveal happens outside</strong>
                Peel the tape off the bag or the tag, and there it is. Too late to be
                embarrassed about a choice you already made on merit.
              </li>
            </ol>
          </div>

          <p className="kmart-reveal-note">
            It answers the brief exactly. Nobody had a reason to look again, so the store
            removes the thing that stops people looking, gets an honest verdict on the
            product, and only then puts the name back on it.
          </p>
        </section>

        <section className="reflection shell" id="outcome" data-anna-prompt="Why did the campaign need this much detail?">
          <p className="eyebrow">What happened</p>
          <h2>We were the far end of the scale, and I think that was the point.</h2>
          <div className="reflection-grid">
            <div>
              <p>
                Three routes went to the client. A safe one, a middle one, and ours. Part of
                the reason ours was presented at all was to show how far the territory could
                go. I did not present. I made the work.
              </p>
              <p>
                I made the work, handed it over, and moved to the next brief, which is what
                pitch work is. What stays is the thing itself: the idea, the craft, and how
                far a team can push a territory in four days.
              </p>
            </div>
            <div>
              <p>
                What I can point at is where the brand went. Kmart kept pushing on exactly
                this problem, and by 2013 it was launching named celebrity clothing lines,
                including one with Nicki Minaj, so that people would come for the clothing
                by name rather than find it on the way to something else.
              </p>
              <p>
                I am not going to claim our weekend caused that, because I have no idea
                whether it did. But the argument we were making in 2010 was the same
                argument: the product had already changed, and what was missing was a reason
                to arrive on purpose. We were three years early to a position the brand
                eventually took.
              </p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-alt" id="takeaway">
          <div className="shell">
            <p className="section-number">06</p>
            <div className="two-column-copy">
              <div>
                <h2 id="across-mediums">The idea came before the medium.</h2>
              </div>
              <div>
                <p className="lead">
                  I was brought onto the pitch because I understood fashion, but the useful
                  work was connecting the whole system: the customer tension, the campaign
                  line, the digital destination, the packaging, and the retail reveal.
                </p>
                <p>
                  None of those parts was the answer on its own. Each gave the same idea a
                  different job.
                </p>
                <p>
                  That is still how I work. UX is my deepest specialization, but I do not
                  begin by deciding the answer is a product. I start with the problem, then
                  use the mediums that make the idea real.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="next-case">
          <div className="shell next-case-inner">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2>Forty fields. Five that mattered.</h2>
            </div>
            <a className="next-case-status" href="/nike">
              Read the Nike story
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
