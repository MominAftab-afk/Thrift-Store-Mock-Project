import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Phone, 
  Coffee, 
  ShieldCheck, 
  ExternalLink,
  Car,
  Train,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LocalPickupPage = () => {
  const fulfillmentType = useCartStore((s) => s.fulfillmentType);
  const setFulfillmentType = useCartStore((s) => s.setFulfillmentType);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-2xs font-mono text-ink-400">
          <Link to="/" className="hover:text-ink-950 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink-800 font-medium">Boutique Pickup & Archive Vault</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-olive-50 border border-olive-200 text-olive-700 text-2xs font-mono mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Flagship Concept Gallery & Vault</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-950">
            Local Pickup & Restoration Studio
          </h1>
          <p className="text-2xs text-ink-500 font-mono leading-relaxed">
            Pick up your authenticated pairs in person, try them on in our fitting lounge with complimentary espresso, or drop off sneakers for on-site appraisal.
          </p>
        </div>

        {/* FULFILLMENT TOGGLE BAR */}
        <div className="p-4 rounded-md bg-surface-subtle/70 border border-surface-border space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-mono uppercase tracking-archival text-ink-600 font-semibold block">
              Global Cart Fulfillment Preference:
            </span>
            <span className="badge-archival bg-white text-ink-700 border-surface-border text-[9px]">
              Active Preference
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFulfillmentType('pickup')}
              className={cn(
                "p-3.5 rounded-sm border text-left transition-all",
                fulfillmentType === 'pickup'
                  ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                  : "bg-surface-subtle hover:bg-white border-surface-border"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-ink-950">Boutique Pickup</span>
                <span className="font-mono text-xs font-bold text-olive-700">FREE ($0.00)</span>
              </div>
              <p className="text-2xs text-ink-500 font-mono mt-1 leading-snug">
                Ready for collection within 24h. Complimentary fit lounge inspection & espresso.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFulfillmentType('delivery')}
              className={cn(
                "p-3.5 rounded-sm border text-left transition-all",
                fulfillmentType === 'delivery'
                  ? "bg-white border-ink-950 shadow-fine ring-1 ring-ink-950"
                  : "bg-surface-subtle hover:bg-white border-surface-border"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-ink-950">Insured Courier Delivery</span>
                <span className="font-mono text-xs text-ink-800">$12.00</span>
              </div>
              <p className="text-2xs text-ink-500 font-mono mt-1 leading-snug">
                Ships in moisture-sealed vault packaging with 24h tracked dispatch.
              </p>
            </button>
          </div>
        </div>

        {/* REAL OPENSTREETMAP (Zero API Key Required) */}
        <div className="space-y-2">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-md overflow-hidden border border-surface-border bg-surface-muted shadow-fine">
            <iframe
              title="RE/SOLE Boutique OpenStreetMap"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-73.998%2C40.720%2C-73.985%2C40.728&amp;layer=mapnik&amp;marker=40.724%2C-73.991"
              className="w-full h-full filter saturate-75"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xs bg-white/95 backdrop-blur-sm border border-surface-border text-2xs font-mono text-ink-900 shadow-fine flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-olive-600 animate-pulse" />
              <span className="font-bold">RE/SOLE Concept Boutique & Vault</span>
              <span className="text-ink-400">• New York, NY</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-2xs font-mono text-ink-500 px-1">
            <span>OpenStreetMap live tile coordinates: 40.724° N, 73.991° W</span>
            <a
              href="https://maps.google.com/?q=104+Archive+Boulevard+New+York+NY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink-800 hover:text-ink-950 underline font-medium"
            >
              <span>Open in Google / Apple Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* DETAILS & HOURS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Location & Contact Card */}
          <div className="p-6 rounded-md border border-surface-border bg-white shadow-fine space-y-4">
            <div className="flex items-center gap-2 border-b border-surface-border pb-3">
              <MapPin className="w-4 h-4 text-clay-600" />
              <h3 className="font-serif text-sm font-bold text-ink-950">
                Salon Address & Contact
              </h3>
            </div>

            <div className="text-xs font-mono space-y-1 text-ink-700">
              <p className="font-bold text-ink-950 font-sans text-sm">
                RE/SOLE Concept Boutique & Archival Vault
              </p>
              <p>104 Archive Boulevard, Suite 1A</p>
              <p>Concept District, New York, NY 10012</p>
              <p className="pt-2 text-ink-500">Concierge Desk: +1 (555) 019-8422</p>
              <p className="text-ink-500">Intake Desk: intake@resole-archive.com</p>
            </div>

            <div className="p-3 rounded-xs bg-surface-subtle border border-surface-border text-2xs font-mono text-olive-800 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-olive-600 shrink-0" />
              <span>Complimentary Single-Origin Espresso & Matcha Bar for all pickup visitors</span>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="p-6 rounded-md border border-surface-border bg-white shadow-fine space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ink-800" />
                <h3 className="font-serif text-sm font-bold text-ink-950">
                  Operating Hours
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-xs bg-olive-50 text-olive-700 font-mono text-[10px] font-bold">
                OPEN TODAY
              </span>
            </div>

            <div className="text-xs font-mono space-y-2 divide-y divide-surface-border/50 text-ink-700">
              <div className="flex justify-between pt-1">
                <span>Monday – Friday</span>
                <span className="font-bold text-ink-950">10:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Saturday</span>
                <span className="font-bold text-ink-950">11:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Sunday</span>
                <span className="text-ink-500">12:00 PM – 5:00 PM (VIP Appraisals)</span>
              </div>
            </div>

            <p className="text-2xs font-mono text-ink-400 pt-1">
              Orders placed for boutique pickup are pre-inspected and staged in our climate-regulated vault.
            </p>
          </div>

        </div>

        {/* DIRECTIONS GUIDE */}
        <div className="p-6 rounded-md border border-surface-border bg-surface-subtle/50 space-y-4">
          <h3 className="font-serif text-sm font-bold text-ink-950">
            How to Reach the Concept Salon
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-2xs font-mono text-ink-600">
            <div className="flex items-start gap-2.5 p-3 rounded-xs bg-white border border-surface-border">
              <Train className="w-4 h-4 text-ink-900 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-950 block text-xs mb-0.5">Subway & Rail</strong>
                <span>2 minute walk from Central Gallery Station (Lines 1, 4, N, R). Take Exit 2 directly onto Archive Boulevard.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xs bg-white border border-surface-border">
              <Car className="w-4 h-4 text-ink-900 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-950 block text-xs mb-0.5">Validated Parking</strong>
                <span>Underground parking at 108 Archive Blvd. Bring your ticket to the concierge for 1-hour complimentary validation.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
