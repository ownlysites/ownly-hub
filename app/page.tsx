import Header from "./components/Header";
import WonderTrustBanner from "./components/WonderTrustBanner";
import Hero from "./components/Hero";
import PathsSection from "./components/PathsSection";
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
        <PathsSection />
        <PullQuote />
        <CTAStrip />
      </main>
      <Footer />
      <ConciergeFrame />
    </>
  );
}
