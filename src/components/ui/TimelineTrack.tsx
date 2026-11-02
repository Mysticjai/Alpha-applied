import React from 'react';

export interface TimelineTrackProps {
  trackTop: number;
  trackHeight: number;
  centerX: number;
  activeLineHeight: number;
  arrowY: number;
  activeLineRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  lineColor?: string;
  inactiveLineColor?: string;
  arrowColor?: string;
}

export const TimelineTrack: React.FC<TimelineTrackProps> = ({
  trackTop,
  trackHeight,
  centerX,
  activeLineHeight,
  arrowY,
  activeLineRef,
  arrowRef,
  lineColor = 'bg-primary',
  inactiveLineColor = 'bg-[#E2DDD3]',
  arrowColor = 'text-primary',
}) => {
  if (trackHeight <= 0) return null;

  return (
    <>
      {/* Inactive Background Track Line (Neutral border tone) */}
      <div
        className={`absolute w-[2px] ${inactiveLineColor} rounded-full pointer-events-none`}
        style={{
          left: `${centerX - 1}px`,
          top: `${trackTop}px`,
          height: `${trackHeight}px`,
        }}
        aria-hidden="true"
      />

      {/* Active Animated Progress Track Line (Zero CSS transition lag) */}
      <div
        ref={activeLineRef}
        className={`absolute w-[2px] ${lineColor} rounded-full pointer-events-none will-change-[height]`}
        style={{
          left: `${centerX - 1}px`,
          top: `${trackTop}px`,
          height: `${activeLineHeight}px`,
        }}
        aria-hidden="true"
      />

      {/* Progressive Moving Arrowhead (Zero CSS transition lag) */}
      <div
        ref={arrowRef}
        className={`absolute pointer-events-none z-20 flex items-center justify-center ${arrowColor} will-change-[top]`}
        style={{
          left: `${centerX}px`,
          top: `${arrowY - 6}px`,
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transform filter drop-shadow-2xs"
        >
          <path
            d="M2.5 5L7 9.5L11.5 5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default TimelineTrack;
