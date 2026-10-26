import React from 'react';
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';
import { AnimatedContent } from '../ui/AnimatedContent';

interface ServiceClosingCtaProps {
  heading?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  emailSubject?: string;
}

export const ServiceClosingCta: React.FC<ServiceClosingCtaProps> = ({
  heading = 'Drowning in Documents?',
  subtitle = 'Let us transform your document chaos into structured, production-ready data in days instead of weeks.',
  primaryCtaLabel = 'Book a Call',
  primaryCtaHref = '/#contact',
  emailSubject = 'Document Analysis Inquiry',
}) => {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-primary text-white">
      <div className="site-container text-center max-w-2xl mx-auto">
        <AnimatedContent distance={16} duration={0.5}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-white leading-tight mb-4">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-surface-warm/85 leading-relaxed mb-8">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={primaryCtaHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-[14px] sm:text-[15px] font-semibold rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-px"
            >
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            <a
              href={`mailto:info@alphaanalyticssol.com?subject=${encodeURIComponent(emailSubject)}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-[14px] sm:text-[15px] font-medium rounded-md border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <EnvelopeSimple className="w-4 h-4" />
              <span>Email Direct Inquiry</span>
            </a>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
