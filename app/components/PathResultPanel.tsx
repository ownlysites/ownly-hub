"use client";
import type { AudiencePath } from "../data/audiencePaths";
import { getLink } from "../data/links";
import { openVault, track } from "../lib/hub";

interface Props {
  path: AudiencePath | null;
}

/* Dynamic result panel — concierge answer for the selected identity.
   Updates headline / explanation / steps / CTAs in place, no navigation. */
export default function PathResultPanel({ path }: Props) {
  return (
    <div aria-live="polite" style={{ minHeight: path ? undefined : 0 }}>
      {path && (
          <div
            key={path.id}
            className="fade-up"
            style={{
              marginTop: 36,
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-lg, 24px)",
              background: "var(--paper-bone)",
              boxShadow: "0 18px 50px rgba(15,31,57,0.07)",
              padding: "clamp(28px, 4vw, 52px)",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="hairline-rule" />
              YOUR PATH · {path.label.toUpperCase()}
            </div>

            <h3
              style={{
                fontFamily: "var(--ff-display)",
                fontWeight: 500,
                fontSize: "clamp(30px, 4.4vw, 44px)",
                lineHeight: 1.05,
                margin: "0 0 16px",
              }}
            >
              {path.headline}
            </h3>

            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "var(--text-mute)", maxWidth: 640, margin: "0 0 28px" }}>
              {path.explanation}
            </p>

            <ol style={{ listStyle: "none", margin: "0 0 30px", padding: 0, display: "grid", gap: 14, maxWidth: 640 }}>
              {path.steps.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--ff-display)",
                      fontVariantNumeric: "lining-nums tabular-nums",
                      fontSize: 26,
                      fontWeight: 600,
                      color: "var(--gold-dark)",
                      minWidth: 28,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.55 }}>{s}</span>
                </li>
              ))}
            </ol>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <PrimaryCTA path={path} />
              {path.secondary.map((id) => (
                <SecondaryCTA key={id} linkId={id} audience={path.id} />
              ))}
            </div>

            <div className="mono" style={{ color: "var(--text-mute)", fontSize: 10.5 }}>
              {path.proof}
            </div>
          </div>
      )}
    </div>
  );
}

function PrimaryCTA({ path }: { path: AudiencePath }) {
  if (path.primary.linkId === "vault") {
    return (
      <button
        className="btn-primary"
        style={{ fontSize: 14 }}
        onClick={() => {
          track("ecosystem_vault_opened", { audience: path.id, source: "path_panel" });
          openVault("path_panel");
        }}
      >
        {path.primary.label}&nbsp;→
      </button>
    );
  }
  const link = getLink(path.primary.linkId);
  return (
    <a
      href={link.url}
      data-frame={link.frame ? "modal" : undefined}
      className="btn-primary"
      style={{ fontSize: 14 }}
      onClick={() => track(`cta_clicked_${link.id}`, { audience: path.id, href: link.url, label: link.label })}
    >
      {path.primary.label}&nbsp;→
    </a>
  );
}

function SecondaryCTA({ linkId, audience }: { linkId: string; audience: string }) {
  const link = getLink(linkId);
  if (link.pending) {
    return (
      <span
        className="mono"
        aria-disabled="true"
        title="Link coming soon"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 18px",
          borderRadius: 999,
          border: "1px dashed var(--hairline)",
          color: "var(--text-mute)",
          letterSpacing: "0.12em",
          fontSize: 10,
          cursor: "default",
        }}
      >
        {link.label} · SOON
      </span>
    );
  }
  return (
    <a
      href={link.url}
      data-frame={link.frame ? "modal" : undefined}
      target={!link.frame && link.openInNewTab ? "_blank" : undefined}
      rel={!link.frame && link.openInNewTab ? "noopener noreferrer" : undefined}
      className="mono cta-pill"
      style={{ fontSize: 10, padding: "11px 18px" }}
      onClick={() => track(`cta_clicked_${link.id}`, { audience, href: link.url, label: link.label })}
    >
      {link.label}
    </a>
  );
}
