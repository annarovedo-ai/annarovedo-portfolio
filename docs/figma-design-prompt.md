# Figma Design Prompt: Paper Pixel Portfolio (Full 3-Persona Vision)

Note: product scope for beta ships with Recruiter + Client only (Ex-Boyfriend is a fast-follow per the decisions log), but this prompt designs all three personas together so the visual system is consistent and ready when Ex-Boyfriend ships.

Design the screens for "Paper Pixel," a UX/UI/branding portfolio site for a senior product designer named Anna. The site adapts its content and tone based on which of three visitor personas is active: **Recruiter** (default), **Potential Client**, and **Ex-Boyfriend**.

## Hard content rule: do not invent anything

A previous build of this site was generated from a version of this prompt that contained bracketed placeholders. The generator filled every one of them with confident, plausible, false content: a job title Anna never held ("Lead Designer, IBM Cloud"), three projects that don't exist, four invented metrics, a fabricated availability date, and a link to a profile she doesn't have. It also stated she was open to leadership roles, which is the opposite of true.

So, absolutely:

- **Use only the copy in `homepage-copy.md` and the facts in `facts.md`.** Do not generate project names, company names, job titles, dates, metrics, percentages, user counts, team counts, or years of experience.
- **Where a real number is missing it is marked NEEDS REAL NUMBER.** Render that literal text, or leave the space empty. Do not substitute a realistic-looking figure.
- **Do not add profile or social links** beyond LinkedIn.
- **Anna has 20+ years of experience**, career starting 2002. Any figure lower than that is wrong.
- **Never describe Anna as seeking leadership, management, or Design Lead roles.** She explicitly does not want them.
- **Never present IBM as one continuous engagement.** It is multiple separate recurring contracts across roughly 11 years.
- **No AI-generated imagery containing text.** The previous build rendered "ARCHITECTCRAL WIREFRAMES" and "TECH COLLABARATION" into hero images. Use real photography, real product screenshots, or plain image placeholder boxes.

For the Ex-Boyfriend persona specifically, keep any personal-life color generic and self-aware. No real names, no identifying details about any real third party, nothing defamatory or NSFW. It should read as confident and funny, not score-settling.

Design at desktop (1440px) and mobile (375px). Aesthetic: clean, editorial, confident. More design-studio than template-portfolio. Generous whitespace, strong type hierarchy, photography-forward.

## Persistent components (present on every screen)

- **Persona switcher.** Nav-level, always visible, never hidden in a menu. Treat it as a small design moment and piece of personality, not just a dropdown. Three states: Recruiter, Client, Ex-Boyfriend. Give the Ex-Boyfriend option a slightly different visual/interaction treatment to reflect that it's a deliberate, one-off click (for example a confirm-style hover state, or a wink of copy like "you sure?") rather than a casual toggle. Note in annotations that this selection resets every session with no persistent state, unlike Recruiter/Client which persist via cookie.
- **Almost Anna.** A chat widget (collapsed pill/icon by default, expandable panel). Copy and tone inside should visibly shift with the active persona, and Ex-Boyfriend mode unlocks a "personal layer" the other two don't have access to. Include a small, unobtrusive disclosure line near the chat about conversations being logged and reviewed — this is where the "she's an AI version of me" disclosure lives; the character itself never breaks its own first-person voice to say it (see `tone-guide.md`). Full component-level spec (identity header, message/avatar rules, variant set, composer states, accessibility) drafted in `almost-anna-component-spec.md` — not yet built in Figma.

## Screens to design

Design each screen three times where noted, themed for Recruiter, Client, and Ex-Boyfriend, using the tone direction below. Same layout skeleton across all three, different copy/imagery/emphasis. Real copy isn't finalized yet, so use the example lines below as placeholder text, not final content.

**1. Homepage**

- Nav bar: logo/wordmark "Paper Pixel," primary nav (Work, About, Resume, Contact), persona switcher docked at the right.
- Hero block: headline plus one-line subhead, taken verbatim from `homepage-copy.md`. Paired with a photo of Anna.
  - **Photography direction (changed).** Not a studio headshot or an arms-crossed executive portrait. That reads as stock and communicates only "professional." Use an editorial working image that shows the nature of the work: Anna in front of a wall of journey maps or a system diagram, presenting to a room, sketching architecture, or at her desk with real product artifacts visible. The photo should say "this person designs complex systems," not "this person owns a blazer." Still persona-specific per the decisions log, with the Ex-Boyfriend cut warmer and more personal.
  - Sizzle reel as a "play" card overlaying or adjacent to the photo.
