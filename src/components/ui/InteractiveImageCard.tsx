import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

export interface InteractiveImageCardProps {
  imageSrc: string;
  imageAlt: string;
  category?: string;
  indexBadge?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  topAccent?: string;
  surfaceBg?: string;
  minHeightClass?: string;
  className?: string;
  alwaysRevealDescription?: boolean;
  titleClassName?: string;
}

/**
 * Editorial Image-to-Text Card (Physical Pull-Off & Solid Content State)
 * 
 * 1. Physical Image Pull-Off Animation:
 *    - Image visibly moves downward (+36px) and away (scale 0.97).
 *    - Traveling clipping mask (clip-path: inset(100% 0 0 0)) wipes image from top down.
 *    - Progressive opacity reduction to 0.00 with zero residual photographic detail.
 *    - Clean, immediate 0ms reversal on pointer leave / tap-away.
 * 
 * 2. Distinct Solid Content State:
 *    - Surface transitions to clean, solid white #FFFFFF underneath.
 *    - Preserves resting ivory background (#F8F7F4), rounded corners, and top accent line.
 * 
 * 3. High-Contrast Description & Coordinated Sequence:
 *    - Locked heading remains strictly stationary (0px vertical shift).
 *    - Description text emerges upward from +16px below at ~200ms delay.
 *    - Description color: high-contrast dark slate / muted teal-grey #1E2D2B (contrast > 14:1).
 *    - CTA becomes prominent in crimson #C62835 with advancing arrow at ~300ms delay.
 * 
 * 4. Two-Step Touch & Universal Surface Click Interaction:
 *    - Desktop (Mouse / Pointer):
 *      - Hover & focus-within triggers reveal visually.
 *      - Clicking ANYWHERE on the card surface (image, title, description, whitespace, CTA)
 *        triggers destination navigation through the app's directional sweep transition.
 *    - Touch Devices (Phones & Tablets):
 *      - 1st Tap anywhere on card: Toggles card into revealed state (image pull-off, description
 *        & CTA appear). Navigation is prevented so users can read the editorial content first.
 *      - 2nd Tap anywhere on revealed card: Enters destination route. The entire card surface is
 *        clickable, eliminating the need to target the small CTA link.
 *      - Single-tap debounce (~250ms) guarantees a single tap or gesture cannot both reveal and navigate.
 *      - Tapping outside an active card automatically collapses it back to resting state.
 *    - Accessibility:
 *      - ARIA expanded states and keyboard Enter/Space activation.
 *      - Compliant with prefers-reduced-motion.
 */
