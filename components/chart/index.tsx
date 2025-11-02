"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { ChartData } from "@/types/apiData";

// ===== helpers =====
const STROKE = "#155dfc";

const toMonthShort = (ts: number) =>
  new Date(ts).toLocaleString(undefined, { month: "short" });
const toWeekdayShort = (ts: number) =>
  new Date(ts).toLocaleString(undefined, { weekday: "short" });
const toDayOfMonth = (ts: number) => new Date(ts).getDate().toString();

const getYDomain = (vals: number[]) => {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pad = Math.max(1, (max - min) * 0.06); // ~6% отступ

  return [min - pad, max + pad] as const;
};

// ===== компонент =====
type PeriodKey = "1W" | "1M" | "6M" | "1Y";

export default function BalanceChart({
  payload,
  period,
  xDomain,
  tickStepMs,
  tickFormatter: externalTickFormatter,
  height = "220px",
  containerClasses = "w-full",
}: {
  payload: ChartData;
  period: PeriodKey;
  xDomain?: [number, number];
  tickStepMs?: number;
  tickFormatter?: (ts: number) => string;
  height?: string;
  containerClasses?: string;
}) {
  // --- NEW: local toMs/normalize + build points safely (ms, sorted) ---
  const localToMs = (p: any): number => {
    if (typeof p?.timestamp === "number") {
      return p.timestamp < 1_000_000_000_000 ? p.timestamp * 1000 : p.timestamp;
    }
    if (p?.date) return new Date(p.date).getTime();

    return NaN;
  };

  const points = (payload?.data?.chartData ?? [])
    .map((p: any) => ({ ...p, x: localToMs(p) }))
    .filter((p: any) => Number.isFinite(p.x))
    .sort((a: any, b: any) => a.x - b.x);

  // Normalize value -> y and compute Y domain
  const pointsWithY = points.map((p: any) => ({
    ...p,
    // source field is `equity` in your data; fall back to `value` or 0
    y:
      typeof p.equity === "number"
        ? p.equity
        : Number(p.equity ?? p.value ?? 0),
  }));

  const ys = pointsWithY
    .map((p: any) => p.y)
    .filter((v: any) => Number.isFinite(v));
  const [yMin, yMax] = ys.length ? getYDomain(ys) : [0, 0];

  // INFO: CONSOLE: Balance Chart
  /* console.group("%cBalance Chart", "color: violet"); */
  console.log(
    // data: payload.data?.chartData,
    "%cchart",
    "color: goldenrod",
    { payload, period, points, yMin, yMax }
  );
  console.groupEnd();

  const smoothedPoints = pointsWithY.map((p: any, idx: number, arr: any[]) => {
    if (arr.length < 5 || idx === 0 || idx === arr.length - 1) {
      return { ...p, actualY: p.y };
    }

    const weights = [1, 2, 3, 2, 1];
    let weightedSum = 0;
    let weightTotal = 0;

    for (let offset = -2; offset <= 2; offset++) {
      const neighbor = arr[idx + offset];
      if (!neighbor) continue;

      const weight = weights[offset + 2];
      weightedSum += neighbor.y * weight;
      weightTotal += weight;
    }

    const smoothY = weightTotal ? weightedSum / weightTotal : p.y;

    return { ...p, y: smoothY, actualY: p.y };
  });

  const chartData = smoothedPoints;

  // effective domain: prefer external xDomain, else use points
  const [minX, maxX] =
    xDomain ??
    (points.length ? [points[0].x, points[points.length - 1].x] : [0, 0]);

  const firstPoint = chartData[0];
  const lastPoint = chartData[chartData.length - 1];
  const animationSignature = [
    period,
    chartData.length,
    minX,
    maxX,
    firstPoint?.y ?? "na",
    lastPoint?.y ?? "na",
  ].join("|");

  const [seriesVisible, setSeriesVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    setSeriesVisible((prev) => (prev ? false : prev));

    if (
      typeof window === "undefined" ||
      typeof window.requestAnimationFrame !== "function"
    ) {
      setSeriesVisible(true);
      return;
    }

    frame = window.requestAnimationFrame(() => setSeriesVisible(true));

    return () => {
      if (
        frame !== null &&
        typeof window !== "undefined" &&
        typeof window.cancelAnimationFrame === "function"
      ) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [animationSignature]);

  const startOfDay = (ts: number) => {
    const d = new Date(ts);

    d.setHours(0, 0, 0, 0);

    return d.getTime();
  };
  const startOfMonth = (ts: number) => {
    const d = new Date(ts);

    d.setDate(1);
    d.setHours(0, 0, 0, 0);

    return d.getTime();
  };
  const addDays = (ts: number, days: number) => ts + days * 24 * 60 * 60 * 1000;
  const addMonths = (ts: number, months: number) => {
    const d = new Date(ts);

    d.setMonth(d.getMonth() + months, 1);
    d.setHours(0, 0, 0, 0);

    return d.getTime();
  };

  const genDailyTicks = (minX: number, maxX: number) => {
    const ticks: number[] = [];
    let cur = startOfDay(minX);

    while (cur <= maxX) {
      ticks.push(cur);
      cur = addDays(cur, 1);
    }

    return ticks;
  };

  const genStepTicks = (minX: number, maxX: number, stepMs: number) => {
    const ticks: number[] = [];
    // align start to startOfDay to avoid odd hours
    let cur = startOfDay(minX);

    while (cur <= maxX) {
      ticks.push(cur);
      cur = cur + stepMs;
    }

    return ticks;
  };

  // Exactly 4 week ticks: W1..W4 aligned to month start (0,7,14,21 days)
  const genFourWeekTicks = (minX: number, maxX: number) => {
    const DAY = 24 * 60 * 60 * 1000;
    const STEP = 7 * DAY;

    const minStart = startOfDay(minX);
    const maxStartAllowed = startOfDay(maxX) - 3 * STEP;

    // Choose start as the later of the domain start and the latest start that still allows 4 ticks
    const start = Math.max(minStart, maxStartAllowed);

    const ticks: number[] = [];

    for (let i = 0; i < 4; i++) {
      const t = start + i * STEP;

      // keep ticks inside the domain (safety)
      if (t >= minX && t <= maxX) ticks.push(t);
    }

    // If for some reason we ended up with fewer than 4 (very short ranges), fall back to
    // daily points or pad with available points — but prefer returning what fits.
    return ticks;
  };

  const genMonthStartTicks = (minX: number, maxX: number) => {
    const ticks: number[] = [];
    let cur = startOfMonth(minX);

    while (cur <= maxX) {
      ticks.push(cur);
      cur = addMonths(cur, 1);
    }

    return ticks;
  };

  const limitTickCount = (ticks: number[], maxCount: number) => {
    if (!maxCount || ticks.length <= maxCount) return ticks;

    const step = Math.ceil(ticks.length / maxCount);
    const limited: number[] = [];

    for (let i = 0; i < ticks.length; i += step) {
      limited.push(ticks[i]);
    }

    const last = ticks[ticks.length - 1];
    if (limited[limited.length - 1] !== last) {
      limited.push(last);
    }

    return Array.from(new Set(limited)).sort((a, b) => a - b);
  };

  const setTick = () => {
    let ticks: number[] = [];

    if (typeof tickStepMs === "number") {
      ticks = genStepTicks(minX, maxX, tickStepMs);
    } else {
      switch (period) {
        case "1W":
          ticks = genDailyTicks(minX, maxX);
          break;
        case "1M":
          ticks = genFourWeekTicks(minX, maxX);
          break;
        case "6M":
          ticks = genMonthStartTicks(minX, maxX);
          break;
        case "1Y":
          // keep default (month starts or custom later)
          ticks = genMonthStartTicks(minX, maxX);
          break;
        default:
          break;
      }
    }

    if (period === "1M") {
      return limitTickCount(ticks, 6);
    }

    return ticks;
  };

  const formatXAxisTick = (ts: number) => {
    let label: string | number;

    if (externalTickFormatter) {
      label = externalTickFormatter(ts);
    } else if (period === "1W") {
      label = toWeekdayShort(ts);
    } else if (period === "1M") {
      label = "W" + Math.ceil(new Date(ts).getDate() / 7);
    } else {
      label = toMonthShort(ts);
    }

    if ((period === "6M" || period === "1Y") && typeof label === "string") {
      return label.replace(/\s*\d+$/, "");
    }

    return label;
  };

  const xAxisTicks =
    period === "6M" || period === "1Y"
      ? genMonthStartTicks(minX, maxX)
      : setTick();

  const renderXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const value = Number(payload?.value);
    const label = formatXAxisTick(value);

    const safeValue = Number.isNaN(value) ? 0 : value;
    const safeLabel =
      value === undefined || Number.isNaN(value)
        ? ""
        : formatXAxisTick(safeValue);

    const isFirstMonthTick =
      period === "1M" && xAxisTicks.length > 0 && value === xAxisTicks[0];

    const dx = isFirstMonthTick ? 8 : 0;
    const anchor = isFirstMonthTick ? "start" : "middle";

    return (
      <text
        x={x}
        y={y ?? 0}
        dy={16}
        fill="rgba(255,255,255,0.45)"
        fontSize={12}
        textAnchor={anchor}
        dx={dx}
      >
        {safeLabel}
      </text>
    );
  };

  const formatTooltipLabel = (ts: number) => {
    if (period === "1W") return toWeekdayShort(ts);
    if (period === "1M") return `${toMonthShort(ts)} ${toDayOfMonth(ts)}`;
    return toMonthShort(ts);
  };

  const renderTooltipContent = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string | number;
  }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0];
    const value = Number(item?.value ?? 0);
    const actual = Number(item?.payload?.actualY ?? value);
    const smooth = value.toFixed(2);
    const raw = actual.toFixed(2);
    const showRaw = Math.abs(actual - value) > 0.01;
    const labelText =
      typeof label === "number"
        ? formatTooltipLabel(label)
        : typeof label === "string"
          ? label
          : "";

    return (
      <div
        style={{
          background: "#11151d",
          border: "1px solid #1c2330",
          padding: "8px 12px",
        }}
      >
        <div style={{ color: "#9fb3c8", marginBottom: 4 }}>{labelText}</div>
        <div style={{ color: "#dbe7ff" }}>
          {showRaw ? `${smooth} (raw ${raw})` : smooth}
        </div>
      </div>
    );
  };

  // ===== Диагностика: печатаем реальный диапазон и сгенерированные тики =====
  /* if (process.env.NODE_ENV === "development") {
    try {
      const sampleFirst = points.slice(0, 3).map((p: any) => ({
        x: new Date(p.x).toISOString(),
        y: p.y,
      }));
      const sampleLast = points.slice(-3).map((p: any) => ({
        x: new Date(p.x).toISOString(),
        y: p.y,
      }));
      const derivedDomain = [
        points.length ? new Date(points[0].x).toISOString() : null,
        points.length
          ? new Date(points[points.length - 1].x).toISOString()
          : null,
      ];
      const providedDomain = xDomain
        ? [
            new Date(xDomain[0]).toISOString(),
            new Date(xDomain[1]).toISOString(),
          ]
        : null;
      const generatedTicks = (setTick() || []).map((t: number) =>
        new Date(t).toISOString(),
      );

      console.debug("BalanceChart DEBUG", {
        period,
        providedDomain,
        derivedDomain,
        pointsCount: points.length,
        sampleFirst,
        sampleLast,
        generatedTicks,
        yDomain: { yMin, yMax },
      });
    } catch (e) {
      console.debug("BalanceChart DEBUG error", e);
    }
  } */

  return (
    <div className={containerClasses}>
      <div
        className="
    [&_*:focus]:outline-none
    [&_*:focus-visible]:outline-none
    [&_*:focus]:shadow-none
    [&_*:focus-visible]:shadow-none
  "
        style={{ width: "100%", height }}
      >
        <ResponsiveContainer
          className="
            [&_.recharts-surface]:outline-none
            [&_.recharts-surface]:focus:outline-none
            [&_.recharts-surface]:focus-visible:outline-none
            [&_.recharts-surface]:border-none
          "
        >
          <AreaChart
            data={chartData}
            // data={payload?.data?.chartData || []} // fallback to raw data if mapping failed
            margin={{ top: 8, right: 0, left: 16, bottom: 10 }}
          >
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={STROKE} stopOpacity={0.3} />
                <stop offset="100%" stopColor={STROKE} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              axisLine={false}
              dataKey="x"
              domain={[minX, maxX]}
              interval={0}
              minTickGap={0}
              padding={{ left: 16, right: 8 }}
              scale="time"
              tick={renderXAxisTick}
              tickFormatter={(v) => formatXAxisTick(Number(v))}
              tickLine={false}
              ticks={xAxisTicks}
              type="number"
            />
            <YAxis
              allowDataOverflow={false}
              allowDecimals={true}
              axisLine={false}
              dataKey="y"
              //dataKey="equity"
              domain={[yMin, yMax]}
              orientation="right"
              padding={{ bottom: 12 }}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
              tickFormatter={(v: number) => Number(v).toFixed(2)}
              tickLine={false}
              tickMargin={6}
              width={64}
            />

            <Tooltip content={renderTooltipContent} />

            {seriesVisible && (
              <>
                <Area
                  dataKey="y"
                  //dataKey="equity"
                  fill="url(#fill)"
                  stroke="none"
                  type="basis"
                />
                <Line
                  activeDot={{ r: 4 }}
                  dataKey="y"
                  //dataKey="equity"
                  dot={false}
                  stroke={STROKE}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  type="basis"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

