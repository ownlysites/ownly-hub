import PathCard from "./PathCard";

const CARDS = [
  {
    eyebrow: "FOR THE OWNER",
    headlinePre: "Find the",
    headlineItalic: "capital",
    headlinePost: " your bank never mentioned.",
    subhead: "Credits, funding, AI agents, marketing systems. Built for $200K–$10M operators.",
    cta: "Explore Breakthrough",
    href: "https://the-ownly-breakthrough.vercel.app/?source=hub&audience=business",
    image: "/hero/business.jpg",
    loop: "/loops/business.mp4",
    audience: "business" as const,
  },
  {
    eyebrow: "FOR THE PROFESSIONAL & THE FAMILY",
    headlinePre: "Real wealth",
    headlineItalic: "moves",
    headlinePost: " between paychecks.",
    subhead: "Real estate residuals, $0-down purchase, debt acceleration, tax recovery, gold + bonds, the 5-Year Wealth Plan.",
    cta: "Open WealthPath",
    href: "https://itsownlymoney.vercel.app/?source=hub&audience=wealth",
    image: "/hero/individual.jpg",
    loop: "/loops/individual.mp4",
    audience: "individual" as const,
  },
  {
    eyebrow: "★ 6 FIGURE SIT DOWN ALUMNI",
    headlinePre: "The trip",
    headlineItalic: "is part of",
    headlinePost: " the Sit Down.",
    subhead: "Six destinations, the Ownly ONCE Loyalty Club, and one million ongoing discounts. A thank-you for sitting down.",
    cta: "Open VIP Trip",
    href: "https://ownly-vip-trip.vercel.app/?source=hub&audience=vip",
    image: "/hero/vip.avif",
    loop: "/loops/vip.mp4",
    audience: "vip" as const,
  },
];

export default function PathsSection() {
  return (
    <section id="paths" style={{ background: "var(--paper-cream)", padding: "120px 0 100px" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 22 }}>
          <span className="hairline-rule" />THREE PATHS · ONE ECOSYSTEM
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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 380px))",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {CARDS.map((c, i) => (
          <PathCard key={c.audience} {...c} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
