import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ServiceDeliverablesProps {
  badge?: string;
  title: string;
  subtitle?: string;
  deliverables: DeliverableItem[];
}

export const ServiceDeliverables: React.FC<ServiceDeliverablesProps> = ({
  badge,
  title,
  subtitle,
  deliverables,
}) => {
  return (
    <section className="py-14 lg:py-20 bg-surface-warm border-b border-brand-border/60">
      <div className="site-container">
        {/* Section Heading */}
        <AnimatedContent distance={14} duration={0.5}>
          <div className="max-w-2xl mb-10 lg:mb-14">
            <SectionHeading
              badge={badge}
              title={title}
              subtitle={subtitle}
            />
          </div>
        </AnimatedContent>

        {/* 2-Column Editorial Grid (No Boxed Cards) */}
        <AnimatedContent distance={16} duration={0.5} delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10">
            {deliverables.map((item, idx) => (
              <div
                key={item.id}
                className="border-t border-brand-border/70 pt-5 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-brand-taupe tracking-wider">
                    0{idx + 1}
                  </span>
                  <span className="w-5 h-px bg-brand-border/80" />
                </div>

                <h3 className="font-serif text-xl sm:text-[22px] text-primary font-normal tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-brand-slate leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
