import React from 'react';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export interface RelatedServiceItem {
  title: string;
  description: string;
  href: string;
}

interface RelatedServicesProps {
  currentServiceId: string;
  services: RelatedServiceItem[];
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  services,
}) => {
  return (
    <section className="py-14 lg:py-20 bg-surface-warm border-b border-brand-border/60">
      <div className="site-container">
        <AnimatedContent distance={14} duration={0.5}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 lg:mb-10">
            <SectionHeading
              title="Complementary Practice Areas"
              subtitle="Analytical expertise tailored for specific dispute types and litigation requirements."
            />
            <div className="shrink-0">
              <a
                href="/#litigation"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View All Litigation Services</span>
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* Minimal Service Rows (No Large Card Grid) */}
        <AnimatedContent distance={16} duration={0.5} delay={0.1}>
          <div className="border-b border-brand-border/60 divide-y divide-brand-border/60">
            {services.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 group hover:bg-black/[0.015] px-2 sm:px-3 -mx-2 sm:-mx-3 rounded transition-colors"
              >
                <div className="max-w-2xl">
                  <h3 className="font-serif text-lg sm:text-xl text-primary font-normal tracking-tight group-hover:text-accent transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
