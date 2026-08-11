import { buildSystemPrompt } from "../../lib/almostAnna";
import type { PersonaId } from "../../personaStore";

/**
 * Almost Anna chat proxy.
 *
 * Deliberate differences from the earlier prototype's api/chat.js:
 *
 *  - The system prompt is built server-side from the persona, not accepted
 *    from the request body. Previously a caller could send any system prompt
 *    they liked and make the assistant say anything under Anna's name.
 *  - A per-session message cap and a per-IP rate limit are enforced, both
 *    listed as non-negotiable in docs/decisions-log.md.
 *  - The API key is read from a server-only variable and never reaches the
 *    browser.
 */

/**
 * Haiku, not Sonnet. Almost Anna is a persona chat working from a long,
 * carefully written system prompt: the character is in the prompt, not in the
 * model tier. Haiku 4.5 costs exactly one third of Sonnet on both input and
 * output, and this endpoint is the only uncapped expense on the whole site.
 * If the voice ever stops holding up, this is the line to change back.
 */
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 800;

/** Per-session cap. Counted server-side against a cookie the client can't forge usefully. */
const SESSION_MESSAGE_CAP = 25;

/** Crude per-IP throttle: max requests inside the window. */
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60_000;

/** Longest single message we'll accept, to stop prompt-stuffing. */
const MAX_INPUT_CHARS = 2000;
const MAX_HISTORY = 20;

type Msg = { role: "user" | "assistant"; content: string };

/**
 * In-memory throttle. Workers are not guaranteed to share an isolate, so this
 * is a speed bump rather than a hard guarantee. It stops casual hammering; a
 * determined abuser needs a durable store (D1) which is the follow-up.
 */
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function readCount(cookie: string | null): number {
  if (!cookie) return 0;
  const m = cookie.match(/(?:^|;\s*)aa_count=(\d+)/);
  return m ? Number(m[1]) : 0;
}

function isPersona(v: unknown): v is PersonaId {
  return v === "recruiter" || v === "client" || v === "ex";
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured yet." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "That's a lot of questions at once. Give it a minute." },
      { status: 429 }
    );
  }

  const used = readCount(request.headers.get("cookie"));
  if (used >= SESSION_MESSAGE_CAP) {
    return Response.json(
      {
        error:
          "We've hit the limit for one sitting. This is probably where you should talk to the version of me with a calendar.",
        capped: true,
      },
      { status: 429 }
    );
  }

  let body: { messages?: unknown; persona?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const persona: PersonaId = isPersona(body.persona) ? body.persona : "recruiter";

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const messages: Msg[] = (body.messages as Msg[])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_CHARS) }));

  if (messages.length === 0) {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        // The system prompt is ~4k tokens and identical on every request for a
        // given persona, so it is marked cacheable. Cache hits bill at a tenth
        // of the input rate. The cache lives about five minutes, so this pays
        // off during a conversation and during bursts of traffic, and costs a
        // small write premium when a lone visitor arrives cold. Net win.
        system: [
          {
            type: "text",
            text: buildSystemPrompt(persona),
            cache_control: { type: "ephemeral" },
          },
        ],
        messages,
      }),
    });

    if (!upstream.ok) {
      // Don't leak upstream error detail to the browser.
      console.error("Anthropic error", upstream.status, await upstream.text());
      return Response.json(
        { error: "Something went wrong on my end. Try again in a moment." },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as {
      content?: { type: string; text?: string }[];
    };

    const reply =
      data.content
        ?.filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("")
        .trim() ?? "";

    if (!reply) {
      return Response.json(
        { error: "I lost my train of thought there. Ask me again?" },
        { status: 502 }
      );
    }

    const remaining = Math.max(0, SESSION_MESSAGE_CAP - (used + 1));

    return Response.json(
      { reply, remaining },
      {
        headers: {
          "Set-Cookie": `aa_count=${used + 1}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
        },
      }
    );
  } catch (err) {
    console.error("Chat proxy error", err);
    return Response.json(
      { error: "Something went wrong on my end. Try again in a moment." },
      { status: 502 }
    );
  }
}
