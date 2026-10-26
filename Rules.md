# Alpha Applied Analytics Solutions — AI Development Rules

These rules apply to all implementation work in `alpha-applied-analytics-v2`.

## 1. Source of truth and safe project handling

- Read `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, and `Memory.md` before substantial work.
- Inspect actual assets and the project environment before making assumptions.
- Build in the new independent folder `alpha-applied-analytics-v2`.
- Do not modify or delete the old project while building the new one.
- Do not silently replace documented requirements with generic design preferences.
- Update `Memory.md` after meaningful implementation milestones.
- Be honest about what was and was not tested.

## 2. Confirmed business structure

Keep the business pillars in this order:
1. Litigation Services — primary offering.
2. Alpha Lens Platform.
3. AI Consulting & Implementation.

Also include Founder & About and Contact/Book a Call. Do not add separate standalone pages unless the scope changes.

## 3. Content and factual claims

Never invent:
- Founder name, title, biography, qualifications, awards, or quotes.
- Exact litigation sub-services or deliverables.
- Alpha Lens product features, screenshots, integrations, capabilities, or performance.
- AI services not confirmed by the client.
- Case outcomes, damages values, metrics, accuracy figures, client lists, testimonials, or customer logos.
- Court admissibility, security certifications, confidentiality guarantees, or other claims requiring evidence.
- Contact details, booking URLs, or functional integrations that have not been supplied/configured.

Use developer-facing TODOs for missing facts. Do not display visible placeholders on the public page. Clearly identify illustrative demo data during development and never present it as actual client/case data.

## 4. Visual design rules

Locked colours:
- Cyprus `#004643`
- Sand Dune `#F0EDE5`
- White `#FFFFFF`
- Alpha Crimson `#C62835`
- Muted Taupe `#A79277`

The intended direction is light, premium, editorial and architectural—not a generic AI/SaaS template.

Hero requirements:
- Large visible teal disc and sweeping teal curve.
- Nested ivory and sand arches framing the scene.
- Courthouse behind the statue and concentrated toward the right.
- Lady Justice in the foreground, slightly right of centre within the artwork.
- Left editorial text column.
- Vertical `SCROLL` cue near lower-left.
- Three-item service strip below the main CTA area.
- No visible rectangular artwork frame, fake dashboard, floating invented-data cards, or hard-edged photograph panel.

Do not fix a layout issue by adding more unrelated decorative elements or replacing the visual direction without approval.

## 5. Copyright and asset rules

- Use client-supplied, original, or properly licensed assets.
- Do not copy competitor copy, code, logos, screenshots, graphics, or distinctive layouts.
- Treat references as inspiration for general composition and art direction, not source assets to redistribute.
- Preserve original asset files; create transformed derivatives separately.
- Inspect alpha transparency; do not assume PNG files have transparent backgrounds.
- Do not use actual confidential financial or legal data in public mockups.

## 6. Technical rules

- Preferred stack: React + Vite + TypeScript.
- Use Tailwind CSS only after confirming setup/version, or use maintainable CSS if appropriate.
- Use semantic HTML, typed props, small useful components, and structured copy.
- Centralise brand and spacing tokens.
- Prefer CSS/SVG for circles, arches, and geometric ribbons when it improves precision.
- Keep the architecture and statue in independent layers with clear classes and positioning.
- Use one coherent animation system. Do not add libraries without a clear reason.
- No backend, database, CMS, login, portal, confidential document upload, custom scheduling, or payments unless separately approved.
- Never expose secrets or credentials.

## 7. Animation and responsive design

- First achieve a balanced static hero; then tune motion.
- Animate background geometry, architecture, statue, and content with coordinated overlapping transitions.
- Do not use a flattened reference screenshot, prerecorded video, or extracted video frames as the site hero.
- Avoid excessive parallax, huge translations, constant floating, and motion that destabilises the layout.
- Respect `prefers-reduced-motion`; content must remain visible if motion is disabled or fails.
- Test desktop, tablet, and mobile explicitly.
- No accidental horizontal overflow, hidden key artwork, clipped CTA, or service strip below the viewport without intent.

## 8. Accessibility and performance

- Ensure keyboard access, visible focus, meaningful labels, semantic heading order, and adequate contrast.
- Use useful alt text for meaningful images; decorative geometry should be hidden from assistive technology.
- Check contrast for every text/background combination. Taupe should be decorative unless contrast is sufficient.
- Use responsive image sizing and reserve layout space.
- Avoid lazy-loading the hero's primary visual if it is the LCP element.
- Optimise assets without destroying detail or transparency.
- Ensure mobile menus, anchors and CTA links work with keyboard and touch.

## 9. Quality and reporting

Run the project's available lint, typecheck, build, and browser checks. Do not disable checks to conceal errors. Verify links, anchors, responsive layout, image edges, animation resting positions, reduced motion, and console errors.

Do not claim browser inspection, tests, deployment, or visual success unless actually performed. If browser tooling is unavailable, state that limitation.

## 10. Git, deployment and scope

- Check repository status before any Git change.
- Keep the new project separate from the old one.
- Do not force-push or destructively overwrite history.
- Preview before production deploy.
- Do not change DNS/nameservers until explicit approval and email-record review.
- Raise new scope requirements before implementing backend/CMS or other substantial features.
- Previously discussed budget is ₹8,000 and timeline 7–10 days; reconfirm before treating these as binding.

## 11. Launch audit

Search for `TODO`, `PLACEHOLDER`, `CLIENT TO`, draft copy, and invented claims. Resolve or remove all visible placeholders before production. Missing factual inputs must be obtained from the client rather than fabricated.
