### Chart configuration guide (Recharts)

This document explains how the Total Balance chart is wired, where to change things, and what to watch out for. Code references below point to exact file ranges.

### Components overview
- `components/total-balance.tsx`: fetches/derives data slices per period and renders `BalanceChart` with `payload` and `period`.
- `components/chart.tsx`: renders the Recharts chart; controls axes, ticks, tooltip, and margins.

### Periods and data slicing (where periods come from)
The period is stored in local state and passed into the chart as `period`.

```240:248:components/total-balance.tsx
        {/* График — всегда рендерим, чтобы при успехе мгновенно перерисовать;
            а при загрузке/ошибке выше покажется индикатор */}
        <BalanceChart payload={payload} period={sel} />
```

The supported UI periods and mapping from dropdown values:

```14:23:components/total-balance.tsx
// Периоды интерфейса (значения приходят из DropdownPill)
export type PeriodKey = "1W" | "1M" | "6M" | "1Y"
type Gran = "daily" | "weekly" | "monthly";

const mapValueToPeriod: Record<string, PeriodKey> = {
  "1week": "1W",
  "1month": "1M",
  "6month": "6M",
  "1year": "1Y",
};
```

Display granularity per period (daily vs weekly):

```25:31:components/total-balance.tsx
// Определения периодов и желаемой гранулярности отображения
const periodDefs: Record<PeriodKey, { days: number; gran: Gran }> = {
  "1W": { days: 7, gran: "daily" },
  "1M": { days: 30, gran: "daily" },
  "6M": { days: 182, gran: "weekly" }, // ~26 точек
  "1Y": { days: 365, gran: "weekly" }, // ~52 точки
};
```

Data slicing and resampling pipeline:

```70:114:components/total-balance.tsx
// Формирование среза периода + пересчёт метрик
function makeSlice(all: CData[], period: PeriodKey, nowMs?: number): Chart {
  const { days, gran } = periodDefs[period];
  const stepMs = granStepMs[gran];

  const now = nowMs ?? inferNowMs(all);
  const fromMs = now - days * MS_DAY;

  // 1) фильтруем нужный диапазон
  const inRange = all.filter((p) => {
    const ts = p.timestamp ?? new Date(p.date!).getTime();

    return ts >= fromMs && ts <= now;
  });

  // Если данных мало — берём хвост из двух последних точек для устойчивости
  const base = inRange.length >= 2 ? inRange : all.slice(-2);

  // 2) ресэмплим до желаемой «видимой» гранулярности
  const startMs = base.length
    ? (base[0].timestamp ?? new Date(base[0].date!).getTime())
    : fromMs;
  const sampled = resampleByStep(base, startMs, stepMs);

  // Гарантируем минимум 2 точки (если вдруг после ресэмплинга осталась 1)
  const chartData = sampled.length >= 2 ? sampled : base.slice(-2);

  // 3) пересчитываем метрики
  const first = chartData[0]?.equity ?? 0;
  const last = chartData[chartData.length - 1]?.equity ?? first;
  const absoluteChange = Number((last - first).toFixed(2));
  const percentageChange =
    first !== 0 ? Number(((absoluteChange / first) * 100).toFixed(2)) : 0;

  const data: BalanceDynamics = {
    absoluteChange,
    chartData,
    currentBalance: last,
    dataPoints: chartData.length,
    isPositive: absoluteChange >= 0,
    percentageChange,
  };

  return { data, message: "ok", success: true };
}
```

Important: normalize timestamps to milliseconds consistently.
- If your API `timestamp` is in seconds, convert to ms before comparisons and bucketing.
- Where to change: the three spots above using `timestamp` or `date` (filter range, `startMs`, and inside `resampleByStep`).

### Chart rendering and axes
The chart accepts `payload` and current `period`:

```68:73:components/chart.tsx
// ===== компонент =====
type PeriodKey = "1W" | "1M" | "6M" | "1Y";

export default function BalanceChart({ payload, period }: { payload: ChartData; period: PeriodKey }) {
  //console.log("Balance Chart: payload data", payload);
```

Helpers for label formatting and tick generation:

```18:23:components/chart.tsx
const toMonthShort = (ts: number) =>
  new Date(ts).toLocaleString(undefined, { month: "short" });
const toWeekdayShort = (ts: number) =>
  new Date(ts).toLocaleString(undefined, { weekday: "short" });
const toDayOfMonth = (ts: number) => new Date(ts).getDate().toString();
```

Monthly ticks (first point per month):

```24:39:components/chart.tsx
const getMonthTicks = (points: { x: number }[]) => {
  const seen = new Set<string>();
  const ticks: number[] = [];
  // ...
  return ticks;
};
```

Week-of-month ticks (1..5 per month):

```41:58:components/chart.tsx
const getWeekOfMonthTicks = (points: { x: number }[]) => {
  // Week index within month: 1..5
  // ...
  return ticks;
};
```

Convert raw payload to plotting points (timestamp→ms safeguard):

```74:88:components/chart.tsx
const raw = payload?.data?.chartData ?? [];
const points = raw
  .filter((p): p is { timestamp: number; equity: number } =>
    typeof p?.timestamp === "number" && typeof p?.equity === "number",
  )
  .map((p) => {
    const tsMs =
      p.timestamp < 1_000_000_000_000 ? p.timestamp * 1000 : p.timestamp;

    return { x: tsMs, y: p.equity };
  });
```

Axis domain and margins:

```100:107:components/chart.tsx
<AreaChart
  data={points}
  margin={{ top: 8, right: 48, left: 0, bottom: 0 }}
>
```

X axis — period‑aware ticks and labels:

```115:128:components/chart.tsx
<XAxis
  axisLine={false}
  dataKey="x"
  minTickGap={20}
  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
  tickFormatter={(v) => {
    const ts = Number(v);
    if (period === "1W") return toWeekdayShort(ts);
    if (period === "1M") return "W" + Math.ceil(new Date(ts).getDate() / 7);
    return toMonthShort(ts);
  }}
  tickLine={false}
  ticks={period === "1W" ? dayTicks : period === "1M" ? weekOfMonthTicks : monthTicks}
/>
```

Y axis — moved to the right and protected from clipping:

```129:138:components/chart.tsx
<YAxis
  axisLine={false}
  dataKey="y"
  domain={[yMin, yMax]}
  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
  tickLine={false}
  width={36}
  orientation="right"
  tickMargin={6}
/>
```

Tooltip formatting by period:

```139:153:components/chart.tsx
<Tooltip
  contentStyle={{ background: "#11151d", border: "1px solid #1c2330" }}
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
```

### Common issues and how to fix them
- Y axis labels clipped on the right:
  - Ensure `margin.right` >= `YAxis.width + tickMargin` (currently 48 vs 36 + 6).
- X axis labels centered instead of aligning to left edge:
  - Use `interval="preserveStartEnd"` on `<XAxis>` to force rendering the first/last labels.
  - Optionally set `padding={{ left: 0, right: 0 }}` to remove implicit padding.
- 1W and 1M showing wrong labels:
  - For 1W use `dayTicks` and weekday formatter; for 1M prefer week‑starts (`getWeekOfMonthTicks`).
- 6M/1Y showing only Sept/Oct:
  - Normalize timestamps to milliseconds in `total-balance.tsx` before filtering/bucketing (filter range, `startMs`, and inside `resampleByStep`).

### Suggested optional refinements
- Add `interval="preserveStartEnd"` and `padding` to `<XAxis>` if you still see labels collapse towards the center.
- Consider `scale="time"` and an explicit domain `[min(points.x), max(points.x)]` on `<XAxis>` if you need strict temporal spacing.


