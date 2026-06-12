import Header from "./components/Header";
import WonderTrustBanner from "./components/WonderTrustBanner";
import Hero from "./components/Hero";
import TrapDoor from "./components/TrapDoor";
import PathExperience from "./components/PathExperience";
import PullQuote from "./components/PullQuote";
import AuthorityBlock from "./components/AuthorityBlock";
import CTAStrip from "./components/CTAStrip";
import Footer from "./components/Footer";
import ConciergeFrame from "./components/ConciergeFrame";
import EcosystemVault from "./components/EcosystemVault";
import StickyMobileCTA from "./components/StickyMobileCTA";
import SeoSchema from "./components/SeoSchema";

// Flip to true + push to go live. Staged 2026-05-30 — NOT live yet.
const SHOW_TRAP_DOOR = true;

export default function Page() {
  return (
    <>
      <WonderTrustBanner />
      <Header />
      <main>
        <Hero />
        <PathExperience />
        {SHOW_TRAP_DOOR && <TrapDoor />}
        <PullQuote />
        <AuthorityBlock />
        <CTAStrip />
      </main>
      <Footer />
      <EcosystemVault />
      <StickyMobileCTA />
      <ConciergeFrame />
      <SeoSchema />
    </>
  );
}
