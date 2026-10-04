import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Badge } from '@/components/ui/Badge';
import { SneakerCardCountdown } from '@/features/deals/CountdownTimer';
import { cn } from '@/lib/utils';

export const SneakerCard = ({ shoe, className }) => {
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(shoe.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const savings = Math.max(0, shoe.pricing.originalRetail - shoe.pricing.thriftPrice);
  const savingsPct = Math.round((savings / shoe.pricing.originalRetail) * 100);

  return (
    <div
      className={cn(
        "group relative bg-white border border-surface-border rounded-md overflow-hidden flex flex-col transition-all duration-200 hover:border-ink-400 hover:shadow-card",
        className
      )}
    >
      {/* Image Container with Wishlist Trigger & Badges */}
      <div className="relative aspect-[4/3] bg-surface-subtle overflow-hidden">
        <Link to={`/product/${shoe.id}`} className="block w-full h-full">
          <img
            src={shoe.images[0]}
            alt={shoe.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {shoe.isSoldOut ? (
            <span className="badge-archival bg-ink-950 text-white border-ink-950 shadow-fine font-semibold">
              Sold Out
            </span>
          ) : (
            <span className="badge-archival bg-white/90 backdrop-blur-sm text-ink-900 border-surface-border shadow-fine font-semibold">
              {shoe.condition.label}
            </span>
          )}
          {!shoe.isSoldOut && savingsPct >= 40 && (
            <span className="badge-archival bg-clay-50/90 backdrop-blur-sm text-clay-700 border-clay-200 font-semibold">
              -{savingsPct}%
            </span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(shoe.id);
          }}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-fine",
            isInWishlist
              ? "bg-clay-600 text-white"
              : "bg-white/80 hover:bg-white text-ink-700 hover:text-ink-950"
          )}
          title={isInWishlist ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={cn("w-3.5 h-3.5", isInWishlist && "fill-current")} />
        </button>

        {/* Bottom Size Stamp & Deal Countdown */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="text-[9px] font-mono uppercase tracking-archival px-1.5 py-0.5 rounded-xs bg-ink-950/75 backdrop-blur-sm text-white">
            US {shoe.sizing.usSize}
          </span>
          {shoe.dealEndsAt && (
            <SneakerCardCountdown targetDate={shoe.dealEndsAt} />
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-baseline justify-between text-2xs font-mono text-ink-400 mb-0.5">
            <span className="uppercase tracking-archival font-semibold text-ink-600">
              {shoe.brand}
            </span>
            <span>{shoe.releaseYear}</span>
          </div>

          <Link
            to={`/product/${shoe.id}`}
            className="block font-serif text-sm font-semibold text-ink-950 hover:text-ink-700 transition-colors line-clamp-1"
          >
            {shoe.name}
          </Link>
          <p className="text-[11px] text-ink-500 line-clamp-1 mt-0.5">
            {shoe.colorway}
          </p>
        </div>

        {/* Price Row */}
        <div className="pt-2 border-t border-surface-border flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-sm font-bold text-ink-950">
              ${shoe.pricing.thriftPrice}
            </span>
            <span className="text-2xs font-mono text-ink-400 line-through">
              ${shoe.pricing.originalRetail}
            </span>
          </div>

          <Link
            to={`/product/${shoe.id}`}
            className="text-2xs font-mono uppercase tracking-wider text-ink-800 hover:text-clay-600 font-medium transition-colors"
          >
            View Pair →
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SneakerCardSkeleton = () => {
  return (
    <div className="bg-white border border-surface-border rounded-md overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface-subtle" />
      <div className="p-3.5 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-surface-border rounded-xs" />
          <div className="h-3 w-8 bg-surface-border rounded-xs" />
        </div>
        <div className="h-4 w-3/4 bg-surface-border rounded-xs" />
        <div className="h-3 w-1/2 bg-surface-border rounded-xs" />
        <div className="pt-2 border-t border-surface-border flex justify-between">
          <div className="h-4 w-14 bg-surface-border rounded-xs" />
          <div className="h-3 w-12 bg-surface-border rounded-xs" />
        </div>
      </div>
    </div>
  );
};
