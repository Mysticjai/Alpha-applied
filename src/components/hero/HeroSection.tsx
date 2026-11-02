import React, { useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { HeroServiceStrip } from './HeroServiceStrip';
import { useHeroScrollExit } from '../../hooks/useHeroScrollExit';

export const HeroSection: React.FC = () => {
  const { hero } = siteContent;

  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Accenture-inspired masked entrance assembly and scroll-linked disintegration exit
  useHeroScrollExit({
    triggerRef: heroRef,
    headlineRef,
    bodyRef,
    ctaRef,
    extraRef: stripRef,
    enabled: true,
  });

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Alpha Applied Analytics Solutions Hero"
      className="relative bg-[#011619] overflow-hidden min-h-[660px] xs:min-h-[700px] sm:min-h-[740px] lg:h-screen lg:min-h-[680px] lg:max-h-[880px] flex flex-col justify-center w-full group"
    >
      {/* ── OPTION B: FULL-WIDTH LEGAL & AI CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/alpha-legal-tech-hero.png"
          alt="Alpha Applied Analytics Solutions legal intelligence and AI analytics environment"
          className="w-full h-full object-cover object-[76%_center] lg:object-[center_right] xl:object-right hero-subtle-drift will-change-transform"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* ── Subtle CSS Linear Gradient Overlays ── */}
        {/* Top subtle ambient scrim behind floating transparent navbar */}
        <div
          className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Desktop: Controlled left-side gradient from deep teal to transparent.
            Preserves negative space for text and service shortcuts, protects high contrast,
            while leaving the gavel, analytics monitor, books, and desk naturally illuminated. */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none w-[66%]"
          style={{
            background:
              'linear-gradient(to right, rgba(1,22,25,0.96) 0%, rgba(1,22,25,0.88) 28%, rgba(1,22,25,0.66) 46%, rgba(1,22,25,0.28) 58%, rgba(1,22,25,0) 68%)',
          }}
          aria-hidden="true"
        />

        {/* Mobile & Tablet: Subtle vertical gradient deeper at top where text sits,
            fading softly down so the gavel and desk remain radiant and unobscured. */}
        <div
          className="lg:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(1,22,25,0.96) 0%, rgba(1,22,25,0.82) 32%, rgba(1,22,25,0.52) 55%, rgba(1,22,25,0.16) 75%, rgba(1,22,25,0.04) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Seamless Atmospheric Bottom Fade into Following Marquee Section ── */}
        {/* Confined to the lower portion of the hero below the service shortcuts,
            melting smoothly into the clean white surface (#FFFFFF) of the following LinearTrustMarquee. */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.40) 80%, rgba(255,255,255,0.82) 93%, #FFFFFF 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── MAIN CONTENT CONTAINER (Layered Above Background in Dark Negative Space) ── */}
      <div className="site-container relative z-10 w-full pt-20 xs:pt-24 sm:pt-28 lg:pt-16 pb-12 xs:pb-14 sm:pb-16 lg:pb-0 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

          {/* Left Column (Editorial Content, 48–50% width on desktop, strictly in dark space) */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center max-w-xl lg:max-w-2xl">

            {/* 1. Main Headline (H1) with Semantic Accessibility, Masked Line Reveal & Disintegration Wrappers */}
            <div ref={headlineRef} className="anim-hero-headline select-text">
              <h1 className="font-heading text-[2.1rem] xs:text-[2.4rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.65rem] 2xl:text-[3.85rem] text-white leading-[1.12] tracking-[-0.015em] font-semibold">
                {/* Single unified string for screen readers */}
                <span className="sr-only">AI-Powered Legal and Business Solutions</span>

                {/* Visual Typography: Masked Line Reveal with Disintegrating Word Segments */}
                <span aria-hidden="true" className="flex flex-col">
                  {/* Line 1: AI-Powered */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5">
                    <span className="hero-line-inner hero-line-1 block will-change-[transform,opacity,filter]">
                      <span className="flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible text-white">
                        <span className="disintegrate-word disintegrate-word-1 inline-block will-change-[transform,opacity,filter]">
                          AI-Powered
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* Line 2: Legal and Business */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5 mt-0.5 sm:mt-1">
                    <span className="hero-line-inner hero-line-2 block will-change-[transform,opacity,filter]">
                      <span className="flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible text-white">
                        <span className="disintegrate-word disintegrate-word-2 inline-block will-change-[transform,opacity,filter]">
                          Legal
                        </span>
                        <span className="disintegrate-word disintegrate-word-3 inline-block will-change-[transform,opacity,filter]">
                          and
                        </span>
                        <span className="disintegrate-word disintegrate-word-4 inline-block will-change-[transform,opacity,filter]">
                          Business
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* Line 3: Solutions (Warm gold/taupe accent) */}
                  <span className="hero-line-wrap overflow-visible block py-0.5 -my-0.5 mt-0.5 sm:mt-1">
                    <span className="hero-line-inner hero-line-3 text-brand-taupe-light block will-change-[transform,opacity,filter]">
                      <span className="text-[#C5A880] flex flex-wrap items-baseline gap-x-[0.28em] overflow-visible">
                        <span className="disintegrate-word disintegrate-word-5 inline-block will-change-[transform,opacity,filter]">
                          Solutions
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* 2. Supporting Editorial Copy (Line-by-Line Reveal) */}
            <div ref={bodyRef} className="mt-3.5 sm:mt-4.5 space-y-2.5 sm:space-y-3 max-w-[620px]">
              <div className="disintegrate-p1 will-change-[transform,opacity,filter]">
                <p className="p1-inner text-[13.5px] xs:text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.65] font-normal">
                  {hero.supportingParagraph1}
                </p>
              </div>
              <div className="hidden sm:block disintegrate-p2 will-change-[transform,opacity,filter]">
                <p className="p2-inner text-[13.5px] xs:text-[14px] sm:text-[14.5px] text-white/75 leading-[1.65] font-normal">
                  {hero.supportingParagraph2}
                </p>
              </div>
            </div>

            {/* 3. Primary Consultation CTA */}
            <div
              ref={ctaRef}
              className="disintegrate-cta mt-4 sm:mt-5.5 will-change-[transform,opacity]"
            >
              <div className="cta-inner inline-flex will-change-transform">
                <a
                  href={hero.primaryCta.href}
                  className="font-heading whitespace-nowrap inline-flex items-center justify-center gap-2 px-5 sm:px-7 h-[44px] sm:h-[48px] bg-accent hover:bg-accent-hover text-white text-[13.5px] sm:text-[14px] font-semibold rounded-md shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px text-center"
                >
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 4. Three-Item Service Strip */}
            <div ref={stripRef} className="disintegrate-strip will-change-[transform,opacity]">
              <div className="strip-inner will-change-transform">
                <HeroServiceStrip variant="dark" />
              </div>
            </div>

          </div>

          {/* Right Column Spacer on desktop so right ~50% displays the gavel & glowing laptop unobstructed */}
          <div className="lg:col-span-5 xl:col-span-6 hidden lg:block pointer-events-none" aria-hidden="true" />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
