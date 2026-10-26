import React from 'react';
import { ArrowRight, Lightbulb, MagnifyingGlassPlus, Compass } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export const AIConsultingSection: React.FC = () => {
  const { aiConsulting } = siteContent;

  const blockIcons = [
    <Lightbulb key="opp" className="w-6 h-6 text-primary" />,
    <MagnifyingGlassPlus key="eval" className="w-6 h-6 text-primary" />,
    <Compass key="plan" className="w-6 h-6 text-primary" />,
  ];

  return (
    <section
      id="ai-consulting"
      className="section-padding bg-surface-warm border-b border-brand-border/60 relative scroll-mt-20"
    >
      <div className="site-container">
        {/* Section Heading */}
        <AnimatedContent distance={20} duration={0.6} threshold={0.2}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-brand-border/60">
            <SectionHeading
              badge={aiConsulting.badge}
              title={aiConsulting.title}
              subtitle={aiConsulting.subtitle}
            />
            <div className="shrink-0">
              <a
                href={aiConsulting.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white text-[14px] font-semibold rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{aiConsulting.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* 3 Content Blocks Grid */}
        <AnimatedContent distance={24} stagger={0.1} threshold={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {aiConsulting.blocks.map((block, idx) => (
            <div key={block.id} className="h-full">
              <div
                className="card-premium h-full p-8 rounded-xl bg-white border border-brand-border/80 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-surface-warm flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {blockIcons[idx]}
                    </div>
                    <span className="text-xs font-mono font-semibold tracking-widest text-brand-taupe">
                      STAGE {block.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-primary font-normal tracking-tight group-hover:text-primary-dark transition-colors">
                    {block.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-[15px] text-brand-slate leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-border/50 flex items-center gap-2 text-xs font-mono font-medium text-brand-taupe">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  <span>Advisory Stage {block.step}</span>
                </div>
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
};