- **Credibility strip (new).** Directly beneath the hero: a quiet row of client logos (IBM, LinkedIn, Nike, Bloomberg, State Street, Ford). Logos only, no durations or captions. This is the fastest possible answer to "is this person legit," and a recruiter should not have to hunt for it.
- **Featured project (new hierarchy).** One flagship case study given roughly 2x the visual weight of the others: full-width horizontal feature with a large image, the project name, and a one-line framing. This is IBM MaaS360 Chat Concierge. Leading with a clear favorite tells the viewer what Anna thinks her strongest work is; three equal cards tell them nothing.
- **Supporting projects.** Three smaller cards below the feature, in a row on desktop and stacked on mobile. Thumbnail, real project name, one-line framing, field tags.
- **Metrics.** Where `homepage-copy.md` supplies a real metric, give it prominent treatment (large numeral, short label). Where it says NEEDS REAL NUMBER, render that literal text so the gap stays visible. Do not invent a figure to fill the layout.
- "Intro video about me" / methodology section: **moved below the case studies.** Credibility first, then process. A recruiter wants to know Anna can solve their problem before they care how she runs a team.
- Almost Anna entry point: a small persistent chat affordance (bottom-right pill is a reasonable default). Not a full section, just make sure it's visible in this screen's composition.
- Footer: contact CTA repeated, secondary nav, and contact links. LinkedIn only, no other profile links.

**2. Case Study page (one flexible template, reused for all 3 case studies)**

- Header: case study title, client/company name (or "confidential" placeholder), timeframe, field tags, role.
- Trailer video: large embedded player near the top, 60 to 90 second placeholder, with a short hook line above it teasing the single most interesting decision or problem.
- Written breakdown below, as distinct scrollable sections with clear headers and anchors. Consider a sticky in-page nav or section jump-links on desktop.
  1. **Overview & Role.** Project, context, what Anna specifically owned.
  2. **The Problem.** Business problem and user problem, visually separated (two-column, or two stacked callout blocks).
  3. **Constraints.** Team size, timeline, stakeholders, technical limits. A good candidate for a small stat/fact strip with icons and short labels.
  4. **Process.** Research, discovery, and synthesis narrative, supported by process artifacts (sketches, research photos, journey maps) in an image grid or carousel.
  5. **Key Decisions & Tradeoffs.** Alternatives considered versus what was chosen. Consider a comparison layout (option A versus option B) or annotated callouts.
  6. **Obstacles / Pivots.** Short narrative block covering what broke and what changed.
  7. **The Solution.** The largest visual section: key screens and UI walkthrough, design system pieces, brand decisions, before/after comparison. Give this the most layout variety, including full-bleed screens, annotated zooms, and a before/after slider treatment.
  8. **Outcomes.** Metrics and qualitative feedback as a stat block with big numbers, plus a pull-quote style testimonial callout.
  9. **Reflection.** Short closing narrative block on what she'd do differently now.
- Footer: link to next case study plus link back to homepage or contact.
- Persona framing: same section order, same underlying facts, and the same images across all three personas. Only the headline and intro copy per section shifts. Recruiter leans on the Decisions & Tradeoffs section, Client leans on Problem framing and Outcomes, Ex-Boyfriend keeps the full arc but narrates it with personality and threads brief personal-life color through Process and Obstacles (lines in the register of "this was the project I was living on iced coffee and denial through"). The Ex-Boyfriend version should carry the same real depth as the other two, not read as a lighter joke cut.

**3. About**

- Large photo of Anna, persona-specific: more professional and credentialed styling for Recruiter, warmer and more approachable for Client, most personal and flattering for Ex-Boyfriend. Paired with a longer-form bio than the homepage hero gets.
- Sections: background and career path, design philosophy and how she works, a few personal-interest lines to add texture. For Recruiter and Client, keep this to the professional layer only. For Ex-Boyfriend, this page can lean further into personal-layer texture than the other two, since that's the one persona with access to it. Still bounded by the hard rule: nothing defamatory or NSFW, no identifying details about real third parties.
- Optional: a simple timeline or "career at a glance" strip (companies and years), useful for Recruiter especially. The Ex-Boyfriend version could reuse this strip with a wittier annotation style.
- CTA at the bottom pointing to Resume (recruiter), Contact (client), or a case study / Almost Anna prompt (ex-boyfriend, where a resume is likely less relevant).

**4. Resume**

- Recruiter-primary page: structured resume content covering experience, skills, tools, and education, readable both as a styled page and with an obvious "download PDF" action.
- Design persona-conditional states as variants: full resume (Recruiter), a trimmed summary version or hidden entirely (Client, still open which), and a lightly self-aware empty or redirect state for Ex-Boyfriend (something like "You know where I've worked. Here's the case studies instead," linking back to Work) rather than a full resume dump.

**5. Contact**

- Persona-aware headline and CTA copy:
  - Recruiter: direct and availability-forward, in the register of "Open to new roles starting [date]."
  - Client: warmer and collaboration-forward, in the register of "Tell me what you're working on."
  - Ex-Boyfriend: self-aware and lightly funny, but still nudging toward a real contact method rather than staying purely a bit. Something like "No, this isn't that. But if you're actually reaching out, here's where."
