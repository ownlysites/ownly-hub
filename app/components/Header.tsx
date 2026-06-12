"use client";
import { getLink } from "../data/links";
import { openVault, requestPath, track } from "../lib/hub";

/* Sticky concierge nav:
   Ownly ONCE · Choose Path · Business · Household · AI Audit · Book Dave · All Tools
   Middle links collapse on mobile — the sticky bottom bar covers those actions. */
export default function Header() {
  const aiAudit = getLink("ai_audit");
  const sitDown = getLink("sit_down");
  const signIn = getLink("signin_wealthpath");

  function scrollToPaths() {
    document.getElementById("paths")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const linkStyle: React.CSSProperties = {
    color: "var(--ink)",
    textDecoration: "none",
    fontSize: 13.5,
    fontWeight: 600,
    background: "none",
    border: 0,
    cursor: "pointer",
    fontFamily: "var(--ff-body)",
    padding: "6px 2px",
  };

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        height: 64,
        background: "rgba(253, 252, 248, 0.88)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "var(--ink)", flexShrink: 0 }}>
          <span
            aria-hidden
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid var(--gold)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--ff-display)", fontSize: 19, fontWeight: 600, color: "var(--gold-dark)",
              letterSpacing: "0.04em",
            }}
          >O</span>
          <span style={{ fontFamily: "var(--ff-display)", fontWeight: 500, fontSize: 21, letterSpacing: "0.01em" }}>
            Ownly ONCE
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <button style={linkStyle} onClick={scrollToPaths}>Choose Path</button>
          <button style={linkStyle} onClick={() => requestPath("business")}>Business</button>
          <button style={linkStyle} onClick={() => requestPath("restaurant")}>Restaurant</button>
          <button style={linkStyle} onClick={() => requestPath("household")}>Household</button>
          <a
            href={aiAudit.url}
            data-frame="modal"
            style={linkStyle}
            onClick={() => track("cta_clicked_ai_audit", { source: "nav", href: aiAudit.url })}
          >AI Audit</a>
          <a
            href={sitDown.url}
            data-frame="modal"
            style={linkStyle}
            onClick={() => track("cta_clicked_sit_down", { source: "nav", href: sitDown.url })}
          >Book Dave</a>
          <button
            className="mono"
            onClick={() => openVault("nav")}
            style={{
              border: "1px solid var(--gold)", background: "transparent",
              color: "var(--gold-dark)", borderRadius: 999, padding: "8px 16px",
              cursor: "pointer", letterSpacing: "0.14em", fontSize: 10, fontWeight: 700,
            }}
          >ALL TOOLS</button>
          <a href={signIn.url} style={{ ...linkStyle, color: "var(--text-mute)", fontWeight: 500 }}>Sign in</a>
        </nav>

        {/* Mobile: keep just the vault trigger; bottom bar carries the rest. */}
        <button
          className="mono nav-mobile-tools"
          onClick={() => openVault("nav_mobile")}
          style={{
            border: "1px solid var(--gold)", background: "transparent",
            color: "var(--gold-dark)", borderRadius: 999, padding: "8px 14px",
            cursor: "pointer", letterSpacing: "0.12em", fontSize: 10, fontWeight: 700,
            display: "none",
          }}
        >TOOLS</button>
      </div>
    </header>
  );
}
