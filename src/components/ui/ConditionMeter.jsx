import React, { useState } from 'react';
import { ShieldCheck, Info, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Precision Shoe Condition Meter
 * Evaluates the archival pair across overall score + sole, upper, and interior dimensions.
 */
export const ConditionMeter = ({
  score = 9.2, // 1.0 - 10.0 scale
  label = "Near Mint",
  subRatings = {
    sole: 9.0,
    upper: 9.5,
    interior: 9.0,
  },
  wearNotes = "Minimal creasing on leather toe box. Outsole tread 95% intact. Clean insole branding.",
  showDetails = true,
  className,
}) => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);

  // Meter color logic
  const getColorClasses = (val) => {
    if (val >= 9.5) return { bar: 'bg-olive-600', text: 'text-olive-700', bg: 'bg-olive-50' };
    if (val >= 9.0) return { bar: 'bg-olive-600', text: 'text-olive-700', bg: 'bg-olive-50' };
    if (val >= 8.0) return { bar: 'bg-ink-800', text: 'text-ink-800', bg: 'bg-surface-muted' };
    if (val >= 7.0) return { bar: 'bg-ochre-600', text: 'text-ochre-700', bg: 'bg-ochre-50' };
    return { bar: 'bg-clay-600', text: 'text-clay-700', bg: 'bg-clay-50' };
  };

  const getPercentage = (val) => Math.min(100, Math.max(0, (val / 10) * 100));

  const overallColors = getColorClasses(score);

  return (
    <div className={cn("p-4 rounded-md bg-white border border-surface-border space-y-3.5 shadow-fine", className)}>
      
      {/* Header: Label, Score, and Scale Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 font-semibold block">
              Physical Condition Index
            </span>
            <button
              type="button"
              onClick={() => setShowCriteriaModal(!showCriteriaModal)}
              className="text-ink-400 hover:text-ink-950 transition-colors"
              title="View grading tier criteria"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-serif text-base font-bold text-ink-950">
              {label}
            </span>
            <span className="text-[11px] font-mono text-ink-400">
              (Lab Certified)
            </span>
          </div>
        </div>

        {/* Big Score Callout */}
        <div className="flex items-baseline gap-1 bg-surface-muted border border-surface-border px-2.5 py-1 rounded-xs">
          <span className="font-mono text-base font-bold text-ink-950">
            {score.toFixed(1)}
          </span>
          <span className="font-mono text-2xs text-ink-400">/ 10</span>
        </div>
      </div>

      {/* Main Overall Progress Meter (Segmented Style) */}
      <div className="space-y-1">
        <div className="relative w-full bg-surface-subtle h-2 rounded-pill overflow-hidden flex">
          {/* Calibrated Tick Marks / Segments */}
          <div
            className={cn("h-full rounded-pill transition-all duration-700 ease-out", overallColors.bar)}
            style={{ width: `${getPercentage(score)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-ink-400 px-0.5">
          <span>7.0 (Restored)</span>
          <span>8.0 (Good)</span>
          <span>9.0 (Near Mint)</span>
          <span>10.0 (Deadstock)</span>
        </div>
      </div>

      {/* 3 Sub-ratings breakdown (Sole, Upper, Inside) */}
      {showDetails && subRatings && (
        <div className="pt-2 border-t border-surface-border grid grid-cols-3 gap-3">
          
          {/* Sole Breakdown */}
          <div className="space-y-1">
            <div className="flex justify-between text-2xs font-mono">
              <span className="text-ink-500 font-medium">Outsole</span>
              <span className="font-bold text-ink-950">{(subRatings.sole || 9.0).toFixed(1)}</span>
            </div>
            <div className="w-full bg-surface-subtle h-1.5 rounded-pill overflow-hidden">
              <div
                className={cn("h-full rounded-pill transition-all duration-500", getColorClasses(subRatings.sole || 9.0).bar)}
                style={{ width: `${getPercentage(subRatings.sole || 9.0)}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-ink-400 block truncate">Tread & Stars</span>
          </div>

          {/* Upper Breakdown */}
          <div className="space-y-1">
            <div className="flex justify-between text-2xs font-mono">
              <span className="text-ink-500 font-medium">Upper</span>
              <span className="font-bold text-ink-950">{(subRatings.upper || 9.5).toFixed(1)}</span>
            </div>
            <div className="w-full bg-surface-subtle h-1.5 rounded-pill overflow-hidden">
              <div
                className={cn("h-full rounded-pill transition-all duration-500", getColorClasses(subRatings.upper || 9.5).bar)}
                style={{ width: `${getPercentage(subRatings.upper || 9.5)}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-ink-400 block truncate">Leather & Mesh</span>
          </div>

          {/* Inside / Interior Breakdown */}
          <div className="space-y-1">
            <div className="flex justify-between text-2xs font-mono">
              <span className="text-ink-500 font-medium">Interior</span>
              <span className="font-bold text-ink-950">{(subRatings.interior || 9.0).toFixed(1)}</span>
            </div>
            <div className="w-full bg-surface-subtle h-1.5 rounded-pill overflow-hidden">
              <div
                className={cn("h-full rounded-pill transition-all duration-500", getColorClasses(subRatings.interior || 9.0).bar)}
                style={{ width: `${getPercentage(subRatings.interior || 9.0)}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-ink-400 block truncate">Lining & Insole</span>
          </div>

        </div>
      )}

      {/* Wear Notes Callout */}
      {wearNotes && (
        <div className="p-2.5 rounded-xs bg-surface-subtle/70 border border-surface-border/60 text-2xs font-mono text-ink-600 leading-snug">
          <strong className="text-ink-900 font-semibold uppercase text-[10px] block mb-0.5">
            Wear Profile:
          </strong>
          {wearNotes}
        </div>
      )}

      {/* Criteria Info Modal / Dropdown */}
      {showCriteriaModal && (
        <div className="p-3 rounded-md bg-surface-muted border border-surface-border text-2xs space-y-2 animate-in fade-in">
          <div className="flex justify-between items-center font-mono font-semibold text-ink-900">
            <span>RE/SOLE Archival Grading Standards</span>
            <button
              type="button"
              onClick={() => setShowCriteriaModal(false)}
              className="text-ink-500 hover:text-ink-950"
            >
              ×
            </button>
          </div>
          <div className="space-y-1.5 text-ink-600 font-mono text-[11px]">
            <p><strong className="text-olive-700">9.5 - 10.0:</strong> Deadstock or unworn museum archive.</p>
            <p><strong className="text-olive-700">9.0 - 9.4:</strong> Near Mint. Worn once or twice indoors, 95%+ sole traction.</p>
            <p><strong className="text-ink-800">8.0 - 8.9:</strong> Excellent. Light leather creasing, clean insole, zero heel drag.</p>
            <p><strong className="text-ochre-700">7.0 - 7.9:</strong> Restored. Moderate character wear, freshly deep-cleaned and conditioned.</p>
          </div>
        </div>
      )}

    </div>
  );
};
