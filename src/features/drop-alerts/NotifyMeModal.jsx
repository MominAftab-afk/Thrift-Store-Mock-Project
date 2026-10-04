import React, { useState } from 'react';
import { Bell, Check, X, Mail, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dbService } from '@/services/db';
import { cn } from '@/lib/utils';

export const NotifyMeModal = ({
  shoe,
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifySimilar, setNotifySimilar] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubmitting(true);
      await dbService.subscribeDropAlert(email, {
        phone,
        shoeId: shoe?.id,
        shoeName: shoe?.name,
        size: shoe?.sizing?.usSize,
        brand: shoe?.brand,
        notifySimilar,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to subscribe drop alert:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-surface-border rounded-lg shadow-lift p-6 space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-sm text-ink-400 hover:text-ink-950 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-clay-50 border border-clay-200 flex items-center justify-center text-clay-700 shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block font-semibold">
              Archival Drop Ledger
            </span>
            <h3 className="font-serif text-lg font-bold text-ink-950 leading-tight">
              Notify Me When Available
            </h3>
            <p className="text-2xs text-ink-500 mt-0.5">
              1-of-1 sneakers move quickly. Get priority notice when this pair or an identical size is acquired.
            </p>
          </div>
        </div>

        {/* Shoe Snapshot Pill */}
        <div className="p-3 rounded-md bg-surface-muted border border-surface-border flex items-center gap-3">
          <img
            src={shoe.images[0]}
            alt={shoe.name}
            className="w-12 h-12 rounded-xs object-cover border border-surface-border bg-white shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-xs text-ink-950 truncate">
              {shoe.name}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-mono text-ink-500 mt-0.5">
              <span>Size: US {shoe.sizing?.usSize}</span>
              <span>•</span>
              <span>SKU: {shoe.sku}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        {success ? (
          <div className="p-4 rounded-md bg-olive-50 border border-olive-200 text-center space-y-2 animate-in fade-in">
            <div className="w-8 h-8 rounded-full bg-olive-600 text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-olive-900">
              Added to Priority Ledger
            </h4>
            <p className="text-2xs text-olive-700">
              We'll message you via email {phone ? 'and WhatsApp' : ''} the moment a matching pair enters our restoration studio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-2xs font-mono text-ink-600 block">
                Email Address <span className="text-clay-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="collector@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs pl-8 pr-3 py-2 text-ink-950 focus:outline-none focus:ring-1 focus:ring-ink-950"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-2xs font-mono text-ink-600 block">
                WhatsApp / Phone (Optional for instant drop ping)
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-surface-border rounded-xs pl-8 pr-3 py-2 text-ink-950 focus:outline-none focus:ring-1 focus:ring-ink-950"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={notifySimilar}
                onChange={(e) => setNotifySimilar(e.target.checked)}
                className="mt-0.5 accent-clay-600 rounded-xs"
              />
              <span className="text-2xs text-ink-600 leading-snug">
                Also alert me if any similar {shoe.brand} {shoe.silhouette} in US {shoe.sizing?.usSize} enters the archive.
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={submitting}
              className="w-full mt-2 font-mono text-xs uppercase tracking-wider justify-center"
            >
              {submitting ? 'Registering...' : 'Notify Me Upon Drop'}
            </Button>
          </form>
        )}

        <div className="text-center text-[10px] font-mono text-ink-400 pt-1">
          Zero spam. Notifications only sent for verified matching inventory.
        </div>

      </div>
    </div>
  );
};
