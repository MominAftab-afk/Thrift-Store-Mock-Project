import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Inbox, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Search, 
  Filter, 
  RefreshCw, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Camera,
  MapPin,
  X
} from 'lucide-react';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'submissions' | 'orders'
  
  // Data states
  const [shoes, setShoes] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for shoes
  const [shoeSearch, setShoeSearch] = useState('');
  const [shoeBrandFilter, setShoeBrandFilter] = useState('All');

  // Modals & Edit States
  const [editingShoe, setEditingShoe] = useState(null);
  const [isAddingShoe, setIsAddingShoe] = useState(false);
  const [inspectingSubmission, setInspectingSubmission] = useState(null);
  const [inspectingOrder, setInspectingOrder] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Initial Form state for Add/Edit Shoe
  const initialShoeForm = {
    name: '',
    brand: 'Nike',
    silhouette: '',
    colorway: '',
    style: 'Lifestyle Classic',
    size: '10.5',
    pricing: {
      originalRetail: 120,
      thriftPrice: 75,
      currency: 'USD'
    },
    condition: {
      label: 'Near Mint',
      score: 9.2,
      soleCondition: 9.3,
      upperCondition: 9.4,
      innerCondition: 9.0,
      description: 'Exceptionally clean vintage condition.'
    },
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    ],
    story: {
      age: 'Circa 2021 release',
      usage: 'Worn twice in dry weather',
      source: 'Curator private collection, Kyoto',
      uniqueDetail: 'Crisp factory star traction on toe pivot.'
    },
    authenticity: {
      verified: true,
      verifier: 'RE/SOLE Senior Authenticator',
      checklist: {
        logoAccuracy: true,
        stitchingQuality: true,
        serialNumberMatch: true,
        materialFeel: true
      }
    },
    inStock: true,
    isTrending: false,
    dealEndsAt: null
  };

  const [shoeFormData, setShoeFormData] = useState(initialShoeForm);

  // Load all operational collections
  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedShoes, fetchedSubmissions, fetchedOrders] = await Promise.all([
        dbService.getShoes(),
        dbService.getSubmissions(),
        dbService.getOrders()
      ]);
      setShoes(fetchedShoes);
      setSubmissions(fetchedSubmissions);
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Admin data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  // ==========================================
  // INVENTORY OPERATIONS
  // ==========================================
  const handleOpenAddShoe = () => {
    setShoeFormData(initialShoeForm);
    setEditingShoe(null);
    setIsAddingShoe(true);
  };

  const handleOpenEditShoe = (shoe) => {
    setEditingShoe(shoe);
    setShoeFormData({
      name: shoe.name || '',
      brand: shoe.brand || 'Nike',
      silhouette: shoe.silhouette || '',
      colorway: shoe.colorway || '',
      style: shoe.style || 'Lifestyle Classic',
      size: shoe.size || '10.5',
      pricing: {
        originalRetail: shoe.pricing?.originalRetail || 100,
        thriftPrice: shoe.pricing?.thriftPrice || 60,
        currency: 'USD'
      },
      condition: {
        label: shoe.condition?.label || 'Near Mint',
        score: shoe.condition?.score || 9.0,
        soleCondition: shoe.condition?.soleCondition || 9.0,
        upperCondition: shoe.condition?.upperCondition || 9.0,
        innerCondition: shoe.condition?.innerCondition || 9.0,
        description: shoe.condition?.description || ''
      },
      images: shoe.images?.length ? shoe.images : [initialShoeForm.images[0]],
      story: shoe.story || initialShoeForm.story,
      authenticity: shoe.authenticity || initialShoeForm.authenticity,
      inStock: shoe.inStock !== false,
      isTrending: Boolean(shoe.isTrending),
      dealEndsAt: shoe.dealEndsAt || null
    });
    setIsAddingShoe(true);
  };

  const handleSaveShoe = async (e) => {
    e.preventDefault();
    try {
      if (editingShoe) {
        await dbService.updateShoe(editingShoe.id, shoeFormData);
        triggerFeedback(`Updated "${shoeFormData.name}" successfully.`);
      } else {
        const newShoe = {
          ...shoeFormData,
          id: `${shoeFormData.brand.toLowerCase()}-${shoeFormData.silhouette.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`
        };
        await dbService.createShoe(newShoe);
        triggerFeedback(`Added "${shoeFormData.name}" to live catalog.`);
      }
      setIsAddingShoe(false);
      setEditingShoe(null);
      await loadData();
    } catch (err) {
      console.error("Save shoe error:", err);
    }
  };

  const handleDeleteShoe = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      await dbService.deleteShoe(id);
      triggerFeedback(`Removed "${name}" from inventory.`);
      await loadData();
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm("Reset catalog back to initial factory seed data (12 curated pairs)? Any custom additions will be reverted.")) {
      await dbService.resetShoesToSeed();
      triggerFeedback("Catalog reset to default seed archive.");
      await loadData();
    }
  };

  // Filtered shoes
  const filteredShoes = shoes.filter(s => {
    const matchesSearch = shoeSearch === '' || 
      s.name.toLowerCase().includes(shoeSearch.toLowerCase()) ||
      s.silhouette.toLowerCase().includes(shoeSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(shoeSearch.toLowerCase());
    const matchesBrand = shoeBrandFilter === 'All' || s.brand.toLowerCase() === shoeBrandFilter.toLowerCase();
    return matchesSearch && matchesBrand;
  });

  // ==========================================
  // SUBMISSION APPRAISAL OPERATIONS
  // ==========================================
  const handleUpdateSubmissionStatus = async (subId, newStatus, curatorNotes, offeredPayout) => {
    try {
      await dbService.updateSubmission(subId, {
        status: newStatus,
        curatorNotes,
        offeredPayout: Number(offeredPayout) || 0
      });
      triggerFeedback(`Submission ${subId} marked as ${newStatus}.`);
      setInspectingSubmission(null);
      await loadData();
    } catch (err) {
      console.error("Update submission error:", err);
    }
  };

  // ==========================================
  // ORDER FULFILLMENT OPERATIONS
  // ==========================================
  const handleUpdateOrderStatus = async (orderId, newStatus, extraData = {}) => {
    try {
      await dbService.updateOrderStatus(orderId, newStatus, extraData);
      triggerFeedback(`Order ${orderId} updated to ${newStatus}.`);
      if (inspectingOrder && inspectingOrder.id === orderId) {
        setInspectingOrder(prev => ({ ...prev, status: newStatus, ...extraData }));
      }
      await loadData();
    } catch (err) {
      console.error("Update order error:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="badge-archival bg-ink-950 text-white font-mono text-[9px] uppercase tracking-wider">
                Internal Portal
              </span>
              <span className="text-2xs font-mono text-ink-400">
                Staff Authentication ID: OP-CURATOR-01
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
              Operations & Inventory Console
            </h1>
            <p className="text-2xs font-mono text-ink-500">
              Manage inventory listings, customer appraisals, and order fulfillment stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCatalog}
              className="text-2xs font-mono text-ink-600 hover:text-ink-950"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1 text-ink-400" />
              <span>Reset Catalog Seed</span>
            </Button>
            <Button
              asChild
              variant="primary"
              size="sm"
              className="text-2xs font-mono uppercase tracking-wider"
            >
              <Link to="/shop" target="_blank">
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* FEEDBACK TOAST BANNER */}
        {feedbackMsg && (
          <div className="p-3 rounded-xs bg-olive-50 border border-olive-200 text-olive-800 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-olive-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* OPERATIONAL KPI METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => setActiveTab('inventory')}
            className={cn(
              "p-4 rounded-md border cursor-pointer transition-all",
              activeTab === 'inventory' 
                ? "bg-white border-ink-950 ring-1 ring-ink-950 shadow-fine" 
                : "bg-surface-subtle/50 border-surface-border hover:bg-white"
            )}
          >
            <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
              <span>Catalog Inventory</span>
              <Package className="w-4 h-4 text-ink-800" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-ink-950">{shoes.length}</span>
              <span className="text-2xs font-mono text-olive-700">Live archive listings</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('submissions')}
            className={cn(
              "p-4 rounded-md border cursor-pointer transition-all",
              activeTab === 'submissions' 
                ? "bg-white border-ink-950 ring-1 ring-ink-950 shadow-fine" 
                : "bg-surface-subtle/50 border-surface-border hover:bg-white"
            )}
          >
            <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
              <span>Sell/Donate Intake</span>
              <Inbox className="w-4 h-4 text-clay-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-ink-950">{submissions.length}</span>
              <span className="text-2xs font-mono text-clay-700">
                {submissions.filter(s => s.status === 'UNDER_REVIEW').length} pending appraisal
              </span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('orders')}
            className={cn(
              "p-4 rounded-md border cursor-pointer transition-all",
              activeTab === 'orders' 
                ? "bg-white border-ink-950 ring-1 ring-ink-950 shadow-fine" 
                : "bg-surface-subtle/50 border-surface-border hover:bg-white"
            )}
          >
            <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
              <span>Customer Orders</span>
              <ShoppingBag className="w-4 h-4 text-olive-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-ink-950">{orders.length}</span>
              <span className="text-2xs font-mono text-ink-600">
                {orders.filter(o => o.status !== 'DELIVERED').length} active in pipeline
              </span>
            </div>
          </div>
        </div>

        {/* PRIMARY TAB NAVIGATION */}
        <div className="flex border-b border-surface-border gap-6 text-xs font-mono uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={cn(
              "pb-3 border-b-2 font-bold transition-all",
              activeTab === 'inventory' 
                ? "border-ink-950 text-ink-950" 
                : "border-transparent text-ink-400 hover:text-ink-700"
            )}
          >
            Catalog Inventory ({shoes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={cn(
              "pb-3 border-b-2 font-bold transition-all",
              activeTab === 'submissions' 
                ? "border-ink-950 text-ink-950" 
                : "border-transparent text-ink-400 hover:text-ink-700"
            )}
          >
            Sell / Donate Submissions ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={cn(
              "pb-3 border-b-2 font-bold transition-all",
              activeTab === 'orders' 
                ? "border-ink-950 text-ink-950" 
                : "border-transparent text-ink-400 hover:text-ink-700"
            )}
          >
            Order Tracking & Fulfillment ({orders.length})
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: INVENTORY & SHOE LISTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search model, silhouette, or ID..."
                    value={shoeSearch}
                    onChange={(e) => setShoeSearch(e.target.value)}
                    className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs pl-8 pr-3 py-1.5 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                  />
                </div>
                <select
                  value={shoeBrandFilter}
                  onChange={(e) => setShoeBrandFilter(e.target.value)}
                  className="text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-1.5 text-ink-900"
                >
                  <option value="All">All Brands</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Puma">Puma</option>
                </select>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleOpenAddShoe}
                className="text-2xs font-mono uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Shoe Listing</span>
              </Button>
            </div>

            {/* Inventory Table */}
            <div className="border border-surface-border rounded-md overflow-x-auto shadow-fine">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-surface-subtle text-ink-500 uppercase text-[10px] tracking-archival border-b border-surface-border">
                  <tr>
                    <th className="p-3">Shoe / Details</th>
                    <th className="p-3">Brand & Size</th>
                    <th className="p-3">Condition</th>
                    <th className="p-3">Thrift Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredShoes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-ink-400">
                        No shoes match query.
                      </td>
                    </tr>
                  ) : (
                    filteredShoes.map((shoe) => (
                      <tr key={shoe.id} className="hover:bg-surface-subtle/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xs border border-surface-border overflow-hidden bg-surface-muted shrink-0">
                              <img 
                                src={shoe.images?.[0] || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80'} 
                                alt={shoe.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <span className="font-serif font-bold text-ink-950 block">{shoe.name}</span>
                              <span className="text-[10px] text-ink-400 block font-mono">{shoe.colorway} • ID: {shoe.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-ink-900 block">{shoe.brand}</span>
                          <span className="text-2xs text-ink-500">Size: US {shoe.size}</span>
                        </td>
                        <td className="p-3">
                          <span className="badge-archival bg-white border-surface-border text-ink-800 text-[10px] font-bold">
                            {shoe.condition?.label || 'Near Mint'} ({shoe.condition?.score || '9.0'})
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-ink-950">${shoe.pricing?.thriftPrice}</span>
                          <span className="text-[10px] text-ink-400 line-through block font-mono">
                            ${shoe.pricing?.originalRetail}
                          </span>
                        </td>
                        <td className="p-3">
                          {shoe.inStock !== false ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-olive-700 bg-olive-50 px-2 py-0.5 rounded-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-olive-600" />
                              IN STOCK
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-ink-400 bg-surface-subtle px-2 py-0.5 rounded-xs">
                              SOLD OUT
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/product/${shoe.id}`}
                              target="_blank"
                              title="View on site"
                              className="p-1.5 rounded-xs hover:bg-surface-subtle text-ink-500 hover:text-ink-950"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEditShoe(shoe)}
                              title="Edit listing"
                              className="p-1.5 rounded-xs hover:bg-surface-subtle text-ink-700 hover:text-ink-950"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteShoe(shoe.id, shoe.name)}
                              title="Delete shoe"
                              className="p-1.5 rounded-xs hover:bg-clay-50 text-clay-700 hover:text-clay-900"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SELL / DONATE INCOMING SUBMISSIONS */}
        {/* ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
              <span>Reviewing incoming consignments & circularity donations</span>
              <span>Total in Queue: {submissions.length}</span>
            </div>

            <div className="border border-surface-border rounded-md overflow-x-auto shadow-fine">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-surface-subtle text-ink-500 uppercase text-[10px] tracking-archival border-b border-surface-border">
                  <tr>
                    <th className="p-3">Ticket ID</th>
                    <th className="p-3">Sneaker Model</th>
                    <th className="p-3">Collector Info</th>
                    <th className="p-3">Intent</th>
                    <th className="p-3">Asking / Offer</th>
                    <th className="p-3">Appraisal Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {submissions.map((sub) => {
                    const statusColors = {
                      UNDER_REVIEW: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                      APPRAISED: 'bg-blue-50 text-blue-800 border-blue-200',
                      ACCEPTED: 'bg-olive-50 text-olive-800 border-olive-200',
                      REJECTED: 'bg-red-50 text-red-800 border-red-200',
                    };

                    return (
                      <tr key={sub.id} className="hover:bg-surface-subtle/40 transition-colors">
                        <td className="p-3 font-bold text-ink-950">
                          {sub.id}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            {sub.photos?.[0] && (
                              <img src={sub.photos[0]} alt="thumbnail" className="w-10 h-10 object-cover rounded-xs border border-surface-border" />
                            )}
                            <div>
                              <span className="font-bold text-ink-950 block">{sub.brand} {sub.silhouette}</span>
                              <span className="text-[10px] text-ink-400">Size: US {sub.size}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-ink-900 block">{sub.contactName || 'Anonymous Collector'}</span>
                          <span className="text-[10px] text-ink-500 block">{sub.contactEmail}</span>
                        </td>
                        <td className="p-3">
                          <span className="badge-archival uppercase text-[9px] bg-white border-surface-border font-bold">
                            {sub.intent}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-ink-500 block text-2xs">Ask: ${sub.askingPrice || 0}</span>
                          <span className="text-olive-700 font-bold text-2xs block">
                            Offer: ${sub.offeredPayout || 0}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={cn("px-2 py-0.5 rounded-xs text-[10px] font-bold border", statusColors[sub.status] || 'bg-surface-subtle')}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInspectingSubmission(sub)}
                            className="text-2xs font-mono h-7 px-2.5"
                          >
                            Appraise / Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ORDER FULFILLMENT & TRACKING */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
              <span>Order fulfillment across the 5 inspection & delivery stages</span>
              <span>Total Orders: {orders.length}</span>
            </div>

            <div className="border border-surface-border rounded-md overflow-x-auto shadow-fine">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-surface-subtle text-ink-500 uppercase text-[10px] tracking-archival border-b border-surface-border">
                  <tr>
                    <th className="p-3">Order Ref</th>
                    <th className="p-3">Customer & Method</th>
                    <th className="p-3">Manifest Item</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Current Pipeline Stage</th>
                    <th className="p-3 text-right">Quick Advance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {orders.map((ord) => {
                    const stages = ['CONFIRMED', 'INSPECTED_PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
                    const currentIdx = stages.indexOf(ord.status);

                    return (
                      <tr key={ord.id} className="hover:bg-surface-subtle/40 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-ink-950 block">{ord.id}</span>
                          <span className="text-[10px] text-ink-400">{ord.trackingNumber}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-ink-900 block">{ord.customerName}</span>
                          <span className="text-[10px] text-ink-500 block">
                            {ord.fulfillmentType === 'pickup' ? (
                              <span className="text-olive-700 font-bold">Concept Boutique Pickup</span>
                            ) : (
                              <span>Insured Courier Delivery</span>
                            )}
                          </span>
                        </td>
                        <td className="p-3">
                          {ord.items?.map((it, idx) => (
                            <div key={idx} className="text-2xs text-ink-800">
                              {it.name} ({it.size})
                            </div>
                          ))}
                        </td>
                        <td className="p-3 font-bold text-ink-950">
                          ${ord.total}
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="text-xs font-mono bg-white border border-surface-border rounded-xs px-2 py-1 text-ink-900 font-semibold focus:outline-none focus:ring-1 focus:ring-ink-950"
                          >
                            <option value="CONFIRMED">1. Confirmed</option>
                            <option value="INSPECTED_PACKED">2. Inspected & Packed</option>
                            <option value="SHIPPED">3. Shipped / Dispatched</option>
                            <option value="OUT_FOR_DELIVERY">4. Out for Delivery</option>
                            <option value="DELIVERED">5. Delivered</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/track-order?id=${ord.id}`}
                              target="_blank"
                              title="Test Tracking Stepper"
                              className="inline-flex items-center gap-1 text-2xs font-mono text-ink-600 hover:text-ink-950 underline px-2 py-1"
                            >
                              <span>Customer Stepper</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ADD / EDIT SHOE LISTING */}
        {/* ========================================================================= */}
        {isAddingShoe && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-md border border-surface-border max-w-2xl w-full p-6 shadow-fine space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <h3 className="font-serif text-lg font-bold text-ink-950">
                  {editingShoe ? `Edit Listing: ${editingShoe.name}` : 'Add New Curated Shoe Listing'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingShoe(false)}
                  className="p-1 rounded-xs hover:bg-surface-subtle text-ink-400 hover:text-ink-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveShoe} className="space-y-4 text-xs font-mono">
                
                {/* Brand & Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Brand *</label>
                    <select
                      value={shoeFormData.brand}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, brand: e.target.value })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    >
                      <option value="Nike">Nike</option>
                      <option value="Adidas">Adidas</option>
                      <option value="Puma">Puma</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-2xs text-ink-600 block mb-1">Display Title / Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nike Dunk Low Retro 'Panda'"
                      value={shoeFormData.name}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, name: e.target.value })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                </div>

                {/* Silhouette & Colorway */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Silhouette</label>
                    <input
                      type="text"
                      placeholder="e.g. Dunk Low"
                      value={shoeFormData.silhouette}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, silhouette: e.target.value })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Colorway</label>
                    <input
                      type="text"
                      placeholder="e.g. White / Black"
                      value={shoeFormData.colorway}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, colorway: e.target.value })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Size (US)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10.5"
                      value={shoeFormData.size}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, size: e.target.value })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                </div>

                {/* Pricing & Condition */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-surface-border">
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Thrift Price ($) *</label>
                    <input
                      type="number"
                      required
                      value={shoeFormData.pricing.thriftPrice}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        pricing: { ...shoeFormData.pricing, thriftPrice: Number(e.target.value) }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Retail Price ($)</label>
                    <input
                      type="number"
                      value={shoeFormData.pricing.originalRetail}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        pricing: { ...shoeFormData.pricing, originalRetail: Number(e.target.value) }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Condition Label</label>
                    <select
                      value={shoeFormData.condition.label}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        condition: { ...shoeFormData.condition, label: e.target.value }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    >
                      <option value="Like New">Like New (9.5+)</option>
                      <option value="Near Mint">Near Mint (9.0–9.4)</option>
                      <option value="Excellent">Excellent (8.0–8.9)</option>
                      <option value="Restored">Restored (7.0–7.9)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Overall Score (0-10)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={shoeFormData.condition.score}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        condition: { ...shoeFormData.condition, score: parseFloat(e.target.value) }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900 font-bold"
                    />
                  </div>
                </div>

                {/* Primary Image URL */}
                <div className="pt-2 border-t border-surface-border">
                  <label className="text-2xs text-ink-600 block mb-1">Primary Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={shoeFormData.images[0] || ''}
                    onChange={(e) => setShoeFormData({
                      ...shoeFormData,
                      images: [e.target.value, ...(shoeFormData.images.slice(1))]
                    })}
                    className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                  />
                </div>

                {/* Story narrative block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-surface-border">
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Shoe Story: Age & Provenance</label>
                    <input
                      type="text"
                      placeholder="e.g. 2021 collector release, Tokyo archive"
                      value={shoeFormData.story?.source || ''}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        story: { ...shoeFormData.story, source: e.target.value }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Unique Characteristic</label>
                    <input
                      type="text"
                      placeholder="e.g. Pristine star traction, uncreased toe"
                      value={shoeFormData.story?.uniqueDetail || ''}
                      onChange={(e) => setShoeFormData({
                        ...shoeFormData,
                        story: { ...shoeFormData.story, uniqueDetail: e.target.value }
                      })}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                    />
                  </div>
                </div>

                {/* In Stock & Deal Toggles */}
                <div className="flex items-center gap-6 pt-3 border-t border-surface-border">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shoeFormData.inStock}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, inStock: e.target.checked })}
                      className="rounded-xs text-ink-950"
                    />
                    <span className="font-semibold text-ink-900">In Stock (Available on Store)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shoeFormData.isTrending}
                      onChange={(e) => setShoeFormData({ ...shoeFormData, isTrending: e.target.checked })}
                      className="rounded-xs text-ink-950"
                    />
                    <span className="text-ink-700">Feature on Trending Carousel</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingShoe(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="uppercase tracking-wider"
                  >
                    {editingShoe ? 'Save Listing Changes' : 'Create Shoe Listing'}
                  </Button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: APPRAISE INCOMING SUBMISSION */}
        {/* ========================================================================= */}
        {inspectingSubmission && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-surface-border max-w-xl w-full p-6 shadow-fine space-y-4 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div>
                  <span className="text-2xs font-mono text-ink-400 uppercase tracking-archival block">
                    Ticket #{inspectingSubmission.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-ink-950">
                    Appraise {inspectingSubmission.brand} {inspectingSubmission.silhouette}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingSubmission(null)}
                  className="p-1 rounded-xs hover:bg-surface-subtle text-ink-400 hover:text-ink-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Submitter Details */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle/50 rounded-xs text-2xs font-mono text-ink-700">
                <div>
                  <span className="text-ink-400 block">Collector:</span>
                  <strong className="text-ink-950">{inspectingSubmission.contactName || 'Anonymous'}</strong>
                </div>
                <div>
                  <span className="text-ink-400 block">Contact:</span>
                  <span>{inspectingSubmission.contactEmail}</span>
                </div>
                <div>
                  <span className="text-ink-400 block">Reported Condition:</span>
                  <strong className="text-ink-950">{inspectingSubmission.conditionTier || 'Standard'}</strong>
                </div>
                <div>
                  <span className="text-ink-400 block">Inbound Preference:</span>
                  <span>{inspectingSubmission.handoverMethod === 'boutique_dropoff' ? 'Boutique Drop-off' : 'Prepaid Courier'}</span>
                </div>
              </div>

              {/* Photos Gallery */}
              {inspectingSubmission.photos?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-ink-500 uppercase tracking-archival block">
                    Collector Uploaded Visuals:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {inspectingSubmission.photos.map((src, i) => (
                      <img key={i} src={src} alt="proof" className="w-24 h-24 object-cover rounded-xs border border-surface-border" />
                    ))}
                  </div>
                </div>
              )}

              {/* Flaw Notes */}
              {inspectingSubmission.wearNotes && (
                <div className="p-3 bg-surface-muted rounded-xs text-2xs font-mono text-ink-600">
                  <strong className="text-ink-950 block mb-0.5">Collector Notes:</strong>
                  <span>{inspectingSubmission.wearNotes}</span>
                </div>
              )}

              {/* Appraisal Decision Form */}
              <div className="space-y-3 pt-2 border-t border-surface-border text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Appraisal Status</label>
                    <select
                      id="submission-status-select"
                      defaultValue={inspectingSubmission.status}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900 font-semibold"
                    >
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="APPRAISED">APPRAISED (Offer Sent)</option>
                      <option value="ACCEPTED">ACCEPTED (Payout Scheduled)</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-2xs text-ink-600 block mb-1">Offered Payout / Credit ($)</label>
                    <input
                      id="submission-offer-input"
                      type="number"
                      defaultValue={inspectingSubmission.offeredPayout || inspectingSubmission.askingPrice || 0}
                      className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-2xs text-ink-600 block mb-1">Curator Assessment & Notes</label>
                  <textarea
                    id="submission-notes-input"
                    rows={2}
                    defaultValue={inspectingSubmission.curatorNotes || ''}
                    placeholder="Enter appraisal reasoning, UV inspection notes, or counter-offer details..."
                    className="w-full bg-white border border-surface-border rounded-xs p-2 text-ink-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInspectingSubmission(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const st = document.getElementById('submission-status-select').value;
                    const off = document.getElementById('submission-offer-input').value;
                    const notes = document.getElementById('submission-notes-input').value;
                    handleUpdateSubmissionStatus(inspectingSubmission.id, st, notes, off);
                  }}
                  className="uppercase tracking-wider"
                >
                  Save Appraisal
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
