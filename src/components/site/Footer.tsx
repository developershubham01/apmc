import Link from "next/link";
import { ExternalLink, MapPin, Store, ArrowUpRight, Newspaper } from "lucide-react";
import { footerQuickLinks, footerOrganizations, siteConfig } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto relative bg-navy text-white">
      {/* Top gold accent */}
      <div
        aria-hidden
        className="h-1 w-full bg-gradient-to-r from-gold via-saffron to-gold"
      />
      <div className="bg-navy-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid gap-10 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-gold/40 text-gold font-heading font-700">
                  KR
                </span>
                <div className="leading-tight">
                  <p className="font-heading text-lg font-700 tracking-wide">
                    KIRTI RANA
                  </p>
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-white/55">
                    Est. Business Leadership
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-xs">
                {siteConfig.tagline}
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.location}</span>
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-heading text-sm font-600 uppercase tracking-[0.18em] text-gold">
                Quick Links
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            <div>
              <h3 className="font-heading text-sm font-600 uppercase tracking-[0.18em] text-gold">
                Organizations
              </h3>
              <ul className="mt-5 space-y-3">
                {footerOrganizations.map((org) => (
                  <li key={org}>
                    <Link
                      href="/organizations"
                      className="group flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold" />
                      <span>{org}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/business"
                    className="group flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold" />
                    <span>Kisan Kirti Agro Pvt. Ltd.</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Official resource */}
            <div>
              <h3 className="font-heading text-sm font-600 uppercase tracking-[0.18em] text-gold">
                Official Resource
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={siteConfig.mumbaiApmcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    <Store className="mt-0.5 h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold" />
                    <span className="flex items-center gap-1">
                      Mumbai APMC
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.dailyRatesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    <span className="mt-0.5 h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex items-center gap-1">
                      Daily Market Rates
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.16em] text-gold/80">
                  APMC Location
                </p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {siteConfig.apmcAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter band */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-gold/25">
            <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1.1fr_1.4fr] lg:items-center lg:gap-10">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/40 text-gold sm:flex"
                >
                  <Newspaper className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-700 text-white sm:text-lg">
                    Market Updates &amp; Chamber News
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    Monthly APMC price round-ups, chamber events and trade circulars —
                    straight to your inbox. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
              <NewsletterForm />
            </div>
            <div
              aria-hidden
              className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-xs text-white/55 text-center sm:text-left">
              © {year} Kirti Rana. All Rights Reserved.
            </p>
            <p className="text-xs text-white/45">
              Business Leadership • Merchant Community • Agriculture &amp; Trade
            </p>
            <Link
              href="/admin/enquiries"
              className="text-xs text-white/35 transition-colors hover:text-gold"
              aria-label="Admin area (restricted)"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
