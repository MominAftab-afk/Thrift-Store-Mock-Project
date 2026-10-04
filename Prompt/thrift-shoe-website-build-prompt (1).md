# MASTER BUILD PROMPT — Thrifted Shoe Brand E-Commerce Platform

> Paste this entire document as your prompt to Claude (Antigravity) or Google AI Studio.
> It is written so the AI can build without stopping to ask you questions — mock data is
> specified everywhere real data isn't provided yet.

---

## 0. ROLE & OPERATING MODE

You are acting as a **senior full-stack engineering team** building a production-grade
web app, not a prototype. Specifically, think and work as if you are simultaneously:

- **Tech Lead** — owns architecture, folder structure, data models, decides tradeoffs
- **Frontend Engineer** — builds React components, state, routing, responsiveness
- **3D/Creative Technologist** — builds the Three.js/WebGL interactive shoe viewer
- **Backend/Firebase Engineer** — designs Firestore schema, security rules, Cloud Functions
- **UI/UX Designer** — makes real design decisions (type, spacing, motion, color) instead
  of using generic template defaults
- **QA** — sanity-checks that every feature listed below actually renders and works with
  mock data before considering it "done"

Do not ask me clarifying questions before starting. Where real information isn't given
(section 6), use clearly-labeled, realistic **mock data** so the app is fully functional
end-to-end. I will swap in real content later.

---

## 1. PROJECT SUMMARY

Build the website for a **thrifted/pre-owned sneaker and shoe brand**. The brand's whole
identity is: *trusted, curated, sustainable, and premium* — thrifted doesn't mean lowered
expectations. The site must feel closer to a boutique streetwear drop site (think
Cartier Watches & Wonders' polish, Serotoninn's motion-led editorial energy, immersive-g's
cinematic atmosphere) than a generic Shopify template. Nothing about it should look
"flat, default, or templated." Every screen should feel intentional.

**Core promise to the user:** you can trust exactly what condition a used shoe is in,
see it in 3D from every angle, know it's authentic, and feel good about the sustainability
angle — all wrapped in a slick, cinematic shopping experience.

---

## 2. TECH STACK (fixed — do not substitute)

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **React 18 + Vite** | fast dev server, modern, what you asked for |
| Routing | React Router v6 | standard |
| Styling | Tailwind CSS + CSS variables for theming | fast, consistent, easy dark/light tokens |
| 3D / Interactive | **react-three-fiber + drei** (Three.js) | best-supported way to do 360°/3D shoe view in React |
| State management | Zustand (lightweight) or React Context — your call, pick one and be consistent | avoid Redux boilerplate for a project this size |
| Database & Auth | **Firebase (Firestore + Firebase Auth + Firebase Storage)** | easiest "Google database" to wire up; realtime listeners, auth, and file storage in one SDK, generous free tier |
| Hosting target | Firebase Hosting or Vercel | either works with this stack |
| Forms/validation | React Hook Form + Zod | clean, typed validation |
| Animation | Framer Motion (UI/page transitions) + GSAP (scroll-triggered/cinematic sequences) | Framer for component-level, GSAP for the more "editorial scroll" moments like the ripped-seam/hero effects seen on reference sites |
| Notifications (Drop Alerts / Wishlist) | Firestore + Firebase Cloud Messaging (mock the sending step if no backend push setup yet) | |
| WhatsApp integration | `wa.me` deep link with pre-filled message (no SDK needed) | simplest, no API key required |

If Google AI Studio's environment doesn't support Firebase directly, scaffold Firestore
calls behind a clean `/src/services/db.js` abstraction layer so swapping providers later
is a one-file change, not a rewrite.

---

## 3. INFORMATION ARCHITECTURE / PAGES

1. **Home** — cinematic hero (video/3D shoe hero moment), Trending Shoes rail, Sustainability
   Counter, category entry points, drop alert signup teaser
2. **Shop / Catalog** — grid with filters (color, style, brand, size, price, condition),
   sort, Limited-Time Deals countdown badges
3. **Product Detail Page (PDP)** — this is the flagship page:
   - 360°/3D interactive viewer (react-three-fiber)
   - Virtual Try-On toggle (camera-based AR placeholder — see §6)
   - Shoe Condition Meter (sole / upper / inside breakdown)
   - Authenticity Verified badge + checklist
   - Shoe Story (narrative block: age, usage, source)
   - Price Comparison (original vs thrift vs savings)
   - Smart Size Recommendation input
   - Detailed Reviews (condition accuracy / size accuracy / quality / description accuracy)
   - Wishlist + Notify Me
   - "Ask About This Shoe" WhatsApp CTA button
4. **Shoe Finder Quiz** — multi-step quiz (style/size/color/budget/purpose) → recommendation results page
5. **Visual Shoe Search** — upload-a-photo → visually similar results (mock the matching
   logic — see §6)
