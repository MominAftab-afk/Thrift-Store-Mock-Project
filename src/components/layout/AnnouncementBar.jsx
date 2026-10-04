import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const AnnouncementBar = () => {
  const openQuiz = useUIStore((s) => s.openQuiz);

  return (
    <aside aria-label="Announcement" className="bg-ink-950 text-white text-[11px] py-1.5 px-4 border-b border-ink-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-clay-500 animate-pulse" />
          <span className="font-mono text-2xs tracking-archival text-ink-300 uppercase">
            Curated Drop #04 Active
          </span>
          <span className="hidden sm:inline text-ink-600">•</span>
          <span className="hidden sm:inline text-ink-400 text-2xs">
            1,482 pairs given a second life
          </span>
        </div>

        <button
          type="button"
          onClick={openQuiz}
          className="group inline-flex items-center gap-1 text-ink-300 hover:text-white font-mono text-2xs transition-colors"
        >
          <Sparkles className="w-3 h-3 text-clay-400" />
          <span>Shoe Finder Quiz</span>
          <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
};
