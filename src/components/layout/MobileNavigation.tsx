import React, { useEffect } from 'react';
import { X, ArrowRight } from '@phosphor-icons/react';
import { Logo } from '../ui/Logo';
import { siteContent } from '../../content/siteContent';
import { getRouteFromPath } from '../../lib/routes';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  currentPath?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeSection,
  currentPath,
}) => {
  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (_e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If external link, close drawer immediately
    if (
      href.startsWith('http:') ||
      href.startsWith('https:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      document.body.style.overflow = '';
      onClose();
      return;
    }

    const currentUrl = currentPath || (typeof window !== 'undefined' ? (window.location.pathname + window.location.hash) : '/');
    const currentRoute = getRouteFromPath(currentUrl);
    const targetRoute = href.startsWith('#') ? currentRoute : getRouteFromPath(href);
    const isContactAction =
      href === '/#contact' ||
      href === '#contact' ||
      href.includes('#contact') ||
      href.includes('#contact-form');

    // In-page anchor on the current page (e.g. #who-we-serve, #founder while on home page):
    // Close drawer immediately and release body scroll lock so smooth scroll proceeds unobstructed
    if (targetRoute === currentRoute && !isContactAction) {
      document.body.style.overflow = '';
      onClose();
      return;
    }

    // For cross-page routes or Contact CTAs:
    // Do NOT close drawer immediately. The directional transition sweep will cover the viewport first,
    // and the drawer will be closed cleanly in Phase B via the 'close-mobile-menu' event.
  };

  const ctaHref = siteContent.navigation.cta.href.startsWith('#')
    ? `/${siteContent.navigation.cta.href}`
    : siteContent.navigation.cta.href;

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface-warm shadow-2xl flex flex-col justify-between p-6 z-10 border-l border-brand-border">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-brand-border/60">
            <Logo onClick={onClose} currentPath={currentPath} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            {siteContent.navigation.links.map((link) => {
              const pathname = (currentPath || (typeof window !== 'undefined' ? window.location.pathname : '')).toLowerCase();
              const isInternal = pathname && !pathname.endsWith('/') && !pathname.includes('index.html');
              const isHomeLink = link.label === 'Home' || link.href === '/#home';
              const linkDirection = (isInternal && isHomeLink) ? 'backward' : undefined;

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
                  data-direction={linkDirection}
                  data-fresh-nav={isHomeLink ? 'true' : undefined}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-heading text-lg font-semibold transition-colors py-2 px-3 rounded-md flex items-center justify-between ${
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-brand-slate hover:text-primary hover:bg-black/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs uppercase tracking-widest text-brand-taupe">→</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-brand-border/60 flex flex-col gap-3">
          <a
            href={ctaHref}
            onClick={(e) => handleLinkClick(e, ctaHref)}
            className="font-heading w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-accent hover:bg-accent-hover text-white text-[15px] font-semibold rounded-md shadow-md shadow-accent/20 transition-all text-center"
          >
            <span>{siteContent.navigation.cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-brand-slate text-center mt-2">
            Confidential preliminary litigation &amp; advisory discussions.
          </p>
        </div>
      </div>
    </div>
  );
};
