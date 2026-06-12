/* =========================================================================
   AUDIENCE PATH REGISTRY — the six identity paths of the Concierge hub.
   Each path drives the PathSelector card + the dynamic PathResultPanel.
   Link ids reference /app/data/links.ts — never hardcode URLs here.
   ========================================================================= */

import type { Audience } from "./links";

export interface AudiencePath {
  id: Audience;
  /** URL query value(s) that select this path (?path=…). */
  slugs: string[];
  /** Short card label. */
  label: string;
  /** One-line card copy. */
  card: string;
  /** Card CTA text. */
  cardCta: string;
  /** Result panel headline (Cormorant display). */
  headline: string;
  /** Result panel explanation. */
  explanation: string;
  /** Exactly 3 next steps. */
  steps: [string, string, string];
  /** Primary CTA — link id, or "vault" to open the All-Tools vault. */
  primary: { linkId: string | "vault"; label: string };
  /** Secondary CTAs — link ids. */
  secondary: string[];
  /** Proof / reassurance line. */
  proof: string;
}

export const PATHS: AudiencePath[] = [
  {
    id: "business",
    slugs: ["business"],
    label: "I own a business",
    card: "Credit, capital, and AI leverage — found, not sold.",
    cardCta: "Show me the business path",
    headline: "Your business is sitting on money it can't see.",
    explanation:
      "Most owners are under-leveraged in three places at once — fundability, capital access, and AI. The Business Breakthrough walks them in order, starting with a free scan of where you stand today.",
    steps: [
      "Run the free AI Assessment — ten minutes, finds the gaps.",
      "Scan your business credit and fundability.",
      "Book your Six Figure Sit Down with Dave.",
    ],
    primary: { linkId: "biz_breakthrough", label: "Open the Business Breakthrough" },
    secondary: ["ai_audit", "biz_credit", "ai_revenue", "web_studio", "venice_academy"],
    proof: "Built by Dave Ivery — Certified Financial Coach · AI-Certified Consultant",
  },
  {
    id: "restaurant",
    slugs: ["restaurant"],
    label: "I run a restaurant",
    card: "Profit leaks your POS reports never show.",
    cardCta: "Show me the restaurant path",
    headline: "Restaurants leak profit in places the POS never shows.",
    explanation:
      "Tip credits, missed calls, food cost, local visibility — each one is a quiet leak. Start with eight minutes, see the full picture, then sit down and plug them in order.",
    steps: [
      "Take the 8 Minute Audit — one clear picture of the leaks.",
      "Put your restaurant in front of nearby buyers with Local Spotlight.",
      "Book your Six Figure Sit Down to map the rest.",
    ],
    primary: { linkId: "sit_down", label: "Book the Six Figure Sit Down" },
    secondary: ["eight_min_audit", "local_spotlight", "biz_credit", "restaurant_gpt", "fica_tip_credit"],
    proof: "Restaurant tools rolling out now — the Sit Down gets you in first.",
  },
  {
    id: "self",
    slugs: ["self-employed", "self", "agent", "1099"],
    label: "Self-employed · Agent · 1099",
    card: "You are the business. Protect the income, then multiply it.",
    cardCta: "Show me my path",
    headline: "When the income depends on you, the plan can't.",
    explanation:
      "Agents and 1099 earners carry all the risk and none of the leverage. E-Estate builds the digital ground you own; the assessments show where AI buys your hours back.",
    steps: [
      "Open the E-Estate Escape Plan — digital real estate you own.",
      "Run the free AI Assessment on your one-person operation.",
      "Book your Six Figure Sit Down with Dave.",
    ],
    primary: { linkId: "escape_plan", label: "Open the Escape Plan" },
    secondary: ["ai_audit", "web_studio", "venice_50k", "sit_down"],
    proof: "Dave Ivery — Certified Cash Flow Specialist · creator of Ownly ONCE",
  },
  {
    id: "household",
    slugs: ["household", "employee", "family"],
    label: "Employee · Family",
    card: "You work hard. Your money doesn't. Yet.",
    cardCta: "Show me the household path",
    headline: "The wealth is hiding between the paychecks.",
    explanation:
      "The Money Breakthrough is the household sequence — the patented Income Snowball, the Spendthrift Trust tax strategy, 8.5% bonds, and the Family Legacy Score. DREAMS handles short runways to retirement.",
    steps: [
      "Open the Money Breakthrough and meet the Income Snowball.",
      "Short window to retirement? Open Cash Flow · DREAMS.",
      "Check your free IRS penalty refund before July 10, 2026.",
    ],
    primary: { linkId: "money_breakthrough", label: "Open the Money Breakthrough" },
    secondary: ["cashflow_dreams", "wondertrust", "escape_plan", "signin_wealthpath"],
    proof: "Dave Ivery — NFEC Certified Financial Education Instructor",
  },
  {
    id: "vip",
    slugs: ["vip", "alumni"],
    label: "I already sat down",
    card: "Your complimentary VIP Trip is waiting.",
    cardCta: "Claim my VIP access",
    headline: "You sat down. Now the table is set for you.",
    explanation:
      "Six Figure Sit Down alumni get the complimentary VIP Trip and member access to WealthPath. Claim what's already yours, then book a follow-up whenever the next move is ready.",
    steps: [
      "Claim your complimentary VIP Trip.",
      "Sign in to WealthPath for your member dashboard.",
      "Book a follow-up Six Figure Sit Down when you're ready.",
    ],
    primary: { linkId: "vip_trip", label: "Claim the VIP Trip" },
    secondary: ["signin_wealthpath", "sit_down"],
    proof: "Reserved for Six Figure Sit Down alumni.",
  },
  {
    id: "all",
    slugs: ["all", "tools", "everything"],
    label: "Show me everything",
    card: "The full vault — every tool, every category.",
    cardCta: "Open the vault",
    headline: "The whole ecosystem. One drawer.",
    explanation:
      "Every Ownly tool, organized by what it does — business, restaurant, household, self-employed, credit and capital, AI and web, and Dave's own work. Browse it like a catalog.",
    steps: [
      "Open the All-Tools vault and browse by category.",
      "Preview any tool without leaving this page.",
      "Still deciding? Book the Six Figure Sit Down and let Dave route you.",
    ],
    primary: { linkId: "vault", label: "Open the All-Tools Vault" },
    secondary: ["sit_down", "ai_audit", "money_breakthrough"],
    proof: "Every link, preserved. Nothing buried.",
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
