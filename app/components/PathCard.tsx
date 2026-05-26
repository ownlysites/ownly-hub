"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export interface PathCardProps {
  eyebrow: string;
  headlinePre: string;
  headlineItalic: string;
  headlinePost: string;
  subhead: string;
  cta: string;
  href: string;
  image: string;
  loop: string;
  audience: "business" | "agent" | "individual" | "vip" | "investor";
  delay?: number;
}

export default function PathCard(p: PathCardProps) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onEnter() {
    setHover(true);
    const v = videoRef.current;
    if (v) {
      try { v.currentTime = 0; v.play().catch(() => {}); } catch {}
    }
  }
  function onLeave() {
    setHover(false);
    videoRef.current?.pause();
  }

  function onClick() {
    try {
      const payload = { audience: p.audience, href: p.href, ts: Date.now() };
      navigator.sendBeacon?.("/api/route-click", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    } catch {}
  }

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: p.delay ?? 0 }}
      whileHover={{ y: -6 }}
      whileTap={{ y: -4 }}
      style={{
        display: "flex", flexDirection: "column",
        width: "100%", maxWidth: 380, height: 560,
        background: "var(--paper-bone)",
        border: "1px solid var(--hairline)",
        borderRadius: 16,
        boxShadow: "0 1px 0 var(--hairline)",
        overflow: "hidden", textDecoration: "none", color: "var(--ink)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "60%", overflow: "hidden", background: "var(--ink-deep)" }}>
        <img
          src={p.image}
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hover ? 0 : 1, transition: "opacity 0.4s ease",
          }}
        />
        <video
          ref={videoRef}
          src={p.loop}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hover ? 1 : 0, transition: "opacity 0.4s ease",
          }}
        />
      </div>
      <div style={{ padding: "28px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          <span className="hairline-rule" />{p.eyebrow}
        </div>
        <h3 style={{
          fontFamily: "var(--ff-display)", fontWeight: 500,
          fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.005em",
          margin: "0 0 12px",
        }}>
          {p.headlinePre}{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>{p.headlineItalic}</em>
          {p.headlinePost}
        </h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--text-mute)", margin: 0, flex: 1 }}>
          {p.subhead}
        </p>
        <span className="btn-primary" style={{ alignSelf: "flex-start", marginTop: 20, fontSize: 13 }}>
          {p.cta}&nbsp;→
        </span>
      </div>
    </motion.a>
  );
}
