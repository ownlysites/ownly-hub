"use client";
import { getLink } from "../data/links";
import { track } from "../lib/hub";

/* Premium navy concierge hero. Editorial-luxury: navy ground, gold guilloché
   security-print motif, ambient gold dust, Cormorant headline. Entrance is
   pure CSS (.fade-up-*) so the H1 (LCP) paints with the server HTML. */
export default function Hero() {
  const vip = getLink("vip_trip");
  const sitDown = getLink("sit_down");

  return (
    <section className="hero-navy" aria-label="Welcome to Ownly ONCE">
      <div className="gold-dust-mobile" aria-hidden />
      <svg className="hero-guilloche" viewBox="0 0 620 620" aria-hidden="true">
        <g fill="none" stroke="var(--gold)" strokeWidth="0.6">
          <circle cx="310" cy="310" r="60" opacity=".5" />
          <circle cx="310" cy="310" r="110" opacity=".4" />
          <circle cx="310" cy="310" r="160" opacity=".3" />
          <circle cx="310" cy="310" r="210" opacity=".22" />
          <circle cx="310" cy="310" r="260" opacity=".16" />
          <circle cx="310" cy="310" r="300" opacity=".1" />
        </g>
        <g fill="none" stroke="var(--gold-soft)" strokeWidth="0.5" opacity=".45">
          <path d="M310 30 V590 M30 310 H590 M114 114 L506 506 M506 114 L114 506" />
        </g>
      </svg>

      <div className="container hero-inner">
        <div className="concierge-chip fade-up">
          <span className="c-dot" aria-hidden />
          Your Ownly concierge is in
        </div>

        <h1
          style={{
            fontFamily: "var(--ff-display)",
            fontWeight: 500,
            fontSize: "clamp(46px, 7.6vw, 86px)",
            lineHeight: 0.99,
            letterSpacing: "-0.012em",
            color: "var(--paper-cream)",
            margin: "0 0 24px",
            maxWidth: "15ch",
          }}
        >
          Tell us who you are.<br />
          We&rsquo;ll show you where the{" "}
          <em style={{ color: "var(--gold-soft)", fontStyle: "italic", fontWeight: 500 }}>money</em> is hiding.
        </h1>

        <p
          className="fade-up-2"
          style={{
            fontSize: 19, lineHeight: 1.55,
            color: "rgba(253,252,248,0.80)",
            maxWidth: 600, margin: "0 0 34px",
          }}
        >
          Business owner, restaurant operator, agent, employee, or family — one ecosystem,
          six doors. Pick yours and the desk routes you to the exact next move. We don&rsquo;t sell.
          We <em style={{ fontFamily: "var(--ff-display)", fontStyle: "italic", color: "var(--gold-soft)" }}>find</em>.
        </p>

        <div className="fade-up-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href="#paths"
            className="btn-primary"
            aria-label="Choose your path"
            onClick={() => track("cta_clicked_choose_path", { source: "hero" })}
          >
            Choose your path&nbsp;↓
          </a>
          <a
            href={sitDown.url}
            data-frame="modal"
            className="btn-ghost-ink"
            onClick={() => track("cta_clicked_sit_down", { source: "hero", href: sitDown.url })}
          >
            Book the Six Figure Sit Down
          </a>
        </div>

        <div className="fade-up-4" style={{ marginTop: 24 }}>
          <a
            href={`${vip.url}?source=hub-hero&audience=vip`}
            data-frame="modal"
            onClick={() => track("cta_clicked_vip_trip", { source: "hero", href: vip.url })}
            style={{
              fontFamily: "var(--ff-display)", fontStyle: "italic", fontSize: 16,
              color: "var(--gold-soft)", textDecoration: "none",
              borderBottom: "1px solid var(--gold)", paddingBottom: 2,
            }}
          >
            <span style={{ marginRight: 6 }}>★</span>
            Already sat down? <em style={{ fontStyle: "italic" }}>Your VIP Trip awaits</em>&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}
