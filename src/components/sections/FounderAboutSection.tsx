import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
} from '@phosphor-icons/react';
import { AnimatedContent } from '../ui/AnimatedContent';
import { siteContent } from '../../content/siteContent';
import { ProfessionalJourneyTimeline } from './ProfessionalJourneyTimeline';

// =========================================================================
// FOUNDER PHOTO CONFIGURATION
// =========================================================================
export const FOUNDER_PHOTO_SRC = '/images/krishna-dornadula.png';
// =========================================================================

export const FounderAboutSection: React.FC = () => {
  const { founderAbout } = siteContent;
  const [isExpanded, setIsExpanded] = useState(false);

  // Re-synchronize Lenis and ScrollTrigger dimensions upon expand/collapse transition
  useEffect(() => {
    const timer = setTimeout(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.resize();
      }
      if (typeof (window as any).ScrollTrigger !== 'undefined') {
        (window as any).ScrollTrigger.refresh();
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCollapseFromBottom = () => {
    setIsExpanded(false);
    const el = document.getElementById('founder');
    if (el) {
      const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 80));
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(targetY, { duration: 0.5 });
      else window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="founder"
      className="bg-surface-warm py-12 sm:py-14 lg:py-16 border-b border-brand-border/60 relative scroll-mt-20 overflow-hidden"
    >
      {/* Alias anchor for backwards-compatibility with #about */}
      <span id="about" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      <div className="site-container relative z-10">
        {/* ── Top Hero: 2 Coordinated Visual Zones (Left: Introduction & CTAs, Right: Layered Portrait Frame) ── */}
        <AnimatedContent distance={16} duration={0.55} threshold={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            {/* Zone 1 (Left ~58-60%): Eyebrow, Founder Name Heading, Bio, CTAs */}
            <div className="md:col-span-7 lg:col-span-7 pr-0 lg:pr-2">
              {/* Eyebrow with Restrained Crimson Accent */}
              <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                <span className="text-xs font-mono font-semibold tracking-[0.16em] uppercase text-primary">
                  {founderAbout.badge}
                </span>
              </div>

              {/* Founder Name as Primary Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-semibold leading-[1.15] tracking-tight text-primary mb-3 sm:mb-3.5 max-w-[540px]">
                {founderAbout.founderName}
              </h2>

              {/* Refined Introductory Paragraph (Visible by Default) */}
              <p className="text-[14.5px] sm:text-[15px] xl:text-[15.5px] text-brand-slate leading-relaxed font-normal mb-5 sm:mb-6 max-w-[520px]">
                {founderAbout.bio}
              </p>

              {/* Founder CTAs (Book a Call, Connect on LinkedIn, Read More Toggle) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
                <a
                  href="/#contact"
                  className="font-heading inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:translate-y-px"
                >
                  <span>Book a Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={founderAbout.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:text-accent transition-colors py-2 px-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-taupe" />
                </a>

                {/* Read More / Read Less Interaction Button */}
                <button
                  type="button"
                  onClick={toggleExpanded}
                  aria-expanded={isExpanded}
                  aria-controls="founder-expanded-profile"
                  className="font-heading inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:text-accent transition-colors py-2 px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer group"
                >
                  <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                  <CaretDown
                    className={`w-3.5 h-3.5 text-brand-taupe group-hover:text-accent transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-accent' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Zone 2 (Right ~40-42%): Editorial Layered Portrait Frame */}
            <div className="md:col-span-5 lg:col-span-5 flex justify-center lg:justify-end items-center py-2 sm:py-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[330px] xl:max-w-[350px]">
                {/* Layer 1: Rear Archival Paper Sheet */}
                <div
                  className="absolute -inset-3 sm:-inset-3.5 bg-[#DDD5C7]/70 rounded-xl transform rotate-1.5 sm:rotate-2 border border-[#D0C7B8]/50 shadow-2xs pointer-events-none -z-20"
                  aria-hidden="true"
                />

                {/* Layer 2: Intermediate Layered Paper Sheet */}
                <div
                  className="absolute -inset-2 sm:-inset-2.5 bg-[#E6DFD4] rounded-xl transform -rotate-1.5 sm:-rotate-2 border border-[#D8D0C2]/80 shadow-xs pointer-events-none -z-10"
                  aria-hidden="true"
                />

                {/* Layer 3: Main Portrait Card */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#EDE7DC] to-[#DDD5C5] shadow-md border border-[#DDD5C7]">
                  <img
                    src={FOUNDER_PHOTO_SRC}
                    alt="Krishna Dornadula, Founder and Principal of Alpha Applied Analytics Solutions"
                    className="w-full h-full object-cover object-top select-none"
                    width={959}
                    height={1024}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* ── Expandable Comprehensive Founder Profile (Biography, Timeline, Education & Highlights) ── */}
        <div
          id="founder-expanded-profile"
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? 'grid-rows-[1fr] opacity-100 mt-10 mb-4'
              : 'grid-rows-[0fr] opacity-0 mt-0 mb-0 pointer-events-none'
          }`}
          aria-hidden={!isExpanded}
        >
          <div className="overflow-hidden">
            <div className="bg-[#FAF8F5] border border-brand-border/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs relative">
              {/* Header Bar of Expanded Profile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-brand-border/60 gap-4">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-primary font-semibold tracking-tight">
                    Krishna Dornadula, Founder &amp; Principal
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-brand-slate mt-1.5">
                    Forensic analytics, financial investigation, enterprise data systems, and practical artificial intelligence.
                  </p>
                </div>

                {/* Top Quick Collapse Button */}
                <button
                  type="button"
                  onClick={toggleExpanded}
                  className="self-start sm:self-center shrink-0 font-heading text-xs font-semibold text-brand-taupe hover:text-primary transition-colors inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md border border-brand-border/70 hover:border-brand-border bg-white cursor-pointer"
                  aria-label="Collapse detailed profile"
                >
                  <span>Read Less</span>
                  <CaretDown className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>

              {/* Two-Column Editorial Grid: Executive Biography (Left) + Professional Journey Timeline (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* ── LEFT COLUMN (7 COLS): Comprehensive Executive Biography ── */}
                <div className="lg:col-span-7">
                  <div>
                    <h4 className="font-heading text-lg sm:text-xl font-semibold text-primary tracking-tight mb-4 flex items-center gap-2">
                      <span>Executive Biography</span>
                    </h4>
                    <div className="space-y-4 text-[14.5px] sm:text-[15px] text-[#1E2D2B] leading-relaxed font-normal">
                      {founderAbout.detailedBio?.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN (5 COLS): Professional Journey Timeline with Scroll Animations ── */}
                <div className="lg:col-span-5">
                  <ProfessionalJourneyTimeline
                    items={founderAbout.experienceTimeline || []}
                    isParentExpanded={isExpanded}
                  />
                </div>
              </div>

              {/* Bottom Concluding Bar with Read Less Action */}
              <div className="mt-8 pt-6 border-t border-brand-border/60 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleCollapseFromBottom}
                  className="font-heading inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-primary hover:text-accent transition-colors py-2 px-3.5 rounded-lg border border-brand-border/70 hover:border-brand-border bg-white shadow-2xs hover:shadow-xs cursor-pointer group"
                  aria-label="Collapse detailed profile"
                >
                  <span>Read Less</span>
                  <CaretDown className="w-3.5 h-3.5 rotate-180 text-brand-taupe group-hover:text-accent transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderAboutSection;
