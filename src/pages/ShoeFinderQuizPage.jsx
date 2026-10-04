import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { ShoeFinderQuiz } from '@/features/quiz/ShoeFinderQuiz';

export const ShoeFinderQuizPage = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-2xs font-mono text-ink-400">
          <Link to="/" className="hover:text-ink-950 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink-800 font-medium">Shoe Finder Matrix</span>
        </nav>

        {/* Hero Introduction */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-olive-50 border border-olive-200 text-olive-700 text-2xs font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curatorial Algorithmic Matcher</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-950">
            Find Your Archive Silhouette
          </h1>
          <p className="text-2xs text-ink-500 font-mono leading-relaxed">
            Answer 5 brief questions regarding your wardrobe purpose, sizing, and color preferences. Our curatorial matrix matches your profile against 1-of-1 authenticated pairs in our vault.
          </p>
        </div>

        {/* Embedded Quiz Container */}
        <ShoeFinderQuiz />

        {/* Trust Seal */}
        <div className="text-center pt-4 text-[11px] font-mono text-ink-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-olive-600" />
          <span>Every recommended sneaker is physically authenticated, sanitized, and stored in our climate vault.</span>
        </div>

      </div>
    </div>
  );
};
