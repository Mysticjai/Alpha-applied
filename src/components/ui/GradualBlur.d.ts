import React from 'react';

export interface GradualBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  target?: 'parent' | 'page';
  height?: string | number;
  width?: string | number;
  strength?: number;
  layers?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  exponential?: boolean;
  opacity?: number;
  saturation?: number;
  tint?: string;
  autoHide?: boolean;
  container?: string | React.RefObject<HTMLElement> | HTMLElement;
  hoverIntensity?: number;
  duration?: number;
  easing?: string;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const GradualBlur: React.FC<GradualBlurProps>;
export default GradualBlur;
