import React from 'react';
import { Briefcase } from '@phosphor-icons/react';
import { useScrollTimeline } from '../../hooks/useScrollTimeline';
import { TimelineTrack } from '../ui/TimelineTrack';

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

interface ProfessionalJourneyTimelineProps {
  items: ExperienceItem[];
  isParentExpanded: boolean;
}

export const ProfessionalJourneyTimeline: React.FC<ProfessionalJourneyTimelineProps> = ({
  items,
  isParentExpanded,
}) => {
  const {
    containerRef,
    nodeRefs,
    cardRefs,
    activeLineRef,
    arrowRef,
    trackTop,
    trackHeight,
    centerX,
    activeIndex,
    revealedSet,
    activeLineHeight,
    arrowY,
  } = useScrollTimeline({
    totalItems: items.length,
    startTrigger: 'top 92%',
    endTrigger: 'bottom 65%',
    scrub: 0.1,
    activeThresholdOffset: -14,
    revealThresholdOffset: -28,
    arrowOffset: -6,
    isActive: isParentExpanded,
  });

  return (
    <div>
      <h4 className="font-heading text-lg sm:text-xl font-semibold text-primary tracking-tight mb-5 flex items-center gap-2">
        <Briefcase weight="bold" className="w-5 h-5 text-accent" />
        <span>Professional Journey</span>
      </h4>

      {/* Timeline Container with Dynamic SVG/CSS Progressive Arrow Line */}
      <div ref={containerRef} className="relative pl-7 sm:pl-8 space-y-6">
        <TimelineTrack
          trackTop={trackTop}
          trackHeight={trackHeight}
          centerX={centerX}
          activeLineHeight={activeLineHeight}
          arrowY={arrowY}
          activeLineRef={activeLineRef}
          arrowRef={arrowRef}
        />

        {/* 6 Chronological Professional Experience Cards */}
        {items.map((item, idx) => {
          const isRevealed = revealedSet.has(idx);
          const isActive = activeIndex === idx;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Bullet Node Indicator */}
              <div
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                className={`absolute -left-[28px] sm:-left-[32px] top-4 w-3.5 h-3.5 rounded-full transition-all duration-300 z-10 ${
                  isActive
                    ? 'bg-accent border-2 border-white ring-4 ring-accent/25 scale-110'
                    : isRevealed
                    ? 'bg-primary border-2 border-white'
                    : 'bg-white border-2 border-brand-taupe/40'
                }`}
                aria-hidden="true"
              />

              {/* Progressively Animated Experience Card */}
              <div
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`p-4 sm:p-5 rounded-xl bg-white border transition-all duration-300 ${
                  isActive
                    ? 'border-primary/50 shadow-md ring-1 ring-primary/10'
                    : isRevealed
                    ? 'border-brand-border/70 shadow-2xs hover:border-brand-border'
                    : 'border-brand-border/40 shadow-none'
                }`}
                style={{
                  opacity: isRevealed ? 1 : 0.35,
                  transform: isRevealed
                    ? 'translateY(0px) scale(1)'
                    : 'translateY(18px) scale(0.98)',
                  transition:
                    'opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Header: Company & Time Period */}
                <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
                  <h5 className="font-heading text-[15px] sm:text-[16px] font-semibold text-primary leading-tight">
                    {item.company}
                  </h5>
                  <span className="text-[11px] font-mono font-medium text-brand-taupe whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                {/* Subheader: Role Title */}
                <div
                  className={`text-xs sm:text-[12.5px] font-medium mb-2.5 transition-colors ${
                    isActive ? 'text-accent font-semibold' : 'text-accent'
                  }`}
                >
                  {item.role}
                </div>

                {/* Role Highlights / Responsibility Bullets */}
                <ul className="space-y-1.5 text-xs text-brand-slate leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-brand-taupe leading-none mt-1 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalJourneyTimeline;
