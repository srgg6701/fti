import type { Chart, CData, BalanceDynamics } from "@/types/apiData";

import { useMemo, useState, useEffect, useRef } from "react";

// FIXME: remove apiFetch as data is real
import res from "@/mockData/graphs/charts-mock-massive.json";
import ChartBlock, {
  GraphTopPanel,
  type PeriodKey,
} from "@/components/chart/chart-block";

// Периоды интерфейса (значения приходят из DropdownPill)

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

// Приведение времени точки к миллисекундам (timestamp в сек → мс)
function toMs(p: CData): number {
  if (typeof p?.timestamp === "number") {
    return p.timestamp < 1_000_000_000_000 ? p.timestamp * 1000 : p.timestamp;
  }
  if (p?.date) return new Date(p.date).getTime();

  return NaN;
}

// Берём последний доступный "now" из данных, если возможно (иначе Date.now())
function inferNowMs(data: CData[] | undefined): number {
  if (!data?.length) return Date.now();
  const last = data[data.length - 1];

  return toMs(last) || Date.now();
}

// Формирование простого среза периода (без ресэмплинга)
// Теперь: нормализует timestamp -> ms и сортирует по времени (asc)
function makeSlice(all: CData[], period: PeriodKey, nowMs?: number): Chart {
  const { days } = periodDefs[period];

  const now = nowMs ?? inferNowMs(all);
  const fromMs = now - days * MS_DAY;

  // 1) простой фильтр по диапазону
  const inRangeRaw = all.filter((p) => {
    const ts = toMs(p);

    return Number.isFinite(ts) && ts >= fromMs && ts <= now;
  });

  // helper: приводим timestamp к ms и гарантируем число
  const normalize = (p: CData): CData => ({ ...p, timestamp: toMs(p) });

  // сортируем по возрастанию времени
  const inRange = inRangeRaw
    .map(normalize)
    .sort((a, b) => (a.timestamp as number) - (b.timestamp as number));

  // 2) минимум 2 точки — фолбэк на последние 2 из общего ряда (тоже нормализуем и сортируем)
  let chartData: CData[];

  if (inRange.length >= 2) {
    chartData = inRange;
  } else {
    const tail = all
      .slice(-2)
      .map(normalize)
      .sort((a, b) => (a.timestamp as number) - (b.timestamp as number));

    chartData = tail;
  }

  // Ensure chartData covers full requested domain: add boundary points if missing
  const tsVals = chartData.map((p) => p.timestamp as number);
  const minTs = Math.min(...tsVals);
  const maxTs = Math.max(...tsVals);

  // If no point at fromMs — insert carry-forward (last point <= fromMs) or duplicate first
  if (minTs > fromMs) {
    const lastBefore = all
      .map(normalize)
      .filter((p) => (p.timestamp as number) <= fromMs)
      .sort((a, b) => (a.timestamp as number) - (b.timestamp as number))
      .pop();

    const startPoint = lastBefore
      ? { ...lastBefore, timestamp: fromMs }
      : { ...chartData[0], timestamp: fromMs };

    chartData = [{ ...startPoint }, ...chartData];
  }

  // If no point at now — append duplicate of last with timestamp = now
  if (maxTs < now) {
    const lastPoint = chartData[chartData.length - 1];
    const endPoint = { ...lastPoint, timestamp: now };

    chartData = [...chartData, endPoint];
  }

  // 3) пересчёт метрик (как было)
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

export default function GraphAndBalance({
  chart,
  wrapper = false,
  height = "220px",
}: {
  chart: Chart;
  wrapper?: boolean;
  height?: string;
}) {
  console.groupCollapsed("%cBalance Chart", "color: violet");
  console.log(chart);
  console.groupEnd();

  const [sel, setSel] = useState<PeriodKey>("6M");

  // Статусы загрузки
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | boolean>();

  // Базовый ответ API и срезы по периодам
  const [baseChart, setBaseChart] = useState<Chart | null>(null);
  const slicesRef = useRef<Partial<Record<PeriodKey, Chart>>>({});

  // Подтягиваем реальные данные
  useEffect(() => {
    let aborted = false;

    (async () => {
      try {
        setStatus("loading");
        setErrorMsg(false);
        // INFO: используем мок из файла, чтобы не плодить ещё один API-роут
        //const res = await apiFetch<Chart>(`/api${siteConfig.innerItems.balance.equity.chart.href}`);

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

  // current from/to для домена графика
  const currentFromMs = useMemo(() => {
    return nowMs - periodDefs[sel].days * MS_DAY;
  }, [sel, nowMs]);

  // шаг тиков в ms по текущей гранулярности
  const tickStepMs = useMemo(() => {
    return granStepMs[periodDefs[sel].gran];
  }, [sel]);

  // форматтер тика (под 1M хотим день/короткий месяц)
  const tickFormatter = useMemo(() => {
    return (ts: number) =>
      new Date(ts).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      });
  }, []);

  // Получаем/мемоизируем срез по текущему периоду
  const payload = useMemo<Chart>(() => {
    if (!longSeries.length) {
      // Если вообще нет данных — отдаём пустую структуру (покажется лоадер/ошибка выше)
      return chart;
    }

    // всегда пересчитываем срез для текущего периода/данных
    const slice = makeSlice(longSeries, sel, nowMs);

    slicesRef.current[sel] = slice; // можно опционально хранить, но не полагаться на это

    return slice;
  }, [longSeries, sel, nowMs, chart]);

  // Заголовок берём из актуального payload
  const currentBalance = payload?.data?.currentBalance ?? 0;

  // Debug: validate that the slice matches selected period and granularity
  try {
    const days = periodDefs[sel].days;
    const fromMs = nowMs - days * MS_DAY;
    const points = payload?.data?.chartData ?? [];
    const toMs = (ts?: number) =>
      typeof ts === "number" ? (ts < 1_000_000_000_000 ? ts * 1000 : ts) : NaN;
    const xs = points
      .map((p) => toMs(p.timestamp ?? new Date(p.date!).getTime()))
      .filter((n) => Number.isFinite(n)) as number[];
    const sorted = [...xs].sort((a, b) => a - b);
    const diffs = sorted.slice(1).map((v, i) => v - sorted[i]);
    const median = (arr: number[]) => {
      if (!arr.length) return 0;
      const s = [...arr].sort((a, b) => a - b);
      const m = Math.floor(s.length / 2);

      return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
    };

    console.groupCollapsed("chart/slice-validate");
    console.log("period", sel);
    console.log("range", {
      from: new Date(fromMs).toISOString(),
      to: new Date(nowMs).toISOString(),
    });
    console.log("points", { count: xs.length });
    if (sorted.length) {
      console.log("domain", {
        min: new Date(sorted[0]).toISOString(),
        max: new Date(sorted[sorted.length - 1]).toISOString(),
      });
    }
    console.log("diffs", {
      count: diffs.length,
      medianMs: Math.round(median(diffs)),
      minMs: diffs.length ? Math.min(...diffs) : 0,
      maxMs: diffs.length ? Math.max(...diffs) : 0,
    });
    console.groupEnd();
  } catch {}

  const ChartWrapper = () => (
    <ChartBlock
      currentFromMs={currentFromMs}
      errorMsg={errorMsg}
      height={height}
      nowMs={nowMs}
      payload={payload}
      sel={sel}
      status={status}
      tickFormatter={tickFormatter}
      tickStepMs={tickStepMs}
    />
  );

  return wrapper ? (
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
        <GraphTopPanel
          payload={payload}
          onSelect={(item) => setSel(mapValueToPeriod[item.value])}
        />
        <ChartWrapper />
      </div>
    </section>
  ) : (
    <ChartWrapper />
  );
}
