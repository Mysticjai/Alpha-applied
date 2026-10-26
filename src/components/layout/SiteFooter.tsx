import React from 'react';
import { siteContent } from '../../content/siteContent';
import { Logo } from '../ui/Logo';
import { ArrowUp, EnvelopeSimple, Phone } from '@phosphor-icons/react';
import { AnimatedContent } from '../ui/AnimatedContent';

export const SiteFooter: React.FC = () => {
  const { footer, contact } = siteContent;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#00201E] text-white border-t border-[#002C2A]">
      {/* Main Footer Body */}
      <AnimatedContent distance={12} duration={0.6} threshold={0.05}>
        <div className="site-container py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* 1. Brand & Contact Identity (5 cols) */}
          <div className="md:col-span-6 lg:col-span-5">
            <Logo variant="light" showTagline={true} />
            <p className="mt-4 text-xs sm:text-sm text-surface-warm/75 leading-relaxed max-w-sm">
              {footer.description}
            </p>

            <div className="mt-6 space-y-2 text-xs text-surface-warm/85 font-mono">
              <div className="flex items-center gap-2">
                <EnvelopeSimple className="w-3.5 h-3.5 text-accent-light shrink-0" />
                <a href={`mailto:${contact.details.email}`} className="hover:text-white transition-colors">
                  {contact.details.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-light shrink-0" />
                <a href={contact.details.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {contact.details.phone} (WhatsApp)
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-brand-taupe-light">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Independent • Objective • Confidential</span>
            </div>
          </div>

          {/* 2. Services: Three Primary Offerings (3 cols) */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-taupe-light block mb-4">
              Services
            </span>
            <ul className="space-y-3">
              {footer.servicesLinks.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-xs sm:text-[13.5px] text-surface-warm/75 hover:text-white transition-colors focus:outline-none focus-visible:underline font-medium"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Company & Legal (4 cols) */}
          <div className="md:col-span-3 lg:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-taupe-light block mb-4">
              Company &amp; Legal
            </span>
            <ul className="space-y-2.5 mb-6">
              {footer.companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-[13.5px] text-surface-warm/70 hover:text-white transition-colors focus:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-accent-light hover:text-white transition-colors"
            >
              <span>Initiate a confidential discussion</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-surface-warm/50 leading-relaxed">
          <p>{footer.legalNotice}</p>
        </div>
      </div>
    </AnimatedContent>

    {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#001A18]">
        <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-surface-warm/60">
            <p>{footer.copyright}</p>
            <div className="flex items-center gap-3">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs text-surface-warm/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
