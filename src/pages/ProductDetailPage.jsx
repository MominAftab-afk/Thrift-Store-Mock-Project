import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  ArrowLeft, 
  Check, 
  Share2, 
  AlertCircle,
  Camera,
  Bell,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { dbService } from '@/services/db';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { ConditionMeter } from '@/components/ui/ConditionMeter';
import { AuthenticityBadge } from '@/components/ui/AuthenticityBadge';
import { PriceComparison } from '@/components/ui/PriceComparison';
import { InteractiveShoeViewer } from '@/features/shoe-viewer/InteractiveShoeViewer';
import { VirtualTryOnModal } from '@/features/virtual-try-on/VirtualTryOnModal';
import { SmartSizeRecommender } from '@/features/size-recommender/SmartSizeRecommender';
import { DetailedReviews } from '@/features/reviews/DetailedReviews';
import { NotifyMeModal } from '@/features/drop-alerts/NotifyMeModal';
import { ShoeStory } from '@/features/story/ShoeStory';
import { ProductDetailDealBanner } from '@/features/deals/CountdownTimer';
import { cn } from '@/lib/utils';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shoe, setShoe] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Modals & Interactive Overlays
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [simulatedSoldOut, setSimulatedSoldOut] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const isInCart = useCartStore((s) => s.items.some((i) => i.shoe.id === id));
  const openCart = useUIStore((s) => s.openCart);

  const isInWishlist = useWishlistStore((s) => s.isInWishlist(id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "1234567890";

  useEffect(() => {
    async function fetchShoe() {
      try {
        setLoading(true);
        const data = await dbService.getShoeById(id);
        setShoe(data);
        setActiveImageIndex(0);
        setSimulatedSoldOut(Boolean(data?.isSoldOut));
      } catch (err) {
        console.error("Failed to load shoe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchShoe();
  }, [id]);

  const handleAddToCart = () => {
    if (!shoe) return;
    addToCart(shoe, shoe.sizing.usSize);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      openCart();
    }, 400);
  };

  // WhatsApp Pre-filled message
  const getWhatsAppLink = () => {
    if (!shoe) return "#";
    const msg = `Hi RE/SOLE Archive, I'm inquiring about the ${shoe.name} (SKU: ${shoe.sku}, Size: US ${shoe.sizing.usSize}, Condition: ${shoe.condition.score} ${shoe.condition.label}, Listed at $${shoe.pricing.thriftPrice}). Is this 1-of-1 pair still available for purchase or studio inspection?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  // Copy share link
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${shoe.name} | RE/SOLE Archive`,
        text: `Check out this 1-of-1 authenticated ${shoe.name} on RE/SOLE Archive.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Archive link copied to clipboard.");
    }
  };

  // LOADING SKELETON
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-pulse">
        <div className="h-4 w-48 bg-surface-subtle rounded-xs" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] bg-surface-subtle rounded-md" />
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-surface-subtle rounded-xs" />
              <div className="w-16 h-16 bg-surface-subtle rounded-xs" />
            </div>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 w-24 bg-surface-subtle rounded-xs" />
            <div className="h-8 w-3/4 bg-surface-subtle rounded-xs" />
            <div className="h-20 w-full bg-surface-subtle rounded-xs" />
            <div className="h-28 w-full bg-surface-subtle rounded-xs" />
          </div>
        </div>
      </div>
    );
  }

  // NOT FOUND / EMPTY STATE
  if (!shoe) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center mx-auto text-ink-400">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="font-serif text-xl font-bold text-ink-950">
          Archive Record Not Found
        </h2>
        <p className="text-2xs text-ink-500 leading-relaxed">
          This pair may have been archived, transferred to a private collector, or the archive ID is invalid.
        </p>
        <Button asChild variant="primary" size="md" className="mt-2 text-xs">
          <Link to="/shop">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Return to Catalog</span>
          </Link>
        </Button>
      </div>
    );
  }

  const isSoldOut = simulatedSoldOut;

  return (
    <div className="bg-white min-h-screen py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Breadcrumb Navigation & Share Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-2xs font-mono text-ink-400">
            <Link to="/" className="hover:text-ink-950 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-ink-950 transition-colors">Catalog</Link>
            <span>/</span>
            <Link to={`/shop?brand=${shoe.brand}`} className="hover:text-ink-950 transition-colors">{shoe.brand}</Link>
            <span>/</span>
            <span className="text-ink-800 font-medium truncate max-w-xs">{shoe.silhouette}</span>
          </nav>

          <div className="flex items-center gap-3">
            {/* Quick Test Sold-Out State Toggle */}
            <button
              type="button"
              onClick={() => setSimulatedSoldOut(!simulatedSoldOut)}
              className="text-[10px] font-mono text-ink-400 hover:text-ink-800 underline hidden sm:inline"
              title="Toggle to test in-stock vs sold-out Notify Me flow"
            >
              {simulatedSoldOut ? "Show In-Stock State" : "Simulate Sold-Out State"}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="text-ink-400 hover:text-ink-950 p-1 flex items-center gap-1 text-2xs font-mono transition-colors"
              title="Share archive link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* 2-Column Flagship PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: INTERACTIVE SHOE VIEWER + PROVENANCE + SPECIFICATIONS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 360° / Turntable / 3D WebGL / High-Res Stage */}
            <InteractiveShoeViewer
              shoe={shoe}
              activeImageIndex={activeImageIndex}
              onSelectImage={setActiveImageIndex}
            />

            {/* Quick Feature Strip Under Stage */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-surface-muted/50 border border-surface-border">
              {/* Authenticity Check with 4-Point Interactive Checklist Popover */}
              <AuthenticityBadge
                checklist={shoe.authenticity?.checklist}
                verifiedDate={shoe.authenticity?.verifiedDate}
                inspectorId={shoe.authenticity?.inspectorId}
              />

              {/* Virtual Try-On AR Trigger Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTryOnOpen(true)}
                className="text-2xs font-mono uppercase tracking-archival gap-1.5 border-ink-800 text-ink-900 hover:bg-ink-950 hover:text-white transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-clay-600" />
                <span>Virtual Try-On (AR)</span>
              </Button>
            </div>

            {/* Curated Editorial Shoe Story & Provenance Section */}
            <ShoeStory shoe={shoe} />

            {/* Archival Specification Table */}
            <div className="p-4 rounded-md bg-white border border-surface-border shadow-fine space-y-3">
              <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
                Archival Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-2xs font-mono divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
                <div className="space-y-0.5">
                  <span className="text-ink-400 block">Silhouette</span>
                  <span className="font-semibold text-ink-900">{shoe.silhouette}</span>
                </div>
                <div className="space-y-0.5 sm:pl-3">
                  <span className="text-ink-400 block">Colorway</span>
                  <span className="font-semibold text-ink-900 truncate block" title={shoe.colorway}>{shoe.colorway}</span>
                </div>
                <div className="space-y-0.5 sm:pl-3">
                  <span className="text-ink-400 block">Release Year</span>
                  <span className="font-semibold text-ink-900">{shoe.releaseYear}</span>
                </div>
                <div className="space-y-0.5 sm:pl-3">
                  <span className="text-ink-400 block">Inventory State</span>
                  <span className="font-semibold text-olive-700">1-of-1 Vaulted</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: PRICING, CONDITION METER, SIZING ADVISOR & ACTIONS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Title & Archival Stamp */}
            <div className="space-y-1.5 border-b border-surface-border pb-4">
              <div className="flex items-center justify-between text-2xs font-mono text-ink-500">
                <span className="uppercase tracking-archival font-semibold text-ink-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive-600" />
                  {shoe.brand} Heritage Archive
                </span>
                <span className="badge-archival bg-surface-muted text-ink-600 border-surface-border">
                  SKU: {shoe.sku}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950 leading-tight">
                {shoe.name}
              </h1>

              <div className="flex items-center gap-2 pt-1 text-2xs font-mono text-ink-500">
                <span>Color: {shoe.colorway}</span>
                <span>•</span>
                <span>Era: {shoe.releaseYear}</span>
              </div>
            </div>

            {/* Limited-Time Deal Countdown Banner */}
            {shoe.dealEndsAt && (
              <ProductDetailDealBanner targetDate={shoe.dealEndsAt} />
            )}

            {/* Price Comparison Primitive: Prominent Savings & Retail Diff */}
            <PriceComparison
              originalPrice={shoe.pricing.originalRetail}
              thriftPrice={shoe.pricing.thriftPrice}
              currency={shoe.pricing.currency || '$'}
            />

            {/* Visual Shoe Condition Meter (Overall Score + Sole/Upper/Inside Breakdown) */}
            <ConditionMeter
              score={shoe.condition.score}
              label={shoe.condition.label}
              subRatings={shoe.condition.subRatings}
              wearNotes={shoe.condition.wearNotes}
            />

            {/* Sizing Specification + Smart Size Recommender */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-2xs font-mono">
                <span className="uppercase tracking-archival text-ink-500 font-semibold">
                  Archive Size (1-of-1 Item)
                </span>
                <span className="text-ink-400 font-mono">Single Pair in Vault</span>
              </div>

              {/* Sizing Detail Card */}
              <div className="p-3.5 rounded-md bg-surface-muted/60 border border-surface-border flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-base font-bold text-ink-950">
                      US {shoe.sizing.usSize}
                    </span>
                    <span className="text-2xs font-mono text-ink-500">
                      (Fits: {shoe.sizing.fitNotes})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-400 mt-0.5 block">
                    UK {shoe.sizing.ukSize} • EU {shoe.sizing.euSize} • {shoe.sizing.cmSize} CM
                  </span>
                </div>

                <span className="badge-archival bg-white text-ink-800 border-surface-border font-semibold shadow-fine">
                  Verified Size
                </span>
              </div>

              {/* Smart Size Recommendation Tool */}
              <SmartSizeRecommender targetShoe={shoe} />
            </div>

            {/* Commercial Call to Action Area */}
            <div className="space-y-3 pt-2">
              
              {/* PRIMARY ACTION: Add to Bag OR Notify Me (if Sold Out) */}
              {isSoldOut ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-md bg-surface-subtle border border-surface-border text-center space-y-1">
                    <span className="font-mono text-2xs uppercase tracking-archival text-clay-700 font-bold block">
                      ARCHIVE ITEM CURRENTLY SOLD OUT
                    </span>
                    <p className="text-2xs text-ink-500">
                      This 1-of-1 pair has found a new home. Get notified when an identical size drops.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setIsNotifyOpen(true)}
                    className="w-full h-11 text-xs font-mono uppercase tracking-wider justify-center gap-2 bg-clay-600 hover:bg-clay-500 text-white"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notify Me When Similar Pair Drops</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className={cn(
                    "w-full h-11 text-xs font-mono uppercase tracking-wider justify-center gap-2 transition-all shadow-fine",
                    addedAnimation && "bg-olive-700"
                  )}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>In Archive Bag — View Checkout</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Archive Bag • ${shoe.pricing.thriftPrice}</span>
                    </>
                  )}
                </Button>
              )}

              {/* Secondary Actions Grid: Wishlist & WhatsApp Concierge */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Wishlist Button (Persisted per user) */}
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => toggleWishlist(shoe.id)}
                  className="w-full text-2xs font-mono uppercase gap-1.5 border-surface-border hover:border-ink-950"
                >
                  <Heart className={cn("w-3.5 h-3.5 transition-colors", isInWishlist ? "fill-clay-600 text-clay-600" : "text-ink-600")} />
                  <span>{isInWishlist ? "Saved to Wishlist" : "Save Pair"}</span>
                </Button>

                {/* Direct WhatsApp Concierge CTA */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-sm border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-mono text-2xs uppercase font-medium transition-colors shadow-fine"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Curator Assistance Micro-copy */}
              <div className="flex items-center justify-between text-[10px] font-mono text-ink-400 px-1 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive-500 animate-pulse" />
                  <span>Curator online on WhatsApp</span>
                </span>
                <span>Typical response: ~15 mins</span>
              </div>
            </div>

            {/* Delivery & Authentication Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-surface-border">
              <div className="p-3 rounded-sm border border-surface-border bg-surface-subtle/40 space-y-1">
                <div className="flex items-center gap-1.5 text-ink-900 font-semibold text-2xs font-mono">
                  <Truck className="w-3.5 h-3.5 text-ink-700" />
                  <span>Insured Express Courier</span>
                </div>
                <p className="text-[10px] text-ink-500 leading-snug">
                  Ships dispatched within 24 hours in moisture-sealed archival box.
                </p>
              </div>

              <div className="p-3 rounded-sm border border-surface-border bg-surface-subtle/40 space-y-1">
                <div className="flex items-center gap-1.5 text-ink-900 font-semibold text-2xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-ink-700" />
                  <span>Concept Boutique Pickup</span>
                </div>
                <p className="text-[10px] text-ink-500 leading-snug">
                  Inspect in person with complimentary espresso at our gallery.
                </p>
              </div>
            </div>

            {/* Trust Assurance Accordion */}
            <div className="p-3.5 rounded-md bg-olive-50/50 border border-olive-200/60 text-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-olive-900 font-semibold font-mono">
                <ShieldCheck className="w-4 h-4 text-olive-700" />
                <span>RE/SOLE 100% Provenance & Fit Guarantee</span>
              </div>
              <p className="text-olive-800 leading-relaxed text-[11px]">
                Every pair arrives with our tamper-evident NFC authenticity tag. If sizing or condition differs from our laboratory report in any way, return within 7 days for a full refund.
              </p>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* DETAILED REVIEWS SECTION: 4 DIMENSIONS + AGGREGATES + WRITE REVIEW */}
        {/* ========================================================================= */}
        <DetailedReviews
          shoeId={shoe.id}
          shoeName={shoe.name}
        />

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED CURATORIAL QUESTIONS */}
        {/* ========================================================================= */}
        <section className="pt-8 border-t border-surface-border space-y-4">
          <div className="space-y-1">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 font-semibold block">
              Transparency & Care
            </span>
            <h3 className="font-serif text-xl font-bold text-ink-950">
              Curator FAQ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-2xs">
            <div className="p-4 rounded-md border border-surface-border bg-white space-y-1.5">
              <h4 className="font-bold text-ink-900 font-mono">How is condition evaluated?</h4>
              <p className="text-ink-600 leading-relaxed">
                Every sneaker undergoes a 20-point laboratory examination under UV light and durometer testing. We score Outsole, Upper, and Interior independently so you know exactly where character wear exists.
              </p>
            </div>

            <div className="p-4 rounded-md border border-surface-border bg-white space-y-1.5">
              <h4 className="font-bold text-ink-900 font-mono">What cleaning methods are used?</h4>
              <p className="text-ink-600 leading-relaxed">
                We use pH-neutral organic foam cleaners, steam extraction, and cedar ozone chambers for complete sanitization while preserving original leather oils and patina.
              </p>
            </div>

            <div className="p-4 rounded-md border border-surface-border bg-white space-y-1.5">
              <h4 className="font-bold text-ink-900 font-mono">Can I inspect the pair before buying?</h4>
              <p className="text-ink-600 leading-relaxed">
                Yes. You can use our Virtual Try-On AR, message our curators on WhatsApp for high-res video closeups, or schedule an in-person viewing at our concept boutique.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* VIRTUAL TRY-ON AR MODAL */}
      <VirtualTryOnModal
        shoe={shoe}
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
      />

      {/* NOTIFY ME DROP ALERT MODAL */}
      <NotifyMeModal
        shoe={shoe}
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
      />

    </div>
  );
};
