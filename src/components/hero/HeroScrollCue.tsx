import React from 'react';

export const HeroScrollCue: React.FC = () => {
  return (
    <div className="hidden lg:flex absolute left-6 xl:left-8 bottom-5 xl:bottom-6 z-30 flex-col items-center gap-2 disintegrate-cue will-change-[transform,opacity]">
      <a
        href="#pillars"
        aria-label="Scroll down to Core Practice Pillars"
        className="group flex flex-col items-center gap-2 text-brand-slate hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
      >
        <span className="text-[9px] font-semibold tracking-[0.26em] uppercase text-brand-slate/85 group-hover:text-primary transition-colors [writing-mode:vertical-rl] rotate-180 select-none">
          SCROLL
        </span>
        <div className="w-px h-8 bg-brand-border group-hover:bg-primary transition-colors overflow-hidden relative">
          <div className="w-full h-full bg-primary/70 anim-scroll-pulse" />
        </div>
      </a>
    </div>
  );
};
