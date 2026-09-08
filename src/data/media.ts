// ---------------------------------------------------------------------------
// Media Desk data — Events, Social Activities and News.
//
// Content follows the site-wide honesty policy: entries describe the *kind*
// of activity associated with the chamber and its organisations without
// inventing precise verified specifics. Dates are indicative; every page
// carries a note that details will be updated as verified information
// becomes available.
// ---------------------------------------------------------------------------

export type MediaCategorySlug = "events" | "social-activities" | "news";

export type MediaCategory = {
  slug: MediaCategorySlug;
  label: string;
  eyebrow: string;
  tagline: string;
  description: string;
};

export const mediaCategories: MediaCategory[] = [
  {
    slug: "events",
    label: "Events",
    eyebrow: "Programmes & Gatherings",
    tagline: "Meets, sessions and programmes",
    description:
      "Trade meets, interactive sessions and chamber programmes that bring merchants, farmers and office-bearers onto one platform.",
  },
  {
    slug: "social-activities",
    label: "Social Activities",
    eyebrow: "Community & Welfare",
    tagline: "Community welfare initiatives",
    description:
      "Welfare drives and community work in and around the market yard — supporting farmers, traders and families of the merchant community.",
  },
  {
    slug: "news",
    label: "News",
    eyebrow: "Announcements & Press",
    tagline: "Announcements and updates",
    description:
      "Announcements, press mentions and updates from the chamber, the associations and the APMC trade ecosystem.",
  },
];

export function getMediaCategory(
  slug: string
): MediaCategory | undefined {
  return mediaCategories.find((c) => c.slug === slug);
}

export type MediaEntry = {
  id: string;
  category: MediaCategorySlug;
  title: string;
  date: string;
  location?: string;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
};

