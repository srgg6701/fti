"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

import UserImage from "@/components/userImage";
import { Chart, UniversalEquity } from "@/types/apiData";
import { goToStrategy } from "@/lib/utils";
import GraphAndBalance from "@/components/graph-and-balance";
import { siteConfig } from "@/config/site";
const CardShared = ({
  username,
  strategyStoredName = "test-strategy",
  strategyName = "",
  strategyId,
  userImg = "",
  timeFrame,
  chartImg,
  // `chart` here is expected to be raw UniversalEquity (not a prebuilt Chart)
  chart,
  roi = 51.25,
  risk = 5,
  brokerImg,
  brokerName,
  brokerCode,
  status,
  marginRight = "mr-[10px]",
  padding = "p-5",
}: {
  username?: string;
  strategyStoredName?: string;
  strategyName?: string;
  strategyId?: number | string;
  userImg?: string;
  timeFrame?: string;
  chartImg?: string;
  // chart prop is the raw UniversalEquity payload
  chart?: UniversalEquity["daily_pnl_curve"];
  roi?: number;
  risk?: number;
  brokerImg?: string;
  brokerName?: string;
  brokerCode?: number;
  status?: string;
  marginRight?: string;
  padding?: string;
}) => {
  const router = useRouter();
  const href =
    siteConfig.navItems.find((obj) => obj.label === "Strategies")?.href || "#";
  // Process incoming `chart` prop (treated as UniversalEquity) -> Chart
  const processedChart = useMemo<Chart | undefined>(() => {
    if (!chart) return;

    if (!chart || !Array.isArray(chart) || chart.length === 0) return;

    const chartData = chart
      .map((d) => ({
        date: d.date,
        equity:
          typeof d.equity === "number"
            ? d.equity
            : Number(d.equity ?? d.balance ?? 0),
        timestamp: d.date ? new Date(d.date).getTime() : NaN,
      }))
      .filter((p) => Number.isFinite(p.timestamp))
      .sort((a, b) => (a.timestamp as number) - (b.timestamp as number));

    const first = chartData[0]?.equity ?? 0;
    const last = chartData[chartData.length - 1]?.equity ?? first;
    const absoluteChange = Number((last - first).toFixed(2));
    const percentageChange =
      first !== 0 ? Number(((absoluteChange / first) * 100).toFixed(2)) : 0;

    return {
      data: {
        absoluteChange,
        chartData,
        currentBalance: last,
        dataPoints: chartData.length,
        isPositive: absoluteChange >= 0,
        percentageChange,
      },
    };
  }, [chart]);

  return (
    <button
      className={`md:h-[310px] md:w-[352px] ${marginRight} ${padding} cursor-pointer`}
      onClick={() => strategyId ? goToStrategy(strategyId, router, href, strategyName) : null}
    >
      <header className="mb-5 flex items-center gap-3">
        {username ? (
          <>
            <UserImage
              height={55}
              title="User"
              userImg={`/assets/images/users/${userImg}`}
              width={55}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{username}</span>
              <span className="text-xs text-white/60">
                TimeFrame: {timeFrame}
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-between">
            <div className="flex">
              <Image
                alt="Broker"
                className="mr-5"
                height={55}
                src={`/assets/images/exchange/${brokerImg}`}
                width={55}
              />
              <div className="flex flex-col py-[7px]">
                <span className="text-base font-medium">{brokerCode}</span>
                {/* FIXME: check font color everywhere */}
                <span className="text-xs text-white/60">{brokerName}</span>
              </div>
            </div>
            <div
              className={`pt-[9px] text-xs ${
                status === "Successfully"
                  ? "color-blue-canonical"
                  : status === "Invalid password"
                    ? "color-ultra-violet"
                    : status === "Verifying"
                      ? "opacity-20"
                      : ""
              }`}
            >
              {status}
            </div>
          </div>
        )}
      </header>
      <div className="mb-4 h-[158px] w-[312px]">
        {chartImg && (
          <Image
            alt="Chart1"
            height={158}
            src={`/assets/images/charts/${chartImg}`}
            width={312}
          />
        )}
        {/* chart prop is raw UniversalEquity — always pass processed Chart to GraphAndBalance */}
        {(processedChart && (
          <GraphAndBalance chart={processedChart} height="158px" />
        )) ||
          null}
      </div>
      {(username && (
        <footer className="flex items-center justify-end gap-3 text-xs font-bold text-white/70">
          <span className="">
            ROI: <span className="text-white">{roi}%</span>
          </span>
          <span className="">
            RISK: <span className="text-white">{risk}</span>
          </span>
        </footer>
      )) ||
        null}
    </button>
  );
};

export default CardShared;
