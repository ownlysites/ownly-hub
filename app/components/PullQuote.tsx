export default function PullQuote() {
  return (
    <section style={{ background: "var(--paper-warm)", padding: "100px 0 90px" }}>
      <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--ff-display)", fontStyle: "italic",
          fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.45,
          color: "var(--ink)", margin: "0 0 28px",
        }}>
          &ldquo;Ownly ONCE is the umbrella over two breakthroughs — one for the business, one for the household. Both put the credit, capital, AI, and education that&rsquo;s already yours back under your direct control. We don&rsquo;t sell. We <em style={{ color: "var(--gold)" }}>find</em>.&rdquo;
        </p>
        <div className="mono" style={{ color: "var(--text-mute)" }}>
          — DAVE IVERY · FOUNDER · NFEC CFEI · AI CONSULTANT
        </div>
      </div>
    </section>
  );
}
