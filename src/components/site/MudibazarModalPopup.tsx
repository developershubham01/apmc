"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Store,
  Building2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Wheat,
  Globe,
  Award,
} from "lucide-react";

export function MudibazarModalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user previously selected or dismissed popup in this session
    const hasSeenPopup = sessionStorage.getItem("bmkma_portal_prompt_seen");
    if (!hasSeenPopup) {
      // Small delay for smooth entry after hydration
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("bmkma_portal_prompt_seen", "true");
  };

  const handleGoToMudibazar = () => {
    sessionStorage.setItem("bmkma_portal_prompt_seen", "true");
    setIsOpen(false);
    router.push("/mudibazar");
  };

  const handleStayOnMain = () => {
    sessionStorage.setItem("bmkma_portal_prompt_seen", "true");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Quick Gateway Pill at Bottom Left */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-[#D97706]/40 bg-[#042017]/95 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-[#D97706] hover:bg-[#042017]"
          title="Open Bombay Mudibazar Association Gateway"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#D97706] to-[#059669] text-white font-serif text-xs font-black shadow-inner">
            M
          </div>
          <span className="text-emerald-300 font-medium">Bombay Mudibazar Portal</span>
          <span className="rounded-md bg-[#D97706] px-1.5 py-0.5 text-[0.65rem] font-extrabold uppercase text-white shadow">
            Official
          </span>
        </button>
      </div>

      {/* Modal Dialog Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mudibazar-gateway-title"
        >
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-[#042017]/80 backdrop-blur-md transition-opacity animate-in fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[#D97706]/40 bg-gradient-to-b from-[#042017] via-[#062e21] to-[#041a12] text-white shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Top Ornamental Header Bar */}
            <div className="relative flex items-center justify-between border-b border-[#D97706]/30 bg-gradient-to-r from-[#042017] via-[#0b3d2c] to-[#042017] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D97706]/50 bg-gradient-to-tr from-[#D97706] via-[#B45309] to-[#059669] shadow-md">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#FBBF24]">
                    <Sparkles className="h-3 w-3" />
                    SELECT TRADE PORTAL EXPERIENCE
                  </span>
                  <h2
                    id="mudibazar-gateway-title"
                    className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tight"
                  >
                    Welcome to the Agri-Commodities Trade Ecosystem
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body & Portal Choice Cards */}
            <div className="p-5 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-emerald-100/90 text-center max-w-xl mx-auto leading-relaxed">
                Choose your desired website view to explore wholesale commodity market rates, merchant association portals, and trade leadership under Chairman <strong className="text-amber-300">Shri Kirti Rana</strong>.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Option 1: Dedicated Bombay Mudibazar Website Card */}
                <div
                  onClick={handleGoToMudibazar}
                  className="group relative cursor-pointer flex flex-col justify-between rounded-2xl border-2 border-[#D97706] bg-gradient-to-b from-[#083526] to-[#042017] p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-400 hover:shadow-2xl ring-1 ring-amber-500/20"
                >
                  <div className="absolute top-3 right-3 rounded-full bg-[#D97706] px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-white shadow">
                    Recommended
                  </div>

                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      <Wheat className="h-6 w-6" />
                    </div>

                    <span className="text-[0.7rem] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                      Dedicated Association Site
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                      Bombay Mudibazar Kariana Merchants Association
                    </h3>
                    <p className="mt-2.5 text-xs text-emerald-100/80 leading-relaxed">
                      Century-old wholesale trade portal featuring daily commodity price tickers, trade dispute arbitration cell, committee directory &amp; member benefits.
                    </p>

                    <div className="mt-4 space-y-1.5 text-[0.75rem] text-amber-200/90 font-medium">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>Live Wholesale Commodity Rates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Scale className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>Commercial Dispute Resolution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>Estd. 1969 Heritage Trade Ethos</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all group-hover:from-amber-500 group-hover:to-amber-600"
                  >
                    <span>Visit Mudibazar Website</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Option 2: Main APMC & Kirti Rana Portal Card */}
                <div
                  onClick={handleStayOnMain}
                  className="group relative cursor-pointer flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-[#05261c]/80 p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:bg-[#073326]"
                >
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <Building2 className="h-6 w-6" />
                    </div>

                    <span className="text-[0.7rem] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                      Main Official Portal
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-black text-white group-hover:text-emerald-200 transition-colors leading-tight">
                      Shri Kirti Rana &amp; APMC Trade Portal
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                      Navi Mumbai Merchants Chamber, CAIT national trade conventions, 50-acre spice complex, and business portfolio.
                    </p>

                    <div className="mt-4 space-y-1.5 text-[0.75rem] text-emerald-100/80 font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>Navi Mumbai Merchants Chamber</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>CAIT &amp; National Trader Leadership</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>APMC Market Yard Turbhe</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-white/10 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-white/20"
                  >
                    <span>Continue to Main APMC Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="border-t border-[#D97706]/20 bg-[#03150e] px-6 py-3.5 flex items-center justify-between text-[0.75rem] text-emerald-200/70">
              <span>Chaired by Shri Kirti Rana • APMC Market Navi Mumbai</span>
              <button
                onClick={handleClose}
                className="font-semibold text-amber-400 hover:underline"
              >
                Dismiss Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
