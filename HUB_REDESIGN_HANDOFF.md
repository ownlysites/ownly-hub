# Ownly ONCE Hub — Concierge Redesign — HANDOFF + PASTE PROMPT
**For: Claude Code Desktop on Mac. Built from verified live source-of-truth 2026-06-12. DO NOT PUSH LIVE.**

---

## ▶ PASTE THIS PROMPT INTO CLAUDE CODE ON MAC

> Open the repo at `~/Documents/Claude/Projects/TakeOvery/Ownly/Hub/ownly-hub` (Next.js 15.5 App Router / React 19 / Tailwind v4 / framer-motion / three+r3f). This deploys to **itsownlymoney.com** via the GitHub repo `ownlysites/ownly-hub` (auto-deploys on `git push`). 
>
> Rebuild the homepage (`app/page.tsx` + new components) into the **Ownly Concierge ecosystem hub** per the spec in `HUB_REDESIGN_HANDOFF.md` (this file) — sections "BUILD SPEC", "LINK REGISTRY (VERIFIED)", "REUSE — don't rebuild", "LOCKED DECISIONS", "ACCEPTANCE".
>
> Rules: **DO NOT push or deploy.** Build on a branch (`feat/concierge-hub`), run `npm run dev`, verify in browser, run `npm run build` + Lighthouse, then STOP and show me a preview + the link audit table. Work only from current source — re-verify every link in the registry against the live components before wiring. Reuse the existing `ConciergeFrame` modal system and `/api/route-click` analytics — do not rebuild them. Fill the "NEEDS DAVE URL" links with `#` placeholders + a TODO comment; never invent a destination.
>
> Return all 10 deliverables listed under "DELIVERABLES" when done.

---

## TOOL-FIT (why Mac CC, not Cowork)
13-section funnel, central link registry, 6 new components, dynamic path panel, query-param routing, SEO schema, mobile sticky CTA, Lighthouse 90+/95+ targets. Needs `next dev`, interactive funnel testing, Lighthouse, git auth — none exist in the Cowork sandbox. Mac CC = faster AND more thorough. Cowork's job was verifying source-of-truth + writing this handoff.

---

## VERIFIED CURRENT ARCHITECTURE (source of truth — 2026-06-12)

**Stack:** Next.js `^15.5.4`, React `^19`, framer-motion `^11.18.2`, three `^0.171` + @react-three/fiber + drei (3D available, but perf budget says use sparingly), Tailwind v4 (`@theme` in `globals.css`), TypeScript. Styling = mostly inline styles + CSS vars, Tailwind utilities available.

**Deploy:** GitHub `ownlysites/ownly-hub` → auto-deploy on push → **itsownlymoney.com**. (CLI not needed; `git push` ships it. DO NOT push for this task.)

**`app/page.tsx` current render order:**
1. `WonderTrustBanner` — gold IRS refund bar → `filemycredit.com/daveivery` (data-frame modal). Time-boxed, deadline 2026-07-10. KEEP.
2. `Header` — sticky, logo + "VOL.I · NO.01 · MMXXVI" + "Sign in" → `itsownlymoney.vercel.app`. Nav is minimal — spec wants real nav.
3. `TrapDoor` (gated `SHOW_TRAP_DOOR=true`) — the red button → `dreams.itsownlymoney.com`.
4. `Hero` — "Tell us who you are…" + VIP link.
5. `PathsSection` — 2 cards (card1 = Family/Pre-Retiree→dreams; card2 = Individual/Family→money-breakthrough).
6. `PullQuote` — Dave quote + credentials byline.
7. `CTAStrip` — 4 pills + VIP.
8. `Footer` — ECOSYSTEM / SCANS / STUDIO / CONTACT columns.
- `ConciergeFrame` (global) + Apollo tracker (in `layout.tsx`).
- `EscapeStrip` exists but is UNMOUNTED (removed from page earlier). Available to delete or repurpose.

**`app/layout.tsx`:** has `metadata` (title/desc/OG/twitter/canonical/robots) + `orgSchema` (Organization) + `siteSchema` (WebSite) JSON-LD + Apollo tracker. UPDATE metadata + ADD ItemList schema here.

**`app/api/route-click/route.ts`:** POST receiver, tags clicks by `audience` into LeadConnector (DBC) — env `DBC_PIT_TOKEN`, `DBC_LOCATION_ID`, optional `DBC_WEBHOOK_URL`. Returns ok even if unconfigured. **Route all new analytics events here via `navigator.sendBeacon`.**

**`robots.ts` + `sitemap.ts`:** exist, currently point base `https://ownly-hub.vercel.app` — should be `https://itsownlymoney.com` (fix while here).

---

