'use client';
import React, { useEffect, useId, useState } from 'react';

type Props = {
  /** Размер в px (ширина = высота) */
  size?: number;
  /** Толщина «точек» в px */
  ring?: number;
  /** Цвет точек */
  color?: string;
  /** Доля окружности для «точки» (0..1), при pathLength=1 */
  dot?: number;
  /** Доля окружности для зазора (0..1) */
  gap?: number;
  /** Стартовый угол (deg): -90 = сверху, 0 = справа */
  startDeg?: number;
  /** Прогресс 0..1 (если animate=false) */
  progress?: number;
  /** Включить одноразовую анимацию 0→1 */
  animate?: boolean;
  /** Длительность анимации, мс */
  duration?: number;
  /** Колбэк по завершении анимации */
  onDone?: () => void;
};

export default function DottedCircularProgress({
  //size = 220,
  ring = 4,
  color = '#3B57FF',
  dot = 0,
  gap = 0,
  startDeg = -90,
  progress = 0,
  animate = false,
  duration = 9500,
  onDone,
}: Props) {
  const id = useId();                 // чтобы mask-id был уникальным
  const [p, setP] = useState(() => clamp01(progress));

  useEffect(() => {
    if (!animate) {
      setP(clamp01(progress));
      return;
    }
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
    <div className="flex h-full">
      <svg viewBox="0 0 100 100" aria-hidden="true"
      >
        <defs>
          {/* Маска «клин 0..θ»: белое — видно, чёрное — скрыто */}
          <mask id={`${id}-reveal`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="#000" />
            <circle
              cx="50"
              cy="50"
              r="48"
              pathLength={1}                         // нормализация длины к 1.0
              fill="none"
              stroke="#fff"
              strokeWidth={ring + 2}                 // чуть толще точек, чтобы не подрезать края
              strokeDasharray={`${p} ${1 - p}`}      // видимая доля + остальное
              transform={`rotate(${startDeg} 50 50)`} // старт угла
            />
          </mask>
        </defs>

        {/* Полный «точечный» круг, который отсекать будет маска */}
        <circle
          cx="50"
          cy="50"
          r="48"
          pathLength={1}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={ring}
          vectorEffect="non-scaling-stroke"
          strokeDasharray={`${dot} ${gap}`}         // геометрия «точек»
          mask={`url(#${id}-reveal)`}
        />
      </svg>
    </div>
  );
}

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
