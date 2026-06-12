"use client";
import { useEffect, useState } from "react";

// Time-sensitive WonderTrust IRS Penalty + Interest Refund banner.
// Locked 2026-05-20. Live until July 10, 2026 (federal protective-claim deadline).
// Thin dismissible gold strip above the Concierge Terminal.

export default function WonderTrustBanner() {
  const deadline = new Date("2026-07-10T23:59:59Z").getTime();
  const today = Date.now();
  const daysLeft = Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));

  // Dismiss persists for the session; read in effect to avoid hydration mismatch.
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem("wt_dismissed")) setDismissed(true); } catch {}
  }, []);
  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    try { sessionStorage.setItem("wt_dismissed", "1"); } catch {}
  }

  if (dismissed) return null;

  return (
    <a
      href="https://filemycredit.com/daveivery"
      data-frame="modal"
      style={{
        display: "block",
        background: "linear-gradient(90deg, var(--gold), var(--gold-soft), var(--gold))",
        color: "var(--ink)",
        padding: "10px 24px",
        textAlign: "center",
        textDecoration: "none",
        fontFamily: "var(--ff-body, 'Inter', sans-serif)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.02em",
        position: "relative",
        zIndex: 60,
      }}
      className="hover:brightness-105 transition"
    >
      <span style={{ fontFamily: "var(--ff-mono, 'JetBrains Mono', monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-deep, #0a0e1a)", marginRight: 10 }}>
        ★ Time-Sensitive
      </span>
      <strong>IRS may owe you a refund on penalties & interest 2020–2023.</strong>
      <span style={{ marginLeft: 8 }}>Free eligibility check · zero upfront · 100% contingency.</span>
      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, marginLeft: 12, color: "var(--ink-deep, #0a0e1a)" }}>
        {daysLeft} DAYS LEFT
      </span>
      <span style={{ marginLeft: 12, fontWeight: 700 }}>Check eligibility — free &rarr;</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        style={{
          position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
          background: "none", border: 0, cursor: "pointer",
          color: "var(--ink-deep, #0a0e1a)", fontSize: 16, lineHeight: 1, padding: 6,
        }}
      >✕</button>
    </a>
  );
}
