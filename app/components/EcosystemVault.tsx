"use client";
import { useEffect, useRef, useState } from "react";
import { VAULT_CATEGORIES, linksByCategory } from "../data/links";
import { OPEN_VAULT_EVENT, track } from "../lib/hub";

/* The All-Tools Vault — categorized side drawer. Editorial card index,
   not a Linktree. Opens via OPEN_VAULT_EVENT from nav / sticky bar / panel. */
export default function EcosystemVault() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      lastFocus.current = document.activeElement as HTMLElement;
      const source = (e as CustomEvent<string>).detail || "unknown";
      track("ecosystem_vault_opened", { source });
      setOpen(true);
    };
    window.addEventListener(OPEN_VAULT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_VAULT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        // Simple focus trap inside the drawer.
        const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All Ownly tools"
      style={{ position: "fixed", inset: 0, zIndex: 9500 }}
    >
      <button
        aria-label="Close the vault"
        onClick={() => setOpen(false)}
        style={{
          position: "absolute", inset: 0, border: 0, cursor: "pointer",
          background: "rgba(15,31,57,0.55)", backdropFilter: "blur(4px)",
        }}
      />
      <div
        ref={drawerRef}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(560px, 100vw)",
          background: "var(--paper-cream)",
          borderLeft: "1px solid var(--gold)",
          boxShadow: "-30px 0 80px rgba(10,14,26,0.35)",
          display: "flex", flexDirection: "column",
          animation: "vault-in .3s ease-out",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 26px", borderBottom: "1px solid var(--hairline)",
            background: "var(--paper-warm)",
          }}
        >
          <div>
            <div className="eyebrow"><span className="hairline-rule" />THE VAULT</div>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 500, marginTop: 4 }}>
              Every tool. One drawer.
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="mono"
            style={{
              border: "1px solid var(--hairline)", background: "transparent",
              color: "var(--ink)", borderRadius: 999, padding: "9px 16px",
              cursor: "pointer", letterSpacing: "0.14em", fontSize: 10,
            }}
          >
            CLOSE ✕
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "10px 26px 40px", flex: 1 }}>
          {VAULT_CATEGORIES.map((cat) => {
            const links = linksByCategory(cat.key);
            if (!links.length) return null;
            return (
              <section key={cat.key} aria-label={cat.title} style={{ paddingTop: 26 }}>
                <h3
                  className="mono"
                  style={{ color: "var(--gold-dark)", margin: "0 0 12px", fontSize: 11 }}
                >
                  {cat.title}
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
                  {links.map((l) =>
                    l.pending ? (
                      <li
                        key={l.id}
                        aria-disabled="true"
                        style={{
                          border: "1px dashed var(--hairline)", borderRadius: 12,
                          padding: "12px 16px", opacity: 0.65,
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{l.label}</span>
                        <span className="mono" style={{ color: "var(--gold-dark)", marginLeft: 10, fontSize: 9 }}>
                          COMING SOON
                        </span>
                        <div style={{ fontSize: 12.5, color: "var(--text-mute)", lineHeight: 1.45 }}>{l.desc}</div>
                      </li>
                    ) : (
                      <li key={l.id}>
                        <a
                          href={l.url}
                          data-frame={l.frame ? "modal" : undefined}
                          target={!l.frame && l.openInNewTab ? "_blank" : undefined}
                          rel={!l.frame && l.openInNewTab ? "noopener noreferrer" : undefined}
                          onClick={() => track(`cta_clicked_${l.id}`, { source: "vault", href: l.url, label: l.label })}
                          style={{
                            display: "block",
                            border: "1px solid var(--hairline)", borderRadius: 12,
                            padding: "12px 16px", textDecoration: "none", color: "var(--ink)",
                            background: "var(--paper-bone)",
                            transition: "border-color .15s ease, transform .15s ease",
                          }}
                          className="vault-link"
                        >
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{l.label}</span>
                          <span aria-hidden style={{ color: "var(--gold)", marginLeft: 8 }}>→</span>
                          <div style={{ fontSize: 12.5, color: "var(--text-mute)", lineHeight: 1.45 }}>{l.desc}</div>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes vault-in { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }
        .vault-link:hover { border-color: var(--gold); transform: translateX(-2px); }
        .vault-link:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
      `}</style>
    </div>
  );
}
