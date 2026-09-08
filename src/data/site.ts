import {
  Home,
  User,
  Briefcase,
  Building2,
  Store,
  Award,
  Users,
  Images,
  Newspaper,
  Mail,
} from "lucide-react";

export const siteConfig = {
  name: "Kirti Rana",
  tagline: "Business Leadership • Merchant Community • Agriculture & Trade",
  subtitle: "Business Leadership • Agriculture • Trade",
  description:
    "Chairman – Navi Mumbai Merchants Chamber & Bombay Mudibazar Kariana Merchants Association.",
  location: "Navi Mumbai APMC Market, Turbhe / Vashi, Navi Mumbai, Maharashtra",
  apmcAddress:
    "Sector 19, Thane-Belapur Road, Turbhe, Navi Mumbai, Maharashtra – 400703",
  mumbaiApmcUrl: "https://www.mumbaiapmc.org/",
  dailyRatesUrl:
    "https://www.mumbaiapmc.org/en/market-price-en/daily-market-price-en",
};

export type NavLink = {
  label: string;
  href: string;
  icon: typeof Home;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Business", href: "/business", icon: Briefcase },
  { label: "Organizations", href: "/organizations", icon: Building2 },
  { label: "APMC", href: "/apmc", icon: Store },
  { label: "Achievements", href: "/achievements", icon: Award },
  { label: "Board", href: "/board", icon: Users },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Media", href: "/media", icon: Newspaper },
  { label: "Contact", href: "/contact", icon: Mail },
];

export const footerQuickLinks = navLinks;

export const footerOrganizations = [
  "Navi Mumbai Merchants Chamber",
  "Bombay Mudibazar Kariana Merchants Association",
];
