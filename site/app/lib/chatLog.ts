import { getDb } from "../../db";
import { chatTurns } from "../../db/schema";

/**
 * Conversation logging for Almost Anna.
 *
 * Every function here is best-effort. If D1 is not provisioned, or the write
 * fails for any reason, the visitor still gets their answer: logging must
 * never be able to break the chat. Failures are logged to the Worker console
 * and swallowed.
 */

const SID_COOKIE = "aa_sid";

/** Read the session id from the cookie header, if present. */
export function readSessionId(cookie: string | null): string | null {
  if (!cookie) return null;
  const m = cookie.match(/(?:^|;\s*)aa_sid=([A-Za-z0-9_-]{8,64})/);
  return m ? m[1] : null;
}

/**
 * A random, meaningless id used only to group turns into one conversation.
 * Not derived from anything about the visitor.
 */
export function newSessionId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
}

export type LogArgs = {
  sessionId: string;
  persona: string;
  question: string;
  answer: string;
  country: string | null;
  turn: number;
};

/**
 * Create the table on first use.
 *
 * D1 here is provisioned by the hosting control plane rather than a wrangler
 * config we own, so there is no convenient place to run a migration by hand.
 * This is idempotent and costs one cheap statement per cold isolate, which is
 * a fair trade for removing a manual deploy step. The generated SQL in
 * drizzle/ stays the source of truth if this ever moves to real migrations.
 */
let ensured = false;

export async function ensureChatTable(): Promise<void> {
  await ensureTable(getDb());
}

async function ensureTable(db: ReturnType<typeof getDb>): Promise<void> {
  if (ensured) return;
  await db.run(`CREATE TABLE IF NOT EXISTS chat_turns (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    session_id text NOT NULL,
    persona text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    country text,
    turn integer NOT NULL,
    created_at integer NOT NULL
  )`);
  await db.run(
    `CREATE INDEX IF NOT EXISTS chat_turns_created_idx ON chat_turns (created_at)`
  );
  await db.run(
    `CREATE INDEX IF NOT EXISTS chat_turns_session_idx ON chat_turns (session_id)`
  );
  ensured = true;
}

export async function logTurn(args: LogArgs): Promise<void> {
  try {
    const db = getDb();
    await ensureTable(db);
    await db.insert(chatTurns).values({
      sessionId: args.sessionId,
      persona: args.persona,
      question: args.question.slice(0, 2000),
      answer: args.answer.slice(0, 8000),
      country: args.country,
      turn: args.turn,
      createdAt: Date.now(),
    });
  } catch (err) {
    // D1 not bound yet, table missing, or a transient write failure. The
    // visitor's answer has already been sent, so there is nothing to recover.
    console.error("chat log write failed", err);
  }
}
