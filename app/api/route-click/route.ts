import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DBC_API = "https://services.leadconnectorhq.com";
const DBC_VERSION = "2021-07-28";

export async function POST(req: Request) {
  const token = process.env.DBC_PIT_TOKEN;
  const locationId = process.env.DBC_LOCATION_ID;

  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { /* sendBeacon Blob */ }

  const audience = String(payload.audience || "unknown");
  const tag = `ownly_hub_${audience}`;

  // If DBC not configured, still return ok so client UX isn't blocked
  if (!token || !locationId) {
    return NextResponse.json({ ok: true, tag, dbc: "skipped (not configured)" });
  }

  // Build a low-friction upsert — Hub path-click is anonymous (no email yet).
  // Fire-and-forget tagged note so the click shows up in DBC even without contact match.
  const upsertBody = {
    locationId,
    source: `ownly-hub-${audience}`,
    tags: [tag, "ownly_source_hub", `audience:${audience}`],
    customFields: [
      { key: "hub_audience", field_value: audience },
      { key: "hub_referer", field_value: req.headers.get("referer") || "" },
      { key: "hub_user_agent", field_value: req.headers.get("user-agent") || "" },
      { key: "hub_clicked_at", field_value: new Date().toISOString() },
    ],
  };

  try {
    // We don't have email at click-time on hub; only fire if payload includes it.
    if (payload.email) {
      await fetch(`${DBC_API}/contacts/upsert`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: DBC_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...upsertBody, email: String(payload.email) }),
        keepalive: true,
      });
    }
    // Optionally hit a generic webhook receiver if configured (legacy)
    if (process.env.DBC_WEBHOOK_URL) {
      await fetch(process.env.DBC_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, tag }),
        keepalive: true,
      });
    }
  } catch {
    // swallow — fire-and-forget
  }

  return NextResponse.json({ ok: true, tag });
}
