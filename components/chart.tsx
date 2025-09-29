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

function fmtDate(ts: number) {
  // If the timestamp comes in seconds, uncomment the division:
  // if (ts < 10_000_000_000) ts *= 1000;
  const d = new Date(ts);

  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(
    n,
  );
}

export default function BalanceChart({ payload }: { payload: ChartData }) {
  if (!payload?.success || !payload.data?.chartData?.length) {
    return <div className="text-sm text-white/60">No data</div>;
  }

  const { chartData, percentageChange, absoluteChange } = payload.data;

  // Данные прямо в Recharts: x = timestamp, y = equity
  const data = chartData.map((p) => ({
    x: p.timestamp, // число для оси X
    y: p.equity, // значение
  }));

  const stroke = percentageChange >= 0 ? "#3ea6ff" : "#ff5f5f";

  return (
    <div className="w-full rounded-xl bg-[#0b0d12] p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-white/90">Balance</h3>
        <span
          className={
            percentageChange >= 0 ? "text-[#3ea6ff]" : "text-[#ff8b8b]"
          }
        >
          {absoluteChange >= 0 ? "+" : "−"} $
          {fmtMoney(Math.abs(absoluteChange))} ({percentageChange.toFixed(2)}%)
        </span>
      </div>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.32} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              axisLine={false}
              dataKey="x"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
              tickFormatter={fmtDate}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              dataKey="y"
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: "#11151d",
                border: "1px solid #1c2330",
              }}
              formatter={(y: number) => [`$ ${fmtMoney(y)}`, "Equity"]}
              itemStyle={{ color: "#dbe7ff" }}
              labelFormatter={(x) => fmtDate(Number(x))}
              labelStyle={{ color: "#9fb3c8" }}
            />

            <Area dataKey="y" fill="url(#fill)" stroke="none" type="monotone" />
            <Line
              activeDot={{ r: 4 }}
              dataKey="y"
              dot={false}
              stroke={stroke}
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
