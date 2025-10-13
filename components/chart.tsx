"use client";

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

const getMonthTicks = (points: { x: number }[]) => {
  const seen = new Set<string>();
  const ticks: number[] = [];

  for (const p of points) {
    const d = new Date(p.x);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    if (!seen.has(key)) {
      seen.add(key);
      ticks.push(p.x);
    }
  }

  return ticks;
};

const getWeekOfMonthTicks = (points: { x: number }[]) => {
  // Week index within month: 1..5
  const seen = new Set<string>();
  const ticks: number[] = [];

  for (const p of points) {
    const d = new Date(p.x);
    const week = Math.floor((d.getDate() - 1) / 7) + 1; // 1..5
    const key = `${d.getFullYear()}-${d.getMonth()}-W${week}`;

    if (!seen.has(key)) {
      seen.add(key);
      ticks.push(p.x);
    }
  }

  return ticks;
};

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
}: {
  payload: ChartData;
  period: PeriodKey;
}) {
  //console.log("Balance Chart: payload data", payload);

  // 1) забираем сырые точки
  const raw = payload?.data?.chartData ?? [];

  // 2) фильтруем валидные (тайп-гард гарантирует числа)
  const points = raw
    .filter(
      (p): p is { timestamp: number; equity: number } =>
        typeof p?.timestamp === "number" && typeof p?.equity === "number"
    )
    .map((p) => {
      const tsMs =
        p.timestamp < 1_000_000_000_000 ? p.timestamp * 1000 : p.timestamp;

      return { x: tsMs, y: p.equity };
    });

  if (!points.length) {
    return <div className="text-sm text-white/60">No data</div>;
  }

  // X-axis ticks/labels depend on selected period
  //const monthTicksFromPoints = getMonthTicks(points);
  //const weekOfMonthTicksFromPoints = getWeekOfMonthTicks(points);
  //const dayTicksFromPoints = points.map((p) => p.x);
  const [yMin, yMax] = getYDomain(points.map((d) => d.y));

  // ==== Debug helpers for X-axis ticks derivation ====
  const fmtTs = (ts: number) => new Date(ts).toISOString().slice(0, 10);
  const sample = (arr: number[], n = 6) => arr.slice(0, n).map(fmtTs);

  // ==== Calendar-based tick generators (independent from point density) ====
  const getDomain = () => {
    const xs = points.map((p) => p.x);

    return [Math.min(...xs), Math.max(...xs)] as const;
  };
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

  // Exactly 4 week ticks: W1..W4 aligned to month start (0,7,14,21 days)
  const genFourWeekTicks = (minX: number, maxX: number) => {
    const start = startOfMonth(minX);
    const ticks = [0, 7, 14, 21]
      .map((d) => addDays(start, d))
      .filter((t) => t >= minX && t <= maxX);

    // If range is too short and some fell outside, still return up to 4
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

  const setTick = () => {
    let ticks4: number[] = [];
    const [minX, maxX] = getDomain();

    switch (period) {
      case "1W":
        ticks4 = genDailyTicks(minX, maxX);
        break;
      case "1M":
        ticks4 = genFourWeekTicks(minX, maxX);
        break;
      case "6M":
        ticks4 = genMonthStartTicks(minX, maxX);
        break;
      case "1Y":
        // 12 ticks
        break;
      default:
        break;
    }
    console.log("setTicks", ticks4);
    return ticks4;
  };

  return (
    <div className="w-full rounded-xl bg-[#0b0d12] p-4">
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <AreaChart
            data={points}
            margin={{ top: 8, right: 48, left: 0, bottom: 0 }}
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
              domain={["dataMin", "dataMax"]}
              interval="preserveStartEnd"
              minTickGap={20}
              padding={{ left: 0, right: 0 }}
              scale="time"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
              tickFormatter={(v) => {
                const ts = Number(v);

                if (period === "1W") return toWeekdayShort(ts);
                if (period === "1M")
                  return "W" + Math.ceil(new Date(ts).getDate() / 7);

                return toMonthShort(ts);
              }}
              tickLine={false}
              ticks={setTick()}
              type="number"
            />
            <YAxis
              axisLine={false}
              dataKey="y"
              domain={[yMin, yMax]}
              orientation="right"
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
              tickLine={false}
              tickMargin={6}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: "#11151d",
                border: "1px solid #1c2330",
              }}
              formatter={(y: number) => [y.toFixed(2), ""]}
              itemStyle={{ color: "#dbe7ff" }}
              labelFormatter={(x) => {
                const ts = Number(x);

                if (period === "1W") return toWeekdayShort(ts);
                if (period === "1M") return toDayOfMonth(ts);

                return toMonthShort(ts);
              }}
              labelStyle={{ color: "#9fb3c8" }}
            />

            <Area dataKey="y" fill="url(#fill)" stroke="none" type="monotone" />
            <Line
              activeDot={{ r: 4 }}
              dataKey="y"
              dot={false}
              stroke={STROKE}
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
