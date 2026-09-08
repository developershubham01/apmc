import {
  Apple,
  Carrot,
  Wheat,
  Flame,
  CookingPot,
  type LucideIcon,
} from "lucide-react";

export type Market = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  image: string;
  icon: LucideIcon;
  commodities: string[];
  href: string;
};

export const markets: Market[] = [
  {
    slug: "fruit-market",
    title: "Fruit Market",
    shortTitle: "Fruits",
    description:
      "Wholesale trading of seasonal and exotic fruits sourced from across India.",
    longDescription:
      "The Fruit Market at Navi Mumbai APMC handles wholesale trade of a wide variety of seasonal and year-round fruits. Producers, commission agents and retailers converge here for daily auctions and bulk distribution across the Mumbai Metropolitan Region.",
    image: "/images/apmc/fruit-market.jpg",
    icon: Apple,
    commodities: ["Apples", "Bananas", "Oranges", "Grapes", "Pomegranates", "Mangoes"],
    href: "/apmc#fruit-market",
  },
  {
    slug: "vegetable-market",
    title: "Vegetable Market",
    shortTitle: "Vegetables",
    description:
      "Daily wholesale auction of fresh vegetables supplying the region's retail markets.",
    longDescription:
      "The Vegetable Market is among the busiest sections of the APMC, with daily arrivals of fresh vegetables from farms across Maharashtra and neighbouring states. Trading begins in the early hours with auction-based price discovery.",
    image: "/images/apmc/vegetable-market.jpg",
    icon: Carrot,
    commodities: ["Tomatoes", "Onions", "Potatoes", "Leafy greens", "Cauliflower", "Capsicum"],
    href: "/apmc#vegetable-market",
  },
  {
    slug: "grain-market",
    title: "Grain Market",
    shortTitle: "Grains",
    description:
      "Bulk wholesale of cereals, pulses and staple grains in sack and lot quantities.",
    longDescription:
      "The Grain Market caters to wholesale trade in cereals, pulses and staple grains. Stocks arrive in jute and PP sacks and are traded in lots to distributors, ration suppliers and institutional buyers.",
    image: "/images/apmc/grain-market.jpg",
    icon: Wheat,
    commodities: ["Wheat", "Rice", "Lentils", "Gram", "Millets", "Pulses"],
    href: "/apmc#grain-market",
  },
  {
    slug: "spice-market",
    title: "Spice Market",
    shortTitle: "Spices",
    description:
      "Trading of whole and ground spices central to India's culinary heritage.",
    longDescription:
      "The Spice Market trades whole and ground spices that are central to Indian cuisine. Vibrant mounds of chilli, turmeric, coriander and cumin change hands daily, supplying retailers and food businesses.",
    image: "/images/apmc/spice-market.jpg",
    icon: Flame,
    commodities: ["Red chilli", "Turmeric", "Coriander", "Cumin", "Pepper", "Cardamom"],
    href: "/apmc#spice-market",
  },
  {
    slug: "onion-potato-market",
    title: "Onion & Potato Market",
    shortTitle: "Onion & Potato",
    description:
      "High-volume wholesale of onion and potato — staples of the Indian kitchen.",
    longDescription:
      "The Onion & Potato Market is a high-volume trading section handling staple tubers and bulbs that are central to Indian cooking. Large jute sacks are auctioned and dispatched to retail mandis across the region.",
    image: "/images/apmc/onion-potato-market.jpg",
    icon: CookingPot,
    commodities: ["Onions", "Potatoes", "Garlic", "Ginger"],
    href: "/apmc#onion-potato-market",
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);
