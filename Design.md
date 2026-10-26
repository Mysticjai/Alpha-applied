# Alpha Applied Analytics Solutions — Design System

**Design direction:** Cyprus & Sand Dune — Premium Modern.  
**Status:** Brand palette and hero art direction locked; final typography, exact asset paths, and client copy require verification.

## 1. Brand principles

- Premium, editorial, composed, credible, and modern.
- Sophistication through typography, spacing, composition, and controlled detail—not decoration overload.
- Light-first design; avoid generic dark AI-startup styling.
- The brand should be recognisable through deep teal, warm ivory, and restrained crimson.
- The hero should look like one cinematic scene assembled from layers, not a dashboard or framed photograph.

## 2. Locked palette

| Token | Name | Hex | Primary use |
|---|---|---|---|
| `--color-primary` | Cyprus | `#004643` | Headings, links, hero teal geometry, icons |
| `--color-surface-warm` | Sand Dune | `#F0EDE5` | Main canvas and warm section backgrounds |
| `--color-background` | White | `#FFFFFF` | Select surfaces and text contrast |
| `--color-accent` | Alpha Crimson | `#C62835` | Primary CTA and restrained accents |
| `--color-accent-muted` | Muted Taupe | `#A79277` | Fine outlines, eyebrow text, decorative details (check contrast) |
| `--color-text` | Deep Charcoal | `#243432` | Body copy if contrast-tested |
| `--color-text-muted` | Slate | `#526174` | Supporting text if contrast-tested |
| `--color-border` | Soft Neutral | `#E4E2DA` | Rules and subtle dividers |

Do not change the five locked brand colours without approval. Tune neutral colours only for readability/accessibility.

## 3. Token starter

```css
:root {
  color-scheme: light;
  --color-primary: #004643;
  --color-surface-warm: #F0EDE5;
  --color-background: #FFFFFF;
  --color-accent: #C62835;
  --color-accent-muted: #A79277;
  --color-text: #243432;
  --color-text-muted: #526174;
  --color-border: #E4E2DA;

  --font-heading: "DM Serif Display", Georgia, serif;
  --font-body: "Inter", Arial, sans-serif;

  --page-gutter: clamp(1.25rem, 4vw, 4rem);
  --container-max: 1240px;
  --motion-fast: 160ms;
  --motion-standard: 260ms;
}
```

Fonts are candidates, not yet approved. Test actual line breaks, loading strategy, licence, accessibility, and performance before locking. Keep the number of typefaces and weights limited.

## 4. Hero design specification

### Target composition

Use the supplied preferred reference screenshot as the main visual reference. At desktop sizes around 1680 × 900:
- Navigation is compact and horizontally aligned.
- Editorial copy occupies about 40–45% of the hero.
- Layered artwork occupies about 55–60% and extends to the right edge.
- Text and art are balanced rather than divided by a hard vertical seam.
- The lower-left scroll cue and three-item service strip are fully visible.

### Background geometry

The hero geometry is a central design feature:
- Large deep-teal disc entering from the upper-right.
- Broad nested ivory and sand arches.
- A thick sweeping deep-teal crescent/ribbon visible behind Lady Justice.
- Fine restrained taupe contours on selected arcs.

Prefer CSS/SVG for circles, arcs, and curved ribbons where precise scalable control is beneficial. Shapes should be large and clearly visible, not reduced to thin lines or tiny circles. Ivory geometry should blend into the page canvas.

### Architecture and statue

- Architecture is the middle layer, predominantly on the right and lower-right.
- Lady Justice is the foreground layer, slightly right of centre within the artwork.
- The building's pediment and columns must remain visibly recognisable behind/to the right of the statue.
- Keep the statue's scale and sword visible where possible; avoid collisions with text.
- Keep natural bronze and limestone tones.
- Preserve alpha transparency; never assume a rectangular background can be made transparent by setting CSS background to none.
- Do not surround the entire artwork with a card, border, visible rectangle, or rounded frame.

### Headline and controls

Draft headline direction:

“Clarity / for Complex / Legal & Financial / Challenges.”

