# Alpha Applied Analytics Solutions — Development Phases

**Implementation target:** fresh, independent project in `alpha-applied-analytics-v2`.  
**Previously discussed budget:** ₹8,000.  
**Previously discussed duration:** 7–10 days.  
**Timing note:** proposed milestones should be reconfirmed before treating them as committed.

## Phase 0 — Recover specification and isolate the new project

- Read all supplied Markdown project documents and reference screenshots.
- Inspect the three artwork layer assets and verify actual transparency.
- Create `alpha-applied-analytics-v2` separately from the old implementation.
- Do not edit/delete the old project.
- Establish the framework and configuration from Architecture.md.

**Done when:** the new project is isolated, the specification is understood, and the required assets are mapped.

## Phase 1 — Asset audit and visual composition

- Inspect background geometry, courthouse architecture and Lady Justice individually.
- Check dimensions, crop, transparency, subject placement, and lighting.
- Recreate/supplement arches, circles and sweeping teal ribbon with SVG/CSS if needed.
- Establish the intended layer order: geometry → architecture → Lady Justice.
- Build the static hero before working on animation.

**Done when:** the hero reads as one coherent scene without rectangular image framing, with background shapes visible and architecture recognisable behind the statue.

## Phase 2 — Brand and layout system

- Implement central colour and typography tokens.
- Build navigation and responsive header.
- Implement left editorial hero content and the right-side artwork composition.
- Fit CTAs on one line at desktop sizes.
- Add the vertical scroll cue and three-item service strip.
- Check target desktop viewports around 1680 × 900 and 1440 × 900.

**Done when:** the static hero has balanced spacing, a visible brand palette, and no clipped controls or awkward wraps.

## Phase 3 — Motion implementation

- Implement the coordinated entrance: background, arcs/teal sweep, architecture, statue, text, CTAs, service strip/scroll cue.
- Use overlapping transitions and subtle motion.
- Add restrained scroll depth only if it does not destabilise the composition.
- Support `prefers-reduced-motion` and static fallbacks.

**Done when:** animation enhances a correct composition instead of hiding layout issues; resting positions are stable.

## Phase 4 — Landing page sections

Implement, in order:
1. Navigation.
2. Hero.
3. Optional verified expertise/trust strip.
4. Litigation Services.
5. Alpha Lens Platform.
6. AI Consulting & Implementation.
7. How It Works only if its process is confirmed.
8. Founder & About.
9. Contact / Book a Call.
10. Footer.

Use approved copy and original/licensed/client-approved imagery. Mark missing content in developer notes, never as visible public placeholders.

**Done when:** the one-page site has coherent section structure, real anchors, and working valid CTAs.

## Phase 5 — Responsive and accessibility QA

- Test phone, tablet, laptop, and wide desktop.
- Test image layering, transparency, headline wrapping, CTA alignment, service strip, scroll cue, and viewport bottom.
- Check navigation/menu, keyboard focus, contrast, labels, alt text, and `prefers-reduced-motion`.
- Check horizontal overflow, broken links, console/network errors, image loading and layout shifts.
- Run available lint, typecheck, and production build.

**Done when:** there are no known serious layout, accessibility, or functionality defects and the checks are accurately documented.

## Phase 6 — Client content review and launch

- Confirm final hero copy, litigation services, Alpha Lens features, AI consulting copy, founder information and CTA destinations.
- Confirm domain, DNS, existing email records, repository and hosting account ownership.
- Share a preview with the approved client contact and record feedback.
- Deploy to an approved account.
- Connect the custom domain only after approval.
- Verify HTTPS, redirects, mobile, links, forms/booking (if configured), and production console.

**Done when:** the client approves the site, public claims are verified, all placeholders are removed, and the published site is confirmed working.

## Phase 7 — Handover and post-launch

- Provide project folder/repository details and exact local run/build commands.
- Record asset paths, final decisions, and unresolved future changes in Memory.md.
- Separate defects from new-scope feature requests.

## Risks and dependencies

- Missing or unapproved copy, product details, founder details, photos or booking destination.
- Generated images with baked backgrounds or mismatched lighting.
- Domain/DNS/hosting access not yet confirmed.
- Scope expansion to CMS, booking, backend or separate pages.
- Visual quality cannot be accepted from code generation alone; browser rendering must be inspected.
