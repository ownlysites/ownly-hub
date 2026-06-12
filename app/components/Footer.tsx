import { getLink } from "../data/links";

/* Footer columns now read from the central link registry (app/data/links.ts)
   so footer destinations can never drift from the rest of the hub. */
const L = (id: string) => getLink(id).url;

const COLS = [
  { title: "ECOSYSTEM", links: [
    { l: "Hub", h: L("hub") },
    { l: "Breakthrough", h: L("biz_breakthrough") },
    { l: "WealthPath", h: L("escape_plan") },
    { l: "DaveIvery.com", h: L("daveivery_card") },
  ]},
  { title: "SCANS", links: [
    { l: "AI Assessment", h: L("ai_audit") },
    { l: "Business Credit", h: L("biz_credit") },
    { l: "AI Revenue Generator", h: L("ai_revenue") },
  ]},
  { title: "STUDIO", links: [
    { l: "Web Studio", h: L("web_studio") },
    { l: "6 Figure Sit Down", h: L("sit_down") },
    { l: "Our Credit Partner", h: L("credit_partner") },
  ]},
  { title: "CONTACT", links: [
    { l: "david@ownly1nce.com", h: "mailto:david@ownly1nce.com" },
    { l: "941-277-9876", h: "tel:+19412779876" },
    { l: "Sarasota, FL", h: "#" },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--paper-warm)", padding: "80px 0 40px", borderTop: "1px solid var(--hairline)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 36, marginBottom: 60 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span
              aria-hidden
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid var(--gold)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--ff-display)", fontSize: 18, fontWeight: 600, color: "var(--gold-dark)",
              }}
            >O</span>
            <span style={{ fontFamily: "var(--ff-display)", fontWeight: 500, fontSize: 22 }}>Ownly ONCE</span>
          </div>
          <p style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", color: "var(--text-mute)", fontSize: 16, margin: 0, maxWidth: 280, lineHeight: 1.45 }}>
            Own nothing. <em style={{ color: "var(--gold-dark)" }}>Control everything.</em>
          </p>
        </div>
        {COLS.map(c => (
          <div key={c.title}>
            <div className="mono" style={{ color: "var(--gold-dark)", marginBottom: 14 }}>{c.title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {c.links.map(k => (
                <li key={k.l}>
                  <a className="mono" href={k.h} style={{ color: "var(--text-mute)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "none" }}>
                    {k.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container" style={{
        borderTop: "1px solid var(--gold)",
        paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <span className="mono" style={{ color: "var(--text-mute)" }}>VOL.I · NO.01 · MMXXVI</span>
        {/* VIP-ALUMNI */}
        <a className="mono" href={L("vip_trip")} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold-dark)", textDecoration: "none", letterSpacing: "0.12em" }}>★ SIX FIGURE SIT DOWN ALUMNI · VIP TRIP</a>
        {/* /VIP-ALUMNI */}
        <span className="mono" style={{ color: "var(--text-mute)" }}>
          © 2026 OWNLY ONCE LLC · SARASOTA, FL · AN OWNLY ONCE PUBLICATION
        </span>
      </div>
    </footer>
  );
}
