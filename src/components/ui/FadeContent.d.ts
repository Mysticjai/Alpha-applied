import React from 'react';

export interface FadeContentProps {
  children?: React.ReactNode;
  container?: string | HTMLElement | null;
  effect?: 'fade' | 'focus' | 'develop' | 'dissolve' | 'mist' | 'pixel';
  blur?: boolean | number;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  distance?: number;
  stagger?: number;
  staggerFrom?: 'start' | 'center' | 'end' | 'edges' | 'random';
  trigger?: 'scroll' | 'mount';
  once?: boolean;
  exit?: boolean;
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

declare const FadeContent: React.FC<FadeContentProps>;
export default FadeContent;
