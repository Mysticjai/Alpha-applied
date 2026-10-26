import React from 'react';
import { Scales, Stack, Cpu } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { AnimatedContent } from '../ui/AnimatedContent';
import { InteractiveImageCard } from '../ui/InteractiveImageCard';
import { cardImages } from '../../data/cardImages';

export const ExpertiseStrip: React.FC = () => {
  const { serviceSummaryStrip } = siteContent;

  // Explicit pillar configuration for all three Core Practice Pillars:
  // 01 — AI Consulting & Implementation: Cyprus green #004643 with white Cpu icon
  // 02 — Litigation Services: Cyprus green #004643 with white Scales icon
  // 03 — Alpha Lens Platform: Muted taupe #A79277 with white Stack icon
  const pillarConfigs: Record<string, { bg: string; icon: React.ReactNode }> = {
    'ai-consulting': {
      bg: '#004643',
      icon: <Cpu weight="bold" className="w-[22px] h-[22px] text-white" />,
    },
    'litigation-services': {
      bg: '#004643',
      icon: <Scales weight="bold" className="w-[22px] h-[22px] text-white" />,
    },
    'alpha-lens-platform': {
      bg: '#A79277',
      icon: <Stack weight="bold" className="w-[22px] h-[22px] text-white" />,
    },
  };

  const pillarImageMap: Record<string, { src: string; alt: string; category: string }> = {
    'ai-consulting': cardImages.pillars.aiConsulting,
    'litigation-services': cardImages.pillars.litigationServices,
    'alpha-lens-platform': cardImages.pillars.alphaLensPlatform,
  };

  return (
    <section
      id="pillars"
      aria-label="Core Practice Pillars"
      className="bg-white border-b border-brand-border/60 py-16 sm:py-20 lg:py-24 relative z-20 scroll-mt-20"
    >
      <div className="site-container">
        {/* Section Heading — Eyebrow removed with natural top spacing */}
        <AnimatedContent distance={20} duration={0.65} threshold={0.2}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-primary font-normal tracking-tight leading-[1.12]">
              {serviceSummaryStrip.title}
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-brand-slate leading-relaxed max-w-xl mx-auto">
              {serviceSummaryStrip.subtitle}
            </p>
          </div>
        </AnimatedContent>

        {/* Prominent 3-Column Interactive Image Cards Grid */}
        <AnimatedContent distance={24} duration={0.65} stagger={0.09} threshold={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceSummaryStrip.items.map((item) => {
            const imgMeta = pillarImageMap[item.id] || cardImages.pillars.aiConsulting;
            const config = pillarConfigs[item.id];

            return (
              <div key={item.id} className="h-full">
                <InteractiveImageCard
                  imageSrc={imgMeta.src}
                  imageAlt={imgMeta.alt}
                  title={item.title}
                  description={item.description}
                  ctaLabel={item.ctaLabel}
                  href={item.href}
                  icon={config?.icon}
                  iconBg={config?.bg}
                  topAccent={config?.bg}
                  surfaceBg="#F8F7F4"
                  minHeightClass="min-h-[410px] sm:min-h-[440px]"
                  className="border border-brand-border/80"
                />
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
};

export default ExpertiseStrip;
