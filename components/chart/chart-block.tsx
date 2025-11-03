import { status } from "@/types/ui";
import { Chart } from "@/types/apiData";
import BalanceChart from "@/components/chart/index";
import LoadingIndicator from "@/components/loading-indicator";
import ColoredIndicator from "@/components/coloredIndicator";
import DropdownPill from "@/components/dateDropDown";

export type PeriodKey = "1W" | "1M" | "6M" | "1Y";

export function GraphTopPanel({
  payload,
  onSelect,
}: {
  payload: Chart;
  onSelect: (item: { label: string; value: string }) => void;
}) {
  return (
    <div className="jus flex justify-between mb-5">
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
          width={112}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

export default function ChartBlock({
  status,
  errorMsg,
  payload,
  sel,
  currentFromMs,
  nowMs,
  tickFormatter,
  tickStepMs,
  height = "220px",
}: {
  status: status;
  errorMsg?: string | boolean;
  payload: Chart;
  sel: PeriodKey;
  currentFromMs: number;
  nowMs: number;
  tickFormatter?: (ts: number) => string;
  tickStepMs?: number;
  height: string;
}) {
  return (
    <>
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
      {status === "success" ? (
        <BalanceChart
          height={height}
          payload={payload}
          period={sel}
          tickFormatter={tickFormatter}
          tickStepMs={tickStepMs}
          xDomain={[currentFromMs, nowMs]}
        />
      ) : null}
    </>
  );
}
