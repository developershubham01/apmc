"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Loader2,
  RefreshCw,
  Save,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Minus,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "steady";

type AdminRateRow = {
  id: string;
  commodity: string;
  variety: string;
  unit: string;
  min: number;
  max: number;
  modal: number;
  trend: Trend;
  sortOrder: number;
  updatedAt: string;
};

type AdminRateGroup = {
  slug: string;
  label: string;
  note: string;
  rows: AdminRateRow[];
};

const trendMeta: Record<Trend, { label: string; Icon: typeof TrendingUp; className: string }> = {
  up: { label: "Rising", Icon: TrendingUp, className: "text-green-700" },
  down: { label: "Falling", Icon: TrendingDown, className: "text-red-600" },
  steady: { label: "Steady", Icon: Minus, className: "text-ink-600" },
};

type Draft = { min: string; max: string; modal: string; trend: Trend };

function draftsFromGroups(groups: AdminRateGroup[]): Record<string, Draft> {
  const map: Record<string, Draft> = {};
  for (const g of groups) {
    for (const r of g.rows) {
      map[r.id] = { min: String(r.min), max: String(r.max), modal: String(r.modal), trend: r.trend };
    }
  }
  return map;
}

function rowIssues(d: Draft): string | null {
  const min = Number(d.min);
  const max = Number(d.max);
  const modal = Number(d.modal);
  if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(modal) ||
      min < 0 || max < 0 || modal < 0) {
    return "Prices must be non-negative whole numbers";
  }
  if (min > max) return "Min cannot exceed max";
  if (modal < min || modal > max) return "Modal must sit between min and max";
  return null;
}

type Props = {
  adminKey: string;
  onAuthError: () => void;
};

