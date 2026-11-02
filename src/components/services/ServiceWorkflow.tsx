import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export interface WorkflowStage {
  step: string;
  title: string;
  description: string;
}

interface ServiceWorkflowProps {
  badge?: string;
  title: string;
  subtitle?: string;
  stages: WorkflowStage[];
}

export const ServiceWorkflow: React.FC<ServiceWorkflowProps> = ({
  badge,
  title,
  subtitle,
  stages,
}) => {
  return (
    <section className="py-14 lg:py-20 bg-white border-b border-brand-border/60">
      <div className="site-container">
        <AnimatedContent distance={14} duration={0.5}>
          <div className="max-w-2xl mb-10 lg:mb-14">
            <SectionHeading
              badge={badge}
              title={title}
              subtitle={subtitle}
            />
          </div>
        </AnimatedContent>

        {/* Simple Numbered Sequence with Thin Top Dividers (No Boxed Cards) */}
        <AnimatedContent distance={16} duration={0.5} delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {stages.map((stage) => (
              <div
                key={stage.step}
                className="border-t border-brand-border/70 pt-5 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-brand-taupe tracking-wider">
                    {stage.step}
                  </span>
                  <span className="w-5 h-px bg-brand-border/80" />
                </div>

                <h3 className="font-serif text-lg font-normal text-primary tracking-tight mb-2">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
