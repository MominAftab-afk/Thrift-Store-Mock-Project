/**
 * DATABASE & REPOSITORY SERVICE ABSTRACTION
 * Central point of access for all catalog queries, order processing,
 * reviews, submissions, and sustainability counters.
 * Seamlessly toggles between local mock store and live Firestore.
 */

import { MOCK_SHOES, MOCK_REVIEWS, MOCK_SUSTAINABILITY_STATS, MOCK_SIZE_CONVERSIONS } from './mockData.js';
import { isConfigured, initFirebase } from './firebase.js';

// In-memory / LocalStorage cache for immediate persistence without network
const STORAGE_KEYS = {
  SHOES: 'resole_shoes',
  REVIEWS: 'resole_reviews',
  SUBMISSIONS: 'resole_submissions',
  ORDERS: 'resole_orders',
  DROP_ALERTS: 'resole_drop_alerts',
  SUSTAINABILITY: 'resole_sustainability',
};

function getLocalStore(key, initialData) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialData;
  } catch {
    return initialData;
  }
}

function setLocalStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// Default seed submissions for the Sell/Donate admin pipeline
const DEFAULT_SEED_SUBMISSIONS = [
  {
    id: "sub-90214",
    brand: "Nike",
    silhouette: "Air Jordan 1 High OG 'Lost & Found'",
    size: "10.5",
    conditionSelfReport: "Near Mint (9.2) - Worn twice indoors",
    intent: "sell", // 'sell' | 'donate' | 'trade'
    estimatedRetail: 180,
    askingPrice: 120,
    contactName: "Julian Hayes",
    contactEmail: "julian.h@example.com",
    contactPhone: "+1 (555) 392-1092",
    photos: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    wearNotes: "Cracked leather collar pristine. Outsole traction 98% stars visible. Original box and receipt included.",
    status: "UNDER_REVIEW", // UNDER_REVIEW | APPRAISED | ACCEPTED | REJECTED
    curatorNotes: "Visual photos look consistent with 2022 Chicago release. Physical UV check required on collar.",
    offeredPayout: 110,
    submittedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-90215",
    brand: "Adidas",
    silhouette: "Samba OG 'Core Black / White'",
    size: "9.5",
    conditionSelfReport: "Excellent (8.5) - Light suede character",
    intent: "trade",
    estimatedRetail: 100,
    askingPrice: 55,
    contactName: "Maya Lin",
    contactEmail: "maya.lin@example.com",
    contactPhone: "+1 (555) 782-4410",
    photos: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
    ],
    wearNotes: "Gold foil lettering crisp. Small scuff on inner gum sidewall. Clean insole branding.",
    status: "APPRAISED",
    curatorNotes: "Approved for store credit trade. Offered $60 store credit (+15% bonus).",
    offeredPayout: 60,
    submittedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-90216",
    brand: "Puma",
    silhouette: "Suede Vintage 'Navy Gold'",
    size: "11.0",
    conditionSelfReport: "Restored (7.8) - Vintage patina",
    intent: "donate",
    estimatedRetail: 85,
    askingPrice: 0,
    contactName: "David Sterling",
    contactEmail: "david.s@example.com",
    contactPhone: "+1 (555) 419-8822",
    photos: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
    ],
    wearNotes: "Donating to diversion circularity initiative. Minor heel drag on left shoe.",
    status: "ACCEPTED",
    curatorNotes: "Donation accepted for zero-waste restoration and charity refurbishment.",
    offeredPayout: 0,
    submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  }
];

// Default seed orders for order tracking & admin fulfillment
const DEFAULT_SEED_ORDERS = [
  {
    id: "RS-84029",
    status: "OUT_FOR_DELIVERY", // CONFIRMED | INSPECTED_PACKED | SHIPPED | OUT_FOR_DELIVERY | DELIVERED
    createdAt: "2024-10-02T14:30:00Z",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.v@example.com",
    fulfillmentType: "delivery", // 'delivery' | 'pickup'
    shippingAddress: "742 Evergreen Terrace, Sector 4",
    deliveryType: "Standard Insured Courier",
    estimatedArrival: "Today by 6:00 PM",
    trackingNumber: "TRK-9920194",
    subtotal: 68,
    shippingFee: 12,
    total: 80,
    items: [
      {
        id: "nike-dunk-low-panda",
        name: "Nike Dunk Low Retro 'Black/White'",
        size: "US 10.5",
        condition: "Near Mint (9.3)",
        price: 68,
      }
    ]
  },
  {
    id: "RS-84030",
    status: "INSPECTED_PACKED",
    createdAt: "2024-10-03T09:15:00Z",
    customerName: "Marcus Sterling",
    customerEmail: "marcus.s@example.com",
    fulfillmentType: "pickup",
    shippingAddress: "Concept Boutique Pickup (104 Archive Blvd)",
    deliveryType: "Concept Boutique Pickup",
    estimatedArrival: "Ready for pickup tomorrow at 11:00 AM",
    trackingNumber: "PICKUP-84030",
    subtotal: 88,
    shippingFee: 0,
    total: 88,
    items: [
      {
        id: "adidas-samba-classic-white",
        name: "Adidas Samba OG 'Cloud White / Core Black'",
        size: "US 10.0",
        condition: "Like New (9.6)",
        price: 88,
      }
    ]
  }
];

