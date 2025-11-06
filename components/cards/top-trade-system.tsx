"use client";

import type { TopTradeSystem } from "@/types/apiData";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { siteConfig } from "@/config/site";
import { goToStrategy } from "@/lib/utils";

const FALLBACK_LOGO = "/assets/images/default-user.png";

type TopTradeSystemCardProps = {
  strategy: TopTradeSystem;
  marginRight?: string;
  padding?: string;
};

const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
  suffix = ""
) =>
  `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)}${suffix}`;

export default function TopTradeSystemCard({
  strategy,
  marginRight = "mr-[10px]",
  padding = "p-5",
}: TopTradeSystemCardProps) {
  const router = useRouter();
  const href =
    siteConfig.navItems.find((obj) => obj.label === "Strategies")?.href || "#";

  const { id, name, pnlPercent, sharpe, maxDrawdown, equity, logo } = strategy;

  const logoSrc = useMemo(() => {
    if (!logo) return FALLBACK_LOGO;

    const trimmed = logo.trim();

    if (!trimmed.length) return FALLBACK_LOGO;
    if (trimmed.startsWith("http") || trimmed.startsWith("/")) return trimmed;

    return `/assets/images/users/${trimmed}`;
  }, [logo]);

  const handleNavigate = () =>
    goToStrategy(id, router, href, name || `strategy-${id ?? ""}`);

  return (
    <article
      aria-label={`Open ${name || "strategy"}`}
      className={`md:w-[320px] ${marginRight} ${padding} flex flex-col gap-5 rounded-[16px] bg-[rgba(16,17,36,0.65)] text-left backdrop-blur-sm transition duration-200 hover:bg-[rgba(26,31,58,0.85)]`}
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-[55px] w-[55px] overflow-hidden rounded-full bg-white/5">
            <Image
              fill
              alt={`${name || "Strategy"} logo`}
              sizes="55px"
              src={logoSrc}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="truncate text-left text-base font-semibold leading-tight text-white hover:text-white/80"
              type="button"
              onClick={handleNavigate}
            >
              {name || "Untitled Strategy"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 text-left">
        <div className="rounded-[16px] border border-white/5 bg-white/[0.04] p-4">
          <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.08em] text-white/60">
            <div className="flex flex-col gap-1">
              <dt>Sharpe</dt>
              <dd className="text-sm font-semibold text-white">
                {formatNumber(sharpe)}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt>Max Drawdown</dt>
              <dd className="text-sm font-semibold text-white">
                {formatNumber(maxDrawdown, undefined, "%")}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt>Equity</dt>
              <dd className="text-sm font-semibold text-white">
                $
                {formatNumber(equity, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt>Risk Index</dt>
              <dd className="text-sm font-semibold text-white">
                {formatNumber(Math.abs(maxDrawdown) / 5)}
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-sm leading-[1.215] text-white/70">
          Strategy maintains {formatNumber(pnlPercent, undefined, "%")}{" "}
          cumulative PnL with a sharpe ratio of {formatNumber(sharpe)} and
          equity around $
          {formatNumber(equity, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
          .
        </p>
      </div>

      <button
        className="mt-auto self-start text-xs font-semibold uppercase tracking-[0.16em] text-[#4dbbff] transition hover:text-[#8fd3ff]"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleNavigate();
        }}
      >
        View strategy
      </button>
    </article>
  );
}
