# Alpha Applied Analytics Solutions — Project Memory

**Purpose:** Comprehensive state, architecture, and verification ledger for Antigravity and development continuity.  
**Last updated:** 18 October 2026.  
**Active project directory:** `alpha-applied-analytics-v2` (isolated fresh build).  
**Old project status:** Preserved untouched in `C:\Users\jaiav\OneDrive\Desktop\Alpha Solutions` for comparative review.

---

## 1. Project Directory & Architecture

```text
alpha-applied-analytics-v2/
├── public/
│   ├── favicon.svg                       # Alpha monogram SVG favicon
│   └── images/
│       ├── hero-shapes.png               # High-res ivory arches, teal disc, and gold contours (1024x576 PNG with true alpha)
│       ├── hero-architecture.png         # Neoclassical courthouse cutout (819x1024 PNG with true alpha)
│       └── lady-justice.png              # Bronze Lady Justice statue cutout (819x1024 PNG with true alpha)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx            # Sticky header with logo, anchor links, crimson CTA, and mobile menu trigger
│   │   │   ├── MobileNavigation.tsx      # Accessible slide-out navigation drawer with focus management
│   │   │   └── SiteFooter.tsx            # Deep Cyprus teal grounded footer with links, copyright & legal disclaimer
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx           # Editorial split layout (42% text / 58% artwork), headline, CTAs, grid lines
│   │   │   ├── HeroArtwork.tsx           # 3-layer art-directed scene with smooth scroll parallax
│   │   │   ├── HeroGeometry.tsx          # Blended raster texture shapes and precision SVG arcs/contours
│   │   │   ├── HeroScrollCue.tsx         # Rotated vertical "SCROLL" cue with pulsing indicator
│   │   │   └── HeroServiceStrip.tsx      # 3-pillar service strip with icons and vertical dividers
│   │   ├── sections/
│   │   │   ├── ExpertiseStrip.tsx        # 4 core competencies trust bar
│   │   │   ├── LitigationServicesSection.tsx # Primary practice: 4 dispute services with defensible deliverables & conflict callout
│   │   │   ├── AlphaLensSection.tsx      # Interactive discovery workbench preview with evidentiary audit modes
│   │   │   ├── AIConsultingSection.tsx   # Strategic AI advisory & retrieval pipelines
│   │   │   ├── HowItWorksSection.tsx     # 4-phase disciplined engagement workflow
│   │   │   ├── FounderAboutSection.tsx   # Verified leadership narrative for Krishna & foundational tenets
│   │   │   └── ContactSection.tsx        # Confidential inquiry intake with adverse party conflict screening
│   │   └── ui/
│   │       ├── Button.tsx                # Reusable accessible button with primary, secondary, outline styles
│   │       ├── Logo.tsx                  # Official Alpha monogram icon & serif brand typography
│   │       └── SectionHeading.tsx        # Standardized badge, serif heading, and subtitle component
│   ├── content/
│   │   └── siteContent.ts                # Centralized content model strictly conforming to PRD & Rules
│   ├── styles/
│   │   ├── tokens.css                    # CSS custom properties for locked brand palette & typography
│   │   └── animations.css                # Coordinated entrance keyframes & prefers-reduced-motion fallbacks
│   ├── App.tsx                           # Main application layout assembling all sections in PRD order
│   ├── index.css                         # Tailwind directives and utility classes
│   └── main.tsx                          # React 18 root mount
├── index.html                            # Semantic HTML5 shell with preconnected Google Fonts
├── tailwind.config.js                    # Brand palette tokens, DM Serif Display & Inter configuration
├── postcss.config.js                     # PostCSS with tailwindcss and autoprefixer
├── package.json                          # Dependencies: react 18, react-dom, lucide-react, tailwindcss, vite
└── tsconfig.json                         # Strict TypeScript configuration
```

---

## 2. Asset Mapping & Verified Properties

