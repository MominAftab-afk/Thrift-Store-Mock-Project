import React from 'react';
import { Tag, TrendingDown, Sparkles, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * High-Impact Price & Savings Comparison Component
 * Visual conversion driver comparing authenticated thrift price against original retail.
 */
export const PriceComparison = ({
  originalPrice = 160,
  thriftPrice = 85,
  currency = '$',
  className,
}) => {
  const savings = Math.max(0, originalPrice - thriftPrice);
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div className={cn("p-4 rounded-md bg-white border border-surface-border space-y-3 shadow-fine", className)}>
      
      {/* Price Header */}
      <div className="flex items-center justify-between">
        <span className="text-2xs font-mono uppercase tracking-archival text-ink-500 font-semibold block">
          Archival Valuation
        </span>
        <span className="badge-archival bg-clay-50 text-clay-700 border-clay-200 font-mono text-[9px] font-bold">
          {savingsPercent}% BELOW RETAIL
        </span>
      </div>

      {/* Main Figures */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl font-bold tracking-tight text-ink-950">
              {currency}{thriftPrice}
            </span>
            <span className="text-sm font-mono text-ink-400 line-through">
              {currency}{originalPrice}
            </span>
          </div>
          <span className="text-2xs font-mono text-ink-400 block">
            Curated archive price (1-of-1 pair)
          </span>
        </div>

        {/* Savings Callout Box */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-clay-50 border border-clay-200 text-clay-800 font-mono text-xs font-bold shadow-fine">
            <TrendingDown className="w-3.5 h-3.5 text-clay-600" />
            <span>YOU SAVE {currency}{savings}</span>
          </div>
          <span className="block text-[10px] font-mono text-ink-400 mt-1">
            Immediate collector savings
          </span>
        </div>
      </div>

      {/* Visual Relative Price Bar */}
      <div className="space-y-1 pt-1">
        <div className="w-full bg-surface-subtle h-2 rounded-pill overflow-hidden flex">
          <div
            className="bg-ink-950 h-full rounded-pill transition-all duration-500"
            style={{ width: `${Math.round((thriftPrice / originalPrice) * 100)}%` }}
            title={`Archive price: ${currency}${thriftPrice}`}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-ink-400">
          <span>You pay {currency}{thriftPrice} ({100 - savingsPercent}%)</span>
          <span className="text-clay-600 font-medium">Saved {currency}{savings}</span>
        </div>
      </div>

      {/* Sustainability Extra Perk */}
      <div className="pt-2 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono text-ink-500">
        <span className="flex items-center gap-1.5 text-olive-700">
          <Leaf className="w-3.5 h-3.5 text-olive-600 shrink-0" />
          <span>Circular Economy: 100% manufacturing carbon diverted</span>
        </span>
        <span className="text-ink-400 hidden sm:inline">Zero new plastic</span>
      </div>

    </div>
  );
};
