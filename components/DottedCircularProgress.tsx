'use client';
import React, { useEffect, useId, useState } from 'react';

/**
 * DottedCircularProgress — API
 *
 * Usage:
 *  - Determinate (manual): pass `progress` in [0..1].
 *  - One-shot animation: set `animate` and `duration` (progress 0→1, then stops and fires `onDone`).
 *  - Start angle: `startDeg = -90` starts at the top; `0` starts at the right.
 *  - Dot look: tune `dot` (dot length fraction), `gap` (gap fraction), and `ring` (thickness in px).
 *
 * Notes:
 *  - The SVG uses `pathLength={1}` so dash values are fractions of the full circle (0..1).
 *  - `ring + 2` is used for the reveal mask stroke to avoid clipping dot edges.
 *  - The component assumes the parent sets sizing; this SVG fills its wrapper (via external CSS).
 */
type ProgressProps = {
  /** One-shot animation 0→1 (ignored when `animate` is false). */
  animate: boolean;
  /** Dot color (any valid CSS color). */
  color: string;
  /** Dot angular length as a fraction of the full circumference (0..1). */
  dot: number;
  /** Duration for the one-shot animation, in milliseconds. */
  duration: number;
  /** Gap angular length as a fraction of the full circumference (0..1). */
  gap: number;
  /** Determinate progress in [0..1] (used when `animate` is false). */
  progress: number;
  /** Dot thickness in px (stroke width). */
  ring: number;
  /** Start angle in degrees. -90 = start at top; 0 = start at right. */
  startDeg: number;
  /** Callback invoked once one-shot animation completes. */
  onDone?: () => void;
};

export default function DottedCircularProgress({
  ring,
  color,
  dot,
  gap,
  startDeg,
  progress,
  animate,
  duration,
  onDone,
}: ProgressProps) {
  const id = useId(); // ensure a unique mask id per component instance
  const [p, setP] = useState(() => clamp01(progress));

  useEffect(() => {
    if (!animate) {
      // Determinate mode: follow `progress` prop
      setP(clamp01(progress));

      return;
    }

    // One-shot animation: 0 → 1 over `duration`
    let raf = 0;
    const t0 = performance.now();

    const tick = (t: number) => {
      const e = Math.min(1, (t - t0) / duration);

      setP(e);
      if (e < 1) raf = requestAnimationFrame(tick);
      else onDone?.();
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [animate, duration, progress, onDone]);

  return (
    <div id="svg-wrapper">
      <svg aria-hidden="true" viewBox="0 0 100 100">
        <defs>
          {/* Reveal mask "sector" 0..θ: white shows, black hides */}
          <mask id={`${id}-reveal`} maskContentUnits="userSpaceOnUse" maskUnits="userSpaceOnUse">
            <rect fill="#000" height="100" width="100" x="0" y="0" />
            <circle
              cx="50"
              cy="50"
              fill="none"
              pathLength={1} // normalize circumference to 1.0
              r="48"
              stroke="#fff"
              strokeDasharray={`${p} ${1 - p}`} // visible fraction + remainder
              transform={`rotate(${startDeg} 50 50)`} // set start angle
            />
          </mask>
        </defs>

        {/* Full dotted ring; the mask reveals only the current progress arc */}
        <circle
          cx="50"
          cy="50"
          fill="none"
          mask={`url(#${id}-reveal)`}
          pathLength={1}
          r="48"
          stroke={color}
          // gap between stroke segments:
          strokeDasharray={`${dot} ${gap*0.5}`} // dot pattern along the circle
          strokeLinecap="round"
          // calculated progress bar thickness
          strokeWidth={ring + 1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
