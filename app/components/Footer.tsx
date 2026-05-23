const COLS = [
  { title: "ECOSYSTEM", links: [
    { l: "Hub", h: "https://ownly-hub.vercel.app" },
    { l: "Breakthrough", h: "https://the-ownly-breakthrough.vercel.app" },
    { l: "WealthPath", h: "https://itsownlymoney.vercel.app/?audience=individual" },
  ]},
  { title: "SCANS", links: [
    { l: "AI Assessment", h: "https://ownly-gap-audit.vercel.app/" },
    { l: "Business Credit", h: "https://ownly-business-credit-builder.vercel.app/" },
    { l: "DREAMS Score", h: "https://dreamsscore.biz/?refid=AA3946" },
  ]},
  { title: "STUDIO", links: [
    { l: "Web Studio", h: "https://ownly-web-studio.vercel.app/" },
    { l: "Find My Money", h: "https://app.mplannerpro.com/abce1ffefc/chat?pg=69539a14a3" },
    { l: "6 Figure Sit Down", h: "https://calendly.com/daveivery/sit_down" },
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
            Own nothing. <em style={{ color: "var(--gold)" }}>Control everything.</em>
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
        <a className="mono" href="https://ownly-vip-trip.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold-dark)", textDecoration: "none", letterSpacing: "0.12em" }}>★ 6FSD ALUMNI · VIP TRIP</a>
        {/* /VIP-ALUMNI */}
        <span className="mono" style={{ color: "var(--text-mute)" }}>
          © 2026 OWNLY ONCE LLC · SARASOTA, FL · AN OWNLY ONCE PUBLICATION
        </span>
      </div>
    </footer>
  );
}