export const mediaEntries: MediaEntry[] = [
  // ------------------------------------------------------------- Events ---
  {
    id: "chamber-foundation-meet",
    category: "events",
    title: "Navi Mumbai Merchants Chamber — Members' Meet",
    date: "2026",
    location: "Turbhe, Navi Mumbai",
    image: "/images/events/trade-meeting.jpg",
    imageAlt: "Merchant leaders gathered at a chamber trade meeting",
    summary:
      "Members of the Navi Mumbai Merchants Chamber convene to review trade conditions in the Turbhe–Vashi belt and plan collective initiatives for the merchant community.",
    highlights: [
      "Review of market conditions and trader concerns",
      "Coordination between chamber members and market committees",
      "Planning of welfare and business-facilitation programmes",
    ],
  },
  {
    id: "trade-interactive-session",
    category: "events",
    title: "Trade & Commerce Interactive Session",
    date: "2026",
    location: "Navi Mumbai",
    image: "/images/events/conference.jpg",
    imageAlt: "Speakers addressing an interactive trade conference",
    summary:
      "An interactive session for traders and commission agents on market practices, documentation and emerging opportunities in agricultural trade.",
    highlights: [
      "Panel discussions with senior traders",
      "Guidance on APMC procedures and compliance",
      "Networking for new entrants into the mandi ecosystem",
    ],
  },
  {
    id: "merchant-felicitation",
    category: "events",
    title: "Merchant Felicitation Programme",
    date: "2026",
    location: "Navi Mumbai",
    image: "/images/events/felicitations.jpg",
    imageAlt: "Felicitations at a merchant community programme",
    summary:
      "Long-standing members and office-bearers of the merchant community are felicitated for their service to trade bodies and fellow traders.",
    highlights: [
      "Recognition of decades of service to the trade bodies",
      "Participation from associations across the region",
      "Cultural programme for members and families",
    ],
  },
  {
    id: "apmc-trader-meet",
    category: "events",
    title: "APMC Trader Interaction Meet",
    date: "2026",
    location: "Market Yard, Turbhe",
    image: "/images/apmc/market-yard.jpg",
    imageAlt: "Aerial view of the Navi Mumbai APMC market yard",
    summary:
      "A ground-level interaction meet at the market yard where traders raise day-to-day operational issues — auctions, loading, weighting and payments.",
    highlights: [
      "Direct dialogue between traders and association office-bearers",
      "Follow-up on market-yard infrastructure needs",
      "Season-wise arrival and pricing review",
    ],
  },

  // -------------------------------------------------- Social Activities ---
  {
    id: "community-welfare",
    category: "social-activities",
    title: "Community Welfare Initiatives",
    date: "Ongoing",
    location: "Navi Mumbai",
    image: "/images/events/community.jpg",
    imageAlt: "Community members gathered for a welfare initiative",
    summary:
      "Welfare activity in the merchant community — support for families in need, community gatherings and assistance during emergencies, coordinated through the chamber and associations.",
    highlights: [
      "Support for trader families during hardship",
      "Community coordination during festivals and peak seasons",
      "Volunteer network drawn from chamber members",
    ],
  },
  {
    id: "farmer-support",
    category: "social-activities",
    title: "Supporting Farmers at the Market Yard",
    date: "Season-wise",
    location: "APMC, Turbhe",
    image: "/images/apmc/onion-potato-market.jpg",
    imageAlt: "Onion and potato section of the wholesale market",
    summary:
      "Farmer-facing initiatives around the APMC yard — helping arriving farmers with market orientation, fair-trade practices and timely payment awareness.",
    highlights: [
      "Guidance for farmers arriving from outside the district",
      "Awareness on fair weighing and prompt payment",
      "Coordination with market committee staff during peak arrivals",
    ],
  },
  {
    id: "grain-distribution",
    category: "social-activities",
    title: "Grain Distribution Drives",
    date: "As announced",
    location: "Navi Mumbai",
    image: "/images/apmc/grain-market.jpg",
    imageAlt: "Wholesale grain market section at the APMC",
    summary:
      "Food-grain distribution drives organised with the trading community, using the market's supply network to reach families in need during difficult periods.",
    highlights: [
      "Grain and essentials sourced through member traders",
      "Distribution organised with community volunteers",
      "Special drives during monsoon and festive seasons",
    ],
  },
  {
    id: "spice-trade-charity",
    category: "social-activities",
    title: "Spice & Kariana Trade Charity Initiatives",
    date: "Ongoing",
    location: "Mumbai & Navi Mumbai",
    image: "/images/apmc/spice-market.jpg",
    imageAlt: "Spice section of the wholesale market",
    summary:
      "Charity activity connected with the spice and kariana trade — supporting community kitchens, temples and local institutions through member contributions.",
    highlights: [
      "Member-funded contributions routed through the association",
      "Support to local community institutions",
      "Transparent record of collections and disbursement",
    ],
  },

  // ---------------------------------------------------------------- News ---
  {
    id: "vyapar-kesari-feature",
    category: "news",
    title: "Featured in Vyapar Kesari",
    date: "To be updated",
    location: "Press coverage",
    image: "/images/media/newspaper-texture.jpg",
    imageAlt: "Newspaper coverage of Kirti Rana's merchant community work",
    summary:
      "Kirti Rana's contributions to the merchant community have been featured in Vyapar Kesari, a publication covering trade and commerce. Verified date and page details will be published once confirmed.",
    highlights: [
      "Coverage of merchant community leadership",
      "Feature on engagement with the trading ecosystem",
      "Press clipping available in the media archive",
    ],
  },
  {
    id: "chamber-chairmanship",
    category: "news",
    title: "Leadership at the Navi Mumbai Merchants Chamber",
    date: "Announcement",
    location: "Navi Mumbai",
    image: "/images/events/conference.jpg",
    imageAlt: "Chamber leadership addressing members",
    summary:
      "Kirti Rana serves as Chairman of the Navi Mumbai Merchants Chamber and leads initiatives spanning trader welfare, market coordination and community programmes.",
    highlights: [
      "Chairman — Navi Mumbai Merchants Chamber",
      "Office-bearer roles in the Bombay Mudibazar Kariana Merchants Association",
      "Focus areas: trader facilitation and community welfare",
    ],
  },
  {
    id: "daily-rates-online",
    category: "news",
    title: "Daily Indicative Market Rates Now on This Website",
    date: "New",
    location: "APMC section",
    image: "/images/apmc/fruit-market.jpg",
    imageAlt: "Wholesale fruit market at Navi Mumbai APMC",
    summary:
      "The APMC section of this website now carries daily indicative price bands for the fruit, vegetable, grain, spice and onion–potato markets, refreshed by the chamber's admin team.",
    highlights: [
      "Indicative min / max / modal prices by commodity",
      "Trend indicators for quick orientation",
      "Always verify live prices on the official Mumbai APMC portal",
    ],
  },
  {
    id: "monsoon-season-trading",
    category: "news",
    title: "Monsoon-Season Advisory for Traders",
    date: "Seasonal",
    location: "Market Yard, Turbhe",
    image: "/images/apmc/vegetable-market.jpg",
    imageAlt: "Vegetable market section during peak arrivals",
    summary:
      "Seasonal advisories circulated among members during the monsoon — handling of perishable arrivals, transport delays and coordination with the market committee.",
    highlights: [
      "Advance planning for perishable arrivals",
      "Coordination on loading and transport schedules",
      "Member advisories via the association network",
    ],
  },
];

export function entriesFor(category: MediaCategorySlug): MediaEntry[] {
  return mediaEntries.filter((e) => e.category === category);
}
