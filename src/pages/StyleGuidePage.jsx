import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '../components/ui/Input';
import { ConditionMeter } from '../components/ui/ConditionMeter';
import { AuthenticityBadge } from '../components/ui/AuthenticityBadge';
import { PriceComparison } from '../components/ui/PriceComparison';
import { DESIGN_TOKENS } from '../tokens/designTokens';
import { ShieldCheck, Sparkles, ArrowRight, Search, Check } from 'lucide-react';

export const StyleGuidePage = () => {
  const [inputSample, setInputSample] = useState('');
  const [demoConditionScore, setDemoConditionScore] = useState(9.4);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-ink-900">
      
      {/* Page Header — Refined & Restrained */}
      <section className="space-y-2 border-b border-surface-border pb-6">
        <div className="flex items-center gap-2">
          <span className="badge-archival bg-surface-subtle text-ink-800 border-surface-border">
            Specification 01
          </span>
          <span className="font-mono text-2xs text-ink-400">Design System & Token Architecture</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
          RE/SOLE Archive — Design Reference
        </h1>
        <p className="text-ink-500 max-w-2xl text-xs sm:text-sm leading-relaxed">
          Clean gallery white foundation paired with crisp typography, restrained proportions, and tactile micro-interactions.
        </p>
      </section>

      {/* SECTION 1: COLOR SYSTEM & PALETTE TOKENS */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-surface-border pb-2">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              01 / Palette
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950">
              Gallery White, Crisp Ink & Earthen Accents
            </h2>
          </div>
          <span className="text-2xs font-mono text-ink-400">Tailwind + CSS Variables</span>
        </div>

        {/* Compact Swatch Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Surface & Borders */}
          <div className="p-3.5 rounded-md border border-surface-border bg-white space-y-2.5 shadow-fine">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
              Surfaces & Borders
            </span>
            <div className="space-y-1.5">
              {[
                { name: 'Canvas White', hex: '#FFFFFF', desc: 'Primary viewport background' },
                { name: 'Surface Muted', hex: '#F9F9FA', desc: 'Subtle section containers' },
                { name: 'Surface Subtle', hex: '#F4F4F6', desc: 'Chip & tag fills' },
                { name: 'Hairline Border', hex: '#E8E8EC', desc: 'Dividers & card borders' },
              ].map((swatch) => (
                <div key={swatch.name} className="flex items-center justify-between text-2xs py-1 border-b border-surface-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-xs border border-ink-200 shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="font-medium text-ink-900">{swatch.name}</span>
                  </div>
                  <span className="font-mono text-ink-400 uppercase">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ink & Contrast */}
          <div className="p-3.5 rounded-md border border-surface-border bg-white space-y-2.5 shadow-fine">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
              Ink / Typography Scale
            </span>
            <div className="space-y-1.5">
              {[
                { name: 'Ink 950 (Black)', hex: '#0A0A0A', desc: 'Headlines, primary CTA' },
                { name: 'Ink 900 (Main)', hex: '#141414', desc: 'Body copy, high contrast' },
                { name: 'Ink 600 (Muted)', hex: '#5A5A5A', desc: 'Secondary editorial notes' },
                { name: 'Ink 400 (Metadata)', hex: '#9E9E9E', desc: 'SKU, serials, stamps' },
              ].map((swatch) => (
                <div key={swatch.name} className="flex items-center justify-between text-2xs py-1 border-b border-surface-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-xs border border-ink-200 shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="font-medium text-ink-900">{swatch.name}</span>
                  </div>
                  <span className="font-mono text-ink-400 uppercase">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Signals */}
          <div className="p-3.5 rounded-md border border-surface-border bg-white space-y-2.5 shadow-fine">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
              Curated Accents
            </span>
            <div className="space-y-1.5">
              {[
                { name: 'Terracotta Clay', hex: '#8E3C20', desc: 'High-intent CTA, savings' },
                { name: 'Archival Olive', hex: '#2D5438', desc: '100% verified trust stamp' },
                { name: 'Vintage Ochre', hex: '#A47020', desc: 'Drop countdown badges' },
                { name: 'Clay Tint', hex: '#F4EAE6', desc: 'Savings pill fill' },
              ].map((swatch) => (
                <div key={swatch.name} className="flex items-center justify-between text-2xs py-1 border-b border-surface-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-xs border border-ink-200 shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="font-medium text-ink-900">{swatch.name}</span>
                  </div>
                  <span className="font-mono text-ink-400 uppercase">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: TYPOGRAPHY HIERARCHY */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-surface-border pb-2">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              02 / Typography
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950">
              Calibrated Proportions
            </h2>
          </div>
          <span className="text-2xs font-mono text-ink-400">Fraunces • Plus Jakarta Sans • JetBrains Mono</span>
        </div>

        <div className="border border-surface-border rounded-md bg-white p-5 space-y-4 shadow-fine">
          
          {/* Display */}
          <div className="border-b border-surface-border pb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 tracking-tight">
              Curated Vintage Footwear
            </span>
            <span className="font-mono text-2xs text-ink-400">Display (30px / 1.1)</span>
          </div>

          {/* Heading 1 */}
          <div className="border-b border-surface-border pb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="font-serif text-lg sm:text-xl font-semibold text-ink-900 tracking-tight">
              Nike Dunk Low Retro 'Black/White' (2021)
            </span>
            <span className="font-mono text-2xs text-ink-400">Heading 1 (20px / 1.25)</span>
          </div>

          {/* Editorial Quote */}
          <div className="border-b border-surface-border pb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <p className="font-serif italic text-sm sm:text-base text-ink-700 leading-snug max-w-xl">
              "Acquired from an editorial studio in Tokyo; soles preserved in humidity-regulated archive vault."
            </p>
            <span className="font-mono text-2xs text-ink-400">Pull-Quote (15px Italic)</span>
          </div>

          {/* Body and Microcopy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block mb-1">
                Body Copy (13px / 1.45)
              </span>
              <p className="text-xs text-ink-600 leading-relaxed">
                Each pair passes through physical inspection verifying stitch count, SKU labels, UV signature, and outsole flexibility before entering the archive.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block mb-1">
                Archival Metadata Stamp (10px Mono / Tracking 0.18em)
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <span className="badge-archival bg-surface-subtle text-ink-700 border-surface-border">
                  SKU: DD1391-100
                </span>
                <span className="badge-archival bg-surface-subtle text-ink-700 border-surface-border">
                  INSP: #8492
                </span>
                <span className="badge-archival bg-surface-subtle text-ink-700 border-surface-border">
                  ORIGIN: TOKYO
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: BUTTONS & INTERACTIVE CONTROLS */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-surface-border pb-2">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              03 / Interactive Controls
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950">
              Refined Button States
            </h2>
          </div>
          <span className="text-2xs font-mono text-ink-400">Height: 36px standard</span>
        </div>

        <div className="border border-surface-border rounded-md bg-white p-5 space-y-4 shadow-fine">
          {/* Style Variants */}
          <div className="space-y-2">
            <span className="text-2xs font-mono uppercase tracking-wider text-ink-400 block">
              Style Variants
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="primary" icon={ArrowRight} iconPosition="right">
                Primary Black
              </Button>
              <Button variant="clay">
                Clay Accent
              </Button>
              <Button variant="secondary">
                Subtle Surface
              </Button>
              <Button variant="outline">
                Outline
              </Button>
              <Button variant="ghost">
                Ghost
              </Button>
              <Button variant="archival" icon={ShieldCheck}>
                Archival Stamp
              </Button>
            </div>
          </div>

          {/* Sizes and States */}
          <div className="pt-2 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm">
                Small (28px)
              </Button>
              <Button variant="primary" size="md">
                Standard (36px)
              </Button>
              <Button variant="primary" size="lg">
                Prominent (44px)
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="primary" isLoading>
                Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE BRAND PRIMITIVES */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-surface-border pb-2">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              04 / Core Features
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950">
              Condition Meter, Authenticity & Price Comparison
            </h2>
          </div>
          <span className="text-2xs font-mono text-ink-400">Trust & Transparency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Condition Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500">
                Condition Meter
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-ink-400">Score:</span>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.1"
                  value={demoConditionScore}
                  onChange={(e) => setDemoConditionScore(parseFloat(e.target.value))}
                  className="accent-ink-950 cursor-pointer w-16 h-1"
                />
              </div>
            </div>
            <ConditionMeter
              score={demoConditionScore}
              label={demoConditionScore >= 9.5 ? "Like New" : demoConditionScore >= 9.0 ? "Near Mint" : "Excellent"}
              subRatings={{
                sole: Math.max(6.0, demoConditionScore - 0.2),
                upper: demoConditionScore,
                interior: Math.max(6.0, demoConditionScore - 0.1),
              }}
            />
          </div>

          {/* 2. Authenticity Verified */}
          <div className="space-y-2">
            <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
              Authenticity Verified
            </span>
            <div className="p-3.5 rounded-md bg-white border border-surface-border shadow-fine space-y-2.5 flex flex-col justify-between h-[132px]">
              <div>
                <p className="text-2xs text-ink-500 mb-2">
                  Interactive trust badge with 4-point verification popover:
                </p>
                <AuthenticityBadge />
              </div>
              <span className="text-[10px] font-mono text-ink-400 block">
                Click badge to test inspection checklist
              </span>
            </div>
          </div>

          {/* 3. Price Comparison */}
          <div className="space-y-2">
            <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
              Price Comparison
            </span>
            <PriceComparison
              originalPrice={160}
              thriftPrice={85}
              className="h-[132px]"
            />
          </div>

        </div>
      </section>

      {/* SECTION 5: INPUTS & SURFACES */}
      <section className="space-y-4 pb-12">
        <div className="flex items-baseline justify-between border-b border-surface-border pb-2">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              05 / Inputs & Cards
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950">
              Form Controls & Surfaces
            </h2>
          </div>
          <span className="text-2xs font-mono text-ink-400">Tactile Micro-Feedback</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="p-4 rounded-md border border-surface-border bg-white space-y-3 shadow-fine">
            <Input
              label="Catalog Search"
              placeholder="e.g. Nike Dunk Low, Samba OG, RS-X..."
              icon={Search}
              value={inputSample}
              onChange={(e) => setInputSample(e.target.value)}
              helperText="Faceted query across brand, silhouette, and release year"
            />
            <Input
              label="Brand Size Conversion"
              placeholder="Enter usual Nike size (e.g. 10.5)"
            />
          </div>

          {/* Card Surfaces */}
          <div className="grid grid-cols-2 gap-3">
            <Card variant="surface" className="p-3.5 space-y-1.5">
              <span className="font-mono text-[9px] text-ink-400 uppercase tracking-archival block">Surface Standard</span>
              <p className="font-serif font-semibold text-ink-950 text-xs">Pristine White Card</p>
              <p className="text-2xs text-ink-500">1px crisp border for clean catalog items.</p>
            </Card>

            <Card variant="subtle" className="p-3.5 space-y-1.5">
              <span className="font-mono text-[9px] text-ink-400 uppercase tracking-archival block">Surface Subtle</span>
              <p className="font-serif font-semibold text-ink-950 text-xs">Light Grey Container</p>
              <p className="text-2xs text-ink-500">Subtle background for specifications.</p>
            </Card>

            <Card variant="archival" className="p-3.5 space-y-1.5 col-span-2">
              <span className="font-mono text-[9px] text-ink-400 uppercase tracking-archival block">Archival Blueprint</span>
              <p className="font-serif font-semibold text-ink-950 text-xs">Restoration Spec Card</p>
              <p className="text-2xs text-ink-500">Dashed border for physical inspection reports and consignor intake.</p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};
