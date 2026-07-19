// Animated count-up for metric values like "4.2x", "38%", "₹58L+", "1,148".
//
// Only the numeric part animates from zero; prefix/suffix stay put. Values that
// are not a single plain number (ranges, "12 → 4,093", words) render as-is, so
// a value the parser doesn't understand can never animate wrongly.

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInViewOnce } from '../lib/reveal';

const SINGLE_NUMBER = /^(\D*)(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(\D*)$/;

type CountUpProps = {
  value: string;
  duration?: number;
  /** Delay in ms before the animation starts, for staggering a row of stats. */
  delay?: number;
};

function formatNumber(current: number, decimals: number, grouped: boolean): string {
  const fixed = current.toFixed(decimals);
  if (!grouped) {
    return fixed;
  }
  const [whole, fraction] = fixed.split('.');
  const withGroups = Number(whole).toLocaleString('en-US');
  return fraction ? `${withGroups}.${fraction}` : withGroups;
}

export function CountUp({ value, duration = 1400, delay = 0 }: CountUpProps) {
  const match = value.match(SINGLE_NUMBER);
  const numberPart = match ? match[2] : '';
  const target = numberPart ? Number(numberPart.replace(/,/g, '')) : 0;
  const decimals = numberPart.includes('.') ? numberPart.split('.')[1].length : 0;
  const grouped = numberPart.includes(',');

  const [current, setCurrent] = useState(0);
  const cancelRef = useRef<(() => void) | null>(null);

  const ref = useInViewOnce<HTMLSpanElement>(() => {
    if (prefersReducedMotion()) {
      setCurrent(target);
      return;
    }
    let frame = 0;
    let startedAt: number | null = null;
    const tick = (now: number) => {
      if (startedAt === null) {
        startedAt = now;
      }
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);
    cancelRef.current = () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  });

  useEffect(() => () => cancelRef.current?.(), []);

  if (!match) {
    return <span className="countup">{value}</span>;
  }

  return (
    <span ref={ref} className="countup">
      {match[1]}
      {formatNumber(current, decimals, grouped)}
      {match[3]}
    </span>
  );
}
