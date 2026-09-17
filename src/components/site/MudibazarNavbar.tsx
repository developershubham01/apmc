"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Store,
  Scale,
  TrendingUp,
  History,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccessibilityControls } from "./AccessibilityControls";

export function MudibazarNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "/mudibazar#hero", icon: Store },
    { label: "Wholesale Rates", href: "/mudibazar#commodity-rates", icon: TrendingUp },
    { label: "Trade Heritage", href: "/mudibazar#history", icon: History },
    { label: "Arbitration Cell", href: "/mudibazar#dispute-cell", icon: Scale },
    { label: "Executive Committee", href: "/mudibazar#committee", icon: Users },
    { label: "Helpdesk & Offices", href: "/mudibazar#contact-section", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Heritage Info Strip */}
      <div className="bg-gradient-to-r from-[#031710] via-[#042017] to-[#031710] py-2 px-4 border-b border-[#D97706]/30 text-white text-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-white shadow">
              <Sparkles className="h-3 w-3 text-amber-200" />
              ESTD. 1969
            </span>
            <span className="font-semibold text-emerald-200 hidden sm:inline">
              Bombay Mudibazar Kariana Merchants Association (BMKMA)
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <span className="hidden md:flex items-center gap-1.5 text-amber-300 font-medium">
              <Phone className="h-3.5 w-3.5 text-[#D97706]" />
              <span>+91 (022) 2342-5500</span>
            </span>

            <LanguageSwitcher />
            <AccessibilityControls />

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-white/10 px-3 py-1 text-[0.72rem] font-bold text-amber-300 hover:bg-amber-400 hover:text-[#042017] transition-all"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Main APMC Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Dedicated Header Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#042017]/95 shadow-2xl backdrop-blur-md border-b border-[#D97706]/40 py-2.5"
            : "bg-[#042017] border-b border-[#D97706]/30 py-3.5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mudibazar Crest & Brand Identity */}
          <Link href="/mudibazar" className="group flex items-center gap-3">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border-2 border-[#D97706] bg-white shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 ring-2 ring-amber-500/20">
              <Image
                src="/images/association-crest.png"
                alt="Bombay Mudibazar Kariana Merchants Association Crest"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-heading font-black text-[#FBBF24] text-base sm:text-lg md:text-xl tracking-tight group-hover:text-amber-300 transition-colors">
                BOMBAY MUDIBAZAR
              </span>
              <span className="text-[0.65rem] sm:text-[0.75rem] font-extrabold uppercase tracking-widest text-emerald-300 group-hover:text-white transition-colors">
                Kariana Merchants Association
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-emerald-100">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 hover:text-[#FBBF24] transition-colors py-1 border-b-2 border-transparent hover:border-[#D97706]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#D97706]" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/mudibazar#dispute-cell"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-[#D97706]/20 px-4 py-2 text-xs font-extrabold text-amber-300 hover:bg-[#D97706] hover:text-white transition-all shadow-md"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Arbitration Cell</span>
            </a>
            <a
              href="/mudibazar#membership-form"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-5 py-2 text-xs font-black text-white hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg uppercase tracking-wider"
            >
              <span>Membership</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl border border-amber-400/30 p-2 text-amber-300 hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D97706]/30 bg-[#042017] px-4 py-5 space-y-3 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-sm font-bold text-emerald-100 hover:bg-white/10 hover:text-amber-300 transition-colors border border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-[#D97706]" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-emerald-400" />
                </a>
              );
            })}

            <div className="pt-3 border-t border-white/10 grid gap-2">
              <a
                href="/mudibazar#dispute-cell"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/20 py-3 text-xs font-extrabold text-amber-300"
              >
                <Scale className="h-4 w-4" />
                <span>Commercial Arbitration Cell</span>
              </a>
              <a
                href="/mudibazar#membership-form"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] py-3 text-xs font-black text-white uppercase tracking-wider"
              >
                <span>Merchant Membership Inquiry</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
