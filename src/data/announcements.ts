export interface ChamberAnnouncement {
  id: string;
  title: string;
  category: "rates" | "circular" | "trade" | "event" | "policy";
  categoryLabel: string;
  date: string;
  isUrgent?: boolean;
  href: string;
  summary: string;
  fileSize?: string;
}

export const chamberAnnouncements: ChamberAnnouncement[] = [
  {
    id: "ann-1",
    title: "Daily APMC Wholesale Price Bulletin — Spices, Grains, Pulses & Oilseeds",
    category: "rates",
    categoryLabel: "Market Rates",
    date: "10 Sep 2026",
    isUrgent: true,
    href: "/apmc#market-rates",
    summary: "Updated wholesale auction rates for APMC Market-I and Market-II Turbhe Complex. Check today's price index.",
    fileSize: "PDF 1.2 MB",
  },
  {
    id: "ann-2",
    title: "Navi Mumbai Merchants Chamber: Export Documentation & Phytosanitary Advisory 2026-27",
    category: "trade",
    categoryLabel: "Export Trade",
    date: "08 Sep 2026",
    isUrgent: true,
    href: "/business",
    summary: "Key compliance protocols and certification of origin procedures for international spice and agro shipments.",
    fileSize: "PDF 840 KB",
  },
  {
    id: "ann-3",
    title: "50-Acre Turbhe Market Complex: Infrastructure Modernization & Solar Grid Phase-II",
    category: "circular",
    categoryLabel: "APMC Circular",
    date: "05 Sep 2026",
    href: "/apmc",
    summary: "Notice regarding scheduled electrical upgrades and loading dock logistics management across sectors 18 & 19.",
    fileSize: "PDF 520 KB",
  },
  {
    id: "ann-4",
    title: "President Shri Kirti Rana to Lead National Agri-Trade Delegation at New Delhi",
    category: "event",
    categoryLabel: "Chamber News",
    date: "01 Sep 2026",
    href: "/media/news",
    summary: "Apex meeting with Ministry of Commerce representatives regarding GST rationalization on essential farm commodities.",
    fileSize: "PDF 680 KB",
  },
  {
    id: "ann-5",
    title: "Merchant Welfare & Medical Health Camp 2026 — APMC Central Hall Turbhe",
    category: "policy",
    categoryLabel: "Welfare",
    date: "28 Aug 2026",
    href: "/media/social-activities",
    summary: "Annual free health checkup and occupational safety camp for registered merchants, loaders, and staff.",
    fileSize: "PDF 410 KB",
  },
];
