# Almost Anna — Chat Component Spec (2026-08-03)

Not built yet — no Figma file exists for this component. This doc captures the full design/interaction spec as given, so a future session (or an actual Figma pass) can build from it without re-deriving the requirements. Refines, doesn't replace, the visual direction already assumed in `figma-design-prompt.md`.

**Copy note:** the Variant 1 headline/body/prompts below are a fuller draft of the chat's default opening state and overlap with the shorter default opening line already logged in `tone-guide.md` ("I'm Almost Anna, although the 'Almost' is apparently a matter of opinion. What do you want to know?"). Not yet reconciled — treat both as candidates until Anna picks one, same as other undecided copy in this project.

---

## Scope

Refine the existing visual character of the Almost Anna chat component — do not change it. Preserve:

- Warm off-white background
- Deep navy user messages and send button
- Editorial serif headlines
- Clean sans-serif interface copy
- Subtle gray borders
- Generous spacing
- Rounded outer container
- Quiet, sophisticated portfolio aesthetic
- Playful tone without looking like a novelty chatbot

Governing identity rule (see `tone-guide.md` "Identity: Almost Anna believes she is Anna"): she speaks first person, never refers to Anna as a separate person, never calls herself "it." The AI disclosure lives in the interface (this component), not in her own voice.

## Primary design change: establish Almost Anna's identity

Add a persistent identity header to every state of the component.

**Header content:** [real photograph of Anna Rovedo] / "Almost Anna" / "AI stand-in"

**Requirements:**

- Real photograph of Anna, not an AI-generated portrait.
- Header avatar 44–48px.
- Name and AI disclosure ("AI stand-in") visible in every state.
- Separate header from conversation with a subtle border or spacing, not a heavy divider.
- Header stays fixed while conversation content scrolls.
- No green "online" indicator — "AI stand-in" is the disclosure, nothing else is needed.

## Message identity (corrects reversed avatar placement)

- Visitor messages: right-aligned, navy bubbles, no avatar.
- Almost Anna's responses: left-aligned, white bubbles with a subtle border, her avatar beside them.
- Avatar size beside messages: 28–32px.
- Show the avatar only on the first message in a consecutive group.
- Small "Almost Anna" label above the first AI response in a group.
- No generic avatar for the visitor.

## Component variants (Figma component set, Auto Layout)

Desktop ~608×620px, plus a responsive mobile version at ~390px wide. Header and composer stay fixed; the middle conversation area scrolls independently.

**1. Initial**

Header: Almost Anna / AI stand-in

Headline: "I had a feeling you'd show up eventually."

Body: "Since we're probably not grabbing coffee anytime soon, I made an AI version of myself. Apparently, I'm it. Ask about the work, the story, or what happened in the seasons you missed. I have absolutely no opinions about you."

Suggested prompts (wrapping pill buttons, "SUGGESTED PROMPTS" label ≥11–12px with sufficient contrast):
- So what do you actually do now?
- How did you go from fashion to AI?
- Which project are you most proud of?
- Be honest. Was the frog actually real?

**2. Composing**

Visitor's question shown in composer, e.g. "Be honest. Was the frog actually real?" Send button switches from inactive to active navy state. Visible keyboard focus treatment on the input.

**3. Waiting for response**

- Remove intro content and suggested prompts.
- Identity header stays visible.
- Visitor message on the right, no avatar.
- Almost Anna's avatar on the left beside a small typing indicator: three animated dots + "Thinking…" label.
- Accessibility annotation: announce this state to screen readers as "Almost Anna is thinking."

**4. First AI response**

- Visitor message on the right in navy, no avatar.
- Almost Anna's avatar on the left, small "Almost Anna" label above the response.
- Response in a white bubble with a subtle gray border.
- FPO content can reuse the current frog story, but flag with a Figma annotation: all personal stories and factual claims must be verified before launch (consistent with this project's standing no-fabrication rule — see `decisions-log.md` and `tone-guide.md`).

**5. Continued conversation**

- At least two visitor messages and two Almost Anna responses.
- Visitor messages align right, Almost Anna messages align left.
- 12–16px between messages from the same speaker; 20–24px when the speaker changes.
- Don't repeat the AI avatar for consecutive responses.
- Max bubble width ~70–75% of the conversation area.

## Composer

- Fixed at the bottom.
- Placeholder: "Ask Almost Anna anything…"
- Icon inside the field must read clearly as a conversation icon, not a magnifying glass.
- Send button ≥44×44px.
- States: inactive, hover, focus, pressed, active.
- Visible keyboard focus ring.
- Figma annotation: "Enter sends, Shift+Enter creates a new line."
- Placeholder and icons meet WCAG AA contrast.

## Visual and accessibility details

- Body text ≥16px, line height ~1.45–1.55.
- All text and controls meet WCAG AA contrast.
- Prompt pills: minimum 44px touch target on mobile.
- Visible focus states on prompt pills, input, and send button.
- Avatar alt-text annotation: "Portrait of Anna Rovedo."
- Never rely on color alone for active/loading/disabled states.
- Preserve whitespace, but the initial state shouldn't read as empty — the identity header should make the component feel intentional and occupied.
- Tone: warm, intelligent, slightly self-aware, editorial. Not customer-support software.

## Success criteria

The visitor should always understand: (1) they're speaking with Almost Anna, (2) she's an AI stand-in, (3) she speaks as Anna in first person, (4) Anna's photograph represents Almost Anna, never the visitor.
