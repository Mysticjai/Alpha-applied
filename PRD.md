# Alpha Applied Analytics Solutions — Product Requirements Document

**Document status:** Recreated project baseline; requires client content verification before launch.  
**Project:** New single-page marketing website, built in a separate folder named `alpha-applied-analytics-v2`.  
**Implementation environment:** Antigravity.  
**Target audience:** Legal counsel, law firms, corporations, and professionals dealing with complex financial disputes; precise target segments and geography require client confirmation.

## 1. Product vision

Create a premium, credible, responsive website for Alpha Applied Analytics Solutions that communicates its three core business pillars, makes it easy for potential clients to begin a conversation, and presents the company as a serious financial analytics and litigation advisory firm.

The experience should feel editorial, composed, intelligent, and art-directed. It should not resemble a generic AI/SaaS template or a financial dashboard demo. The visual identity is **Cyprus & Sand Dune — Premium Modern**, with a distinctive cinematic hero based on the supplied reference image.

## 2. Core goals

1. Clearly communicate the business and its core offerings.
2. Give **Litigation Services** the strongest prominence.
3. Introduce the **Alpha Lens Platform** without inventing product capabilities.
4. Explain **AI Consulting & Implementation** using confirmed service information only.
5. Provide an About/Founder section when approved details are available.
6. Give visitors a clear contact or consultation path.
7. Deliver a responsive, accessible, performant one-page site with purposeful motion.
8. Create and test the new project independently of the previous implementation.

## 3. Confirmed business structure

Present the pillars in this order:

1. **Litigation Services** — primary offering and most prominent.
2. **Alpha Lens Platform**.
3. **AI Consulting & Implementation**.

Also include:
- Founder & About.
- Contact / Book a Call.

The site is in-scope as a single-page landing page with anchor navigation. Separate service pages are not part of the current scope unless explicitly approved later.

## 4. Primary design target: cinematic editorial hero

Use the supplied preferred reference screenshot as the visual-composition target. Use the current screenshot only as a diagnostic reference if supplied; do not copy its implementation mistakes.

### Desired visual composition

- Compact horizontal navigation beneath/against a warm ivory canvas.
- Left-side editorial content: eyebrow, large refined serif headline, concise copy, primary CTA and secondary CTA.
- Right-side monumental architectural composition that extends to the right edge and naturally toward the lower edge.
- A prominent bronze Lady Justice statue in the foreground, slightly right of centre within the image composition.
- A courthouse with a detailed pediment and substantial columns behind and to the right of the statue.
- Large nested ivory and sand arches, plus a dramatic deep-teal disc in the upper-right and a broad teal curve/ribbon sweeping behind the statue.
- A small vertical **SCROLL** indicator near the lower-left of the hero.
- A compact three-item service strip in the lower-left: Litigation Services, Alpha Lens Platform, AI Consulting & Implementation.
- Artwork must blend into the ivory website canvas without a visible rectangular image frame.

The hero should feel like one cohesive, art-directed scene, not three images placed inside a card. Background geometry is important and must remain visibly present in the final composition.

### Layering

Use independently controllable layers:
1. Warm ivory canvas.
2. Large teal disc and ivory/sand geometric arches (prefer SVG/CSS for precise control where appropriate).
3. Courthouse architecture.
4. Lady Justice foreground cutout.
5. Website text and interactive controls.

Layer assets should be inspected for actual alpha transparency. Do not assume transparent backgrounds based on file extension alone. If a source has a baked-in solid background, address that asset problem instead of attempting to hide it with a rectangular frame or blanket opacity.

### Hero headline direction

The following is a draft visual direction, not final client-approved copy:

> Clarity  
> for Complex  
> Legal & Financial  
> Challenges.

An earlier draft, “Clarity in Complex Financial Evidence,” may also be considered if supported by the latest approved client copy. Use approved wording when available. Do not invent legal, financial, product, or outcome claims.

### Hero CTAs

- Primary CTA: “Book a Call” or “Schedule a Consultation” depending on the approved label. Use a valid destination already configured in the project.
- Secondary CTA: “Explore Litigation Services” linked to the Litigation Services section.

At desktop widths both CTAs should fit on one line. On mobile, a deliberate stacked layout is acceptable.

### Hero animation

Create a coordinated entrance with overlapping transitions:
1. Ivory canvas is visible.
2. Large teal disc and nested arches reveal/expand subtly.
3. Sweeping teal curve becomes visible behind the statue.
4. Courthouse emerges through a controlled mask/clip reveal.
5. Lady Justice fades in as the foreground focal point with restrained upward motion and a slight scale settle.
6. Eyebrow and headline reveal with a short stagger/line mask.
7. Paragraph and CTAs enter.
8. Service strip and scroll cue appear.

Then add restrained scroll-linked depth only if the composition remains stable. Respect `prefers-reduced-motion`; content must remain visible without motion.

## 5. Page structure and content requirements

Recommended order:

