/* =========================================================================
   CENTRAL LINK REGISTRY — single source of truth for every destination
   on the Ownly Concierge hub. Verified against live source 2026-06-12
   (HUB_REDESIGN_HANDOFF.md → "LINK REGISTRY (VERIFIED)").

   Rules:
   - Never invent a destination. Unknown URLs stay "#" with pending:true.
   - frame:true → link renders with data-frame="modal" so ConciergeFrame
     previews it in-page (if hostname is in its FRAMEABLE allowlist).
   ========================================================================= */

export type Audience =
  | "business"
  | "restaurant"
  | "self"
  | "household"
  | "vip"
  | "all";

export type Category =
  | "core"
  | "business"
  | "restaurant"
  | "household"
  | "self"
  | "credit"
  | "ai"
  | "authority"
  | "vip"
  | "healthcare";

export interface HubLink {
  id: string;
  label: string;
  url: string;
  audience: Audience[];
  category: Category;
  priority: number; // 1 = highest
  desc: string;
  primaryCTA?: boolean;
  external?: boolean;
  openInNewTab?: boolean;
  frame?: boolean;
  /** URL not yet confirmed by Dave — render disabled, never navigate. */
  pending?: boolean;
  /** Lifecycle status. Defaults derived in normalize step below. */
  status?: "active" | "needs-review" | "coming-soon";
  /** Analytics event id. Defaults to cta_clicked_<id> in normalize step. */
  trackingId?: string;
}

