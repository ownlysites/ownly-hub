"use client";
/* =========================================================================
   CONCIERGE TERMINAL — faithful port of the approved prototype
   (hub-command-center.html). Gated, no-scroll command center:
   boot → console of 5 doors → sector takeover → back.

   Infra reuse (per HUB_GOLIVE_HANDOFF.md):
   - CTAs carry data-frame="modal" → ConciergeFrame previews frameable
     hosts in-iframe, toasts the rest. openInNewTab non-frame links get
     a plain target="_blank".
   - Analytics: track('path_selected_<id>') on door open,
     track('cta_clicked_<id>') on CTA — via lib/hub.ts → /api/route-click.
   - ?path= preload + localStorage persistence (PathExperience logic).
   ========================================================================= */
import { useCallback, useEffect, useRef, useState } from "react";
import { PATHS, pathById, pathBySlug, type AudiencePath, type SectorCTA } from "../data/audiencePaths";
import { getLink } from "../data/links";
import { PATH_STORAGE_KEY, track } from "../lib/hub";

const BOOT_LINES = [
  "Powering the concierge…",
  "Linking the ecosystem…",
  "Your private desk is ready.",
  "Own Nothing. Control Everything.",
];

export default function ConciergeTerminal() {
  const [booted, setBooted] = useState(false);
  const [bootLine, setBootLine] = useState("");
  const [bootReady, setBootReady] = useState(false);
  const [active, setActive] = useState<AudiencePath | null>(null);
  const [stageLive, setStageLive] = useState(false); // drives bar/gauge animation
  const rootRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLCanvasElement>(null);
  const keyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [clock, setClock] = useState("--:--:-- UTC");

  /* ---- starfield ---- */
  useEffect(() => {
    const cv = starRef.current, root = rootRef.current;
    if (!cv || !root) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, raf = 0, t = 0;
    let stars: { x: number; y: number; z: number; r: number; tw: number }[] = [];
    function resize() {
      W = cv!.width = root!.clientWidth;
      H = cv!.height = root!.clientHeight;
      stars = [];
      const n = Math.min(150, Math.floor((W * H) / 12000));
      for (let i = 0; i < n; i++)
        stars.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), r: Math.random() * 1.4 + 0.2, tw: Math.random() * Math.PI * 2 });
    }
    function draw() {
      t += 0.01;
      ctx!.clearRect(0, 0, W, H);
      const g = ctx!.createRadialGradient(W * 0.5, H * 0.32, 0, W * 0.5, H * 0.32, Math.max(W, H) * 0.8);
      g.addColorStop(0, "#11213c"); g.addColorStop(0.5, "#0A1426"); g.addColorStop(1, "#060B16");
      ctx!.fillStyle = g; ctx!.fillRect(0, 0, W, H);
      for (const s of stars) {
        const a = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t + s.tw)) * s.z;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r * (0.6 + s.z), 0, 7);
        ctx!.fillStyle = `rgba(220,195,140,${a.toFixed(2)})`;
        ctx!.fill();
        s.y -= 0.06 * (s.z + 0.3);
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  /* ---- clock ---- */
  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19) + " UTC");
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* ---- boot sequence ---- */
  useEffect(() => {
    let li = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      if (li < BOOT_LINES.length) {
        setBootLine(BOOT_LINES[li++]);
        timers.push(setTimeout(step, li === BOOT_LINES.length ? 700 : 620));
      } else setBootReady(true);
    };
    timers.push(setTimeout(step, 400));
    timers.push(setTimeout(() => setBootReady(true), 3200)); // failsafe
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ---- open / close sector ---- */
  const openStage = useCallback((id: string, source: string) => {
    const p = pathById(id);
    if (!p) return;
    setActive(p);
    setStageLive(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setStageLive(true)));
    try { localStorage.setItem(PATH_STORAGE_KEY, p.id); } catch {}
    track(`path_selected_${p.id}`, { audience: p.id, source });
    try { history.replaceState(null, "", "?path=" + p.id); } catch {}
  }, []);

  const closeStage = useCallback(() => {
    setActive(null);
    setStageLive(false);
    try { history.replaceState(null, "", "/"); } catch {}
  }, []);

  /* ---- enter: query param wins, then localStorage ---- */
  const enter = useCallback(() => {
    setBooted(true);
    const q = new URLSearchParams(window.location.search).get("path");
    const fromQuery = pathBySlug(q);
    if (fromQuery) { setTimeout(() => openStage(fromQuery.id, "query"), 500); return; }
    try {
      const stored = pathById(localStorage.getItem(PATH_STORAGE_KEY));
      if (stored) setTimeout(() => openStage(stored.id, "restore"), 500);
    } catch {}
  }, [openStage]);

  /* ---- Esc closes sector (unless the ConciergeFrame modal is open) ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.querySelector("#ownly-concierge.open, .oc-toast.show")) return;
      closeStage();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [closeStage]);

  /* ---- roving tabindex on the door keys ---- */
  function onKeyNav(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % PATHS.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + PATHS.length) % PATHS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = PATHS.length - 1;
    if (next >= 0) { e.preventDefault(); keyRefs.current[next]?.focus(); }
  }

  const accent = active?.accent ?? "var(--gold-soft)";
  const idx = active ? PATHS.indexOf(active) : -1;
  const gaugePct = active
    ? Math.min(95, parseFloat(active.gauge[0]) > 100 ? 80 : (active.bars[0][1] + active.bars[2][1]) / 2)
    : 0;

  return (
    <div ref={rootRef} className="ct-root" style={{ "--accent": accent } as React.CSSProperties}>
      <canvas ref={starRef} className="ct-star" aria-hidden />
      <div className="ct-vignette" aria-hidden /><div className="ct-grain" aria-hidden /><div className="ct-scan" aria-hidden />
      <span className="ct-bracket tl" aria-hidden /><span className="ct-bracket tr" aria-hidden />
      <span className="ct-bracket bl" aria-hidden /><span className="ct-bracket br" aria-hidden />

      <div className="ct-hud top">
        <span className="brand">Ownly ONCE</span>
        <span className="live"><span className="dot" aria-hidden />
          <span>{active ? active.label : "Concierge online"}</span>
        </span>
        <span className="num">{clock}</span>
      </div>
      <div className="ct-hud bot">
        <span>{active ? `Sector 0${idx + 1} · ${active.id} channel` : "Select a door · your world only"}</span>
        <span>Own nothing · Control everything</span>
      </div>

      {/* BOOT */}
      <div className={`ct-boot${booted ? " gone" : ""}`}>
        <div className="bO" aria-hidden>O</div>
        <div className="bt" aria-live="polite">{bootLine}</div>
        <button className={`benter${bootReady ? " show" : ""}`} onClick={enter}>
          Enter the ecosystem →
        </button>
      </div>

      {/* CONSOLE */}
      <section className={`ct-view ct-console${booted && !active ? " active" : ""}${active ? " dismissed" : ""}`}>
        <div className="ct-reticle" aria-hidden>
          <svg viewBox="0 0 400 400" fill="none" stroke="var(--gold)" strokeWidth="0.5">
            <circle cx="200" cy="200" r="120" /><circle cx="200" cy="200" r="160" />
            <circle cx="200" cy="200" r="190" strokeDasharray="2 8" />
            <path d="M200 10V70M200 330V390M10 200H70M330 200H390" />
            <circle cx="200" cy="200" r="80" strokeDasharray="1 6" />
          </svg>
        </div>
        <div className="ct-console-inner">
          <div className="ct-eyebrow">Ownly ONCE · Concierge desk · MMXXVI</div>
          <h1>We find the money to<br />fund your <em>dreams</em>.</h1>
          <p className="ct-sub">
            Most of us are quietly losing money we never see — to leaks, overpaid bills, missed
            credits. Tell us who you are, push your door, and in minutes we find it — then point
            it at the life you actually want.
          </p>
          <div className="ct-keys" role="group" aria-label="Choose your path">
            {PATHS.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => { keyRefs.current[i] = el; }}
                className="ct-key"
                style={{ "--k": p.accent } as React.CSSProperties}
                aria-label={`Open ${p.label}`}
                tabIndex={i === 0 ? 0 : -1}
                onKeyDown={(e) => onKeyNav(e, i)}
                onClick={() => openStage(p.id, "door")}
              >
                <div className="kid num">SECTOR 0{i + 1}</div>
                <div className="kic"><svg viewBox="0 0 32 32" dangerouslySetInnerHTML={{ __html: p.icon }} /></div>
                <h3>{p.label}</h3>
                <p>{p.card}</p>
                <div className="enter">Open sector<span className="ar" aria-hidden>→</span></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE */}
      <section className={`ct-view ct-stage${active ? " active" : ""}`} aria-live="polite">
        {active && (
          <div className="ct-stage-inner">
            <button className="ct-back" onClick={closeStage}>◀ Back to the doors</button>
            <div className="ct-stage-grid">
              <div>
                <div className="ct-stage-id num">0{idx + 1}</div>
                <div className="ct-stage-eyebrow">Sector · {active.id}</div>
                <h2>{active.headline}</h2>
                <p className="ct-stage-exp">{active.explanation}</p>
                <ul className="ct-steps">
                  {active.steps.map((s, i) => (
                    <li key={i} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                      <span className="sn num">0{i + 1}</span>
                      <span className="st">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="ct-ctas">
                  <SectorLink cta={active.primary} audience={active.id} className="ct-cta-primary" arrow />
                  {active.secondary.map((c) => (
                    <SectorLink key={c.linkId} cta={c} audience={active.id} className="ct-pill" />
                  ))}
                </div>
                <div className="ct-proof">{active.proof}</div>
              </div>
              <aside className="ct-telemetry">
                <div className="tlabel">Sector telemetry</div>
                <div className="ct-gauge">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(184,150,90,.15)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" strokeWidth="6"
                      strokeLinecap="round" strokeDasharray="264"
                      strokeDashoffset={stageLive ? 264 - (264 * gaugePct) / 100 : 264}
                      style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(.2,.7,.2,1)" }}
                    />
                  </svg>
                  <div className="gv">
                    <div className="gn num">{active.gauge[0]}</div>
                    <div className="gt">{active.gauge[1]}</div>
                  </div>
                </div>
                {active.bars.map(([label, pct]) => (
                  <div className="ct-tbar" key={label}>
                    <div className="tb-l"><span>{label}</span><span className="num">{pct}%</span></div>
                    <div className="tb-t"><div className="tb-f" style={{ width: stageLive ? `${pct}%` : 0 }} /></div>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        )}
      </section>

      <style>{TERMINAL_CSS}</style>
    </div>
  );
}

/* Sector CTA — registry-driven, routed through ConciergeFrame when frameable. */
function SectorLink({ cta, audience, className, arrow }: { cta: SectorCTA; audience: string; className: string; arrow?: boolean }) {
  const link = getLink(cta.linkId);
  const plainNewTab = !link.frame && link.openInNewTab;
  return (
    <a
      href={link.url}
      className={className}
      data-frame={link.frame ? "modal" : undefined}
      target={plainNewTab ? "_blank" : undefined}
      rel={plainNewTab ? "noopener noreferrer" : undefined}
      onClick={() => track(link.trackingId ?? `cta_clicked_${link.id}`, { audience, href: link.url, label: cta.label })}
    >
      {cta.label}{arrow ? " →" : ""}
    </a>
  );
}

/* Prototype CSS, scoped under .ct-root (fixed → absolute so the WonderTrust
   strip can sit above the terminal in the page flow). */
const TERMINAL_CSS = `
.ct-root{position:relative;flex:1;min-height:0;overflow:hidden;background:var(--ink-deep,#060B16);color:#FDFCF8;font-family:var(--ff-body);--mute:#7E8CA3}
.ct-root .num{font-variant-numeric:lining-nums tabular-nums}
.ct-star{position:absolute;inset:0;z-index:0}
.ct-vignette{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(120% 100% at 50% 30%,transparent 40%,rgba(0,0,0,.55) 100%)}
.ct-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.05;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}
.ct-scan{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.4;background:repeating-linear-gradient(0deg,rgba(184,150,90,.025) 0 1px,transparent 1px 3px)}
.ct-bracket{position:absolute;width:46px;height:46px;z-index:6;border:1px solid var(--accent);opacity:.5;transition:border-color .6s}
.ct-bracket.tl{top:18px;left:18px;border-right:0;border-bottom:0}
.ct-bracket.tr{top:18px;right:18px;border-left:0;border-bottom:0}
.ct-bracket.bl{bottom:18px;left:18px;border-right:0;border-top:0}
.ct-bracket.br{bottom:18px;right:18px;border-left:0;border-top:0}
.ct-hud{position:absolute;left:0;right:0;z-index:7;display:flex;align-items:center;justify-content:space-between;padding:22px 30px;font-family:var(--ff-mono);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);pointer-events:none}
.ct-hud.top{top:0}.ct-hud.bot{bottom:0}
.ct-hud .live{display:flex;align-items:center;gap:9px;color:#D4B87A}
.ct-hud .dot{width:7px;height:7px;border-radius:50%;background:#D4B87A;box-shadow:0 0 12px #D4B87A;animation:ct-bp 1.6s ease-in-out infinite}
@keyframes ct-bp{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
.ct-hud .brand{font-family:var(--ff-display);font-size:15px;letter-spacing:.06em;text-transform:none;color:#FDFCF8}
.ct-view{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;padding:90px 24px;opacity:0;visibility:hidden;transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
.ct-view.active{opacity:1;visibility:visible}
.ct-console{transform:scale(1)}
.ct-console.dismissed{opacity:0;visibility:hidden;transform:scale(.92);filter:blur(6px)}
.ct-console-inner{width:min(1060px,100%);text-align:center;max-height:100%;overflow-y:auto}
.ct-reticle{position:absolute;top:50%;left:50%;width:760px;height:760px;margin:-380px 0 0 -380px;z-index:-1;opacity:.18;pointer-events:none}
.ct-reticle svg{width:100%;height:100%;animation:ct-spin 60s linear infinite}
@keyframes ct-spin{to{transform:rotate(360deg)}}
.ct-eyebrow{font-family:var(--ff-mono);font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#D4B87A;opacity:.85}
.ct-console-inner h1{font-family:var(--ff-display);font-weight:500;font-size:clamp(40px,6.4vw,76px);line-height:.98;letter-spacing:-.01em;margin:16px 0 8px;text-shadow:0 0 40px rgba(184,150,90,.25);color:#FDFCF8}
.ct-console-inner h1 em{font-style:italic;color:#D4B87A}
.ct-sub{color:#A9B6CC;font-size:16px;max-width:560px;margin:0 auto 40px;line-height:1.5}
.ct-keys{display:flex;flex-wrap:wrap;justify-content:center;gap:16px}
.ct-keys .ct-key{flex:0 0 calc((100% - 32px)/3)}
@media(max-width:780px){.ct-keys .ct-key{flex-basis:calc((100% - 16px)/2)}}
@media(max-width:480px){.ct-keys .ct-key{flex-basis:100%}}
.ct-key{position:relative;text-align:left;cursor:pointer;border:1px solid rgba(184,150,90,.28);border-radius:14px;padding:22px 20px 18px;background:linear-gradient(160deg,rgba(20,34,60,.66),rgba(10,18,38,.66));backdrop-filter:blur(8px);overflow:hidden;color:#FDFCF8;font-family:var(--ff-body);transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .25s,box-shadow .3s}
.ct-key::before{content:'';position:absolute;inset:0;background:radial-gradient(120% 120% at 0% 0%,rgba(212,184,122,.16),transparent 55%);opacity:0;transition:opacity .3s}
.ct-key::after{content:'';position:absolute;left:0;bottom:0;height:2px;width:100%;background:linear-gradient(90deg,transparent,var(--k,#D4B87A),transparent);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.ct-key:hover,.ct-key:focus-visible{transform:translateY(-5px);border-color:var(--k,#D4B87A);box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 40px -8px var(--k,#D4B87A);outline:none}
.ct-key:focus-visible{outline:2px solid var(--k,#D4B87A);outline-offset:3px}
.ct-key:hover::before,.ct-key:focus-visible::before{opacity:1}
.ct-key:hover::after,.ct-key:focus-visible::after{transform:scaleX(1)}
.ct-key .kid{font-family:var(--ff-mono);font-size:10px;letter-spacing:.2em;color:var(--k,#D4B87A);opacity:.8}
.ct-key .kic{width:42px;height:42px;margin:12px 0 14px;color:var(--k,#D4B87A)}
.ct-key .kic svg{width:42px;height:42px;fill:none;stroke:currentColor;stroke-width:1.4}
.ct-key h3{font-family:var(--ff-display);font-weight:600;font-size:21px;line-height:1.05;color:#FDFCF8}
.ct-key p{font-size:12.5px;color:#9DAAC2;line-height:1.45;margin-top:6px;min-height:36px}
.ct-key .enter{margin-top:14px;font-family:var(--ff-mono);font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--k,#D4B87A);display:flex;align-items:center;gap:7px}
.ct-key .enter .ar{transition:transform .25s}
.ct-key:hover .enter .ar{transform:translateX(5px)}
.ct-stage{transform:scale(1.04)}
.ct-stage.active{transform:scale(1)}
.ct-stage-inner{width:min(980px,100%);position:relative;max-height:100%;overflow-y:auto;padding-top:54px}
.ct-stage-grid{display:grid;grid-template-columns:1fr 230px;gap:40px;align-items:start}
@media(max-width:820px){.ct-stage-grid{grid-template-columns:1fr}.ct-telemetry{display:none}}
.ct-stage-id{font-family:var(--ff-display);font-size:clamp(64px,11vw,120px);font-weight:500;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--accent);opacity:.5;margin-bottom:6px}
.ct-stage-eyebrow{font-family:var(--ff-mono);font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;display:flex;align-items:center;gap:12px}
.ct-stage-eyebrow::before{content:'';width:34px;height:1px;background:var(--accent)}
.ct-stage-inner h2{font-family:var(--ff-display);font-weight:500;font-size:clamp(34px,5.2vw,60px);line-height:1.0;letter-spacing:-.01em;margin-bottom:18px;max-width:16ch;text-shadow:0 0 50px rgba(184,150,90,.2);color:#FDFCF8}
.ct-stage-exp{color:#B4C0D6;font-size:16.5px;line-height:1.6;max-width:600px;margin-bottom:26px}
.ct-steps{list-style:none;display:grid;gap:11px;margin:0 0 28px;padding:0;max-width:600px}
.ct-steps li{display:flex;gap:15px;align-items:center;padding:12px 16px;border:1px solid rgba(184,150,90,.18);border-radius:10px;background:rgba(15,31,57,.4);opacity:0;transform:translateX(-14px);animation:ct-rowin .5s cubic-bezier(.2,.7,.2,1) forwards}
.ct-steps li .sn{font-family:var(--ff-mono);font-size:11px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:3px 7px;letter-spacing:.1em;flex-shrink:0}
.ct-steps li .st{font-size:14.5px;line-height:1.4;color:#D8E0EE}
@keyframes ct-rowin{to{opacity:1;transform:none}}
.ct-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:18px}
.ct-cta-primary{font-family:var(--ff-body);font-weight:700;font-size:14px;color:#0A1426;text-decoration:none;padding:15px 26px;border-radius:999px;background:linear-gradient(135deg,#B8965A,#F0D596);box-shadow:0 12px 36px -6px var(--accent);transition:transform .2s,box-shadow .2s}
.ct-cta-primary:hover{transform:translateY(-2px);box-shadow:0 18px 50px -6px var(--accent)}
.ct-cta-primary:focus-visible{outline:2px solid #F0D596;outline-offset:3px}
.ct-pill{font-family:var(--ff-mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:#FDFCF8;padding:11px 15px;border-radius:999px;border:1px solid rgba(184,150,90,.32);transition:border-color .2s,background .2s}
.ct-pill:hover,.ct-pill:focus-visible{border-color:var(--accent);background:rgba(184,150,90,.1);outline:none}
.ct-pill:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ct-proof{font-family:var(--ff-mono);font-size:10px;letter-spacing:.05em;color:var(--mute)}
.ct-back{position:absolute;top:0;left:0;font-family:var(--ff-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);background:none;border:1px solid rgba(184,150,90,.3);border-radius:999px;padding:9px 16px;cursor:pointer;transition:background .2s,border-color .2s}
.ct-back:hover,.ct-back:focus-visible{background:rgba(184,150,90,.1);border-color:var(--accent);outline:none}
.ct-back:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ct-telemetry{border:1px solid rgba(184,150,90,.2);border-radius:14px;padding:18px;background:rgba(10,18,38,.5);backdrop-filter:blur(6px)}
.ct-telemetry .tlabel{font-family:var(--ff-mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin-bottom:14px}
.ct-gauge{position:relative;width:100%;aspect-ratio:1;margin-bottom:14px}
.ct-gauge svg{width:100%;height:100%;transform:rotate(-90deg)}
.ct-gauge .gv{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ct-gauge .gn{font-family:var(--ff-display);font-size:34px;color:var(--accent);line-height:1}
.ct-gauge .gt{font-family:var(--ff-mono);font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);margin-top:3px}
.ct-tbar{margin-bottom:10px}
.ct-tbar .tb-l{display:flex;justify-content:space-between;font-family:var(--ff-mono);font-size:9px;letter-spacing:.08em;color:var(--mute);text-transform:uppercase;margin-bottom:5px}
.ct-tbar .tb-t{height:4px;border-radius:2px;background:rgba(184,150,90,.15);overflow:hidden}
.ct-tbar .tb-f{height:100%;border-radius:2px;background:var(--accent);width:0;transition:width 1.1s cubic-bezier(.2,.7,.2,1)}
.ct-boot{position:absolute;inset:0;z-index:20;background:#060B16;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;transition:opacity .8s ease;text-align:center;padding:24px}
.ct-boot.gone{opacity:0;pointer-events:none;visibility:hidden;transition:opacity .8s ease,visibility 0s .8s}
.ct-boot .bO{width:62px;height:62px;border-radius:50%;border:1px solid #B8965A;display:flex;align-items:center;justify-content:center;font-family:var(--ff-display);font-size:32px;color:#D4B87A;box-shadow:0 0 50px -6px #B8965A;animation:ct-bp 1.6s ease-in-out infinite}
.ct-boot .bt{font-family:var(--ff-mono);font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--mute);min-height:16px}
.ct-boot .benter{margin-top:8px;font-family:var(--ff-mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#D4B87A;border:1px solid rgba(184,150,90,.4);border-radius:999px;padding:11px 22px;background:none;cursor:pointer;opacity:0;transition:opacity .5s,background .2s}
.ct-boot .benter.show{opacity:1}
.ct-boot .benter:hover,.ct-boot .benter:focus-visible{background:rgba(184,150,90,.12);outline:none}
.ct-boot .benter:focus-visible{outline:2px solid #D4B87A;outline-offset:2px}
@media(prefers-reduced-motion:reduce){
  .ct-reticle svg,.ct-hud .dot,.ct-boot .bO{animation:none!important}
  .ct-view{transition:opacity .3s}
  .ct-steps li{animation-duration:.2s}
}
`;
