import React, { useState, useEffect } from 'react';
import { List, ArrowRight } from '@phosphor-icons/react';
import { Logo } from '../ui/Logo';
import { MobileNavigation } from './MobileNavigation';
import { siteContent } from '../../content/siteContent';

export interface SiteHeaderProps {
  currentPath?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Trigger translucent glass effect once scroll passes small threshold (20px)
          setIsScrolled(currentScrollY > 20);

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

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full h-20 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out ${
          isScrolled
            ? 'bg-[#F0EDE5]/90 backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)] border-b border-brand-taupe/25 shadow-xs'
            : 'bg-[#F0EDE5]/80 backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)] border-b border-brand-border/30 shadow-none'
        }`}
      >
        <div className="site-container h-full flex lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] items-center justify-between">
          {/* ── LEFT ZONE: BRAND LOGO & TWO-LINE WORDMARK ── */}
          <div className="flex items-center justify-start shrink-0">
            <Logo />
          </div>

          {/* ── CENTER ZONE: NAVIGATION ── */}
          <div className="hidden lg:flex items-center justify-center min-w-0 px-1 xl:px-4">
            <nav
              className="flex items-center gap-2 xl:gap-4 2xl:gap-6"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.links.map((link) => {
                const pathname = (currentPath || (typeof window !== 'undefined' ? window.location.pathname : '')).toLowerCase();
                let isActive = false;
                if (link.href.includes('litigationservices')) {
                  isActive =
                    pathname.includes('litigationservices') ||
                    pathname.includes('documentanalysis') ||
                    pathname.includes('divorcefamilylaw') ||
                    pathname.includes('economicdamages') ||
                    pathname.includes('bankruptcyrestructuring') ||
                    pathname.includes('intellectualproperty') ||
                    pathname.includes('litigationsupport');
                } else if (link.href.includes('alphalens')) {
                  isActive = pathname.includes('alphalens');
                } else if (link.href.includes('aiconsulting')) {
                  isActive = pathname.includes('aiconsulting');
                } else if (pathname === '/' || pathname === '' || pathname.includes('index.html')) {
                  const sectionId = link.href.replace('/#', '').replace('#', '');
                  isActive = activeSection === sectionId || ((sectionId === 'founder' || sectionId === 'about') && (activeSection === 'founder' || activeSection === 'about'));
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-[12px] xl:text-[13.5px] 2xl:text-[14px] font-medium transition-colors relative px-0.5 xl:px-1 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm whitespace-nowrap ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-brand-slate hover:text-primary'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT ZONE: PRIMARY CTA (Desktop) & MOBILE MENU TOGGLE ── */}
          <div className="flex items-center justify-end shrink-0">
            {/* Desktop Consultation Action */}
            <div className="hidden lg:flex items-center">
              <a
                href={siteContent.navigation.cta.href.startsWith('#') ? `/${siteContent.navigation.cta.href}` : siteContent.navigation.cta.href}
                className="inline-flex items-center gap-1.5 xl:gap-2 px-3.5 xl:px-5 py-2 xl:py-2.5 bg-accent hover:bg-accent-hover text-white text-[12.5px] xl:text-[14px] font-semibold rounded-md shadow-sm shadow-accent/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px whitespace-nowrap"
              >
                <span>{siteContent.navigation.cta.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 -mr-2 text-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
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
