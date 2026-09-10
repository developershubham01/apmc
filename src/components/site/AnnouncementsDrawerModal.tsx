"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Megaphone,
  Calendar,
  FileText,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { chamberAnnouncements, ChamberAnnouncement } from "@/data/announcements";

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAnnouncement?: ChamberAnnouncement | null;
}

export function AnnouncementsModal({
  isOpen,
  onClose,
  selectedAnnouncement,
}: AnnouncementsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcements-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/30 bg-[#070e22] text-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-navy-900 via-royal/40 to-navy-900 px-5 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-500 text-white shadow-md">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="announcements-title"
                className="font-heading text-base sm:text-lg font-bold text-white tracking-wide"
              >
                Official Chamber Circulars & Notices
              </h2>
              <p className="text-[0.72rem] text-slate-300">
                Navi Mumbai Merchants Chamber • APMC Turbhe
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-3.5 scrollbar-premium">
          {chamberAnnouncements.map((item) => {
            const isHighlighted = selectedAnnouncement?.id === item.id;
            return (
              <div
                key={item.id}
                className={`group rounded-2xl border p-4 transition-all duration-200 ${
                  isHighlighted
                    ? "border-amber-400/80 bg-amber-500/10 shadow-lg ring-1 ring-amber-400/40"
                    : "border-white/10 bg-white/5 hover:border-amber-400/40 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                        item.isUrgent
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : item.category === "circular"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : item.category === "event"
                          ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {item.category === "rates" && <TrendingUp className="h-3 w-3" />}
                      {item.category === "trade" && <Globe2 className="h-3 w-3" />}
                      {item.categoryLabel}
                    </span>
                    {item.isUrgent && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-[0.7rem] text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-heading text-sm sm:text-[0.95rem] font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-white/10 text-xs">
                  {item.fileSize ? (
                    <span className="inline-flex items-center gap-1 text-[0.7rem] text-slate-400 font-medium">
                      <FileText className="h-3.5 w-3.5 text-amber-400/80" />
                      {item.fileSize}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-500/20 px-3 py-1 font-semibold text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all text-xs"
                  >
                    <span>View Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-navy-950/90 px-5 sm:px-6 py-3 flex items-center justify-between text-[0.75rem] text-slate-400">
          <span>APMC Market Secretariat Turbhe</span>
          <Link
            href="/media/news"
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
          >
            All Press Releases & Archive
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
