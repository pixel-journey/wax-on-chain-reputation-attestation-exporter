# wax-on-chain-reputation-attestation-exporter — On-Chain Reputation Attestation Exporter

> **Status:** 🔒 Private (In Development) | Target Public Release: July 2026  
> **Category:** Reputation, DAO & Governance Tooling (Expansion)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** A tool that generates cryptographically signed, verifiable on-chain reputation attestations and beautiful exportable reports based on a wallet’s on-chain activity, loyalty, and contributions for DAOs, guilds, and launchpads on WAX.

---

## 1. Overview & Goal

This blueprint delivers a clean, trustworthy interface where users (or DAOs) can generate signed reputation reports. The system aggregates signals from Hyperion history, AtomicAssets holdings, voting participation, LP behavior, cross-game activity, and other on-chain actions, then produces a beautiful, shareable report with cryptographic attestation via WharfKit.

**Why it matters for WAX/Antelope:**
- DAOs and launchpads need better ways to verify genuine contributors vs Sybils without centralized databases.
- Existing reputation is fragmented across many dApps; this unifies it into portable, signed attestations.
- Pure public infrastructure — fully client-side and reproducible.
- Enables better airdrops, whitelist decisions, governance weighting, and guild recruitment.

**Target users:**
- DAO operators and proposal reviewers
- Guild leaders and community managers
- Launchpad and airdrop teams
- Individual power users wanting portable reputation

**Success metrics:**
- Generate and sign a comprehensive report in < 10 seconds
- Clear, explainable scoring with evidence links
- 95+ Lighthouse scores
- High adoption for DAO tooling

---

## 2. Concepts & Inspiration

### Core Blockchain Concepts
- **Hyperion action history**: Voting, LP actions, transfers, claims as reputation signals.
- **AtomicAssets holdings & mutable data**: Loyalty badges, achievements, long-term holding as proof.
- **WharfKit signed transactions**: Using eosio.null or custom memo actions for attestation anchoring.
- **Weighted multi-signal scoring**: Customizable weights for different on-chain behaviors.

### User Pain Points Addressed
- Hard to prove “I’ve been active and loyal” in a verifiable way across dApps.
- DAOs struggle with Sybil resistance in voting and distributions.
- Reputation is siloed; no portable, signed export.

### Inspirations
- Traditional: LinkedIn endorsements, credit reports, academic transcripts with verification.
- Web3: Soulbound tokens, on-chain credentials (e.g., Gitcoin Passport style but lighter and WAX-native), signed attestations in DAOs.
- Design: Clean dashboard + report preview like Notion or Linear exports.

**Related Blueprints (synergy):**
- Pairs beautifully with `wax-reputation-scorecard-social-radar`, `wax-defi-loyalty-health-scorecard`, `wax-wallet-entity-resolution-graph`, and `wax-cross-game-inventory-synergy-detector`.
- Feeds into DAO tooling and launchpad decision flows.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- **Overall layout**: Clean dashboard with signal breakdown cards, overall score, and “Generate Report” button. Preview pane shows the beautiful exportable report (PDF-like or web view). Sidebar for weight customization and evidence drill-down.
- **Color palette**: Pixel Journey DS — professional indigo + emerald for verified signals, amber for partial, clean neutrals.
- **Micro-interactions**: Smooth score updates when weights change, satisfying signature animation on export, copy-to-clipboard for attestation hash.
- **Responsive**: Excellent on desktop for detailed configuration; mobile-friendly report viewing and sharing.

### 3.2 Key Views / Components
- `SignalBreakdown.tsx` — Cards showing contribution to score from different on-chain categories with evidence links.
- `WeightCustomizer.tsx` — Sliders or presets for DAO-specific weighting (e.g., LP vs voting vs holding).
- `ReportPreview.tsx` — Beautiful formatted preview of the final attestation document.
- `AttestationSigner.tsx` — WharfKit flow to anchor the report on-chain.
- `ExportPanel.tsx` — Options for PDF, JSON, shareable link, or on-chain attestation.

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA: Full keyboard support, high-contrast report views, clear aria labels on scores.
- Screen reader: Announcements of score changes and key evidence.
- Reduced motion: Toggle for calmer updates.

### 3.4 Performance & Optimization Targets
- Lighthouse 95+
- Fast aggregation even with years of Hyperion history (smart pagination + caching)
- Smooth weight adjustments with instant score recalculation

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui + framer-motion
- **State & Data:** @tanstack/react-query + zod + Jotai
- **Wallet & Signing:** @wharfkit/session
- **Blockchain Data:** Hyperion for history + AtomicAssets for holdings and mutable data
- **Attestation:** Client-side scoring + WharfKit transaction for anchoring (eosio.null or dedicated action)
- **Utilities:** date-fns, lucide-react, sonner, html-to-image or jsPDF for exports

