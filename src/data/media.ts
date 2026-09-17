// ---------------------------------------------------------------------------
// Media Desk data — Events, Social Activities and News.
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
    tagline: "Meets, sessions and national summits",
    description:
      "National trade summits, merchant conventions, and chamber programmes that bring traders, industry leaders, and policy makers onto one platform.",
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
    eyebrow: "Announcements & Broadcasts",
    tagline: "Live TV broadcasts & press coverage",
    description:
      "Live television news coverage, press mentions, award recognitions and updates from the chamber and state trade leadership.",
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
    id: "bharatiya-vyapar-mahotsav-2026",
    category: "events",
    title: "Bharatiya Vyapar Mahotsav 2026 — Bharat Mandapam",
    date: "12–15 August 2026",
    location: "Bharat Mandapam, Pragati Maidan, New Delhi",
    image: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    imageAlt: "Bharatiya Vyapar Mahotsav 2026 Invitation Flyer",
    summary:
      "A landmark multi-sector national trade festival organized jointly by ITPO and CAIT at Bharat Mandapam, New Delhi, advancing Aatmanirbhar Bharat and Swadeshi trade with participation from central leadership and trade delegations.",
    highlights: [
      "Joint initiative of ITPO and CAIT under Host State Delhi Tourism",
      "Held at the prestigious Bharat Mandapam, Pragati Maidan, New Delhi",
      "Key participation by Shri Kirti Rana (President, Navi Mumbai Merchants Chamber / National Leadership CAIT)",
      "Focus on MSME market access, digital trade, and investment opportunities",
    ],
  },
  {
    id: "dcm-fadnavis-felicitation-event",
    category: "events",
    title: "Navi Mumbai Leaders Conference — Felicitating DCM Devendra Fadnavis",
    date: "2026 Live",
    location: "Navi Mumbai, Maharashtra",
    image: "/images/media/dcm-devendra-fadnavis-kirti-rana-felicitation.jpg",
    imageAlt: "Shri Kirti Rana felicitating DCM Devendra Fadnavis on stage",
    summary:
      "Shri Kirti Rana felicitated Maharashtra Deputy Chief Minister Shri Devendra Fadnavis during the Mathadi Karyakarta conference in Navi Mumbai, addressing labor welfare and wholesale market growth.",
    highlights: [
      "Stage felicitation of DCM Devendra Fadnavis by Shri Kirti Rana",
      "Broadcast live on TV1 India News channel",
      "Deliberations on APMC market yard labor, infrastructure and commercial expansion",
    ],
  },
  {
    id: "global-business-icon-dubai",
    category: "events",
    title: "Global Business ICON Awards — Dubai",
    date: "2025",
    location: "Dubai, United Arab Emirates",
    image: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    imageAlt: "Mr. Kirti Rana receiving Global Business Icon Award in Dubai",
    summary:
      "Shri Kirti Rana was conferred with the Global Business ICON Award in Dubai in the presence of distinguished international dignitaries, trade consuls and business leaders.",
    highlights: [
      "International recognition for agricultural trade and merchant leadership",
      "Presence of UAE and Indian trade dignitaries and business icons",
      "Fostering cross-border commodity trade and export partnerships",
    ],
  },
  {
    id: "bjp-vyapari-aghadi-meeting",
    category: "events",
    title: "BJP Vyapari Aghadi Maharashtra Pradesh Leadership Meet",
    date: "2026",
    location: "Maharashtra",
    image: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    imageAlt: "Shri Kirti Rana with BJP Vyapari Aghadi Maharashtra leadership",
    summary:
      "State leadership conference of BJP Vyapari Aghadi Maharashtra Pradesh coordinating merchant welfare, ease of doing business, and market infrastructure reforms across Maharashtra.",
    highlights: [
      "Dialogue between merchant associations and policymakers",
      "Advocacy for APMC infrastructure and trader welfare policies",
      "Coordinating state-wide commercial representation",
    ],
  },
  {
    id: "chamber-foundation-meet",
    category: "events",
    title: "Navi Mumbai Merchants Chamber — Annual Members' Meet",
    date: "2026",
    location: "Turbhe, Navi Mumbai",
    image: "/images/nmmc-logo.png",
    imageAlt: "Navi Mumbai Merchants Chamber Salient Features Presentation",
    summary:
      "Members of the Navi Mumbai Merchants Chamber convene to review trade conditions across the 50-acre dedicated spice and commodity complex in Turbhe–Vashi.",
    highlights: [
      "Review of 400+ spice processors and traders' market conditions",
      "Coordination on export logistics, warehousing and cold chain",
      "Planning welfare and business-facilitation programmes",
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
      "Charity activity connected with the spice and kariana trade — supporting community kitchens, educational trusts and local institutions through member contributions.",
    highlights: [
      "Member-funded contributions routed through the association",
      "Support to educational trusts like Shree Una Taluka Kelvani Mandal",
      "Philanthropic seva with Shree Bapa Sitaram Seva Mandal",
    ],
  },

  // ---------------------------------------------------------------- News ---
  {
    id: "tv1-india-live-broadcast",
    category: "news",
    title: "TV1 India Live Broadcast: With DCM Devendra Fadnavis in Navi Mumbai",
    date: "Live Broadcast",
    location: "TV1 India Live",
    image: "/images/media/dcm-devendra-fadnavis-mathadi-meet-live.jpg",
    imageAlt: "TV1 India Live Broadcast of DCM Devendra Fadnavis and Shri Kirti Rana",
    summary:
      "Live news broadcast by TV1 India covering the high-level Navi Mumbai leadership conference with Maharashtra Deputy Chief Minister Shri Devendra Fadnavis and Shri Kirti Rana.",
    highlights: [
      "Live national broadcast on TV1 India television channel",
      "Coverage of trade leadership, labor welfare and market yard policies",
      "Joint address and meeting with leadership of Navi Mumbai",
    ],
  },
  {
    id: "official-awards-register",
    category: "news",
    title: "11 Prestigious Awards Conferred upon Shri Kirti Rana",
    date: "2026 Archive",
    location: "National & International",
    image: "/images/awards/achievements-awards-record.jpg",
    imageAlt: "Official Achievements Record Document",
    summary:
      "Comprehensive honours record recognizing Shri Kirti Rana's business stewardship, including the Girnar Best Businessman Award (2008), Global Business ICON Award (Dubai 2025), and honors from CAIT and regional merchant bodies.",
    highlights: [
      "Girnar Best Businessman Award 2008 (Bruhad Mumbai Gujarati Samaj)",
      "Global Business ICON Award 2025 (Dubai)",
      "CAIT Research & Trade Development Society Honor (New Delhi)",
      "Certificate of Appreciation from Bombay Mudibazar Kariana Merchants' Association",
    ],
  },
  {
    id: "vyapar-kesari-feature",
    category: "news",
    title: "Featured in Vyapar Kesari",
    date: "Press Archive",
    location: "Press coverage",
    image: "/images/media/newspaper-texture.jpg",
    imageAlt: "Newspaper coverage of Kirti Rana's merchant community work",
    summary:
      "Shri Kirti Rana's contributions to the merchant community have been featured in Vyapar Kesari, a prominent publication covering trade and commerce.",
    highlights: [
      "Coverage of merchant community leadership",
      "Feature on engagement with the trading ecosystem",
      "Press clipping available in the media archive",
    ],
  },
  {
    id: "daily-rates-online",
    category: "news",
    title: "Daily Indicative Market Rates Available Online",
    date: "Live",
    location: "APMC section",
    image: "/images/apmc/fruit-market.jpg",
    imageAlt: "Wholesale fruit market at Navi Mumbai APMC",
    summary:
      "The APMC section of this website carries daily indicative price bands for the fruit, vegetable, grain, spice and onion–potato markets, backed by the chamber's live database.",
    highlights: [
      "Indicative min / max / modal prices across 5 commodity markets",
      "Live database backed with instant admin updates",
      "Links to the official Mumbai APMC portal",
    ],
  },
];

export function entriesFor(category: MediaCategorySlug): MediaEntry[] {
  return mediaEntries.filter((e) => e.category === category);
}
