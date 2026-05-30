"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

/* =========================================================================
   TrapDoor — the one red button on an all-gold site. No label. No copy.
   A glowing physical push-button. Only the curious press it.
   Push it: the button implodes, the screen dissolves into Matrix rain,
   then drops the visitor through to the funnel (same tab).
   ========================================================================= */

const TD_URL = "https://because.itsownlymoney.com/";

export default function TrapDoor() {
  const aRef = useRef<HTMLAnchorElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const running = useRef(false);

  function fire(e: React.MouseEvent) {
    e.preventDefault();
    if (running.current) return;
    running.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { window.location.href = TD_URL; return; }

    aRef.current?.classList.add("imploding");
    setTimeout(runMatrix, 200);
  }

  function runMatrix() {
    const cv = fxRef.current, flash = flashRef.current;
    if (!cv || !flash) { window.location.href = TD_URL; return; }
    const ctx = cv.getContext("2d");
    if (!ctx) { window.location.href = TD_URL; return; }

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth, H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cv.style.display = "block";

    const fontS = 16;
    const cols = Math.floor(W / fontS);
    const drops = new Array(cols).fill(0).map(() => (Math.random() * -H) / fontS);
    const chars = "アカサタナハマヤラワ0123456789ABCDEF$@#%&";
    const t0 = performance.now();
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);

    const loop = (now: number) => {
      const dt = (now - t0) / 1000;
      ctx.fillStyle = "rgba(0,0,0,0.075)"; ctx.fillRect(0, 0, W, H);
      ctx.font = fontS + "px 'JetBrains Mono', monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontS, y = drops[i] * fontS;
        ctx.fillStyle = "#cfffd6"; ctx.fillText(ch, x, y);
        ctx.fillStyle = "#16a82f";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontS);
        if (y > H && Math.random() > 0.982) drops[i] = 0;
        drops[i] += 0.5;
      }
      if (dt < 0.6) cv.style.opacity = String(Math.min(1, dt / 0.6));
      if (dt < 2.4) {
        requestAnimationFrame(loop);
      } else {
        flash.style.display = "block";
        flash.style.opacity = "1";
        setTimeout(() => { window.location.href = TD_URL; }, 520);
      }
    };
    requestAnimationFrame(loop);
  }

  return (
    <section
      aria-label="Trap Door"
      style={{
        position: "relative",
        background: "var(--paper-cream)",
        padding: "44px 24px 52px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <motion.a
        ref={aRef}
        href={TD_URL}
        onClick={fire}
        className="trapdoor"
        aria-label="Open the Trap Door"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="td-glow" aria-hidden />
        <span className="td-base">
          <span className="td-ring" aria-hidden />
          <span className="td-cap">
            <span className="td-glare" aria-hidden />
          </span>
        </span>
      </motion.a>

      <canvas ref={fxRef} className="td-fx" aria-hidden />
      <div ref={flashRef} className="td-flash" aria-hidden />

      <style>{`
        .trapdoor {
          position: relative;
          display: inline-block;
          width: 210px; height: 210px;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M40 12c0-5 4-9 9-9s9 4 9 9v34h4V30c0-4 4-7 8-7s8 3 8 7v16h4V36c0-4 4-7 8-7s8 3 8 7v10h4v-4c0-4 3-7 7-7s7 3 7 7v30c0 18-9 33-30 33H58c-9 0-15-5-21-14L23 70c-3-4-2-9 2-12s9-2 12 2l3 4V12z' fill='%23fff' stroke='%23111' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E") 48 6, pointer;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .td-glow {
          position: absolute; inset: -58px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,64,56,0.78) 0%, rgba(228,46,58,0.42) 34%, rgba(210,47,60,0) 66%);
          animation: td-breathe 1.5s ease-in-out infinite;
          z-index: 0;
        }
        .td-base {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 36%, #3b4048 0%, #23272e 56%, #131519 100%);
          box-shadow:
            0 20px 38px rgba(0,0,0,0.34),
            inset 0 3px 6px rgba(255,255,255,0.10),
            inset 0 -10px 18px rgba(0,0,0,0.58);
          display: flex; align-items: center; justify-content: center;
          z-index: 1;
        }
        .td-ring {
          position: absolute; inset: 15px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,90,0.55);
          box-shadow: inset 0 0 14px rgba(184,150,90,0.16);
        }
        .td-cap {
          position: relative;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 28%, #ff8a72 0%, #f3433d 24%, #d11f2b 56%, #951421 100%);
          box-shadow:
            0 12px 18px rgba(120,10,20,0.50),
            inset 0 -12px 20px rgba(86,8,16,0.62),
            inset 0 9px 16px rgba(255,184,172,0.50),
            0 0 20px 3px rgba(232,60,68,0.45),
            0 0 0 0 rgba(255,60,55,0.60);
          transition: transform 0.13s cubic-bezier(.3,.7,.4,1), box-shadow 0.13s ease;
          animation: td-alarm 1.5s ease-in-out infinite;
          z-index: 2;
        }
        .td-glare {
          position: absolute; top: 13%; left: 19%;
          width: 56%; height: 36%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }
        .trapdoor:hover .td-cap {
          transform: translateY(-3px);
          animation-play-state: paused;
          box-shadow:
            0 18px 26px rgba(120,10,20,0.55),
            inset 0 -12px 20px rgba(86,8,16,0.62),
            inset 0 9px 16px rgba(255,184,172,0.58),
            0 0 56px 18px rgba(255,72,60,0.95);
        }
        .trapdoor:hover .td-glow { animation-play-state: paused; opacity: 1; transform: scale(1.14); }
        .trapdoor:active .td-cap {
          transform: translateY(8px) scale(0.985);
          animation-play-state: paused;
          box-shadow:
            0 3px 7px rgba(120,10,20,0.45),
            inset 0 -6px 12px rgba(86,8,16,0.55),
            inset 0 4px 10px rgba(255,184,172,0.35),
            0 0 22px 4px rgba(232,60,68,0.55);
        }
        .trapdoor.imploding .td-cap {
          transform: translateY(26px) scale(0.55);
          animation: none;
          transition: transform 0.22s cubic-bezier(.6,0,.8,.2), box-shadow 0.22s;
          box-shadow: 0 0 60px 20px rgba(255,72,60,1);
        }
        .trapdoor.imploding .td-glow { animation: none; opacity: 1; transform: scale(0.4); }
        .trapdoor:focus-visible { outline: 2px solid var(--gold); outline-offset: 8px; border-radius: 50%; }
        .td-fx {
          position: fixed; inset: 0; width: 100%; height: 100%;
          z-index: 9000; display: none; pointer-events: none;
        }
        .td-flash {
          position: fixed; inset: 0; background: #000;
          z-index: 9001; display: none; opacity: 0;
          transition: opacity 0.5s ease; pointer-events: none;
        }
        @keyframes td-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.18); }
        }
        @keyframes td-alarm {
          0%   { box-shadow: 0 12px 18px rgba(120,10,20,0.50), inset 0 -12px 20px rgba(86,8,16,0.62), inset 0 9px 16px rgba(255,184,172,0.50), 0 0 20px 3px rgba(232,60,68,0.45), 0 0 0 0 rgba(255,60,55,0.60); }
          50%  { box-shadow: 0 12px 18px rgba(120,10,20,0.50), inset 0 -12px 20px rgba(86,8,16,0.62), inset 0 9px 16px rgba(255,184,172,0.50), 0 0 54px 16px rgba(255,72,60,0.98), 0 0 0 11px rgba(255,60,55,0.16); }
          100% { box-shadow: 0 12px 18px rgba(120,10,20,0.50), inset 0 -12px 20px rgba(86,8,16,0.62), inset 0 9px 16px rgba(255,184,172,0.50), 0 0 20px 3px rgba(232,60,68,0.45), 0 0 0 22px rgba(255,60,55,0); }
        }
        @media (max-width: 540px) {
          .trapdoor { width: 174px; height: 174px; }
          .td-cap { width: 124px; height: 124px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .td-glow, .td-cap { animation: none; }
        }
      `}</style>
    </section>
  );
}
