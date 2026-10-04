import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Phone, 
  Check, 
  X, 
  Coffee, 
  ShieldCheck, 
  Truck, 
  ExternalLink,
  Car,
  Train
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LocalPickupModal = ({ isOpen, onClose }) => {
  const fulfillmentType = useCartStore((s) => s.fulfillmentType);
  const setFulfillmentType = useCartStore((s) => s.setFulfillmentType);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'directions' | 'hours'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-surface-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xs bg-ink-950 text-white flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono text-2xs uppercase tracking-archival text-ink-500 font-semibold block">
                Flagship Concept Salon
              </span>
              <h3 className="font-serif text-base font-bold text-ink-950 leading-tight">
                Local Boutique Pickup & Vault
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-ink-400 hover:text-ink-950 hover:bg-surface-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* FULFILLMENT TOGGLE BAR */}
          <div className="p-3.5 rounded-md bg-surface-subtle/60 border border-surface-border space-y-2">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-500 font-semibold block">
              Choose Order Fulfillment:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={cn(
                  "p-3 rounded-xs border text-left transition-all",
                  fulfillmentType === 'pickup'
                    ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                    : "bg-surface-subtle hover:bg-white border-surface-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs font-bold text-ink-950">Local Pickup</span>
                  <span className="font-mono text-2xs font-bold text-olive-700">FREE ($0)</span>
                </div>
                <p className="text-[10px] text-ink-500 font-mono mt-1">
                  Ready tomorrow • Try on in-store + complimentary espresso
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={cn(
                  "p-3 rounded-xs border text-left transition-all",
                  fulfillmentType === 'delivery'
                    ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                    : "bg-surface-subtle hover:bg-white border-surface-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs font-bold text-ink-950">Express Courier</span>
                  <span className="font-mono text-2xs text-ink-800">$12.00</span>
                </div>
                <p className="text-[10px] text-ink-500 font-mono mt-1">
                  Insured courier in moisture-sealed vault box • 2-4 days
                </p>
              </button>
            </div>
          </div>

          {/* REAL OPENSTREETMAP INTERACTIVE MAP (Zero API Key Required) */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-md overflow-hidden border border-surface-border bg-surface-muted shadow-fine">
              <iframe
                title="RE/SOLE Concept Boutique OpenStreetMap"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.998%2C40.720%2C-73.985%2C40.728&amp;layer=mapnik&amp;marker=40.724%2C-73.991"
                className="w-full h-full filter saturate-75"
              />
              {/* Map Floating Pin Label */}
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xs bg-white/95 backdrop-blur-sm border border-surface-border text-2xs font-mono text-ink-900 shadow-fine flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-olive-600 animate-pulse" />
                <span className="font-bold">RE/SOLE Archive Vault</span>
                <span className="text-ink-400">• Manhattan, NY</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-ink-500 px-1">
              <span>Interactive OpenStreetMap (No API key needed)</span>
              <a
                href="https://maps.google.com/?q=104+Archive+Boulevard+New+York+NY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-800 hover:text-ink-950 underline font-medium"
              >
                <span>Open in Google / Apple Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* DETAILS & HOURS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Location & Contact Card */}
            <div className="p-4 rounded-md border border-surface-border bg-white shadow-fine space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-clay-600" />
                <h4 className="font-serif text-xs font-bold text-ink-950">
                  Boutique Location
                </h4>
              </div>

              <div className="text-2xs font-mono space-y-1 text-ink-600">
                <p className="font-bold text-ink-950 font-sans text-xs">
                  RE/SOLE Concept Boutique & Archive Vault
                </p>
                <p>104 Archive Boulevard, Suite 1A</p>
                <p>Concept District, NY 10012</p>
                <p className="pt-1 text-ink-400">Direct Line: +1 (555) 019-8422</p>
              </div>

              <div className="pt-2 border-t border-surface-border/60 flex items-center gap-1.5 text-2xs font-mono text-olive-700">
                <Coffee className="w-3.5 h-3.5 text-olive-600" />
                <span>Complimentary espresso bar for collectors</span>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-4 rounded-md border border-surface-border bg-white shadow-fine space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ink-800" />
                  <h4 className="font-serif text-xs font-bold text-ink-950">
                    Boutique Hours
                  </h4>
                </div>
                <span className="px-1.5 py-0.2 rounded-xs bg-olive-50 text-olive-700 font-mono text-[9px] font-bold">
                  OPEN TODAY
                </span>
              </div>

              <div className="text-2xs font-mono space-y-1 divide-y divide-surface-border/40 text-ink-600">
                <div className="flex justify-between py-1">
                  <span>Mon – Fri</span>
                  <span className="font-bold text-ink-950">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Saturday</span>
                  <span className="font-bold text-ink-950">11:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="text-ink-400">12:00 PM – 5:00 PM (Appraisals)</span>
                </div>
              </div>
            </div>

          </div>

          {/* DIRECTIONS ACCORDION / GUIDE */}
          <div className="p-4 rounded-md border border-surface-border bg-surface-subtle/40 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-ink-950">
              Transit & Parking Directions
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-2xs font-mono text-ink-600">
              <div className="flex items-start gap-2">
                <Train className="w-3.5 h-3.5 text-ink-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-900 block">Subway / Transit</strong>
                  <span>2 min walk from Central Gallery Station (Lines 1, 4, N, R). Exit onto Archive Blvd.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Car className="w-3.5 h-3.5 text-ink-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-900 block">Validated Parking</strong>
                  <span>108 Archive Blvd underground parking garage. 1st hour validated with pickup or drop-off.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-surface-border bg-surface-subtle/50 flex items-center justify-between text-2xs font-mono">
          <span className="text-ink-400">Pickup status confirmed via SMS / Email</span>
          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="text-2xs font-mono uppercase tracking-wider"
          >
            Confirm Fulfillment
          </Button>
        </div>

      </div>
    </div>
  );
};
