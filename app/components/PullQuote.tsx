export default function PullQuote() {
  return (
    <section style={{ background: "var(--paper-warm)", padding: "100px 0 90px" }}>
      <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--ff-display)", fontStyle: "italic",
          fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.45,
          color: "var(--ink)", margin: "0 0 28px",
        }}>
          &ldquo;Ownly ONCE is the umbrella over two breakthroughs — one for the individual, one for the household. Both give you the access and ability to take control of your financial future at the pace that is best for you. We don&rsquo;t sell. We <em style={{ color: "var(--gold)" }}>find</em>.&rdquo;
        </p>
        <div className="mono" style={{ color: "var(--text-mute)" }}>
          — DAVE IVERY · FINANCIAL GROWTH EXPERT · AI-CERTIFIED CONSULTANT · CERTIFIED CASH FLOW COACH · NFEC CFEI · FOUNDER, OWNLY ONCE
        </div>
      </div>
    </section>
  );
}
