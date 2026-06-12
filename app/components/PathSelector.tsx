"use client";
import { useRef } from "react";
import { PATHS } from "../data/audiencePaths";
import { PATH_ICONS } from "./PathIcons";

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

/* Identity path selector — six concierge routing cards.
   Radiogroup semantics with roving tabindex + arrow-key navigation. */
export default function PathSelector({ selected, onSelect }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % PATHS.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + PATHS.length) % PATHS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = PATHS.length - 1;
    if (next >= 0) {
      e.preventDefault();
      refs.current[next]?.focus();
    }
  }

  const focusIndex = Math.max(0, PATHS.findIndex((p) => p.id === selected));

  return (
    <div
      role="radiogroup"
      aria-label="Choose your path"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
        gap: 14,
      }}
    >
      {PATHS.map((p, i) => {
        const active = selected === p.id;
        return (
          <button
            key={p.id}
            ref={(el) => { refs.current[i] = el; }}
            role="radio"
            aria-checked={active}
            tabIndex={i === focusIndex ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => onSelect(p.id)}
            className="path-chip"
            data-active={active || undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
              textAlign: "left",
              padding: "20px 18px 18px",
              minHeight: 150,
              borderRadius: "var(--radius, 16px)",
              border: active ? "1px solid var(--gold)" : "1px solid var(--hairline)",
              background: active ? "var(--paper-bone)" : "var(--paper-cream)",
              boxShadow: active
                ? "0 10px 28px rgba(184,150,90,0.22), inset 0 0 0 1px var(--gold)"
                : "0 1px 0 var(--hairline)",
              color: "var(--ink)",
              cursor: "pointer",
              fontFamily: "var(--ff-body)",
              transition: "border-color .2s ease, box-shadow .2s ease, background .2s ease, transform .15s ease",
            }}
          >
            <span style={{ color: active ? "var(--gold-dark)" : "var(--gold)" }}>
              {PATH_ICONS[p.id]}
            </span>
            <span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.25 }}>{p.label}</span>
            <span style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--text-mute)", flex: 1 }}>
              {p.card}
            </span>
            <span
              className="mono"
              style={{ color: "var(--gold-dark)", letterSpacing: "0.14em", fontSize: 10 }}
            >
              {active ? "SELECTED ✓" : p.cardCta + " →"}
            </span>
          </button>
        );
      })}
      <style>{`
        .path-chip:hover { border-color: var(--gold); transform: translateY(-2px); }
        .path-chip:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
      `}</style>
    </div>
  );
}