### 4.2 Data Flow Diagram
```
Connect wallet or enter account
    ↓
Fetch multi-category signals (Hyperion + Atomic)
    ↓
Apply customizable weights → calculate scores
    ↓
Generate beautiful report preview
    ↓
User reviews & signs via WharfKit
    ↓
Optional on-chain anchoring + export options
```

### 4.3 Folder Structure
```
app/
├── (reputation)/
│   └── page.tsx                 # Main reputation exporter
├── components/
│   ├── reputation/
│   │   ├── SignalBreakdown.tsx
│   │   ├── WeightCustomizer.tsx
│   │   ├── ReportPreview.tsx
│   │   └── AttestationSigner.tsx
├── hooks/
│   ├── useReputationSignals.ts
│   └── useWharfkitSession.ts
├── lib/
│   ├── wax/
│   │   ├── signal-aggregator.ts
│   │   ├── scoring-engine.ts
│   │   └── attestation-builder.ts
│   └── utils.ts
├── types/
│   └── reputation.ts
public/
└── mock-data/                   # Sample reputation profiles for demo
```

### 4.4 Security & Privacy Notes
- All scoring is client-side
- User explicitly signs any attestation
- Clear disclaimers on what the score represents

---

## 5. Implementation Examples & Code Snippets

### 1. Signal aggregation hook (simplified)
```ts
// hooks/useReputationSignals.ts
export function useReputationSignals(account: string) {
  return useQuery({
    queryKey: ['reputation', account],
    queryFn: async () => {
      const history = await hyperion.getActions({ account });
      const holdings = await atomic.getAssets({ owner: account });
      return aggregateSignals(history, holdings);
    },
  });
}
```

### 2. Scoring engine example
```ts
// lib/wax/scoring-engine.ts
export function calculateScore(signals, weights) {
  return Object.keys(weights).reduce((total, key) => {
    return total + (signals[key] || 0) * weights[key];
  }, 0);
}
```

### 3. Attestation signing
```ts
// User signs a memo or action containing the report hash
await session.transact({
  actions: [{
    account: 'eosio.null',
    name: 'nonce',
    data: { ...reportHash }
  }]
});
```

---

## 6. Demo & Testing Strategy

- **Live Demo Toggle:** Mock profile ↔ Live wallet data
- **Storybook** for all components
- **Playwright** e2e: connect → customize weights → preview → sign & export
- **Vitest** for scoring logic
- Vercel previews

---

## 7. Roadmap & Development Phases

**Phase 0 — Scaffold (1 day)**
- Next.js + Tailwind + shadcn + WharfKit + signal fetchers

**Phase 1 — Data & Scoring (4 days)**
- Multi-source aggregation, customizable weighting, scoring engine

**Phase 2 — Core UI (3–4 days)**
- Signal breakdown, weight customizer, report preview, signing flow

**Phase 3 — Polish (2 days)**
- a11y, performance, responsive, beautiful report styling

**Phase 4 — Documentation & Release (2 days)**
- Full README, screenshots/GIFs, AI prompt pack, make public, catalog update

**Future Enhancements**
- DAO-specific templates and presets
- Integration with existing reputation radars and loyalty scorecards
- Batch generation for entire voter lists or guild members
- On-chain reputation NFT minting option

---

## 8. Visual References & Mockups

**Key Screen:**
Clean dashboard with categorized signal cards (LP activity, Voting history, Holdings loyalty, Cross-game contributions). Sliders for weight customization on the side. Large “Generate Signed Report” button. Clicking it opens a beautiful preview pane that looks like a professional credential document, with signature button at the bottom.

> *Feels like a mix of LinkedIn verification + calm Web3 dashboard + official document exporter.*

**ASCII Sketch:**
```
[ Connect Wallet ]

Signal Breakdown          Weights
[LP Activity: 85]          [Slider 0.3]
[Voting: 72]               [Slider 0.25]
[Holdings: 91]             ...

Overall Score: 84/100

[ Generate Signed Report ]
```

---

## 9. Related Blueprints & Ecosystem Fit

- `wax-reputation-scorecard-social-radar` & `wax-defi-loyalty-health-scorecard` — Direct data sources and complementary views.
- `wax-wallet-entity-resolution-graph` — Helps filter Sybil noise before attestation.
- `wax-cross-game-meta-economy-flow-visualizer` — Enriches cross-game contribution signals.

---

## 10. License, Contributing & Credits

- MIT License
- Built with ❤️ for WAX DAOs and reputation builders
- Powered exclusively by public Hyperion and AtomicAssets infrastructure
- Pixel Journey Design System for clean, trustworthy interfaces
- Special thanks to the gkniftyheads-tracker quality bar and Phase 1 audit

**This blueprint turns fragmented on-chain activity into portable, signed reputation credentials.**

*Pixel Journey — Beautiful interfaces for public blockchain data.*

---

*Last updated: July 02, 2026*