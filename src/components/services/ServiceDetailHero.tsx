import React from 'react';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { AnimatedContent } from '../ui/AnimatedContent';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceDetailHeroProps {
  breadcrumb: BreadcrumbItem[];
  badge?: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryLink?: {
    label: string;
    href: string;
  };
  visual: React.ReactNode;
}

export const ServiceDetailHero: React.FC<ServiceDetailHeroProps> = ({
  breadcrumb,
  badge,
  title,
  description,
  primaryCta,
  secondaryLink,
  visual,
}) => {
  return (
    <section className="bg-surface-warm border-b border-brand-border/60 pt-8 pb-12 lg:pt-10 lg:pb-14 relative">
      <div className="site-container">
        {/* Breadcrumb */}
        <AnimatedContent distance={10} duration={0.4}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-taupe mb-5 sm:mb-6">
            {breadcrumb.map((item, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <React.Fragment key={item.label}>
                  {idx > 0 && <span className="text-brand-border/80">/</span>}
                  {isLast || !item.href ? (
                    <span className="text-primary font-semibold">{item.label}</span>
                  ) : (
                    <a href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </a>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </AnimatedContent>

        {/* 2-Column Responsive Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Content (Dominant) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatedContent distance={16} duration={0.5} delay={0.05}>
              {badge && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-primary mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  {badge}
                </div>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-primary font-normal tracking-tight leading-[1.12]">
                {title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-brand-slate leading-relaxed max-w-2xl">
                {description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm shadow-accent/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {secondaryLink && (
                  <a
                    href={secondaryLink.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors py-2 px-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{secondaryLink.label}</span>
                  </a>
                )}
              </div>
            </AnimatedContent>
          </div>

          {/* Right Column: Restrained Work Product Visual */}
          <div className="lg:col-span-5 w-full">
            <AnimatedContent distance={16} duration={0.5} delay={0.1}>
              {visual}
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
};
