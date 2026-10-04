import React, { useState } from 'react';
import { ShieldCheck, Check, Info, X, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Authenticity Verification Badge & Interactive Checklist
 * Verified badge with interactive 4-point checklist:
 * 1. Logo & Silhouette Geometry
 * 2. Stitching & Seam Precision
 * 3. Serial Number & Inner Tag / SKU
 * 4. Material & Full-Grain Leather / Suede Authenticity
 */
export const AuthenticityBadge = ({
  checklist = [
    { 
      id: "logo",
      title: "Logo & Silhouette Geometry", 
      passed: true, 
      detail: "Embossing depth, font kerning, and trademark swoosh/stripe proportions matched against official archive blueprints under 10x magnification." 
    },
    { 
      id: "stitching",
      title: "Stitching & Seam Precision", 
      passed: true, 
      detail: "Double needle stitch count verified at 8 stitches per inch. Thread tension uniform with zero irregular crossovers or fraying." 
    },
    { 
      id: "serial",
      title: "Serial Number & Box Tag (UPC)", 
      passed: true, 
      detail: "Interior production tag QR code and factory SKU match shoe tongue label and official global release registry." 
    },
    { 
      id: "material",
      title: "Material & Leather Authenticity", 
      passed: true, 
      detail: "Full-grain leather and suede nap tested under UV blacklight. No synthetic adhesives or chemical discrepancies detected." 
    },
  ],
  verifiedDate = "2024-09-18",
  inspectorId = "INSP-8492",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleItem = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      
      {/* Verified Badge Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-olive-50 hover:bg-olive-100 border border-olive-200 text-olive-800 transition-all focus:outline-none shadow-fine"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-olive-600 shrink-0" />
        <span className="font-mono text-2xs uppercase tracking-archival font-semibold">
          Authenticity Verified (4-Point Check)
        </span>
        <Info className="w-3 h-3 text-olive-500 group-hover:text-olive-700 transition-colors ml-0.5" />
      </button>

      {/* Popover Interactive Checklist */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-md bg-white border border-surface-border shadow-lift p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header with Inspector Certificate */}
            <div className="flex items-start justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-ink-950 leading-tight">
                    Archive Authenticity Certificate
                  </h4>
                  <p className="text-[10px] font-mono text-ink-500">
                    Inspector: <strong className="text-ink-800">{inspectorId}</strong> • {verifiedDate}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-ink-400 hover:text-ink-950 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-header instruction */}
            <div className="py-2 text-2xs font-mono text-ink-500 flex items-center justify-between">
              <span>Interactive 4-Point Lab Verification</span>
              <span className="px-1.5 py-0.2 rounded-xs bg-olive-50 text-olive-700 font-bold text-[9px]">
                100% PASSED
              </span>
            </div>

            {/* Interactive 4 Items */}
            <div className="space-y-2">
              {checklist.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div
                    key={item.id || idx}
                    className="border border-surface-border rounded-xs overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="w-full p-2.5 flex items-center justify-between text-left hover:bg-surface-subtle transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-olive-600 flex items-center justify-center text-white shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-xs font-semibold text-ink-900 font-sans">
                          {item.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-3 pb-2.5 pt-0.5 bg-surface-subtle/50 text-2xs font-mono text-ink-600 leading-relaxed border-t border-surface-border/60">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Seal & Guarantee Footer */}
            <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-between text-2xs font-mono text-ink-400">
              <span className="flex items-center gap-1 text-olive-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-olive-600" />
                Physical Inspection Seal Attached
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-ink-700 hover:text-ink-950 font-semibold underline"
              >
                Close
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};
