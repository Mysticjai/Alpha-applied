import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Synchronizes Lenis scroll events directly with GSAP ScrollTrigger
const LenisScrollTriggerSync: React.FC = () => {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
};

interface RouteScrollManagerProps {
  currentPath: string;
}

const RouteScrollManager: React.FC<RouteScrollManagerProps> = ({ currentPath }) => {
  const lenis = useLenis();
  const prevPathRef = useRef<string | null>(null);

  // Set browser scrollRestoration to manual so browser doesn't inject old scroll coordinates
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Expose active lenis instance on window for global coordination
  useEffect(() => {
    if (lenis && typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }
  }, [lenis]);

  useLayoutEffect(() => {
    const isInitialMount = prevPathRef.current === null;
    const isPathChange = prevPathRef.current !== currentPath;
    prevPathRef.current = currentPath;

    // Check if the current URL has an in-page hash anchor (e.g. #contact, #who-we-serve)
    const hash = typeof window !== 'undefined' && window.location.hash
      ? window.location.hash.replace('#', '')
      : '';

    // If an in-page anchor is requested, let anchor scrolling handle it
    if (hash && hash !== 'home') {
      const scrollToHash = () => {
        const el = document.getElementById(hash);
        if (el) {
          const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 80));
          if (hash === 'contact') {
            // For contact anchor, immediate positioning prevents intermediate jump
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true, force: true });
            } else {
              window.scrollTo(0, targetY);
            }
          } else {
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: isInitialMount });
            } else {
              window.scrollTo({ top: targetY, behavior: isInitialMount ? 'auto' : 'smooth' });
            }
          }
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        setTimeout(scrollToHash, 60);
        setTimeout(scrollToHash, 180);
      }
      return;
    }

    // When changing routes or on initial subpage load without anchor:
    // Synchronize both native window scroll and Lenis virtual scroll to 0 immediately
    if (isPathChange || (isInitialMount && currentPath !== '/')) {
      // 1. Reset native document scroll immediately
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. Reset Lenis virtual scroll state immediately
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.resize();
      }

      // 3. Recalculate GSAP ScrollTrigger positions based on top of new page
      ScrollTrigger.refresh();

      // 4. Secondary micro-task check to ensure post-render DOM shifts don't restore old scroll
      const rafId = requestAnimationFrame(() => {
        const currentHash = window.location.hash ? window.location.hash.replace('#', '') : '';
        if (!currentHash || currentHash === 'home') {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
          }
          ScrollTrigger.refresh();
        }
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [currentPath, lenis]);

  return null;
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  currentPath?: string;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  currentPath = '/',
}) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // 1. Single animation loop: drive Lenis updates via GSAP ticker
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // Preserves native-feeling touch scrolling on mobile/touch screens
        touchMultiplier: 1,
        anchors: true,
      }}
    >
      <LenisScrollTriggerSync />
      <RouteScrollManager currentPath={currentPath} />
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
