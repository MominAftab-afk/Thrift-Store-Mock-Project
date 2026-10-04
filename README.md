# RE/SOLE ARCHIVE — Thrift Store Mock Project

An interactive, high-craft web platform for a curated pre-owned sneaker and footwear brand. Built on the philosophy of trust, verifiable condition grading, circularity, and mindful luxury.

---

## 🌟 Key Features

### 1. Curated Archive Catalog & Discovery
* **Interactive Footwear Catalog**: Multi-facet filtering by Brand (Nike, Adidas, Puma), Style, Size, Max Price, Condition Grade, and Search query.
* **Shoe Finder Matrix**: Multi-step interactive quiz (Style $\rightarrow$ Size $\rightarrow$ Palette $\rightarrow$ Budget $\rightarrow$ Purpose) offering tailored inventory matches.
* **Visual Search**: Upload photo or drag-and-drop sneaker image with instant visual similarity matching.
* **Limited-Time Vault Deals**: Real-time ticker countdown timers against expiring archive offers.
* **Drop Alerts Waitlist**: Brand-specific notification subscription flow persisted to the database.

### 2. Immersive Product Detail Page (PDP)
* **Granular Condition Meter**: Interactive breakdown across Sole Traction, Upper Leather/Suede, and Inner Linings with qualitative metrics.
* **Authenticity Verification Checklist**: 4-point physical verification badge covering Logo Accuracy, Stitching Consistency, Serial/UPC Matches, and Material Feel.
* **Curator Narrative & Shoe Story**: Unique backstory block for every pair detailing release era, usage history, provenance, and distinctive patina notes.
* **360° Interactive Turntable & 3D Viewer**: Multi-angle examination turntable with tactile rotation controls.
* **Virtual Try-On (AR) Studio**: Camera permission and foot alignment overlay with interactive repositioning, scaling, and rotation controls.

### 3. Operational & Circularity Backbone
* **Local Pickup & Vault Gallery**: Embedded OpenStreetMap live tile layer (zero API key required), operating hours, directions, and a live Pickup ($0) vs. Delivery ($12) cart toggle.
* **Order Tracking Pipeline**: Visual 5-stage logistics stepper:
  $$\text{Confirmed} \longrightarrow \text{Inspected \& Packed} \longrightarrow \text{Shipped / Dispatched} \longrightarrow \text{Out for Delivery} \longrightarrow \text{Delivered}$$
* **Sell & Donate Footwear Intake**: 3-step consignment submission wizard for photo uploads, condition self-reporting, payout intent (Direct Cash, +15% Store Credit, or Charitable Donation), and ticket generation.
* **Internal Operations Console (`/admin`)**: Staff portal to add/edit shoe listings, appraise incoming sell/donate submissions, and update order fulfillment statuses.

---

## 🛠️ Technology Stack

* **Framework & Build**: [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/)
* **Routing**: [React Router v6](https://reactrouter.com/)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with pure gallery aesthetic tokens, micro-animations, and custom typography (`Fraunces`, `Plus Jakarta Sans`, `JetBrains Mono`)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **3D & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), Canvas Confetti
* **Icons**: [Lucide React](https://lucide.dev/)
* **Persistence & Backend**: Universal Service Abstraction (`dbService`) supporting LocalStorage with optional Firebase/Firestore backend integration

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node 20 / 25)
* npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/MominAftab-afk/Thrift-Store-Mock-Project.git
cd Thrift-Store-Mock-Project

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the archive.

### Building for Production
```bash
npm run build
```

---

## 🗺️ Key Routes
* `/` — Archive Home (Hero, Trending, Sustainability Metrics, Story)
* `/shop` — Catalog with multi-facet filters & sorting
* `/product/:id` — Detail Page (360° viewer, Condition Meter, Authenticity check, Virtual Try-On)
* `/quiz` — Interactive Shoe Finder Matrix
* `/drop-alerts` — Archival Drop Alerts Ledger
* `/local-pickup` — Boutique Pickup, Hours & Live Map
* `/sell-donate` — Consignment & Donation Intake Wizard
* `/track-order` — Logistics 5-Stage Stepper
* `/admin` — Internal Operations Console (Inventory, Appraisals, Orders)
* `/style-guide` — Brand Design System & Token Reference
