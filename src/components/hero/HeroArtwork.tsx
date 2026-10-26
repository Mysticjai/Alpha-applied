import React from 'react';

/**
 * HeroArtwork renders the 2 distinct foreground visual layers for desktop:
 * Layer 1 (now at HeroSection root): Full-width Background Geometry & Arches (.disintegrate-art-geometry)
 * Layer 2: Courthouse Architecture (.disintegrate-art-architecture)
 * Layer 3: Lady Justice Statue (.disintegrate-art-statue)
 *
 * Each layer is animated on entrance via coordinated CSS/GSAP keyframes and
 * deconstructs along distinct depth axes during the scroll-linked scrub.
 */
export const HeroArtwork: React.FC = () => {
  return (
    <div
      className="relative w-full h-[460px] sm:h-[580px] lg:h-full flex items-end justify-end pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* ── LAYER 2: Courthouse Architecture ── */}
      {/* Positioned on the right and lower-right, pediment visible at upper-right */}
      <div
        className="disintegrate-art-architecture absolute right-[-2%] sm:right-[0%] bottom-0 w-[50%] xs:w-[46%] sm:w-[45%] lg:w-[48%] xl:w-[50%] max-w-[560px] aspect-[819/1024] z-20 will-change-transform"
      >
        <img
          src="/images/hero-architecture.png"
          alt=""
          role="presentation"
          width={819}
          height={1024}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* ── LAYER 3: Lady Justice Statue ── */}
      {/* Positioned slightly right of centre within the artwork composition, naturally overlapping courthouse columns with clear text clearance */}
      <div
        className="disintegrate-art-statue absolute left-[8%] xs:left-[11%] sm:left-[13%] lg:left-[4%] xl:left-[6.5%] 2xl:left-[9.5%] bottom-0 w-[56%] xs:w-[52%] sm:w-[48%] lg:w-[54%] xl:w-[56%] max-w-[580px] aspect-[819/1024] z-30 will-change-transform"
      >
        <img
          src="/images/lady-justice.png"
          alt="Bronze Lady Justice statue representing empirical evidence and integrity"
          width={819}
          height={1024}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Subtle bottom line blend without washing out architectural pedestal */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-surface-warm/80 to-transparent z-40 pointer-events-none" />
    </div>
  );
};
