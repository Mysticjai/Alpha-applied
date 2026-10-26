import React from 'react';
import { ArrowRight, Scales, TrendDown, FileText, Bank, ShieldCheck, Briefcase } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export const LitigationServicesSection: React.FC = () => {
  const { litigationServices } = siteContent;

  const serviceIcons = [
    <Scales key="divorce" weight="bold" className="w-5 h-5 text-primary" />,
    <TrendDown key="damages" weight="bold" className="w-5 h-5 text-primary" />,
    <FileText key="docs" weight="bold" className="w-5 h-5 text-primary" />,
    <Bank key="bankruptcy" weight="bold" className="w-5 h-5 text-primary" />,
    <ShieldCheck key="ip" weight="bold" className="w-5 h-5 text-primary" />,
    <Briefcase key="support" weight="bold" className="w-5 h-5 text-primary" />,
  ];

  return (
    <section
      id="litigation"
      className="section-padding bg-surface-warm border-b border-brand-border/60 relative scroll-mt-20"
    >
      <div className="site-container">
        {/* Section Heading */}
        <AnimatedContent distance={20} duration={0.6} threshold={0.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-brand-border/60">
            <SectionHeading
              badge={litigationServices.badge}
              title={litigationServices.title}
              subtitle={litigationServices.subtitle}
            />
            <div className="shrink-0">
              <a
                href={litigationServices.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white text-[14px] font-semibold rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{litigationServices.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* 6 Core Service Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <AnimatedContent distance={24} stagger={0.08} threshold={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {litigationServices.services.map((service, index) => (
            <div key={service.id} className="h-full">
              <a
                href={service.ctaHref}
                aria-label={`${service.title} — ${service.ctaLabel}`}
                className="litigation-service-card card-premium h-full p-7 sm:p-8 flex flex-col justify-between group bg-white border border-brand-border/80 rounded-xl hover:border-primary/45 hover:shadow-[0_12px_28px_-6px_rgba(0,70,67,0.12),0_4px_10px_-2px_rgba(0,70,67,0.06)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:border-primary/50 focus-visible:-translate-y-1 transition-all duration-[260ms] ease-out block text-left cursor-pointer no-underline motion-reduce:hover:translate-y-0"
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-lg bg-surface-warm flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {serviceIcons[index]}
                    </div>
                    <span className="text-xs font-mono font-semibold tracking-widest text-brand-taupe">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal tracking-tight group-hover:text-primary-dark transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3.5 text-xs sm:text-[14px] text-brand-slate leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Action Link Indicator */}
                <div className="mt-6 pt-5 border-t border-brand-border/50">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    <span>{service.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </AnimatedContent>

        {/* Practice Consultation Banner */}
        <AnimatedContent distance={20} duration={0.6} delay={0.1} threshold={0.15}>
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-brand-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
            <div>
              <h4 className="font-serif text-xl text-primary font-normal">
                Have an active dispute or quantitative matter requiring analysis?
              </h4>
              <p className="mt-1 text-sm text-brand-slate">
                Initial conflict clearances are conducted under strict confidentiality prior to engagement.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm transition-all text-center justify-center"
            >
              <span>Initiate Confidential Discussion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
