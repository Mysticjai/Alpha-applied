import React, { useState, useEffect, useRef } from 'react';
import { List, ArrowRight } from '@phosphor-icons/react';
import { Logo } from '../ui/Logo';
import { MobileNavigation } from './MobileNavigation';
import { siteContent } from '../../content/siteContent';
import { getRouteFromPath } from '../../lib/routes';

export interface SiteHeaderProps {
  currentPath?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isScrolledRef = useRef(false);

  const rawPath = (currentPath || (typeof window !== 'undefined' ? (window.location.pathname + window.location.hash) : '')).toLowerCase();
  const currentRoute = getRouteFromPath(rawPath);
  const isHome = currentRoute === 'home';

  // Transparent initially only at the top of the homepage (scroll <= 28px).
  // Once scrolled beyond 28px, or on any internal subpage, becomes a translucent ivory-blurred surface.
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextScrolled = currentScrollY > 28;

          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          // Active section detection with header height offset
          const sections = ['home', 'litigation', 'alpha-lens', 'ai-consulting', 'who-we-serve', 'founder', 'about', 'contact'];
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 120 && rect.bottom >= 120) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    // Listen for global close-mobile-menu event triggered during transition Phase B
    const handleCloseMenu = () => {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';
    };
    window.addEventListener('close-mobile-menu', handleCloseMenu);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('close-mobile-menu', handleCloseMenu);
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none px-3 xs:px-4 sm:px-6 xl:px-6 2xl:px-10 pt-3 sm:pt-4 lg:pt-5"
      >
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[1360px] h-[58px] xs:h-[62px] sm:h-[66px] lg:h-[70px] rounded-xl sm:rounded-2xl transition-[background-color,backdrop-filter,-webkit-backdrop-filter,border-color,box-shadow] duration-300 ease-out flex items-center justify-between px-3.5 sm:px-4 xl:px-4 2xl:px-6 ${
            isTransparent
              ? 'bg-white/[0.05] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-white/20 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)]'
              : 'bg-[#F0EDE5]/90 backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-brand-border/80 shadow-[0_8px_30px_-6px_rgba(0,70,67,0.12),0_2px_8px_-2px_rgba(0,70,67,0.06)]'
          }`}
        >
          {/* ── LEFT ZONE: BRAND LOGO & TWO-LINE WORDMARK ── */}
          <div className="flex items-center justify-start shrink-0 mr-2 xl:mr-3">
            <Logo isTransparent={isTransparent} currentPath={rawPath} />
          </div>

          {/* ── CENTER ZONE: NAVIGATION ── */}
          <div className="hidden xl:flex items-center justify-center flex-1 min-w-0 px-1 xl:px-2">
            <nav
              className="flex items-center gap-1.5 xl:gap-2 2xl:gap-4"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.links.map((link) => {
                const isHomeLink = link.label === 'Home' || link.href === '/#home';
                const linkDirection = (!isHome && isHomeLink) ? 'backward' : undefined;

                let isActive = false;
                if (link.href.includes('litigationservices')) {
                  isActive =
                    rawPath.includes('litigationservices') ||
                    rawPath.includes('documentanalysis') ||
                    rawPath.includes('divorcefamilylaw') ||
                    rawPath.includes('economicdamages') ||
                    rawPath.includes('bankruptcyrestructuring') ||
                    rawPath.includes('intellectualproperty') ||
                    rawPath.includes('litigationsupport');
                } else if (link.href.includes('alphalens')) {
                  isActive = rawPath.includes('alphalens');
                } else if (link.href.includes('aiconsulting')) {
                  isActive = rawPath.includes('aiconsulting');
                } else if (rawPath === '/' || rawPath === '' || rawPath.includes('index.html') || rawPath.startsWith('/#')) {
                  const sectionId = link.href.replace('/#', '').replace('#', '');
                  isActive = activeSection === sectionId || ((sectionId === 'founder' || sectionId === 'about') && (activeSection === 'founder' || activeSection === 'about'));
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    data-direction={linkDirection}
                    data-fresh-nav={isHomeLink ? 'true' : undefined}
                    className={`font-heading text-[12px] xl:text-[12.75px] 2xl:text-[13.5px] font-semibold transition-colors relative px-0.5 xl:px-1 py-1 focus:outline-none focus-visible:ring-1 ${
                      isTransparent ? 'focus-visible:ring-white' : 'focus-visible:ring-primary'
                    } rounded-sm whitespace-nowrap ${
                      isTransparent
                        ? isActive
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                        : isActive
                          ? 'text-primary'
                          : 'text-brand-slate hover:text-primary'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-0.5 right-0.5 h-0.5 rounded-full transition-all ${
                          isTransparent ? 'bg-[#C5A880]' : 'bg-primary'
                        }`}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT ZONE: PRIMARY CTA (Desktop & Tablet) & MOBILE MENU TOGGLE ── */}
          <div className="flex items-center justify-end shrink-0 ml-2 xl:ml-3 gap-2">
            {/* Consultation Action (Desktop & Tablet >= sm) */}
            <div className="hidden sm:flex items-center">
              <a
                href={siteContent.navigation.cta.href.startsWith('#') ? `/${siteContent.navigation.cta.href}` : siteContent.navigation.cta.href}
                className="font-heading inline-flex items-center gap-1.5 xl:gap-2 px-3.5 xl:px-4 2xl:px-5 py-2 xl:py-2.5 bg-accent hover:bg-accent-hover text-white text-[12px] xl:text-[12.75px] 2xl:text-[13.5px] font-semibold rounded-lg shadow-sm shadow-accent/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px whitespace-nowrap"
              >
                <span>{siteContent.navigation.cta.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile / Tablet Menu Button (< xl) */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className={`p-2 -mr-1 focus:outline-none focus-visible:ring-2 rounded-lg transition-colors ${
                  isTransparent
                    ? 'text-white hover:text-accent focus-visible:ring-white'
                    : 'text-primary hover:text-accent focus-visible:ring-primary'
                }`}
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        currentPath={currentPath}
      />
    </>
  );
};
