import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";

/**
 * Almost Anna conversation log.
 *
 * One row per completed exchange: the visitor's question and the reply that
 * went back. Written after a successful response, so failed or rate-limited
 * requests never appear.
 *
 * Deliberately not stored:
 *  - IP addresses. `country` comes from Cloudflare's `cf-ipcountry` header,
 *    which is coarse enough to be useful and not identifying on its own.
 *  - Anything tying a session to a person. `sessionId` is a random value we
 *    mint ourselves in a cookie; it groups turns into one conversation and
 *    means nothing outside this table.
 *
 * Visitors are not told they are being recorded. If this ever surfaces
 * publicly, or gets used for anything beyond Anna reading her own site's
 * questions, that needs saying out loud in the chat UI first.
 */
export const chatTurns = sqliteTable(
  "chat_turns",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    /** Random per-visit id from the aa_sid cookie. Groups turns into a conversation. */
    sessionId: text("session_id").notNull(),
    /** recruiter | client | ex — which version of Anna was answering. */
    persona: text("persona").notNull(),
    /** What the visitor asked. */
    question: text("question").notNull(),
    /** What Almost Anna replied. */
    answer: text("answer").notNull(),
    /** Two-letter country from Cloudflare, or null. No IP is stored. */
    country: text("country"),
    /** Which turn this was within the session, starting at 1. */
    turn: integer("turn").notNull(),
    /** Unix milliseconds. */
    createdAt: integer("created_at").notNull(),
  },
  (t) => ({
    createdIdx: index("chat_turns_created_idx").on(t.createdAt),
    sessionIdx: index("chat_turns_session_idx").on(t.sessionId),
  })
);

export type ChatTurn = typeof chatTurns.$inferSelect;
