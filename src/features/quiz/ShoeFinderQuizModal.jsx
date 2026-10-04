import React from 'react';
import { X, Compass } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { ShoeFinderQuiz } from './ShoeFinderQuiz';

export const ShoeFinderQuizModal = () => {
  const isOpen = useUIStore((s) => s.isShoeFinderQuizOpen);
  const onClose = useUIStore((s) => s.closeQuiz);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-surface-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-xs bg-olive-700 text-white flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif text-sm font-bold text-ink-950">
              RE/SOLE Archive Shoe Finder
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm text-ink-400 hover:text-ink-950 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Quiz Container */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <ShoeFinderQuiz onComplete={onClose} />
        </div>

      </div>
    </div>
  );
};