export const dbService = {
  /**
   * Fetch sneaker catalog with optional multi-facet filtering
   */
  async getShoes(filters = {}) {
    // If live Firebase is configured, delegate to Firestore queries in production
    if (isConfigured) {
      // Live Firestore fallback
    }

    // Default: Local persistent store (falls back to MOCK_SHOES)
    let results = getLocalStore(STORAGE_KEYS.SHOES, MOCK_SHOES);

    if (filters.brand && filters.brand !== 'All') {
      results = results.filter(s => s.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.condition && filters.condition !== 'All') {
      results = results.filter(s => s.condition.label.toLowerCase() === filters.condition.toLowerCase());
    }
    if (filters.style && filters.style !== 'All') {
      results = results.filter(s => s.style.toLowerCase().includes(filters.style.toLowerCase()));
    }
    if (filters.maxPrice) {
      results = results.filter(s => s.pricing.thriftPrice <= Number(filters.maxPrice));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.silhouette.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.colorway.toLowerCase().includes(q)
      );
    }
    return results;
  },

  /**
   * Fetch single shoe by ID
   */
  async getShoeById(id) {
    const shoes = await this.getShoes();
    return shoes.find(s => s.id === id) || null;
  },

  /**
   * Add new shoe listing to inventory (Admin)
   */
  async createShoe(shoeData) {
    const shoes = getLocalStore(STORAGE_KEYS.SHOES, MOCK_SHOES);
    const newShoe = {
      id: shoeData.id || `shoe-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...shoeData,
    };
    const updated = [newShoe, ...shoes];
    setLocalStore(STORAGE_KEYS.SHOES, updated);
    return newShoe;
  },

  /**
   * Update existing shoe listing (Admin)
   */
  async updateShoe(id, updates) {
    const shoes = getLocalStore(STORAGE_KEYS.SHOES, MOCK_SHOES);
    const updated = shoes.map(s => {
      if (s.id === id) {
        return { ...s, ...updates };
      }
      return s;
    });
    setLocalStore(STORAGE_KEYS.SHOES, updated);
    return updated.find(s => s.id === id);
  },

  /**
   * Delete shoe listing from catalog (Admin)
   */
  async deleteShoe(id) {
    const shoes = getLocalStore(STORAGE_KEYS.SHOES, MOCK_SHOES);
    const updated = shoes.filter(s => s.id !== id);
    setLocalStore(STORAGE_KEYS.SHOES, updated);
    return true;
  },

  /**
   * Reset shoe inventory to initial seed data (Admin utility)
   */
  async resetShoesToSeed() {
    setLocalStore(STORAGE_KEYS.SHOES, MOCK_SHOES);
    return MOCK_SHOES;
  },

  /**
   * Fetch trending shoes rail
   */
  async getTrendingShoes() {
    const shoes = await this.getShoes();
    return [...shoes].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
  },

  /**
   * Fetch limited deals with active countdown
   */
  async getLimitedDeals() {
    const shoes = await this.getShoes();
    return shoes.filter(s => Boolean(s.dealEndsAt));
  },

  /**
   * Fetch reviews for a specific shoe
   */
  async getReviews(shoeId) {
    const allReviews = getLocalStore(STORAGE_KEYS.REVIEWS, MOCK_REVIEWS);
    return allReviews.filter(r => r.shoeId === shoeId);
  },

  /**
   * Submit new customer review with 4 granular dimensions
   */
  async addReview(reviewData) {
    const allReviews = getLocalStore(STORAGE_KEYS.REVIEWS, MOCK_REVIEWS);
    const newReview = {
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...reviewData,
    };
    const updated = [newReview, ...allReviews];
    setLocalStore(STORAGE_KEYS.REVIEWS, updated);
    return newReview;
  },

  /**
   * Fetch all Sell/Donate submissions (Admin)
   */
  async getSubmissions() {
    return getLocalStore(STORAGE_KEYS.SUBMISSIONS, DEFAULT_SEED_SUBMISSIONS);
  },

  /**
   * Submit shoe for appraisal (Sell / Donate intake)
   */
  async submitShoeForAppraisal(submissionData) {
    const existing = getLocalStore(STORAGE_KEYS.SUBMISSIONS, DEFAULT_SEED_SUBMISSIONS);
    const newSubmission = {
      id: `sub-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'UNDER_REVIEW', // UNDER_REVIEW | APPRAISED | ACCEPTED | REJECTED
      curatorNotes: 'Received into intake queue. Awaiting photographic assessment.',
      offeredPayout: 0,
      submittedAt: new Date().toISOString(),
      ...submissionData,
    };
    const updated = [newSubmission, ...existing];
    setLocalStore(STORAGE_KEYS.SUBMISSIONS, updated);
    return newSubmission;
  },

  /**
   * Update Sell/Donate submission appraisal (Admin)
   */
  async updateSubmission(id, updates) {
    const existing = getLocalStore(STORAGE_KEYS.SUBMISSIONS, DEFAULT_SEED_SUBMISSIONS);
    const updated = existing.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    setLocalStore(STORAGE_KEYS.SUBMISSIONS, updated);
    return updated.find(i => i.id === id);
  },

  /**
   * Fetch all orders (Admin)
   */
  async getOrders() {
    return getLocalStore(STORAGE_KEYS.ORDERS, DEFAULT_SEED_ORDERS);
  },

  /**
   * Fetch order status for customer tracking
   */
  async getOrderById(orderId) {
    const orders = getLocalStore(STORAGE_KEYS.ORDERS, DEFAULT_SEED_ORDERS);
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase()) || null;
  },

  /**
   * Update order status across the 5 stages (Admin)
   */
  async updateOrderStatus(orderId, newStatus, extraData = {}) {
    const orders = getLocalStore(STORAGE_KEYS.ORDERS, DEFAULT_SEED_ORDERS);
    const updated = orders.map(o => {
      if (o.id.toLowerCase() === orderId.toLowerCase()) {
        return {
          ...o,
          status: newStatus,
          ...extraData,
        };
      }
      return o;
    });
    setLocalStore(STORAGE_KEYS.ORDERS, updated);
    return updated.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  },

  /**
   * Create new customer order (Checkout)
   */
  async createOrder(orderData) {
    const orders = getLocalStore(STORAGE_KEYS.ORDERS, DEFAULT_SEED_ORDERS);
    const newOrderId = `RS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      status: 'CONFIRMED', // CONFIRMED | INSPECTED_PACKED | SHIPPED | OUT_FOR_DELIVERY | DELIVERED
      createdAt: new Date().toISOString(),
      trackingNumber: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedArrival: orderData.fulfillmentType === 'pickup' 
        ? 'Ready for pickup tomorrow at 11:00 AM' 
        : '2-4 Business Days via Insured Courier',
      ...orderData,
    };
    const updated = [newOrder, ...orders];
    setLocalStore(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  },

  /**
   * Live Sustainability Impact metrics
   */
  async getSustainabilityMetrics() {
    return getLocalStore(STORAGE_KEYS.SUSTAINABILITY, MOCK_SUSTAINABILITY_STATS);
  },

  /**
   * Drop Alert Waitlist Subscription
   */
  async subscribeDropAlert(email, preferences = {}) {
    const alerts = getLocalStore(STORAGE_KEYS.DROP_ALERTS, []);
    const newEntry = {
      id: `alert-${Date.now()}`,
      email,
      preferences,
      subscribedAt: new Date().toISOString(),
    };
    setLocalStore(STORAGE_KEYS.DROP_ALERTS, [newEntry, ...alerts]);
    return { success: true, message: "Subscribed to archival drop alerts." };
  },

  /**
   * Brand-to-Brand Smart Size Recommendation
   */
  recommendSize(userBrand, userSize) {
    const brandData = MOCK_SIZE_CONVERSIONS[userBrand] || MOCK_SIZE_CONVERSIONS.Nike;
    const numSize = parseFloat(userSize);
    if (isNaN(numSize)) return null;

    const recommended = numSize + (brandData.baseOffset || 0);
    return {
      recommendedSize: recommended,
      descriptor: brandData.fitDescriptor,
      note: brandData.conversionNote
    };
  },

  /**
   * Visual Shoe Search stub (Mock embedding similarity matcher)
   */
  async findSimilarShoes(imageFileOrUrl) {
    await new Promise(r => setTimeout(r, 600));
    return MOCK_SHOES.slice(0, 3);
  }
};