export const LINKS: Record<string, HubLink> = {
  /* ---------------- VERIFIED (live source 2026-06-12) ---------------- */
  hub: {
    id: "hub",
    label: "Ownly ONCE Hub",
    url: "https://itsownlymoney.com/",
    audience: ["all"],
    category: "core",
    priority: 1,
    desc: "The front door to the entire Ownly ecosystem.",
  },
  biz_breakthrough: {
    id: "biz_breakthrough",
    label: "Business Breakthrough",
    url: "https://the-ownly-breakthrough.vercel.app/?source=hub&audience=business",
    audience: ["business"],
    category: "business",
    priority: 1,
    desc: "The flagship path for owners — credit, capital, and AI leverage in one sequence.",
    primaryCTA: true,
    frame: true,
  },
  money_breakthrough: {
    id: "money_breakthrough",
    label: "Money Breakthrough",
    url: "https://ownly-money-breakthrough.vercel.app/?source=hub&audience=individual",
    audience: ["household"],
    category: "household",
    priority: 1,
    desc: "The Income Snowball method, trust-based tax strategies, fixed-income options, and the Family Legacy Score — designed to put idle money to work.",
    primaryCTA: true,
    frame: true,
  },
  ai_audit: {
    id: "ai_audit",
    label: "AI Assessment",
    url: "https://ownly-gap-audit.vercel.app/",
    audience: ["business", "self"],
    category: "ai",
    priority: 1,
    desc: "Free 10-minute scan that finds the gaps AI can close in your operation.",
    frame: true,
  },
  biz_credit: {
    id: "biz_credit",
    label: "Business Credit & Fundability Scan",
    url: "https://ownly-business-credit-builder.vercel.app/",
    audience: ["business"],
    category: "credit",
    priority: 1,
    desc: "See what lenders see — and what's keeping capital out of reach.",
    frame: true,
  },
  ai_revenue: {
    id: "ai_revenue",
    label: "AI Revenue Generator",
    // Confirmed by Dave 2026-06-12: pg=e1dbf00f32 is correct.
    url: "https://app.mplannerpro.com/abce1ffefc/chat?pg=e1dbf00f32",
    audience: ["business"],
    category: "ai",
    priority: 2,
    desc: "A working AI revenue engine you can test-drive in your browser.",
    external: true,
    openInNewTab: true,
    frame: true,
  },
  web_studio: {
    id: "web_studio",
    label: "Web Studio",
    url: "https://ownly-web-studio.vercel.app/",
    audience: ["business", "self"],
    category: "ai",
    priority: 2,
    desc: "Sites and funnels built with AI speed, editorial polish.",
    frame: true,
  },
  sit_down: {
    id: "sit_down",
    label: "Six Figure Sit Down",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["all"],
    category: "authority",
    priority: 1,
    desc: "One conversation with Dave that maps where the money is hiding.",
    primaryCTA: true,
    external: true,
    openInNewTab: true,
    frame: true,
  },
  vip_trip: {
    id: "vip_trip",
    label: "VIP Trip",
    url: "https://ownly-vip-trip.vercel.app/",
    audience: ["vip"],
    category: "vip",
    priority: 1,
    desc: "Already sat down? Claim the complimentary VIP trip reserved for you.",
    primaryCTA: true,
    frame: true,
  },
  escape_plan: {
    id: "escape_plan",
    label: "E-Estate · Escape Plan",
    url: "https://because.itsownlymoney.com/",
    audience: ["self", "household"],
    category: "self",
    priority: 1,
    desc: "Digital real estate and the escape plan for income that depends on you.",
    frame: true,
  },
  cashflow_dreams: {
    id: "cashflow_dreams",
    label: "Cash Flow · DREAMS",
    url: "https://dreams.itsownlymoney.com/",
    audience: ["household"],
    category: "household",
    priority: 1,
    desc: "Hidden money and passive strategies for short runways to retirement.",
    frame: true,
  },
  credit_partner: {
    id: "credit_partner",
    label: "Our Credit Partner",
    url: "https://newageliteracy.com/",
    audience: ["business"],
    category: "credit",
    priority: 3,
    desc: "Personal credit restoration through our trusted partner.",
    external: true,
    openInNewTab: true,
    frame: true,
  },
  wondertrust: {
    id: "wondertrust",
    label: "IRS Penalty Refund",
    url: "https://filemycredit.com/daveivery",
    audience: ["all"],
    category: "credit",
    priority: 1,
    desc: "You may be eligible for a refund on IRS penalties & interest from 2020–2023. Free eligibility check; window open through July 10, 2026.",
    external: true,
    frame: true,
  },
  signin_wealthpath: {
    id: "signin_wealthpath",
    label: "WealthPath — Sign In",
    url: "https://itsownlymoney.vercel.app",
    audience: ["all", "household"],
    category: "household",
    priority: 2,
    desc: "Your WealthPath member dashboard.",
    frame: true,
  },
  ownly_marketing: {
    id: "ownly_marketing",
    label: "Ownly Marketing",
    url: "https://ownly-marketing.vercel.app/",
    audience: ["business"],
    category: "ai",
    priority: 3,
    desc: "Done-with-you marketing systems for owners.",
    frame: true,
  },
  local_spotlight: {
    id: "local_spotlight",
    label: "Local Spotlight",
    url: "https://localspotlightads.com",
    audience: ["restaurant", "business"],
    category: "ai",
    priority: 2,
    desc: "Local advertising that puts your restaurant in front of nearby buyers.",
    frame: true,
  },
  eight_min_audit: {
    id: "eight_min_audit",
    label: "8 Minute Audit",
    url: "https://8minuteaudit.com",
    audience: ["business", "restaurant"],
    category: "authority",
    priority: 2,
    desc: "Eight minutes. One audit. A clear picture of the growth you're missing.",
    external: true,
    frame: true,
  },
  venice_50k: {
    id: "venice_50k",
    label: "Venice 50K Challenge",
    url: "https://venice50kchallenge.com",
    audience: ["self"],
    category: "authority",
    priority: 3,
    desc: "The challenge that turns hustle into a repeatable income system.",
    frame: true,
  },
  venice_academy: {
    id: "venice_academy",
    label: "Venice Business Academy",
    url: "https://venicebusinessacademy.com",
    audience: ["business"],
    category: "authority",
    priority: 3,
    desc: "Owner education from the Venice Business Academy.",
    frame: true,
  },

  /* -------- NEEDS DAVE URL — placeholders, never navigate -------- */
  // Confirmed by Dave 2026-06-12: audience=restaurant renders restaurant content.
  restaurant_breakthrough: {
    id: "restaurant_breakthrough",
    label: "Restaurant Breakthrough",
    url: "https://the-ownly-breakthrough.vercel.app/?source=hub&audience=restaurant",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 1,
    desc: "The breakthrough sequence, tuned for restaurant economics.",
    frame: true,
  },
  // TODO(Dave): dedicated page pending — routed to the Sit Down so the offer stays live.
  restaurant_gpt: {
    id: "restaurant_gpt",
    label: "Ask Dave about RestaurantGPT",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 2,
    desc: "AI that finds the profit leaks your POS reports never show. Walk through it on the Sit Down.",
    external: true,
    openInNewTab: true,
    frame: true,
    status: "needs-review",
  },
  fica_tip_credit: {
    id: "fica_tip_credit",
    label: "FICA Tip Credit Check",
    url: "https://tipcreditpartners.com/89eb?c=3ef54b9f",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 2,
    desc: "Your restaurant may be owed money on tipped payroll. Partner program; disclosures on their page.",
    external: true,
    openInNewTab: true,
  },
  arf_capital: {
    id: "arf_capital",
    label: "Restaurant Capital — ARF",
    url: "https://arffinancial.my.site.com/portal/ARFPreQualify?prequalgd=41c65bbe-31b7-44c1-9fde-0bbddd7459d9&RPId=0034y00002BXNYXAA5",
    audience: ["restaurant", "business"],
    category: "credit",
    priority: 3,
    desc: "A revolving line built for restaurant cash cycles. Soft-pull pre-qual via our partner ARF Financial.",
    external: true,
    openInNewTab: true,
  },
  ringfoods: {
    id: "ringfoods",
    label: "RingFoods",
    url: "https://www.ringfoods.com?ref=DAVEIVERYINC813",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 3,
    desc: "Food-cost leverage for operators, through our partner RingFoods.",
    external: true,
    openInNewTab: true,
  },
  // No standalone page — routed to the Sit Down so the offer stays live.
  stella: {
    id: "stella",
    label: "Ask Dave about Stella",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 3,
    desc: "Front-of-house AI for restaurants — walk through it on the Sit Down.",
    external: true,
    openInNewTab: true,
    frame: true,
    status: "needs-review",
  },
  // No standalone page — routed to the Sit Down so the offer stays live.
  missed_call: {
    id: "missed_call",
    label: "Speed-to-Lead — Ask Dave",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 3,
    desc: "Every missed call answered, every lead caught. Set it up on the Sit Down.",
    external: true,
    openInNewTab: true,
    frame: true,
    status: "needs-review",
  },
  // Confirmed by Dave 2026-06-12: lives on the Money Breakthrough. Keep surfaced — do not bury.
  freedom_score: {
    id: "freedom_score",
    label: "Freedom Score",
    url: "https://ownly-money-breakthrough.vercel.app/?source=hub&audience=individual",
    audience: ["household"],
    category: "household",
    priority: 2,
    desc: "One number that tells your family how close freedom really is.",
    frame: true,
  },
  planswell: {
    id: "planswell",
    label: "Planswell",
    url: "https://us.planswell.com/discovery/adv-david-124",
    audience: ["self", "household"],
    category: "household",
    priority: 3,
    desc: "A full financial plan, built free.",
    external: true,
    openInNewTab: true,
    frame: true,
  },
  golden_dream: {
    id: "golden_dream",
    label: "Golden Dream — Buying Power",
    url: "https://golden-dream.itsownlymoney.com",
    audience: ["household"],
    category: "household",
    priority: 2,
    desc: "Unlock the buying power hiding in your household numbers.",
    frame: true,
  },
  dental_1dental: {
    id: "dental_1dental",
    label: "Dental Partner — 1Dental",
    url: "https://lddy.no/1pg7p?afmc=1lx",
    audience: ["household"],
    category: "healthcare",
    priority: 3,
    desc: "Dental savings through our trusted partner.",
    external: true,
    openInNewTab: true,
    frame: false,
  },
  daveivery_card: {
    id: "daveivery_card",
    label: "Dave Ivery",
    url: "https://daveivery.com",
    audience: ["all"],
    category: "authority",
    priority: 2,
    desc: "Dave's card — who he is, what he's built, how to reach him.",
    frame: true,
  },
  // No standalone page — routed to the Sit Down so the offer stays live.
  tax_retirement: {
    id: "tax_retirement",
    label: "Tax & Retirement Strategy",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["self"],
    category: "self",
    priority: 2,
    desc: "Keep more of what 1099 life earns you — mapped on the Sit Down.",
    external: true,
    openInNewTab: true,
    frame: true,
    status: "needs-review",
  },
  // Routed to the Sit Down booking until a dedicated restaurant-review page exists.
  restaurant_review: {
    id: "restaurant_review",
    label: "Book a Restaurant Money Review",
    url: "https://calendly.com/daveivery/sit_down",
    audience: ["restaurant"],
    category: "restaurant",
    priority: 1,
    desc: "A focused review of where your restaurant's money is hiding.",
    external: true,
    openInNewTab: true,
    frame: true,
    status: "needs-review",
  },
  dave_books: {
    id: "dave_books",
    label: "Dave's Books — 5-Time Author",
    url: "https://www.amazon.com/author/davidjamesivery",
    audience: ["all"],
    category: "authority",
    priority: 3,
    desc: "Five books on finding hidden money, ownership, and control.",
    external: true,
    openInNewTab: true,
  },
  pfsa: {
    id: "pfsa",
    label: "Personal Finance Speakers Association",
    url: "https://www.financialeducatorscouncil.org/david-ivery/",
    audience: ["all"],
    category: "authority",
    priority: 4,
    desc: "Dave's PFSA member profile.",
    external: true,
    openInNewTab: true,
  },
};

