import { NextResponse } from "next/server";

const DBC_WEBHOOK = process.env.DBC_WEBHOOK_URL;

export const runtime = "edge";

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { /* sendBeacon Blob */ }

  const audience = String(payload.audience || "unknown");
  const tag = `ownly_hub_${audience}`;
  const enriched = {
    ...payload,
    tag,
    referer: req.headers.get("referer") || null,
    ua: req.headers.get("user-agent") || null,
    ip: req.headers.get("x-forwarded-for") || null,
    receivedAt: new Date().toISOString(),
  };

  if (DBC_WEBHOOK) {
    try {
      await fetch(DBC_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enriched),
        keepalive: true,
      });
    } catch {
      // swallow — fire-and-forget
    }
  }

  return NextResponse.json({ ok: true, tag });
}
