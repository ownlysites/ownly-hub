"use client";
import { getLink } from "../data/links";
import { track } from "../lib/hub";

/* Entrance animations are pure CSS (.fade-up-*) so the H1 paints with the
   server HTML — keeps LCP off the hydration critical path.
   Ambient gold dust is the pure-CSS version on ALL devices — the three.js
   particle canvas blew the Lighthouse TBT budget (perf rule: 3D sparingly). */
export default function Hero() {
  const vip = getLink("vip_trip");

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        background: "var(--paper-warm)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div className="gold-dust-mobile" aria-hidden />
      <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 960, padding: "110px 24px 80px" }}>
        <div className="eyebrow fade-up" style={{ marginBottom: 26, color: "var(--gold-dark)" }}>
          <span className="hairline-rule" />OWNLY ONCE · THE CONCIERGE DESK · MMXXVI
        </div>

        {/* No entrance animation on the H1 — it is the LCP element and must
            paint with the first frame. The smaller pieces animate around it. */}
        <h1
          style={{
            fontFamily: "var(--ff-display)", fontWeight: 500,
            fontSize: "clamp(44px, 7.4vw, 82px)",
            lineHeight: 1.0, letterSpacing: "-0.01em",
            margin: "0 0 26px",
          }}
        >
          Tell us who you are.<br />
          We&rsquo;ll show you where the{" "}
          <em style={{ color: "var(--gold-dark)", fontStyle: "italic", fontWeight: 500 }}>money</em> is hiding.
        </h1>

        <p
          className="fade-up-2"
          style={{
            fontSize: 19, lineHeight: 1.55, color: "var(--text-mute)",
            maxWidth: 620, margin: "0 auto 34px",
          }}
        >
          Business owner, restaurant operator, agent, employee, family — one ecosystem,
          six doors. Pick yours and the concierge desk does the rest. Own nothing.
          Control everything.
        </p>

        <div className="fade-up-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#paths"
            className="btn-primary"
            aria-label="Choose your path"
            onClick={() => track("cta_clicked_choose_path", { source: "hero" })}
          >
            Choose your path&nbsp;↓
          </a>
        </div>

        <div className="fade-up-4" style={{ marginTop: 26 }}>
          <a
            href={`${vip.url}?source=hub-hero&audience=vip`}
            data-frame="modal"
            onClick={() => track("cta_clicked_vip_trip", { source: "hero", href: vip.url })}
            style={{
              fontFamily: "var(--ff-display)",
              fontStyle: "italic",
              fontSize: 15.5,
              color: "var(--text-mute)",
              textDecoration: "none",
              borderBottom: "1px solid var(--gold)",
              paddingBottom: 2,
              letterSpacing: "0.01em",
            }}
          >
            <span style={{ color: "var(--gold-dark)", marginRight: 6 }}>★</span>
            Already sat down? <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>Your VIP Trip awaits</em>&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}
