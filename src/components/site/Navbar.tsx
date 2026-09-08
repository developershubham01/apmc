"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
          ? "bg-white/95 backdrop-blur-md shadow-premium"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="h-0.5 w-full bg-gradient-to-r from-navy via-royal to-gold"
      />
      <nav
        className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{ height: scrolled ? 64 : 76 }}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Kirti Rana — Home"
        >
          <span className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-royal text-gold shadow-premium ring-1 ring-gold/40">
            <span className="font-heading text-base font-700 leading-none">
              KR
            </span>
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold ring-2 ring-white"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-base sm:text-lg font-700 tracking-wide text-navy">
              KIRTI RANA
            </span>
            <span className="mt-1 hidden sm:block text-[0.62rem] font-500 uppercase tracking-[0.18em] text-ink-600/80">
              {siteConfig.subtitle}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isMedia = link.href === "/media";
            return (
              <li
                key={link.href}
                className={isMedia ? "group relative" : undefined}
              >
                <Link
                  href={link.href}
                  aria-haspopup={isMedia ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[0.82rem] font-500 rounded-md transition-colors inline-flex items-center gap-1",
                    active
                      ? "text-royal"
                      : "text-ink hover:text-royal hover:bg-royal-50"
                  )}
                >
                  {link.label}
                  {isMedia && (
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </Link>

                {/* Media dropdown (hover / keyboard focus) */}
                {isMedia && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium-lg">
                      <p className="border-b border-border bg-mist/70 px-4 py-2.5 text-[0.62rem] font-700 uppercase tracking-[0.16em] text-royal">
                        Media Desk
                      </p>
                      <Link
                        href="/media"
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-royal-50"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold ring-1 ring-gold/30">
                          <Newspaper className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-600 text-navy">
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
                            className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-royal-50"
                          >
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-600 ring-1 ring-gold/30">
                              <SubIcon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-600 text-navy">
                                {category.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-ink-600">
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
          className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-mist transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-300 ease-out bg-white border-t border-border",
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
                      ? "bg-navy text-white"
                      : "text-ink hover:bg-royal-50 hover:text-royal"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        active ? "text-gold" : "text-royal"
                      )}
                    />
                    {link.label}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-1",
                      active ? "text-gold" : "text-ink-600/60"
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
                      ? "bg-royal-50 text-royal"
                      : "text-ink-600 hover:bg-royal-50 hover:text-royal"
                  )}
                >
                  <SubIcon
                    className={cn(
                      "h-4 w-4",
                      subActive ? "text-royal" : "text-gold-600"
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
