"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Megaphone,
  Lock,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  Users,
  Store,
  FileText,
  HeartHandshake,
  Newspaper,
  Image as ImageIcon,
  Mail,
  Scale,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccessibilityControls } from "./AccessibilityControls";
import { chamberAnnouncements, ChamberAnnouncement } from "@/data/announcements";
import { AnnouncementsModal } from "./AnnouncementsDrawerModal";
import { MudibazarNavbar } from "./MudibazarNavbar";

// Social links configuration
const socialLinks = [
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// Navigation Structure with Dropdown Sub-Items
interface SubNavItem {
  title: string;
  description?: string;
  href: string;
  icon?: typeof Building2;
}

interface NavItem {
  key: string;
  defaultLabel: string;
  href: string;
  items?: SubNavItem[];
}

const mainNavItems: NavItem[] = [
  {
    key: "nav.about",
    defaultLabel: "About",
    href: "/about",
    items: [
      {
        title: "Navi Mumbai Merchants Chamber",
        description: "Apex commercial body of 400+ enterprises & 50-acre complex",
        href: "/about/chamber",
        icon: Building2,
      },
      {
        title: "Bombay Mudibazar Dedicated Website",
        description: "Official standalone website with live rates, arbitration & committee portal",
        href: "https://mudhibazar.vercel.app/",
        icon: Store,
      },
      {
        title: "About Shri Kirti Rana",
        description: "President profile, 30+ yrs leadership & visionary desk",
        href: "/about",
        icon: Users,
      },
      {
        title: "Governing Board of Directors",
        description: "Official chamber office bearers & directory",
        href: "/board",
        icon: Award,
      },
    ],
  },
  {
    key: "nav.organizations",
    defaultLabel: "Organizations",
    href: "/organizations",
    items: [
      {
        title: "All Affiliated Trade Bodies",
        description: "Chamber network spanning state & national federations",
        href: "/organizations",
        icon: Building2,
      },
      {
        title: "Navi Mumbai APMC Market Hub",
        description: "50-Acre Turbhe commercial agro trading complex",
        href: "/apmc",
        icon: Store,
      },
      {
        title: "5 APMC Wholesale Markets",
        description: "Market-I, Market-II, Spices, Grain, Onion & Potato",
        href: "/apmc#markets",
        icon: Scale,
      },
      {
        title: "Federation of Associations of Maharashtra (FAM)",
        description: "Apex commercial federation representing 750+ bodies",
        href: "/organizations#fam",
        icon: Award,
      },
      {
        title: "Navi Mumbai Merchants Chamber",
        description: "Primary wholesale trade body at APMC Turbhe",
        href: "/organizations#nmmc",
        icon: Users,
      },
      {
        title: "Grain, Rice & Oilseeds Merchants Assoc. (GROMA)",
        description: "Premier grain trade association founded in 1947",
        href: "/organizations#groma",
        icon: Building2,
      },
    ],
  },
  {
    key: "nav.business",
    defaultLabel: "Business",
    href: "/business",
    items: [
      {
        title: "Agro-Commodity Export Desk",
        description: "Global export facilitation & trade certifications",
        href: "/business",
        icon: TrendingUp,
      },
      {
        title: "Trade Dispute Redressal Cell",
        description: "Arbitration & fair merchant commercial grievance resolution",
        href: "/business#dispute",
        icon: Scale,
      },
      {
        title: "Merchant Welfare & Services",
        description: "Licensing assistance & banking liaison",
        href: "/business#services",
        icon: FileText,
      },
    ],
  },
  {
    key: "nav.achievements",
    defaultLabel: "Honours",
    href: "/achievements",
    items: [
      {
        title: "Honours & Lifetime Awards",
        description: "State & national accolades conferred upon Shri Kirti Rana",
        href: "/achievements",
        icon: Award,
      },
      {
        title: "Policy Advocacy & Reforms",
        description: "GST rationalization & APMC market modernization",
        href: "/achievements#milestones",
        icon: Sparkles,
      },
    ],
  },
  {
    key: "nav.media",
    defaultLabel: "Media & Press",
    href: "/media",
    items: [
      {
        title: "Media Desk & Press Releases",
        description: "Official statements & press coverage",
        href: "/media",
        icon: Newspaper,
      },
      {
        title: "Events & Trade Summits",
        description: "Annual conventions, delegations & inaugurations",
        href: "/media/events",
        icon: Calendar,
      },
      {
        title: "Social Welfare Initiatives",
        description: "Community outreach, flood relief & healthcare drives",
        href: "/media/social-activities",
        icon: HeartHandshake,
      },
      {
        title: "News & National Coverage",
        description: "Print, digital & television interviews",
        href: "/media/news",
        icon: Megaphone,
      },
    ],
  },
  {
    key: "nav.gallery",
    defaultLabel: "Gallery",
    href: "/gallery",
  },
  {
    key: "nav.contact",
    defaultLabel: "Contact Us",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<ChamberAnnouncement | null>(null);
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

  const { t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll listener for sticky header elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Announcements cycling ticker (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % chamberAnnouncements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href?: string) => {
    if (typeof window !== "undefined") {
      if (href && href.includes("#")) {
        const parts = href.split("#");
        const hash = parts[1];
        if (hash) {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleOpenNotice = (item: ChamberAnnouncement) => {
    setSelectedNotice(item);
    setIsModalOpen(true);
  };

  const currentNotice = chamberAnnouncements[currentTickerIndex] || chamberAnnouncements[0];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/achievements") return pathname.startsWith("/achievements") || pathname.startsWith("/honours");
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[120] transition-all duration-300 font-sans",
          scrolled || open
            ? "shadow-md backdrop-blur-md"
            : ""
        )}
      >
        {/* =========================================================
            TIER 1: Top Notification Bar — Official Header Strip (High Contrast Navy & Gold)
            ========================================================= */}
        <aside className="bg-[#042017] text-slate-100 text-xs py-2 border-b border-[#059669]/40 select-none shadow-inner">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#BF2B26] text-white tracking-wider uppercase shadow-sm">
                Pride of Asia
              </span>
              <span className="text-slate-200 font-medium hidden sm:inline">
                National APMC Trading Hub • 250-Acre Swadeshi Complex • ITPO &amp; CAIT Joint Initiative
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 text-slate-200 text-xs">
              <span className="flex items-center gap-1.5">
                <strong className="text-[#F59E0B]">Tel:</strong> <span className="text-white font-semibold">+91 98201 87911 / 022-4974 4533</span>
              </span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:inline flex items-center gap-1.5">
                <strong className="text-[#F59E0B]">Email:</strong> <span className="text-white font-semibold">nmmc11992@gmail.com</span>
              </span>
            </div>
          </div>
        </aside>

        {/* =========================================================
            TIER 1: Institutional Top Bar (Luminous White & Mint Strip)
            Meta-styled announcement strip & language controls
            ========================================================= */}
        <div className="bg-[#F0FDF4] text-[#042017] border-b border-[#D1E7DD] text-xs select-none">
          <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-3 sm:px-6 h-9 sm:h-10">
            {/* Left: Announcements Pill Badge + Live Cycling Ticker */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 mr-2 sm:mr-4">
              {/* Meta Pill Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedNotice(null);
                  setIsModalOpen(true);
                }}
                className="group inline-flex items-center gap-1.5 rounded-full bg-[#BF2B26] hover:bg-[#9C1E1A] text-white font-bold text-[0.68rem] sm:text-[0.72rem] tracking-wide px-3 sm:px-3.5 py-1 shadow-sm transition-all duration-200 shrink-0"
                aria-label="View all official chamber announcements"
              >
                <Megaphone className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-bounce text-white drop-shadow" />
                <span>Announcements</span>
                <ChevronDown className="h-3 w-3 text-white group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Ticker Content with Pulsating Indicator */}
              <div className="flex items-center gap-2 min-w-0 overflow-hidden cursor-pointer">
                {/* Pulse Dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF2B26] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BF2B26]"></span>
                </span>

                {/* Animated Notice Headline */}
                <button
                  type="button"
                  onClick={() => handleOpenNotice(currentNotice)}
                  className="truncate text-left text-[0.72rem] sm:text-xs font-semibold text-[#042017] hover:text-[#059669] transition-colors duration-200"
                  title={currentNotice.title}
                >
                  <span className="font-bold text-[#059669] mr-1.5 hidden md:inline">
                    [{currentNotice.categoryLabel}]
                  </span>
                  <span>{currentNotice.title}</span>
                </button>
              </div>
            </div>

            {/* Right: Social Links + Language Selector + Font Scaler */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Social Media Round Icons */}
              <div className="hidden lg:flex items-center gap-1 border-r border-[#D1E7DD] pr-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Chamber ${social.name}`}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#042017] hover:bg-[#059669] hover:text-white border border-[#D1E7DD] transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Institutional Language Selector Dropdown */}
              <LanguageSwitcher variant="institutional" />

              {/* Accessibility Font Size Scaler (A-, A, A+) */}
              <div className="hidden sm:inline-flex">
                <AccessibilityControls />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            TIER 1: Apex Branding & Institutional Identity Header (Pure White)
            Prominent dual-identity banner: Navi Mumbai Merchants Chamber (Left) & BMKMA (Right)
            ========================================================= */}
        <div className="bg-white border-b border-[#D1E7DD] text-[#042017] py-2.5 sm:py-3.5 px-3 sm:px-6">
          <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between gap-2 sm:gap-4">
            {/* Left: Navi Mumbai Merchants Chamber Logo & Crest */}
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className="group flex items-center gap-2.5 sm:gap-3.5 shrink min-w-0"
              aria-label="Navi Mumbai Merchants Chamber — Home"
            >
              {/* Chamber Official Crest */}
              <div className="relative h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 shrink-0 rounded-full bg-white shadow-sm border-2 border-[#059669] overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/nmmc-logo.png"
                  alt="Navi Mumbai Merchants Chamber Official Logo"
                  fill
                  priority
                  className="object-contain p-0.5"
                />
              </div>

              {/* Chamber Title & Leadership Subtitle */}
              <div className="flex flex-col justify-center text-left leading-tight min-w-0">
                <span className="font-heading font-extrabold text-[#042017] text-[0.92rem] sm:text-lg md:text-xl xl:text-2xl tracking-tight group-hover:text-[#059669] transition-colors truncate">
                  {t("hero.chamberTitle", "Navi Mumbai Merchants Chamber")}
                </span>
                <span className="text-[0.62rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-[#059669] flex items-center gap-1.5 mt-0.5 truncate">
                  <span>Estd.1993</span>

                </span>
              </div>
            </Link>

            {/* Right: Bombay Mudibazar Kariana Merchants Association Partner Identity */}
            <a
              href="https://mudhibazar.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 sm:gap-3.5 text-right shrink-0"
              aria-label="Bombay Mudibazar Kariana Merchants Association"
              title="Bombay Mudibazar Kariana Merchants Association"
            >
              {/* Association Title & Subtitle (hidden on mobile to prevent squishing, visible on tablet & laptop) */}
              <div className="hidden md:flex flex-col justify-center text-right leading-tight min-w-0 max-w-[260px] lg:max-w-none">
                <span className="font-heading font-extrabold text-[#042017] text-xs sm:text-sm md:text-base xl:text-lg tracking-tight group-hover:text-[#059669] transition-colors truncate">
                  {t("hero.bmkmaTitle", "Bombay Mudibazar Kariana Merchants Association")}
                </span>
                <span className="text-[0.58rem] sm:text-[0.68rem] md:text-xs font-bold uppercase tracking-[0.1em] text-[#047857] group-hover:text-[#059669] transition-colors mt-0.5">
                  Estd. 1969
                </span>
              </div>

              {/* Association Crest */}
              <div className="relative h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 shrink-0 rounded-full bg-white shadow-sm border-2 border-[#059669] overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/association-crest.png"
                  alt="Bombay Mudibazar Kariana Merchants Association Crest"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
            </a>
          </div>
        </div>

        {/* =========================================================
            TIER 2: Main Navigation Bar Ribbon (Pure White Meta Pill Tab Strip)
            ========================================================= */}
        <div className="bg-white border-b border-[#D1E7DD] text-[#042017] shadow-sm">
          <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-3 sm:px-6 h-12 sm:h-13">
            {/* Left: Main Navigation Menu with Home Icon */}
            <nav
              className="hidden xl:flex items-center gap-1.5 lg:gap-2"
              aria-label="Chamber Institutional Navigation"
            >
              {/* Circular Home Icon Button */}
              <Link
                href="/"
                onClick={() => handleNavClick("/")}
                aria-label="Home"
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 mr-1 shadow-sm",
                  pathname === "/"
                    ? "bg-[#059669] text-white font-bold ring-2 ring-[#059669]/30 shadow-sm"
                    : "bg-[#F0FDF4] text-[#042017] hover:bg-[#ECFDF5] hover:text-[#059669] border border-[#D1E7DD]"
                )}
              >
                <Home className="h-4 w-4" />
              </Link>

              {/* Dropdown & Nav Links Styled as Meta Pill Tabs */}
              {mainNavItems.map((item) => {
                const active = isLinkActive(item.href);
                const hasDropdown = Boolean(item.items && item.items.length > 0);
                const isOpen = activeDropdown === item.key;
                const label = t(item.key, item.defaultLabel);

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleMouseEnter(item.key)}
                    onMouseLeave={() => hasDropdown && handleMouseLeave()}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      aria-expanded={hasDropdown ? isOpen : undefined}
                      aria-haspopup={hasDropdown ? "true" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[0.82rem] xl:text-[0.86rem] font-bold px-3.5 py-1.5 rounded-full transition-all duration-150 tracking-tight",
                        active || isOpen
                          ? "bg-[#059669] text-white shadow-sm"
                          : "text-[#042017] hover:text-[#059669] hover:bg-[#F0FDF4]"
                      )}
                    >
                      <span>{label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isOpen && "rotate-180 text-white",
                            active ? "text-white" : "text-[#4B5563]"
                          )}
                        />
                      )}
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {hasDropdown && item.items && (
                      <div
                        className={cn(
                          "absolute left-0 top-full z-50 pt-2 transition-all duration-200",
                          isOpen
                            ? "pointer-events-auto opacity-100 translate-y-0"
                            : "pointer-events-none opacity-0 translate-y-2"
                        )}
                      >
                        <div className="w-[380px] max-h-[80vh] overflow-y-auto scrollbar-premium rounded-[24px] border border-[#D1E7DD] bg-white p-2.5 shadow-2xl">
                          <div className="border-b border-[#D1E7DD] bg-[#ECFDF5] px-3.5 py-2 rounded-xl mb-1.5 flex items-center justify-between">
                            <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#059669]">
                              {label}
                            </span>
                            <span className="text-[0.62rem] text-[#047857] font-semibold">
                              Chamber Directory
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            {item.items.map((sub) => {
                              const SubIcon = sub.icon || ChevronRight;
                              const isSubActive = pathname === sub.href;
                              const isSubExternal = sub.href.startsWith("http");

                              if (isSubExternal) {
                                return (
                                  <a
                                    key={sub.href}
                                    href={sub.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                    }}
                                    className="group flex items-start gap-2.5 rounded-xl p-2.5 transition-all duration-150 text-left border border-transparent hover:bg-[#ECFDF5] text-[#042017] hover:text-[#059669] hover:border-[#059669]/30"
                                  >
                                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all duration-150 bg-[#ECFDF5] text-[#059669] group-hover:bg-[#059669] group-hover:text-white ring-1 ring-[#059669]/30">
                                      <SubIcon className="h-3.5 w-3.5" />
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold leading-snug transition-colors duration-150 text-[#042017] group-hover:text-[#059669]">
                                        {sub.title}
                                      </span>
                                      {sub.description && (
                                        <span className="text-[0.65rem] leading-tight mt-0.5 line-clamp-1 transition-colors duration-150 text-[#4B5563] group-hover:text-[#047857]">
                                          {sub.description}
                                        </span>
                                      )}
                                    </div>
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    handleNavClick(sub.href);
                                  }}
                                  className={cn(
                                    "group flex items-start gap-2.5 rounded-xl p-2.5 transition-all duration-150 text-left border border-transparent",
                                    isSubActive
                                      ? "bg-[#059669] text-white font-bold shadow-sm"
                                      : "hover:bg-[#ECFDF5] text-[#042017] hover:text-[#059669] hover:border-[#059669]/30"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
                                      isSubActive
                                        ? "bg-white/20 text-white"
                                        : "bg-[#ECFDF5] text-[#059669] group-hover:bg-[#059669] group-hover:text-white ring-1 ring-[#059669]/30"
                                    )}
                                  >
                                    <SubIcon className="h-3.5 w-3.5" />
                                  </span>
                                  <div className="flex flex-col">
                                    <span
                                      className={cn(
                                        "text-xs font-bold leading-snug transition-colors duration-150",
                                        isSubActive
                                          ? "text-white"
                                          : "text-[#042017] group-hover:text-[#059669]"
                                      )}
                                    >
                                      {sub.title}
                                    </span>
                                    {sub.description && (
                                      <span
                                        className={cn(
                                          "text-[0.65rem] leading-tight mt-0.5 line-clamp-1 transition-colors duration-150",
                                          isSubActive
                                            ? "text-white/80"
                                            : "text-[#4B5563] group-hover:text-[#047857]"
                                        )}
                                      >
                                        {sub.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Nav Brand text fallback when menu collapsed */}
            <div className="xl:hidden flex items-center gap-2">
              <span className="text-xs font-bold text-[#059669] uppercase tracking-wider">
                MENU &amp; SERVICES
              </span>
            </div>

            {/* Right: Meta Admin Pill Button & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Admin Portal Meta Pill */}
              <Link
                href="/admin"
                onClick={() => handleNavClick("/admin")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-[0.72rem] sm:text-xs tracking-wider px-4 sm:px-5 py-1.5 shadow-sm uppercase transition-all duration-200 hover:scale-[1.02] active:scale-95 shrink-0"
              >
                <Lock className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                <span className="hidden sm:inline">{t("nav.admin", "ADMIN PORTAL")}</span>
                <span className="sm:hidden">{t("nav.admin", "ADMIN")}</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F0FDF4] text-[#042017] hover:bg-[#ECFDF5] transition-colors border border-[#D1E7DD]"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav-drawer"
              >
                {open ? <X className="h-5 w-5 text-[#059669]" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE NAVIGATION DRAWER (Clean White)
            Categorized accordion navigation with notices, tools & links
            ========================================================= */}
        <div
          id="mobile-nav-drawer"
          className={cn(
            "xl:hidden overflow-hidden transition-all duration-300 ease-out bg-white border-t border-[#D1E7DD]",
            open ? "max-h-[calc(100vh-100px)] opacity-100 shadow-2xl" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col px-4 py-4 gap-3.5 max-h-[calc(100vh-115px)] overflow-y-auto scrollbar-premium text-[#042017]">
            {/* Mobile Partner Association Quick Link */}
            <a
              href="https://mudhibazar.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-2.5 text-left hover:bg-[#ECFDF5] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0 rounded-full bg-white border border-[#059669] overflow-hidden">
                  <Image
                    src="/images/association-crest.png"
                    alt="Bombay Mudibazar Kariana Merchants Association"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#042017] leading-snug">
                    {t("hero.bmkmaTitle", "Bombay Mudibazar Kariana Merchants Association")}
                  </span>
                  <span className="block text-[0.64rem] text-[#059669] font-bold">
                    Estd. 1969 • APMC Market
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#059669]" />
            </a>

            {/* Mobile Announcements Quick Bar */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-between rounded-2xl border border-[#059669]/30 bg-[#ECFDF5] p-3 text-left transition-all hover:bg-[#D1E7DD]/50"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#059669] text-white shadow-sm">
                  <Megaphone className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-xs font-bold text-[#042017]">
                    Official Announcements
                  </span>
                  <span className="block text-[0.68rem] text-[#4B5563]">
                    {chamberAnnouncements.length} Active Circulars Available
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#059669]" />
            </button>

            {/* Mobile Language Switcher */}
            <LanguageSwitcher variant="mobile" />

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1 border-t border-[#D1E7DD] pt-2">
              <Link
                href="/"
                onClick={() => {
                  setOpen(false);
                  handleNavClick("/");
                }}
                className={cn(
                  "flex items-center justify-between rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                  pathname === "/"
                    ? "bg-[#059669] text-white shadow-sm"
                    : "text-[#042017] hover:bg-[#F0FDF4] hover:text-[#059669]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="h-4 w-4" />
                  <span>HOME</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              {mainNavItems.map((item) => {
                const hasDropdown = Boolean(item.items && item.items.length > 0);
                const isExpanded = mobileExpanded === item.key;
                const active = isLinkActive(item.href);
                const label = t(item.key, item.defaultLabel);

                if (!hasDropdown) {
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        handleNavClick(item.href);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                        active
                          ? "bg-[#059669] text-white shadow-sm"
                          : "text-[#042017] hover:bg-[#F0FDF4] hover:text-[#059669]"
                      )}
                    >
                      <span>{label}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                }

                return (
                  <div key={item.key} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded((prev) => (prev === item.key ? null : item.key))
                      }
                      className={cn(
                        "flex items-center justify-between rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                        active || isExpanded
                          ? "bg-[#ECFDF5] text-[#059669]"
                          : "text-[#042017] hover:bg-[#F0FDF4] hover:text-[#059669]"
                      )}
                    >
                      <span>{label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200 text-[#059669]",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Accordion Submenu */}
                    {isExpanded && item.items && (
                      <div className="ml-3 my-1 flex flex-col gap-1 border-l-2 border-[#059669]/50 pl-3 py-1">
                        {item.items.map((sub) => {
                          const isSubExternal = sub.href.startsWith("http");
                          if (isSubExternal) {
                            return (
                              <a
                                key={sub.href}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  setOpen(false);
                                }}
                                className="flex flex-col rounded-xl px-3 py-2 text-xs font-medium text-[#4B5563] hover:bg-[#F0FDF4] hover:text-[#059669] transition-colors"
                              >
                                <span className="font-bold text-[#042017] text-xs">{sub.title}</span>
                                {sub.description && (
                                  <span className="text-[0.65rem] text-[#4B5563] line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </span>
                                )}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setOpen(false);
                                handleNavClick(sub.href);
                              }}
                              className="flex flex-col rounded-xl px-3 py-2 text-xs font-medium text-[#4B5563] hover:bg-[#F0FDF4] hover:text-[#059669] transition-colors"
                            >
                              <span className="font-bold text-[#042017] text-xs">{sub.title}</span>
                              {sub.description && (
                                <span className="text-[0.65rem] text-[#4B5563] line-clamp-1 mt-0.5">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Footer & Socials */}
            <div className="border-t border-[#D1E7DD] pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Chamber ${social.name}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F0FDF4] text-[#042017] hover:bg-[#059669] hover:text-white border border-[#D1E7DD] transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <AccessibilityControls />
            </div>
          </div>
        </div>
      </header>

      {/* Announcements Interactive Modal */}
      <AnnouncementsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedAnnouncement={selectedNotice}
      />
    </>
  );
}
