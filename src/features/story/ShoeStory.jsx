import React from 'react';
import { Calendar, Compass, Footprints, Sparkles, BookOpen, Quote, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ShoeStory = ({ shoe, className }) => {
  if (!shoe || !shoe.story) return null;

  const { age, source, usage, highlight } = shoe.story;

  return (
    <div className={cn("p-5 sm:p-6 rounded-md bg-white border border-surface-border shadow-fine space-y-5", className)}>
      
      {/* Top Ledger Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-xs bg-clay-50 border border-clay-200 flex items-center justify-center text-clay-700">
            <BookOpen className="w-3 h-3" />
          </div>
          <div>
            <span className="font-mono text-2xs uppercase tracking-archival font-semibold text-ink-950">
              Provenance Ledger & Field Notes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-ink-400">
          <span>CATALOGUE #{shoe.sku}</span>
          <span>•</span>
          <span className="text-olive-700 font-semibold">1-OF-1 ARCHIVE</span>
        </div>
      </div>

      {/* Narrative Pull-Quote Moment */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-clay-600/70 py-1 space-y-2">
        <Quote className="w-4 h-4 text-clay-600/40 absolute -left-2 top-0 bg-white" />
        <p className="font-serif italic text-base sm:text-lg text-ink-900 leading-snug">
          "{usage}"
        </p>
        <p className="text-2xs font-mono text-ink-400 uppercase tracking-archival">
          — Official Curator's Acquisition Assessment
        </p>
      </div>

      {/* 4 Distinct Provenance Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
        
        {/* Pillar 1: Archival Era / Age */}
        <div className="p-3 rounded-xs bg-surface-subtle/50 border border-surface-border space-y-1">
          <div className="flex items-center gap-1.5 text-ink-500 text-2xs font-mono">
            <Calendar className="w-3 h-3 text-clay-600" />
            <span className="uppercase tracking-wider font-semibold">Archive Age</span>
          </div>
          <p className="font-serif text-sm font-bold text-ink-950">
            {age || `${new Date().getFullYear() - shoe.releaseYear} Years Archive`}
          </p>
          <p className="text-[10px] text-ink-400 font-mono">
            Released {shoe.releaseYear}
          </p>
        </div>

        {/* Pillar 2: Origin Source */}
        <div className="p-3 rounded-xs bg-surface-subtle/50 border border-surface-border space-y-1">
          <div className="flex items-center gap-1.5 text-ink-500 text-2xs font-mono">
            <Compass className="w-3 h-3 text-olive-600" />
            <span className="uppercase tracking-wider font-semibold">Curated Source</span>
          </div>
          <p className="font-serif text-sm font-bold text-ink-950 truncate" title={source}>
            {source}
          </p>
          <p className="text-[10px] text-ink-400 font-mono">
            Direct consignment
          </p>
        </div>

        {/* Pillar 3: Prior Usage & Wear */}
        <div className="p-3 rounded-xs bg-surface-subtle/50 border border-surface-border space-y-1">
          <div className="flex items-center gap-1.5 text-ink-500 text-2xs font-mono">
            <Footprints className="w-3 h-3 text-ink-700" />
            <span className="uppercase tracking-wider font-semibold">Prior Life</span>
          </div>
          <p className="font-serif text-sm font-bold text-ink-950 truncate" title={shoe.condition?.wearNotes}>
            {shoe.condition?.label || "Lightly Curated"}
          </p>
          <p className="text-[10px] text-ink-400 font-mono truncate" title={shoe.condition?.wearNotes}>
            {shoe.condition?.wearNotes}
          </p>
        </div>

        {/* Pillar 4: Unique Detail / Highlight */}
        <div className="p-3 rounded-xs bg-surface-subtle/50 border border-surface-border space-y-1">
          <div className="flex items-center gap-1.5 text-ink-500 text-2xs font-mono">
            <Sparkles className="w-3 h-3 text-clay-600" />
            <span className="uppercase tracking-wider font-semibold">Unique Detail</span>
          </div>
          <p className="font-serif text-sm font-bold text-ink-950 truncate" title={highlight}>
            {highlight}
          </p>
          <p className="text-[10px] text-ink-400 font-mono">
            Archive collector specification
          </p>
        </div>

      </div>

      {/* Authenticity Studio Stamp Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-border/60 text-[10px] font-mono text-ink-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-olive-600" />
          <span>Every detail verified in our physical restoration laboratory</span>
        </span>
        <span className="text-ink-600 font-medium">RE/SOLE Curatorial Seal • Passed</span>
      </div>

    </div>
  );
};