- Simple contact form (name, email, message) or direct contact methods (email, LinkedIn). Keep it short, one screen, no multi-step flow.
- Reuse the Almost Anna chat as an alternate, lower-friction contact path. Consider surfacing a line like "or just ask Almost Anna" near the form.

## Tone direction per persona

- **Recruiter.** Efficient, credentialed, direct. Visual treatment: confident, evidence-forward, fast to scan. Assume 90 seconds of attention.
- **Client.** Warmer, outcome-first, trust-building. Visual treatment: more narrative pacing, with outcome and impact given visual weight through stats, before/after comparisons, and testimonial-style callouts.
- **Ex-Boyfriend.** Same substance as the other two, narrated with personality and self-aware humor. Visual treatment: still credible and craft-forward, since this persona is expected to be the highest-curiosity click and needs to hold up as real proof of work rather than just a joke. But looser and warmer photography, and copy with more personality in the microcopy and UI voice. Button labels, empty states, and similar details can carry some wit here in a way they don't for the other two personas.

## Component list to produce

Persona switcher (multi-state), Almost Anna chat widget (collapsed and expanded), video/trailer player card, case study card, case study section block, persona-aware CTA button and module.

## Revision pass (2026-08-03): fixes for the current build

The current homepage build (Recruiter/Client/Ex-Boyfriend states reviewed 2026-08-03) reintroduced exactly the fabrication problem this doc already warns about above, plus several component-spec violations. Fix all of the following without touching the overall visual system, which is working well:

1. **Credibility strip: six logos only.** IBM, LinkedIn, Nike, Bloomberg, State Street, Ford — nothing else. Remove the second row (an unlabeled circular emblem, USAA, HP, eBay, McDonald's, Zara) entirely; none of those are documented client relationships in `facts.md`. The footer strip already has this right — match the hero strip to it, not the other way around.
2. **"Other Work" grid: don't invent project descriptions for logo-only clients.** Nike, LinkedIn, and Bloomberg currently appear as if they were distinct case studies with invented one-line pitches ("Digital commerce and brand experience," "Platform design and content systems," "Enterprise data visualization"). None of that is in `facts.md` — those three are logo-wall clients, not documented projects. Only "IBM Connected Product Experience" in that grid is real. Either drop the other three cards or hold them for real, `facts.md`-sourced content later — don't fill the grid just to make it look fuller.
3. **Use real project names.** "IBM AI Concierge" should be "IBM MaaS360 Chat Concierge" (the flagship's actual documented name, per `decisions-log.md`'s "Real project names only" rule). "Redesigning search across IBM.com" should be "IBM Global Search."
4. **Rename the video caption.** "MEET THE HUMAN BEHIND THE CONCIERGE" is the pre-rename name — the site's chat is Almost Anna, not the Concierge (renamed 2026-08-03 specifically to stop colliding with the IBM MaaS360 Chat Concierge project name, see `decisions-log.md`). Update to "Meet the human behind Almost Anna" or similar.
5. **Restore the "AI stand-in" disclosure in the chat header.** It's currently missing — the header shows the avatar, "Almost Anna," and a persona chip (RECRUITER / CLIENT / EX BOYFRIEND), but the actual AI disclosure text isn't there. Keep the persona chip if it earns its place, but "AI stand-in" (or equivalent) must stay visible in the header in every state — see `almost-anna-component-spec.md`.
6. **Fix the composer icon.** It currently reads as a magnifying glass/search icon. Replace with a conversation/chat-bubble icon — explicit in the spec, and a search icon undercuts the "this is a conversation, not a lookup tool" positioning already logged in `decisions-log.md`.
7. **Fix the duplicate nav on initial load.** The expanded "I'm here as…" persona bar and the compact sticky nav both appear at once at the top of the page. Per `site-map.md`, the compact nav should only appear once the visitor scrolls past the hero — check the scroll-trigger threshold; it's currently firing before (or without) the expanded bar actually scrolling out of view.
8. **Don't reuse Ex-Boyfriend's line in Client mode.** Client's Almost Anna intro currently repeats "Since we're probably not grabbing coffee anytime soon, I made an AI version of myself. Apparently, I'm it." verbatim from Ex-Boyfriend. That emotional-distance joke belongs to Ex-Boyfriend specifically (see `tone-guide.md`); Client's opening line should stay in its own warmer, outcome-first register. Recruiter's variant in the same build ("I built an AI version of myself so you don't have to wait for a reply") is the better model for how Client's line should differ from Ex's.
9. **Let the About section vary by persona.** The "A designer shaped by more than one discipline" block and its pull quote currently read identically across all three personas. Same underlying facts is correct — give it Client- and Ex-appropriate voice shifts per `tone-guide.md`, the way the hero and Almost Anna intro already do.
