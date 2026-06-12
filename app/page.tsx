import WonderTrustBanner from "./components/WonderTrustBanner";
import ConciergeTerminal from "./components/ConciergeTerminal";
import ConciergeFrame from "./components/ConciergeFrame";
import SeoSchema from "./components/SeoSchema";
import AuthorityBlock from "./components/AuthorityBlock";

/* The Concierge Terminal IS the homepage — a gated, no-scroll command center.
   The AuthorityBlock (Dave credentials + full crawlable tool index) renders
   server-side but visually hidden, so crawlers and screen readers get every
   link even though the terminal is JS-gated. */
export default function Page() {
  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <WonderTrustBanner />
      <main style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <ConciergeTerminal />
        <div className="sr-only">
          <AuthorityBlock />
        </div>
      </main>
      <ConciergeFrame />
      <SeoSchema />
    </div>
  );
}
