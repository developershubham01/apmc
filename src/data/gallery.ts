export type GalleryCategory =
  | "KIRTI RANA"
  | "BUSINESS"
  | "ORGANIZATIONS"
  | "EVENTS"
  | "APMC"
  | "BOARD"
  | "MEDIA";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
  title?: string;
  description?: string;
  span?: "wide" | "tall" | "normal";
};

export const galleryFilters: ("ALL" | GalleryCategory)[] = [
  "ALL",
  "BOARD",
  "KIRTI RANA",
  "ORGANIZATIONS",
  "EVENTS",
  "APMC",
  "BUSINESS",
  "MEDIA",
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/events/board-meeting.jpg",
    alt: "Navi Mumbai Merchants Chamber Executive Board of Directors Meeting",
    category: "BOARD",
    title: "Executive Board of Directors Meeting",
    description: "Official convening of the Governing Board of Directors of Navi Mumbai Merchants Chamber, deliberating on market infrastructure, commercial reforms, and member welfare.",
    caption: "Executive Board of Directors Meeting — Navi Mumbai Merchants Chamber",
    span: "wide",
  },
  {
    src: "/images/kirti-rana/portrait-lead.jpg",
    alt: "Shri Kirti Rana — Chairman, Navi Mumbai Merchants Chamber Board of Directors",
    category: "BOARD",
    title: "Shri Kirti Rana — Board Chairman & President",
    description: "Official portrait of Shri Kirti Rana, President of Navi Mumbai Merchants Chamber and prominent trade leader guiding wholesale market operations for over 30 years.",
    caption: "Shri Kirti Rana — Chairman of the Board of Directors",
    span: "normal",
  },
  {
    src: "/images/association/chamber-headquarters.jpg",
    alt: "Navi Mumbai Merchants Chamber Boardroom & Administrative Headquarters",
    category: "BOARD",
    title: "Chamber Boardroom & Administrative Complex",
    description: "The primary administrative headquarters and decision-making boardroom of the Navi Mumbai Merchants Chamber situated at C-64, APMC Masala Market-1, Turbhe.",
    caption: "Chamber Boardroom & Administrative Complex — Turbhe APMC",
    span: "wide",
  },
  {
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    alt: "Mr. Kirti Rana receiving the Global Business Icon Award in Dubai",
    category: "KIRTI RANA",
    title: "Global Business ICON Award — Dubai 2025",
    description: "Conferred with the prestigious Global Business ICON Award in Dubai in the presence of international dignitaries and trade delegates for exemplary commercial leadership.",
    caption: "Global Business ICON Award Presentation — Dubai 2025",
    span: "wide",
  },
  {
    src: "/images/media/dcm-devendra-fadnavis-kirti-rana-felicitation.jpg",
    alt: "Shri Kirti Rana felicitating DCM Devendra Fadnavis on stage broadcast on TV1 India Live",
    category: "MEDIA",
    title: "TV1 India Live — Felicitating DCM Devendra Fadnavis",
    description: "Live televised ceremony showing Shri Kirti Rana felicitating Hon'ble Deputy Chief Minister Devendra Fadnavis at the Navi Mumbai Merchant Leaders Summit.",
    caption: "TV1 India Live — Felicitating DCM Devendra Fadnavis at Navi Mumbai Leaders Meet",
    span: "wide",
  },
  {
    src: "/images/media/dcm-devendra-fadnavis-mathadi-meet-live.jpg",
    alt: "Shri Kirti Rana and DCM Devendra Fadnavis at Mathadi leaders meeting on TV1 India Live",
    category: "MEDIA",
    title: "Mathadi Karyakarta & Merchant Summit — TV1 Live",
    description: "Keynote dialogue between Shri Kirti Rana and DCM Devendra Fadnavis regarding labor welfare, APMC market licensing, and wholesale trade security.",
    caption: "TV1 India Live Broadcast — With DCM Devendra Fadnavis at Mathadi Karyakarta Meet",
    span: "wide",
  },
  {
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    alt: "Bharatiya Vyapar Mahotsav 2026 Invitation Flyer — Bharat Mandapam, New Delhi",
    category: "EVENTS",
    title: "Bharatiya Vyapar Mahotsav 2026 — Bharat Mandapam",
    description: "Apex national trade expo organized by ITPO & CAIT at Bharat Mandapam, Pragati Maidan, New Delhi, showcasing Indian merchant enterprises.",
    caption: "Bharatiya Vyapar Mahotsav 2026 — ITPO & CAIT Initiative, New Delhi",
    span: "tall",
  },
  {
    src: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    alt: "Shri Kirti Rana with BJP Vyapari Aghadi Maharashtra Pradesh leadership",
    category: "ORGANIZATIONS",
    title: "BJP Vyapari Aghadi Maharashtra Leadership Forum",
    description: "State-level leadership consultation focusing on merchant protection laws, GST rationalization, and commercial market infrastructure across Maharashtra.",
    caption: "BJP Vyapari Aghadi Maharashtra Pradesh Leadership Meeting",
    span: "wide",
  },
  {
    src: "/images/nmmc-logo.png",
    alt: "Navi Mumbai Merchants Chamber Official Emblem",
    category: "ORGANIZATIONS",
    title: "Navi Mumbai Merchants Chamber — 30+ Year Legacy",
    description: "Official presentation highlighting 400+ commercial member firms, 50-acre dedicated APMC masala complex, and 3 decades of trade advocacy.",
    caption: "Navi Mumbai Merchants Chamber — 30+ Year Legacy & 50-Acre Spice Complex",
    span: "wide",
  },
  {
    src: "/images/awards/achievements-awards-record.jpg",
    alt: "Official achievements record listing 11 major awards and felicitations",
    category: "MEDIA",
    title: "Official Honours Archive — 11 Prestigious Awards",
    description: "Transcribed official document detailing 11 state, national, and international awards conferred upon Shri Kirti Rana for commercial excellence.",
    caption: "Official Honours & Recognitions Archive — 11 Prestigious Awards",
    span: "wide",
  },
  {
    src: "/images/apmc/fruit-market.jpg",
    alt: "Wholesale fruit market at Navi Mumbai APMC",
    category: "APMC",
    title: "Wholesale Fruit Market — Navi Mumbai APMC Turbhe",
    description: "One of Asia's largest wholesale fresh fruit distribution hubs, connecting agricultural orchards across India to regional retail networks.",
    caption: "Fruit Market — Navi Mumbai APMC, Turbhe",
    span: "wide",
  },
  {
    src: "/images/apmc/vegetable-market.jpg",
    alt: "Wholesale vegetable market at Navi Mumbai APMC",
    category: "APMC",
    title: "Wholesale Vegetable Market — APMC Complex",
    description: "Central perishable produce trading terminal handling thousands of metric tons of daily fresh vegetables for the Mumbai Metropolitan Region.",
    caption: "Vegetable Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/grain-market.jpg",
    alt: "Wholesale grain market at Navi Mumbai APMC",
    category: "APMC",
    title: "Wholesale Grain, Rice & Pulses Market",
    description: "Premier agricultural commodity market yard for bulk trading of food grains, pulses, rice, and oilseeds under regulated market oversight.",
    caption: "Grain Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/spice-market.jpg",
    alt: "Wholesale spice market at Navi Mumbai APMC",
    category: "APMC",
    title: "Spices & Dry Fruits Wholesale Complex (Masala Market)",
    description: "The world-famous 50-acre specialized spice market at Turbhe APMC, serving as India's premier export and domestic trading node for spices.",
    caption: "Spice Market — Navi Mumbai APMC",
    span: "tall",
  },
  {
    src: "/images/apmc/onion-potato-market.jpg",
    alt: "Wholesale onion and potato market at Navi Mumbai APMC",
    category: "APMC",
    title: "Onion & Potato Wholesale Trading Yard",
    description: "Strategic wholesale market regulating essential agricultural commodities, price stabilization, and distribution for Western India.",
    caption: "Onion & Potato Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/market-yard.jpg",
    alt: "Navi Mumbai APMC market yard",
    category: "APMC",
    title: "Turbhe APMC Commercial Yard & Logistics Complex",
    description: "Panoramic view of the vast 50-acre APMC commercial yard equipped with truck terminals, merchant godowns, and cold storage facilities.",
    caption: "APMC Market Yard — Turbhe, Navi Mumbai",
    span: "wide",
  },
  {
    src: "/images/events/conference.jpg",
    alt: "Business conference hall before a merchant chamber event",
    category: "EVENTS",
    title: "Annual Merchant Chamber Trade Summit",
    description: "Annual convention hall assembly where commercial delegates, market experts, and government officials meet to discuss trade policies.",
    caption: "Event Photograph — Merchant Chamber Conference",
    span: "wide",
  },
  {
    src: "/images/events/trade-meeting.jpg",
    alt: "Business meeting setup at a merchant association meeting",
    category: "EVENTS",
    title: "Merchant Grievance & Policy Consultation",
    description: "Interactive trade association council meeting addressing commercial dispute redressal, market fees, and operational guidelines.",
    caption: "Event Photograph — Merchant Meeting",
  },
  {
    src: "/images/events/felicitations.jpg",
    alt: "Ceremonial stage with garlands at a felicitation event",
    category: "EVENTS",
    title: "Merchant Honour & Felicitation Ceremony",
    description: "Ceremonial stage honoring outstanding veteran merchants, social contributors, and trade pioneers for lifelong community service.",
    caption: "Event Photograph — Felicitation Ceremony",
  },
  {
    src: "/images/events/community.jpg",
    alt: "Community gathering hall before a merchant community meeting",
    category: "EVENTS",
    title: "Merchant Welfare & Social Outreach Gathering",
    description: "Community outreach program providing medical relief, flood assistance, and educational support to trade workers and their families.",
    caption: "Event Photograph — Community Activity",
  },
  {
    src: "/images/kirti-rana/agriculture.jpg",
    alt: "Agricultural landscape — golden wheat field at sunrise",
    category: "BUSINESS",
    title: "Agro-Commodity Stewardship — Kisan Kirti Agro",
    description: "Connecting rural agricultural producers directly with national wholesale markets, export channels, and food processing industries.",
    caption: "Agriculture & Trade — Kisan Kirti Agro",
    span: "wide",
  },
  {
    src: "/images/media/newspaper-texture.jpg",
    alt: "Newspaper coverage — Vyapar Kesari",
    category: "MEDIA",
    title: "Vyapar Kesari Press Release & Media Coverage",
    description: "Front-page feature coverage in premier commercial newspaper Vyapar Kesari highlighting APMC reform proposals led by Shri Kirti Rana.",
    caption: "Featured in Vyapar Kesari — Press Coverage",
  },
];

export const galleryByCategory = (category: "ALL" | GalleryCategory) =>
  category === "ALL"
    ? galleryItems
    : galleryItems.filter((item) => item.category === category);
