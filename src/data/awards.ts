export type AwardItem = {
  id: number;
  title: string;
  organization: string;
  year?: string;
  category: "Business Leadership" | "Trade & Commerce" | "Community & Welfare" | "International";
  highlight?: boolean;
  description: string;
  badge: string;
};

export const officialAwards: AwardItem[] = [
  {
    id: 1,
    title: "Best Businessman Award",
    organization: "Bruhad Mumbai Gujarati Samaj — Mumbai",
    year: "2008",
    category: "Business Leadership",
    highlight: true,
    badge: "Girnar Award",
    description:
      "Honored with the prestigious Girnar Award as the 'Best Businessman Award for 2008' in recognition of outstanding business enterprise and community commitment.",
  },
  {
    id: 11,
    title: "Global Business ICON Award",
    organization: "Glimpses Global Business ICON Awards — Dubai",
    year: "2025",
    category: "International",
    highlight: true,
    badge: "International Honor",
    description:
      "Conferred with the Global Business ICON Award in Dubai in the presence of distinguished international dignitaries and trade leaders.",
  },
  {
    id: 8,
    title: "Trade Leadership & Research Award",
    organization: "CAIT Research & Trade Development Society (Regd.) — New Delhi",
    category: "Trade & Commerce",
    highlight: true,
    badge: "National Trade Body",
    description:
      "Honored with Best Wishes & Award from the CAIT Research & Trade Development Society for leadership in the national retail and wholesale trade ecosystem.",
  },
  {
    id: 9,
    title: "Certificate of Appreciation",
    organization: "Bombay Mudibazar Kariana Merchants' Association",
    category: "Trade & Commerce",
    badge: "Kariana Trade",
    description:
      "Presented with Certificate of Appreciation & Award for dedicated stewardship and chairmanship of the traditional wholesale provisions community.",
  },
  {
    id: 7,
    title: "Spice & Dry Fruits Trade Award",
    organization: "Mumbai Meva Masala Merchants' Association",
    category: "Trade & Commerce",
    badge: "Spice Industry",
    description:
      "Recognized by the Mumbai Meva Masala Merchants' Association for exemplary contribution to the spices, condiments and dry fruits market.",
  },
  {
    id: 3,
    title: "Wholesale Trade Welfare Award",
    organization: "Thane Zilla Wholesale Vyapari Welfare Sangh (Dist. Thane)",
    category: "Trade & Commerce",
    badge: "District Federation",
    description:
      "Awarded by Thane Zilla Wholesale Vyapari Welfare Sangh for active advocacy and welfare initiatives for wholesale merchants across Thane district.",
  },
  {
    id: 6,
    title: "Community Leadership Honor",
    organization: "Shree Kutch Vagad Lohana Mahajan — Mumbai & Shree Kutchi Lohana Jagrut Samaj — Mumbai",
    category: "Community & Welfare",
    badge: "Community Honor",
    description:
      "Conferred with Award and Best Wishes for social welfare, community unity and philanthropic services.",
  },
  {
    id: 2,
    title: "Social Welfare & Youth Service Award",
    organization: "Jain Jagruti Centre — Vashi, Navi Mumbai",
    category: "Community & Welfare",
    badge: "Navi Mumbai",
    description:
      "Honored with Best Wishes & Award from Jain Jagruti Centre Vashi for community service and social leadership in Navi Mumbai.",
  },
  {
    id: 4,
    title: "Distinguished Service Award",
    organization: "Shree Samast Brahman Samaj — Navi Mumbai",
    category: "Community & Welfare",
    badge: "Social Harmony",
    description:
      "Honored with Best Wishes & Award by Shree Samast Brahman Samaj Navi Mumbai for community patronage and support.",
  },
  {
    id: 5,
    title: "Education & Social Development Award",
    organization: "Shree Una Taluka Kelvani Mandal",
    category: "Community & Welfare",
    badge: "Educational Trust",
    description:
      "Awarded in appreciation of contributions towards education, youth advancement and student welfare.",
  },
  {
    id: 10,
    title: "Seva & Philanthropy Honor",
    organization: "Shree Bapa Sitaram Seva Mandal",
    category: "Community & Welfare",
    badge: "Seva Sanstha",
    description:
      "Conferred with Best Wishes & Award for dedicated social service, food distribution and community relief initiatives.",
  },
];
