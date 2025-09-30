import type { ChartData } from "@/types/apiData";

import { useMemo, useState } from "react";

import ColoredIndicator from "@/components/coloredIndicator";
import DropdownPill from "@/components/dateDropDown";
import BalanceChart from "@/components/chart";

// TODO: Remove mock data in production
import { MOCK_CHARTS, type PeriodKey } from "@/mockData/chart-data";

const mapValueToPeriod: Record<string, PeriodKey> = {
  "1week": "1W",
  "1month": "1M",
  "6month": "6M",
  "1year": "1Y",
  "2years": "2Y",
  "3years": "3Y",
};

export default function TotalBalance({ chart }: { chart: ChartData }) {
  const currentBalance = chart.data?.currentBalance;

  console.log(chart);

  const [sel, setSel] = useState<PeriodKey>("6M");

  const items = [
    { label: "1 Week", value: "1week" },
    { label: "1 Month", value: "1month" },
    { label: "6 Months", value: "6month" },
    { label: "1 Year", value: "1year" },
    { label: "2 Years", value: "2years" },
    { label: "3 Years", value: "3years" },
  ];

  const payload = useMemo(() => MOCK_CHARTS[sel], [sel]);

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
          <div className="flex gap-2.5">
            <span className="font-semibold">Graph</span>
            <ColoredIndicator
              data={[
                payload?.data?.absoluteChange!,
                payload?.data?.percentageChange!,
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
        <BalanceChart payload={payload} />
      </div>
    </section>
  );
}
