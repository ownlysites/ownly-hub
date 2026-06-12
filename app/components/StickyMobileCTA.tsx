"use client";
import { getLink } from "../data/links";
import { openVault, track } from "../lib/hub";

/* Mobile sticky bottom bar: Choose Path · All Tools · Book Dave.
   Hidden on desktop via .sticky-cta media query (globals.css). */
export default function StickyMobileCTA() {
  const sitDown = getLink("sit_down");

  function choosePath() {
    track("cta_clicked_choose_path", { source: "sticky_bar" });
    document.getElementById("paths")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="sticky-cta" aria-label="Quick actions">
      <button onClick={choosePath} className="sticky-cta-btn">
        Choose Path
      </button>
      <button
        onClick={() => openVault("sticky_bar")}
        className="sticky-cta-btn"
      >
        All Tools
      </button>
      <a
        href={sitDown.url}
        data-frame="modal"
        className="sticky-cta-btn sticky-cta-gold"
        onClick={() => track("cta_clicked_sit_down", { source: "sticky_bar", href: sitDown.url })}
      >
        Book Dave
      </a>
    </nav>
  );
}
