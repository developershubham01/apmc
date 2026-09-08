"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Info,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { rateGroups, formatINR } from "@/data/rates";

const trendMeta = {
  up: { Icon: TrendingUp, className: "text-green-700 bg-green-100", label: "Rising" },
  down: { Icon: TrendingDown, className: "text-red-700 bg-red-100", label: "Falling" },
  steady: { Icon: Minus, className: "text-ink-600 bg-mist", label: "Steady" },
} as const;

export function MarketRates() {
  const [active, setActive] = useState(0);
  const group = rateGroups[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Market rate sections"
        className="flex gap-1 overflow-x-auto border-b border-border bg-navy px-3 py-2.5 scrollbar-premium"
      >
        {rateGroups.map((g, i) => (
          <button
            key={g.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2 text-xs font-600 transition-all sm:text-sm",
              i === active
                ? "bg-gold text-navy shadow-premium"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Panel meta */}
      <div className="flex flex-col gap-2 border-b border-border bg-mist/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-xs font-500 text-ink-600">
          <CalendarDays className="h-3.5 w-3.5 text-gold-600" />
          Indicative rates updated <span className="font-700 text-navy">{group.updated}</span>
        </p>
        <a
          href="https://www.mumbaiapmc.org/en/market-price-en/daily-market-price-en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-xs font-600 text-royal transition-colors hover:text-navy"
        >
          Official daily rates
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Rates table */}
      <div className="overflow-x-auto scrollbar-premium" role="tabpanel">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-white text-left">
              <th scope="col" className="px-4 py-3 text-xs font-700 uppercase tracking-[0.1em] text-royal sm:px-6">
                Commodity
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-700 uppercase tracking-[0.1em] text-royal">
                Unit
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-700 uppercase tracking-[0.1em] text-royal">
                Min
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-700 uppercase tracking-[0.1em] text-royal">
                Max
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-700 uppercase tracking-[0.1em] text-royal">
                Modal
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-700 uppercase tracking-[0.1em] text-royal sm:px-6">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => {
              const trend = trendMeta[row.trend];
              const TrendIcon = trend.Icon;
              return (
                <tr
                  key={`${row.commodity}-${row.variety}`}
                  className="border-b border-border/70 transition-colors last:border-0 hover:bg-royal-50/60"
                >
                  <td className="px-4 py-3.5 sm:px-6">
                    <p className="font-600 text-ink">{row.commodity}</p>
                    <p className="mt-0.5 text-xs text-ink-600/80">{row.variety}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-ink-600">{row.unit}</td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-ink-600">
                    {formatINR(row.min)}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-ink-600">
                    {formatINR(row.max)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-700 tabular-nums text-navy">
                    {formatINR(row.modal)}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6">
                    <span
                      className={cn(
                        "mx-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-600",
                        trend.className
                      )}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {trend.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 border-t border-border bg-gold-50/50 px-4 py-3 sm:px-6">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
        <p className="text-xs leading-relaxed text-ink-600">
          <span className="font-600 text-navy">Note:</span> {group.note} These
          figures are indicative sample bands for orientation only — always
          verify live auction prices through the official Mumbai APMC portal
          before trade decisions.
        </p>
      </div>
    </div>
  );
}
