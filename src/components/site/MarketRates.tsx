"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Info,
  CalendarDays,
  Database,
  FileText,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { rateGroups as bundledGroups, ratesUpdatedAt, formatINR, type RateGroup } from "@/data/rates";

const trendMeta = {
  up: { Icon: TrendingUp, className: "text-[#31A24C] bg-[#E8F8EE]", label: "Rising" },
  down: { Icon: TrendingDown, className: "text-[#E41E3F] bg-[#FDE8E8]", label: "Falling" },
  steady: { Icon: Minus, className: "text-[#5D6C7B] bg-[#F1F4F7]", label: "Steady" },
} as const;

function formatUpdatedAt(iso: string | null): string {
  if (!iso) return ratesUpdatedAt;
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function MarketRates() {
  // Bundled data renders instantly (SSEO/first paint); API data replaces it
  // when available so the section always shows something useful.
  const [groups, setGroups] = useState<RateGroup[]>(bundledGroups);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [source, setSource] = useState<"database" | "bundled">("bundled");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rates")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.ok) return;
        if (Array.isArray(data.groups) && data.groups.length > 0) {
          setGroups(data.groups);
          setUpdatedAt(data.updatedAt ?? null);
          setSource(data.source === "database" ? "database" : "bundled");
        }
      })
      .catch(() => {
        /* keep bundled data */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [active, setActive] = useState(0);
  const group = groups[Math.min(active, groups.length - 1)];

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#D1E7DD] bg-white shadow-sm">
      {/* Meta Pill Tab bar */}
      <div
        role="tablist"
        aria-label="Market rate sections"
        className="flex gap-2 overflow-x-auto border-b border-[#D1E7DD] bg-[#042017] p-3 scrollbar-premium"
      >
        {groups.map((g, i) => (
          <button
            key={g.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm tracking-tight",
              i === active
                ? "bg-[#059669] text-white shadow-sm"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Panel meta */}
      <div className="flex flex-col gap-2 border-b border-[#D1E7DD] bg-[#F0FDF4] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="flex items-center gap-2 text-xs font-semibold text-[#4B5563]">
            <CalendarDays className="h-3.5 w-3.5 text-[#059669]" />
            Indicative rates updated <span className="font-bold text-[#042017]">{formatUpdatedAt(updatedAt)}</span>
          </p>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold",
              source === "database"
                ? "bg-[#ECFDF5] text-[#059669]"
                : "bg-white text-[#4B5563] border border-[#D1E7DD]"
            )}
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : source === "database" ? (
              <Database className="h-3 w-3" />
            ) : (
              <FileText className="h-3 w-3" />
            )}
            {source === "database" ? "Market database" : "Reference data"}
          </span>
        </div>
        <a
          href="https://www.mumbaiapmc.org/en/market-price-en/daily-market-price-en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-[#059669] transition-colors hover:text-[#047857]"
        >
          Official daily rates
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Rates table */}
      <div className="overflow-x-auto scrollbar-premium" role="tabpanel">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[#D1E7DD] bg-white text-left">
              <th scope="col" className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#042017] sm:px-6">
                Commodity
              </th>
              <th scope="col" className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                Unit
              </th>
              <th scope="col" className="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                Min
              </th>
              <th scope="col" className="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                Max
              </th>
              <th scope="col" className="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-[#059669]">
                Modal
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#4B5563] sm:px-6">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => {
              const trend = trendMeta[row.trend as keyof typeof trendMeta] ?? trendMeta.steady;
              const TrendIcon = trend.Icon;
              return (
                <tr
                  key={`${row.commodity}-${row.variety}`}
                  className="border-b border-[#D1E7DD]/60 transition-colors last:border-0 hover:bg-[#F0FDF4]/60"
                >
                  <td className="px-4 py-3.5 sm:px-6">
                    <p className="font-bold text-[#042017]">{row.commodity}</p>
                    <p className="mt-0.5 text-xs text-[#4B5563]">{row.variety}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#4B5563]">{row.unit}</td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-[#4B5563]">
                    {formatINR(row.min)}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-[#4B5563]">
                    {formatINR(row.max)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold tabular-nums text-[#042017]">
                    {formatINR(row.modal)}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold",
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
      <div className="flex items-start gap-2 border-t border-[#D1E7DD] bg-[#F0FDF4] px-4 py-3.5 sm:px-6">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#059669]" />
        <p className="text-xs leading-relaxed text-[#4B5563]">
          <span className="font-bold text-[#042017]">Note:</span> {group.note} These
          figures are indicative sample bands for orientation only — always
          verify live auction prices through the official Mumbai APMC portal
          before trade decisions.
        </p>
      </div>
    </div>
  );
}
