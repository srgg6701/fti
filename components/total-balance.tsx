// components/total-balance.tsx

import type { Chart, CData, BalanceDynamics } from "@/types/apiData";

import { useMemo, useState, useEffect, useRef } from "react";

import res from "@/mockData/graphs/charts-mock-massive.json";
import { siteConfig } from "@/config/site";
import ColoredIndicator from "@/components/coloredIndicator";
import DropdownPill from "@/components/dateDropDown";
import BalanceChart from "@/components/chart";
import LoadingIndicator from "@/components/loading-indicator";

// Периоды интерфейса (значения приходят из DropdownPill)
export type PeriodKey = "1W" | "1M" | "6M" | "1Y"
type Gran = "daily" | "weekly" | "monthly";

const mapValueToPeriod: Record<string, PeriodKey> = {
  "1week": "1W",
  "1month": "1M",
  "6month": "6M",
  "1year": "1Y",
};

// Определения периодов и желаемой гранулярности отображения
const periodDefs: Record<PeriodKey, { days: number; gran: Gran }> = {
  "1W": { days: 7, gran: "daily" },
  "1M": { days: 30, gran: "daily" },
  "6M": { days: 182, gran: "weekly" }, // ~26 точек
  "1Y": { days: 365, gran: "weekly" }, // ~52 точки
};

const MS_DAY = 24 * 60 * 60 * 1000;
const granStepMs: Record<Gran, number> = {
  daily: MS_DAY,
  weekly: 7 * MS_DAY,
  monthly: 30 * MS_DAY, // достаточно для визуализации
};

// Берём последний доступный "now" из данных, если возможно (иначе Date.now())
function inferNowMs(data: CData[] | undefined): number {
  if (!data?.length) return Date.now();
  const last = data[data.length - 1];

  return last.timestamp ?? new Date(last.date!).getTime() ?? Date.now();
}

// Бинирование/ресэмплинг: группируем точки по шагу и берём последнюю в каждом бакете
function resampleByStep(
  data: CData[],
  startMs: number,
  stepMs: number,
): CData[] {
  const buckets = new Map<number, CData>();

  for (const p of data) {
    const ts = p.timestamp ?? new Date(p.date!).getTime();
    const idx = Math.floor((ts - startMs) / stepMs);

    if (idx >= 0) buckets.set(idx, p); // последняя в бакете «побеждает»
  }
  const out: CData[] = [];
  const sortedIdx = Array.from(buckets.keys()).sort((a, b) => a - b);

  for (const i of sortedIdx) out.push(buckets.get(i)!);

  return out;
}

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

export default function TotalBalance({ chart }: { chart: Chart }) {
  const [sel, setSel] = useState<PeriodKey>("6M");

  // Статусы загрузки
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Базовый ответ API и срезы по периодам
  const [baseChart, setBaseChart] = useState<Chart | null>(null);
  const slicesRef = useRef<Partial<Record<PeriodKey, Chart>>>({});

  // Подтягиваем реальные данные
  useEffect(() => {
    let aborted = false;
    const chartUrl = siteConfig.innerItems.balance.equity.chart.href;

    (async () => {
      try {
        setStatus("loading");
        setErrorMsg(null);
        // INFO: используем мок из файла, чтобы не плодить ещё один API-роут
        //const res = await apiFetch<Chart>(`/api${chartUrl}`);

        if (aborted) return;

        // Ожидаем, что res.data.chartData — «толстый» ряд
        if (!res?.data?.chartData?.length) {
          throw new Error("Empty chart data from API");
        }

        setBaseChart(res);
        setStatus("success");
      } catch (e: any) {
        if (aborted) return;
        setStatus("error");
        setErrorMsg(e?.message || "Failed to load chart data");
      }
    })();

    return () => {
      aborted = true;
    };
  }, []);

  // Источник длинного ряда (приоритет у API; иначе стартовый проп)
  const longSeries: CData[] = useMemo(() => {
    return baseChart?.data?.chartData?.length
      ? baseChart.data.chartData
      : (chart?.data?.chartData ?? []);
  }, [baseChart, chart]);

  // «now» фиксируем по данным, чтобы все периоды считались от одного опорного времени
  const nowMs = useMemo(() => inferNowMs(longSeries), [longSeries]);

  // Получаем/мемоизируем срез по текущему периоду
  const payload = useMemo<Chart>(() => {
    if (!longSeries.length) {
      // Если вообще нет данных — отдаём пустую структуру (покажется лоадер/ошибка выше)
      return chart;
    }
    if (!slicesRef.current[sel]) {
      slicesRef.current[sel] = makeSlice(longSeries, sel, nowMs);
    }

    return slicesRef.current[sel]!;
  }, [longSeries, sel, nowMs, chart]);

  // Заголовок берём из актуального payload
  const currentBalance = payload?.data?.currentBalance ?? 0;

  console.groupCollapsed("chart/payload");
  console.log({ sel, status, errorMsg, baseChart, payload });
  console.groupEnd();

  const items = [
    { label: "1 Week", value: "1week" },
    { label: "1 Month", value: "1month" },
    { label: "6 Months", value: "6month" },
    { label: "1 Year", value: "1year" },
  ];

  return (
    <section className="flex w-full flex-wrap gap-11 py-5 lg:flex-nowrap lg:p-[80px] lg:pb-[90px]">
      <div className="flex max-w-[452px] flex-col gap-2.5">
        <h3 className="text-2xl font-medium">Total Balance</h3>
        <h1 className="text-5xl font-medium">$ {currentBalance}</h1>
        <p className="leading-normal opacity-50">
          Google&apos;s free service allows you to instantly translate words,
          phrases, and web pages. It supports over 100 languages.
        </p>
      </div>

      <div className="w-[590px] max-w-[100%] xl:p-[20px]">
        <div className="jus flex justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold">Graph</span>
            <ColoredIndicator
              data={[
                payload?.data?.absoluteChange ?? 0,
                payload?.data?.percentageChange ?? 0,
              ]}
              direction={payload?.data?.isPositive ? "Up" : "Down"}
            />
          </div>
          <div>
            <DropdownPill
              defaultValue="6month"
              height={24}
              items={items}
              width={112}
              onSelect={(item) => setSel(mapValueToPeriod[item.value])}
            />
          </div>
        </div>

        {/* Лоадер/ошибка поверх графика */}
        {status !== "success" ? (
          <div className="py-6">
            <LoadingIndicator status={status} />
            {status === "error" && errorMsg ? (
              <div className="mt-2 text-center text-sm opacity-70">
                {errorMsg}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* График — всегда рендерим, чтобы при успехе мгновенно перерисовать;
            а при загрузке/ошибке выше покажется индикатор */}
        <BalanceChart payload={payload} period={sel} />
      </div>
    </section>
  );
}