| Asset | Location | Resolution | Transparency | Dominant Content | Role in Hero |
|---|---|---|---|---|---|
| `hero-shapes.png` | `public/images/hero-shapes.png` | 1024 × 576 | True Alpha (65.2% transparent) | Cyprus teal disc, nested ivory arches, gold taupe contour | Layer 1 background geometry |
| `hero-architecture.png` | `public/images/hero-architecture.png` | 819 × 1024 | True Alpha (29.4% transparent) | Neoclassical courthouse, pediment, Corinthian columns, warm limestone | Layer 2 middle architectural ground |
| `lady-justice.png` | `public/images/lady-justice.png` | 819 × 1024 | True Alpha (65.1% transparent) | Bronze Lady Justice statue, scales in right hand, sword in left, blindfold | Layer 3 foreground focal point |
| `favicon.svg` | `public/favicon.svg` | Vector SVG | N/A | Alpha monogram symbol on Cyprus teal | Browser tab icon |

---

## 3. Brand Identity & Design Tokens

- **Cyprus Deep Teal (`#004643`)**: Headings, brand geometry, icons, hero crescent curves, footer.
- **Sand Dune Warm Ivory (`#F0EDE5`)**: Primary canvas background across all sections.
- **White (`#FFFFFF`)**: Section cards, workbench panels, contrast surfaces.
- **Alpha Crimson (`#C62835`)**: Primary CTA button ("Book a Consultation"), active nodes, attention badges.
- **Muted Taupe (`#A79277`)**: Fine architectural contour lines, eyebrow accents, vertical dividers.
- **Deep Charcoal (`#243432`)**: High-contrast body typography.
- **Slate (`#526174`)**: Supporting copy, metadata labels, platform tags.
- **Typography**:
  - Headings: `DM Serif Display`, Georgia, serif (desktop hero at 56–60px, line-height 1.0).
  - Body & UI: `Inter`, system-ui, sans-serif.

---

## 4. Hero Motion Design & Parallax Implementation

1. **Coordinated Entrance Timeline**:
   - `0ms`: Ivory canvas rendered.
   - `150ms`: Background geometric arches & teal disc fade in and scale smoothly (`anim-layer-geometry`).
   - `450ms`: Classical courthouse architecture emerges with upward directional rise (`anim-layer-architecture`).
   - `700ms`: Bronze Lady Justice enters as foreground focal point with upward settle (`anim-layer-justice`).
   - `200ms–660ms`: Staggered line-by-line reveal of the 4-line serif headline via `overflow: hidden` spans.
   - `720ms`: Supporting paragraph fades in.
   - `840ms`: Consultation CTAs reveal.
   - `980ms`: 3-item service strip emerges with dividers.
   - `1100ms`: Vertical `SCROLL` cue fades in.
2. **Scroll-Linked Depth (Desktop only, `window.innerWidth >= 1024`)**:
   - Background shapes: `scrollY * 0.025`
   - Architecture: `scrollY * 0.055`
   - Lady Justice: `scrollY * 0.095`
   - Transforms managed via `requestAnimationFrame` for 60fps performance without layout recalculations.
3. **Accessibility**:
   - Comprehensive `@media (prefers-reduced-motion: reduce)` rules disable all animations, transforms, and parallax instantly, presenting the finished static resting composition immediately.

---

## 5. Verification & Testing Performed

All tests were actually executed and validated:

1. **Production Build & TypeScript Verification**:
   - Command: `npm run build` (`tsc -b && vite build`)
   - Result: Passed with exit code 0. Zero compiler errors, 0 lint warnings. 1,939 modules transformed.
