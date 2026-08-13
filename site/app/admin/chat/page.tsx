import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { chatTurns, type ChatTurn } from "../../../db/schema";
import { ensureChatTable } from "../../lib/chatLog";

export const metadata = {
  title: "Chat log",
  robots: { index: false, follow: false },
};

/**
 * Almost Anna conversation log.
 *
 * Gated on a shared secret in the URL: /admin/chat?key=... compared against
 * the ADMIN_KEY server variable. That is deliberately modest security. It
 * keeps the page off the open web and out of search results, but a key in a
 * query string ends up in browser history and any proxy logs in between, so
 * it is not suitable for anything more sensitive than this.
 *
 * If the log ever holds something worth protecting properly, this wants real
 * auth rather than a longer key.
 */

const PAGE_SIZE = 200;

function fmt(ms: number): string {
  return new Date(ms).toISOString().replace("T", " ").slice(0, 16);
}

function Locked({ reason }: { reason: string }) {
  return (
    <main className="shell" style={{ paddingBlock: "18vh 12vh", maxWidth: 620 }}>
      <h1 style={{ marginBottom: 12 }}>Not available</h1>
      <p style={{ color: "var(--muted)" }}>{reason}</p>
    </main>
  );
}

export default async function ChatLogPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expected = process.env.ADMIN_KEY;

  if (typeof expected !== "string" || expected.length === 0) {
    return (
      <Locked reason="ADMIN_KEY is not set on the server, so this page is disabled." />
    );
  }
  if (key !== expected) {
    return <Locked reason="Wrong or missing key." />;
  }

  let rows: ChatTurn[] = [];
  let error: string | null = null;
  try {
    // The table is created lazily on first chat, so on a fresh database this
    // page would otherwise fail before anyone has said anything.
    await ensureChatTable();
    const db = getDb();
    rows = await db
      .select()
      .from(chatTurns)
      .orderBy(desc(chatTurns.createdAt))
      .limit(PAGE_SIZE);
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  if (error) {
    return (
      <main className="shell" style={{ paddingBlock: "14vh 10vh", maxWidth: 720 }}>
        <h1 style={{ marginBottom: 12 }}>Chat log unavailable</h1>
        <p style={{ color: "var(--muted)", marginBottom: 18 }}>
          The database could not be read. Most likely D1 is not provisioned yet, or the
          migration has not been applied.
        </p>
        <pre
          style={{
            padding: 16,
            background: "var(--paper-deep)",
            border: "1px solid var(--line)",
            fontSize: 13,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {error}
        </pre>
      </main>
    );
  }

  const sessions = new Set(rows.map((r) => r.sessionId)).size;

  return (
    <main className="shell" style={{ paddingBlock: "8vh 10vh" }}>
      <p className="eyebrow">Almost Anna</p>
      <h1 style={{ marginBottom: 8 }}>Chat log</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>
        {rows.length === 0
          ? "Nothing logged yet."
          : `${rows.length} exchange${rows.length === 1 ? "" : "s"} across ${sessions} session${
              sessions === 1 ? "" : "s"
            }. Newest first, capped at ${PAGE_SIZE}.`}
      </p>

      {rows.length > 0 && (
        <div style={{ display: "grid", gap: 20 }}>
          {rows.map((r) => (
            <article
              key={r.id}
              style={{
                padding: "18px 20px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {fmt(r.createdAt)} · {r.persona} · turn {r.turn}
                {r.country ? ` · ${r.country}` : ""} · {r.sessionId.slice(0, 8)}
              </p>
              <p style={{ margin: "0 0 12px", fontWeight: 600, color: "var(--ink)" }}>
                {r.question}
              </p>
              <p style={{ margin: 0, color: "var(--body)", whiteSpace: "pre-wrap" }}>
                {r.answer}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
