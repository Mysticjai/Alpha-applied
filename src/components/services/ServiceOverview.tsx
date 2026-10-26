import React from 'react';
import { AnimatedContent } from '../ui/AnimatedContent';

interface ServiceOverviewProps {
  heading: string;
  paragraphs: string[];
  capabilities: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  heading,
  paragraphs,
  capabilities,
}) => {
  return (
    <section className="py-14 lg:py-20 bg-white border-b border-brand-border/60">
      <div className="site-container">
        {/* Main Editorial Text Block */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <AnimatedContent distance={16} duration={0.5}>
            <div className="text-xs font-mono font-semibold tracking-wider text-brand-taupe uppercase mb-3">
              Overview
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight leading-snug mb-6">
              {heading}
            </h2>
            <div className="space-y-5 text-base sm:text-[17px] text-brand-slate leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </AnimatedContent>
        </div>

        {/* Analytical Capabilities: Open 3-Column Editorial Layout (No Boxed Cards) */}
        {capabilities && capabilities.length > 0 && (
          <div className="pt-10 lg:pt-12 border-t border-brand-border/60">
            <AnimatedContent distance={16} duration={0.5} delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {capabilities.map((cap, idx) => (
                  <div key={cap.title} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-brand-taupe tracking-wider">
                        0{idx + 1}
                      </span>
                      <span className="w-6 h-px bg-brand-border/80" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-primary tracking-tight mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>
        )}
      </div>
    </section>
  );
};
