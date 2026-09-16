"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail, Send, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    if (!email.trim()) {
      setState("error");
      setMessage("Please enter your email address.");
      return;
    }

    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website: honeypot, source: "footer" }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setState("success");
        setMessage(data?.message ?? "Subscribed. Thank you!");
        setEmail("");
      } else {
        setState("error");
        setMessage(data?.error ?? "Could not subscribe right now. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please check your connection and retry.");
    }
  };

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-[#059669]/30"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
        <div>
          <p className="text-sm font-bold text-white">You are on the list.</p>
          <p className="mt-0.5 text-xs leading-relaxed text-white/70">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") {
                setState("idle");
                setMessage(null);
              }
            }}
            placeholder="Your email address"
            autoComplete="email"
            className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/30"
          />
        </div>
        {/* Honeypot — invisible to humans, catnip for bots */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#059669] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#047857] active:scale-95 disabled:opacity-60"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Subscribe
            </>
          )}
        </button>
      </div>

      {state === "error" && message && (
        <p
          role="alert"
          className={cn(
            "mt-2.5 flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-500 text-red-200 ring-1 ring-red-400/30"
          )}
        >
          <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
          {message}
        </p>
      )}
    </form>
  );
}
