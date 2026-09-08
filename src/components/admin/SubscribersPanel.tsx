"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AtSign,
  Clock,
  Download,
  Loader2,
  Search,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Subscriber = {
  id: string;
  email: string;
  source: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Props = {
  adminKey: string;
  onAuthError: () => void;
};

export function SubscribersPanel({ adminKey, onAuthError }: Props) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/subscribers", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        onAuthError();
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setSubscribers(data.subscribers ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setLoadError("Failed to load subscribers. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [adminKey, onAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!search) return subscribers;
    const q = search.toLowerCase();
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const exportCsv = () => {
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = subscribers.map((s) =>
      [s.email, s.source, new Date(s.createdAt).toISOString()].map(escape).join(",")
    );
    const csv = ["Email,Source,Created At".split(",").map(escape).join(","), ...lines].join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const removeSubscriber = async (subscriber: Subscriber) => {
    setBusyId(subscriber.id);
    try {
      const res = await fetch(`/api/subscribers/${subscriber.id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error();
      setSubscribers((prev) => prev.filter((s) => s.id !== subscriber.id));
      setTotal((t) => Math.max(0, t - 1));
      setConfirmId(null);
    } catch {
      setLoadError("Could not remove the subscriber.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      {/* Panel header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-premium sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-700 text-navy">
            Newsletter Subscribers
          </h2>
          <p className="mt-1 text-xs text-ink-600">
            People who signed up for market updates via the website footer.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-50 px-3 py-1 text-xs font-700 text-royal ring-1 ring-royal/20">
            <Users className="h-3.5 w-3.5" />
            {total} total
          </span>
          <button
            type="button"
            onClick={exportCsv}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-600 text-ink-600 ring-1 ring-border transition hover:text-royal disabled:opacity-60"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/50" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email..."
            aria-label="Search subscribers"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:w-72"
          />
        </div>
        <p className="text-xs font-500 text-ink-600/80">
          Showing{" "}
          <span className="font-700 text-navy">
            {paged.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
            {(safePage - 1) * PAGE_SIZE + paged.length}
          </span>{" "}
          of <span className="font-700 text-navy">{filtered.length}</span>
          {search && " (filtered)"}
        </p>
      </div>

      {loadError && (
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-500 text-red-700 ring-1 ring-red-200">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          {loadError}
        </p>
      )}

      {/* List */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-mist" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <AtSign className="mx-auto h-10 w-10 text-ink-600/30" />
            <p className="mt-4 font-heading text-lg font-600 text-navy">
              No subscribers yet
            </p>
            <p className="mt-1 text-sm text-ink-600">
              Newsletter signups from the footer form will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border/70">
            {paged.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors hover:bg-mist/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-royal text-xs font-800 uppercase text-gold ring-1 ring-gold/30">
                  {s.email.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-600 text-navy">{s.email}</p>
                  <p className="flex items-center gap-1 text-xs text-ink-600/70">
                    <Clock className="h-3 w-3" />
                    {relativeTime(s.createdAt)}
                    <span className="ml-2 rounded-full bg-mist px-2 py-0.5 text-[0.62rem] font-600 text-ink-600 ring-1 ring-border">
                      {s.source}
                    </span>
                  </p>
                </div>
                {confirmId === s.id ? (
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-600 text-red-700">Remove?</span>
                    <button
                      type="button"
                      onClick={() => removeSubscriber(s)}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-600 text-white transition hover:bg-red-800 disabled:opacity-60"
                    >
                      {busyId === s.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmId(null)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5",
                        "text-xs font-600 text-ink-600 ring-1 ring-border"
                      )}
                    >
                      <X className="h-3 w-3" />
                      No
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(s.id)}
                    aria-label={`Remove ${s.email}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-600/50 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Simple pager */}
      {pageCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage(safePage - 1)}
            disabled={safePage <= 1}
            className="rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-600 text-ink-600 shadow-sm transition hover:text-royal disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs font-600 text-ink-600">
            Page {safePage} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage(safePage + 1)}
            disabled={safePage >= pageCount}
            className="rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-600 text-ink-600 shadow-sm transition hover:text-royal disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
