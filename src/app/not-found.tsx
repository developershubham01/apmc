import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { navLinks } from "@/data/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-navy px-4 py-20 text-white">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-royal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-heading text-[7rem] sm:text-[10rem] font-800 leading-none text-gold-gradient">
          404
        </p>
        <span aria-hidden className="mx-auto block gold-hairline" />
        <h1 className="mt-6 font-heading text-2xl sm:text-3xl font-700">
          Page Not Found
        </h1>
        <p className="mt-3 text-pretty text-white/70">
          The page you are looking for doesn&apos;t exist or has been moved.
          Please use the navigation below to find what you need.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-600 text-navy shadow-gold-glow transition-all hover:bg-gold-600 hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-600 text-white transition-all hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        <div className="mt-10">
          <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-white/50">
            <Search className="h-3.5 w-3.5" />
            Quick Links
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-500 text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