6. **Sell/Donate Your Shoes** — submission form (photos + condition self-report + contact)
7. **Order Tracking** — order lookup showing status stepper (Confirmed → Packed → Shipped
   → Out for Delivery → Delivered)
8. **Wishlist** — saved shoes page
9. **Local Pickup** — map + store hours + directions, delivery option toggle
10. **Cart / Checkout** — standard, but styled to match brand
11. **Auth** — sign in / sign up (Firebase Auth)
12. **Admin/Dashboard** *(basic, internal-only)* — add/edit shoe listings, view submitted
    sell/donate requests, view orders (this is what makes the mock data replaceable later)

---

## 4. UNIQUE FEATURES — full spec (build all of these)

Build every feature below as a **real, working component wired to Firestore**, using mock
seed data where actual inventory doesn't exist yet.

### From the uploaded feature doc:
1. **Shoe Condition Meter** — visual meter (e.g. radial or segmented bar) with an overall
   label (Like New / Excellent / Good / Fair) plus three sub-ratings: sole, upper, inside.
2. **Authenticity Check** — "Authenticity Verified" badge component; on click/hover shows
   the checklist (logo, stitching, serial number, material) with checkmarks.
3. **Shoe Story** — short narrative field per shoe: age, usage history, source, one unique
   detail. Style this as an editorial pull-quote block, not a plain paragraph.
4. **Virtual Try-On** — camera-based AR-style preview. Build the UI/UX fully; for the
   actual foot-tracking/AR placement, stub it with a clearly-labeled placeholder overlay
   component (`<VirtualTryOnStub />`) that requests camera permission and overlays a
   static shoe render on the video feed at a fixed position — note in a code comment that
   swapping in a real foot-tracking model (e.g. MediaPipe) is the production upgrade path.
5. **Smart Size Recommendation** — form: brand + usual size → returns a recommended size
   from a static brand-to-brand conversion lookup table (seed this table with ~10 common
   sneaker brands and realistic conversions).
6. **Price Comparison** — original price / thrift price / amount saved, computed and
   displayed prominently (this is a strong conversion driver — make it visually bold).
7. **Shoe Finder Quiz** — style, size, color, budget, purpose → filters the mock catalog
   and shows top matches.
8. **Local Pickup Map** — embed a map (use a static/mock map component if no Google Maps
   API key is provided — see §6) with store hours and a delivery-vs-pickup toggle.
9. **Drop Alerts** — subscribe by brand/category; write subscription to Firestore; mock
   the actual notification-sending (log to console / show a "you're subscribed" state).
10. **Wishlist & Notify Me** — heart icon on every shoe card, persisted per-user in
    Firestore; "notify me" checkbox on out-of-stock/sold items.
11. **Detailed Reviews** — review form with 4 separate rating dimensions (condition
    accuracy, size accuracy, quality, description accuracy) plus free text; aggregate and
    display averages per dimension, not just one overall star rating.
12. **Sustainability Counter** — live-updating (or mock-live) counter: "X pairs given a
    second life." Pull the count from a Firestore aggregate doc; animate the number
    counting up on scroll into view.

### From your additional notes:
- **Visual Shoe Search** — image upload UI; for actual visual similarity matching, stub
  with a mock function that returns a random subset of the catalog tagged "visually
  similar" — comment clearly that a real implementation would use an embedding-based
  image search (e.g. CLIP embeddings + vector search).
- **Filter by Color & Style** — standard multi-select filters on the Shop page.
- **360° Shoe View** — build this for real using react-three-fiber: either (a) a rotating
  3D model if a `.glb`/`.gltf` model is provided, or (b) an image-sequence turntable
  fallback (36 photos rotated) if no 3D model exists yet — implement both code paths and
  auto-fallback to (b) with mock placeholder frames.
- **Trending Shoes** — rail sorted by a mock "views/likes/searches" score field.
- **WhatsApp CTA** — `https://wa.me/<number>?text=<prefilled message with shoe name/link>`
  button on every PDP.
- **Limited-Time Deals** — countdown timer component (real countdown logic, mock end-times).
- **Order Tracking** — status stepper UI, driven by an `orderStatus` enum field in Firestore.
- **Sell/Donate Your Shoes** — multi-step form (photo upload to Firebase Storage + condition
  self-report + contact info) that writes to a `submissions` collection.
- **Categorization by Brand & Size** — standard faceted filtering, same system as §Color/Style.

---

## 5. DESIGN DIRECTION

- **Mood**: minimal, elegant, gallery-like — closer to an editorial sneaker archive or a
  boutique concept store than a marketplace. Calm and confident, not loud or cluttered.
  Premium through restraint, not through decoration. Not cutesy, not corporate-clean-and-boring.