Use approved copy where available. Refined editorial serif, intentional line breaks, controlled line-height, compact eyebrow, concise supporting copy, one crimson primary CTA, one quieter secondary action.

At desktop width, buttons should fit on one line. Use a deliberate stacked arrangement at narrow widths rather than accidental wrapping.

### Small details

- Vertical `SCROLL` label and thin vertical line near lower-left.
- Service strip with three groups: Litigation Services; Alpha Lens Platform; AI Consulting & Implementation.
- Small consistent line icons and subtle vertical dividers.
- No invented-data card, fake credential card, fake product dashboard, or clipped floating badge.

## 5. Typography

Use a refined serif for major headlines and a clean sans-serif for body copy/UI. Candidate pairings include DM Serif Display + Inter or Manrope, subject to rendered tests.

Initial desktop hero heading size: approximately 54–60px; line-height near 0.98–1.05; tune against the target screenshot. Use responsive sizing (`clamp`) and verify line wrapping at 1440–1720px widths, plus mobile breakpoints.

Avoid overusing uppercase labels, overlong paragraphs, or unnecessarily oversized headlines that push the lower elements below the viewport.

## 6. Navigation

- Existing client logo at left, unchanged unless approved.
- Home, Litigation Services, Alpha Lens, AI Consulting, About.
- Crimson Book a Call action on the right, with a valid configured destination.
- Compact header with a subtle divider and sensible sticky-offset behaviour if sticky.
- Accessible mobile menu; avoid shrinking the desktop nav to fit a phone.

## 7. Section language

Use the following order:
1. Hero.
2. Optional verified expertise strip.
3. Litigation Services — strongest support section.
4. Alpha Lens Platform.
5. AI Consulting & Implementation.
6. Optional verified How It Works.
7. Founder & About.
8. Contact / Book a Call.
9. Footer.

Create compositional variation between sections. Do not repeat the same three-card grid for every service.

## 8. CTA and component styling

- Primary CTA: Alpha Crimson background, white text, clear focus state.
- Secondary CTA: transparent/warm background with Cyprus text or restrained border.
- Modest corner radius; avoid oversized pill treatments.
- Hover states should use restrained colour/border/opacity transitions.
- Maintain keyboard-visible focus styles.
- Icons should use one consistent lightweight family.

## 9. Motion design

Initial coordinated timeline, to tune in-browser:
1. Canvas.
2. Teal disc and arches reveal/expand subtly.
3. Sweeping teal ribbon appears.
4. Courthouse mask reveal.
5. Lady Justice fade/short upward settle.
6. Eyebrow and headline reveal by line.
7. Paragraph and CTAs.
8. Service strip and scroll cue.

Use overlapping transitions, restrained easing, and purposeful timing. Add only subtle parallax if it does not destabilise alignment. No constant floating, dramatic zooms, autoplay background video, or heavy 3D. Respect `prefers-reduced-motion` and preserve a good static state.

## 10. Responsive design

- Desktop: editorial split, large right-side scene, text legible at left.
- Tablet: rebalance columns and image sizes before collisions occur.
- Mobile: stack eyebrow → headline → copy → CTA(s) → image. Recompose artwork if needed; do not preserve fragile desktop coordinates.
- Prevent horizontal overflow, clipped controls, cramped navigation, and excessive first-scroll height.
- The statue and courthouse should remain recognisable; geometry should remain visible without overwhelming content.

## 11. Avoid list

Do not use generic dashboard cards, fake analytics bars, fabricated financial figures, fake audit hashes, unsupported “court-ready” claims, excessive dots/glows, random gradients, image containers with visible rectangular edges, repetitive cards, noisy parallax, or invented trust badges. Never use visible internal draft notes.

## 12. Accessibility and asset quality

- Verify text contrast. Taupe is decorative unless contrast passes.
- Use correct alt text; decorative shapes should be ignored by assistive technology.
- Preserve alpha channels, image detail, and natural proportions.
- Reserve image space to reduce layout shifts.
- Respect reduced motion and maintain usable controls at all widths.
