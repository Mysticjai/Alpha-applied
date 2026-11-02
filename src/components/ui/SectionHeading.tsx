import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'default';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  variant = 'default',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isLight = variant === 'light';

  return (
    <div
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {badge && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] uppercase ${
              isLight ? 'text-surface-warm/80' : 'text-primary'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {badge}
          </span>
        </div>
      )}

      <h2
        className={`font-heading font-semibold text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.12] tracking-tight ${
          isLight ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-surface-warm/75' : 'text-brand-slate'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
