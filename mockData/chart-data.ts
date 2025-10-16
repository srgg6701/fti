import { CData, Data, ChartData } from "@/types/apiData";

export type PeriodKey = "1W" | "1M" | "6M" | "1Y";
// | "2Y" | "3Y";

type Gran = "daily" | "weekly" | "monthly";

const periodDefs: Record<PeriodKey, { days: number; gran: Gran }> = {
  "1W": { days: 7, gran: "daily" },
  "1M": { days: 30, gran: "daily" },
  "6M": { days: 182, gran: "weekly" },
  "1Y": { days: 365, gran: "weekly" },
};

function stepMs(gran: Gran) {
  switch (gran) {
    case "daily":
      return 24 * 60 * 60 * 1000;
    case "weekly":
      return 7 * 24 * 60 * 60 * 1000;
    case "monthly":
      return 30 * 24 * 60 * 60 * 1000; // достаточно для мока
  }
}

function niceDate(ts: number) {
  const d = new Date(ts);

  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Дет-рандом без внешних либ: стабильные «красивые» волны
function wave(i: number, amp: number) {
  const s = Math.sin(i * 0.35) + 0.35 * Math.sin(i * 0.92 + 1.3);
  const n = 0.15 * Math.sin(i * 2.1 + 0.7); // маленький шум

  return (s + n) * amp;
}

/**
 * Сгенерировать ChartData для периода.
 * @param period  - ключ периода
 * @param base    - базовый баланс (по умолчанию 1000)
 * @param amp     - амплитуда колебаний (по умолчанию 25)
 * @param nowMs   - опорная «сегодня» (по умолчанию Date.now())
 */
export function makeMockChartDataForPeriod(
  period: PeriodKey,
  base = 1000,
  amp = 25,
  nowMs = Date.now(),
): ChartData {
  const def = periodDefs[period];
  const msStep = stepMs(def.gran);

  // Сколько точек надо
  const points =
    def.gran === "monthly"
      ? Math.max(2, Math.round(def.days / 30))
      : Math.max(2, Math.round(def.days / (msStep / (24 * 60 * 60 * 1000))));

  const startMs = nowMs - (points - 1) * msStep;

  const chartData: CData[] = Array.from({ length: points }).map((_, i) => {
    const ts = startMs + i * msStep;
    const eq = base + wave(i, amp);
    const mockData = {
      timestamp: ts,
      date: niceDate(ts),
      equity: Number(eq.toFixed(2)),
    };

    return mockData;
  });

  const first: number = chartData[0].equity!;
  const last: number = chartData[chartData.length - 1].equity!;
  const absoluteChange = Number((last - first).toFixed(2));
  const percentageChange = Number(((absoluteChange / first) * 100).toFixed(2));

  const data: Data = {
    absoluteChange,
    chartData,
    currentBalance: last,
    dataPoints: chartData.length,
    isPositive: absoluteChange >= 0,
    percentageChange,
  };

  return { data, message: "mock", success: true };
}

// Быстрый набор готовых моков, если нужно сразу:
export const MOCK_CHARTS: Record<PeriodKey, ChartData> = {
  "1W": makeMockChartDataForPeriod("1W"),
  "1M": makeMockChartDataForPeriod("1M"),
  "6M": makeMockChartDataForPeriod("6M"),
  "1Y": makeMockChartDataForPeriod("1Y"),
};
