/**
 * MOCK DATA REPOSITORY
 * Realistic seed data for curated, authenticated thrifted sneakers.
 * Focus: Nike, Adidas, Puma classic silhouettes (~15 listings).
 * Every value clearly marked for future production API swap.
 */

// MOCK — Replace with live storage image URLs in production
export const MOCK_SHOES = [
  {
    id: "nike-dunk-low-panda",
    name: "Nike Dunk Low Retro 'Black/White'",
    brand: "Nike",
    silhouette: "Dunk Low",
    colorway: "White / Black",
    sku: "DD1391-100",
    releaseYear: 2021,
    condition: {
      score: 9.3,
      label: "Near Mint",
      subRatings: {
        sole: 9.1,
        upper: 9.5,
        interior: 9.3,
      },
      wearNotes: "Faint micro-creasing on toe box leather. Outsole stars 95% visible. Insole text crisp."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-12",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "SKU & Box Label Verification", passed: true, detail: "Factory code and font weighting match official archive records" },
        { title: "Stitching & Seam Precision", passed: true, detail: "Uniform stitch density per inch, no irregular overlaps" },
        { title: "Material & Leather Grain", passed: true, detail: "Full-grain panels authenticated under UV inspection" },
        { title: "Outsole Tread & Wear Pattern", passed: true, detail: "Zero heel drag, star pattern crisp" },
      ]
    },
    story: {
      age: "3 years archive",
      source: "Consigned from private studio collection, Tokyo",
      usage: "Worn sparingly on indoor editorial shoots. Stored in climate-regulated vault.",
      highlight: "Includes original box and replacement vintage cream laces."
    },
    pricing: {
      originalRetail: 115,
      thriftPrice: 68,
      currency: "$",
    },
    sizing: {
      usSize: 10.5,
      ukSize: 9.5,
      euSize: 44.5,
      cmSize: 28.5,
      fitNotes: "True to size. Standard Nike width."
    },
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 1,
    style: "Streetwear",
    primaryColor: "Black",
    viewsCount: 1420,
    dealEndsAt: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "adidas-samba-classic-white",
    name: "Adidas Samba OG 'Cloud White / Core Black'",
    brand: "Adidas",
    silhouette: "Samba",
    colorway: "Cloud White / Core Black / Gum",
    sku: "B75806",
    releaseYear: 2022,
    condition: {
      score: 9.6,
      label: "Like New",
      subRatings: {
        sole: 9.7,
        upper: 9.6,
        interior: 9.5,
      },
      wearNotes: "Practically unworn. Suede T-toe pristine with plush nap. Gum sole clean."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-20",
      inspectorId: "INSP-3911",
      checklist: [
        { title: "Suede T-Toe Texture Test", passed: true, detail: "Genuine pigskin suede nap authenticated" },
        { title: "Gold Foil Lettering Alignment", passed: true, detail: "Heat-pressed gold foil sits flush with leather seam" },
        { title: "Gum Rubber Density", passed: true, detail: "Durometer rubber hardness test passes standard specs" },
        { title: "Art Number QR Matching", passed: true, detail: "Tongue label matches interior archive database" }
      ]
    },
    story: {
      age: "2 years archive",
      source: "Acquired from curated Milan vintage pop-up",
      usage: "Tried on once indoors; preserved in breathable dust bag.",
      highlight: "Pristine gold foil lettering without any micro-flaking."
    },
    pricing: {
      originalRetail: 100,
      thriftPrice: 62,
      currency: "$",
    },
    sizing: {
      usSize: 9.0,
      ukSize: 8.5,
      euSize: 42.7,
      cmSize: 27.0,
      fitNotes: "Slightly snug toe box. If wide-footed, size up half a size."
    },
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 2,
    style: "Terrace",
    primaryColor: "White",
    viewsCount: 2180,
    dealEndsAt: null,
  },
  {
    id: "puma-suede-classic-xxi",
    name: "Puma Suede Classic XXI 'Peacoat Navy'",
    brand: "Puma",
    silhouette: "Suede Classic",
    colorway: "Peacoat Navy / Puma White",
    sku: "374915-02",
    releaseYear: 2019,
    condition: {
      score: 8.8,
      label: "Excellent",
      subRatings: {
        sole: 8.6,
        upper: 9.0,
        interior: 8.8,
      },
      wearNotes: "Mild sole discoloration consistent with light outdoor walks. Suede rich and deep navy."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-08-30",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "Formstrip Stitch Density", passed: true, detail: "Consistent double-stitch pattern intact" },
        { title: "Insole Arch Cushion Test", passed: true, detail: "Foam elasticity responsive, no compression fatigue" },
        { title: "Gold Archive Stamp", passed: true, detail: "Lateral quarter foil crisp and verified" },
        { title: "Outsole Traction Geometry", passed: true, detail: "Classic textured grid intact with minor heel scuff" }
      ]
    },
    story: {
      age: "5 years archive",
      source: "Acquired from a Berlin vinyl DJ's personal rotation",
      usage: "Gentle weekend wear; carefully brushed with natural horsehair suede brush.",
      highlight: "Beautiful natural patina on the thick white laces."
    },
    pricing: {
      originalRetail: 75,
      thriftPrice: 42,
      currency: "$",
    },
    sizing: {
      usSize: 10.0,
      ukSize: 9.0,
      euSize: 43.0,
      cmSize: 28.0,
      fitNotes: "Runs true to size. Classic Puma medium width."
    },
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 3,
    style: "Heritage",
    primaryColor: "Blue",
    viewsCount: 980,
    dealEndsAt: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "nike-air-max-1-og",
    name: "Nike Air Max 1 '86 OG 'Big Bubble Red'",
    brand: "Nike",
    silhouette: "Air Max 1",
    colorway: "White / University Red / Neutral Grey",
    sku: "DQ3989-100",
    releaseYear: 2023,
    condition: {
      score: 9.4,
      label: "Near Mint",
      subRatings: {
        sole: 9.2,
        upper: 9.5,
        interior: 9.5,
      },
      wearNotes: "Air unit 100% clear with zero clouding or oxidation. Suede mudguards clean."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-04",
      inspectorId: "INSP-1044",
      checklist: [
        { title: "Air Bag Pressure & Clarity", passed: true, detail: "PSI measured within 14-16 lb spec, fully translucent" },
        { title: "Mesh Weave & Breathability", passed: true, detail: "Vintage nylon mesh weave matches 1986 specification" },
        { title: "Heel Nike Air Embroidery", passed: true, detail: "Thread tension and alignment pass authenticity template" },
        { title: "Tongue Tag Sub-Print", passed: true, detail: "Serial and barcode validated with factory archive" }
      ]
    },
    story: {
      age: "1.5 years archive",
      source: "Part of a sneaker architect's reference collection in Amsterdam",
      usage: "Worn strictly indoors for two design review meetings.",
      highlight: "Tribute to Tinker Hatfield's original oversized 1986 window sample."
    },
    pricing: {
      originalRetail: 160,
      thriftPrice: 95,
      currency: "$",
    },
    sizing: {
      usSize: 11.0,
      ukSize: 10.0,
      euSize: 45.0,
      cmSize: 29.0,
      fitNotes: "True to size. Snug arch support."
    },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 4,
    style: "Runner",
    primaryColor: "Red",
    viewsCount: 1850,
    dealEndsAt: null,
  },
  {
    id: "adidas-gazelle-vintage-green",
    name: "Adidas Gazelle Vintage 'Collegiate Green'",
    brand: "Adidas",
    silhouette: "Gazelle",
    colorway: "Collegiate Green / Off White / Gold",
    sku: "FV9678",
    releaseYear: 2020,
    condition: {
      score: 8.9,
      label: "Excellent",
      subRatings: {
        sole: 8.7,
        upper: 9.0,
        interior: 9.0,
      },
      wearNotes: "Subtle sole rub on right heel. Deep forest green suede in prime condition."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-18",
      inspectorId: "INSP-3911",
      checklist: [
        { title: "Suede Color Spectrum Match", passed: true, detail: "Pigment integrity confirmed with colorimeter" },
        { title: "Leather Collar Lining", passed: true, detail: "Supple synthetic leather interior without cracking" },
        { title: "Tongue Emboss Depth", passed: true, detail: "Trefoil logo pressed to standard 1.2mm depth" },
        { title: "Insole Serial Inspection", passed: true, detail: "Removable insole stamping verified" }
      ]
    },
    story: {
      age: "4 years archive",
      source: "Sourced from an indie film wardrobe designer in London",
      usage: "Featured in an autumn scene; stored immediately in archival shoe box.",
      highlight: "Rich forest green colorway that pairs effortlessly with raw denim."
    },
    pricing: {
      originalRetail: 110,
      thriftPrice: 58,
      currency: "$",
    },
    sizing: {
      usSize: 9.5,
      ukSize: 9.0,
      euSize: 43.3,
      cmSize: 27.5,
      fitNotes: "True to size. Fits slightly longer than Nike Dunks."
    },
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 5,
    style: "Terrace",
    primaryColor: "Green",
    viewsCount: 740,
    isSoldOut: true,
    dealEndsAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "puma-palermo-warm-sand",
    name: "Puma Palermo 'Warm Sand & Gum'",
    brand: "Puma",
    silhouette: "Palermo",
    colorway: "Warm Sand / Pristine / Gum",
    sku: "396463-04",
    releaseYear: 2023,
    condition: {
      score: 9.7,
      label: "Like New",
      subRatings: {
        sole: 9.8,
        upper: 9.7,
        interior: 9.6,
      },
      wearNotes: "Deadstock quality. Original factory hangtag included."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-25",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "Lateral Tag Flap Authenticity", passed: true, detail: "Woven nylon tab with gold Puma lettering passes inspection" },
        { title: "Gum Sole Pattern Geometry", passed: true, detail: "Diamond pivot tread completely untouched" },
        { title: "Toe Guard Suede Thickness", passed: true, detail: "2.0mm split cowhide verified" },
        { title: "Box Barcode & Price Tag Match", passed: true, detail: "European distribution barcode confirmed" }
      ]
    },
    story: {
      age: "1 year archive",
      source: "Direct consignor from Munich",
      usage: "Purchased as an extra backup pair; unworn.",
      highlight: "Includes original archive packaging and stickers."
    },
    pricing: {
      originalRetail: 90,
      thriftPrice: 59,
      currency: "$",
    },
    sizing: {
      usSize: 10.0,
      ukSize: 9.0,
      euSize: 43.0,
      cmSize: 28.0,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 6,
    style: "Terrace",
    primaryColor: "Beige",
    viewsCount: 1120,
    dealEndsAt: null,
  },
  {
    id: "nike-air-force-1-white",
    name: "Nike Air Force 1 '07 'Triple White'",
    brand: "Nike",
    silhouette: "Air Force 1",
    colorway: "White / White / White",
    sku: "CW2288-111",
    releaseYear: 2022,
    condition: {
      score: 9.1,
      label: "Near Mint",
      subRatings: {
        sole: 9.0,
        upper: 9.2,
        interior: 9.1,
      },
      wearNotes: "Mild gentle toe crease. Restored with natural beeswax leather cream. Deubré metal tag polished."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-10",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "AF-1 Metal Deubré Weight", passed: true, detail: "Metal alloy density and engraving depth verified" },
        { title: "Midsole Star Pivot Ratio", passed: true, detail: "Tread pivot circles crisp with zero distortion" },
        { title: "Collar Foam Resilience", passed: true, detail: "Heel foam rebound meets original factory specs" },
      ]
    },
    story: {
      age: "2 years archive",
      source: "Consigned by minimalist interior stylist, Copenhagen",
      usage: "Only worn during design studio walkthroughs.",
      highlight: "Clean iconic silhouette with fully conditioned supple leather."
    },
    pricing: {
      originalRetail: 115,
      thriftPrice: 54,
      currency: "$",
    },
    sizing: {
      usSize: 10.5,
      ukSize: 9.5,
      euSize: 44.5,
      cmSize: 28.5,
      fitNotes: "Runs slightly large. Many prefer half size down."
    },
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 7,
    style: "Streetwear",
    primaryColor: "White",
    viewsCount: 1650,
    dealEndsAt: null,
  },
  {
    id: "adidas-stan-smith-og",
    name: "Adidas Stan Smith 'Fairway Green'",
    brand: "Adidas",
    silhouette: "Stan Smith",
    colorway: "Footwear White / Fairway Green",
    sku: "M20324",
    releaseYear: 2021,
    condition: {
      score: 9.0,
      label: "Near Mint",
      subRatings: {
        sole: 8.9,
        upper: 9.2,
        interior: 9.0,
      },
      wearNotes: "Perforated 3-stripes clean. Minor dirt on outsole rim washed and disinfected."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-02",
      inspectorId: "INSP-3911",
      checklist: [
        { title: "Stan Smith Portrait Etching", passed: true, detail: "Tongue line illustration authentic and razor sharp" },
        { title: "Perforated Ventilation Alignment", passed: true, detail: "Laser-punched perforations aligned to exact millimeter matrix" },
        { title: "OrthoLite Insole Cushion", passed: true, detail: "Original breathable footbed intact" },
      ]
    },
    story: {
      age: "3 years archive",
      source: "Acquired from an art gallery curator in Paris",
      usage: "Worn on gallery opening nights; stored with cedar shoe trees.",
      highlight: "Timeless court tennis heritage."
    },
    pricing: {
      originalRetail: 100,
      thriftPrice: 48,
      currency: "$",
    },
    sizing: {
      usSize: 9.0,
      ukSize: 8.5,
      euSize: 42.7,
      cmSize: 27.0,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 8,
    style: "Heritage",
    primaryColor: "White",
    viewsCount: 890,
    dealEndsAt: null,
  },
  {
    id: "puma-clyde-black-gold",
    name: "Puma Clyde 'Archive Black / Gold Foil'",
    brand: "Puma",
    silhouette: "Clyde",
    colorway: "Puma Black / White / Gold",
    sku: "391962-01",
    releaseYear: 2020,
    condition: {
      score: 9.2,
      label: "Near Mint",
      subRatings: {
        sole: 9.1,
        upper: 9.3,
        interior: 9.2,
      },
      wearNotes: "Premium hairy suede with lustrous gold script. Cupsole clean with near zero wear."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-08-25",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "Walt Clyde Frazier Script", passed: true, detail: "Cursive gold foil deboss matches archival 1973 stamping" },
        { title: "Full Grain Leather Formstrip", passed: true, detail: "Tanned leather side strip authenticated" },
      ]
    },
    story: {
      age: "4 years archive",
      source: "Consigned by vintage basketball memorabilia enthusiast",
      usage: "Display rotation piece with very minimal gentle indoor wear.",
      highlight: "Tribute to New York basketball culture."
    },
    pricing: {
      originalRetail: 110,
      thriftPrice: 64,
      currency: "$",
    },
    sizing: {
      usSize: 11.0,
      ukSize: 10.0,
      euSize: 44.5,
      cmSize: 29.0,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 9,
    style: "Basketball",
    primaryColor: "Black",
    viewsCount: 620,
    dealEndsAt: null,
  },
  {
    id: "nike-jordan-1-retro-high",
    name: "Air Jordan 1 Retro High OG 'Lost & Found'",
    brand: "Nike",
    silhouette: "Air Jordan 1",
    colorway: "Varsity Red / Black / Sail / Muslin",
    sku: "DZ5485-612",
    releaseYear: 2022,
    condition: {
      score: 9.5,
      label: "Near Mint",
      subRatings: {
        sole: 9.5,
        upper: 9.6,
        interior: 9.4,
      },
      wearNotes: "Cracked leather collar aging factory effect intact. Soles protected with sole shield."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-28",
      inspectorId: "INSP-1044",
      checklist: [
        { title: "Wings Logo Embossing Depth", passed: true, detail: "Jordan wings badge crisp with accurate gloss depth" },
        { title: "Cracked Leather Texture Pattern", passed: true, detail: "Factory 1985 faux-aged patina validated against stock records" },
        { title: "Vintage Receipt & Box Matching", passed: true, detail: "Includes vintage style replacement receipt and mismatched lid" },
      ]
    },
    story: {
      age: "2 years archive",
      source: "Acquired from an OG collector in Chicago",
      usage: "Kept inside climate display box; worn twice for photography.",
      highlight: "One of the most celebrated sneaker drops of the decade."
    },
    pricing: {
      originalRetail: 220,
      thriftPrice: 145,
      currency: "$",
    },
    sizing: {
      usSize: 11.5,
      ukSize: 10.5,
      euSize: 45.5,
      cmSize: 29.5,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 10,
    style: "Basketball",
    primaryColor: "Red",
    viewsCount: 3410,
    dealEndsAt: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "adidas-campus-00s-black",
    name: "Adidas Campus 00s 'Core Black'",
    brand: "Adidas",
    silhouette: "Campus",
    colorway: "Core Black / Cloud White / Off White",
    sku: "HQ8708",
    releaseYear: 2023,
    condition: {
      score: 9.3,
      label: "Near Mint",
      subRatings: {
        sole: 9.2,
        upper: 9.4,
        interior: 9.3,
      },
      wearNotes: "Puffy tongue and thick laces clean. Suede deep black with zero bald spots."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-15",
      inspectorId: "INSP-3911",
      checklist: [
        { title: "Fat Laces Weave Density", passed: true, detail: "Wide skate-spec laces authenticated" },
        { title: "Off-White Midsole Aging", passed: true, detail: "Vintage hue matches 2023 retro specification" },
      ]
    },
    story: {
      age: "1 year archive",
      source: "Sourced from an architecture student in Seoul",
      usage: "Only worn on subway commutes.",
      highlight: "Chunky 2000s skate aesthetic."
    },
    pricing: {
      originalRetail: 110,
      thriftPrice: 65,
      currency: "$",
    },
    sizing: {
      usSize: 8.5,
      ukSize: 8.0,
      euSize: 42.0,
      cmSize: 26.5,
      fitNotes: "Runs slightly wide due to skate padding. True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 11,
    style: "Streetwear",
    primaryColor: "Black",
    viewsCount: 1380,
    dealEndsAt: null,
  },
  {
    id: "puma-rs-x-reinvention",
    name: "Puma RS-X Reinvention 'Pristine White'",
    brand: "Puma",
    silhouette: "RS-X",
    colorway: "Pristine / Whisper White / Peach",
    sku: "369579-02",
    releaseYear: 2021,
    condition: {
      score: 8.7,
      label: "Excellent",
      subRatings: {
        sole: 8.5,
        upper: 8.9,
        interior: 8.8,
      },
      wearNotes: "Running System polyurethane cushioning soft and bouncy. Micro scuff on plastic heel counter."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-08-12",
      inspectorId: "INSP-8492",
      checklist: [
        { title: "RS Cushioning System Integrity", passed: true, detail: "Polyurethane foam rebound within factory spec" },
        { title: "Multi-Material Layer Alignment", passed: true, detail: "Mesh, suede and nubuck overlays securely heat-sealed" },
      ]
    },
    story: {
      age: "3 years archive",
      source: "Acquired from a fitness editor's sample closet in Sydney",
      usage: "Light studio training only.",
      highlight: "Bold sculptural silhouette with all-day cushioning."
    },
    pricing: {
      originalRetail: 110,
      thriftPrice: 49,
      currency: "$",
    },
    sizing: {
      usSize: 10.0,
      ukSize: 9.0,
      euSize: 43.0,
      cmSize: 28.0,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 12,
    style: "Runner",
    primaryColor: "Beige",
    viewsCount: 710,
    dealEndsAt: null,
  },
  {
    id: "nike-blazer-mid-77",
    name: "Nike Blazer Mid '77 Vintage 'Sail/Black'",
    brand: "Nike",
    silhouette: "Blazer Mid",
    colorway: "White / Black / Sail",
    sku: "BQ6806-100",
    releaseYear: 2020,
    condition: {
      score: 9.0,
      label: "Near Mint",
      subRatings: {
        sole: 8.8,
        upper: 9.2,
        interior: 9.0,
      },
      wearNotes: "Vintage exposed foam tongue intact without crumbling. Suede toe bumper lightly worn."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-14",
      inspectorId: "INSP-1044",
      checklist: [
        { title: "Exposed Foam Tongue Density", passed: true, detail: "Original yellowed vintage foam matches archive standard" },
        { title: "Vulcanized Outsole Bond", passed: true, detail: "Zero separation along sidefoxing tape" },
      ]
    },
    story: {
      age: "4 years archive",
      source: "Consigned from a ceramicist's studio in Portland",
      usage: "Weekend city walks.",
      highlight: "Vintage 1970s basketball aesthetic with modern durability."
    },
    pricing: {
      originalRetail: 105,
      thriftPrice: 52,
      currency: "$",
    },
    sizing: {
      usSize: 9.5,
      ukSize: 8.5,
      euSize: 43.0,
      cmSize: 27.5,
      fitNotes: "Slightly narrow opening. Loosen laces when putting on."
    },
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 13,
    style: "Basketball",
    primaryColor: "White",
    viewsCount: 940,
    dealEndsAt: null,
  },
  {
    id: "adidas-superstar-82",
    name: "Adidas Superstar 82 'Core Black / Off White'",
    brand: "Adidas",
    silhouette: "Superstar",
    colorway: "Core Black / Off White / Chalk",
    sku: "GY3428",
    releaseYear: 2022,
    condition: {
      score: 9.1,
      label: "Near Mint",
      subRatings: {
        sole: 9.0,
        upper: 9.3,
        interior: 9.0,
      },
      wearNotes: "Classic rubber shell toe spotless. Leather lining conditioned."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-08",
      inspectorId: "INSP-3911",
      checklist: [
        { title: "Rubber Shell-Toe Texture", passed: true, detail: "Cross-hatched textured ridges match 1982 archive mould" },
        { title: "Trefoil Heel Stamping", passed: true, detail: "Crisp white heel print passes authenticity check" },
      ]
    },
    story: {
      age: "2 years archive",
      source: "Direct consignor from Berlin hip-hop radio station",
      usage: "Studio podcast wear.",
      highlight: "The silhouette that defined 1980s street culture."
    },
    pricing: {
      originalRetail: 110,
      thriftPrice: 56,
      currency: "$",
    },
    sizing: {
      usSize: 10.0,
      ukSize: 9.5,
      euSize: 44.0,
      cmSize: 28.0,
      fitNotes: "True to size."
    },
    images: [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    trendingRank: 14,
    style: "Heritage",
    primaryColor: "Black",
    viewsCount: 820,
    dealEndsAt: null,
  },
  {
    id: "nike-sb-dunk-low-navy",
    name: "Nike SB Dunk Low Pro 'White & Navy'",
    brand: "Nike",
    silhouette: "SB Dunk Low",
    colorway: "White / Navy / Gum Light Brown",
    sku: "CD2563-100",
    releaseYear: 2021,
    condition: {
      score: 9.2,
      label: "Near Mint",
      subRatings: {
        sole: 9.0,
        upper: 9.4,
        interior: 9.2,
      },
      wearNotes: "Zoom Air heel unit fully intact. White leather conditioned. Gum sole spotless."
    },
    authenticity: {
      verified: true,
      verifiedDate: "2024-09-22",
      inspectorId: "INSP-1044",
      checklist: [
        { title: "Zoom Air Unit Test", passed: true, detail: "Insole heel pocket pressurized and responsive" },
        { title: "Orange Label Tongue Branding", passed: true, detail: "Skate-shop exclusive Orange Label stitching verified" },
      ]
    },
    story: {
      age: "3 years archive",
      source: "Consigned by skate videographer in San Francisco",
      usage: "Casual filmer shoes, not skated.",
      highlight: "Orange Label edition exclusive to local skate shops."
    },
    pricing: {
      originalRetail: 135,
      thriftPrice: 89,
      currency: "$",
    },
    sizing: {
      usSize: 10.5,
      ukSize: 9.5,
      euSize: 44.5,
      cmSize: 28.5,
      fitNotes: "Padded tongue makes it slightly snug. Standard Nike fit."
    },
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    trendingRank: 15,
    style: "Streetwear",
    primaryColor: "White",
    viewsCount: 2240,
    dealEndsAt: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
  }
];

// MOCK — Brand to brand sizing conversion lookup
export const MOCK_SIZE_CONVERSIONS = {
  Nike: {
    baseOffset: 0,
    fitDescriptor: "Standard athletic fit. Narrow through midfoot.",
    conversionNote: "True to standard US sizing. Half-size up if you prefer loose toe room."
  },
  Adidas: {
    baseOffset: -0.5,
    fitDescriptor: "Slightly longer silhouette with medium toe box.",
    conversionNote: "Typically runs 0.5 size longer than Nike. Consider half size down from Nike."
  },
  Puma: {
    baseOffset: 0,
    fitDescriptor: "Comfortable standard width with snug vintage heel cup.",
    conversionNote: "True to size. Identical fit profile to Nike AF1."
  },
  NewBalance: {
    baseOffset: 0,
    fitDescriptor: "Roomy toe box, generous arch cushioning.",
    conversionNote: "True to size or slightly wide."
  },
  Vans: {
    baseOffset: 0,
    fitDescriptor: "Flat vulcanized bed, snug initial break-in.",
    conversionNote: "True to size."
  }
};

// MOCK — Sustainability live impact metrics
export const MOCK_SUSTAINABILITY_STATS = {
  pairsRescued: 1482,
  waterSavedGallons: 382400,
  carbonDivertedKg: 18520,
  landfillWasteAvoidedLbs: 2964,
  lastUpdated: new Date().toISOString()
};

// MOCK — 4-Dimension Customer Reviews
export const MOCK_REVIEWS = [
  {
    id: "rev-1",
    shoeId: "nike-dunk-low-panda",
    author: "Karim Z.",
    date: "3 days ago",
    verifiedBuyer: true,
    ratings: {
      overall: 5,
      conditionAccuracy: 5,
      sizeAccuracy: 5,
      quality: 4.8,
      descriptionAccuracy: 5,
    },
    comment: "The condition meter said 9.3 and it was dead accurate. Zero smell, spotless toe box. Saved $47 compared to stock apps."
  },
  {
    id: "rev-2",
    shoeId: "adidas-samba-classic-white",
    author: "Sophia L.",
    date: "1 week ago",
    verifiedBuyer: true,
    ratings: {
      overall: 4.8,
      conditionAccuracy: 5,
      sizeAccuracy: 4.5,
      quality: 5,
      descriptionAccuracy: 5,
    },
    comment: "First time buying thrifted sneakers online where I actually felt safe. The authenticity card signed by the inspector in the box made it feel like a luxury boutique drop."
  }
];
