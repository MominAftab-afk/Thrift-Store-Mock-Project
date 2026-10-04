import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  Camera, 
  Trash2, 
  DollarSign, 
  Gift, 
  Repeat, 
  Clock, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SellDonatePage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Nike',
    silhouette: '',
    colorway: '',
    releaseYear: '',
    size: '10.5',
    photos: [],
    conditionTier: 'Near Mint (9.0+)',
    outsoleWear: 'Zero / Minimal Wear',
    upperCondition: 'Clean / Uncreased',
    boxAndLaces: 'Original Box Included',
    wearNotes: '',
    intent: 'sell', // 'sell' | 'trade' | 'donate'
    askingPrice: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    handoverMethod: 'prepaid_courier', // 'prepaid_courier' | 'boutique_dropoff'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const BRANDS = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Salomon', 'Air Jordan', 'Converse', 'Other'];
  const SIZES = ['7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '13.0'];

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, event.target.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const addSamplePhoto = () => {
    const sample = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80";
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, sample],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await dbService.submitShoeForAppraisal({
        ...formData,
        askingPrice: Number(formData.askingPrice) || 0,
      });
      setSubmissionResult(res);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setStep(1);
    setFormData({
      brand: 'Nike',
      silhouette: '',
      colorway: '',
      releaseYear: '',
      size: '10.5',
      photos: [],
      conditionTier: 'Near Mint (9.0+)',
      outsoleWear: 'Zero / Minimal Wear',
      upperCondition: 'Clean / Uncreased',
      boxAndLaces: 'Original Box Included',
      wearNotes: '',
      intent: 'sell',
      askingPrice: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      handoverMethod: 'prepaid_courier',
    });
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-2xs font-mono text-ink-400">
          <Link to="/" className="hover:text-ink-950 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink-800 font-medium">Consignment & Donation Intake</span>
        </nav>

        {/* Page Hero */}
        <div className="text-center space-y-2 border-b border-surface-border pb-6 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-olive-50 border border-olive-200 text-olive-700 text-2xs font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Circularity & Appraisal Intake</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-950">
            Consign or Donate Your Sneakers
          </h1>
          <p className="text-2xs text-ink-500 font-mono leading-relaxed">
            Turn your authenticated Nike, Adidas, or Puma pairs into cash, store archive credit (+15% bonus), or donate them to divert footwear from landfills.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SUBMISSION COMPLETED CONFIRMATION SCREEN */}
        {/* ========================================================================= */}
        {submissionResult ? (
          <div className="p-6 sm:p-8 rounded-lg border border-surface-border bg-white shadow-fine space-y-6 text-center animate-in fade-in duration-200 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-olive-50 border border-olive-200 text-olive-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 font-semibold block">
                Intake Ticket #{submissionResult.id}
              </span>
              <h2 className="font-serif text-2xl font-bold text-ink-950">
                Consignment Submission Received
              </h2>
              <p className="text-2xs text-ink-600 font-mono leading-relaxed">
                Thank you, <strong>{formData.contactName || 'Collector'}</strong>. Your <strong>{formData.brand} {formData.silhouette}</strong> has been logged into our appraisal ledger.
              </p>
            </div>

            {/* Appraisal Journey Stepper */}
            <div className="p-4 rounded-md bg-surface-subtle/50 border border-surface-border space-y-3 text-left">
              <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block font-semibold">
                Consignment Appraisal Pipeline:
              </span>
              <div className="space-y-2.5 text-2xs font-mono">
                <div className="flex items-center gap-2.5 text-olive-700 font-bold">
                  <div className="w-4 h-4 rounded-full bg-olive-600 text-white flex items-center justify-center text-[9px]">1</div>
                  <span>Submission Logged & Photos Staged (Current)</span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-500">
                  <div className="w-4 h-4 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-[9px]">2</div>
                  <span>Curator Photo Review (Within 24 Hours)</span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-500">
                  <div className="w-4 h-4 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-[9px]">3</div>
                  <span>Prepaid Courier Box Dispatched to Your Address</span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-500">
                  <div className="w-4 h-4 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-[9px]">4</div>
                  <span>Physical UV Check & Payout Dispatched</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleResetForm}
                className="text-xs font-mono uppercase tracking-wider"
              >
                Submit Another Pair
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-xs font-mono uppercase tracking-wider"
              >
                <Link to="/admin">
                  <span>View in Admin Pipeline →</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* MULTI-STEP WIZARD FORM */
          /* ========================================================================= */
          <div className="p-6 sm:p-8 rounded-lg border border-surface-border bg-white shadow-fine space-y-6">
            
            {/* Stepper Progress Bar */}
            <div className="space-y-2 border-b border-surface-border pb-4">
              <div className="flex items-center justify-between text-2xs font-mono">
                <span className="font-semibold text-ink-950">
                  Step {step} of {totalSteps}: {step === 1 ? 'Sneaker Photos & Specs' : step === 2 ? 'Condition Self-Report' : 'Intent & Contact'}
                </span>
                <span className="text-ink-400">
                  {Math.round((step / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-surface-subtle h-1.5 rounded-pill overflow-hidden">
                <div
                  className="bg-ink-950 h-full rounded-pill transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: SNEAKER SPECS & PHOTOS */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-ink-950">
                    Step 1: Sneaker Specification & Visuals
                  </h3>
                  <p className="text-2xs text-ink-500 font-mono">
                    Identify your pair and attach photos showing the upper, toe box, and outsole.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Brand */}
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Brand</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-2 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                    >
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Silhouette */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-2xs font-mono text-ink-600 block">
                      Silhouette Model Name <span className="text-clay-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dunk Low Retro, Samba OG, Air Max 1"
                      value={formData.silhouette}
                      onChange={(e) => setFormData({ ...formData, silhouette: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-2 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Colorway */}
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Colorway</label>
                    <input
                      type="text"
                      placeholder="e.g. White / Black, Gum"
                      value={formData.colorway}
                      onChange={(e) => setFormData({ ...formData, colorway: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-2 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                    />
                  </div>

                  {/* Size */}
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">US Men / Unisex Size</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-2 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>US {s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Release Year */}
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Release Year (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 2021"
                      value={formData.releaseYear}
                      onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-2 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                    />
                  </div>
                </div>

                {/* Photo Upload Stage */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-2xs font-mono text-ink-700 uppercase tracking-archival font-semibold block">
                      Photographic Evidence (Lateral, Toe Box, Outsole, Size Tag)
                    </label>
                    <button
                      type="button"
                      onClick={addSamplePhoto}
                      className="text-[10px] font-mono text-clay-700 hover:text-clay-900 underline"
                    >
                      + Add Demo Sample Photo
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-surface-border hover:border-ink-900 rounded-md p-6 text-center bg-surface-subtle/30 transition-all space-y-2">
                    <input
                      type="file"
                      id="shoe-photos-input"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="shoe-photos-input"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white border border-surface-border hover:border-ink-950 text-ink-900 font-mono text-2xs cursor-pointer shadow-fine transition-all"
                    >
                      <Camera className="w-3.5 h-3.5 text-clay-600" />
                      <span>Select Images from Device</span>
                    </label>
                    <p className="text-[10px] font-mono text-ink-400">
                      Supports JPG, PNG, WEBP. Drag and drop accepted.
                    </p>
                  </div>

                  {/* Uploaded Thumbnails Preview */}
                  {formData.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.photos.map((src, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-xs border border-surface-border overflow-hidden group">
                          <img src={src} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    disabled={!formData.silhouette}
                    onClick={() => setStep(2)}
                    className="text-2xs font-mono uppercase tracking-wider"
                  >
                    <span>Proceed to Condition Report</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: CONDITION SELF-REPORT */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-ink-950">
                    Step 2: Condition Self-Report
                  </h3>
                  <p className="text-2xs text-ink-500 font-mono">
                    Accurate self-reporting expedites physical intake appraisal and ensures top payout.
                  </p>
                </div>

                {/* Overall Tier */}
                <div className="space-y-1">
                  <label className="text-2xs font-mono text-ink-600 block">Overall Condition Assessment</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { tier: 'Near Mint (9.0+)', desc: 'Worn 1-2 times indoors, crisp stars, spotless insole' },
                      { tier: 'Excellent (8.0–8.9)', desc: 'Light micro-creases, clean uppers, zero heel rub' },
                      { tier: 'Restored (7.0–7.9)', desc: 'Character wear, freshly conditioned patina' },
                    ].map((c) => (
                      <button
                        key={c.tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, conditionTier: c.tier })}
                        className={cn(
                          "p-3 rounded-xs border text-left transition-all",
                          formData.conditionTier === c.tier
                            ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                            : "bg-surface-subtle hover:bg-white border-surface-border text-ink-600"
                        )}
                      >
                        <span className="font-serif text-xs font-bold text-ink-950 block">{c.tier}</span>
                        <span className="text-[10px] text-ink-500 font-mono mt-0.5 block leading-snug">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-ratings Breakdown Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Outsole Tread Wear</label>
                    <select
                      value={formData.outsoleWear}
                      onChange={(e) => setFormData({ ...formData, outsoleWear: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-1.5 text-ink-900"
                    >
                      <option>Zero / Minimal Wear (95%+ Stars)</option>
                      <option>Minor Heel Drag Only</option>
                      <option>Moderate Tread Smoothing</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Upper Leather / Suede</label>
                    <select
                      value={formData.upperCondition}
                      onChange={(e) => setFormData({ ...formData, upperCondition: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-1.5 text-ink-900"
                    >
                      <option>Clean / Uncreased</option>
                      <option>Light Toe Box Creasing</option>
                      <option>Character Scuffs Present</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">Original Box & Laces</label>
                    <select
                      value={formData.boxAndLaces}
                      onChange={(e) => setFormData({ ...formData, boxAndLaces: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-2.5 py-1.5 text-ink-900"
                    >
                      <option>Original Box Included</option>
                      <option>Replacement Box</option>
                      <option>No Box (Shoes Only)</option>
                    </select>
                  </div>
                </div>

                {/* Flaws text */}
                <div className="space-y-1">
                  <label className="text-2xs font-mono text-ink-600 block">
                    Detailed Notes or Flaws (Scrubs, stains, odor, missing tags)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any minor flaws or restoration history..."
                    value={formData.wearNotes}
                    onChange={(e) => setFormData({ ...formData, wearNotes: e.target.value })}
                    className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs p-3 text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-950"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setStep(1)} className="text-2xs font-mono">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Back
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setStep(3)} className="text-2xs font-mono uppercase">
                    <span>Next: Intent & Payout</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: INTENT & CONTACT INFO */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-ink-950">
                    Step 3: Payout Intent & Contact Details
                  </h3>
                  <p className="text-2xs text-ink-500 font-mono">
                    Choose whether you want direct cash, store credit bonus, or charitable donation receipt.
                  </p>
                </div>

                {/* Intent Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, intent: 'sell' })}
                    className={cn(
                      "p-3 rounded-xs border text-left transition-all",
                      formData.intent === 'sell'
                        ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                        : "bg-surface-subtle hover:bg-white border-surface-border"
                    )}
                  >
                    <div className="flex items-center gap-1.5 text-ink-950 font-bold font-serif text-xs">
                      <DollarSign className="w-3.5 h-3.5 text-olive-600" />
                      <span>Cash Payout</span>
                    </div>
                    <p className="text-[10px] text-ink-500 font-mono mt-1">
                      Direct deposit or PayPal upon authentication
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, intent: 'trade' })}
                    className={cn(
                      "p-3 rounded-xs border text-left transition-all",
                      formData.intent === 'trade'
                        ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                        : "bg-surface-subtle hover:bg-white border-surface-border"
                    )}
                  >
                    <div className="flex items-center gap-1.5 text-ink-950 font-bold font-serif text-xs">
                      <Repeat className="w-3.5 h-3.5 text-clay-600" />
                      <span>Store Credit (+15%)</span>
                    </div>
                    <p className="text-[10px] text-ink-500 font-mono mt-1">
                      Bonus credit applied to purchase any archive pair
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, intent: 'donate' })}
                    className={cn(
                      "p-3 rounded-xs border text-left transition-all",
                      formData.intent === 'donate'
                        ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                        : "bg-surface-subtle hover:bg-white border-surface-border"
                    )}
                  >
                    <div className="flex items-center gap-1.5 text-ink-950 font-bold font-serif text-xs">
                      <Gift className="w-3.5 h-3.5 text-olive-600" />
                      <span>Eco-Donation</span>
                    </div>
                    <p className="text-[10px] text-ink-500 font-mono mt-1">
                      100% donated to zero-waste restoration charity
                    </p>
                  </button>
                </div>

                {/* Asking Price (if selling or trading) */}
                {formData.intent !== 'donate' && (
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">
                      Target Asking / Consignment Price ($)
                    </label>
                    <div className="relative max-w-xs">
                      <DollarSign className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        placeholder="e.g. 85"
                        value={formData.askingPrice}
                        onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                        className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs pl-8 pr-3 py-1.5 text-ink-900"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">
                      Your Name <span className="text-clay-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-1.5 text-ink-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">
                      Email Address <span className="text-clay-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-1.5 text-ink-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-2xs font-mono text-ink-600 block">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs px-3 py-1.5 text-ink-900"
                    />
                  </div>
                </div>

                {/* Handover Preference */}
                <div className="space-y-1 pt-1">
                  <label className="text-2xs font-mono text-ink-600 block">Shoe Inbound Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, handoverMethod: 'prepaid_courier' })}
                      className={cn(
                        "p-2.5 rounded-xs border text-left text-2xs font-mono",
                        formData.handoverMethod === 'prepaid_courier'
                          ? "bg-white border-ink-950 font-bold"
                          : "bg-surface-subtle text-ink-600"
                      )}
                    >
                      Prepaid Insured Courier Label (Emailed to you)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, handoverMethod: 'boutique_dropoff' })}
                      className={cn(
                        "p-2.5 rounded-xs border text-left text-2xs font-mono",
                        formData.handoverMethod === 'boutique_dropoff'
                          ? "bg-white border-ink-950 font-bold"
                          : "bg-surface-subtle text-ink-600"
                      )}
                    >
                      Drop off in-person at Concept Boutique (104 Archive Blvd)
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Button type="button" variant="outline" size="sm" onClick={() => setStep(2)} className="text-2xs font-mono">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting || !formData.contactEmail}
                    className="text-2xs font-mono uppercase tracking-wider"
                  >
                    {isSubmitting ? 'Registering with Vault...' : 'Submit Pair for Appraisal'}
                  </Button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
