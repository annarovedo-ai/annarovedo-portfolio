# Nike Operations Workspace — Inventory Availability

*Draft narrative. Lead UX Designer, 2023. Shipped.*

---

## Hero

**Forty fields walk into a requirements doc.**

Five of them were doing all the work.

---

## The setup

Nike Operations Workspace is the system Nike's order management teams live inside — one place to create orders, manage them, and get product where it's going. It had launched in Greater China in August 2023 and was headed for North America the following year. I joined after that first launch, which meant no clean slate. Real people were already depending on this thing every day.

The feature on my desk was inventory availability. It sounds mundane until you watch someone try to answer the question.

## The problem

To find out whether product was actually available, an operations specialist ran reports in SAP AFS, then cross-referenced a separate point-solution reporting tool, then went back to the order they were building — assuming they still remembered what they were doing.

Every one of those context switches costs time. And in order management, time isn't an inconvenience.

> **Using multiple, fragmented tools results in a time consuming and inefficient process. Delayed orders mean lost revenue.**

That's the whole business case in two sentences. I didn't need to dress it up.

## Who I was designing for

**Paul**, an MPO Specialist — marketplace operations, for people who don't speak in acronyms. He shepherds customer purchase orders from the moment they're captured until product is delivered, running reports and fielding calls the entire way.

**Shelly**, his supervisor. She onboards specialists like Paul, allocates resources, and is accountable when orders slip.

## The part where I wasn't allowed to talk to anyone

Here's the constraint I'd rather not have had: internal process blocked me from interviewing actual end users. No one-on-ones. For a feature whose entire premise is "we don't know what people really search for," that's a problem.

So I ran proto-persona workshops with stakeholders and SMEs, which got me partway — good themes around user goals, inefficiencies, and daily tasks, but conspicuous gaps where firsthand knowledge should have been.

Then I found a side door. I sent a survey to marketplace operations distribution lists across North America and got **47 responses** back.

I want to be straight about what that is. It's not a substitute for sitting with users. What I ended up with is either very thorough proto-personas or semi-validated ones, depending on how generous you're feeling. But it was a great deal more than I started with, and it came from the actual population instead of from people describing that population.

Sometimes you get creative with what you have.

I also asked them why availability mattered to them, which turned out to be the most useful question on the form:

> *"It is the foundation and starting point to be able to order product and determine the status of those units."*

> *"Knowing where everything is at a moment's notice can help inform cross functional teams and best utilize the resources available to make business decisions."*

## Three doors

I sketched three ways in.

**1.0 — Quick Inventory Search, flyout.** Check availability without leaving what you're doing. You're mid-order, you need a number, you pull a panel from the side of the screen and keep going. Limited information by design — inventory search lite — with a path to the deeper tool if you need it.

**2.0 — Robust Inventory Search, dedicated page, filters in a flyout.** A real page for real digging. Filters tucked into a panel so the results have room to breathe. Tidy. Also means opening and closing that panel every single time, which gets old fast.

**3.0 — Robust Inventory Search, dedicated page, flat field layout.** Filters exposed across the top, on the hypothesis that most people reach for the same handful every time and shouldn't have to go find them.

You can see the bet inside option three. I'd have to prove it.

## The contradiction

I took all three to the SMEs and ran a feedback grid. The enthusiasm was useful. The anxiety was more useful.

In the same column, in the same session, people told me they were nervous about:

> *"Having too many options"*

> *"Missing fields that are important"*

Those cannot both be solved by opinion. Add fields and you're cluttered; remove them and you've broken someone's workflow. That contradiction *was* the design problem, and no amount of taste was going to resolve it.

They also asked for something nobody had put in the requirements: download to Excel, so they could send results to their teams and clients. Noted, and built.

## The number

The requirements document listed roughly **forty** searchable attributes. My hypothesis was that almost nobody used most of them.

Rather than argue it in a meeting, I ran a second survey: what are the top four attributes you search by, in order of importance? What else might you search? What has to appear in the results?

The answers converged, hard. **Material number. Plant code. ISEG. Quality. Quantity.**

Five fields. That's the primary interface. Everything else went behind "See More Filters" — present for the person who genuinely needs distribution channel, invisible for the ninety-odd percent who never will.

The contradiction dissolved, and not because I picked a side. Both groups were right; they just needed different depths of the same tool.

## What I built

Filters at the top. Search, and your criteria line up as chips across the top of the data grid, so you can always see the shape of the question you asked. Add a second filter, add a third — the chips accumulate and the results narrow. Clear all in one move.

Once you have results, they're downloadable, because the SMEs told me that mattered and they were right.

Nothing here is clever. Clever was never the assignment.

## Testing

Four users, real tasks: search a material number, filter by plant, filter again by ISEG, download the results, and tell me how many size large are available on December 26th.

All four finished unaided.

Then I asked whether they'd want to save filter sets as defaults. All four wanted them saved on the flyout — which quietly confirmed that the flyout from option 1.0 hadn't been a dead end. It had a different job than I first thought.

Testing was extending into Greater China and Europe, and refinements were ongoing. My own notes from that round, verbatim, because polish came later:

> *"dates are too close together / header isn't distinct enough / which are required vs optional?"*

## Outcome

It shipped.

## What I'd take from it

The blocker turned out to be the interesting part. Being denied user interviews forced me to find a population I could actually reach, and 47 responses from real operations staff beat a room of stakeholders confidently describing them.

And the forty-to-five reduction is the thing I'd point to. Not because subtraction is virtuous, but because it was the only move that satisfied two groups who appeared to want opposite things. The evidence made it a decision instead of a preference — which is the difference between a design you can defend and a design you can only assert.