export const InteractiveImageCard: React.FC<InteractiveImageCardProps> = ({
  imageSrc,
  imageAlt,
  category,
  indexBadge,
  title,
  description,
  ctaLabel,
  href,
  icon,
  iconBg = '#004643',
  topAccent,
  surfaceBg = '#F8F7F4',
  minHeightClass = 'min-h-[400px] sm:min-h-[430px]',
  className = '',
  alwaysRevealDescription = false,
  titleClassName,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaLinkRef = useRef<HTMLAnchorElement>(null);
  const revealTimeRef = useRef<number>(0);

  // Dismiss revealed card when user taps outside (mobile / tablet touch UX)
  useEffect(() => {
    if (!isRevealed) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsRevealed(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick, true);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick, true);
    };
  }, [isRevealed]);

  // Check if current interaction or device is touch-based
  const checkIsTouch = useCallback((e?: React.MouseEvent) => {
    if (typeof window === 'undefined') return false;
    if (e && (e.nativeEvent as PointerEvent).pointerType) {
      return (e.nativeEvent as PointerEvent).pointerType === 'touch';
    }
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.innerWidth < 640
    );
  }, []);

  // Card surface click & touch coordinator
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!href) return;

    const isTouch = checkIsTouch(e);
    const target = e.target as HTMLElement;
    const isDirectCtaClick = !!target.closest('.service-card-cta-link');

    if (isTouch) {
      // Touch interaction flow:
      if (!isRevealed && !alwaysRevealDescription) {
        // Step 1: First tap reveals the card content; DO NOT navigate yet
        e.preventDefault();
        e.stopPropagation();
        setIsRevealed(true);
        revealTimeRef.current = Date.now();
        return;
      }

      // Card is already revealed:
      // Prevent single-tap double-fire if second tap arrives within 250ms of reveal
      if (Date.now() - revealTimeRef.current < 250) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Step 2: Second tap navigates.
      // If user clicked anywhere on the card outside the CTA link, trigger the CTA link click
      if (!isDirectCtaClick && ctaLinkRef.current) {
        e.preventDefault();
        ctaLinkRef.current.click();
      }
    } else {
      // Desktop / Mouse interaction flow:
      // Card is revealed by CSS hover.
      // Clicking ANYWHERE on the card surface triggers the CTA link to route through App.tsx transition
      if (!isDirectCtaClick && ctaLinkRef.current) {
        e.preventDefault();
        ctaLinkRef.current.click();
      }
    }
  };

  // Keyboard navigation support (Enter / Space activates destination link)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!href) return;
    if (e.key === 'Enter' || e.key === ' ') {
      if (!isRevealed && !alwaysRevealDescription) {
        e.preventDefault();
        setIsRevealed(true);
        revealTimeRef.current = Date.now();
      } else if (ctaLinkRef.current) {
        e.preventDefault();
        ctaLinkRef.current.click();
      }
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={href ? 0 : undefined}
      className={`group service-interactive-card relative flex flex-col justify-between h-full ${minHeightClass} rounded-xl border border-brand-border/80 overflow-hidden text-left select-text cursor-pointer transition-all ${
        isRevealed ? 'is-revealed' : ''
      } ${className}`}
      style={{ '--card-base': surfaceBg } as React.CSSProperties}
      role={href ? 'article' : undefined}
      aria-label={`${title}${ctaLabel ? `: ${ctaLabel}` : ''}`}
      aria-expanded={isRevealed}
    >
      {/* 1. Top Accent Line: Subtle height expansion on card activation */}
      {topAccent && (
        <div
          className="card-top-accent absolute top-0 left-0 right-0 h-[2.5px] sm:group-hover:h-[3.5px] sm:group-focus-within:h-[3.5px] w-full shrink-0 transition-all duration-300 z-30 pointer-events-none"
          style={{ backgroundColor: topAccent }}
          aria-hidden="true"
        />
      )}

      {/* 2. PERSISTENT HEADING & DESCRIPTION LAYER (z-20) */}
      <div className="relative z-20 p-6 sm:p-7 md:p-6 lg:p-8 flex flex-col pointer-events-auto">
        {/* Category, Icon & Index Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-white shadow-2xs shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm"
                style={{ backgroundColor: iconBg }}
              >
                {icon}
              </div>
            )}
            {category && (
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase text-brand-taupe select-none">
                {category}
              </span>
            )}
          </div>

          {indexBadge && (
            <span className="text-xs font-mono font-semibold tracking-widest text-brand-taupe select-none transition-colors group-hover:text-primary">
              {indexBadge}
            </span>
          )}
        </div>

        {/* LOCKED HEADING: Top offset, alignment, and size remain 100% stationary (0px shift) */}
        <h3
          className={
            titleClassName ||
            'font-heading text-2xl sm:text-[25px] md:text-[23px] lg:text-[28px] xl:text-[29px] font-semibold text-primary tracking-tight leading-[1.24] group-hover:text-primary-dark transition-colors duration-200 transform-none'
          }
        >
          {title}
        </h3>

        {/* SUPPORTING DESCRIPTION: Emerges upward +16px -> 0px in dark readable slate (#1E2D2B) */}
        <div
          className={`service-card-desc-block card-description-wrap mt-3.5 motion-reduce:opacity-100 motion-reduce:transform-none ${
            alwaysRevealDescription
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'pointer-events-none sm:group-hover:pointer-events-auto group-[.is-revealed]:pointer-events-auto'
          }`}
        >
          <p className="text-sm sm:text-[14.5px] text-[#1E2D2B] leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>

      {/* 3. IMAGE LAYER: Physical pull downward and away with traveling clipping mask (z-10) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[56%] sm:h-[60%] overflow-hidden z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Photographic Imagery: pull-off moves downward (translateY(36px)), scales (0.97), clips and fades */}
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="service-card-image-sheet w-full h-full object-cover object-center"
        />

        {/* Soft resting gradient blending into the warm off-white surface */}
        <div className="service-card-image-gradient absolute inset-0 pointer-events-none" />
      </div>

      {/* 4. DIRECTIONAL ACTION PROMPT: Settle into crimson #C62835 with advancing arrow (z-20) */}
      {ctaLabel && (
        <div className="service-card-cta-row relative sm:static z-20 px-7 sm:px-8 pb-6 sm:pb-7 pt-4 mt-auto border-t border-brand-border/40 flex items-center justify-between text-xs sm:text-[13.5px] font-semibold text-primary">
          {href ? (
            <a
              ref={ctaLinkRef}
              href={href}
              className={`service-card-cta-link inline-flex items-center justify-between w-full text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded py-1 -my-1 transition-all ${
                isRevealed || alwaysRevealDescription ? 'pointer-events-auto' : 'pointer-events-none sm:pointer-events-auto'
              }`}
              aria-label={`${title}: ${ctaLabel}`}
              onClick={(e) => {
                // On touch devices, if the card has not yet been revealed, prevent direct navigation
                if (checkIsTouch() && !isRevealed && !alwaysRevealDescription) {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsRevealed(true);
                  revealTimeRef.current = Date.now();
                }
              }}
            >
              <span className="transform transition-transform duration-300 sm:group-hover:translate-x-0.5">
                {ctaLabel}
              </span>
              <ArrowRight className="service-card-cta-arrow w-4 h-4 shrink-0" />
            </a>
          ) : (
            <div className="inline-flex items-center justify-between w-full">
              <span>{ctaLabel}</span>
              <ArrowRight className="service-card-cta-arrow w-4 h-4 shrink-0" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveImageCard;
