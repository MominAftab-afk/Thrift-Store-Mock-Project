import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { dbService } from '@/services/db';
import { SneakerCard } from '@/components/ui/SneakerCard';
import { Button } from '@/components/ui/button';

export const WishlistPage = () => {
  const savedIds = useWishlistStore((s) => s.savedIds);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);

  const [savedShoes, setSavedShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      try {
        setLoading(true);
        const all = await dbService.getShoes();
        const matches = all.filter((s) => savedIds.includes(s.id));
        setSavedShoes(matches);
      } catch (err) {
        console.error("Wishlist load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, [savedIds]);

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
              Personal Vault
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
              Saved Sneaker Archives ({savedIds.length})
            </h1>
          </div>

          {savedIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearWishlist}
              className="text-2xs font-mono text-ink-500 hover:text-red-600 gap-1.5 h-8"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Saved Pairs</span>
            </Button>
          )}
        </div>

        {/* Content */}
        {savedIds.length === 0 ? (
          <div className="py-24 text-center max-w-sm mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center mx-auto text-ink-400">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-ink-950">
              Your Wishlist is Empty
            </h3>
            <p className="text-2xs text-ink-500 leading-relaxed">
              Click the heart icon on any pair in our catalog to save it for quick reference before it's collected.
            </p>
            <Button asChild variant="primary" size="md" className="mt-2 text-xs">
              <Link to="/shop">
                <span>Browse Footwear Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedShoes.map((shoe) => (
              <SneakerCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
