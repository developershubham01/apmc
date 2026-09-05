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

// NOTE: Where a verified photograph is not yet available, the gallery
// uses atmospheric / commodity imagery and "Event Photograph" captions
// rather than fabricating event names or dates.
export const galleryItems: GalleryItem[] = [
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