2. **Lady Justice Position Diagnosis & Root Cause Resolution (18 October 2026)**:
   - **Exact Element Structure**: `<img src="/images/lady-justice.png">` rendered inside `<div className="... anim-layer-justice">` in [`HeroArtwork.tsx`](file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/components/hero/HeroArtwork.tsx). The statue is a standalone transparent PNG cutout (819x1024), NOT baked into geometry or courthouse.
   - **Canvas Pixel Analysis**: `lady-justice.png` has 9.89% (81px) left padding and 10.38% (85px) right padding of transparency. When rendered at 500px width, the visible scales begin ~50px inside the element bounding box.
   - **Root Cause A (Cascading Breakpoint Overrides)**: Classes `lg:left-[12%] xl:left-[14%] 2xl:left-[15.5%]` meant that on any desktop display >= 1280px (`xl`), `xl:left-[14%]` overrode `lg:left`, and on screens >= 1536px (`2xl`), `2xl:left-[15.5%]` overrode both. Because larger breakpoints had larger percentages, Lady Justice was actually being pushed further right on desktop, and adjustments to `lg:left` had zero effect on desktop viewports.
   - **Root Cause B (Animation Fill-Mode Transform Lock)**: `.anim-layer-justice` uses `animation-fill-mode: both` with keyframe `to { transform: translateY(0) scale(1); }`. Any attempt to shift the statue using CSS `transform: translateX(...)` was overridden by the keyframe transform matrix.
   - **Root Cause C (Production Preview Server)**: The running preview server was serving the pre-built `dist/` bundle on port 4175, so changes to `.tsx` files without running `npm run build` were not reflected.
   - **Controlled Fix Applied**: In [`HeroArtwork.tsx`](file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/components/hero/HeroArtwork.tsx#L58-L66), updated horizontal positioning to `lg:left-[4%] xl:left-[6.5%] 2xl:left-[9.5%]`.
   - **Verified Measurements Post-Animation**:
     - **1680×900**: Scales clearance: **37px**; Center ratio: **59.3%** across viewport; Overlap with courthouse columns: **85px**; Pediment and columns fully visible.
     - **1440×900**: Scales clearance: **48px**; Center ratio: **59.3%** across viewport; Overlap with courthouse columns: **59px**.
     - **1366×768**: Scales clearance: **51px**; Center ratio: **59.3%** across viewport; Overlap with courthouse columns: **56px**.
     - **Animation Verification**: Monitored at 200ms during animation (`matrix(0.99, ...)` with Y translation) and at 2500ms post-animation (`matrix(1, 0, 0, 1, 0, 0)`). Confirmed final resting position is completely stable.
3. **Verified Client Content Audit & Replacement (18 October 2026)**:
   - **Dummy Copy & Fabricated Claims Removed**:
     - Removed numerical statistics ("3x faster", "18+ years", "3-layer security", "100% QA pass rate").
     - Removed fabricated financial amounts ($4,250,000, $2.8M, $1.45M), fake file names (`Fedwire_Disbursements_2024-2025.csv`), and fake Benford's Law anomaly claims from the platform section.
     - Removed dummy contact information (`info@alphasolutions.com`, `+1 555 123 4567`).
     - Removed unverified response time SLAs ("within 24-48 hours", "within 24 business hours").
     - Removed unverified claims of "institutional-grade" and "court-tested" guarantees.
   - **Confirmed Business Pillars Implemented**:
     1. **Litigation Services**: Foundational primary practice featuring 4 confirmed practice areas (Quantum of Damages & Loss Quantification, Forensic Accounting & Transaction Tracing, Financial Analysis & Dispute Reporting, Early Case & Financial Exposure Assessment).
     2. **Alpha Lens Platform**: Proprietary analytics workbench presented as an architectural showcase across 4 confirmed capabilities without fabricated client/case data.
     3. **AI Consulting & Implementation**: Practical advisory focused on AI readiness, document intelligence strategy, structured extraction, and governance.
     4. **Who We Serve**: Dedicated section added for confirmed target audiences (Litigation Counsel & Law Firms, Corporate Boards & General Counsel, Advisory & Accounting Practitioners).
     5. **Founder & About**: Restrained narrative with confirmed founder name **Krishna**, focusing on founding mission without fabricated qualifications or years of experience.
     6. **Contact & Footer**: Confidential intake form with conflict clearance protocols and general legal notices.
   - **Checklist Generated**: Created [`CLIENT_CONTENT_REQUIRED.md`](file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/CLIENT_CONTENT_REQUIRED.md) in the project root cataloging all confirmed items vs. pending client input.
   - **Verification**: Clean build (`npm run build`, exit code 0) and Playwright audit across 4 viewports confirmed 0 unverified claims, 0 horizontal overflow, and 100% functional section anchors.
5.4. **Phase 4: Verified Copy Replacement, Alternating Section Themes & Translucent Header (Completed)**:
    - **Translucent Glass Header on Scroll**:
      - Implemented in [`SiteHeader.tsx`](file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/components/layout/SiteHeader.tsx).
      - Tracks `window.scrollY > 20` with a smooth 300ms transition.
      - Top state (`scrollY <= 20`): Solid `#F0EDE5` Warm Ivory background (`bg-surface-warm`), subtle border `border-brand-border/40`, no shadow.
      - Scrolled state (`scrollY > 20`): Translucent Warm Ivory `bg-[#F0EDE5]/85` with `backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]`, subtle taupe border `border-brand-taupe/20`, and delicate bottom shadow `shadow-xs`.
      - Offset padding: All in-page section targets include `scroll-mt-20` so jumping to any navigation link aligns cleanly below the 80px sticky header without obscuring headings.
    - **Alternating Color Rhythms**:
      - **Theme A (Warm Ivory Editorial `#F0EDE5`)**:
        - *Hero Section*: Retains cinematic layered artwork, Lady Justice statue, classical courthouse pediment, teal ring, and gold sunburst.
        - *Expertise Summary Strip*: Light neutral background (`bg-white/90`) bridging hero into services.
        - *Litigation Services Section*: Warm ivory canvas `#F0EDE5` with crisp elevated white cards, refined Playfair serif typography, and numbered service tags (01–06).
        - *AI Consulting & Implementation Section*: Warm ivory canvas `#F0EDE5` with structured white advisory cards (Stages 01–03).
        - *Who We Serve Section*: Light editorial canvas `#FAF9F6` with targeted audience cards for legal counsel, CDFA practitioners, and advisory teams.
      - **Theme B (Deep Cyprus Green `#004643`)**:
        - *Alpha Lens Platform Section*: Deep Cyprus teal `#004643` with high-contrast Sand Dune ivory typography, dark teal terminal mockups `#003432`, and interactive workflow indicators.
        - *Founder & About Section*: Deep Cyprus teal `#004643` featuring restrained founder narrative for Krishna, core principles (Analytical Objectivity, Data Confidentiality, Computational Rigor), and ivory text hierarchy.
        - *Contact / Consultation Section*: Deep Cyprus teal `#003634` featuring direct practice contact details, practice area selector, and intake form.
        - *Site Footer*: Deepest Cyprus Navy/Teal `#00201E` with copyright, legal notice, and navigational links.
    - **Exact Client Copy Implemented**:
      - Centralized in [`siteContent.ts`](file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/content/siteContent.ts) and verified against client reference site (`https://alpha-website-dun.vercel.app/`):
        - Eyebrow: `LITIGATION ANALYTICS · FINANCIAL INVESTIGATION · AI-ASSISTED INSIGHT`
        - Headline: "Clarity for Complex Legal & Financial Challenges."
        - 3 Core Business Pillars: Litigation Services, Alpha Lens Platform, AI Consulting & Implementation.
        - Litigation Services: Divorce & Family Law, Economic Damages, Document Analysis, Bankruptcy & Restructuring, Intellectual Property, Litigation Support.
        - Alpha Lens Platform: Bank Statement Extraction, Document Processing & Coverage, Financial Data Quality Checks, Analytical Review & Reporting.
        - AI Consulting: Identify the Opportunity, Evaluate the Approach, Plan Implementation.
        - Who We Serve: Attorneys & Law Firms, CDFA Practitioners, Litigation & Advisory Teams.
        - About: Rigorous Analysis. Clearer Financial Understanding., Founder Krishna.
        - Verified Contact: `info@alphaanalyticssol.com`, `+91 93915 69629`, LinkedIn.
      - All dummy claims (`3x Faster`, `18+ Years`, `100% QC score`, unverified case statistics) remain completely eliminated.
    - **Automated Verification**:
      - Clean production build: `npm.cmd run build` (exit code 0, 1,939 modules transformed).
      - Playwright headless Edge browser verification passed with 100% assertions satisfied for header glass computed styles (`backdrop-filter: blur(14px)`), section background colors, and exact prompt copy.
5.5. **Phase 5: Website Copy Update from Content Specification (Completed)**:
    - **Source of Truth**: [`Alpha_Applied_Analytics_Content_Spec.md`](file:///c:/Users/jaiav/Downloads/text/text.md) and client reference site (`https://alpha-website-dun.vercel.app/`).
    - **Exact Content Replaced Across All Sections**:
      - *Hero Eyebrow*: `Serving Law Firms Worldwide`
      - *Hero Headline*: `Litigation Analysis Financial Services.` / `AI-Powered. Precise.`
      - *Hero Supporting Copy*: `We help attorneys and financial professionals uncover hidden assets, trace spending patterns, and deliver litigation-ready analysis reports — in days, not weeks.`
      - *Hero Actions*: `Book a Free Strategy Call` (links to `#contact`) and `See How It Works` (links to `#alpha-lens`).
      - *Trust Statements*: `NDA-Protected Analysis`, `Serving Attorneys Worldwide`, `Dedicated Point of Contact`, `Personal QC on Every Deliverable`.
      - *Results / Capability Metrics*: `3× Faster Than Manual Effort`, `Multi-Tab Comprehensive Litigation Analysis Reports`, `3-Layer AI + Analytics + Manual QC`, `18+ Years of Analytics Experience` (flagged for client confirmation).
      - *Litigation Services (6 Cards)*: `Specialized Analytic Methodology for Legal Matters`, `Deep expertise across multiple practice areas, powered by AI and reviewed by human analysts.` (Divorce & Family Law, Economic Damages, Document Analysis, Bankruptcy & Restructuring, Intellectual Property, Litigation Support; all cards linking with `Learn More`).
      - *Alpha Lens Platform*: `AI Powered Tool Built for Litigation Support`, `Every tool in our platform is purpose-built for litigation workflows. Not repurposed accounting software — real analytic engines.` (Bank Statement Extraction / Multi-Bank Support, PDF Processing & Coverage Tracker / AI Document Processing, Quality Control AI / Litigation-Grade QC, AI Powered Analytics Engine / Litigation-Ready Reports; fully populated with sample tables, 12-month coverage tracker, and QC checklists clearly labeled as illustrative mock data).
      - *Who We Serve*: `Built for Legal & Financial Professionals` (Attorneys & Law Firms, CDFA Practitioners, Litigation & Advisory Teams).
      - *About Section*: `AI-Powered Litigation Analysis Financial Services` with confirmed founder Krishna.
      - *Contact Section*: `Let's Review Your Next Case Together`, `Book a 15-minute call. We'll walk through how our litigation analysis AI engine can support your practice — no commitment, no pitch deck.`, Primary CTA `Book a Free Strategy Call`, Secondary CTA `Request Sample Report`, Phone/WhatsApp `+91 93915 69629`, Email `info@alphaanalyticssol.com`.
      - *Footer*: `AI-powered litigation analysis financial services for attorneys, CDFAs, and litigation teams worldwide.`, 6 Services links, 5 Platform links, 4 Company/Legal links, copyright © 2026.
    - **Non-Negotiables Preserved**:
      - Visual presentation completely preserved: warm ivory `#F0EDE5`, Cyprus teal `#004643`, Alpha crimson accents `#C62835`, Lady Justice and classical courthouse pediment, geometric rings, animations, translucent blurred header (`backdrop-blur-[14px]`).
      - Single-page anchor architecture intact (`#home`, `#litigation`, `#alpha-lens`, `#ai-consulting`, `#who-we-serve`, `#about`, `#contact`).
      - Zero generic AI placeholder copy.
    - **Verification**:
      - Production build `npm.cmd run build` passed cleanly with exit code 0 (`1939 modules transformed` in 2.84s).
      - Automated Playwright Edge test (`verify_content_spec.cjs`): 100% of all 42 assertions passed. Interactive tab switching verified across all 4 platform preview panels.

---

## 6. How to Run the Project Locally

```bash
# Navigate to the isolated project folder
cd "alpha-applied-analytics-v2"

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 7. Outstanding Client Dependencies (For Future Launch)

1. **Booking URL / Scheduling Integration**: Current CTA points to `#contact` with confidential intake form. Client to supply Calendly/booking URL if external scheduling tool is preferred.
2. **Founder Portrait**: Verified name Krishna implemented with role title and philosophy; client to provide high-resolution founder portrait if photo display is desired.
3. **Regulatory / Jurisdiction Details**: Client to provide official registered address, entity jurisdiction, and specific privacy policy / disclaimers if required prior to domain connection.
