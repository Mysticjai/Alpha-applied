# Alpha Applied Analytics Solutions — Architecture

**Status:** Recreated baseline for a fresh, independent project.  
**New project directory:** `alpha-applied-analytics-v2`.  
**Preferred stack:** React + Vite + TypeScript; Tailwind CSS only if compatible with the chosen setup.  
**Deployment:** GitHub/Vercel are proposals and must be confirmed before production actions.

## 1. Architecture goals

- Build a single-page marketing website with no unnecessary backend.
- Separate visual sections into maintainable components.
- Keep content and claim verification separate from layout code.
- Centralise design tokens.
- Treat hero geometry, architecture, and Lady Justice as independently controllable visual layers.
- Prioritise visual fidelity, responsive design, accessibility, and performance.
- Build in a new folder; do not import or overwrite problematic layout/CSS from the old project.

## 2. Suggested component tree

```text
alpha-applied-analytics-v2/
├── public/
│   ├── images/
│   │   ├── hero-shapes.png              # provided/generated, if retained as raster
│   │   ├── hero-architecture.png        # courthouse cutout
│   │   ├── lady-justice.png             # statue cutout
│   │   ├── alpha-lens-preview.webp      # only if client-approved
│   │   └── founder.webp                 # only if client-approved
│   └── favicon.svg                      # approved or client-supplied
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   └── SiteFooter.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroArtwork.tsx
│   │   │   ├── HeroGeometry.tsx          # SVG/CSS curves, circles and arches
│   │   │   ├── HeroScrollCue.tsx
│   │   │   └── HeroServiceStrip.tsx
│   │   ├── sections/
│   │   │   ├── LitigationServicesSection.tsx
│   │   │   ├── AlphaLensSection.tsx
│   │   │   ├── AIConsultingSection.tsx
│   │   │   ├── HowItWorksSection.tsx     # only if approved
│   │   │   ├── FounderAboutSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   ├── content/siteContent.ts
│   ├── styles/tokens.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── PRD.md
├── Architecture.md
├── Rules.md
├── Phases.md
├── Design.md
├── Memory.md
└── README.md
```

Adapt this structure to the actual project and selected tooling. Do not create meaningless wrapper components; keep components useful and cohesive.

## 3. Runtime and page flow

```text
Browser
└── React/Vite app
    ├── SiteHeader / MobileNavigation
    ├── HeroSection
    │   ├── HeroGeometry (SVG/CSS)
    │   ├── Architecture layer
    │   ├── Lady Justice layer
    │   ├── Editorial copy and CTAs
    │   ├── HeroServiceStrip
    │   └── HeroScrollCue
    ├── LitigationServicesSection
    ├── AlphaLensSection
    ├── AIConsultingSection
    ├── Optional HowItWorksSection
    ├── FounderAboutSection
    ├── ContactSection
    └── SiteFooter
```

Navigation should use working in-page anchors for `#home`, `#litigation`, `#alpha-lens`, `#ai-consulting`, `#about`, and `#contact`, where those sections exist.

## 4. Stack and dependencies

- React for component-based UI.
- Vite for local development and production build.
- TypeScript for typed props and structured content.
- Tailwind CSS if selected and configured intentionally; inspect current version requirements in the new project.
- CSS custom properties for brand tokens.
- Use existing/selected animation tooling for coordinated entrance; prefer one animation system over overlapping libraries.
- Use SVG/CSS for background circles, arcs, and curved ribbons where it improves control.
- Do not add a heavy 3D engine, video framework, backend, CMS, or unrelated dependencies without approved need.

## 5. Hero asset compositing

Before styling, inspect every provided hero asset programmatically or through an image viewer:
- Verify pixel dimensions and aspect ratio.
- Check whether alpha transparency exists and whether it is real.
- Find baked solid backgrounds or unwanted edges.
- Determine suitable object positioning and crop.
- Preserve originals and use clear filenames.

Suggested visual stack:
1. Page canvas (Sand Dune).
2. Large deep-teal circle and nested ivory/sand arcs/ribbons (prefer SVG/CSS for controllability).
3. Courthouse architectural cutout.
4. Lady Justice cutout.
5. Headline and controls as actual HTML.

Do not bake text into images or use a flattened screenshot as the site hero. Keep geometry, architecture, and statue independently adjustable and animatable.

## 6. Content architecture

Store approved website copy in `src/content/siteContent.ts` or an equivalent structured source. Keep the following groups separate:
- `navigation`
- `hero`
- `servicePillars`
- `litigationServices`
- `alphaLens`
- `aiConsulting`
- `workflow` (conditional)
- `founder`
- `contact`
- `footer`

Use development-only comments or explicit TODOs for missing client inputs. Never expose internal placeholders on the published page. Do not fabricate facts to fill missing content.

## 7. Booking and contact

No booking provider, form recipient, endpoint, or custom backend has been confirmed. Use only supplied valid contact details or configured destinations. If a form is later required, confirm fields, recipient, submission delivery, spam protection, storage, and privacy requirements first. Do not build confidential document upload in this scope.

## 8. Deployment model

Proposed flow:

1. Work in new `alpha-applied-analytics-v2` directory.
2. Install dependencies and run locally.
3. Validate build and browser rendering.
4. Create/commit to a dedicated repository only after verifying repository ownership and intent.
5. Deploy preview to an approved hosting account.
6. Obtain client approval.
7. Confirm domain registrar/DNS and inspect existing email records.
8. Connect custom domain only after explicit approval.
9. Verify HTTPS, redirects, anchors, CTAs, mobile rendering, and production errors.

GitHub and Vercel are proposed, not verified. Do not change DNS/nameservers without approval and an impact review.

## 9. Performance and testing

- Optimize images without degrading statue/architecture detail.
- Use AVIF/WebP for suitable photographic assets; retain transparent PNG where appropriate.
- Set image dimensions/aspect ratios to avoid layout shifts.
- Do not lazy-load the primary hero/LCP image; lazy-load appropriate below-fold images.
- Keep fonts and scripts limited.
- Animate transforms/opacity where feasible; avoid constant expensive scroll work.
- Respect reduced-motion settings.
- Test keyboard navigation, links, anchors, image failure behaviour, console errors, mobile overflow, and production build.

## 10. Pending architecture decisions

- Final font choice and font delivery strategy.
- Exact animation library and version after project creation.
- Final asset format/paths after asset inspection.
- Booking/contact integration.
- Approved hosting account, repository, domain, analytics, and SEO requirements.
