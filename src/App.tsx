import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';
import { SiteHeader } from './components/layout/SiteHeader';
import { HeroSection } from './components/hero/HeroSection';
import { ExpertiseStrip } from './components/sections/ExpertiseStrip';
import { WhoWeServeSection } from './components/sections/WhoWeServeSection';
import { FounderAboutSection } from './components/sections/FounderAboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { SiteFooter } from './components/layout/SiteFooter';
import { LitigationServicesPage } from './pages/LitigationServicesPage';
import { AlphaLensPage } from './pages/AlphaLensPage';
import { AIConsultingPage } from './pages/AIConsultingPage';
import { EditorialServiceDetailPage } from './pages/EditorialServiceDetailPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { LinearTrustMarquee } from './components/ui/LinearTrustMarquee';
import { PageTransition } from './components/layout/PageTransition';
import { DirectionalTransitionOverlay } from './components/layout/DirectionalTransitionOverlay';
import { useSEO } from './hooks/useSEO';
import { getRouteFromPath, type AppRoute } from './lib/routes';
import type {
  DirectionalTransitionOverlayHandle,
  TransitionDirection,
} from './components/layout/DirectionalTransitionOverlay';

export type { AppRoute };
export { getRouteFromPath };

export const ROUTE_ORDER: Record<AppRoute, number> = {
  'home': 0,
  'ai-consulting': 1,
  'litigation-services': 2,
  'divorce-family-law': 2.1,
  'economic-damages': 2.2,
  'document-analysis': 2.3,
  'bankruptcy-restructuring': 2.4,
  'intellectual-property': 2.5,
  'litigation-support': 2.6,
  'alpha-lens': 3,
  'terms-of-service': 10,
  'privacy-policy': 11,
};

function getSectionOrder(hash: string): number {
  switch (hash) {
    case 'home': return 0;
    case 'who-we-serve': return 4;
    case 'founder':
    case 'about': return 5;
    case 'contact':
    case 'contact-form': return 6;
    default: return 0;
  }
}