1. Header / navigation.
2. Hero.
3. Optional expertise/trust strip — only verified statements.
4. Litigation Services.
5. Alpha Lens Platform.
6. AI Consulting & Implementation.
7. How It Works — optional and only if the real process is confirmed.
8. Founder & About.
9. Contact / Book a Call.
10. Footer.

The section order may be refined in design, but Litigation Services must remain the primary offering.

### Litigation Services

Give this section the strongest support after the hero. Use client-confirmed service descriptions, deliverables, industries, and CTA. Exact sub-services need confirmation. Do not claim court admissibility, guaranteed outcomes, specific damages methods, or quantified results unless the client provides evidence and approves the wording.

### Alpha Lens Platform

Describe only verified product functions and benefits. Use an approved product screenshot or original illustration if available. Never show invented product data as though it were real. Any mock data used in development must be clearly illustrative and not appear as actual client/case data in production.

### AI Consulting & Implementation

Use confirmed capability descriptions and engagement information. Do not invent integrations, model capabilities, security controls, or implementation guarantees.

### Founder & About

Use the founder's approved full name, title, biography, and portrait only when supplied. Do not fabricate background, credentials, experience, or quotes.

### Contact / booking

Use a confirmed booking URL, email, or phone number. No booking platform, form recipient, submission endpoint, or backend has been confirmed. Do not present non-functional forms or fabricated booking integrations as working.

## 6. Brand system

Locked colours:
- Cyprus: `#004643`
- Sand Dune: `#F0EDE5`
- White: `#FFFFFF`
- Alpha Crimson: `#C62835`
- Muted Taupe: `#A79277`

Keep the design light-first. Ivory should be a major canvas colour; deep teal should be unmistakably present in typography and the large hero geometry; crimson should emphasize primary actions. Keep bronze/limestone image tones natural.

Typography direction: refined editorial serif for major headings plus a highly legible sans serif for body/UI. DM Serif Display with Inter or Manrope are candidate pairings only; inspect loading, licensing, performance, and visual fit before locking them.

## 7. Technical requirements

- New independent project folder: `alpha-applied-analytics-v2`.
- Preferred stack: React + Vite + TypeScript; Tailwind CSS only if compatible with the documented/selected configuration.
- Reusable components and central design tokens.
- Responsive layout across desktop, tablet, and mobile.
- Semantic HTML and accessible navigation/controls.
- Real anchor destinations for internal navigation.
- Performance-conscious image loading and animation.
- Reduced-motion support.
- No backend, CMS, login, portal, confidential document upload, custom booking system, or database unless separately approved.
- Do not change domain/DNS or production hosting without approval.

## 8. Scope exclusions

Not included unless explicitly approved:
- Separate standalone service pages.
- CMS/blog.
- Authentication or client portal.
- Database or backend service.
- Confidential document upload.
- Custom scheduling system.
- Payments.
- Invented case studies, testimonials, metrics, customer logos, or security claims.
- Background video.
- Heavy 3D or gratuitous parallax.

## 9. Responsive and accessibility requirements

- No unintended horizontal overflow.
- Mobile layout must be intentionally composed, not just a scaled desktop canvas.
- Main text, primary CTA, and essential content must remain visible and usable.
- Artwork must resize/crop without hiding key parts of the statue or destroying architecture visibility.
- Keyboard navigation, visible focus, semantic heading order, accessible labels, meaningful alt text, adequate contrast, and touch targets must be checked.
- Decorative geometry should be hidden from assistive technology.
- Reduced-motion preference must be respected.

## 10. Quality and acceptance criteria

The site is accepted when:
- The new project runs independently from the old implementation.
- The hero matches the reference's general composition at first glance.
- The deep-teal disc, sweeping teal curve, and nested ivory/sand arches are clearly visible.
- Lady Justice and courthouse form a balanced foreground/middle-ground relationship.
- Artwork has no unintended rectangular container or baked-background edge.
- Headline, paragraph and both desktop CTAs have controlled wrapping.
- Vertical scroll cue and service strip are fully visible and aligned.
- All primary navigation and CTA links work.
- All page sections are responsive.
- No fabricated or unapproved business claims appear.
- Build and available checks pass; browser inspection is documented honestly.

## 11. Unknowns requiring client confirmation

1. Approved final hero headline and supporting copy.
2. Exact Litigation Services sub-services and deliverables.
3. Alpha Lens description, features, screenshots, demo and product CTA.
4. AI Consulting & Implementation service list.
5. Founder full name, title, biography and portrait.
6. Target geography and main buyer segments.
7. Approved booking link, email and phone.
8. Whether a contact form is required; recipient, delivery and privacy requirements.
9. Required privacy/terms pages.
10. Domain registrar, DNS ownership, current email records, hosting account and deployment account.
11. Analytics/SEO expectations and final approver.

## 12. Commercial context

Previously discussed budget: ₹8,000.  
Previously discussed target duration: 7–10 days.  
Provisional milestones: design review 19 Oct 2026; client feedback 20 Oct; development 21–23 Oct; final review/launch target 24–27 Oct 2026. Confirm whether these dates remain applicable before making commitments.
