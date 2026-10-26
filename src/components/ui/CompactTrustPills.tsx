import React from 'react';
import { siteContent } from '../../content/siteContent';
import { AnimatedContent } from './AnimatedContent';

export const CompactTrustPills: React.FC = () => {
  const { trustStrip } = siteContent;

  return (
    <AnimatedContent distance={16} duration={0.6} threshold={0.15}>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 py-3 px-5 rounded-full bg-surface-warm/50 border border-brand-border/60 max-w-4xl mx-auto shadow-xs">
        {trustStrip.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[12px] sm:text-[13px] font-semibold text-primary tracking-tight">
              {item.label}
            </span>
            {idx < trustStrip.length - 1 && (
              <span className="hidden md:inline-block text-brand-taupe/60 text-xs ml-4">|</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedContent>
  );
};

export default CompactTrustPills;
