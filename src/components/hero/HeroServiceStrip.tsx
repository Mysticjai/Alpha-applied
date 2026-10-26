import React from 'react';
import { Scales, Stack, Cpu } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';

export const HeroServiceStrip: React.FC = () => {
  const { services } = siteContent.hero;

  const icons = [
    <Cpu key="cpu" weight="bold" className="w-4 h-4 text-primary shrink-0 group-hover:text-accent group-hover:scale-105 transition-all" />,
    <Stack key="layers" weight="bold" className="w-4 h-4 text-primary shrink-0 group-hover:text-accent group-hover:scale-105 transition-all" />,
    <Scales key="scale" weight="bold" className="w-4 h-4 text-primary shrink-0 group-hover:text-accent group-hover:scale-105 transition-all" />,
  ];

  return (
    <div className="mt-5 lg:mt-6 pt-3.5 lg:pt-4 border-t border-brand-border/70 w-full max-w-xl">
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-4 items-center">
        {services.map((service, idx) => (
          <a
            key={service.label}
            href={service.href}
            className={`service-shortcut-item group flex items-center gap-2.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm py-1 xs:py-0 ${
              idx > 0 ? 'xs:border-l xs:border-brand-taupe/35 xs:pl-3 sm:pl-4' : ''
            }`}
          >
            {icons[idx]}
            <div className="flex flex-col leading-tight justify-center">
              <span className="text-[12px] sm:text-[13px] font-semibold text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                {service.label}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-brand-slate whitespace-nowrap">
                {service.sublabel}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
