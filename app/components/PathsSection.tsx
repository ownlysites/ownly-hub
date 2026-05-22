import PathCard from "./PathCard";

const CARDS = [
  {
    eyebrow: "FOR THE BUSINESS OWNER",
    headlinePre: "Find the",
    headlineItalic: "capital",
    headlinePost: " your bank never mentioned.",
    subhead: "Hidden credits, 0% APR business funding, AI agents, and marketing systems. Built for $200K–$10M operators who refuse to leave money on the table.",
    cta: "Open The Business Breakthrough",
    href: "https://the-ownly-breakthrough.vercel.app/?source=hub&audience=business",
    image: "/hero/business.jpg",
    loop: "/loops/business.mp4",
    audience: "business" as const,
  },
  {
    eyebrow: "FOR THE INDIVIDUAL & THE FAMILY",
    headlinePre: "You work hard.",
    headlineItalic: "Your money doesn't.",
    headlinePost: " Yet.",
    subhead: "The patented Income Snowball, Spendthrift Trust tax strategy, 8.5% bonds, healthcare ecosystem, and Family Legacy Score. For households ready to flip the order.",
    cta: "Open The Money Breakthrough",
    href: "https://ownly-money-breakthrough.vercel.app/?source=hub&audience=individual",
    image: "/hero/individual.jpg",
    loop: "/loops/individual.mp4",
    audience: "individual" as const,
  },
];

export default function PathsSection() {
  return (
    <section id="paths" style={{ background: "var(--paper-cream)", padding: "120px 0 100px" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 22 }}>
          <span className="hairline-rule" />TWO BREAKTHROUGHS · ONE ECOSYSTEM
        </div>
        <h2 style={{
          fontFamily: "var(--ff-display)", fontWeight: 500,
          fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.005em",
          margin: 0,
        }}>
          Tell us who you are. We&rsquo;ll show you the <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>money</em>.
        </h2>
      </div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 460px))",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {CARDS.map((c, i) => (
          <PathCard key={c.audience} {...c} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
