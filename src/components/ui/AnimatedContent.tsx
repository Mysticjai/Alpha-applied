'use client';

import React, { useEffect, useLayoutEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type AnimatedContentWipe = 'none' | 'up' | 'down' | 'left' | 'right' | 'center';
export type AnimatedContentStaggerFrom = 'start' | 'end' | 'center' | 'edges' | 'random';

export interface AnimatedContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart'> {
  children?: ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  blur?: number;
  rotate?: number;
  tilt?: number;
  wipe?: AnimatedContentWipe;
  threshold?: number;
  delay?: number;
  stagger?: number;
  staggerFrom?: AnimatedContentStaggerFrom;
  trigger?: 'scroll' | 'mount';
  once?: boolean;
  scrub?: boolean | number;
  onStart?: () => void;
  onComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const WIPES: Record<string, string> = {
  up: 'linear-gradient(to top, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  down: 'linear-gradient(to bottom, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  left: 'linear-gradient(to left, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  right: 'linear-gradient(to right, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  center:
    'radial-gradient(farthest-corner at 50% 50%, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))'
};

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 30,
  direction = 'vertical',
  reverse = false,
  duration = 0.7,
  ease = 'power2.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  blur = 0,
  rotate = 0,
  tilt = 0,
  wipe = 'none',
  threshold = 0.15,
  delay = 0,
  stagger = 0,
  staggerFrom = 'start',
  trigger = 'scroll',
  once = true,
  scrub = false,
  onStart,
  onComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onStart, onComplete });
  callbacksRef.current = { onStart, onComplete };

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    try {
      let scroller: Element | string | null = container || null;
      if (typeof scroller === 'string') scroller = document.querySelector(scroller);

      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

      // Always ensure visibility is restored
      el.style.visibility = 'visible';

      if (reduce) {
        el.style.opacity = '1';
        callbacksRef.current.onComplete?.();
        return undefined;
      }

      const ctx = gsap.context(() => {
        const targets: Element[] = stagger > 0 && el.children.length ? Array.from(el.children) : [el];
        const horizontal = direction === 'horizontal';
        const axis = horizontal ? 'x' : 'y';
        const sign = reverse ? -1 : 1;
        const mask = WIPES[wipe];

        gsap.set(el, { visibility: 'visible' });

        const from: gsap.TweenVars = {
          [axis]: distance * sign,
          scale,
          opacity: animateOpacity ? initialOpacity : 1
        };
        const to: gsap.TweenVars = {
          [axis]: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease
        };

        if (blur > 0) {
          from.filter = `blur(${blur}px)`;
          to.filter = 'blur(0px)';
        }
        if (rotate) {
          from.rotation = rotate * sign;
          to.rotation = 0;
        }
        if (tilt) {
          const tiltAxis = horizontal ? 'rotationY' : 'rotationX';
          from[tiltAxis] = horizontal ? -tilt * sign : tilt * sign;
          to[tiltAxis] = 0;
          from.transformPerspective = 900;
          to.transformPerspective = 900;
        }
        if (mask) {
          gsap.set(targets, { maskImage: mask, webkitMaskImage: mask });
          from['--ac-wipe'] = 0;
          to['--ac-wipe'] = 1;
        }
        if (stagger > 0) to.stagger = { each: stagger, from: staggerFrom };

        const settle = () => {
          if (scrub) return;
          // Clear transform, filter, and mask props so hover states and native rendering remain clean
          gsap.set(targets, { clearProps: mask ? 'filter,transform,maskImage,webkitMaskImage' : 'filter,transform' });
        };

        const tl = gsap.timeline({
          paused: true,
          onStart: () => callbacksRef.current.onStart?.(),
          onComplete: () => {
            callbacksRef.current.onComplete?.();
            settle();
          }
        });
        tl.fromTo(targets, from, to, scrub ? 0 : Math.max(delay, 0));

        if (trigger === 'mount') {
          tl.play();
          return;
        }

        const start = `top ${(1 - threshold) * 100}%`;

        if (scrub) {
          ScrollTrigger.create({
            trigger: el,
            ...(scroller ? { scroller } : {}),
            start,
            end: `top ${Math.max((1 - threshold) * 100 - 45, 5)}%`,
            scrub: scrub === true ? true : Math.max(Number(scrub) || 0, 0.01),
            animation: tl
          });
          return;
        }

        ScrollTrigger.create({
          trigger: el,
          ...(scroller ? { scroller } : {}),
          start,
          once,
          onEnter: () => tl.play(),
          onLeaveBack: once
            ? undefined
            : () => {
                if (mask) gsap.set(targets, { maskImage: mask, webkitMaskImage: mask });
                tl.reverse();
              }
        });
      }, el);

      return () => ctx.revert();
    } catch {
      // Graceful fallback if GSAP initialization fails
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      return undefined;
    }
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    blur,
    rotate,
    tilt,
    wipe,
    threshold,
    delay,
    stagger,
    staggerFrom,
    trigger,
    once,
    scrub
  ]);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
