import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, ShieldCheck, MapPin, Truck, Copy, Check } from 'lucide-react';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const data = await dbService.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-surface-subtle mx-auto" />
        <div className="h-6 w-48 bg-surface-subtle mx-auto rounded-xs" />
        <div className="h-4 w-72 bg-surface-subtle mx-auto rounded-xs" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-olive-50 border border-olive-200 text-olive-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-2xs font-mono uppercase tracking-archival text-olive-700 font-bold block">
            Procurement Confirmed
          </span>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-950">
            Thank You For Giving Footwear a Second Era.
          </h1>

          <p className="text-xs text-ink-600 max-w-md mx-auto leading-relaxed">
            Your 1-of-1 archive order has been reserved. Our restoration team will conduct a final quality check before dispatch.
          </p>

          {/* Order ID Pill */}
          <div className="pt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-surface-muted border border-surface-border text-xs font-mono">
            <span className="text-ink-500">Order ID:</span>
            <span className="font-bold text-ink-950">{orderId}</span>
            <button
              type="button"
              onClick={handleCopyId}
              className="text-ink-400 hover:text-ink-900 transition-colors ml-1"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-olive-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Status Stepper Card */}
        <div className="p-5 rounded-md border border-surface-border bg-white shadow-fine space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border text-2xs font-mono">
            <span className="text-ink-500 uppercase tracking-archival">Fulfillment Pipeline</span>
            <span className="text-olive-700 font-bold">STATUS: CONFIRMED</span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-center">
            {[
              { label: 'Confirmed', done: true, current: true },
              { label: 'Inspected', done: false, current: false },
              { label: 'Dispatched', done: false, current: false },
              { label: 'Delivered', done: false, current: false },
            ].map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className={`h-1.5 rounded-pill ${step.done ? 'bg-ink-950' : 'bg-surface-border'}`} />
                <span className={`text-[10px] font-mono block ${step.current ? 'font-bold text-ink-950' : 'text-ink-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xs bg-surface-muted text-2xs flex items-center gap-2 text-ink-700">
            {order?.fulfillmentType === 'pickup' ? (
              <>
                <MapPin className="w-4 h-4 text-ink-900 shrink-0" />
                <span>Ready for pickup at our concept store: <strong>104 Archive Boulevard, Karachi</strong></span>
              </>
            ) : (
              <>
                <Truck className="w-4 h-4 text-ink-900 shrink-0" />
                <span>Estimated courier delivery window: <strong>2–4 Business Days</strong></span>
              </>
            )}
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && order.items && (
          <div className="p-5 rounded-md border border-surface-border bg-surface-muted/40 space-y-3">
            <h3 className="font-serif text-xs font-bold text-ink-950">
              Reserved Archive Inventory ({order.items.length})
            </h3>
            <div className="divide-y divide-surface-border">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-xs border border-surface-border" />
                    )}
                    <div>
                      <span className="font-serif text-xs font-semibold text-ink-950 block">{item.name}</span>
                      <span className="text-[10px] font-mono text-ink-400">Size: US {item.size}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-ink-950">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-surface-border flex justify-between items-baseline text-sm font-serif font-bold text-ink-950">
              <span>Total Paid</span>
              <span className="font-mono">${order.totalAmount}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button asChild variant="primary" className="w-full sm:flex-1 h-10 text-xs font-mono uppercase tracking-wider">
            <Link to="/shop">
              <span>Browse More Archives</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:flex-1 h-10 text-xs font-mono uppercase tracking-wider">
            <Link to={`/track-order?id=${orderId}`}>
              <PackageCheck className="w-3.5 h-3.5 mr-1.5" />
              <span>Track This Order</span>
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
};
