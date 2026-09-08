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
  span?: "wide" | "tall" | "normal";
};

export const galleryFilters: ("ALL" | GalleryCategory)[] = [
  "ALL",
  "KIRTI RANA",
  "BUSINESS",
  "ORGANIZATIONS",
  "EVENTS",
  "APMC",
  "BOARD",
  "MEDIA",
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    alt: "Mr. Kirti Rana receiving the Global Business Icon Award in Dubai",
    category: "KIRTI RANA",
    caption: "Global Business ICON Award Presentation — Dubai 2025",
    span: "wide",
  },
  {
    src: "/images/media/dcm-devendra-fadnavis-kirti-rana-felicitation.jpg",
    alt: "Shri Kirti Rana felicitating DCM Devendra Fadnavis on stage broadcast on TV1 India Live",
    category: "MEDIA",
    caption: "TV1 India Live — Felicitating DCM Devendra Fadnavis at Navi Mumbai Leaders Meet",
    span: "wide",
  },
  {
    src: "/images/media/dcm-devendra-fadnavis-mathadi-meet-live.jpg",
    alt: "Shri Kirti Rana and DCM Devendra Fadnavis at Mathadi leaders meeting on TV1 India Live",
    category: "MEDIA",
    caption: "TV1 India Live Broadcast — With DCM Devendra Fadnavis at Mathadi Karyakarta Meet",
    span: "wide",
  },
  {
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    alt: "Bharatiya Vyapar Mahotsav 2026 Invitation Flyer — Bharat Mandapam, New Delhi",
    category: "EVENTS",
    caption: "Bharatiya Vyapar Mahotsav 2026 — ITPO & CAIT Initiative, New Delhi",
    span: "tall",
  },
  {
    src: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    alt: "Shri Kirti Rana with BJP Vyapari Aghadi Maharashtra Pradesh leadership",
    category: "ORGANIZATIONS",
    caption: "BJP Vyapari Aghadi Maharashtra Pradesh Leadership Meeting",
    span: "wide",
  },
  {
    src: "/images/association/salient-features-merchants-chamber.jpg",
    alt: "Salient Features of Navi Mumbai Merchants Chamber presentation",
    category: "ORGANIZATIONS",
    caption: "Navi Mumbai Merchants Chamber — 30+ Year Legacy & 50-Acre Spice Complex",
    span: "wide",
  },
  {
    src: "/images/awards/achievements-awards-record.jpg",
    alt: "Official achievements record listing 11 major awards and felicitations",
    category: "MEDIA",
    caption: "Official Honours & Recognitions Archive — 11 Prestigious Awards",
    span: "wide",
  },
  {
    src: "/images/apmc/fruit-market.jpg",
    alt: "Wholesale fruit market at Navi Mumbai APMC",
    category: "APMC",
    caption: "Fruit Market — Navi Mumbai APMC, Turbhe",
    span: "wide",
  },
  {
    src: "/images/apmc/vegetable-market.jpg",
    alt: "Wholesale vegetable market at Navi Mumbai APMC",
    category: "APMC",
    caption: "Vegetable Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/grain-market.jpg",
    alt: "Wholesale grain market at Navi Mumbai APMC",
    category: "APMC",
    caption: "Grain Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/spice-market.jpg",
    alt: "Wholesale spice market at Navi Mumbai APMC",
    category: "APMC",
    caption: "Spice Market — Navi Mumbai APMC",
    span: "tall",
  },
  {
    src: "/images/apmc/onion-potato-market.jpg",
    alt: "Wholesale onion and potato market at Navi Mumbai APMC",
    category: "APMC",
    caption: "Onion & Potato Market — Navi Mumbai APMC",
  },
  {
    src: "/images/apmc/market-yard.jpg",
    alt: "Navi Mumbai APMC market yard",
    category: "APMC",
    caption: "APMC Market Yard — Turbhe, Navi Mumbai",
    span: "wide",
  },
  {
    src: "/images/events/conference.jpg",
    alt: "Business conference hall before a merchant chamber event",
    category: "EVENTS",
    caption: "Event Photograph — Merchant Chamber Conference",
    span: "wide",
  },
  {
    src: "/images/events/trade-meeting.jpg",
    alt: "Business meeting setup at a merchant association meeting",
    category: "EVENTS",
    caption: "Event Photograph — Merchant Meeting",
  },
  {
    src: "/images/events/felicitations.jpg",
    alt: "Ceremonial stage with garlands at a felicitation event",
    category: "EVENTS",
    caption: "Event Photograph — Felicitation Ceremony",
  },
  {
    src: "/images/events/community.jpg",
    alt: "Community gathering hall before a merchant community meeting",
    category: "EVENTS",
    caption: "Event Photograph — Community Activity",
  },
  {
    src: "/images/kirti-rana/agriculture.jpg",
    alt: "Agricultural landscape — golden wheat field at sunrise",
    category: "BUSINESS",
    caption: "Agriculture & Trade — Kisan Kirti Agro",
    span: "wide",
  },
  {
    src: "/images/media/newspaper-texture.jpg",
    alt: "Newspaper coverage — Vyapar Kesari",
    category: "MEDIA",
    caption: "Featured in Vyapar Kesari — Press Coverage",
  },
];

export const galleryByCategory = (category: "ALL" | GalleryCategory) =>
  category === "ALL"
    ? galleryItems
    : galleryItems.filter((item) => item.category === category);
