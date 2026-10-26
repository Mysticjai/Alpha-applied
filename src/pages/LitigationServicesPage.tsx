import React, { useEffect, useRef } from 'react';
import { ArrowRight, Scales, TrendDown, FileText, Bank, ShieldCheck, Briefcase } from '@phosphor-icons/react';
import { siteContent } from '../content/siteContent';
import { AnimatedContent } from '../components/ui/AnimatedContent';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InteractiveImageCard } from '../components/ui/InteractiveImageCard';
import { cardImages } from '../data/cardImages';
import { useHeroScrollExit } from '../hooks/useHeroScrollExit';

export const LitigationServicesPage: React.FC = () => {
  const { litigationServices } = siteContent;

  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll-linked hero text exit
  useHeroScrollExit({
    triggerRef: heroRef,
    headlineRef,
    bodyRef,
    ctaRef,
    enabled: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Brand card configuration across the 6 practice areas:
  // Base background: Unified warm off-white (#F7F5F0) across all six cards
  // Top Accents: Cyprus green (#004643), Muted taupe (#A79277), Crimson (#C62835) (preserved across rows)
  // Icon Tiles: Consistent Cyprus green (#004643) with white (#FFFFFF) centered icons across all six cards
  const serviceCardsMeta = [
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#004643',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <Scales weight="bold" className="w-5 h-5 text-white" />,
    },
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#A79277',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <TrendDown weight="bold" className="w-5 h-5 text-white" />,
    },
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#C62835',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <FileText weight="bold" className="w-5 h-5 text-white" />,
    },
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#004643',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <Bank weight="bold" className="w-5 h-5 text-white" />,
    },
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#A79277',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <ShieldCheck weight="bold" className="w-5 h-5 text-white" />,
    },
    {
      surfaceBg: '#F7F5F0',
      topAccent: '#C62835',
      tileBg: '#004643',
      iconColor: '#FFFFFF',
      icon: <Briefcase weight="bold" className="w-5 h-5 text-white" />,
    },
  ];

  const litigationImageMap: Record<string, { src: string; alt: string }> = {
    'divorce-family-law': cardImages.litigation.divorceFamilyLaw,
    'economic-damages': cardImages.litigation.economicDamages,
    'document-analysis': cardImages.litigation.documentAnalysis,
    'bankruptcy-restructuring': cardImages.litigation.bankruptcyRestructuring,
    'intellectual-property': cardImages.litigation.intellectualProperty,
    'litigation-support': cardImages.litigation.litigationSupport,
  };

  return (
    <main className="flex-grow">
        {/* Dedicated Editorial Hero with Scroll-Linked Exit */}
        <section
          ref={heroRef}
          className="bg-surface-warm border-b border-brand-border/60 pt-8 pb-12 lg:pt-10 lg:pb-16 relative overflow-hidden"
        >
          <div className="site-container">
            {/* Breadcrumb */}
            <AnimatedContent distance={10} duration={0.4}>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-taupe mb-5 sm:mb-6">
                <a href="/#home" className="hover:text-primary transition-colors">Home</a>
                <span className="text-brand-border/80">/</span>
                <span className="text-primary font-semibold">Litigation Services</span>
              </nav>
            </AnimatedContent>

            <div className="max-w-3xl">
              <AnimatedContent distance={16} duration={0.5} delay={0.05}>
                <h1
                  ref={headlineRef}
                  className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-primary font-normal tracking-tight leading-[1.14] will-change-[transform,opacity]"
                >
                  {litigationServices.title}
                </h1>

                <p
                  ref={bodyRef}
                  className="mt-4 sm:mt-4.5 text-base sm:text-lg text-brand-slate leading-relaxed will-change-[transform,opacity]"
                >
                  {litigationServices.subtitle}
                </p>

                <div ref={ctaRef} className="mt-7 sm:mt-8 will-change-[transform,opacity]">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm shadow-accent/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px"
                  >
                    <span>{litigationServices.cta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Six Specialized Service Cards Grid */}
        <section className="py-14 lg:py-20 bg-white border-b border-brand-border/60">
          <div className="site-container">
            <AnimatedContent distance={16} duration={0.5}>
              <div className="max-w-2xl mb-12">
                <SectionHeading
                  title="Six Dedicated Forensic Disciplines"
                  subtitle="Each practice area combines machine-assisted data extraction with senior human review to deliver court-ready findings."
                />
              </div>
            </AnimatedContent>

            {/* 6 Core Service Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
            <AnimatedContent distance={22} duration={0.65} stagger={0.08} threshold={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {litigationServices.services.map((service, index) => {
                const meta = serviceCardsMeta[index];
                const img = litigationImageMap[service.id] || cardImages.litigation.divorceFamilyLaw;

                return (
                  <div key={service.id} className="h-full">
                    <InteractiveImageCard
                      imageSrc={img.src}
                      imageAlt={img.alt}
                      title={service.title}
                      description={service.description}
                      ctaLabel={service.ctaLabel}
                      href={service.ctaHref}
                      icon={meta.icon}
                      iconBg={meta.tileBg}
                      topAccent={meta.topAccent}
                      surfaceBg="#F7F5F0"
                      minHeightClass="min-h-[410px] sm:min-h-[440px]"
                      className="border border-brand-border/80"
                    />
                  </div>
                );
              })}
            </AnimatedContent>

            {/* Practice Consultation Banner */}
            <AnimatedContent distance={16} duration={0.5} delay={0.1} threshold={0.15}>
              <div className="mt-14 p-7 sm:p-9 rounded-xl bg-surface-warm border border-brand-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-primary font-normal">
                    Have an active dispute or quantitative matter requiring analysis?
                  </h4>
                  <p className="mt-1.5 text-sm text-brand-slate">
                    Initial conflict clearances and case evaluations are conducted under strict confidentiality prior to engagement.
                  </p>
                </div>
                <a
                  href="/#contact"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm transition-all text-center justify-center"
                >
                  <span>Initiate Confidential Discussion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>
  );
};

export default LitigationServicesPage;
