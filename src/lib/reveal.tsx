// Shared one-shot scroll-reveal primitives.
//
// A single IntersectionObserver watches every revealed element; when one enters
// the viewport its callback fires once and the element is unobserved. Under
// prefers-reduced-motion (or in a browser without IntersectionObserver)
// elements reveal immediately so content is never left hidden.

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode, RefObject } from 'react';

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

let sharedObserver: IntersectionObserver | null = null;
const enterCallbacks = new WeakMap<Element, () => void>();

function observe(element: Element): void {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const onEnter = enterCallbacks.get(entry.target);
          enterCallbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
          onEnter?.();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
  }
  sharedObserver.observe(element);
}

/** Fires onEnter once, the first time the element scrolls into view. */
export function useInViewOnce<T extends HTMLElement>(onEnter: () => void): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      onEnterRef.current();
      return;
    }
    enterCallbacks.set(element, () => onEnterRef.current());
    observe(element);
    return () => {
      enterCallbacks.delete(element);
      sharedObserver?.unobserve(element);
    };
  }, []);

  return ref;
}

type RevealProps = {
  /** Element or component to render as (defaults to a div). */
  as?: ElementType;
  /** Transition delay in ms, for staggering items within a grid. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>;

/** Fades its content up into place the first time it scrolls into view. */
export function Reveal({ as, delay = 0, className, style, children, ...rest }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useInViewOnce<HTMLElement>(() => setIsVisible(true));
  const Tag = (as ?? 'div') as ElementType;

  const revealClass = isVisible ? 'reveal is-visible' : 'reveal';
  const mergedStyle =
    delay > 0 ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties) : style;

  return (
    <Tag
      {...rest}
      ref={ref}
      className={className ? `${className} ${revealClass}` : revealClass}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}
