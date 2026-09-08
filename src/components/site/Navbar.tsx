"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  CalendarRange,
  HeartHandshake,
  Megaphone,
  Newspaper,
  Award,
} from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { mediaCategories } from "@/data/media";
import { cn } from "@/lib/utils";

const mediaSubIcons: Record<string, typeof CalendarRange> = {
  events: CalendarRange,
  "social-activities": HeartHandshake,
  news: Megaphone,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-navy/95 backdrop-blur-md shadow-premium-lg border-b border-gold/20"
          : "bg-navy/85 backdrop-blur-sm border-b border-white/10"
      )}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="h-0.5 w-full bg-gradient-to-r from-gold via-amber-300 to-gold"
      />
      <nav
        className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{ height: scrolled ? 66 : 78 }}
        aria-label="Primary"
      >
        {/* Logo with official Chamber Emblem */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Kirti Rana — Home"
        >
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-white p-0.5 shadow-gold-glow ring-2 ring-gold/60 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Navi Mumbai Merchants Chamber Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg sm:text-xl font-800 tracking-wide text-white group-hover:text-gold transition-colors">
                KIRTI RANA
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/30 px-2 py-0.5 text-[0.62rem] font-700 text-gold uppercase tracking-wider">
                President
              </span>
            </div>
            <span className="mt-1 hidden sm:block text-[0.62rem] font-500 uppercase tracking-[0.16em] text-white/70">
              Navi Mumbai Merchants&apos; Chamber
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isMedia = link.href === "/media";
            const isAchievements = link.href === "/achievements";
            return (
              <li
                key={link.href}
                className={isMedia ? "group relative" : undefined}
              >
                <Link
                  href={link.href}
                  aria-haspopup={isMedia ? "true" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-[0.82rem] font-600 rounded-lg transition-all inline-flex items-center gap-1.5",
                    active
                      ? "text-gold bg-white/10 shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/5",
                    isAchievements && !active && "text-amber-300/90 font-700"
                  )}
                >
                  {isAchievements && <Award className="h-3.5 w-3.5 text-gold" />}
                  {link.label}
                  {isMedia && (
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gold shadow-gold-glow"
                    />
                  )}
                </Link>

                {/* Media dropdown */}
                {isMedia && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-full z-50 w-68 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gold/20 bg-navy-900/98 backdrop-blur-xl shadow-2xl p-1">
                      <p className="border-b border-white/10 bg-white/5 px-4 py-2.5 text-[0.62rem] font-700 uppercase tracking-[0.16em] text-gold">
                        Media Desk &amp; Press
                      </p>
                      <Link
                        href="/media"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold ring-1 ring-gold/40">
                          <Newspaper className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-600 text-white">
                          Media Overview
                        </span>
                      </Link>
                      {mediaCategories.map((category) => {
                        const SubIcon =
                          mediaSubIcons[category.slug] ?? Newspaper;
                        return (
                          <Link
                            key={category.slug}
                            href={`/media/${category.slug}`}
                            className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                          >
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold ring-1 ring-gold/30">
                              <SubIcon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-600 text-white">
                                {category.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-white/60">
                                {category.tagline}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-300 ease-out bg-navy-950 border-t border-gold/20",
          open ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col px-4 py-4 gap-1 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-premium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-500 transition-colors",
                    active
                      ? "bg-white/15 text-gold font-700"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        active ? "text-gold" : "text-amber-400"
                      )}
                    />
                    {link.label}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-1",
                      active ? "text-gold" : "text-white/40"
                    )}
                  />
                </Link>
              </li>
            );
          })}

          {/* Media sub-sections (mobile) */}
          {mediaCategories.map((category) => {
            const SubIcon = mediaSubIcons[category.slug] ?? Menu;
            const subActive = pathname === `/media/${category.slug}`;
            return (
              <li key={`media-sub-${category.slug}`}>
                <Link
                  href={`/media/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "ml-11 flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-500 transition-colors",
                    subActive
                      ? "bg-white/15 text-gold font-600"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <SubIcon
                    className={cn(
                      "h-4 w-4",
                      subActive ? "text-gold" : "text-amber-400"
                    )}
                  />
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
