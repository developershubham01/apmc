export type RateTrend = "up" | "down" | "steady";

export type RateRow = {
  commodity: string;
  variety: string;
  unit: string;
  min: number;
  max: number;
  modal: number;
  trend: RateTrend;
};

export type RateGroup = {
  slug: string;
  label: string;
  updated: string;
  note: string;
  rows: RateRow[];
};

// Indicative wholesale price bands for orientation only.
// Figures are illustrative sample data — traders must verify live prices
// through the official Mumbai APMC portal before making decisions.
export const ratesUpdatedAt = "05 September 2026";

export const rateGroups: RateGroup[] = [
  {
    slug: "fruit-market",
    label: "Fruits",
    updated: ratesUpdatedAt,
    note: "Seasonal arrivals influence fruit price bands significantly.",
    rows: [
      { commodity: "Apple", variety: "Kashmiri / Shimla", unit: "per kg", min: 90, max: 180, modal: 135, trend: "steady" },
      { commodity: "Banana", variety: "Robusta / Grand Naine", unit: "per dozen", min: 25, max: 55, modal: 40, trend: "up" },
      { commodity: "Orange", variety: "Nagpur", unit: "per kg", min: 40, max: 90, modal: 65, trend: "down" },
      { commodity: "Grapes", variety: "Thompson Seedless", unit: "per kg", min: 55, max: 120, modal: 85, trend: "up" },
      { commodity: "Pomegranate", variety: "Bhagwa", unit: "per kg", min: 70, max: 160, modal: 110, trend: "steady" },
      { commodity: "Mango", variety: "Alphonso (off-season)", unit: "per kg", min: 150, max: 350, modal: 220, trend: "steady" },
    ],
  },
  {
    slug: "vegetable-market",
    label: "Vegetables",
    updated: ratesUpdatedAt,
    note: "Vegetable prices vary daily with arrival volumes from producing belts.",
    rows: [
      { commodity: "Tomato", variety: "Local / Hybrid", unit: "per kg", min: 15, max: 45, modal: 28, trend: "down" },
      { commodity: "Onion", variety: "Nashik Red", unit: "per kg", min: 18, max: 42, modal: 27, trend: "up" },
      { commodity: "Potato", variety: "Jyoti / Kufri", unit: "per kg", min: 14, max: 32, modal: 22, trend: "steady" },
      { commodity: "Cauliflower", variety: "Snowball", unit: "per kg", min: 20, max: 50, modal: 34, trend: "steady" },
      { commodity: "Capsicum", variety: "Green", unit: "per kg", min: 30, max: 70, modal: 48, trend: "up" },
      { commodity: "Leafy Greens", variety: "Methi / Palak", unit: "per bundle", min: 8, max: 25, modal: 15, trend: "down" },
    ],
  },
  {
    slug: "grain-market",
    label: "Grains",
    updated: ratesUpdatedAt,
    note: "Grain lots are typically traded per quintal in sack quantities.",
    rows: [
      { commodity: "Wheat", variety: "Lokwan / Sharbati", unit: "per quintal", min: 2400, max: 3100, modal: 2750, trend: "steady" },
      { commodity: "Rice", variety: "Sona Masoori", unit: "per quintal", min: 3200, max: 4200, modal: 3700, trend: "up" },
      { commodity: "Gram (Chana)", variety: "Kabuli / Desi", unit: "per quintal", min: 4200, max: 5800, modal: 5000, trend: "down" },
      { commodity: "Lentils (Masoor)", variety: "Local", unit: "per quintal", min: 4800, max: 6200, modal: 5500, trend: "steady" },
      { commodity: "Millets (Bajra)", variety: "Local", unit: "per quintal", min: 2100, max: 2800, modal: 2450, trend: "up" },
      { commodity: "Tur (Arhar)", variety: "Local", unit: "per quintal", min: 6800, max: 8500, modal: 7600, trend: "steady" },
    ],
  },
  {
    slug: "spice-market",
    label: "Spices",
    updated: ratesUpdatedAt,
    note: "Spice quotations move with harvest cycles and export demand.",
    rows: [
      { commodity: "Red Chilli", variety: "S4 / Teja", unit: "per quintal", min: 12000, max: 22000, modal: 17000, trend: "up" },
      { commodity: "Turmeric", variety: "Salem / Sangli", unit: "per quintal", min: 9500, max: 15500, modal: 12500, trend: "steady" },
      { commodity: "Coriander", variety: "Eagle / Badami", unit: "per quintal", min: 6500, max: 9200, modal: 7800, trend: "down" },
      { commodity: "Cumin (Jeera)", variety: "Unjha", unit: "per quintal", min: 22000, max: 32000, modal: 27000, trend: "up" },
      { commodity: "Black Pepper", variety: "Malabar", unit: "per kg", min: 480, max: 720, modal: 600, trend: "steady" },
      { commodity: "Cardamom", variety: "Green (8mm)", unit: "per kg", min: 1800, max: 3200, modal: 2500, trend: "down" },
    ],
  },
  {
    slug: "onion-potato-market",
    label: "Onion & Potato",
    updated: ratesUpdatedAt,
    note: "High-volume staples; monitor official portal for auction-level rates.",
    rows: [
      { commodity: "Onion", variety: "Red (Losal)", unit: "per quintal", min: 1400, max: 2600, modal: 1950, trend: "up" },
      { commodity: "Onion", variety: "Nashik Grade-A", unit: "per quintal", min: 1800, max: 3200, modal: 2400, trend: "up" },
      { commodity: "Potato", variety: "Chipsona", unit: "per quintal", min: 900, max: 1600, modal: 1200, trend: "steady" },
      { commodity: "Potato", variety: "Table (Jyoti)", unit: "per quintal", min: 800, max: 1450, modal: 1050, trend: "down" },
      { commodity: "Garlic", variety: "Local", unit: "per quintal", min: 5500, max: 9500, modal: 7200, trend: "steady" },
      { commodity: "Ginger", variety: "Fresh", unit: "per quintal", min: 4500, max: 8000, modal: 6200, trend: "up" },
    ],
  },
];

export const formatINR = (value: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
