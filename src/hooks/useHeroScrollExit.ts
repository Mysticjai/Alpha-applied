import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface UseHeroScrollExitOptions {
  triggerRef: React.RefObject<HTMLElement | null>;
  headlineRef?: React.RefObject<HTMLElement | null>;
  overlineRef?: React.RefObject<HTMLElement | null>;
  bodyRef?: React.RefObject<HTMLElement | null>;
  ctaRef?: React.RefObject<HTMLElement | null>;
  visualRef?: React.RefObject<HTMLElement | null>;
  extraRef?: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

/**
 * Two-Tier Motion Architecture for Homepage Hero:
 * 
 * Phase 1: Entrance Sequence (Heading-to-Copy Sequence):
 *  1. Act 1: Headline Directional Entrance (0–980ms)
 *     - Line 1 ("Advancing Business"): enters from left (-40px, 750ms)
 *     - Line 2 ("Through"): gentle upward reveal (+18px, subtle blur, 650ms)
 *     - Line 3 ("Artificial Intelligence."): enters from right (+40px, 800ms)
 *     - Mobile Artwork: reveals smoothly in upper position
 *  2. Intentional Pause: ~400ms allowing headline to settle and register.
 *  3. Act 2: Supporting Copy Sequence (Starts at 1.34s)
 *     - Paragraph 1: dynamic line-by-line masked reveal
 *     - Paragraph 2: starts 140ms after Paragraph 1 final line begins
 *     - CTA button: fades in with slight upward rise
 *     - Service shortcuts: cascade in immediately afterward
 * 
 * Phase 2: Responsive Scroll Behavior (gsap.matchMedia):
 *  - Desktop (>= 1024px): Preserves 100% of the existing 3D disintegration exit scrub across 500px.
 *  - Mobile (< 1024px): Bounded natural scrolling with zero text disappearing, zero blur,
 *    and zero stuck artwork over the marquee/ticker.
 */
export function useHeroScrollExit({
  triggerRef,
  headlineRef,
  overlineRef,
  bodyRef,
  ctaRef,
  visualRef,
  extraRef,
  enabled = true,
}: UseHeroScrollExitOptions) {
  useIsomorphicLayoutEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const trigger = triggerRef.current;
    if (!trigger) return;

    // Accessibility check: disable motion if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const allElements = trigger.querySelectorAll<HTMLElement>(
        '.hero-line-1, .hero-line-2, .hero-line-3, .hero-line-inner, .p1-inner, .p2-inner, .p-line-inner, .cta-inner, .strip-inner, .service-shortcut-item, .overline-inner, ' +
        '.disintegrate-word, .disintegrate-p1, .disintegrate-p2, .disintegrate-cta, ' +
        '.disintegrate-strip, .disintegrate-cue, .disintegrate-overline, ' +
        '.disintegrate-art-geometry, .disintegrate-art-architecture, .disintegrate-art-statue, .mobile-hero-artwork'
      );
      allElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
      });
      return;
    }

    // Use GSAP context for automated scoped teardown
    const ctx = gsap.context(() => {
      // Shared element queries
      const cueEl = trigger.querySelector('.disintegrate-cue');
      const artGeometry = trigger.querySelector('.disintegrate-art-geometry');
      const artArchitecture = trigger.querySelector('.disintegrate-art-architecture');
      const artStatue = trigger.querySelector('.disintegrate-art-statue');
      const mobileArt = trigger.querySelector<HTMLElement>('.mobile-hero-artwork');

      // Check if entrance animation has already played in this page session
      const alreadyEntered = trigger.dataset.heroEntered === 'true';

      // ─────────────────────────────────────────────────────────
      // PHASE 1: ENTRANCE TIMELINE (Heading-to-Copy Sequence)
      // ─────────────────────────────────────────────────────────
      if (!alreadyEntered) {
        const entranceTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            trigger.dataset.heroEntered = 'true';
            // Set masks to overflow visible so subsequent zoom/resizing never clips
            trigger.querySelectorAll<HTMLElement>('.p-line-mask').forEach((mask) => {
              mask.style.overflow = 'visible';
            });
          },
        });

        if (typeof window !== 'undefined') {
          (window as unknown as { __heroEntranceTl?: gsap.core.Timeline }).__heroEntranceTl = entranceTl;
        }

        // 0. Mobile Artwork Entrance (Upper Hero)
        if (mobileArt) {
          entranceTl.fromTo(
            mobileArt,
            { opacity: 0, y: 16, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
            0.04
          );
        }

        // 1. Eyebrow reveals first (if present)
        const overlineInner = trigger.querySelector('.overline-inner');
        if (overlineInner) {
          entranceTl.fromTo(
            overlineInner,
            { opacity: 0, y: -14 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.05 },
            0
          );
        }

        // 2. Headline: Subtle Fade-Up Entrance (Power2.out, 16px upward rise)
        const line1 = trigger.querySelector<HTMLElement>('.hero-line-1');
        const line2 = trigger.querySelector<HTMLElement>('.hero-line-2');
        const line3 = trigger.querySelector<HTMLElement>('.hero-line-3');

        const editorialEase = 'power2.out';

        if (line1 && line2 && line3) {
          entranceTl.fromTo(
            line1,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: editorialEase },
            0
          );

          entranceTl.fromTo(
            line2,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: editorialEase },
            0.06
          );

          entranceTl.fromTo(
            line3,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: editorialEase },
            0.12
          );
        } else {
          const lineInners = trigger.querySelectorAll<HTMLElement>('.hero-line-inner');
          if (lineInners.length > 0) {
            entranceTl.fromTo(
              lineInners,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.48, stagger: 0.06, ease: editorialEase },
              0
            );
          } else if (headlineRef?.current) {
            entranceTl.fromTo(
              headlineRef.current,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.48, ease: editorialEase },
              0
            );
          }
        }

        // Supporting copy sequence begins smoothly as headline settles (~0.18s)
        const p1StartTime = 0.18;

        const p1Inner = trigger.querySelector<HTMLElement>('.p1-inner');
        const p2Inner = trigger.querySelector<HTMLElement>('.p2-inner');
        const ctaInner = trigger.querySelector<HTMLElement>('.cta-inner');
        const stripInner = trigger.querySelector<HTMLElement>('.strip-inner');
        const shortcutItems = trigger.querySelectorAll<HTMLElement>('.service-shortcut-item');

        // Explicitly set all delayed elements to opacity 0, initial offset and scale at t = 0
        if (p1Inner) entranceTl.set(p1Inner, { opacity: 0, y: 12 }, 0);
        if (p2Inner) entranceTl.set(p2Inner, { opacity: 0, y: 12 }, 0);
        if (ctaInner) entranceTl.set(ctaInner, { opacity: 0, y: 8, scale: 0.98 }, 0);
        if (stripInner) entranceTl.set(stripInner, { opacity: 0 }, 0);
        if (shortcutItems.length > 0) entranceTl.set(shortcutItems, { opacity: 0, y: 6 }, 0);

        // 3. First Supporting Paragraph
        if (p1Inner) {
          entranceTl.to(
            p1Inner,
            { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
            p1StartTime
          );
        }

        // 4. Second Supporting Paragraph
        const p2StartTime = p1StartTime + 0.08;
        if (p2Inner) {
          entranceTl.to(
            p2Inner,
            { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
            p2StartTime
          );
        }

        // 5. Schedule AI Consultation button & Service Shortcuts
        const ctaStartTime = p2StartTime + 0.08;

        if (ctaInner) {
          entranceTl.to(
            ctaInner,
            { opacity: 1, y: 0, scale: 1, duration: 0.30, ease: 'power2.out' },
            ctaStartTime
          );
        }

        // Service strip container
        if (stripInner) {
          entranceTl.to(
            stripInner,
            { opacity: 1, duration: 0.24, ease: 'power2.out' },
            ctaStartTime + 0.04
          );
        }

        // Three individual service shortcuts (short cascade sequence)
        const shortcutsStartTime = ctaStartTime + 0.06;
        if (shortcutItems.length > 0) {
          entranceTl.to(
            shortcutItems,
            { opacity: 1, y: 0, duration: 0.26, stagger: 0.06, ease: 'power2.out' },
            shortcutsStartTime
          );
        }

        // 6. Scroll Cue enters smoothly
        if (cueEl) {
          entranceTl.fromTo(
            cueEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            shortcutsStartTime + 0.25
          );
        }

        // 7. Desktop Layered Artwork Entrance (Desktop only)
        if (artGeometry) {
          entranceTl.fromTo(
            artGeometry,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 1.0 },
            0.1
          );
        }
        if (artArchitecture) {
          entranceTl.fromTo(
            artArchitecture,
            { opacity: 0, y: 32, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1 },
            0.25
          );
        }
        if (artStatue) {
          entranceTl.fromTo(
            artStatue,
            { opacity: 0, y: 38, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 1.15 },
            0.4
          );
        }
      } else {
        // Already entered: ensure all elements are static and visible
        const inners = trigger.querySelectorAll<HTMLElement>(
          '.hero-line-1, .hero-line-2, .hero-line-3, .hero-line-inner, .p1-inner, .p2-inner, .p-line-inner, .cta-inner, .strip-inner, .service-shortcut-item, .overline-inner, .mobile-hero-artwork, .disintegrate-art-geometry, .disintegrate-art-architecture, .disintegrate-art-statue'
        );
        inners.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
        });
      }

      // ─────────────────────────────────────────────────────────
      // PHASE 2: RESPONSIVE SCROLL-LINKED DISINTEGRATION
      // ─────────────────────────────────────────────────────────
      const mm = gsap.matchMedia(trigger);

      // ── DESKTOP SCROLL SCRUB (min-width: 1024px) ──
      // Strictly preserves the existing desktop scroll-linked disintegration and 3D artwork deconstruction
      mm.add('(min-width: 1024px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: '+=500', // Responsive scrub across 500px of natural scroll
            scrub: true,  // Immediate 1:1 tracking without smoothing lag
            invalidateOnRefresh: true,
          },
        });

        // 1. Eyebrow fades out early with slight rise
        const overlineEl = trigger.querySelector('.disintegrate-overline') || overlineRef?.current;
        if (overlineEl) {
          scrollTl.to(
            overlineEl,
            {
              y: -24,
              opacity: 0,
              ease: 'none',
            },
            0
          );
        }

        // 2. Scroll Cue fades immediately
        if (cueEl) {
          scrollTl.to(
            cueEl,
            {
              opacity: 0,
              y: -16,
              ease: 'none',
            },
            0
          );
        }

        // 3. Headline Disintegration (Outer Word Containers)
        const word1 = trigger.querySelector('.disintegrate-word-1');
        const word2 = trigger.querySelector('.disintegrate-word-2');
        const word3 = trigger.querySelector('.disintegrate-word-3');
        const word4 = trigger.querySelector('.disintegrate-word-4');
        const word5 = trigger.querySelector('.disintegrate-word-5');

        if (word1) {
          scrollTl.to(
            word1,
            {
              x: -95,
              y: -80,
              rotation: -8,
              opacity: 0,
              filter: 'blur(7px)',
              ease: 'none',
              duration: 0.70,
            },
            0
          );
        }

        if (word2) {
          scrollTl.to(
            word2,
            {
              x: 90,
              y: -95,
              rotation: 7,
              opacity: 0,
              filter: 'blur(7px)',
              ease: 'none',
              duration: 0.70,
            },
            0.02
          );
        }

        if (word3) {
          scrollTl.to(
            word3,
            {
              x: -60,
              y: -55,
              rotation: -5,
              opacity: 0,
              filter: 'blur(6px)',
              ease: 'none',
              duration: 0.70,
            },
            0.05
          );
        }

        if (word4) {
          scrollTl.to(
            word4,
            {
              x: 75,
              y: -70,
              rotation: 6,
              opacity: 0,
              filter: 'blur(7px)',
              ease: 'none',
              duration: 0.70,
            },
            0.08
          );
        }

        if (word5) {
          scrollTl.to(
            word5,
            {
              x: 40,
              y: 60,
              scale: 0.88,
              rotation: 3.5,
              opacity: 0,
              filter: 'blur(9px)',
              ease: 'none',
              duration: 0.75,
            },
            0.10
          );
        }

        // 4. Supporting Paragraph 1 follows
        const p1El = trigger.querySelector('.disintegrate-p1') || bodyRef?.current;
        if (p1El) {
          scrollTl.to(
            p1El,
            {
              y: -48,
              opacity: 0,
              filter: 'blur(4px)',
              ease: 'none',
              duration: 0.65,
            },
            0.15
          );
        }

        // 5. Supporting Paragraph 2 follows
        const p2El = trigger.querySelector('.disintegrate-p2');
        if (p2El) {
          scrollTl.to(
            p2El,
            {
              y: -40,
              opacity: 0,
              filter: 'blur(4px)',
              ease: 'none',
              duration: 0.65,
            },
            0.20
          );
        }

        // 6. CTA row follows
        const ctaEl = trigger.querySelector('.disintegrate-cta') || ctaRef?.current;
        if (ctaEl) {
          scrollTl.to(
            ctaEl,
            {
              y: -32,
              opacity: 0,
              ease: 'none',
              duration: 0.65,
            },
            0.25
          );
        }

        // 7. Service strip follows
        const stripEl = trigger.querySelector('.disintegrate-strip') || extraRef?.current;
        if (stripEl) {
          scrollTl.to(
            stripEl,
            {
              y: -24,
              opacity: 0,
              ease: 'none',
              duration: 0.65,
            },
            0.30
          );
        }

        // 8. LAYERED ARTWORK 3D MULTI-PLANE DECONSTRUCTION
        if (artGeometry) {
          scrollTl.to(
            artGeometry,
            {
              y: -55,
              scale: 1.06,
              opacity: 0.2,
              filter: 'blur(3px)',
              ease: 'none',
              duration: 0.9,
            },
            0
          );
        }

        if (artArchitecture) {
          scrollTl.to(
            artArchitecture,
            {
              x: 42,
              y: 34,
              scale: 0.94,
              opacity: 0.22,
              ease: 'none',
              duration: 0.9,
            },
            0
          );
        }

        if (artStatue) {
          scrollTl.to(
            artStatue,
            {
              x: -42,
              y: -50,
              scale: 1.05,
              opacity: 0.2,
              filter: 'blur(3px)',
              ease: 'none',
              duration: 0.9,
            },
            0
          );
        }
      });

      // ── MOBILE SCROLL BEHAVIOR (max-width: 1023px) ──
      // Bounded natural scrolling: zero premature word disintegration, zero text blurring,
      // and zero blank gaps. Lady Justice and content move naturally with touch scrolling.
      mm.add('(max-width: 1023px)', () => {
        const mobileElements = trigger.querySelectorAll<HTMLElement>(
          '.disintegrate-word, .disintegrate-p1, .disintegrate-p2, .disintegrate-cta, .disintegrate-strip, .mobile-hero-artwork, .disintegrate-art-geometry'
        );
        mobileElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
        });
      });
    }, trigger);

    // Refresh ScrollTrigger to calculate accurate triggers after render
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [triggerRef, headlineRef, overlineRef, bodyRef, ctaRef, visualRef, extraRef, enabled]);
}

export default useHeroScrollExit;