## REUSE — don't rebuild
- **`ConciergeFrame` modal system:** any link with `data-frame="modal"` opens in an in-page iframe IF its hostname is in the `FRAMEABLE` allowlist, else shows a "opening in new tab" toast. It already `sendBeacon`s `/api/route-click`. **All ecosystem/tool links should use `data-frame="modal"`** so they preview in-frame. To make a new tool frameable, add its hostname to `FRAMEABLE` in `ConciergeFrame.tsx`.
  - Current FRAMEABLE: `e-estate.co, ownly-gap-audit.vercel.app, ownly-business-credit-builder.vercel.app, campbellwa.vercel.app, ownly-web-studio.vercel.app, the-ownly-breakthrough.vercel.app, itsownlymoney.vercel.app, venice50kchallenge.com, venicebusinessacademy.com, localspotlightads.com`
- **`/api/route-click`** for events. Use the spec's event names as the `type`/`audience` payload.
- **Org + WebSite schema** already in layout — extend, don't duplicate.

---

## DESIGN TOKENS (real CSS var names — globals.css)
```
--paper-cream #FDFCF8   --paper-warm #F5F1E8   --paper-bone #F8F5EA
--ink #0F1F39   --ink-deep #0a0e1a   --ink-mid #1B3C73   --text-mute #5A6B82
--gold #B8965A   --gold-warm #C9A767   --gold-soft #D4B87A   --gold-dark #8B7044
--green #3F6F47   --hairline rgba(184,150,90,0.35)
--ff-display 'Cormorant Garamond'   --ff-body 'Inter'   --ff-mono 'JetBrains Mono'
--radius-sm 8 / --radius 16 / --radius-lg 24   --container 1180px
```
Tailwind v4 `@theme` mirrors these as `--color-*`, `--font-*`, `--radius-*` (use `bg-ink`, `text-gold`, etc.).
**LOCKED:** any Cormorant Garamond number must carry `font-variant-numeric: lining-nums tabular-nums` (project rule — old Cormorant figures render as oldstyle otherwise).

---

## LINK REGISTRY (VERIFIED — build `/data/links.ts` from this)
Every link below is confirmed in the live source 2026-06-12. Schema per link: `id, label, url, audience, category, priority, desc, primaryCTA, external, openInNewTab, frame:true`.

| id | label | url | audience | category |
|----|-------|-----|----------|----------|
| hub | Ownly ONCE Hub | https://itsownlymoney.com/ | all | core |
| biz_breakthrough | Business Breakthrough | https://the-ownly-breakthrough.vercel.app/?source=hub&audience=business | business | business |
| money_breakthrough | Money Breakthrough | https://ownly-money-breakthrough.vercel.app/?source=hub&audience=individual | household | household |
| ai_audit | AI Assessment / Audit | https://ownly-gap-audit.vercel.app/ | business,self | ai |
| biz_credit | Business Credit / Fundability Scan | https://ownly-business-credit-builder.vercel.app/ | business | credit |
| ai_revenue | AI Revenue Generator | https://app.mplannerpro.com/abce1ffefc/chat?pg=dea8573397 | business | ai |
| web_studio | Web Studio | https://ownly-web-studio.vercel.app/ | business,self | ai |
| sit_down | 6 Figure Sit Down | https://calendly.com/daveivery/sit_down | all | authority |
| vip_trip | VIP Trip | https://ownly-vip-trip.vercel.app/ | vip | vip |
| escape_plan | E-Estate / Escape Plan | https://because.itsownlymoney.com/ | self,household | self |
| cashflow_dreams | Cash Flow / DREAMS | https://dreams.itsownlymoney.com/ | household | household |
| credit_partner | Our Credit Partner | https://newageliteracy.com/ | business,credit | credit |
| wondertrust | IRS Penalty Refund | https://filemycredit.com/daveivery | all | credit |
| signin_wealthpath | Sign in / WealthPath app | https://itsownlymoney.vercel.app | all,household | household |
| ownly_marketing | Ownly Marketing | https://ownly-marketing.vercel.app/ | business | ai |
| local_spotlight | Local Spotlight | https://localspotlightads.com | restaurant,business | ai |
| eight_min_audit | 8 Minute Audit | https://8minuteaudit.com | business | authority |
| venice_50k | Venice 50K Challenge | https://venice50kchallenge.com | self | authority |
| venice_academy | Venice Business Academy | https://venicebusinessacademy.com | business | authority |

**Discrepancy to reconcile:** live AI Revenue Generator = `…chat?pg=dea8573397` (verified on itsownlymoney.com). Local `Footer.tsx` currently shows `…chat?pg=e1dbf00f32`. Confirm correct `pg` param with Dave before locking the registry.

---

