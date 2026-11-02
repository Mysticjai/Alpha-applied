import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { gsap } from 'gsap';

export type TransitionDirection = 'forward' | 'backward';
export type RevealMode = 'sweep-across' | 'pull-away';

export interface DirectionalTransitionOverlayHandle {
  startTransition: (
    targetHref: string,
    direction?: TransitionDirection,
    onCoverComplete?: () => void | Promise<void>,
    onRevealComplete?: () => void
  ) => Promise<void>;
  isTransitioning: () => boolean;
}

export interface DirectionalTransitionOverlayProps {
  revealMode?: RevealMode;
  coverDuration?: number;
  revealDuration?: number;
  ease?: string;
  panelColor?: string;
}

/**
 * DirectionalTransitionOverlay
 * 
 * Provides a full-viewport editorial cover-and-reveal sweep transition:
 * - Phase A (Cover): Solid Cyprus deep teal panel (#004643) sweeps into view.
 * - Phase B (Route Change): Swaps route and resets scroll while viewport is 100% covered.
 * - Phase C (Reveal): Panel sweeps away to uncover the destination page.
 * - Complete settlement: Zero filters, full opacity, zero pointer-event blockage.
 */
export const DirectionalTransitionOverlay = forwardRef<
  DirectionalTransitionOverlayHandle,
  DirectionalTransitionOverlayProps
>(
  (
    {
      revealMode = 'sweep-across',
      coverDuration = 0.36,
      revealDuration = 0.42,
      ease = 'power3.inOut',
      panelColor = '#004643',
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isTransitioningRef = useRef(false);

    useEffect(() => {
      // Ensure initial hidden state
      if (containerRef.current) {
        containerRef.current.style.visibility = 'hidden';
        containerRef.current.style.pointerEvents = 'none';
      }
      if (panelRef.current) {
        gsap.set(panelRef.current, { x: '100%' });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      isTransitioning: () => isTransitioningRef.current,
      startTransition: async (
        _targetHref: string,
        direction: TransitionDirection = 'forward',
        onCoverComplete?: () => void | Promise<void>,
        onRevealComplete?: () => void
      ) => {
        if (isTransitioningRef.current) return;

        const container = containerRef.current;
        const panel = panelRef.current;
        if (!container || !panel) {
          if (onCoverComplete) await onCoverComplete();
          if (onRevealComplete) onRevealComplete();
          return;
        }

        // Accessibility check: prefers-reduced-motion
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        isTransitioningRef.current = true;

        // Watchdog timeout to prevent stuck overlay under any unhandled edge condition
        const watchdogTimer = setTimeout(() => {
          if (isTransitioningRef.current) {
            console.warn('[DirectionalTransitionOverlay] Watchdog cleanup triggered');
            container.style.visibility = 'hidden';
            container.style.pointerEvents = 'none';
            gsap.set(panel, { x: '100%' });
            isTransitioningRef.current = false;
          }
        }, 2200);

        if (prefersReducedMotion) {
          try {
            // Instant / subtle fast fade for reduced motion users
            container.style.visibility = 'visible';
            container.style.pointerEvents = 'all';
            gsap.set(panel, { x: '0%', opacity: 0 });

            await gsap.to(panel, { opacity: 1, duration: 0.12, ease: 'power1.out' });
            if (onCoverComplete) await onCoverComplete();
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            await gsap.to(panel, { opacity: 0, duration: 0.15, ease: 'power1.in' });
          } catch (err) {
            console.error('Reduced motion transition error:', err);
          } finally {
            clearTimeout(watchdogTimer);
            container.style.visibility = 'hidden';
            container.style.pointerEvents = 'none';
            gsap.set(panel, { x: '100%', opacity: 1 });
            isTransitioningRef.current = false;
            if (onRevealComplete) onRevealComplete();
          }
          return;
        }

        // Directional geometry
        // Forward: enters from Right (+100%) moving Left to 0%
        // Backward: enters from Left (-100%) moving Right to 0%
        const enterStart = direction === 'forward' ? '100%' : '-100%';

        // Reveal exit geometry:
        // In 'sweep-across': continues moving in same direction across the screen
        //   Forward: 0% -> -100% (exits left)
        //   Backward: 0% -> 100% (exits right)
        // In 'pull-away': moves away in opposite directional movement
        //   Forward: 0% -> 100% (moves back right)
        //   Backward: 0% -> -100% (moves back left)
        let exitEnd: string;
        if (revealMode === 'sweep-across') {
          exitEnd = direction === 'forward' ? '-100%' : '100%';
        } else {
          exitEnd = direction === 'forward' ? '100%' : '-100%';
        }

        // Activate container
        container.style.visibility = 'visible';
        container.style.pointerEvents = 'all';

        try {
          // ── Phase A: Cover ──
          gsap.set(panel, { x: enterStart, opacity: 1 });
          await gsap.to(panel, {
            x: '0%',
            duration: coverDuration,
            ease: ease,
          });

          // ── Phase B: Route change & scroll sync (Viewport 100% covered) ──
          if (onCoverComplete) {
            await onCoverComplete();
          }

          // Ensure next animation frames commit the new page layout under the panel with 80ms safety fallback
          await new Promise((resolve) => {
            const timeout = setTimeout(resolve, 80);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                clearTimeout(timeout);
                resolve(null);
              });
            });
          });

          // ── Phase C: Reveal ──
          await gsap.to(panel, {
            x: exitEnd,
            duration: revealDuration,
            ease: 'power3.out',
          });
        } catch (err) {
          console.error('Transition animation error:', err);
        } finally {
          // ── Final Settlement & Cleanup (Always reset overlay to prevent frozen states) ──
          clearTimeout(watchdogTimer);
          container.style.visibility = 'hidden';
          container.style.pointerEvents = 'none';
          gsap.set(panel, { x: '100%' }); // reset ready for next forward transition
          isTransitioningRef.current = false;

          if (onRevealComplete) {
            onRevealComplete();
          }
        }
      },
    }));

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-[100dvh] z-[100] pointer-events-none overflow-hidden"
        style={{ visibility: 'hidden' }}
      >
        <div
          ref={panelRef}
          className="w-full h-full will-change-transform"
          style={{
            backgroundColor: panelColor,
            transform: 'translateX(100%)',
          }}
        />
      </div>
    );
  }
);

DirectionalTransitionOverlay.displayName = 'DirectionalTransitionOverlay';
export default DirectionalTransitionOverlay;