/* Normalize: fill registry-wide defaults so every link carries a trackingId
   and a status without hand-editing all ~30 entries. */
for (const id of Object.keys(LINKS)) {
  const l = LINKS[id];
  if (!l.trackingId) l.trackingId = `cta_clicked_${id}`;
  if (!l.status) l.status = l.pending ? "coming-soon" : "active";
}

/** Vault drawer categories, in display order. */
export const VAULT_CATEGORIES: { key: Category; title: string }[] = [
  { key: "business", title: "Business" },
  { key: "restaurant", title: "Restaurant" },
  { key: "household", title: "Household" },
  { key: "self", title: "Self-Employed" },
  { key: "credit", title: "Credit & Capital" },
  { key: "ai", title: "AI · Web · Marketing" },
  { key: "authority", title: "Dave & Authority" },
];

export function linksByCategory(cat: Category): HubLink[] {
  // Folded groups: VIP shows under Dave & Authority, healthcare under Household.
  const extra: Category[] =
    cat === "authority" ? ["vip"] : cat === "household" ? ["healthcare"] : [];
  return Object.values(LINKS)
    .filter((l) => l.category === cat || extra.includes(l.category))
    .sort((a, b) => a.priority - b.priority || a.label.localeCompare(b.label));
}

export function getLink(id: string): HubLink {
  const l = LINKS[id];
  if (!l) throw new Error(`Unknown link id: ${id}`);
  return l;
}
