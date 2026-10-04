import React, { useState, useEffect } from 'react';
import { Timer, Zap, Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Custom hook to calculate remaining time against a target expiration timestamp.
 * Ticks precisely every 1,000ms.
 */
export function useCountdown(targetDate) {
  const calculateRemaining = () => {
    if (!targetDate) return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) {
      return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { totalMs: diff, days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemaining);

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

/**
 * Compact countdown chip for SneakerCard and thumbnail overlays
 */
export const SneakerCardCountdown = ({ targetDate, className }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (!targetDate || isExpired) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-clay-700/90 backdrop-blur-sm text-white font-mono text-[9px] font-semibold tracking-wider shadow-fine",
        className
      )}
      title="Limited-time archive deal"
    >
      <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300 shrink-0 animate-pulse" />
      <span>
        {days > 0 ? `${days}d ` : ''}
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    </div>
  );
};

/**
 * Editorial Banner Countdown for Product Detail Page
 */
export const ProductDetailDealBanner = ({ targetDate, savingsAmount = 15, className }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (!targetDate || isExpired) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={cn("p-3 rounded-md bg-clay-50 border border-clay-200 text-clay-900 shadow-fine space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-xs bg-clay-600 text-white flex items-center justify-center">
            <Zap className="w-3 h-3 fill-white" />
          </div>
          <span className="font-mono text-2xs uppercase tracking-archival font-bold text-clay-800">
            Vault Flash Deal Active
          </span>
        </div>
        <span className="px-1.5 py-0.2 rounded-xs bg-clay-200/80 text-clay-900 font-mono text-[9px] font-bold">
          LIMITED ARCHIVE
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 pt-0.5">
        <span className="text-2xs text-clay-700 font-sans">
          Curator mark-down ends in:
        </span>

        {/* Digit Tiles */}
        <div className="flex items-center gap-1 font-mono text-xs font-bold text-clay-950">
          {days > 0 && (
            <>
              <span className="px-1.5 py-0.5 rounded-xs bg-white border border-clay-200">{pad(days)}d</span>
              <span>:</span>
            </>
          )}
          <span className="px-1.5 py-0.5 rounded-xs bg-white border border-clay-200">{pad(hours)}h</span>
          <span>:</span>
          <span className="px-1.5 py-0.5 rounded-xs bg-white border border-clay-200">{pad(minutes)}m</span>
          <span>:</span>
          <span className="px-1.5 py-0.5 rounded-xs bg-white border border-clay-200 text-clay-700">{pad(seconds)}s</span>
        </div>
      </div>
    </div>
  );
};
