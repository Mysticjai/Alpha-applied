import React from 'react';
import { useScrollTimeline } from '../../hooks/useScrollTimeline';
import { TimelineTrack } from '../ui/TimelineTrack';

export interface AIAssessmentTimelineProps {
  items: string[];
  timelineTitles: string[];
}

export const AIAssessmentTimeline: React.FC<AIAssessmentTimelineProps> = ({
  items,
  timelineTitles,
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
    startTrigger: 'top 90%',
    endTrigger: 'bottom 65%',
    scrub: 0.1,
    activeThresholdOffset: -14,
    revealThresholdOffset: -28,
    arrowOffset: -6,
    isActive: true,
  });

  return (
    <div className="lg:col-span-7">
      {/* Connected Vertical Timeline Track */}
      <div ref={containerRef} className="relative pl-8 sm:pl-10 space-y-5">
        <TimelineTrack
          trackTop={trackTop}
          trackHeight={trackHeight}
          centerX={centerX}
          activeLineHeight={activeLineHeight}
          arrowY={arrowY}
          activeLineRef={activeLineRef}
          arrowRef={arrowRef}
        />

        {items.map((item, idx) => {
          const isRevealed = revealedSet.has(idx);
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`relative group p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                isActive
                  ? 'bg-white border-primary/50 shadow-md ring-1 ring-primary/10'
                  : isRevealed
                  ? 'bg-surface-warm/60 border-brand-border/80 shadow-2xs hover:border-primary/40 hover:bg-white'
                  : 'bg-surface-warm/30 border-brand-border/40 shadow-none'
              }`}
              style={{
                opacity: isRevealed ? 1 : 0.4,
                transform: isRevealed ? 'translateY(0px)' : 'translateY(14px)',
                transition:
                  'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              }}
            >
              {/* Milestone Number Disc Node on Spine */}
              <div
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                className={`absolute -left-[33px] sm:-left-[41px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-xs transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white border-2 border-primary scale-110 shadow-sm ring-4 ring-primary/20'
                    : isRevealed
                    ? 'bg-primary text-white border-2 border-primary'
                    : 'bg-white border-2 border-primary/40 text-primary/70'
                }`}
                aria-hidden="true"
              >
                0{idx + 1}
              </div>

              <div className="flex flex-col">
                <div className="mb-1.5">
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    {timelineTitles[idx]}
                  </span>
                </div>
                <p className="text-sm sm:text-[14.5px] text-brand-dark leading-relaxed font-normal">
                  {item}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIAssessmentTimeline;
