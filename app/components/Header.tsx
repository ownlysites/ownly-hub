export default function Header() {
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        height: 64,
        background: "rgba(253, 252, 248, 0.82)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "var(--ink)" }}>
          <span
            aria-hidden
            style={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1px solid var(--gold)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600, color: "var(--gold-dark)",
              letterSpacing: "0.04em",
            }}
          >O</span>
          <span style={{ fontFamily: "var(--ff-display)", fontWeight: 500, fontSize: 22, letterSpacing: "0.01em" }}>
            Ownly ONCE
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <span className="mono" style={{ color: "var(--text-mute)" }}>
            <span style={{ color: "var(--gold)" }}>★</span>&nbsp;&nbsp;VOL.I · NO.01 · MMXXVI
          </span>
          <a
            href="https://itsownlymoney.vercel.app"
            style={{ color: "var(--ink)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
          >Sign in</a>
        </div>
      </div>
    </header>
  );
}
