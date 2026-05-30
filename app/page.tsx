import Header from "./components/Header";
import WonderTrustBanner from "./components/WonderTrustBanner";
import Hero from "./components/Hero";
import TrapDoor from "./components/TrapDoor";
import PathsSection from "./components/PathsSection";

// Flip to true + push to go live. Staged 2026-05-30 — NOT live yet.
const SHOW_TRAP_DOOR = true;
import PullQuote from "./components/PullQuote";
import CTAStrip from "./components/CTAStrip";
import Footer from "./components/Footer";
import ConciergeFrame from "./components/ConciergeFrame";

export default function Page() {
  return (
    <>
      <WonderTrustBanner />
      <Header />
      <main>
        <Hero />
        {SHOW_TRAP_DOOR && <TrapDoor />}
        <PathsSection />
        <PullQuote />
        <CTAStrip />
      </main>
      <Footer />
      <ConciergeFrame />
    </>
  );
}
