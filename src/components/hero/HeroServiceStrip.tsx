import React from 'react';
import { Scales, Stack, Cpu } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';

interface HeroServiceStripProps {
  variant?: 'light' | 'dark';
}

export const HeroServiceStrip: React.FC<HeroServiceStripProps> = ({ variant = 'dark' }) => {
  const { services } = siteContent.hero;
  const isDark = variant === 'dark';

  const icons = [
    <Cpu
      key="cpu"
      weight="bold"
      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all group-hover:text-accent group-hover:scale-105 hidden xs:inline-block ${
        isDark ? 'text-brand-taupe-light' : 'text-primary'
      }`}
    />,
    <Stack
      key="layers"
      weight="bold"
      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all group-hover:text-accent group-hover:scale-105 hidden xs:inline-block ${
        isDark ? 'text-brand-taupe-light' : 'text-primary'
      }`}
    />,
    <Scales
      key="scale"
      weight="bold"
      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all group-hover:text-accent group-hover:scale-105 hidden xs:inline-block ${
        isDark ? 'text-brand-taupe-light' : 'text-primary'
      }`}
    />,
  ];

  return (
    <div
      className={`mt-4 sm:mt-5.5 lg:mt-6 pt-3 sm:pt-4 border-t w-full max-w-[620px] ${
        isDark ? 'border-white/15' : 'border-brand-border/70'
      }`}
    >
      <div className="grid grid-cols-3 gap-1.5 xs:gap-3 sm:gap-4 items-center text-center xs:text-left">
        {services.map((service, idx) => (
          <a
            key={service.label}
            href={service.href}
            className={`service-shortcut-item group flex items-center justify-center xs:justify-start gap-1.5 xs:gap-2.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm py-0.5 ${
              idx > 0
                ? isDark
                  ? 'border-l border-white/15 pl-1.5 xs:pl-3 sm:pl-4'
                  : 'border-l border-brand-taupe/35 pl-1.5 xs:pl-3 sm:pl-4'
                : ''
            }`}
          >
            {icons[idx]}
            <div className="flex flex-col leading-tight justify-center">
              <span
                className={`font-heading text-[11px] xs:text-[12px] sm:text-[13px] font-semibold transition-colors whitespace-nowrap ${
                  isDark
                    ? 'text-white group-hover:text-accent'
                    : 'text-primary group-hover:text-accent'
                }`}
              >
                {service.label}
              </span>
              <span
                className={`font-heading text-[9.5px] xs:text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${
                  isDark ? 'text-white/70' : 'text-brand-slate'
                }`}
              >
                {service.sublabel}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
