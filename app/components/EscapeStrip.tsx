/* =========================================================================
   EscapeStrip — E-Estate "escape" hero, sits at the very top.
   Business cards point to itsownlymoney.com and Dave pitches E-Estate first,
   so card traffic lands here before the two Breakthrough doors.
   Navy ground, gold accents, red/gold CTA (matches the "because" TrapDoor red).
   ========================================================================= */

const PLAN_URL = "https://because.itsownlymoney.com/";

export default function EscapeStrip() {
  return (
    <section
      aria-label="Your escape date"
      style={{
        background:
          "radial-gradient(120% 140% at 50% 0%, #16294a 0%, var(--ink) 46%, var(--ink-deep) 100%)",
        borderBottom: "1px solid rgba(184,150,90,0.45)",
        padding: "64px 24px 60px",
        textAlign: "center",
        position: "relative",
        zIndex: 70,
      }}
    >
      <div className="container" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div
          className="mono"
          style={{ color: "var(--gold-soft)", marginBottom: 20, letterSpacing: "0.24em" }}
        >
          <span className="hairline-rule" />E-ESTATE · DIGITAL REAL ESTATE
        </div>

        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5.4vw, 60px)",
            lineHeight: 1.04,
            letterSpacing: "-0.005em",
            color: "var(--paper-cream)",
            margin: "0 0 18px",
            fontVariantNumeric: "lining-nums tabular-nums",
          }}
        >
          It&rsquo;s not <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>if</em> you
          escape the 9-to-5 — it&rsquo;s{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>when.</em>
        </h2>

        <p
          style={{
            fontFamily: "var(--ff-display)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2.4vw, 23px)",
            lineHeight: 1.5,
            color: "rgba(253,252,248,0.82)",
            margin: "0 auto 34px",
            maxWidth: 560,
          }}
        >
          Real estate income that pays daily. See your escape date.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="escape-cue">
            Push the big red button&nbsp;&darr;
          </span>
          <a href={PLAN_URL} className="escape-link">
            The Escape Plan&nbsp;&rarr;
          </a>
        </div>
      </div>

      <style>{`
        .escape-cue {
          display: inline-block;
          font-family: var(--ff-body);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--gold-soft);
        }
        .escape-link {
          font-family: var(--ff-display);
          font-style: italic;
          font-size: 16px;
          color: var(--gold-soft);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 2px;
          letter-spacing: 0.01em;
          transition: color 0.15s ease;
        }
        .escape-link:hover { color: var(--paper-cream); }
      `}</style>
    </section>
  );
}
