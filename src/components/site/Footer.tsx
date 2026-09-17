"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  MapPin,
  Store,
  ArrowUpRight,
  Newspaper,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Cookie,
} from "lucide-react";
import { footerQuickLinks, footerOrganizations, siteConfig } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-auto relative bg-[#042017] text-white border-t border-white/10">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid gap-10 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Organization & Leadership Identity */}
            <div className="lg:col-span-1">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  {/* Left Emblem: Navi Mumbai Merchants Chamber */}
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-white shadow-md border border-[#D1E7DD] overflow-hidden transition-transform group-hover:scale-105">
                    <Image
                      src="/images/nmmc-logo.png"
                      alt="Navi Mumbai Merchants Chamber Logo"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  {/* Right Emblem: Association Crest */}
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-white shadow-md border border-[#D1E7DD] overflow-hidden transition-transform group-hover:scale-105">
                    <Image
                      src="/images/association-crest.png"
                      alt="Bombay Mudibazar Kariana Merchants Association Emblem"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                </div>
                <div className="leading-tight">
                  <p className="font-heading text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#10B981] transition-colors">
                    {t("hero.chamberTitle", "Navi Mumbai Merchants Chamber")}
                  </p>
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-[#10B981] font-bold mt-0.5">
                    Shri Kirti Rana • Apex Voice of APMC
                  </p>
                </div>
              </Link>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xs">
                Apex commercial federation orchestrating trade across the dedicated 50-acre APMC Turbhe wholesale market complex for over three decades.
              </p>

              {/* Location & Contact Info */}
              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>C-64, APMC Masala Market-1 &amp; Market-2, Vashi, Navi Mumbai - 400 703</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                  <span>+91 98201 87911 / 022-4974 4533 / 022-4984 1933</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                  <span>nmmc11992@gmail.com • mudibazar4u@hotmail.com</span>
                </p>
              </div>

              {/* Social Media Channels */}
              <div className="mt-5 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Chamber ${social.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-[#059669] hover:text-white transition-all duration-200 border border-white/15"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#10B981] flex items-center gap-1.5">
                <span>Quick Links</span>
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-[#059669] transition-all duration-300 group-hover:w-2.5"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/board"
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-[#059669] transition-all duration-300 group-hover:w-2.5"
                    />
                    Board of Directors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/achievements"
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-[#059669] transition-all duration-300 group-hover:w-2.5"
                    />
                    Honours & Awards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Organizations & Federations */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#10B981] flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>Trade Bodies</span>
              </h3>
              <ul className="mt-5 space-y-2.5">
                {footerOrganizations.map((org) => (
                  <li key={org}>
                    <Link
                      href="/organizations"
                      className="group flex items-start gap-2 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      <span>{org}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/business"
                    className="group flex items-start gap-2 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    <span>Kisan Kirti Agro Pvt. Ltd.</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Official APMC Resources & Secretariat */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#10B981] flex items-center gap-1.5">
                <Store className="h-4 w-4" />
                <span>APMC Portal</span>
              </h3>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <a
                    href={siteConfig.mumbaiApmcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <Store className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                    <span className="flex items-center gap-1">
                      Mumbai APMC Official Portal
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/apmc#market-rates"
                    className="group flex items-start gap-2 text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#34D399]" />
                    <span className="flex items-center gap-1">
                      Daily Wholesale Rates Board
                      <ArrowUpRight className="h-3 w-3 text-[#10B981]" />
                    </span>
                  </Link>
                </li>
              </ul>

              {/* APMC Complex Location Box */}
              <div className="mt-5 rounded-2xl bg-white/5 p-3.5 border border-white/10 backdrop-blur-sm">
                <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[#10B981] font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  APMC Secretariat Turbhe
                </p>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  {siteConfig.apmcAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Band in Meta rounded-[28px] style */}
          <div className="mt-12 overflow-hidden rounded-[28px] bg-[#06281E] border border-white/10 shadow-xl">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center lg:gap-10">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-[#10B981] sm:flex shadow-sm"
                >
                  <Newspaper className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-white sm:text-lg tracking-tight">
                    APMC Market Bulletins &amp; Chamber Circulars
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-300">
                    Receive weekly wholesale rate roundups, export trade circulars, and official chamber advisories directly in your inbox.
                  </p>
                </div>
              </div>
              <NewsletterForm />
            </div>
          </div>

          {/* Bottom Copyright & Legal Bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              © {year} Navi Mumbai Merchants Chamber • Shri Kirti Rana. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                aria-label="Cookie & Privacy Preferences"
              >
                <Cookie className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Cookie Preferences</span>
              </button>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:text-white transition-colors"
                aria-label="Admin Control Centre"
              >
                <span>Admin Portal</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
