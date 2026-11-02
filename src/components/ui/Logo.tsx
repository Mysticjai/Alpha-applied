import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'default';
  showTagline?: boolean;
  onClick?: () => void;
  isTransparent?: boolean;
  currentPath?: string;
}

/**
 * Official Client Symbol Mark for Alpha Applied Analytics Solutions
 * Exact vector paths preserving original proportions and colors:
 * - Blue outer chevron (#005ab4)
 * - Deep navy inner base (#003d8c)
 * - Alpha crimson right diagonal (#ed0b1e)
 */
export const OfficialLogoSymbol: React.FC<{ className?: string }> = ({
  className = 'h-8 sm:h-9 xl:h-[38px] 2xl:h-[42px] w-auto',
}) => {
  return (
    <svg
      viewBox="30 32 120 137"
      fill="none"
      fillRule="nonzero"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Alpha Applied Analytics Solutions Symbol"
    >
      <path
        d="M54.18003,168.79853c-1.32744,0.07179 -2.84253,0.00879 -4.19092,0.03516c-4.23149,0.08205 -7.27749,0.02784 -11.1189,-2.21832c-3.71616,-2.19634 -6.4166,-5.76996 -7.51567,-9.94579c-1.8958,-7.26593 1.36743,-11.87795 4.79561,-17.80586l7.39146,-12.83194l31.24043,-53.90388c2.07422,3.75121 4.18242,8.15941 6.14194,12.03033l10.44727,20.68586c-2.94785,4.67165 -6.08979,10.41304 -8.89878,15.25421c-3.55869,6.00967 -7.07549,12.0441 -10.55039,18.10286c10.92319,0.21817 22.49414,0.02755 33.48135,0.02828l1.47495,0.00835l10.84336,20.51385c1.5709,2.99048 3.84741,7.05201 5.2314,10.04396z"
        fill="#005ab4"
      />
      <path
        d="M105.40342,138.22945l1.47495,0.00835l10.84336,20.51385c1.5709,2.99048 3.84741,7.05201 5.2314,10.04396l-68.7731,0.00293c0.30249,-1.0022 4.27998,-7.62637 5.02427,-8.90256l12.61025,-21.55956c7.67402,0.08147 15.43198,-0.03516 23.11567,0.00293c1.90591,0.00938 9.09741,0.15267 10.47319,-0.10989z"
        fill="#003d8c"
      />
      <path
        d="M92.63789,32.19487c0.57422,0.70652 3.6252,6.42432 4.32056,7.6967c3.68115,6.71868 7.31294,13.46432 10.89507,20.23634c5.27344,9.75165 10.45181,19.55443 15.53437,29.40689c7.56035,14.7156 14.70498,29.69978 22.26899,44.42066c1.19663,2.32938 2.38169,4.737 3.49204,7.10769l-17.09326,0.01099l-16.33682,0.00352l-22.927,-45.35839c-3.93105,-7.90051 -7.95132,-15.75648 -12.06006,-23.56615c-1.72983,-3.30154 -3.50977,-6.8356 -5.32822,-10.07458c5.82144,-9.91678 11.56626,-19.87824 17.23433,-29.88366z"
        fill="#ed0b1e"
      />
    </svg>
  );
};

/**
 * Company Name Wordmark (Two-Line Lockup)
 * Line 1: ALPHA (deep navy #003d8c) APPLIED (Alpha crimson #C62835)
 * Line 2: ANALYTICS SOLUTIONS (deep navy #003d8c)
 */
export const CompanyWordmark: React.FC<{
  className?: string;
  navyColor?: string;
  crimsonColor?: string;
}> = ({
  className = '',
  navyColor = '#003d8c',
  crimsonColor = '#C62835',
}) => {
  return (
    <div
      className={`flex flex-col justify-center select-none font-sans leading-[1.12] ${className}`}
    >
      <div className="text-[11px] sm:text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] font-extrabold uppercase tracking-[0.04em] whitespace-nowrap">
        <span style={{ color: navyColor }}>ALPHA</span>{' '}
        <span style={{ color: crimsonColor }}>APPLIED</span>
      </div>
      <div
        className="text-[9px] sm:text-[10px] xl:text-[10.5px] 2xl:text-[11.5px] font-extrabold uppercase tracking-[0.04em] whitespace-nowrap mt-[1.5px]"
        style={{ color: navyColor }}
      >
        <span style={{ color: navyColor }}>ANALYTICS SOLUTIONS</span>
      </div>
    </div>
  );
};

/**
 * Main Logo component with full horizontal brand lockup:
 * [Official Symbol] + [Two-Line Wordmark]
 * Wrapped in an accessible home link navigating to /#home
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'default',
  onClick,
  isTransparent = false,
  currentPath,
}) => {
  const isLight = variant === 'light';
  const wordmarkNavy = isTransparent ? '#FFFFFF' : '#003d8c';

  const rawPath = (currentPath || (typeof window !== 'undefined' ? (window.location.pathname + window.location.hash) : '')).toLowerCase();
  const isInternal = rawPath && !rawPath.endsWith('/') && !rawPath.includes('index.html') && (
    rawPath.includes('aiconsulting') ||
    rawPath.includes('litigationservices') ||
    rawPath.includes('alphalens') ||
    rawPath.includes('divorcefamilylaw') ||
    rawPath.includes('economicdamages') ||
    rawPath.includes('documentanalysis') ||
    rawPath.includes('bankruptcyrestructuring') ||
    rawPath.includes('intellectualproperty') ||
    rawPath.includes('litigationsupport') ||
    rawPath.includes('terms-of-service') ||
    rawPath.includes('privacy-policy')
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (isLight) {
    return (
      <a
        href="/#home"
        data-direction={isInternal ? 'backward' : undefined}
        data-fresh-nav="true"
        aria-label="Alpha Applied Analytics Solutions, Home"
        onClick={handleClick}
        className={`inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-warm focus-visible:ring-offset-2 focus-visible:ring-offset-[#00201E] rounded-lg transition-transform active:scale-[0.98] ${className}`}
      >
        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 rounded-lg bg-[#F0EDE5] shadow-xs group-hover:bg-white transition-colors duration-200">
          <OfficialLogoSymbol className="h-7 sm:h-8 xl:h-9 w-auto shrink-0" />
          <CompanyWordmark />
        </div>
      </a>
    );
  }

  return (
    <a
      href="/#home"
      data-direction={isInternal ? 'backward' : undefined}
      data-fresh-nav="true"
      aria-label="Alpha Applied Analytics Solutions, Home"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 sm:gap-2.5 xl:gap-3 group focus:outline-none focus-visible:ring-2 ${
        isTransparent ? 'focus-visible:ring-white' : 'focus-visible:ring-primary'
      } focus-visible:ring-offset-2 rounded-sm transition-opacity hover:opacity-95 active:scale-[0.99] shrink-0 ${className}`}
    >
      <OfficialLogoSymbol className="h-8 sm:h-9 xl:h-[38px] 2xl:h-[42px] w-auto shrink-0" />
      <CompanyWordmark navyColor={wordmarkNavy} />
    </a>
  );
};

export default Logo;
