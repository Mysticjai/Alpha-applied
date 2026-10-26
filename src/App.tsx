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
import { AnimatedContent } from './components/ui/AnimatedContent';
import { PageTransition } from './components/layout/PageTransition';
import { DirectionalTransitionOverlay } from './components/layout/DirectionalTransitionOverlay';
import { useSEO } from './hooks/useSEO';
import type {
  DirectionalTransitionOverlayHandle,
  TransitionDirection,
} from './components/layout/DirectionalTransitionOverlay';

export type AppRoute =
  | 'home'
  | 'litigation-services'
  | 'alpha-lens'
  | 'ai-consulting'
  | 'divorce-family-law'
  | 'economic-damages'
  | 'document-analysis'
  | 'bankruptcy-restructuring'
  | 'intellectual-property'
  | 'litigation-support'
  | 'terms-of-service'
  | 'privacy-policy';

export function getRouteFromPath(pathname: string): AppRoute {
  const p = pathname.toLowerCase();
  if (p.includes('terms-of-service') || p.includes('termsofservice')) return 'terms-of-service';
  if (p.includes('privacy-policy') || p.includes('privacypolicy')) return 'privacy-policy';
  if (p.includes('divorcefamilylaw') || p.includes('divorce-family-law')) return 'divorce-family-law';
  if (p.includes('economicdamages') || p.includes('economic-damages')) return 'economic-damages';
  if (p.includes('documentanalysis') || p.includes('document-analysis')) return 'document-analysis';
  if (p.includes('bankruptcyrestructuring') || p.includes('bankruptcy-restructuring')) return 'bankruptcy-restructuring';
  if (p.includes('intellectualproperty') || p.includes('intellectual-property')) return 'intellectual-property';
  if (p.includes('litigationsupport') || p.includes('litigation-support')) return 'litigation-support';
  if (p.includes('litigationservices') || p.includes('litigation-services')) return 'litigation-services';
  if (p.includes('alphalens') || p.includes('alpha-lens')) return 'alpha-lens';
  if (p.includes('aiconsulting') || p.includes('ai-consulting')) return 'ai-consulting';
  return 'home';
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('founder') || (p.includes('about') && !window.location.hash)) {
        window.history.replaceState(null, '', '/#founder');
        return '/#founder';
      }
    }
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });
  const transitionRef = useRef<DirectionalTransitionOverlayHandle>(null);
  const currentPathRef = useRef(currentPath);
  currentPathRef.current = currentPath;

  const navigateTo = useCallback((href: string, direction: TransitionDirection = 'forward') => {
    if (transitionRef.current?.isTransitioning()) return;

    const currentUrl = currentPathRef.current;
    const currentRoute = getRouteFromPath(currentUrl);
    const targetRoute = href.startsWith('#') ? currentRoute : getRouteFromPath(href);

    // Standardize contact-oriented actions across all pages
    const isContactAction =
      href === '/#contact' ||
      href === '#contact' ||
      href.includes('#contact') ||
      href.includes('#contact-form');

    // 1. All Contact CTAs: Execute full-viewport Cyprus deep-teal cover-and-reveal transition
    // Pre-positions scroll at #contact under the solid panel with ZERO intermediate flash of the hero
    if (isContactAction) {
      const canonicalHref = '/#contact';
      transitionRef.current?.startTransition(
        canonicalHref,
        direction,
        // Phase B Callback: Viewport 100% covered by Cyprus deep teal panel (#004643)
        async () => {
          // Commit route change in browser history and React state if arriving from internal page
          if (currentRoute !== 'home') {
            window.history.pushState(null, '', canonicalHref);
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
              window.history.pushState(null, '', canonicalHref);
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

    // 2. Same-page click for other anchors: smooth scroll to top or target anchor
    if (targetRoute === currentRoute) {
      if (href.includes('#')) {
        const hash = href.split('#')[1];
        const el = document.getElementById(hash);
        const lenis = (window as any).__lenis;
        if (el) {
          const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 80));
          if (lenis) lenis.scrollTo(targetY);
          else window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
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

    transitionRef.current?.startTransition(
      href,
      direction,
      // Phase B Callback: Viewport 100% covered by Cyprus deep teal panel
      async () => {
        // Synchronously reset scroll so incoming page mounts at (0, 0)
        const lenis = (window as any).__lenis;
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Commit route change in browser history and React state
        window.history.pushState(null, '', href);
        setCurrentPath(href);
      },
      // Phase C Reveal Complete: Destination is fully uncovered and interactive
      () => {
        if (targetHash) {
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
    const handlePopState = () => {
      const newPath = window.location.pathname + window.location.hash;
      if (transitionRef.current?.isTransitioning()) {
        setCurrentPath(newPath);
        return;
      }

      const targetRoute = getRouteFromPath(newPath);
      const currentRoute = getRouteFromPath(currentPathRef.current);
      const isContactPop = newPath.includes('#contact') || newPath.includes('#contact-form');

      if (targetRoute === currentRoute && !isContactPop) {
        setCurrentPath(newPath);
        return;
      }

      transitionRef.current?.startTransition(
        newPath,
        'backward',
        async () => {
          if (targetRoute !== currentRoute) {
            setCurrentPath(newPath);
            await new Promise((resolve) => {
              requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
              });
            });
          }

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

          const lenis = (window as any).__lenis;
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      );
    };

    window.addEventListener('popstate', handlePopState);

    // Global internal link handler for unified directional page transition
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

      // Handle internal link through directional transition coordinator
      e.preventDefault();
      navigateTo(href, 'forward');
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
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
        <PageTransition routeKey={route}>
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
              <AnimatedContent distance={0} duration={0.6} threshold={0.1}>
                <LinearTrustMarquee speed={34} />
              </AnimatedContent>

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
