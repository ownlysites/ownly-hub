/* =========================================================================
   AUDIENCE PATH REGISTRY — the five sectors of the Concierge Terminal.
   Copy, accents, telemetry, and link placement ported verbatim from the
   approved prototype (hub-command-center.html) — treat as FINAL.
   Link ids reference /app/data/links.ts — never hardcode URLs here.
   ========================================================================= */

import type { Audience } from "./links";

export interface SectorCTA {
  linkId: string;
  /** Action label shown on the pill (proto copy — overrides links.ts label). */
  label: string;
}

export interface AudiencePath {
  id: Audience;
  /** URL query value(s) that select this path (?path=…). */
  slugs: string[];
  /** Per-sector accent hex (proto `k`). */
  accent: string;
  /** Door + sector label. */
  label: string;
  /** One-line door copy. */
  card: string;
  /** Inline SVG path markup for the door icon (32×32 viewBox, stroke). */
  icon: string;
  /** Sector headline. */
  headline: string;
  /** Sector explanation. */
  explanation: string;
  /** Exactly 3 next steps. */
  steps: [string, string, string];
  /** Primary CTA. */
  primary: SectorCTA;
  /** Secondary CTAs. */
  secondary: SectorCTA[];
  /** Proof / reassurance line. */
  proof: string;
  /** Telemetry gauge: [value, label]. */
  gauge: [string, string];
  /** Telemetry bars: [label, pct] × 3. */
  bars: [string, number][];
}

