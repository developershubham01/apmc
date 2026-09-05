"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

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
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-[0.82rem] font-500 rounded-md transition-colors",
                    active
                      ? "text-royal"
                      : "text-ink hover:text-royal hover:bg-royal-50"
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </Link>
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
        </ul>
      </div>
    </header>
  );
}
