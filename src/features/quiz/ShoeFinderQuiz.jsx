import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Compass, 
  ShoppingBag, 
  Ruler, 
  DollarSign, 
  Palette, 
  Zap,
  HelpCircle
} from 'lucide-react';
import { MOCK_SHOES } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const ShoeFinderQuiz = ({ onComplete, className }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Quiz Answers State
  const [answers, setAnswers] = useState({
    purpose: '',
    style: '',
    size: '10.5',
    color: '',
    budget: '',
  });

  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useUIStore((s) => s.openCart);

  // STEP 1: PURPOSE OPTIONS
  const PURPOSE_OPTIONS = [
    { id: 'everyday', title: 'Everyday Daily Rotation', desc: 'Versatile, resilient, timeless pair you reach for every morning' },
    { id: 'smart-casual', title: 'Smart Casual / Office', desc: 'Understated leather, minimal branding, pairs cleanly with trousers' },
    { id: 'streetwear', title: 'Streetwear & Archive Statement', desc: 'Cult classics with deep sneaker culture credibility' },
    { id: 'walking', title: 'Active Walking & Travel', desc: 'Lightweight cushioning, all-day arch comfort, breathable' },
    { id: 'vault', title: 'Collector Vault / Grail', desc: 'Rare retro iterations, distinctive colorway, investment-grade' },
  ];

  // STEP 2: STYLE OPTIONS
  const STYLE_OPTIONS = [
    { id: 'terrace', title: 'Heritage Terrace & Gum Sole', desc: 'Low-profile retro suede with amber gum traction (Samba, Gazelle, Palermo)' },
    { id: 'streetwear', title: 'Streetwear & Court Classics', desc: 'Iconic low-top basketball silhouettes (Dunk Low, Forum)' },
    { id: 'runner', title: 'Vintage Runner & Air Tech', desc: 'Visible cushioning units, 90s-2000s mesh panelling (Air Max 1)' },
    { id: 'minimalist', title: 'Minimalist Monochrome', desc: 'Clean black/white two-tone leather without loud graphics' },
  ];

  // STEP 3: SIZES
  const SIZE_OPTIONS = ['7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '13.0'];

  // STEP 4: COLOR PALETTES
  const COLOR_OPTIONS = [
    { id: 'monochrome', title: 'Monochrome', desc: 'Pure white, core black, or muted grey palette' },
    { id: 'earth', title: 'Earth & Neutral Tones', desc: 'Warm sand, cream, olive green, tobacco brown' },
    { id: 'heritage', title: 'Heritage Color Pops', desc: 'University red, collegiate royal blue, retro gold' },
    { id: 'any', title: 'Open to Any Curated Color', desc: 'Surprise me with best condition and silhouette fit' },
  ];

  // STEP 5: BUDGET TIERS
  const BUDGET_OPTIONS = [
    { id: 'under65', title: 'Under $65', desc: 'Maximum thrift savings, high everyday value' },
    { id: 'sweetspot', title: '$65 – $85', desc: 'Prime condition tier, Near Mint 9.0+ classics' },
    { id: 'collector', title: '$85+', desc: 'Rare vault releases, 1-of-1 archive grails' },
    { id: 'any', title: 'Flexible / Any Price', desc: 'Focus strictly on best aesthetic match' },
  ];

  // SCORING ENGINE: Match answers against catalog
  const matchedShoes = useMemo(() => {
    if (step <= totalSteps) return [];

    const scored = MOCK_SHOES.map((shoe) => {
      let score = 50; // base score

      // Style score
      if (answers.style === 'terrace' && (shoe.silhouette === 'Samba' || shoe.silhouette === 'Gazelle' || shoe.silhouette === 'Palermo')) {
        score += 30;
      } else if (answers.style === 'runner' && shoe.style === 'Runner') {
        score += 30;
      } else if (answers.style === 'streetwear' && shoe.style === 'Streetwear') {
        score += 30;
      } else if (answers.style === 'minimalist' && (shoe.primaryColor === 'Black' || shoe.primaryColor === 'White')) {
        score += 25;
      }

      // Size score
      const userSize = parseFloat(answers.size);
      const shoeSize = shoe.sizing.usSize;
      const sizeDiff = Math.abs(userSize - shoeSize);
      if (sizeDiff === 0) {
        score += 35;
      } else if (sizeDiff <= 0.5) {
        score += 20;
      } else if (sizeDiff <= 1.0) {
        score += 5;
      }

      // Color score
      if (answers.color === 'monochrome' && (shoe.primaryColor === 'Black' || shoe.primaryColor === 'White')) {
        score += 20;
      } else if (answers.color === 'earth' && (shoe.primaryColor === 'Green' || shoe.primaryColor === 'Sand' || shoe.colorway.toLowerCase().includes('gum'))) {
        score += 20;
      } else if (answers.color === 'heritage' && (shoe.primaryColor === 'Red' || shoe.primaryColor === 'Blue')) {
        score += 20;
      } else if (answers.color === 'any') {
        score += 15;
      }

      // Budget score
      const price = shoe.pricing.thriftPrice;
      if (answers.budget === 'under65' && price < 65) score += 20;
      else if (answers.budget === 'sweetspot' && price >= 65 && price <= 85) score += 20;
      else if (answers.budget === 'collector' && price > 85) score += 20;
      else if (answers.budget === 'any') score += 15;

      // Condition bonus
      score += Math.round(shoe.condition.score);

      // Clamp between 70% and 99%
      const matchPct = Math.min(99, Math.max(72, Math.round((score / 140) * 100)));

      return {
        ...shoe,
        matchPct,
      };
    });

    return scored.sort((a, b) => b.matchPct - a.matchPct).slice(0, 3);
  }, [answers, step]);

  const handleNext = () => {
    if (step <= totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setAnswers({
      purpose: '',
      style: '',
      size: '10.5',
      color: '',
      budget: '',
    });
  };

  return (
    <div className={cn("p-6 sm:p-8 rounded-lg bg-white border border-surface-border shadow-fine max-w-2xl mx-auto space-y-6", className)}>
      
      {/* Top Progress Header */}
      <div className="space-y-3 border-b border-surface-border pb-4">
        <div className="flex items-center justify-between text-2xs font-mono">
          <div className="flex items-center gap-1.5 text-olive-700 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span className="uppercase tracking-archival">Curator Fit Matrix</span>
          </div>
          <span className="text-ink-400 font-mono">
            {step <= totalSteps ? `Step ${step} of ${totalSteps}` : 'Curated Matches Ready'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-subtle h-1 rounded-pill overflow-hidden">
          <div
            className="h-full bg-ink-950 rounded-pill transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, (step / totalSteps) * 100)}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: PURPOSE */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-ink-950">
              What primary role will this pair serve in your life?
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              Helps us balance sole resilience against archival rarity
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {PURPOSE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, purpose: opt.id });
                  handleNext();
                }}
                className={cn(
                  "w-full p-3 rounded-md border text-left transition-all flex items-center justify-between",
                  answers.purpose === opt.id
                    ? "border-ink-950 bg-surface-subtle shadow-fine ring-1 ring-ink-950"
                    : "border-surface-border hover:border-ink-400 bg-white"
                )}
              >
                <div className="space-y-0.5 pr-4">
                  <span className="font-serif text-sm font-semibold text-ink-950 block">
                    {opt.title}
                  </span>
                  <span className="text-2xs text-ink-500 block leading-snug">
                    {opt.desc}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: STYLE */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-ink-950">
              Which footwear aesthetic matches your wardrobe?
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              Filters our archive silhouettes to your personal silhouette language
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, style: opt.id });
                  handleNext();
                }}
                className={cn(
                  "w-full p-3 rounded-md border text-left transition-all flex items-center justify-between",
                  answers.style === opt.id
                    ? "border-ink-950 bg-surface-subtle shadow-fine ring-1 ring-ink-950"
                    : "border-surface-border hover:border-ink-400 bg-white"
                )}
              >
                <div className="space-y-0.5 pr-4">
                  <span className="font-serif text-sm font-semibold text-ink-950 block">
                    {opt.title}
                  </span>
                  <span className="text-2xs text-ink-500 block leading-snug">
                    {opt.desc}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: SIZE */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-ink-950">
              Select your primary sneaker size (US Men / Unisex):
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              We cross-reference against 1-of-1 archive inventory
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setAnswers({ ...answers, size: s })}
                className={cn(
                  "py-2.5 rounded-sm border text-xs font-mono font-bold transition-all text-center",
                  answers.size === s
                    ? "bg-ink-950 text-white border-ink-950 shadow-fine"
                    : "bg-surface-subtle hover:bg-white border-surface-border text-ink-800"
                )}
              >
                US {s}
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="outline" size="sm" onClick={handlePrev} className="text-2xs font-mono">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={handleNext} className="text-2xs font-mono uppercase">
              Next: Palette
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: COLOR PALETTE */}
      {/* ========================================================================= */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-ink-950">
              What color spectrum are you drawn to?
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              Matches your everyday denim, canvas, and trouser tones
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, color: opt.id });
                  handleNext();
                }}
                className={cn(
                  "w-full p-3 rounded-md border text-left transition-all flex items-center justify-between",
                  answers.color === opt.id
                    ? "border-ink-950 bg-surface-subtle shadow-fine ring-1 ring-ink-950"
                    : "border-surface-border hover:border-ink-400 bg-white"
                )}
              >
                <div className="space-y-0.5 pr-4">
                  <span className="font-serif text-sm font-semibold text-ink-950 block">
                    {opt.title}
                  </span>
                  <span className="text-2xs text-ink-500 block leading-snug">
                    {opt.desc}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: BUDGET */}
      {/* ========================================================================= */}
      {step === 5 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-ink-950">
              What is your target investment for this pair?
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              All pairs are 100% authenticated and cleaned regardless of price tier
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, budget: opt.id });
                  handleNext();
                }}
                className={cn(
                  "w-full p-3 rounded-md border text-left transition-all flex items-center justify-between",
                  answers.budget === opt.id
                    ? "border-ink-950 bg-surface-subtle shadow-fine ring-1 ring-ink-950"
                    : "border-surface-border hover:border-ink-400 bg-white"
                )}
              >
                <div className="space-y-0.5 pr-4">
                  <span className="font-serif text-sm font-semibold text-ink-950 block">
                    {opt.title}
                  </span>
                  <span className="text-2xs text-ink-500 block leading-snug">
                    {opt.desc}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: MATCHED RESULTS SHOWCASE */}
      {/* ========================================================================= */}
      {step > totalSteps && (
        <div className="space-y-6 animate-in fade-in">
          <div className="text-center space-y-1.5 pb-2">
            <div className="w-10 h-10 rounded-full bg-olive-50 border border-olive-200 text-olive-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink-950">
              Your Curated Archive Matches
            </h3>
            <p className="text-2xs text-ink-500 font-mono">
              Based on US {answers.size} • {answers.style} style • {answers.color} tones
            </p>
          </div>

          {/* 3 Matched Shoe Cards */}
          <div className="space-y-3.5">
            {matchedShoes.map((shoe, idx) => (
              <div
                key={shoe.id}
                className="p-4 rounded-md border border-surface-border hover:border-ink-950 bg-white shadow-fine transition-all flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={shoe.images[0]}
                  alt={shoe.name}
                  className="w-24 h-24 rounded-xs object-cover border border-surface-border bg-surface-subtle shrink-0"
                />

                <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="badge-archival bg-olive-50 text-olive-700 border-olive-200 font-mono text-[9px] font-bold">
                      {shoe.matchPct}% Curated Match
                    </span>
                    <span className="text-[10px] font-mono text-ink-400">
                      Condition: {shoe.condition.score} ({shoe.condition.label})
                    </span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-ink-950 truncate">
                    {shoe.name}
                  </h4>

                  <p className="text-2xs text-ink-500 font-mono">
                    US {shoe.sizing.usSize} • {shoe.colorway} • Era {shoe.releaseYear}
                  </p>

                  <div className="flex items-baseline justify-center sm:justify-start gap-2 pt-0.5">
                    <span className="font-serif text-base font-bold text-ink-950">
                      ${shoe.pricing.thriftPrice}
                    </span>
                    <span className="text-2xs font-mono text-ink-400 line-through">
                      ${shoe.pricing.originalRetail}
                    </span>
                    <span className="text-[10px] font-mono text-clay-700 font-semibold">
                      Save ${shoe.pricing.originalRetail - shoe.pricing.thriftPrice}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="text-2xs font-mono uppercase tracking-wider justify-center"
                  >
                    <Link to={`/product/${shoe.id}`} onClick={onComplete}>
                      Inspect Pair
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addToCart(shoe, shoe.sizing.usSize);
                      openCart();
                    }}
                    className="text-2xs font-mono uppercase tracking-wider justify-center"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Bag Pair
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-surface-border text-2xs font-mono">
            <button
              type="button"
              onClick={handleRestart}
              className="text-ink-600 hover:text-ink-950 flex items-center gap-1 underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retake Finder Quiz</span>
            </button>

            <Link
              to="/shop"
              onClick={onComplete}
              className="inline-flex items-center gap-1 text-ink-900 font-semibold hover:text-clay-600"
            >
              <span>Explore All 15 Archive Pairs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Back button for steps 2-5 */}
      {step > 1 && step <= totalSteps && (
        <div className="pt-2 flex justify-start">
          <Button variant="ghost" size="sm" onClick={handlePrev} className="text-2xs font-mono text-ink-500">
            <ArrowLeft className="w-3 h-3 mr-1" />
            Previous Question
          </Button>
        </div>
      )}

    </div>
  );
};