export function RatesPanel({ adminKey, onAuthError }: Props) {
  const [groups, setGroups] = useState<AdminRateGroup[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savingRow, setSavingRow] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const [touchBusy, setTouchBusy] = useState(false);
  const [touchDone, setTouchDone] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/rates/admin", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setGroups(data.groups ?? []);
      setDrafts(draftsFromGroups(data.groups ?? []));
      setSavedAt(data.updatedAt ?? null);
    } catch {
      setLoadError("Failed to load market rates. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [adminKey, onAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  const dirtyIds = useMemo(() => {
    const ids: string[] = [];
    for (const g of groups) {
      for (const r of g.rows) {
        const d = drafts[r.id];
        if (!d) continue;
        if (
          d.min !== String(r.min) ||
          d.max !== String(r.max) ||
          d.modal !== String(r.modal) ||
          d.trend !== r.trend
        ) {
          ids.push(r.id);
        }
      }
    }
    return ids;
  }, [groups, drafts]);

  const updateDraft = (id: string, patch: Partial<Draft>) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
    setSavedFlash((f) => (f === id ? null : f));
  };

  const saveRow = async (row: AdminRateRow) => {
    const d = drafts[row.id];
    if (!d) return;
    setSavingRow(row.id);
    setRowError(null);
    try {
      const res = await fetch("/api/rates/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: row.id,
          min: Number(d.min),
          max: Number(d.max),
          modal: Number(d.modal),
          trend: d.trend,
        }),
      });
      if (res.status === 401) {
        onAuthError();
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setRowError(data.error ?? "Could not save this row.");
        return;
      }
      const updated = data.row as AdminRateRow;
      setGroups((prev) =>
        prev.map((g) =>
          g.slug === rowSlug(row.id)
            ? {
                ...g,
                rows: g.rows.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
              }
            : g
        )
      );
      setSavedAt(updated.updatedAt);
      setSavedFlash(updated.id);
      setTimeout(() => setSavedFlash((f) => (f === updated.id ? null : f)), 2200);
    } catch {
      setRowError("Could not save this row. Check your connection.");
    } finally {
      setSavingRow(null);
    }
  };

  // Helper to locate a row's group slug from current state.
  function rowSlug(id: string): string {
    for (const g of groups) {
      if (g.rows.some((r) => r.id === id)) return g.slug;
    }
    return "";
  }

  const touchAll = async () => {
    setTouchBusy(true);
    try {
      const res = await fetch("/api/rates/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ action: "touch" }),
      });
      if (res.status === 401) {
        onAuthError();
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setSavedAt(data.updatedAt);
        setTouchDone(true);
        setTimeout(() => setTouchDone(false), 2200);
        load();
      }
    } catch {
      /* silent — button stays usable */
    } finally {
      setTouchBusy(false);
    }
  };

  const formattedUpdated = savedAt
    ? new Date(savedAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";

  return (
    <div>
      {/* Panel header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-premium sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-700 text-navy">
            Daily Market Rates Editor
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-600">
            <History className="h-3.5 w-3.5 text-royal" />
            Board last updated:{" "}
            <span className="font-700 text-royal">{formattedUpdated}</span>
            <span className="text-ink-600/60">
              · edits go live on the /apmc page instantly
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {dirtyIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-700 text-saffron-600 ring-1 ring-saffron/30">
              {dirtyIds.length} unsaved change{dirtyIds.length > 1 ? "s" : ""}
            </span>
          )}
          <button
            type="button"
            onClick={touchAll}
            disabled={touchBusy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-600 text-ink-600 ring-1 ring-border transition hover:text-royal disabled:opacity-60"
          >
            {touchDone ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : touchBusy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Mark board refreshed
          </button>
        </div>
      </div>

      {loadError && (
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-500 text-red-700 ring-1 ring-red-200">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          {loadError}
        </p>
      )}
      {rowError && (
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-500 text-red-700 ring-1 ring-red-200">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          {rowError}
        </p>
      )}

      {/* Groups */}
      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl border border-border bg-mist" />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {groups.map((group) => (
            <section
              key={group.slug}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium"
            >
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-mist/60 px-5 py-3.5">
                <h3 className="font-heading text-sm font-700 uppercase tracking-[0.12em] text-navy">
                  {group.label}
                  <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[0.68rem] font-600 normal-case tracking-normal text-ink-600 ring-1 ring-border">
                    {group.rows.length} items
                  </span>
                </h3>
                <p className="hidden text-xs text-ink-600/70 sm:block">{group.note}</p>
              </header>

              <div className="divide-y divide-border/70">
                {/* Column labels (desktop) */}
                <div className="hidden gap-3 bg-white px-5 py-2 text-[0.66rem] font-700 uppercase tracking-[0.12em] text-ink-600/60 lg:grid lg:grid-cols-[minmax(10rem,1.5fr)_6rem_6rem_6.5rem_8.5rem_5.5rem]">
                  <span>Commodity</span>
                  <span>Min ₹</span>
                  <span>Max ₹</span>
                  <span>Modal ₹</span>
                  <span>Trend</span>
                  <span className="text-right">Action</span>
                </div>

                {group.rows.map((row) => {
                  const d = drafts[row.id];
                  if (!d) return null;
                  const isDirty = dirtyIds.includes(row.id);
                  const issue = isDirty ? rowIssues(d) : null;
                  const TrendIcon = trendMeta[d.trend].Icon;
                  return (
                    <div
                      key={row.id}
                      className={cn(
                        "px-5 py-4 transition-colors lg:grid lg:grid-cols-[minmax(10rem,1.5fr)_6rem_6rem_6.5rem_8.5rem_5.5rem] lg:items-center lg:gap-3",
                        isDirty ? "bg-gold-50/50" : "bg-white"
                      )}
                    >
                      {/* Commodity cell */}
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-sm font-700 text-navy">
                          {row.commodity}
                          {isDirty && (
                            <span className="rounded-full bg-gold px-1.5 py-0.5 text-[0.6rem] font-800 uppercase tracking-wider text-navy">
                              edited
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-ink-600/80">
                          {row.variety} · {row.unit}
                        </p>
                      </div>

                      {/* Price inputs */}
                      <div className="mt-3 grid grid-cols-3 gap-2 lg:col-span-3 lg:mt-0 lg:grid-cols-3">
                        {(["min", "max", "modal"] as const).map((field) => (
                          <label key={field} className="block lg:contents">
                            <span className="mb-1 block text-[0.62rem] font-700 uppercase tracking-[0.1em] text-ink-600/60 lg:hidden">
                              {field} ₹
                            </span>
                            <input
                              type="number"
                              min={0}
                              inputMode="numeric"
                              value={d[field]}
                              aria-label={`${field} price for ${row.commodity} (${row.unit})`}
                              onChange={(e) =>
                                updateDraft(row.id, { [field]: e.target.value } as Partial<Draft>)
                              }
                              className={cn(
                                "w-full rounded-lg border bg-white px-2 py-1.5 text-center text-sm font-600 tabular-nums text-ink shadow-sm transition-colors focus:outline-none focus:ring-2",
                                issue
                                  ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                                  : "border-border focus:border-gold focus:ring-gold/30"
                              )}
                            />
                          </label>
                        ))}
                      </div>

                      {/* Trend */}
                      <div className="mt-3 lg:mt-0">
                        <span className="mb-1 block text-[0.62rem] font-700 uppercase tracking-[0.1em] text-ink-600/60 lg:hidden">
                          Trend
                        </span>
                        <div className="relative">
                          <TrendIcon
                            className={cn(
                              "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2",
                              trendMeta[d.trend].className
                            )}
                          />
                          <select
                            value={d.trend}
                            aria-label={`Trend for ${row.commodity}`}
                            onChange={(e) =>
                              updateDraft(row.id, { trend: e.target.value as Trend })
                            }
                            className="w-full appearance-none rounded-lg border border-border bg-white py-1.5 pl-8 pr-2 text-xs font-600 text-ink shadow-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                          >
                            <option value="up">Rising</option>
                            <option value="steady">Steady</option>
                            <option value="down">Falling</option>
                          </select>
                        </div>
                      </div>

                      {/* Save */}
                      <div className="mt-3 flex items-center justify-end gap-2 lg:mt-0 lg:justify-end">
                        {issue ? (
                          <p className="text-right text-[0.66rem] font-600 leading-tight text-red-600">
                            {issue}
                          </p>
                        ) : savedFlash === row.id ? (
                          <span className="inline-flex items-center gap-1 text-xs font-700 text-green-700">
                            <Check className="h-4 w-4" />
                            Saved
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => saveRow(row)}
                            disabled={!isDirty || savingRow === row.id}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-700 text-white shadow-premium transition hover:bg-navy-700 disabled:opacity-30"
                          >
                            {savingRow === row.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Save className="h-3.5 w-3.5" />
                            )}
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
