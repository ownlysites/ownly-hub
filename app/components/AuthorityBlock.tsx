import { VAULT_CATEGORIES, getLink, linksByCategory } from "../data/links";

/* Authority + static SEO content. Server-rendered so every tool link is
   crawlable even though the interactive vault is a client drawer. */
export default function AuthorityBlock() {
  const sitDown = getLink("sit_down");
  return (
    <section style={{ background: "var(--paper-cream)", padding: "90px 0 80px", borderTop: "1px solid var(--hairline)" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          <span className="hairline-rule" />THE MAN AT THE DESK
        </div>
        <h2
          style={{
            fontFamily: "var(--ff-display)", fontWeight: 500,
            fontSize: "clamp(32px, 4.5vw, 48px)", lineHeight: 1.08, margin: "0 0 18px",
          }}
        >
          Dave Ivery doesn&rsquo;t sell. He <em style={{ color: "var(--gold-dark)", fontStyle: "italic", fontWeight: 500 }}>finds</em>.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--text-mute)", maxWidth: 640, margin: "0 0 22px" }}>
          Certified Financial Coach. Certified Cash Flow Specialist. AI-Certified Consultant.
          Author. Member of the Personal Finance Speakers Association. Creator of Ownly ONCE —
          the ecosystem built on one idea: the money is already there. Someone just has to find it.
        </p>
        <a
          href={sitDown.url}
          data-frame="modal"
          className="btn-secondary"
          style={{ fontSize: 13.5 }}
        >
          Book the Six Figure Sit Down&nbsp;→
        </a>

        {/* Static, crawlable index of the ecosystem — mirrors the vault. */}
        <div style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: "var(--ff-display)", fontWeight: 500,
              fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.1, margin: "0 0 10px",
            }}
          >
            The Ownly ONCE ecosystem, on paper
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-mute)", margin: "0 0 26px", maxWidth: 620, lineHeight: 1.6 }}>
            Business credit and capital. Restaurant profit recovery. Household cash flow and legacy.
            Self-employed escape plans. AI, web, and marketing systems. Every tool below also lives
            in the All-Tools vault.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 20,
            }}
          >
            {VAULT_CATEGORIES.map((cat) => {
              const links = linksByCategory(cat.key);
              if (!links.length) return null;
              return (
                <div key={cat.key}>
                  <h3 className="mono" style={{ color: "var(--gold-dark)", margin: "0 0 10px", fontSize: 11 }}>
                    {cat.title}
                  </h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 7 }}>
                    {links.map((l) =>
                      l.pending ? (
                        <li key={l.id} style={{ fontSize: 13.5, color: "var(--text-mute)" }}>
                          {l.label} <span className="mono" style={{ fontSize: 8.5, color: "var(--gold-dark)" }}>SOON</span>
                        </li>
                      ) : (
                        <li key={l.id}>
                          <a
                            href={l.url}
                            data-frame={l.frame ? "modal" : undefined}
                            style={{ fontSize: 13.5, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--hairline)" }}
                          >
                            {l.label}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