- **Color palette — skin/beige, light mode**:
  - Base background: warm skin/beige tones (e.g. `#F3EAE1`, `#EDE1D3`, `#E7D9C9` range) —
    pick one as the primary canvas, use the others as subtle section-to-section variation
  - Ink/text: near-black or deep espresso brown (e.g. `#1C1917`) instead of pure black —
    softer against the beige than true black
  - One accent color only, used sparingly for CTAs, badges, and the Sustainability Counter —
    a muted clay/terracotta or deep olive works well against skin tones (avoid anything neon
    or saturated; it should feel earthy, not techy)
  - Card/surface color: a slightly lighter or slightly warmer beige than the page background
    so product cards lift off the page without needing heavy shadows
  - Define all of the above as CSS variables/design tokens up front so the palette is easy
    to tune later
- **Typography**: pick one elegant serif or high-contrast editorial serif for headlines
  (something with the confidence of a fashion/watch brand — think Cartier-level polish) +
  one clean, understated sans/grotesk for body and UI copy. Generous letter-spacing on
  small caps/labels (e.g. "AUTHENTICITY VERIFIED", filter labels) reinforces the elegant
  feel. Avoid default system fonts entirely.
- **Whitespace & layout**: minimal means real negative space — do not fill every area.
  Generous margins, a restrained grid, product photography given room to breathe. Fewer
  , better-chosen UI elements per screen rather than many small ones.
- **Motion**: subtle and intentional, not showy — soft fades/slides on scroll reveal,
  smooth hover states where product imagery shifts or the color story changes slightly,
  a quiet, confident hero moment on Home (e.g. a single shoe rotating slowly in 3D against
  the beige field) rather than an aggressive cinematic sequence. Motion should reinforce
  the "elegant" feeling, never fight it — nothing frantic or trend-chasing.
- **Imagery treatment**: shoe photography should look shot on a warm neutral backdrop
  consistent with the beige palette, so product photos feel native to the site rather than
  pasted on top of it.
- **Layout structure**: standard, predictable grid underneath the refined surface —
  navigation stays simple and legible even where visuals are elevated. Don't sacrifice
  usability for spectacle.
- Do **not** copy any reference site's proprietary assets, code, or exact layout — use them
  only as a general quality bar, build original design suited to the beige/minimal direction
  above.

---

## 6. WHAT I NEED TO PROVIDE vs. WHAT TO MOCK

**If I haven't provided these yet, generate realistic mock data/placeholders and clearly
mark them as such in code comments (`// MOCK — replace with real data`):**

- Brand name, logo, tagline — palette is already specified in §5 (skin/beige, minimal),
  use it as given
- Real shoe inventory (photos, prices, condition data, stories) — mock ~12–15 realistic
  sneaker listings, weighted toward **Nike, Adidas, and Puma** (a few classic/iconic
  silhouettes per brand — e.g. Nike Air Force 1 / Air Max / Dunk, Adidas Samba / Stan
  Smith / Ultraboost, Puma Suede / RS-X), with realistic thrift pricing, condition
  ratings, and a short shoe story per pair. Use placeholder/stock-style product photos
  shot on a neutral background if real photography isn't available yet.
- Real 3D shoe models (`.glb` files) — fallback to image-sequence turntable
- Store location/address for the pickup map
- WhatsApp business number
- Firebase project config (I will supply real API keys — use placeholder env vars
  `VITE_FIREBASE_*` in the meantime)
- Google Maps API key (if a real map is wanted instead of a static mock)
- Payment gateway (Stripe/local Pakistani gateway e.g. JazzCash/Easypaisa) — not specified
  yet, so build checkout UI only, stub the actual payment call

**Please tell the AI explicitly if/when you have:** real product photography, a real
address, a real WhatsApp number, and which payment gateway Pakistani customers should use
— those are the four things that most change real functionality vs. mock.

---

## 7. CODE QUALITY BAR

- Proper folder structure: `/src/components`, `/src/pages`, `/src/features/<feature-name>`,
  `/src/services` (Firebase/db calls isolated here), `/src/hooks`, `/src/store`, `/src/utils`
- Each of the 12+ unique features above should be its own self-contained feature folder/component,
  not tangled into one giant ProductPage file
- Firestore security rules included (even basic ones) — don't leave the DB wide open
- Responsive from the start (mobile-first), not retrofitted
- Loading and empty states for every data-driven component — nothing should render blank/broken
  before Firestore data resolves
- Comment generously anywhere mock data or stubbed logic stands in for a real integration

---

## 8. DELIVERABLE

A working Vite + React app, Firebase-connected, with every feature in §4 implemented and
visibly functioning against seeded mock data, ready for me to:
1. drop in real Firebase credentials
2. replace mock shoe inventory with real listings
3. swap the Virtual Try-On and Visual Search stubs for production ML models later

Build it in logical order: scaffold → design system/tokens → Home → Shop/PDP core →
the 12 unique features → auth/wishlist/orders → admin panel → polish/motion pass.
