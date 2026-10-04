import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw, Layers, ArrowUpRight, Zap, Camera, Compass, Bell } from 'lucide-react';
import { dbService } from '@/services/db';
import { SneakerCard, SneakerCardSkeleton } from '@/components/ui/SneakerCard';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/useUIStore';

export const HomePage = () => {
  const [trendingShoes, setTrendingShoes] = useState([]);
  const [limitedDeals, setLimitedDeals] = useState([]);
  const [sustainabilityStats, setSustainabilityStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const openVisualSearch = useUIStore((s) => s.openVisualSearch);
  const openQuiz = useUIStore((s) => s.openQuiz);
  const openDropAlert = useUIStore((s) => s.openDropAlert);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [trending, deals, stats] = await Promise.all([
          dbService.getTrendingShoes(),
          dbService.getLimitedDeals(),
          dbService.getSustainabilityMetrics(),
        ]);
        setTrendingShoes(trending.slice(0, 4));
        setLimitedDeals(deals.slice(0, 3));
        setSustainabilityStats(stats);
      } catch (err) {
        console.error("Failed to load home data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-16 bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-surface-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Editorial Manifesto & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-surface-subtle border border-surface-border">
                <span className="w-1.5 h-1.5 rounded-full bg-olive-600" />
                <span className="font-mono text-2xs uppercase tracking-archival text-ink-700">
                  Authenticated Sneaker Archive
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-ink-950 leading-[1.12]">
                  Rare Silhouettes Deserve a Second Life.
                </h1>
                <p className="text-ink-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  Pre-owned doesn't mean compromised. Every pair is physically authenticated in our lab, graded across sole, upper, and interior wear, and restored for mindful collectors.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  className="h-10 px-5 text-xs font-mono uppercase tracking-wider"
                >
                  <Link to="/shop">
                    <span>Explore Archive</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="md"
                  className="h-10 px-4 text-xs font-mono uppercase tracking-wider"
                >
                  <Link to="/sell-donate">
                    <span>Consign / Donate</span>
                  </Link>
                </Button>
              </div>

              {/* Trust Micro-Pillars */}
              <div className="pt-4 border-t border-surface-border/80 grid grid-cols-3 gap-4">
                <div>
                  <span className="font-mono text-xs font-bold text-ink-950 block">100%</span>
                  <span className="text-[11px] text-ink-500 font-sans">Lab Verified</span>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-ink-950 block">1-of-1</span>
                  <span className="text-[11px] text-ink-500 font-sans">Unique Inventory</span>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-ink-950 block">40–60%</span>
                  <span className="text-[11px] text-ink-500 font-sans">Below Retail</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Hero Pair Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative group p-4 rounded-md border border-surface-border bg-surface-muted/50 shadow-fine transition-all duration-300 hover:border-ink-400">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border text-2xs font-mono">
                  <span className="badge-archival bg-white text-ink-800 border-surface-border">
                    Featured Archive
                  </span>
                  <span className="text-olive-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Passed Lab Inspection
                  </span>
                </div>

                <Link to="/product/nike-dunk-low-panda" className="block my-4 overflow-hidden rounded-xs bg-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80"
                    alt="Nike Dunk Low Retro"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-2xs text-ink-500 uppercase tracking-archival">Nike Archive</span>
                    <span className="text-2xs font-mono text-ink-400">US 10.5</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-base font-bold text-ink-950">
                      Dunk Low Retro 'Black/White'
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-sm font-bold text-ink-950">$68</span>
                      <span className="text-2xs font-mono text-ink-400 line-through">$115</span>
                    </div>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-2xs font-mono text-ink-500">
                    <span>Condition: Near Mint (9.3/10)</span>
                    <span className="text-ink-950 font-medium group-hover:underline flex items-center gap-0.5">
                      View details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SUSTAINABILITY COUNTER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-md bg-surface-muted border border-surface-border grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1 space-y-1">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-500 block">
              Second Life Impact
            </span>
            <h2 className="font-serif text-lg font-bold text-ink-950 leading-tight">
              Giving Heritage Sneakers Longevity
            </h2>
            <p className="text-2xs text-ink-500">
              Every purchase keeps classic leather, rubber, and foam out of landfills.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-surface-border pt-4 md:pt-0 md:pl-6">
            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 block">
                {sustainabilityStats ? sustainabilityStats.pairsRescued.toLocaleString() : '1,482'}
              </span>
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Pairs Rescued
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-olive-700 block">
                {sustainabilityStats ? (sustainabilityStats.carbonDivertedKg / 1000).toFixed(1) + 'k' : '18.5k'} kg
              </span>
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                CO₂ Diverted
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 block">
                {sustainabilityStats ? (sustainabilityStats.waterSavedGallons / 1000).toFixed(0) + 'k' : '382k'} gal
              </span>
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Water Saved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING ARCHIVES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-surface-border pb-3">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              Curated Rotation
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-950">
              Trending Sneaker Archives
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-2xs font-mono uppercase tracking-wider text-ink-700 hover:text-ink-950 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <span>View All (15 Pairs)</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SneakerCardSkeleton key={i} />
            ))}
          </div>
        ) : trendingShoes.length === 0 ? (
          <div className="p-8 text-center text-xs text-ink-500 bg-surface-muted rounded-md border border-surface-border">
            No trending pairs right now. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingShoes.map((shoe) => (
              <SneakerCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        )}
      </section>

      {/* 3B. LIMITED-TIME VAULT FLASH DEALS */}
      {limitedDeals.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-xs bg-clay-600 text-white flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 fill-white" />
              </div>
              <div>
                <span className="text-2xs font-mono uppercase tracking-archival text-clay-700 block font-bold">
                  Curator Mark-Downs
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-950">
                  Limited-Time Vault Deals
                </h2>
              </div>
            </div>
            <Link
              to="/shop?deals=true"
              className="text-2xs font-mono uppercase tracking-wider text-clay-700 hover:text-clay-900 font-bold inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {limitedDeals.map((shoe) => (
              <SneakerCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </section>
      )}

      {/* 3C. DISCOVERY SUITE BANNER: QUIZ & VISUAL SEARCH */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card A: Shoe Finder Quiz */}
          <div className="p-6 rounded-md bg-white border border-surface-border shadow-fine flex flex-col justify-between space-y-4 hover:border-ink-900 transition-colors">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xs bg-olive-50 border border-olive-200 text-olive-700 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
                60-Second Recommendation
              </span>
              <h3 className="font-serif text-xl font-bold text-ink-950">
                Shoe Finder Matrix
              </h3>
              <p className="text-2xs text-ink-600 font-mono leading-relaxed">
                Not sure which silhouette fits your daily rotation? Answer 5 quick questions on purpose, style, size, and palette to get matched with 1-of-1 archive inventory.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="sm"
                onClick={openQuiz}
                className="text-2xs font-mono uppercase tracking-wider"
              >
                <span>Launch Quiz</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
              <Link
                to="/quiz"
                className="text-2xs font-mono text-ink-600 hover:text-ink-950 underline"
              >
                Direct Link
              </Link>
            </div>
          </div>

          {/* Card B: Visual Shoe Search */}
          <div className="p-6 rounded-md bg-white border border-surface-border shadow-fine flex flex-col justify-between space-y-4 hover:border-ink-900 transition-colors">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xs bg-clay-50 border border-clay-200 text-clay-700 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
                Multimodal AI Image Search
              </span>
              <h3 className="font-serif text-xl font-bold text-ink-950">
                Visual Shoe Finder
              </h3>
              <p className="text-2xs text-ink-600 font-mono leading-relaxed">
                Saw a pair on Instagram or on the street? Upload any photo to extract its silhouette vector and search our authenticated archive for visual matches.
              </p>
            </div>

            <div className="pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={openVisualSearch}
                className="text-2xs font-mono uppercase tracking-wider border-ink-800 text-ink-900 hover:bg-ink-950 hover:text-white"
              >
                <Camera className="w-3 h-3 mr-1.5" />
                <span>Upload Sneaker Photo</span>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BRAND ARCHIVE ENTRY POINTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="border-b border-surface-border pb-2">
          <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
            By Heritage
          </span>
          <h2 className="font-serif text-xl font-bold text-ink-950">
            Curated Brand Archives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nike Entry */}
          <Link
            to="/shop?brand=Nike"
            className="group relative p-6 rounded-md border border-surface-border bg-white hover:border-ink-900 transition-all shadow-fine flex flex-col justify-between h-48"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">Archive 01</span>
                <h3 className="font-serif text-lg font-bold text-ink-950 group-hover:text-ink-700 transition-colors">
                  Nike Vault
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-ink-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-2xs text-ink-500 mb-2">
                Dunk Lows, Air Max 1 OGs, Blazers & Air Force 1 classics.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-900 font-semibold underline">
                Browse Nike Pairs →
              </span>
            </div>
          </Link>

          {/* Adidas Entry */}
          <Link
            to="/shop?brand=Adidas"
            className="group relative p-6 rounded-md border border-surface-border bg-white hover:border-ink-900 transition-all shadow-fine flex flex-col justify-between h-48"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">Archive 02</span>
                <h3 className="font-serif text-lg font-bold text-ink-950 group-hover:text-ink-700 transition-colors">
                  Adidas Terrace & OG
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-ink-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-2xs text-ink-500 mb-2">
                Sambas, Gazelles, Stan Smiths, and 1980s Superstars.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-900 font-semibold underline">
                Browse Adidas Pairs →
              </span>
            </div>
          </Link>

          {/* Puma Entry */}
          <Link
            to="/shop?brand=Puma"
            className="group relative p-6 rounded-md border border-surface-border bg-white hover:border-ink-900 transition-all shadow-fine flex flex-col justify-between h-48"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">Archive 03</span>
                <h3 className="font-serif text-lg font-bold text-ink-950 group-hover:text-ink-700 transition-colors">
                  Puma Heritage
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-ink-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-2xs text-ink-500 mb-2">
                Suede Classic XXIs, Palermos, and Clyde retros.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-900 font-semibold underline">
                Browse Puma Pairs →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. DROP ALERTS CALLOUT BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-lg bg-surface-subtle border border-surface-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-clay-600 animate-pulse" />
              <span className="font-mono text-2xs uppercase tracking-archival text-clay-700 font-bold">
                Archival Drops Ledger
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
              Never Miss a Curated 1-of-1 Drop
            </h3>
            <p className="text-2xs text-ink-600 font-mono leading-relaxed">
              Rare Nike Dunks, Adidas Sambas, and Puma classics sell out fast. Subscribe by your exact brand, style, and size preferences to be notified immediately upon lab intake.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => openDropAlert()}
              className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider"
            >
              <Bell className="w-3.5 h-3.5 mr-2" />
              <span>Configure Drop Alerts</span>
            </Button>
            <Button
              asChild
              variant="outline"
              size="md"
              className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider border-surface-border bg-white"
            >
              <Link to="/drop-alerts">
                <span>View Alert Ledger</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
