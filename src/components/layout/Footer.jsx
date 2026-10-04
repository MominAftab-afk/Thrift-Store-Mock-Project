import React from 'react';
import { MessageCircle, Shield, RefreshCw, Sparkles, MapPin } from 'lucide-react';

export const Footer = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "1234567890";
  const storeAddress = import.meta.env.VITE_STORE_ADDRESS || "104 Archive Boulevard, Concept District";

  return (
    <footer className="bg-white border-t border-surface-border mt-16 text-ink-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-surface-border">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-surface-subtle flex items-center justify-center text-ink-900 shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-semibold text-ink-950">100% Authenticity</h3>
              <p className="text-2xs text-ink-500 mt-0.5">4-point physical verification.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-surface-subtle flex items-center justify-center text-ink-900 shrink-0">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-semibold text-ink-950">Condition Meter</h3>
              <p className="text-2xs text-ink-500 mt-0.5">Sole, upper & inner graded.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-surface-subtle flex items-center justify-center text-ink-900 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-semibold text-ink-950">Second Life</h3>
              <p className="text-2xs text-ink-500 mt-0.5">Diverting rare pairs from waste.</p>
            </div>
          </div>

          <Link to="/local-pickup" className="flex items-start gap-2.5 group">
            <div className="w-7 h-7 rounded-sm bg-surface-subtle flex items-center justify-center text-ink-900 shrink-0 group-hover:bg-ink-950 group-hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-semibold text-ink-950 group-hover:underline">Local Pickup & Hours</h3>
              <p className="text-2xs text-ink-500 mt-0.5">{storeAddress}</p>
            </div>
          </Link>
        </div>

        {/* Links & Direct Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
          <div className="space-y-2">
            <div className="font-serif text-base font-bold tracking-tight text-ink-950">
              RE/SOLE
            </div>
            <p className="text-2xs text-ink-500 leading-relaxed max-w-xs">
              Curated pre-owned & vintage sneaker archives. Restored with care, graded with honesty, and priced with fairness.
            </p>
          </div>

          <div>
            <h3 className="text-2xs font-mono uppercase tracking-archival text-ink-900 mb-2">Explore</h3>
            <ul className="space-y-1.5 text-2xs text-ink-500">
              <li><Link to="/shop" className="hover:text-ink-950 transition-colors">Catalog / All Silhouettes</Link></li>
              <li><Link to="/quiz" className="hover:text-ink-950 transition-colors">Shoe Finder Matrix</Link></li>
              <li><Link to="/drop-alerts" className="hover:text-ink-950 transition-colors">Drop Alerts Ledger</Link></li>
              <li><Link to="/shop?deals=true" className="hover:text-ink-950 transition-colors">Limited-Time Vault Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xs font-mono uppercase tracking-archival text-ink-900 mb-2">Care & Trust</h3>
            <ul className="space-y-1.5 text-2xs text-ink-500">
              <li><Link to="/sell-donate" className="hover:text-ink-950 transition-colors">Consign / Donate Shoes</Link></li>
              <li><Link to="/track-order" className="hover:text-ink-950 transition-colors">Track Order Status</Link></li>
              <li><Link to="/local-pickup" className="hover:text-ink-950 transition-colors">Local Pickup & Directions</Link></li>
              <li><Link to="/style-guide" className="hover:text-ink-950 transition-colors">Design System & Tokens</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xs font-mono uppercase tracking-archival text-ink-900 mb-2">Concierge</h3>
            <p className="text-2xs text-ink-500 mb-2.5">
              Need detailed photo angles or verification details? Chat directly with a curator.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20RE/SOLE,%20I%20have%20an%20inquiry%20about%20a%20pair%20in%20your%20archive.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-sm bg-[#25D366] text-white text-2xs font-medium hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-2xs font-mono text-ink-400 gap-2">
          <span>© {new Date().getFullYear()} RE/SOLE ARCHIVE. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/local-pickup" className="hover:text-ink-700 transition-colors">Pickup Vault</Link>
            <span>•</span>
            <Link to="/track-order" className="hover:text-ink-700 transition-colors">Logistics Stepper</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-ink-950 transition-colors underline font-medium">Operations Console (Admin)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
