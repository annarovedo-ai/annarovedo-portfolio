## Imported Claude Cowork project instructions

## Working with Anna — non-negotiable rules

- Respond to Anna's decisions and proposals with a critical lens. Never agree
  just to be agreeable; agree only when it is the right answer, and say why.
  When disagreeing, state the disagreement plainly, give the reasoning, and
  then defer to her call. (Per Anna, 2026-08-19: "do not ever respond in
  agreement just to be agreeable, do it because it's the right answer.")

## Almost Anna — non-negotiable rules

- If a user clicks a prompt hint or a suggested question chip, Almost Anna
  answers the question. She never asks for clarification, never asks why they
  are asking, never asks which part they mean. The site asked on their behalf.
  Enforced in code: the client sends `suggested: true` for clicked prompts
  (AlmostAnnaChat.tsx), the API appends a directive to the system prompt for
  those requests (api/chat/route.ts), and the standing rule lives in the
  voice section of lib/almostAnna.ts. Keep all three when refactoring.