function determineDirection(
  fromUrl: string,
  toHref: string,
  explicitDirection?: TransitionDirection
): TransitionDirection {
  if (explicitDirection) return explicitDirection;

  const currentRoute = getRouteFromPath(fromUrl);
  const isHomeTarget =
    toHref === '/' ||
    toHref === '/#home' ||
    toHref === '#home' ||
    toHref === '/index.html' ||
    toHref.startsWith('/#') ||
    (['#home', '#pillars', '#who-we-serve', '#founder', '#about', '#contact', '#contact-form'].includes(toHref));

  const targetRoute = isHomeTarget
    ? 'home'
    : (toHref.startsWith('#') ? currentRoute : getRouteFromPath(toHref));

  // Navigating to Home from any internal page is ALWAYS backward
  if (currentRoute !== 'home' && targetRoute === 'home') {
    return 'backward';
  }

  // Navigating from Home to any internal page is ALWAYS forward
  if (currentRoute === 'home' && targetRoute !== 'home') {
    return 'forward';
  }

  // Navigating between internal pages:
  if (currentRoute !== targetRoute) {
    const currentOrder = ROUTE_ORDER[currentRoute] ?? 0;
    const targetOrder = ROUTE_ORDER[targetRoute] ?? 0;
    return targetOrder < currentOrder ? 'backward' : 'forward';
  }

  // Same route (e.g. on homepage moving between sections):
  const fromHash = fromUrl.includes('#') ? fromUrl.split('#')[1] : 'home';
  const toHash = toHref.includes('#') ? toHref.split('#')[1] : 'home';
  const fromOrder = getSectionOrder(fromHash);
  const toOrder = getSectionOrder(toHash);
  return toOrder < fromOrder ? 'backward' : 'forward';
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('founder') || (p.includes('about') && !window.location.hash)) {
        window.history.replaceState({ idx: 0 }, '', '/#founder');
        return '/#founder';
      }
      if (!window.history.state || window.history.state.idx === undefined) {
        window.history.replaceState({ idx: 0 }, '', window.location.pathname + window.location.hash);
      }
    }
    return typeof window !== 'undefined' ? (window.location.pathname + window.location.hash) : '/';
  });
  const transitionRef = useRef<DirectionalTransitionOverlayHandle>(null);
  const currentPathRef = useRef(currentPath);
  currentPathRef.current = currentPath;

  const historyIdxRef = useRef<number>(
    typeof window !== 'undefined' && window.history.state?.idx !== undefined
      ? window.history.state.idx
      : 0
  );

  // Continuously record homepage scroll offset so returning to home restores exact scroll position
  useEffect(() => {
    const route = getRouteFromPath(currentPath);
    if (route !== 'home' || (typeof window !== 'undefined' && getRouteFromPath(window.location.pathname) !== 'home')) return;

    let ticking = false;
    const handleScroll = () => {
      // Do not record scroll positions during navigation transitions or scroll restoration
      if (
        (window as any).__is_navigating_away ||
        (window as any).__alpha_restoring_scroll ||
        sessionStorage.getItem('alpha_restoring_scroll') === 'true'
      ) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (
            !(window as any).__is_navigating_away &&
            !(window as any).__alpha_restoring_scroll
          ) {
            const y = Math.round(window.scrollY);
            if (y > 20) {
              sessionStorage.setItem('alpha_home_scroll_y', String(y));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navigateTo = useCallback((
    href: string,
    explicitDirection?: TransitionDirection,
    navOptions?: { isFreshNav?: boolean; isRestoreScroll?: boolean }
  ) => {
    if (transitionRef.current?.isTransitioning()) return;

    const currentUrl = typeof window !== 'undefined'
      ? (window.location.pathname + window.location.hash)
      : currentPathRef.current;
    const currentRoute = getRouteFromPath(currentUrl);

    const isHomeTarget =
      href === '/' ||
      href === '/#home' ||
      href === '#home' ||
      href === '/index.html' ||
      href.startsWith('/#') ||
      (['#home', '#pillars', '#who-we-serve', '#founder', '#about', '#contact', '#contact-form'].includes(href));
    const targetRoute = isHomeTarget ? 'home' : (href.startsWith('#') ? currentRoute : getRouteFromPath(href));

    // When leaving homepage to an internal page, preserve exact homepage scroll offset
    if (currentRoute === 'home' && targetRoute !== 'home' && typeof window !== 'undefined') {
      (window as any).__is_navigating_away = true;
      const currentScrollY = Math.round(window.scrollY || document.documentElement.scrollTop || 0);
      if (currentScrollY > 0) {
        sessionStorage.setItem('alpha_home_scroll_y', String(currentScrollY));
      }
    }

    // Standardize contact-oriented actions across all pages
    const isContactAction =
      href === '/#contact' ||
      href === '#contact' ||
      href.includes('#contact') ||
      href.includes('#contact-form');

    // Direction resolution: intelligent, deterministic bidirectional logic
    const direction = determineDirection(currentUrl, href, explicitDirection);

    // 1. All Contact CTAs: Execute full-viewport Cyprus deep-teal cover-and-reveal transition
    // Pre-positions scroll at #contact under the solid panel with ZERO intermediate flash of the hero
    if (isContactAction) {
      const contactEl = document.getElementById('contact');
      const isAlreadyAtContact =
        currentRoute === 'home' &&
        contactEl &&
        Math.abs(contactEl.getBoundingClientRect().top - 80) < 50;

      if (isAlreadyAtContact) {
        // Already right at the contact form, avoid redundant animation
        return;
      }

      const canonicalHref = '/#contact';
      transitionRef.current?.startTransition(
        canonicalHref,
        direction,
        // Phase B Callback: Viewport 100% covered by Cyprus deep teal panel (#004643)
        async () => {
          // Close mobile menu drawer invisibly under the solid Cyprus teal panel
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('close-mobile-menu'));
            document.body.style.overflow = '';
          }

          const nextIdx = ++historyIdxRef.current;

          // Commit route change in browser history and React state if arriving from internal page
          if (currentRoute !== 'home') {
            window.history.pushState({ idx: nextIdx }, '', canonicalHref);
            currentPathRef.current = canonicalHref;
            setCurrentPath(canonicalHref);
            // Wait for React to mount the homepage and ContactSection under the solid panel
            await new Promise((resolve) => {
              requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
              });
            });
          } else {
            // Already on home: ensure URL hash is canonical
            if (window.location.hash !== '#contact') {
              window.history.pushState({ idx: nextIdx }, '', canonicalHref);
              currentPathRef.current = canonicalHref;
              setCurrentPath(canonicalHref);
            }
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }

          // Pre-position scroll position directly at #contact BEFORE panel sweeps away (Phase C)
          const el = document.getElementById('contact');
          if (el) {
            const headerOffset = 80;
            const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset));
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true, force: true });
            }
            window.scrollTo(0, targetY);
            document.documentElement.scrollTop = targetY;
            document.body.scrollTop = targetY;
          }
        },
        // Phase C Reveal Complete: Destination is fully uncovered and interactive
        () => {
          const el = document.getElementById('contact');
          if (el) {
            const headerOffset = 80;
            const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset));
            const currentY = window.scrollY;
            if (Math.abs(currentY - targetY) > 8) {
              const lenis = (window as any).__lenis;
              if (lenis) lenis.scrollTo(targetY, { immediate: true });
              else window.scrollTo(0, targetY);
            }
          }
        }
      );
      return;
    }

    // 2. Same-page navigation
    if (targetRoute === currentRoute) {
      // Close mobile drawer and release body scroll lock immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('close-mobile-menu'));
        document.body.style.overflow = '';
      }

      const isHomeTarget = href === '/' || href === '/#home' || href === '#home';
      if (isHomeTarget && currentRoute === 'home') {
        if (window.scrollY <= 30) {
          // Already at top of Home, do nothing
          return;
        }
        if (window.location.hash !== '') {
          window.history.replaceState({ idx: historyIdxRef.current }, '', '/');
          setCurrentPath('/');
        }
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: false, duration: 0.6 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (href.includes('#')) {
        const hash = href.split('#')[1];
        if (window.location.hash !== `#${hash}`) {
          const fullPath = (typeof window !== 'undefined' ? window.location.pathname : '') + `#${hash}`;
          window.history.pushState({ idx: ++historyIdxRef.current }, '', fullPath);
          currentPathRef.current = fullPath;
          setCurrentPath(fullPath);
        }
        const el = document.getElementById(hash);
        const lenis = (window as any).__lenis;
        if (el) {
          const headerOffset = 88;
          const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset));
          if (lenis) lenis.scrollTo(targetY);
          else window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
        if (window.location.pathname !== href) {
          window.history.pushState({ idx: ++historyIdxRef.current }, '', href);
          setCurrentPath(href);
        }
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: false, duration: 0.6 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    // 3. Cross-page navigation: Coordinated Directional Cover-and-Reveal Transition
    let targetHash = '';
    if (href.includes('#')) {
      targetHash = href.split('#')[1];
    }

    const canonicalTargetHref = (href === '/#home' && targetRoute === 'home') ? '/' : href;
    const isFreshNav = navOptions?.isFreshNav === true;
    const shouldRestoreScroll =
      !isFreshNav &&
      targetRoute === 'home' &&
      currentRoute !== 'home' &&
      (navOptions?.isRestoreScroll === true ||
        direction === 'backward' ||
        targetHash === 'home' ||
        targetHash === '');

    let restoreY = 0;
    if (shouldRestoreScroll && typeof window !== 'undefined') {
      const savedYStr = sessionStorage.getItem('alpha_home_scroll_y');
      restoreY = savedYStr ? Math.max(0, parseInt(savedYStr, 10)) : 0;
    }

    transitionRef.current?.startTransition(
      canonicalTargetHref,
      direction,
      // Phase B Callback: Viewport 100% covered by Cyprus deep teal panel
      async () => {
        // Close mobile drawer invisibly under the solid Cyprus teal panel
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('close-mobile-menu'));
          document.body.style.overflow = '';
        }

        if (shouldRestoreScroll) {
          // Tell SmoothScrollProvider and window that scroll is being restored under the panel
          if (typeof window !== 'undefined') {
            (window as any).__alpha_restoring_scroll = true;
            sessionStorage.setItem('alpha_restoring_scroll', 'true');
          }
        } else {
          // Synchronously reset scroll so incoming page mounts at (0, 0)
          if (typeof window !== 'undefined') {
            if (isFreshNav) {
              sessionStorage.removeItem('alpha_home_scroll_y');
            }
            (window as any).__alpha_restoring_scroll = false;
            sessionStorage.removeItem('alpha_restoring_scroll');
          }
          const lenis = (window as any).__lenis;
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }

        // Commit route change in browser history and React state
        const nextIdx = ++historyIdxRef.current;
        window.history.pushState({ idx: nextIdx }, '', canonicalTargetHref);
        currentPathRef.current = canonicalTargetHref;
        setCurrentPath(canonicalTargetHref);

        // Wait two animation frames for React to mount new route DOM
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });

        // If restoring home scroll, apply the scroll position under the solid panel
        if (shouldRestoreScroll) {
          if (restoreY === 0) {
            const pillarsEl = document.getElementById('pillars');
            if (pillarsEl) {
              restoreY = Math.max(0, Math.round(pillarsEl.getBoundingClientRect().top + window.scrollY - 80));
            }
          }
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(restoreY, { immediate: true, force: true });
          }
          window.scrollTo({ top: restoreY, behavior: 'instant' as ScrollBehavior });
          document.documentElement.scrollTop = restoreY;
          document.body.scrollTop = restoreY;
          if (typeof (window as any).ScrollTrigger !== 'undefined') {
            (window as any).ScrollTrigger.refresh();
          }
        }
      },
      // Phase C Reveal Complete: Destination is fully uncovered and interactive
      () => {
        if (shouldRestoreScroll) {
          const currentY = window.scrollY;
          if (Math.abs(currentY - restoreY) > 10) {
            const lenis = (window as any).__lenis;
            if (lenis) lenis.scrollTo(restoreY, { immediate: true, force: true });
            else window.scrollTo({ top: restoreY, behavior: 'instant' as ScrollBehavior });
            if (typeof (window as any).ScrollTrigger !== 'undefined') {
              (window as any).ScrollTrigger.refresh();
            }
          }
          if (typeof window !== 'undefined') {
            (window as any).__alpha_restoring_scroll = false;
            sessionStorage.removeItem('alpha_restoring_scroll');
          }
        }
        if (typeof window !== 'undefined') {
          (window as any).__is_navigating_away = false;
        }

        if (targetHash && targetHash !== 'home') {
          const scrollToTarget = () => {
            const el = document.getElementById(targetHash);
            const lenis = (window as any).__lenis;
            if (el) {
              const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 80));
              if (lenis) lenis.scrollTo(targetY);
              else window.scrollTo({ top: targetY, behavior: 'smooth' });
              return true;
            }
            return false;
          };

          if (!scrollToTarget()) {
            setTimeout(scrollToTarget, 60);
            setTimeout(scrollToTarget, 160);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const newPath = window.location.pathname + window.location.hash;
      if (transitionRef.current?.isTransitioning()) {
        setCurrentPath(newPath);
        return;
      }

      const targetRoute = getRouteFromPath(newPath);
      const currentRoute = getRouteFromPath(currentPathRef.current);
      const isContactPop = newPath.includes('#contact') || newPath.includes('#contact-form');

      // Accurate detection of pop direction using history state idx
      const newIdx = event.state?.idx;
      let popDirection: TransitionDirection = 'backward';
      if (typeof newIdx === 'number') {
        popDirection = newIdx < historyIdxRef.current ? 'backward' : 'forward';
        historyIdxRef.current = newIdx;
      } else {
        popDirection = determineDirection(currentPathRef.current, newPath);
      }

      if (targetRoute === currentRoute && !isContactPop) {
        currentPathRef.current = newPath;
        setCurrentPath(newPath);
        return;
      }

      const isReturningHome = currentRoute !== 'home' && targetRoute === 'home' && popDirection === 'backward';
      let popRestoreY = 0;
      if (isReturningHome && typeof window !== 'undefined') {
        const savedYStr = sessionStorage.getItem('alpha_home_scroll_y');
        popRestoreY = savedYStr ? Math.max(0, parseInt(savedYStr, 10)) : 0;
      }

      transitionRef.current?.startTransition(
        newPath,
        popDirection,
        async () => {
          // Close mobile menu if open during popstate
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('close-mobile-menu'));
            document.body.style.overflow = '';
          }

          if (isReturningHome) {
            (window as any).__alpha_restoring_scroll = true;
            sessionStorage.setItem('alpha_restoring_scroll', 'true');
          }

          currentPathRef.current = newPath;
          setCurrentPath(newPath);
          await new Promise((resolve) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(resolve);
            });
          });

          if (isContactPop) {
            const el = document.getElementById('contact');
            if (el) {
              const headerOffset = 80;
              const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset));
              const lenis = (window as any).__lenis;
              if (lenis) lenis.scrollTo(targetY, { immediate: true, force: true });
              window.scrollTo(0, targetY);
              document.documentElement.scrollTop = targetY;
              document.body.scrollTop = targetY;
              return;
            }
          }

          if (isReturningHome) {
            if (popRestoreY === 0) {
              const pillarsEl = document.getElementById('pillars');
              if (pillarsEl) {
                popRestoreY = Math.max(0, Math.round(pillarsEl.getBoundingClientRect().top + window.scrollY - 80));
              }
            }
            const lenis = (window as any).__lenis;
            if (lenis) lenis.scrollTo(popRestoreY, { immediate: true, force: true });
            window.scrollTo({ top: popRestoreY, behavior: 'instant' as ScrollBehavior });
            document.documentElement.scrollTop = popRestoreY;
            document.body.scrollTop = popRestoreY;
            if (typeof (window as any).ScrollTrigger !== 'undefined') {
              (window as any).ScrollTrigger.refresh();
            }
            setTimeout(() => {
              (window as any).__alpha_restoring_scroll = false;
              sessionStorage.removeItem('alpha_restoring_scroll');
            }, 500);
            return;
          }

          const lenis = (window as any).__lenis;
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      );
    };

    window.addEventListener('popstate', handlePopState);

    // Global internal link handler using capture phase for rock-solid interception on mobile and desktop
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Skip external links, mailto, tel, javascript, downloads, new tabs
      if (
        href.startsWith('http:') ||
        href.startsWith('https:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        target.getAttribute('target') === '_blank' ||
        target.hasAttribute('download')
      ) {
        return;
      }

      // In-page navigation controls (e.g. Practice Disciplines cards on AI Consulting page):
      // Smoothly scroll to the target section within current page while keeping route and URL unchanged.
      if (target.getAttribute('data-inpage-scroll') === 'true' || target.closest('[data-inpage-scroll="true"]')) {
        e.preventDefault();
        e.stopPropagation();

        const scrollTarget = (target.hasAttribute('data-inpage-scroll')
          ? target
          : target.closest('[data-inpage-scroll="true"]')) as HTMLElement;
        const targetId = scrollTarget.getAttribute('data-target') || (href.startsWith('#') ? href.slice(1) : '');

        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            const headerOffset = 88;
            const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset));
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(targetY, { duration: 0.9 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }
        }
        return;
      }

      // Touch card protection: on touch devices, an unrevealed card's CTA should NOT navigate immediately
      const card = target.closest('.service-interactive-card');
      if (card && !card.classList.contains('is-revealed')) {
        const isTouch =
          ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
          (window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 640);
        if (isTouch) {
          // Touch card first tap reveals card; do not intercept or navigate yet
          return;
        }
      }

      // Check if explicit direction was provided as a data attribute (e.g. data-direction="backward")
      const explicitDirection = target.getAttribute('data-direction') as TransitionDirection | null;
      const isFreshNav = target.getAttribute('data-fresh-nav') === 'true';

      const liveUrl = typeof window !== 'undefined'
        ? (window.location.pathname + window.location.hash)
        : currentPathRef.current;
      const currentRoute = getRouteFromPath(liveUrl);

      // Detect back links by text, attributes, or symbols
      let direction: TransitionDirection | undefined = explicitDirection || undefined;
      const text = target.textContent?.trim().toLowerCase() || '';
      const isLogo = target.getAttribute('aria-label')?.includes('Home') || !!target.querySelector('svg[aria-label*="Symbol"]');
      const isRestoreScroll = target.getAttribute('data-restore-scroll') === 'true' || text.includes('back to');

      if (
        !isFreshNav &&
        (isLogo ||
          text.includes('back to') ||
          target.querySelector('svg.arrow-left') ||
          text === 'home' ||
          target.getAttribute('aria-label')?.toLowerCase().includes('home'))
      ) {
        if (currentRoute !== 'home' && (href === '/' || href.includes('#home') || href.includes('index.html'))) {
          direction = 'backward';
        }
      }

      // Handle internal link through directional transition coordinator
      e.preventDefault();
      e.stopPropagation();
      navigateTo(href, direction, { isFreshNav, isRestoreScroll });
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [navigateTo]);

  const route = getRouteFromPath(currentPath);
  useSEO(route);

  return (
    <SmoothScrollProvider currentPath={currentPath}>
      <div className="min-h-screen flex flex-col bg-surface-warm text-brand-dark antialiased selection:bg-primary/20 selection:text-primary relative">
        {/* Full-viewport Directional Cover-and-Reveal Transition Layer */}
        <DirectionalTransitionOverlay
          ref={transitionRef}
          revealMode="sweep-across"
          coverDuration={0.36}
          revealDuration={0.42}
          ease="power3.inOut"
          panelColor="#004643"
        />

        {/* Stable Persistent Header Navigation */}
        <SiteHeader currentPath={currentPath} />

        {/* Editorial Page Container */}
        <PageTransition routeKey={route} className={route === 'home' ? '' : 'pt-24 sm:pt-28'}>
          {(route === 'divorce-family-law' ||
            route === 'economic-damages' ||
            route === 'document-analysis' ||
            route === 'bankruptcy-restructuring' ||
            route === 'intellectual-property' ||
            route === 'litigation-support') && (
            <EditorialServiceDetailPage serviceKey={route} />
          )}
          {route === 'litigation-services' && <LitigationServicesPage />}
          {route === 'alpha-lens' && <AlphaLensPage />}
          {route === 'ai-consulting' && <AIConsultingPage />}
          {route === 'terms-of-service' && <TermsOfServicePage />}
          {route === 'privacy-policy' && <PrivacyPolicyPage />}
          {route === 'home' && (
            <main className="flex-grow">
              {/* Hero Section */}
              <HeroSection />

              {/* Continuous Linear Trust Marquee */}
              <LinearTrustMarquee speed={34} />

              {/* Core Practice Pillars (Three Prominent Navigational Cards) */}
              <ExpertiseStrip />

              {/* Who We Serve (Target Audiences & Market Focus) */}
              <WhoWeServeSection />

              {/* Founder & About (Leadership Narrative) */}
              <FounderAboutSection />

              {/* Contact & Dispute Inquiry (Confidential Intake) */}
              <ContactSection />
            </main>
          )}

          {/* Shared Global Footer */}
          <SiteFooter />
        </PageTransition>
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