export const PATHS: AudiencePath[] = [
  {
    id: "business",
    slugs: ["business"],
    accent: "#E7C77E",
    label: "I own a business",
    card: "Credit, capital, and AI leverage — found, not sold.",
    icon: '<path d="M5 13l2-7h18l2 7M5 13c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M7 16v10h18V16M13 26v-6h6v6"/>',
    headline: "There’s capital in here your bank never mentioned.",
    explanation:
      "You’re under-leveraged in three places at once — fundability, capital access, and AI. Run the sweep, see every gap, move on them in order. Most owners find six figures they didn’t know they had.",
    steps: [
      "Run the AI sweep — ten minutes, every gap flagged.",
      "Pull your credit and fundability signal.",
      "Sit down with Dave and claim the capital.",
    ],
    primary: { linkId: "biz_breakthrough", label: "Find my hidden capital" },
    secondary: [
      { linkId: "ai_audit", label: "Run my free AI audit" },
      { linkId: "biz_credit", label: "Check my business credit" },
      { linkId: "ai_revenue", label: "Try the AI revenue tool" },
      { linkId: "web_studio", label: "Build my website & funnels" },
      { linkId: "venice_50k", label: "Take the $50K Challenge" },
    ],
    proof: "Built by Dave Ivery — Certified Financial Coach · AI-Certified Consultant",
    gauge: ["72", "Fundability headroom"],
    bars: [["Capital access", 64], ["AI leverage", 38], ["Credit signal", 77]],
  },
  {
    id: "restaurant",
    slugs: ["restaurant"],
    accent: "#E2A567",
    label: "I run a restaurant",
    card: "Profit leaks your POS reports never show.",
    icon: '<path d="M4 22h24M6 22a10 10 0 0 1 20 0M16 12v-2M8 26h16"/><circle cx="16" cy="8" r="1.6"/>',
    headline: "There’s profit hiding where your POS never looks.",
    explanation:
      "Missed calls. Slow speed-to-lead. Tip-credit dollars left on the table. Food cost creeping past you. Eight minutes exposes every leak — then you plug them in order.",
    steps: [
      "Run the 8 Minute Audit — every leak, one screen.",
      "Get your tables in front of nearby buyers.",
      "Launch the Restaurant Breakthrough with Dave.",
    ],
    primary: { linkId: "restaurant_breakthrough", label: "Find my restaurant's hidden profit" },
    secondary: [
      { linkId: "eight_min_audit", label: "Run my free 8-minute audit" },
      { linkId: "local_spotlight", label: "Get found by nearby diners" },
      { linkId: "fica_tip_credit", label: "Recover my tip-tax credit" },
      { linkId: "arf_capital", label: "Get a restaurant credit line" },
      { linkId: "ringfoods", label: "Lower my food costs" },
    ],
    proof: "Built for operators — start the recovery on your Restaurant Money Review.",
    gauge: ["41", "Leaks recoverable"],
    bars: [["Missed-call capture", 31], ["Tip credit", 58], ["Local visibility", 44]],
  },
  {
    id: "self",
    slugs: ["self-employed", "self", "agent", "1099"],
    accent: "#CBB98A",
    label: "Self-employed · Agent · 1099",
    card: "You are the business. Protect the income, then multiply it.",
    icon: '<circle cx="12" cy="11" r="5"/><path d="M15 14l9 9M20 19l3-3"/>',
    headline: "You are the business. Let’s make your money work as hard as you do.",
    explanation:
      "Agents and 1099 earners carry all the risk and none of the leverage. Build digital ground you actually own — then let AI buy your hours back and turn one income line into two.",
    steps: [
      "Open the E-Estate Escape Plan — ground you own.",
      "Run the AI sweep on your one-person operation.",
      "Sit down with Dave and build the second line.",
    ],
    primary: { linkId: "escape_plan", label: "Build my second income" },
    secondary: [
      { linkId: "ai_audit", label: "Run my free AI audit" },
      { linkId: "web_studio", label: "Build my website & funnels" },
      { linkId: "planswell", label: "Get my free financial plan" },
    ],
    proof: "Dave Ivery — Certified Cash Flow Specialist · creator of Ownly ONCE",
    gauge: ["2.1", "Income lines, target"],
    bars: [["Owned assets", 22], ["Tax position", 47], ["AI hours saved", 61]],
  },
  {
    id: "household",
    slugs: ["household", "employee", "family"],
    accent: "#D8C089",
    label: "Employee · Family",
    card: "You work hard. Your money doesn’t. Yet.",
    icon: '<path d="M5 15L16 5l11 10M8 13v13h16V13M13 26v-7h6v7"/>',
    headline: "There’s cash flow hiding between your paychecks.",
    explanation:
      "You work hard. Your money doesn’t — yet. The Money Breakthrough surfaces what’s idle: the Income Snowball method, trust-based tax strategy, the Family Legacy Score. DREAMS handles short runways to retirement.",
    steps: [
      "Open the Money Breakthrough — meet the Income Snowball.",
      "Short runway to retirement? Open Cash Flow · DREAMS.",
      "Review your IRS penalty-refund eligibility.",
    ],
    primary: { linkId: "money_breakthrough", label: "Find my hidden cash flow" },
    secondary: [
      { linkId: "freedom_score", label: "Get my Freedom Score" },
      { linkId: "golden_dream", label: "See my home buying power" },
      { linkId: "cashflow_dreams", label: "Plan a dream purchase" },
      { linkId: "planswell", label: "Get my free financial plan" },
    ],
    proof: "Dave Ivery — NFEC Certified Financial Education Instructor",
    gauge: ["68", "Freedom score"],
    bars: [["Hidden cash flow", 52], ["Debt drag", 39], ["Legacy readiness", 71]],
  },
  {
    id: "vip",
    slugs: ["vip", "alumni"],
    accent: "#F0D596",
    label: "I already sat down",
    card: "Your complimentary VIP Trip is waiting.",
    icon: '<path d="M16 4l3.5 7.6 8.5 1-6.2 5.7 1.7 8.3L16 22.4l-7.5 4.2 1.7-8.3L4 12.6l8.5-1L16 4z"/>',
    headline: "You sat down. The table is still set.",
    explanation:
      "Six Figure Sit Down alumni: your complimentary VIP Trip and WealthPath access are waiting. Claim what’s already yours — then call the next move when you’re ready.",
    steps: [
      "Claim your complimentary VIP Trip.",
      "Sign in to WealthPath for your dashboard.",
      "Call your next move with Dave.",
    ],
    primary: { linkId: "vip_trip", label: "Claim my VIP Trip" },
    secondary: [
      { linkId: "signin_wealthpath", label: "Open my WealthPath dashboard" },
      { linkId: "sit_down", label: "Book my follow-up with Dave" },
    ],
    proof: "Reserved for Six Figure Sit Down alumni.",
    gauge: ["01", "VIP trip waiting"],
    bars: [["Benefits unlocked", 88], ["Next move ready", 64], ["Loyalty tier", 92]],
  },
];

export function pathBySlug(slug: string | null): AudiencePath | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  return PATHS.find((p) => p.slugs.includes(s) || p.id === s);
}

export function pathById(id: string | null): AudiencePath | undefined {
  if (!id) return undefined;
  return PATHS.find((p) => p.id === id);
}
