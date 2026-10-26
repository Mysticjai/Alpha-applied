import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  User,
  PaperPlaneTilt,
  ArrowCircleDown,
  BookOpen,
} from '@phosphor-icons/react';
import { AnimatedContent } from '../ui/AnimatedContent';

// =========================================================================
// FOUNDER PHOTO CONFIGURATION
// =========================================================================
// When Krishna Dornadula's approved headshot is available, set this path string:
// e.g., export const FOUNDER_PHOTO_SRC: string | null = '/assets/founder/krishna-dornadula.jpg';
// Setting to null renders the integrated editorial placeholder.
// =========================================================================
export const FOUNDER_PHOTO_SRC: string | null = null;

export const FounderAboutSection: React.FC = () => {
  return (
    <section
      id="founder"
      className="bg-surface-warm py-12 sm:py-14 lg:py-16 border-b border-brand-border/60 relative scroll-mt-20 overflow-hidden"
    >
      {/* Alias anchor for backwards-compatibility with #about */}
      <span id="about" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      <div className="site-container relative z-10">
        {/* ── Top Hero: 3 Coordinated Visual Zones (Intro, Portrait, Approach) ── */}
        <AnimatedContent distance={16} duration={0.6} threshold={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[46%_32%_22%] xl:grid-cols-[45%_33%_22%] items-center gap-8 lg:gap-4 xl:gap-8">
            {/* Zone 1 (Left ~45-46%): Eyebrow, Editorial Title, Bio, CTAs */}
            <div className="md:col-start-1 md:row-start-1 md:row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-1 pr-0 lg:pr-4 xl:pr-6">
              {/* Eyebrow with Restrained Crimson Accent */}
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                <span className="text-xs font-mono font-semibold tracking-[0.16em] uppercase text-primary">
                  FOUNDER &amp; PRINCIPAL
                </span>
              </div>

              {/* Deliberate 3-Line Editorial Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-normal leading-[1.12] tracking-tight text-primary mb-4 max-w-[520px]">
                A Background{' '}
                <br className="hidden sm:inline" />
                in Analytics.{' '}
                <br className="hidden sm:inline" />
                A Focus on Defensible Outcomes.
              </h2>

              {/* Compact Biography */}
              <p className="text-[14.5px] sm:text-[15px] xl:text-[15.5px] text-brand-slate leading-relaxed font-normal mb-6 max-w-[460px]">
                Krishna Dornadula founded Alpha Applied Analytics Solutions to bring forensic analytics,
                financial investigation, and practical AI together to help clients make sense of complex evidence.
              </p>

              {/* Founder CTAs (Side by Side) */}
              <div className="flex flex-wrap items-center gap-4 pt-0.5">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px"
                >
                  <span>Book a Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-dornadula-606b5113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:text-accent transition-colors py-2 px-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-taupe" />
                </a>
              </div>
            </div>

            {/* Zone 2 (Center-Right ~32-33%): Integrated Editorial Portrait Placeholder */}
            <div className="md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1 flex justify-center items-center py-2 sm:py-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[310px] xl:max-w-[330px]">
                {/* Restrained Sand-Colored Geometric Backdrop Shape Behind the Portrait */}
                <div
                  className="absolute -top-3 sm:-top-5 -bottom-3 sm:-bottom-5 -left-4 sm:-left-6 -right-3 sm:-right-5 bg-[#E6DFD4] pointer-events-none -z-10"
                  style={{
                    clipPath: 'polygon(14% 0%, 100% 5%, 88% 100%, 0% 92%)',
                  }}
                  aria-hidden="true"
                />

                {/* Dedicated Portrait Slot with Angled Lower Edge */}
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 88%)',
                  }}
                >
                  {FOUNDER_PHOTO_SRC ? (
                    /* Real approved photograph (when path is set) */
                    <img
                      src={FOUNDER_PHOTO_SRC}
                      alt="Krishna Dornadula — Founder & Principal"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    /* Integrated Editorial Tonal Placeholder (blends into warm ivory) */
                    <div className="w-full h-full relative bg-gradient-to-b from-[#ECE7DD] via-[#E4DDD1] to-[#D8CFBF] flex items-end justify-center">
                      {/* Subtle Tone-on-Tone Silhouette (evokes a founder portrait cutout without fabricating facial features) */}
                      <svg
                        viewBox="0 0 320 400"
                        className="w-full h-full object-cover pointer-events-none select-none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle cx="160" cy="155" r="95" fill="#E0D7C9" fillOpacity="0.5" />
                        <path
                          d="M50 380 C60 305, 95 260, 130 248 C140 244, 180 244, 190 248 C225 260, 260 305, 270 380 Z"
                          fill="#004643"
                          fillOpacity="0.10"
                        />
                        <path
                          d="M144 246 L160 272 L176 246 C170 248, 150 248, 144 246 Z"
                          fill="#F0EDE5"
                          fillOpacity="0.7"
                        />
                        <path
                          d="M148 210 L148 248 C152 250, 168 250, 172 248 L172 210 Z"
                          fill="#004643"
                          fillOpacity="0.08"
                        />
                        <ellipse
                          cx="160"
                          cy="165"
                          rx="46"
                          ry="56"
                          fill="#004643"
                          fillOpacity="0.12"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Zone 3 (Far Right ~20-22%): Unboxed Editorial Approach Statement */}
            <div className="md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1 text-left flex flex-col justify-center">
              <div className="max-w-[260px] xl:max-w-[280px]">
                {/* Small Eyebrow with Restrained Muted-Sand Accent */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3.5 h-[1.5px] bg-brand-taupe/60 inline-block" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-brand-taupe">
                    OUR APPROACH
                  </span>
                </div>

                {/* Statement Body (Directly on page background, unboxed, natural 4-5 lines) */}
                <p className="text-[13.5px] sm:text-[14px] lg:text-[13.5px] xl:text-[14.5px] text-brand-slate leading-[1.65] font-normal">
                  Analytical rigor should lead to practical implementation—helping clients turn complex evidence into clearer, more confident decisions.
                </p>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* ── Four-Feature Strip Directly Beneath the Hero ── */}
        <div className="mt-10 lg:mt-12 pt-8 lg:pt-10 border-t border-brand-border/60">
          <AnimatedContent distance={16} duration={0.6} delay={0.1} threshold={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-brand-border/60">
              {/* 1. Analytical Thinking */}
              <div className="px-0 lg:px-6 xl:px-8 first:pl-0 flex flex-col justify-start">
                <div className="text-primary mb-2.5">
                  <User weight="regular" className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-primary font-normal tracking-tight mb-1.5">
                  Analytical Thinking
                </h3>
                <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                  Turning complex information into clear, structured insights.
                </p>
              </div>

              {/* 2. Real-World Focus */}
              <div className="px-0 lg:px-6 xl:px-8 flex flex-col justify-start">
                <div className="text-primary mb-2.5">
                  <PaperPlaneTilt weight="regular" className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-primary font-normal tracking-tight mb-1.5">
                  Real-World Focus
                </h3>
                <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                  Practical AI and analytics built around real client needs.
                </p>
              </div>

              {/* 3. Client Collaboration */}
              <div className="px-0 lg:px-6 xl:px-8 flex flex-col justify-start">
                <div className="text-primary mb-2.5">
                  <ArrowCircleDown weight="regular" className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-primary font-normal tracking-tight mb-1.5">
                  Client Collaboration
                </h3>
                <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                  Working closely with teams to understand complex questions.
                </p>
              </div>

              {/* 4. Continuous Learning */}
              <div className="px-0 lg:px-6 xl:px-8 last:pr-0 flex flex-col justify-start">
                <div className="text-primary mb-2.5">
                  <BookOpen weight="regular" className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-primary font-normal tracking-tight mb-1.5">
                  Continuous Learning
                </h3>
                <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                  Staying curious as analytical tools and methods evolve.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default FounderAboutSection;
