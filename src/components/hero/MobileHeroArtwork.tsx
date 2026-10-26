import React from 'react';

/**
 * MobileHeroArtwork
 * 
 * Specially composed for mobile viewports (< 1024px):
 * - Positions Lady Justice with a balanced, controlled rightward offset (left-[15%] xs:left-[17%] sm:left-[19%]),
 *   harmonizing her presence with the background geometry and eliminating awkward empty space.
 * - Horizontally mirrors the statue (scaleX(-1)) so her body posture and raised scales of justice
 *   naturally dialogue with the neoclassical courthouse architecture.
 * - Neoclassical courthouse architecture rendered with high clarity and solid opacity (opacity-95),
 *   restoring crisp column fluting, capitals, and pediment details without washed-out fading.
 * - Uncropped: scales of justice, blindfold, face, and sword remain fully visible.
 * - Restrained vertical footprint (h-[200px] xs:h-[220px] sm:h-[245px]) preserving headline hierarchy.
 * - Refined circular architectural aura frames the artwork against the warm ivory background.
 */
export const MobileHeroArtwork: React.FC = () => {
  return (
    <div
      className="mobile-hero-artwork relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[410px] h-[200px] xs:h-[220px] sm:h-[245px] mx-auto pointer-events-none select-none overflow-visible will-change-[transform,opacity]"
      aria-hidden="true"
    >
      {/* ── Background Geometry Aura: Fine architectural ring & soft radial glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[170px] h-[170px] xs:w-[195px] xs:h-[195px] sm:w-[215px] sm:h-[215px] rounded-full border border-primary/[0.12] bg-gradient-to-b from-primary/[0.03] to-transparent shadow-[0_0_30px_rgba(0,70,67,0.04)]" />
        <div className="absolute w-[210px] h-[210px] xs:w-[235px] xs:h-[235px] sm:w-[255px] sm:h-[255px] rounded-full border border-primary/[0.05]" />
      </div>

      {/* ── Layer 1: Courthouse Architecture (Restored solid opacity & crisp neoclassical clarity) ── */}
      <div className="absolute right-[2%] xs:right-[3%] sm:right-[5%] bottom-0 w-[47%] xs:w-[46%] max-w-[170px] xs:max-w-[185px] aspect-[819/1024] opacity-95 z-[5]">
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

      {/* ── Layer 2: Bronze Lady Justice Statue (Repositioned rightward for balanced composition) ── */}
      <div className="absolute left-[15%] xs:left-[17%] sm:left-[19%] bottom-0 z-10 w-[52%] xs:w-[50%] max-w-[190px] xs:max-w-[205px] aspect-[819/1024] mb-0.5">
        <img
          src="/images/lady-justice.png"
          alt="Bronze Lady Justice statue representing empirical evidence and integrity"
          width={819}
          height={1024}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-bottom -scale-x-100 [transform:scaleX(-1)] drop-shadow-[0_10px_22px_rgba(0,0,0,0.16)]"
        />
      </div>

      {/* ── Subtle bottom blend into surface-warm ── */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-surface-warm to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default MobileHeroArtwork;
