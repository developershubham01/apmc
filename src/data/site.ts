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
  { label: "About Shri Kirti Rana", href: "/about", icon: User },
  { label: "Agro Business", href: "/business", icon: Briefcase },
  { label: "Trade Organizations", href: "/organizations", icon: Building2 },
  { label: "APMC Markets", href: "/apmc", icon: Store },
  { label: "Honours & Awards", href: "/achievements", icon: Award },
  { label: "Board of Directors", href: "/board", icon: Users },
  { label: "Photo Gallery", href: "/gallery", icon: Images },
  { label: "Media & News", href: "/media", icon: Newspaper },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

export const footerQuickLinks = navLinks;

export const footerOrganizations = [
  "Navi Mumbai Merchants Chamber",
  "Bombay Mudibazar Kariana Merchants Association",
  "Grain, Rice & Oilseeds Merchants Association (GROMA)",
  "Federation of Associations of Maharashtra (FAM)",
];
