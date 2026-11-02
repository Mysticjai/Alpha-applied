import React from 'react';
import { siteContent } from '../../content/siteContent';

interface LinearTrustMarqueeProps {
  speed?: number; // duration in seconds
  className?: string;
}

export const LinearTrustMarquee: React.FC<LinearTrustMarqueeProps> = ({
  speed = 34,
  className = '',
}) => {
  const { trustStrip } = siteContent;

  // We repeat the 4 trust statements 3 times per track (12 items per track)
  // Track A and Track B are 100% identical in layout and width for a mathematically seamless infinite loop
  const trackItems = [...trustStrip, ...trustStrip, ...trustStrip];

  return (
    <div
      role="region"
      aria-label="Trust statements marquee"
      className={`w-full overflow-hidden relative border-b border-brand-border/60 bg-white py-5 sm:py-[22px] lg:py-[23px] select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
      }}
    >
      <div
        className="flex w-max will-change-transform animate-linear-marquee"
        style={{
          ['--marquee-duration' as string]: `${speed}s`,
          animationDuration: `${speed}s`,
        }}
      >
        {/* Track A */}
        <div className="flex items-center shrink-0">
          {trackItems.map((item, idx) => (
            <div key={`track-a-${idx}`} className="inline-flex items-center shrink-0 whitespace-nowrap">
              <span className="text-[14.75px] sm:text-[16px] font-semibold tracking-wider text-[#004643] uppercase font-heading px-[18px] sm:px-[28px]">
                {item.label}
              </span>
              <span className="text-[#C62835] text-[13.5px] sm:text-[15px] font-serif px-[10px] sm:px-[14px] select-none" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Track B (exact duplicate for seamless loop with zero gap or jump) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {trackItems.map((item, idx) => (
            <div key={`track-b-${idx}`} className="inline-flex items-center shrink-0 whitespace-nowrap">
              <span className="text-[14.75px] sm:text-[16px] font-semibold tracking-wider text-[#004643] uppercase font-heading px-[18px] sm:px-[28px]">
                {item.label}
              </span>
              <span className="text-[#C62835] text-[13.5px] sm:text-[15px] font-serif px-[10px] sm:px-[14px] select-none" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinearTrustMarquee;
