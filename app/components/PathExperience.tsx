"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import PathSelector from "./PathSelector";
import PathResultPanel from "./PathResultPanel";
import { pathById, pathBySlug } from "../data/audiencePaths";
import { PATH_STORAGE_KEY, SET_PATH_EVENT, track } from "../lib/hub";

/* The concierge core: identity selector + dynamic result panel.
   - ?path=business|restaurant|self-employed|household|vip|all preloads a path
   - selection persists in localStorage
   - external components (Header, StickyMobileCTA) select via SET_PATH_EVENT */
export default function PathExperience() {
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const select = useCallback((id: string, opts: { scroll?: boolean; silent?: boolean } = {}) => {
    const path = pathById(id);
    if (!path) return;
    setSelected(path.id);
    try { localStorage.setItem(PATH_STORAGE_KEY, path.id); } catch {}
    if (!opts.silent) track(`path_selected_${path.id}`, { audience: path.id });
    if (opts.scroll) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  // Initial load: query param wins, then localStorage.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("path");
    const fromQuery = pathBySlug(q);
    if (fromQuery) {
      select(fromQuery.id, { silent: false, scroll: true });
      return;
    }
    try {
      const stored = pathById(localStorage.getItem(PATH_STORAGE_KEY));
      if (stored) select(stored.id, { silent: true });
    } catch {}
  }, [select]);

  // Header / sticky bar can request a path from anywhere on the page.
  useEffect(() => {
    const onSet = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      select(id, { scroll: true });
    };
    window.addEventListener(SET_PATH_EVENT, onSet);
    return () => window.removeEventListener(SET_PATH_EVENT, onSet);
  }, [select]);

  return (
    <section id="paths" style={{ background: "var(--paper-cream)", padding: "96px 0 90px", scrollMarginTop: 72 }}>
      <div className="container" style={{ textAlign: "center", marginBottom: 44 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          <span className="hairline-rule" />SIX PATHS · ONE ECOSYSTEM
        </div>
        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 52px)",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Which one is <em style={{ color: "var(--gold-dark)", fontStyle: "italic", fontWeight: 500 }}>you</em>?
        </h2>
        <p style={{ color: "var(--text-mute)", fontSize: 16, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.55 }}>
          Pick your seat. The concierge desk rearranges itself around you — no forms, no funnels, no leaving this page.
        </p>
      </div>
      <div className="container" ref={panelRef} style={{ scrollMarginTop: 84 }}>
        <PathSelector selected={selected} onSelect={(id) => select(id, { scroll: true })} />
        <PathResultPanel path={pathById(selected) ?? null} />
      </div>
    </section>
  );
}