## NEEDS DAVE URL (spec references these — DO NOT INVENT. Use `#` + TODO, list for review)
| id | label | spec path | status |
|----|-------|-----------|--------|
| restaurant_breakthrough | Restaurant Breakthrough | restaurant | URL unknown — maybe `the-ownly-breakthrough…?audience=restaurant`? CONFIRM |
| restaurant_gpt | RestaurantGPT / profit-leak scan | restaurant | no URL |
| fica_tip_credit | FICA Tip Credit check | restaurant | no URL |
| arf_capital | ARF / restaurant capital | restaurant | no URL |
| ringfoods | RingFoods | restaurant | no URL |
| stella | Stella | restaurant | no URL |
| missed_call | Missed-call / speed-to-lead | restaurant | no URL |
| freedom_score | Freedom Score | household | no URL |
| planswell | Planswell | self,household | memory: front door `adv-david-124` → 6FSD; get exact URL |
| tax_retirement | Tax / Retirement strategy | self | no URL |
| restaurant_review | Book Restaurant Money Review | restaurant | likely a Calendly — CONFIRM |
| dave_books | Dave's books / About | authority | URLs unknown |

---

## BUILD SPEC
Full concierge spec is Dave's brief (paste below verbatim into your working notes). Core requirements:
- **Hybrid funnel** (not chatbot-dependent): conversational hero → identity path selector → dynamic result panel → persistent ecosystem access → static SEO content → centralized link registry.
- **H1:** "Tell us who you are. We'll show you where the money is hiding."
- **6 identity paths:** business, restaurant, self-employed/agent/1099, employee/household, already-sat-down (vip), all-tools. Premium concierge routing cards (icon + short copy + CTA), NOT generic cards.
- **Query-param preload:** `?path=business|restaurant|self-employed|household|vip|all` auto-selects path. Persist selection in localStorage/session.
- **Dynamic path panel** updates headline / explanation / 3 next steps / primary CTA / secondary CTAs / proof / links — without forced navigation.
- **All-Tools vault:** categorized drawer/modal (Business / Restaurant / Household / Self-Employed / Credit-Capital / AI-Web-Marketing / Dave-Authority). Not a footer dump, not Linktree.
- **Top nav:** Ownly ONCE · Choose Path · Business · Household · AI Audit · Book Dave · All Tools.
- **Mobile sticky bottom bar:** Choose Path · All Tools · Book Dave.
- **Authority block:** Dave Ivery — Certified Financial Coach, Certified Cash Flow Specialist, AI-Certified Consultant, Author, PFSA member, creator of Ownly ONCE. Sharp, no bloat.
- **SEO:** title "Ownly ONCE — Business, Cash Flow, Capital, AI & Wealth Tools"; meta per spec; H1 above; H2s per section; ItemList schema for tool categories; keep Org+WebSite. No fake reviews/ratings.
- **Architecture files to create:** `/data/links.ts`, `/data/audiencePaths.ts`, `components/PathSelector`, `components/PathResultPanel`, `components/EcosystemVault`, `components/StickyMobileCTA`, `components/AuthorityBlock`, `components/SeoSchema`.
- **Analytics:** event names `path_selected_<audience>`, `ecosystem_vault_opened`, `cta_clicked_<tool>` → fire via `sendBeacon('/api/route-click', …)`.
- **Perf:** mobile Lighthouse 90+, desktop 95+. Lazy-load non-critical, optimize images, no layout shift, semantic HTML, accessible buttons, keyboard-nav path selector, ARIA on drawers, visible focus, contrast-safe.

---

## LOCKED DECISIONS / GOTCHAS
- **DO NOT push live.** Branch + dev + build + Lighthouse, then stop and show preview + audit table.
- **Preserve every link** in the registry above. None removed, none renamed wrong, none buried.
- **Reuse** `ConciergeFrame` + `/api/route-click` — don't rebuild.
- **Partners, NOT affiliates** (banned word). 
- **"Six Figure Sit Down" / "6 Figure Sit Down"** — never abbreviate to "6FSD" in user-facing copy.
- **Cormorant numbers** → `lining-nums tabular-nums`.
- **No fake testimonials, no unsupported claims, no guarantees.**
- Fonts in live stack are **Inter / Cormorant / JetBrains Mono** (not Atkinson). Match the live stack.
- Don't serve the page as only-families OR only-business — business + restaurant must be clearly served above the fold or one click away.

---

## DELIVERABLES (return all 10)
1. Summary of changes. 2. Full updated code/components. 3. Link registry. 4. Audience-path registry. 5. SEO metadata. 6. Structured data added. 7. **Link audit table** (orig label / orig dest / new location / audience / status: preserved·improved·needs-review). 8. Mobile behavior notes. 9. Testing checklist. 10. Links needing Dave's review before launch (start from NEEDS DAVE URL table).

## ACCEPTANCE (verify before finishing)
No important link removed · business owners served above fold · restaurants served ≤1 click · employees/families still oriented · self-employed/agents have a path · existing contacts can claim VIP · all tools accessible · page feels clean, not a directory, not AI-generic · SEO metadata updated · query params work · mobile sticky CTAs work · All-Tools drawer works · footer links intact · **no live deploy performed.**
