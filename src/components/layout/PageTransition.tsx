import React from 'react';

export interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Editorial Page Container
 * 
 * Works in direct harmony with DirectionalTransitionOverlay:
 * - Keeps the destination page crisp, sharp, and at full opacity (1.0).
 * - Avoids stacked opacity fades or milky blur layers that compromise typography.
 * - Instantly ready when the directional curtain sweeps away to reveal the new page.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  routeKey,
  children,
  className = '',
}) => {
  return (
    <div
      key={routeKey}
      data-route-key={routeKey}
      className={`relative w-full flex-grow flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
