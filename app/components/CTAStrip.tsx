const CTAS = [
  { label: "FREE AI ASSESSMENT", href: "https://ownly-gap-audit.vercel.app/" },
  { label: "FIND MY MONEY · 5 MIN", href: "https://app.mplannerpro.com/abce1ffefc/chat?pg=69539a14a3" },
  { label: "E-ESTATE · DIGITAL RE", href: "https://e-estate.co/agent/614982774359" },
  { label: "6 FIGURE SIT DOWN", href: "https://calendly.com/daveivery/sit_down" },
  { label: "BUSINESS CREDIT SCAN", href: "https://ownly-business-credit-builder.vercel.app/" },
  { label: "★ COMPLIMENTARY VIP TRIP", href: "https://ownly-vip-trip.vercel.app/?source=hub-cta-strip&audience=vip" },
];

export default function CTAStrip() {
  return (
    <section style={{ background: "var(--paper-cream)", padding: "70px 0", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
        {CTAS.map(c => (
          <a
            key={c.href}
            href={c.href}
            data-frame="modal"
            className="mono cta-pill"
          >{c.label}</a>
        ))}
      </div>
    </section>
  );
}
