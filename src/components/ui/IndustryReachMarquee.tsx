import React from 'react';

export interface IndustryReachMarqueeProps {
  items: string[];
  speed?: number; // duration in seconds for one full loop
  className?: string;
}

/**
 * IndustryReachMarquee
 * 
 * Concluding full-width horizontal marquee for the "Who We Serve" section.
 * Spans the available section width, sitting directly beneath the two-column grid.
 * 
 * Design Targets:
 * - Desktop Height: ~64–76px (72px desktop, 66px tablet, 58px mobile)
 * - Desktop Text Size: ~15–17px (16.5px desktop, 15.5px tablet, 14px mobile)
 * - Horizontal Padding: ~24–36px between categories and separators
 * - Category Text: Deep teal (#004643), General Sans 600 weight
 * - Separators: Restrained crimson (#C62835) decorative ✦ glyphs
 * - Slow, continuous, right-to-left seamless loop (35–50s, default 42s)
 * - Pauses on hover on desktop
 * - Full accessibility: screen readers hear a single semantic list (duplicates aria-hidden)
 * - Accessible static fallback under prefers-reduced-motion
 */
export const IndustryReachMarquee: React.FC<IndustryReachMarqueeProps> = ({
  items,
  speed = 42,
  className = '',
}) => {
  // Repeat items 3 times per track so that even on ultra-wide viewports,
  // each track comfortably exceeds the container width for a seamless loop.
  const trackItems = [...items, ...items, ...items];

  return (
    <div
      role="region"
      aria-label="Representative Industry Reach"
      className={`relative w-full max-w-full overflow-hidden select-none group h-[58px] sm:h-[66px] lg:h-[72px] flex items-center ${className}`}
    >
      {/* Screen-reader accessible semantic list (announced only once) */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Static readable presentation for users with prefers-reduced-motion */}
      <div
        className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 w-full"
        aria-hidden="true"
      >
        {items.map((area, idx) => (
          <span
            key={area}
            className="inline-flex items-center text-[13.5px] sm:text-[15px] font-semibold text-[#004643] font-heading"
          >
            <span>{area}</span>
            {idx < items.length - 1 && (
              <span className="text-[#C62835] text-[11px] sm:text-[12px] pl-6 select-none" aria-hidden="true">
                ✦
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Continuous scrolling marquee for users without reduced motion */}
      <div
        className="motion-reduce:hidden relative w-full h-full flex items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="flex w-max will-change-transform animate-linear-marquee group-hover:[animation-play-state:paused]"
          style={{
            ['--marquee-duration' as string]: `${speed}s`,
            animationDuration: `${speed}s`,
          }}
        >
          {/* Track A */}
          <div className="flex items-center shrink-0">
            {trackItems.map((area, idx) => (
              <div key={`track-a-${idx}`} className="inline-flex items-center shrink-0 whitespace-nowrap">
                <span className="text-[14px] sm:text-[15.5px] lg:text-[16.5px] font-semibold text-[#004643] font-heading tracking-tight hover:text-[#C62835] transition-colors duration-200">
                  {area}
                </span>
                <span
                  className="text-[#C62835] text-[11px] sm:text-[12px] lg:text-[13px] px-6 sm:px-7 lg:px-8 select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>
            ))}
          </div>

          {/* Track B (exact duplicate for continuous seamless loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {trackItems.map((area, idx) => (
              <div key={`track-b-${idx}`} className="inline-flex items-center shrink-0 whitespace-nowrap">
                <span className="text-[14px] sm:text-[15.5px] lg:text-[16.5px] font-semibold text-[#004643] font-heading tracking-tight hover:text-[#C62835] transition-colors duration-200">
                  {area}
                </span>
                <span
                  className="text-[#C62835] text-[11px] sm:text-[12px] lg:text-[13px] px-6 sm:px-7 lg:px-8 select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryReachMarquee;
