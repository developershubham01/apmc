# APMC — Navi Mumbai Merchants' Chamber | Official Portal

Official digital portal for **Kirti Rana**, President of the **Navi Mumbai Merchants' Chamber (NMMC)** at the APMC Market Complex, Vashi — Asia's largest wholesale agri-commodity trade market.

---

## 🌟 Key Highlights

- **Official Leadership & Profile**: Extensive career history, 30+ years of trade leadership, and official designations across CAIT, NMMC, and trade bodies.
- **Authentic Media & Honors**: Coverage of the *Global Business Icon Award (Dubai 2025)*, felicitation with *Maharashtra DCM Devendra Fadnavis* (TV1 India Live), *Bharatiya Vyapar Mahotsav 2026*, and state trade delegations.
- **50-Acre APMC Trade Hub**: Interactive directories and overview of the Spice Market, Grain Market, Fruit Market, Vegetable Market, and Onion & Potato Market.
- **Live Wholesale Mandi Rates**: Database-backed real-time commodity price tracker across wholesale trade divisions.
- **Trade Enquiry & Grievance Desk**: Interactive communication desk for 400+ chamber members, traders, farmers, and business partners.
- **Media & Press Center**: High-resolution gallery, press coverage, video archives, and social welfare initiatives.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **Database & ORM**: Prisma ORM with SQLite / PostgreSQL support
- **Icons & Assets**: Lucide React & Custom Official Emblems

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/developershubham01/apmc.git
cd apmc
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Generate Database Client & Seed
```bash
npm run postinstall
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment on Vercel

1. Import this repository (`developershubham01/apmc`) on [Vercel](https://vercel.com/new).
2. Configure environment variables (`DATABASE_URL`, `ADMIN_KEY`).
3. Click **Deploy**.

---

## 📜 License

© 2026 Navi Mumbai Merchants' Chamber. All rights reserved.
