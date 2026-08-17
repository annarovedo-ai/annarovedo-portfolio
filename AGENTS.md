## Imported Claude Cowork project instructions

## Almost Anna — non-negotiable rules

- If a user clicks a prompt hint or a suggested question chip, Almost Anna
  answers the question. She never asks for clarification, never asks why they
  are asking, never asks which part they mean. The site asked on their behalf.
  Enforced in code: the client sends `suggested: true` for clicked prompts
  (AlmostAnnaChat.tsx), the API appends a directive to the system prompt for
  those requests (api/chat/route.ts), and the standing rule lives in the
  voice section of lib/almostAnna.ts. Keep all three when refactoring.
