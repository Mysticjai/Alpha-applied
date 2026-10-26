import React from 'react';

interface HeroGeometryProps {
  parallaxOffset?: number;
}

export const HeroGeometry: React.FC<HeroGeometryProps> = ({ parallaxOffset = 0 }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{
        transform: `translateY(${parallaxOffset}px)`,
      }}
      aria-hidden="true"
    >
      {/* 1. High-fidelity raster shapes layer (rich marble texture, ivory arches, top disc) */}
      <div className="absolute right-[-8%] sm:right-[-4%] lg:right-[-2%] top-[-2%] w-[130%] sm:w-[115%] lg:w-[105%] max-w-[1500px] h-[110%] flex justify-end items-start pointer-events-none opacity-90 sm:opacity-95 lg:opacity-100">
        <img
          src="/images/hero-shapes.png"
          alt=""
          role="presentation"
          width={1024}
          height={576}
          className="w-full h-auto object-contain object-right-top"
          loading="eager"
        />
      </div>

      {/* 2. Vector SVG enhancements for crisp brand geometry & contours at any resolution */}
      <svg
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-75 sm:opacity-85"
        preserveAspectRatio="xMaxYMid meet"
      >
        <defs>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004643" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#003533" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E6E0D3" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Large sweeping outer warm ring framing the composition */}
        <ellipse
          cx="860"
          cy="420"
          rx="460"
          ry="380"
          stroke="#A79277"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Intermediate contour arc */}
        <path
          d="M 520,780 C 460,540 600,260 840,160"
          stroke="#A79277"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
          strokeDasharray="4 6"
        />

        {/* Deep Cyprus Teal dynamic crescent curve reinforcing the visual identity */}
        <path
          d="M 640,320 C 560,420 580,590 750,710 C 820,760 920,780 1000,740"
          stroke="url(#tealGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeOpacity="0.25"
          fill="none"
        />

        {/* Fine gold/taupe accent line on the sweeping ribbon */}
        <path
          d="M 645,315 C 568,415 588,585 755,705 C 825,755 925,775 1000,735"
          stroke="#C5A059"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Concentric disc ring accent in top right */}
        <circle
          cx="960"
          cy="90"
          r="140"
          stroke="#A79277"
          strokeWidth="1"
          strokeOpacity="0.45"
          fill="none"
        />
        <circle
          cx="960"
          cy="90"
          r="110"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
};
