"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GoldParticles = dynamic(() => import("./GoldParticles"), { ssr: false });

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        background: "var(--paper-warm)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <GoldParticles />
      <div className="gold-dust-mobile" aria-hidden />
      <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 920, padding: "120px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="eyebrow"
          style={{ marginBottom: 28, color: "var(--gold-dark)" }}
        >
          <span className="hairline-rule" />EDITION · MAY · MMXXVI · OWNLY ONCE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          style={{
            fontFamily: "var(--ff-display)", fontWeight: 500,
            fontSize: "clamp(56px, 9vw, 96px)",
            lineHeight: 0.95, letterSpacing: "-0.01em",
            margin: "0 0 28px",
          }}
        >
          Own nothing.<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>Control everything.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          style={{
            fontSize: 20, lineHeight: 1.55, color: "var(--text-mute)",
            maxWidth: 580, margin: "0 auto 36px",
          }}
        >
          Two breakthroughs under one roof. One for the business owner finding capital their bank never mentioned. One for the individual finding the wealth hiding between paychecks. Pick the door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <a href="#paths" className="btn-secondary" aria-label="Choose your path">
            Choose your path&nbsp;↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ marginTop: 28 }}
        >
          <a
            href="https://ownly-vip-trip.vercel.app/?source=hub-hero&audience=vip"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--ff-display)",
              fontStyle: "italic",
              fontSize: 15.5,
              color: "var(--text-mute)",
              textDecoration: "none",
              borderBottom: "1px solid var(--gold)",
              paddingBottom: 2,
              letterSpacing: "0.01em",
            }}
          >
            <span style={{ color: "var(--gold-dark)", marginRight: 6 }}>★</span>
            Already sat down? <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Your VIP Trip awaits</em>&nbsp;→
          </a>
        </motion.div>
      </div>
    </section>
  );
}
