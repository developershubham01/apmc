"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Inbox,
  RefreshCw,
  LogOut,
  Lock,
  Loader2,
  Search,
  Mail,
  Phone,
  Tag,
  Clock,
  CircleDot,
  CheckCircle2,
  Timer,
  Trash2,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kr-admin-key";

type EnquiryStatus = "new" | "in-progress" | "resolved";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  category: string;
  status: EnquiryStatus;
  createdAt: string;
};

type Stats = { total: number; new: number; inProgress: number; resolved: number };

const statusMeta: Record<
  EnquiryStatus,
  { label: string; className: string; dot: string }
> = {
  new: {
    label: "New",
    className: "bg-gold-50 text-gold-600 ring-1 ring-gold/40",
    dot: "bg-gold",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-orange-50 text-saffron-600 ring-1 ring-saffron/40",
    dot: "bg-saffron",
  },
  resolved: {
    label: "Resolved",
    className: "bg-green-50 text-green-700 ring-1 ring-green-600/30",
    dot: "bg-green-600",
  },
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
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

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [detail, setDetail] = useState<(Enquiry & { message?: string }) | null>(null);
  const [actionBusy, setActionBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadEnquiries = useCallback(async (key: string) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/enquiries", {
        headers: { "x-admin-key": key },
      });
      if (res.status === 401) {
        window.localStorage.removeItem(STORAGE_KEY);
        setAdminKey(null);
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setEnquiries(data.enquiries ?? []);
      setStats(data.stats ?? null);
    } catch {
      setLoadError("Failed to load enquiries. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyKey = useCallback(
    async (key: string) => {
      setAuthLoading(true);
      setAuthError(null);
      try {
        const res = await fetch("/api/enquiries", {
          headers: { "x-admin-key": key },
        });
        if (res.status === 401) {
          setAuthError("Incorrect admin key. Please try again.");
          window.localStorage.removeItem(STORAGE_KEY);
          setAdminKey(null);
          return;
        }
        if (!res.ok) throw new Error("Request failed");
        window.localStorage.setItem(STORAGE_KEY, key);
        setAdminKey(key);
      } catch {
        setAuthError("Could not reach the server. Please try again.");
      } finally {
        setAuthLoading(false);
      }
    },
    []
  );

  // Restore saved key on mount
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setBooted(true);
    if (saved) verifyKey(saved);
  }, [verifyKey]);

  useEffect(() => {
    if (adminKey) loadEnquiries(adminKey);
  }, [adminKey, loadEnquiries]);

  const openDetail = (enquiry: Enquiry) => {
    setSelected(enquiry);
    setDetail({ ...enquiry, message: undefined });
    setConfirmDelete(false);
    // Fetch full detail (message body) using list data — the API returns
    // message only in single-item responses, so lazily fetch it.
    if (adminKey) {
      fetch(`/api/enquiries/${enquiry.id}`, {
        headers: { "x-admin-key": adminKey },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d?.ok && d.enquiry) {
            setDetail(d.enquiry);
            setSelected(d.enquiry);
          }
        })
        .catch(() => {
          /* keep list-level data */
        });
    }
  };

  const updateStatus = async (enquiry: Enquiry, status: EnquiryStatus) => {
    if (!adminKey) return;
    setActionBusy(enquiry.id + status);
    try {
      const res = await fetch(`/api/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status } : e))
      );
      setDetail((d) => (d && d.id === enquiry.id ? { ...d, status } : d));
      setSelected((s) => (s && s.id === enquiry.id ? { ...s, status } : s));
      loadEnquiries(adminKey); // refresh stats
    } catch {
      setLoadError("Could not update the enquiry status.");
    } finally {
      setActionBusy(null);
    }
  };

  const deleteEnquiry = async (enquiry: Enquiry) => {
    if (!adminKey) return;
    setActionBusy(enquiry.id + "delete");
    try {
      const res = await fetch(`/api/enquiries/${enquiry.id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error();
      setEnquiries((prev) => prev.filter((e) => e.id !== enquiry.id));
      setDetail(null);
      setSelected(null);
      setConfirmDelete(false);
      loadEnquiries(adminKey);
    } catch {
      setLoadError("Could not delete the enquiry.");
    } finally {
      setActionBusy(null);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAdminKey(null);
    setKeyInput("");
    setEnquiries([]);
    setStats(null);
  };

  const categories = useMemo(
    () => Array.from(new Set(enquiries.map((e) => e.category))),
    [enquiries]
  );

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          (e.subject ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [enquiries, statusFilter, categoryFilter, search]);

  // ------------------------------------------------------------------ Gate
  if (!booted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-royal" />
      </div>
    );
  }

  if (!adminKey) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-premium-lg">
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-royal text-gold shadow-premium ring-1 ring-gold/40">
                <Lock className="h-6 w-6" />
              </span>
              <h1 className="mt-5 font-heading text-2xl font-700 text-navy">
                Admin Access
              </h1>
              <p className="mt-2 text-sm text-ink-600">
                Enter the admin key to open the enquiries dashboard.
              </p>
            </div>

            <form
              className="mt-7 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (keyInput.trim()) verifyKey(keyInput.trim());
              }}
            >
              <div>
                <label
                  htmlFor="admin-key"
                  className="mb-2 block text-xs font-600 uppercase tracking-[0.12em] text-royal"
                >
                  Admin Key
                </label>
                <input
                  id="admin-key"
                  type="password"
                  autoFocus
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>

              {authError && (
                <p className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-500 text-red-700 ring-1 ring-red-200">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading || !keyInput.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 disabled:opacity-60"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Unlock Dashboard
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="mt-4 text-center text-xs text-ink-600/70">
            Area restricted to authorised administrators.
          </p>
        </div>
      </div>
    );
  }

  const statCards = stats
    ? [
        { label: "Total", value: stats.total, Icon: Inbox, accent: "text-royal bg-royal-50" },
        { label: "New", value: stats.new, Icon: CircleDot, accent: "text-gold-600 bg-gold-50" },
        { label: "In Progress", value: stats.inProgress, Icon: Timer, accent: "text-saffron-600 bg-orange-50" },
        { label: "Resolved", value: stats.resolved, Icon: CheckCircle2, accent: "text-green-700 bg-green-50" },
      ]
    : [];

  // -------------------------------------------------------------- Dashboard
  return (
    <div className="min-h-[70vh]">
      {/* Header bar */}
      <div className="bg-navy bg-navy-grid">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">
              Administration
            </p>
            <h1 className="mt-1 font-heading text-2xl font-700 text-white sm:text-3xl">
              Enquiries Dashboard
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Review, track and resolve incoming website enquiries.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => adminKey && loadEnquiries(adminKey)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-600 text-white ring-1 ring-white/20 transition hover:bg-white/20 disabled:opacity-60"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-600 text-white ring-1 ring-white/20 transition hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              Lock
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map(({ label, value, Icon, accent }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-premium transition-shadow hover:shadow-premium-lg"
            >
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  accent
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-600 uppercase tracking-[0.1em] text-ink-600/80">
                  {label}
                </p>
                <p className="font-heading text-2xl font-700 tabular-nums text-navy">
                  {value}
                </p>
              </div>
            </div>
          ))}
          {!stats &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[92px] animate-pulse rounded-2xl border border-border bg-mist"
              />
            ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter by status"
            className="flex w-fit gap-1 rounded-xl bg-mist p-1 ring-1 ring-border"
          >
            {(["all", "new", "in-progress", "resolved"] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={statusFilter === s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-xs font-600 capitalize transition-all sm:text-sm",
                  statusFilter === s
                    ? "bg-navy text-white shadow-premium"
                    : "text-ink-600 hover:text-royal"
                )}
              >
                {s === "all" ? "All" : statusMeta[s].label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, subject..."
                aria-label="Search enquiries"
                className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:w-72"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
              className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-500 text-ink shadow-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadError && (
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-500 text-red-700 ring-1 ring-red-200">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            {loadError}
          </p>
        )}

        {/* List */}
        <div className="mt-6 space-y-3">
          {loading && enquiries.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-border bg-mist"
              />
            ))}

          {!loading && filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-mist/50 px-6 py-16 text-center">
              <Inbox className="mx-auto h-10 w-10 text-ink-600/30" />
              <p className="mt-4 font-heading text-lg font-600 text-navy">
                No enquiries found
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {enquiries.length === 0
                  ? "New enquiries from the contact form will appear here."
                  : "Try changing the filters or search query."}
              </p>
            </div>
          )}

          {filtered.map((enquiry) => (
            <button
              key={enquiry.id}
              type="button"
              onClick={() => openDetail(enquiry)}
              className={cn(
                "block w-full rounded-2xl border bg-white p-5 text-left shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-premium-lg",
                selected?.id === enquiry.id
                  ? "border-gold/60 ring-1 ring-gold/40"
                  : "border-border"
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-heading text-base font-700 text-navy">
                      {enquiry.name}
                    </p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.68rem] font-700",
                        statusMeta[enquiry.status].className
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          statusMeta[enquiry.status].dot
                        )}
                      />
                      {statusMeta[enquiry.status].label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[0.68rem] font-600 text-ink-600 ring-1 ring-border">
                      <Tag className="h-3 w-3" />
                      {enquiry.category}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-sm font-600 text-royal">
                    {enquiry.subject || "(No subject)"}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-600/80">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {enquiry.email}
                    </span>
                    {enquiry.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {enquiry.phone}
                      </span>
                    )}
                  </p>
                </div>
                <p className="flex shrink-0 items-center gap-1.5 text-xs font-500 text-ink-600/70">
                  <Clock className="h-3.5 w-3.5" />
                  {relativeTime(enquiry.createdAt)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) {
            setDetail(null);
            setConfirmDelete(false);
          }
        }}
      >
        <DialogContent className="max-w-xl overflow-hidden p-0">
          {detail && (
            <>
              <DialogHeader className="space-y-0 bg-navy px-6 py-5 text-left">
                <DialogTitle className="font-heading text-lg font-700 text-white">
                  {detail.name}
                </DialogTitle>
                <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {detail.email}
                  </span>
                  {detail.phone && (
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {detail.phone}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {relativeTime(detail.createdAt)}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-[50vh] overflow-y-auto px-6 py-5 scrollbar-premium">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-700",
                      statusMeta[detail.status].className
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        statusMeta[detail.status].dot
                      )}
                    />
                    {statusMeta[detail.status].label}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs font-600 text-ink-600 ring-1 ring-border">
                    <Tag className="h-3 w-3" />
                    {detail.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-royal-50 px-2.5 py-1 font-mono text-[0.68rem] text-royal ring-1 ring-royal/20">
                    {detail.id}
                  </span>
                </div>

                <h3 className="mt-4 text-xs font-700 uppercase tracking-[0.12em] text-royal">
                  Subject
                </h3>
                <p className="mt-1.5 text-sm font-600 text-navy">
                  {detail.subject || "(No subject)"}
                </p>

                <h3 className="mt-5 text-xs font-700 uppercase tracking-[0.12em] text-royal">
                  Message
                </h3>
                <p className="mt-1.5 whitespace-pre-wrap rounded-xl bg-mist p-4 text-sm leading-relaxed text-ink">
                  {detail.message ??
                    "Loading full message... (if this persists, the detail request failed — refresh and reopen.)"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border bg-mist/60 px-6 py-4">
                {detail.status !== "new" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(detail, "new")}
                    disabled={actionBusy === detail.id + "new"}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-600 text-ink-600 ring-1 ring-border transition hover:text-royal disabled:opacity-60"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Reopen
                  </button>
                )}
                {detail.status !== "in-progress" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(detail, "in-progress")}
                    disabled={actionBusy === detail.id + "in-progress"}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-saffron px-3.5 py-2 text-xs font-600 text-white transition hover:bg-saffron-600 disabled:opacity-60"
                  >
                    <Timer className="h-3.5 w-3.5" />
                    In Progress
                  </button>
                )}
                {detail.status !== "resolved" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(detail, "resolved")}
                    disabled={actionBusy === detail.id + "resolved"}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-green-700 px-3.5 py-2 text-xs font-600 text-white transition hover:bg-green-800 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Resolve
                  </button>
                )}

                <span className="flex-1" />

                {confirmDelete ? (
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-600 text-red-700">
                      Delete permanently?
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteEnquiry(detail)}
                      disabled={actionBusy === detail.id + "delete"}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-700 px-3.5 py-2 text-xs font-600 text-white transition hover:bg-red-800 disabled:opacity-60"
                    >
                      {actionBusy === detail.id + "delete" ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="rounded-xl bg-white px-3 py-2 text-xs font-600 text-ink-600 ring-1 ring-border"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-600 text-red-700 ring-1 ring-red-200 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
