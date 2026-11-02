import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface UseScrollTimelineOptions {
  totalItems: number;
  startTrigger?: string;
  endTrigger?: string;
  scrub?: number | boolean;
  activeThresholdOffset?: number;
  revealThresholdOffset?: number;
  arrowOffset?: number;
  isActive?: boolean;
}

export interface UseScrollTimelineReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodeRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  activeLineRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  trackTop: number;
  trackHeight: number;
  centerX: number;
  progress: number;
  activeIndex: number;
  revealedSet: Set<number>;
  activeLineHeight: number;
  arrowY: number;
  measureTrack: () => { topY: number; height: number; positions: number[] } | null;
}

export function useScrollTimeline({
  totalItems,
  startTrigger = 'top 90%',
  endTrigger = 'bottom 65%',
  scrub = 0.1,
  activeThresholdOffset = -14,
  revealThresholdOffset = -28,
  arrowOffset = -6,
  isActive = true,
}: UseScrollTimelineOptions): UseScrollTimelineReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Animation geometry state
  const [trackTop, setTrackTop] = useState(16);
  const [trackHeight, setTrackHeight] = useState(0);
  const [centerX, setCenterX] = useState(7);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set([0]));
  const revealedSetRef = useRef<Set<number>>(new Set([0]));

  // Recalculate track geometry from actual DOM nodes
  const measureTrack = () => {
    if (!containerRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const nodes = nodeRefs.current.filter((n): n is HTMLElement => n !== null);

    if (nodes.length < 2) return null;

    const firstNodeRect = nodes[0].getBoundingClientRect();
    const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();

    const nodeCenterX = Math.round(firstNodeRect.left - containerRect.left + firstNodeRect.width / 2);
    const topY = Math.round(firstNodeRect.top - containerRect.top + firstNodeRect.height / 2);
    const bottomY = Math.round(lastNodeRect.top - containerRect.top + lastNodeRect.height / 2);
    const height = Math.max(0, bottomY - topY);

    setCenterX(nodeCenterX);
    setTrackTop(topY);
    setTrackHeight(height);

    const positions = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return Math.round(rect.top - containerRect.top + rect.height / 2);
    });

    return { topY, height, positions };
  };

  useIsomorphicLayoutEffect(() => {
    // If not active, clean up existing ScrollTrigger
    if (!isActive) {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      return undefined;
    }

    // Check prefers-reduced-motion
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduceMotion) {
      setProgress(1);
      setActiveIndex(totalItems - 1);
      const allIndices = new Set(Array.from({ length: totalItems }, (_, i) => i));
      revealedSetRef.current = allIndices;
      setRevealedSet(allIndices);
      setTimeout(measureTrack, 50);
      return undefined;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const updateGeometryAndTrigger = () => {
      const metrics = measureTrack();
      if (!metrics || !containerRef.current) return;

      const { topY, height, positions } = metrics;

      // Clean up previous instance if any
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Create scroll-driven ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: startTrigger,
        end: endTrigger,
        scrub,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          setProgress(p);

          const currentLineHeight = Math.round(p * height);
          const currentArrowY = topY + currentLineHeight;
          const currentY = topY + p * height;

          // Direct DOM updates for zero lag & 60/120fps synchronization with scroll
          if (activeLineRef.current) {
            activeLineRef.current.style.height = `${currentLineHeight}px`;
          }
          if (arrowRef.current) {
            arrowRef.current.style.top = `${currentArrowY + arrowOffset}px`;
          }

          let currentActive = 0;
          const updated = new Set(revealedSetRef.current);

          positions.forEach((posY, idx) => {
            // As line draws down within reach of node, reveal the card
            if (currentY >= posY + revealThresholdOffset) {
              updated.add(idx);
            }
            // Active milestone is the one currently reached by the arrow tip
            if (currentY >= posY + activeThresholdOffset) {
              currentActive = idx;
            }
          });

          if (updated.size !== revealedSetRef.current.size) {
            revealedSetRef.current = updated;
            setRevealedSet(new Set(updated));
          }

          if (currentActive !== activeIndexRef.current) {
            activeIndexRef.current = currentActive;
            setActiveIndex(currentActive);
          }
        },
      });

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    // Staged measurements during mounting and font loading
    timeouts.push(setTimeout(updateGeometryAndTrigger, 50));
    timeouts.push(setTimeout(updateGeometryAndTrigger, 150));
    timeouts.push(setTimeout(updateGeometryAndTrigger, 300));
    timeouts.push(setTimeout(updateGeometryAndTrigger, 500));

    // ResizeObserver tracks dynamic dimensions and font reflows
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => {
        measureTrack();
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.refresh();
        }
      });
      ro.observe(containerRef.current);
    }

    const handleResize = () => {
      measureTrack();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      timeouts.forEach(clearTimeout);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [isActive, totalItems, startTrigger, endTrigger, scrub, activeThresholdOffset, revealThresholdOffset, arrowOffset]);

  const activeLineHeight = Math.round(progress * trackHeight);
  const arrowY = trackTop + activeLineHeight;

  return {
    containerRef,
    nodeRefs,
    cardRefs,
    activeLineRef,
    arrowRef,
    trackTop,
    trackHeight,
    centerX,
    progress,
    activeIndex,
    revealedSet,
    activeLineHeight,
    arrowY,
    measureTrack,
  };
}
