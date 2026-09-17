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
  role: "President — Navi Mumbai Merchants Chamber | National Vice President — CAIT",
  tagline: "Pride of Asia • Largest National APMC Trading Hub • Swadeshi Commerce",
  subtitle: "250-Acre Swadeshi APMC Complex • 12,000+ License Holders • 3,500+ Daily Trucks",
  description:
    "President, Navi Mumbai Merchants Chamber & National Vice President, Confederation of All India Traders (CAIT). Guiding Asia's largest wholesale APMC trade hub spread across 250 acres with 12,000+ licensed merchants and 17 constituent associations.",
  location: "Navi Mumbai, Maharashtra 400703",
  apmcAddress:
    "C-64, APMC Masala Market-1 & Market-2, Vashi, Navi Mumbai, Maharashtra – 400 703",
  phoneNumbers: ["+91 98201 87911", "+91 22 4974 4533", "+91 22 4984 1933"],
  emails: ["nmmc11992@gmail.com", "mudibazar4u@hotmail.com"],
  mumbaiApmcUrl: "https://www.mumbaiapmc.org/",
  dailyRatesUrl:
    "https://www.mumbaiapmc.org/en/market-price-en/daily-market-price-en",
  stats: {
    acreage: "250+ Acres",
    licenseHolders: "12,000+",
    dailyTrucks: "3,500+",
    familiesInvolved: "50,000+",
    constituentAssociations: "17",
    memberFirms: "1,000+",
    spicesHandled: "400+",
    annualVolume: "100,000+ Tons",
  },
  stakeholders: [
    "Food Manufacturers",
    "Spice Processors & Specialists",
    "Spices & Grocers",
    "Dry Fruits, Fruits & Vegetables",
    "Exporters, Wholesalers & Distributors",
    "Retailers & Merchant Traders",
    "Cold Chain Owners & Logistics Operators",
    "Packaging Specialists",
    "Testing Laboratories",
  ],
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
  "Navi Mumbai Merchants Chamber (Apex Body)",
  "Confederation of All India Traders (CAIT)",
  "Bombay Mudibazar Kariana Merchants Association",
  "Grain, Rice & Oilseeds Merchants Association (GROMA)",
  "Federation of Associations of Maharashtra (FAM)",
];
