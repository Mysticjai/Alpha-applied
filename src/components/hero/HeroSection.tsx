import React, { useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { HeroArtwork } from './HeroArtwork';
import { MobileHeroArtwork } from './MobileHeroArtwork';
import { HeroGeometry } from './HeroGeometry';
import { HeroServiceStrip } from './HeroServiceStrip';
import { useHeroScrollExit } from '../../hooks/useHeroScrollExit';

export const HeroSection: React.FC = () => {
  const { hero } = siteContent;

  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Accenture-inspired masked entrance assembly and scroll-linked disintegration exit
  useHeroScrollExit({
    triggerRef: heroRef,
    headlineRef,
    bodyRef,
    ctaRef,
    extraRef: stripRef,
    visualRef,
    enabled: true,
  });

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Alpha Applied Analytics Solutions Hero"
      className="relative bg-surface-warm overflow-hidden border-b border-brand-border/40 lg:h-[calc(100vh-80px)] lg:min-h-[660px] lg:max-h-[820px] flex flex-col justify-start w-full group"
    >
      {/* ── RESTORED FULL-WIDTH HERO BACKGROUND GEOMETRY ── */}
      {/* Positioned at section level to span 100% width across all breakpoints, sitting behind both hero text (z-20) and artwork (z-10/z-20) */}
      <div className="disintegrate-art-geometry absolute inset-0 z-[5] pointer-events-none select-none overflow-hidden will-change-transform">
        <HeroGeometry />
      </div>

      {/* Architectural subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none select-none z-[6]" aria-hidden="true">
        <div className="absolute left-[4%] top-0 bottom-0 w-px bg-primary/[0.03]" />
        <div className="absolute left-[42%] top-0 bottom-0 w-px bg-primary/[0.03] hidden lg:block" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-primary/[0.025]" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-primary/[0.025]" />
      </div>

      {/* ── MAIN CONTENT CONTAINER (Editorial Split) ── */}
      <div className="site-container relative z-20 w-full pt-4 xs:pt-5 sm:pt-6 lg:pt-8 xl:pt-9 pb-8 sm:pb-10 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

          {/* Left Column (Editorial Content, 48–50% width on desktop) */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-start max-w-xl lg:max-w-2xl">

            {/* ── MOBILE LADY JUSTICE VISUAL (Mobile only: < lg) ── */}
            {/* Visual Order: 1. Header -> 2. Lady Justice -> 3. Heading -> 4. Copy -> 5. CTA -> 6. Shortcuts */}
            <div className="lg:hidden w-full flex justify-center items-center mb-3 sm:mb-4 pointer-events-none select-none">
              <MobileHeroArtwork />
            </div>

            {/* 1. Main Headline (H1) with Semantic Accessibility, Masked Line Reveal & Disintegration Wrappers */}
            <div ref={headlineRef} className="anim-hero-headline select-text">
              <h1 className="font-serif text-[2.15rem] xs:text-[2.4rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.65rem] 2xl:text-[3.85rem] text-primary leading-[1.06] tracking-[-0.015em] font-normal">
                {/* Single unified string for screen readers */}
                <span className="sr-only">Advancing Business Through Artificial Intelligence.</span>

                {/* Visual Typography: Masked Line Reveal with Disintegrating Word Segments */}
                <span aria-hidden="true" className="flex flex-col">
                  {/* Line 1: Advancing Business (Enters from left -36px, blur 4px) */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5">
                    <span className="hero-line-inner hero-line-1 block will-change-[transform,opacity,filter]">
                      <span className="flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible text-primary">
                        <span className="disintegrate-word disintegrate-word-1 inline-block will-change-[transform,opacity,filter]">
                          Advancing
                        </span>
                        <span className="disintegrate-word disintegrate-word-2 inline-block will-change-[transform,opacity,filter]">
                          Business
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* Line 2: Through (Gentle upward reveal +18px, subtle blur) */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5 mt-0.5 sm:mt-1">
                    <span className="hero-line-inner hero-line-2 block will-change-[transform,opacity,filter]">
                      <span className="flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible text-primary">
                        <span className="disintegrate-word disintegrate-word-3 inline-block will-change-[transform,opacity,filter]">
                          Through
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* Line 3: Artificial Intelligence. (Enters from right +36px, blur 4px) */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5 mt-0.5 sm:mt-1">
                    <span className="hero-line-inner hero-line-3 text-brand-taupe block will-change-[transform,opacity,filter]">
                      <span className="text-brand-taupe flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible">
                        <span className="disintegrate-word disintegrate-word-4 inline-block will-change-[transform,opacity,filter]">
                          Artificial
                        </span>
                        <span className="disintegrate-word disintegrate-word-5 inline-block will-change-[transform,opacity,filter]">
                          Intelligence.
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* 2. Supporting Editorial Copy (Line-by-Line Reveal) */}
            <div ref={bodyRef} className="mt-3 sm:mt-3.5 space-y-2 sm:space-y-2.5 max-w-xl">
              <div className="disintegrate-p1 will-change-[transform,opacity,filter]">
                <p className="p1-inner text-[14px] xs:text-[14.5px] sm:text-[15.5px] text-brand-slate leading-relaxed font-normal">
                  {hero.supportingParagraph1}
                </p>
              </div>
              <div className="disintegrate-p2 will-change-[transform,opacity,filter]">
                <p className="p2-inner text-[13.5px] xs:text-[14px] sm:text-[14.5px] text-brand-slate/85 leading-relaxed font-normal">
                  {hero.supportingParagraph2}
                </p>
              </div>
            </div>

            {/* 3. Primary Consultation CTA */}
            <div
              ref={ctaRef}
              className="disintegrate-cta mt-4 sm:mt-5 will-change-[transform,opacity]"
            >
              <div className="cta-inner inline-flex will-change-transform">
                <a
                  href={hero.primaryCta.href}
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 px-6 sm:px-6 h-[46px] sm:h-[48px] bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px text-center"
                >
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 4. Three-Item Service Strip (Fully visible in initial viewport) */}
            <div ref={stripRef} className="disintegrate-strip will-change-[transform,opacity]">
              <div className="strip-inner will-change-transform">
                <HeroServiceStrip />
              </div>
            </div>

          </div>

          {/* Right Column Spacer on large screens so desktop layout flows naturally */}
          <div className="lg:col-span-5 xl:col-span-6 hidden lg:block" />

        </div>
      </div>

      {/* ── RIGHT ARTWORK COMPOSITION (Desktop: anchored to right-0 with 3 distinct depth layers) ── */}
      {/* Strictly rendered on desktop (lg:) preserving the existing 58vw-62vw composition and 3D depth */}
      <div
        ref={visualRef}
        className="hidden lg:flex lg:absolute lg:top-0 lg:bottom-0 lg:right-0 w-full lg:w-[58vw] xl:w-[60vw] 2xl:w-[62vw] items-end justify-end z-10 pointer-events-none mt-2 lg:mt-0 will-change-[transform,opacity]"
      >
        <HeroArtwork />
      </div>

      {/* Bottom border dividing rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-border/60 z-30" />
    </section>
  );
};

export default HeroSection;
