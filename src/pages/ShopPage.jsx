import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RotateCcw, Zap } from 'lucide-react';
import { dbService } from '@/services/db';
import { SneakerCard, SneakerCardSkeleton } from '@/components/ui/SneakerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allShoes, setAllShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [maxPrice, setMaxPrice] = useState(160);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'condition'
  const [onlyDeals, setOnlyDeals] = useState(searchParams.get('deals') === 'true');

  // Sync with URL params
  useEffect(() => {
    const urlBrand = searchParams.get('brand');
    if (urlBrand) setSelectedBrand(urlBrand);
  }, [searchParams]);

  // Load Inventory
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        const data = await dbService.getShoes();
        setAllShoes(data);
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  // Filter & Sort Logic
  const filteredShoes = useMemo(() => {
    return allShoes
      .filter((shoe) => {
        // Brand filter
        if (selectedBrand !== 'All' && shoe.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
        // Condition filter
        if (selectedCondition !== 'All' && shoe.condition.label.toLowerCase() !== selectedCondition.toLowerCase()) {
          return false;
        }
        // Style filter
        if (selectedStyle !== 'All' && !shoe.style.toLowerCase().includes(selectedStyle.toLowerCase())) {
          return false;
        }
        // Color filter
        if (selectedColor !== 'All' && !shoe.primaryColor.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }
        // Size filter
        if (selectedSize !== 'All' && shoe.sizing.usSize.toString() !== selectedSize.replace('US ', '')) {
          return false;
        }
        // Price filter
        if (shoe.pricing.thriftPrice > maxPrice) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            shoe.name.toLowerCase().includes(q) ||
            shoe.silhouette.toLowerCase().includes(q) ||
            shoe.brand.toLowerCase().includes(q) ||
            shoe.colorway.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Only Deals filter
        if (onlyDeals && !shoe.dealEndsAt) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricing.thriftPrice - b.pricing.thriftPrice;
        if (sortBy === 'price-high') return b.pricing.thriftPrice - a.pricing.thriftPrice;
        if (sortBy === 'condition') return b.condition.score - a.condition.score;
        return (b.viewsCount || 0) - (a.viewsCount || 0); // default 'featured'
      });
  }, [allShoes, selectedBrand, selectedCondition, selectedStyle, selectedColor, selectedSize, maxPrice, searchQuery, sortBy, onlyDeals]);

  const handleResetFilters = () => {
    setSelectedBrand('All');
    setSelectedCondition('All');
    setSelectedStyle('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMaxPrice(160);
    setSearchQuery('');
    setOnlyDeals(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedBrand !== 'All' ||
    selectedCondition !== 'All' ||
    selectedStyle !== 'All' ||
    selectedColor !== 'All' ||
    selectedSize !== 'All' ||
    maxPrice < 160 ||
    onlyDeals ||
    Boolean(searchQuery);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header Breadcrumb & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-2xs font-mono text-ink-400 mb-1">
              <span>Archive</span>
              <span>/</span>
              <span className="uppercase text-ink-800">{selectedBrand === 'All' ? 'All Silhouettes' : selectedBrand}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
              Curated Footwear Catalog
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Vault Deals Toggle */}
            <button
              type="button"
              onClick={() => setOnlyDeals(!onlyDeals)}
              className={cn(
                "h-8 px-2.5 rounded-sm border text-2xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-fine",
                onlyDeals
                  ? "bg-clay-600 text-white border-clay-600 font-bold"
                  : "bg-white text-ink-700 border-surface-border hover:border-ink-400"
              )}
            >
              <Zap className={cn("w-3 h-3", onlyDeals ? "text-amber-300 fill-amber-300" : "text-clay-600")} />
              <span>Vault Deals</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-surface-border rounded-sm px-2.5 h-8 text-2xs font-mono text-ink-800 shadow-fine">
              <ArrowUpDown className="w-3 h-3 text-ink-400" />
              <label htmlFor="sort-by-select" className="sr-only">Sort by</label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="condition">Condition: Highest First</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden h-8 text-2xs gap-1.5"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </Button>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block space-y-6 sticky top-20 border border-surface-border rounded-md p-4 bg-white shadow-fine">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="font-mono text-2xs uppercase tracking-archival font-semibold text-ink-900 flex items-center gap-1.5">
                <Filter className="w-3 h-3" />
                Faceted Filters
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[10px] font-mono text-clay-600 hover:text-clay-700 underline font-medium"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Model Search
              </span>
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-ink-400" />
                <input
                  type="text"
                  placeholder="Dunk, Samba, Suede..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 pl-7 pr-2.5 text-xs rounded-sm border border-surface-border bg-surface-subtle/50 focus:bg-white focus:outline-none focus:border-ink-900 transition-colors"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Brand
              </span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Nike', 'Adidas', 'Puma'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={cn(
                      "px-2.5 py-1 text-2xs font-mono rounded-xs border transition-colors",
                      selectedBrand.toLowerCase() === b.toLowerCase()
                        ? "bg-ink-950 border-ink-950 text-white font-medium"
                        : "bg-surface-subtle/70 border-surface-border text-ink-700 hover:border-ink-400"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Condition Standard
              </span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Like New', 'Near Mint', 'Excellent'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCondition(c)}
                    className={cn(
                      "px-2 py-0.5 text-2xs font-mono rounded-xs border transition-colors",
                      selectedCondition.toLowerCase() === c.toLowerCase()
                        ? "bg-ink-950 border-ink-950 text-white font-medium"
                        : "bg-surface-subtle/70 border-surface-border text-ink-700 hover:border-ink-400"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                US Size
              </span>
              <div className="grid grid-cols-4 gap-1">
                {['All', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s === 'All' ? 'All' : `US ${s}`)}
                    className={cn(
                      "py-1 text-2xs font-mono rounded-xs border text-center transition-colors",
                      selectedSize === (s === 'All' ? 'All' : `US ${s}`)
                        ? "bg-ink-950 border-ink-950 text-white font-medium"
                        : "bg-surface-subtle/70 border-surface-border text-ink-700 hover:border-ink-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-1.5">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-500 block">
                Primary Color
              </span>
              <div className="flex flex-wrap gap-1">
                {['All', 'White', 'Black', 'Blue', 'Beige', 'Red', 'Green'].map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={cn(
                      "px-2 py-0.5 text-2xs font-mono rounded-xs border transition-colors",
                      selectedColor.toLowerCase() === col.toLowerCase()
                        ? "bg-ink-950 border-ink-950 text-white font-medium"
                        : "bg-surface-subtle/70 border-surface-border text-ink-700 hover:border-ink-400"
                    )}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-1.5 pt-2 border-t border-surface-border">
              <div className="flex justify-between items-baseline text-2xs font-mono">
                <span className="uppercase text-ink-500">Max Thrift Price</span>
                <span className="font-bold text-ink-950">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-ink-950 cursor-pointer h-1 bg-surface-subtle"
              />
              <div className="flex justify-between text-[10px] font-mono text-ink-400">
                <span>$40</span>
                <span>$160</span>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID */}
          <main className="lg:col-span-3 space-y-4">
            
            {/* Active Filter Chips & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-2xs font-mono text-ink-500">
              <div className="flex items-center gap-2">
                <span>Showing {filteredShoes.length} curated archive pairs</span>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedBrand !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-surface-subtle border border-surface-border text-ink-900 text-2xs">
                      Brand: {selectedBrand}
                      <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedBrand('All')} />
                    </span>
                  )}
                  {selectedCondition !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-surface-subtle border border-surface-border text-ink-900 text-2xs">
                      {selectedCondition}
                      <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedCondition('All')} />
                    </span>
                  )}
                  {selectedSize !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-surface-subtle border border-surface-border text-ink-900 text-2xs">
                      {selectedSize}
                      <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedSize('All')} />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-surface-subtle border border-surface-border text-ink-900 text-2xs">
                      "{searchQuery}"
                      <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSearchQuery('')} />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Grid / Loading / Empty States */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SneakerCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredShoes.length === 0 ? (
              /* REAL EMPTY STATE */
              <div className="py-16 px-4 rounded-md border border-dashed border-surface-border bg-surface-muted text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-white border border-surface-border flex items-center justify-center mx-auto text-ink-400">
                  <Search className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-base font-semibold text-ink-950">
                  No Sneakers Match Your Criteria
                </h3>
                <p className="text-2xs text-ink-500 max-w-sm mx-auto leading-relaxed">
                  Try broadening your price range, clearing specific sizes, or resetting the filter combination.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="mt-2 text-2xs gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredShoes.map((shoe) => (
                  <SneakerCard key={shoe.id} shoe={shoe} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-5 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <h3 className="font-serif text-sm font-bold text-ink-950">Faceted Filters</h3>
                <button type="button" onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-4 h-4 text-ink-500" />
                </button>
              </div>

              {/* Brand */}
              <div className="space-y-1.5">
                <span className="text-2xs font-mono uppercase text-ink-500 block">Brand</span>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Nike', 'Adidas', 'Puma'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBrand(b)}
                      className={cn(
                        "px-2.5 py-1 text-2xs font-mono rounded-xs border",
                        selectedBrand.toLowerCase() === b.toLowerCase()
                          ? "bg-ink-950 text-white"
                          : "bg-surface-subtle text-ink-700"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-1.5">
                <span className="text-2xs font-mono uppercase text-ink-500 block">Condition</span>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Like New', 'Near Mint', 'Excellent'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCondition(c)}
                      className={cn(
                        "px-2 py-0.5 text-2xs font-mono rounded-xs border",
                        selectedCondition.toLowerCase() === c.toLowerCase()
                          ? "bg-ink-950 text-white"
                          : "bg-surface-subtle text-ink-700"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full h-9 text-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Apply ({filteredShoes.length} Pairs)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
