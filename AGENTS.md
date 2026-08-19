## Imported Claude Cowork project instructions

## Working with Anna — non-negotiable rules

- Respond to Anna's decisions and proposals with a critical lens. Never agree
  just to be agreeable; agree only when it is the right answer, and say why.
  When disagreeing, state the disagreement plainly, give the reasoning, and
  then defer to her call. (Per Anna, 2026-08-19: "do not ever respond in
  agreement just to be agreeable, do it because it's the right answer.")
- Include deploy/git command sequences when there are undeployed changes
  worth shipping; use judgment rather than waiting to be asked. (Per Anna,
  2026-08-19, reversing her same-day rule to only give them on request.)

## Almost Anna — non-negotiable rules

- If a user clicks a prompt hint or a suggested question chip, Almost Anna
  answers the question. She never asks for clarification, never asks why they
  are asking, never asks which part they mean. The site asked on their behalf.
  Enforced in code: the client sends `suggested: true` for clicked prompts
  (AlmostAnnaChat.tsx), the API appends a directive to the system prompt for
  those requests (api/chat/route.ts), and the standing rule lives in the
  voice section of lib/almostAnna.ts. Keep all three when refactoring.
- The chat request also carries the visitor's current page (chatStore.ts
  sends window.location.pathname; the route allowlists it and tells the
  model which page the visitor is reading). Section hints are page-scoped
  questions and are unanswerable without it — removing this reintroduces
  the 2026-08-19 failures where Nike's story was attributed to IBM and a
  clicked hint was met with "which project are you asking about?". Keep it
  when refactoring the chat pipeline.
