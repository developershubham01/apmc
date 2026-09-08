"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Inbox,
  LogOut,
  Lock,
  Loader2,
  ShieldAlert,
  LineChart,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnquiriesPanel } from "./EnquiriesPanel";
import { RatesPanel } from "./RatesPanel";
import { SubscribersPanel } from "./SubscribersPanel";

const STORAGE_KEY = "kr-admin-key";

type AdminTab = "enquiries" | "rates" | "subscribers";

const tabs: { id: AdminTab; label: string; Icon: typeof Inbox }[] = [
  { id: "enquiries", label: "Enquiries", Icon: Inbox },
  { id: "rates", label: "Market Rates", Icon: LineChart },
  { id: "subscribers", label: "Subscribers", Icon: Users },
];

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [booted, setBooted] = useState(false);
  const [tab, setTab] = useState<AdminTab>("enquiries");

  const verifyKey = useCallback(async (key: string) => {
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
  }, []);

  // Restore saved key on mount
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setBooted(true);
    if (saved) verifyKey(saved);
  }, [verifyKey]);

  const handleAuthError = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAdminKey(null);
    setAuthError("Your session expired. Please enter the admin key again.");
  }, []);

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAdminKey(null);
    setKeyInput("");
    setTab("enquiries");
  };

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
                Enter the admin key to open the control centre.
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
              Control Centre
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Enquiries, market rates and newsletter subscribers — all in one place.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
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
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Admin sections"
          className="flex w-fit gap-1 rounded-2xl bg-mist p-1.5 ring-1 ring-border"
        >
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-700 transition-all sm:text-sm",
                tab === id
                  ? "bg-navy text-white shadow-premium"
                  : "text-ink-600 hover:text-royal"
              )}
            >
              <Icon className={cn("h-4 w-4", tab === id && "text-gold")} />
              {label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="mt-8" role="tabpanel">
          {tab === "enquiries" && (
            <EnquiriesPanel adminKey={adminKey} onAuthError={handleAuthError} />
          )}
          {tab === "rates" && (
            <RatesPanel adminKey={adminKey} onAuthError={handleAuthError} />
          )}
          {tab === "subscribers" && (
            <SubscribersPanel adminKey={adminKey} onAuthError={handleAuthError} />
          )}
        </div>
      </div>
    </div>
  );
}
