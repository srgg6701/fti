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

const getYDomain = (vals: number[]) => {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pad = Math.max(1, (max - min) * 0.06); // ~6% отступ

  return [min - pad, max + pad] as const;
};

// ===== компонент =====
export default function BalanceChart({ payload }: { payload: ChartData }) {
  //console.log("Balance Chart: payload data", payload);

  // 1) забираем сырые точки
  const raw = payload?.data?.chartData ?? [];

  // 2) фильтруем валидные (тайп-гард гарантирует числа)
  const points = raw
    .filter(
      (p): p is { timestamp: number; equity: number } =>
        typeof p?.timestamp === "number" && typeof p?.equity === "number",
    )
    .map((p) => {
      const tsMs =
        p.timestamp < 1_000_000_000_000 ? p.timestamp * 1000 : p.timestamp;

      return { x: tsMs, y: p.equity };
    });

  if (!points.length) {
    return <div className="text-sm text-white/60">No data</div>;
  }

  const monthTicks = getMonthTicks(points);
  const [yMin, yMax] = getYDomain(points.map((d) => d.y));

  return (
    <div className="w-full rounded-xl bg-[#0b0d12] p-4">
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <AreaChart
            data={points}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
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
              minTickGap={20}
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
              tickFormatter={(v) => toMonthShort(Number(v))}
              tickLine={false}
              ticks={monthTicks}
            />
            <YAxis
              axisLine={false}
              dataKey="y"
              domain={[yMin, yMax]}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
              tickLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: "#11151d",
                border: "1px solid #1c2330",
              }}
              formatter={(y: number) => [y.toFixed(2), ""]}
              itemStyle={{ color: "#dbe7ff" }}
              labelFormatter={(x) => toMonthShort(Number(x))}
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
