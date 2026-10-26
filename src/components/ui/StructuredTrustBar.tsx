import React from 'react';
import { ShieldCheck, Globe, UserCheck, SealCheck } from '@phosphor-icons/react';
import { AnimatedContent } from './AnimatedContent';

interface PillarItem {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const StructuredTrustBar: React.FC = () => {
  const pillars: PillarItem[] = [
    {
      label: 'NDA-Protected Analysis',
      sublabel: 'Strict confidentiality protocols',
      icon: <ShieldCheck className="w-4 h-4 text-primary shrink-0" />,
    },
    {
      label: 'Serving Attorneys Worldwide',
      sublabel: 'Complex litigation matters',
      icon: <Globe className="w-4 h-4 text-primary shrink-0" />,
    },
    {
      label: 'Dedicated Point of Contact',
      sublabel: 'Direct senior analytics access',
      icon: <UserCheck className="w-4 h-4 text-primary shrink-0" />,
    },
    {
      label: 'Personal QC on Every Deliverable',
      sublabel: 'Multi-tiered partner review',
      icon: <SealCheck className="w-4 h-4 text-primary shrink-0" />,
    },
  ];

  return (
    <AnimatedContent
      distance={16}
      stagger={0.06}
      threshold={0.15}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 py-2"
    >
      {pillars.map((item, idx) => (
        <div key={idx} className="h-full">
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-surface-warm/40 border border-brand-border/60 shadow-xs hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all h-full group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                className: 'w-4 h-4 text-primary group-hover:text-white transition-colors',
              })}
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] sm:text-[13px] font-semibold text-primary tracking-tight leading-snug">
                {item.label}
              </div>
              <div className="text-[11px] text-brand-slate/80 leading-tight mt-0.5 font-medium truncate">
                {item.sublabel}
              </div>
            </div>
          </div>
        </div>
      ))}
    </AnimatedContent>
  );
};

export default StructuredTrustBar;
