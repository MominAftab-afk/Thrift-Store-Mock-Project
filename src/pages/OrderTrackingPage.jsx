import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const OrderTrackingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [orderIdInput, setOrderIdInput] = useState(queryId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (queryId) {
      handleLookup(queryId);
    }
  }, [queryId]);

  const handleLookup = async (idToLook) => {
    if (!idToLook.trim()) return;
    try {
      setLoading(true);
      setSearched(true);
      const res = await dbService.getOrderById(idToLook.trim());
      setOrder(res);
    } catch (err) {
      console.error("Lookup error:", err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (orderIdInput) {
      setSearchParams({ id: orderIdInput.trim() });
      handleLookup(orderIdInput.trim());
    }
  };

  // Pipeline Steps
  const PIPELINE_STAGES = [
    { key: 'CONFIRMED', label: 'Confirmed', desc: 'Order placed & inventory reserved' },
    { key: 'INSPECTED_PACKED', label: 'Inspected', desc: 'Lab UV test & dust bag packaging' },
    { key: 'SHIPPED', label: 'Dispatched', desc: 'Handed to insured courier' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Arriving today' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Archive pair received' },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'CONFIRMED': return 0;
      case 'INSPECTED_PACKED': return 1;
      case 'SHIPPED': return 2;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = order ? getStageIndex(order.status) : 0;

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b border-surface-border pb-6">
          <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
            Archive Logistics
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
            Order Status & Tracking
          </h1>
          <p className="text-2xs text-ink-500 max-w-sm mx-auto">
            Track the physical inspection, packaging, and dispatch journey of your pre-owned footwear.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={onSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Enter your Order ID (e.g. RS-84029)"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="h-10 text-xs font-mono"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="h-10 px-5 text-xs font-mono uppercase tracking-wider"
          >
            <span>Lookup</span>
          </Button>
        </form>

        {/* Sample Hint */}
        <div className="text-center text-[10px] font-mono text-ink-400">
          Tip: Try demo order <button type="button" onClick={() => { setOrderIdInput('RS-84029'); handleLookup('RS-84029'); }} className="underline font-bold text-ink-700">RS-84029</button>
        </div>

        {/* Results */}
        {searched && (
          <div>
            {loading ? (
              <div className="p-10 text-center animate-pulse space-y-3 border border-surface-border rounded-md">
                <div className="h-4 w-32 bg-surface-subtle mx-auto rounded-xs" />
                <div className="h-6 w-48 bg-surface-subtle mx-auto rounded-xs" />
              </div>
            ) : order ? (
              <div className="p-6 rounded-md border border-surface-border bg-white shadow-fine space-y-6 animate-in fade-in duration-200">
                
                {/* Header Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-surface-border">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block">
                      Order Reference
                    </span>
                    <span className="font-serif text-lg font-bold text-ink-950">
                      {order.id}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="badge-archival bg-olive-50 text-olive-700 border-olive-200 font-bold">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-ink-400 block mt-0.5">
                      Tracking: {order.trackingNumber}
                    </span>
                  </div>
                </div>

                {/* 5-Step Pipeline */}
                <div className="space-y-3">
                  <span className="text-2xs font-mono uppercase tracking-archival text-ink-500 block">
                    Restoration & Dispatch Journey
                  </span>
                  <div className="space-y-3">
                    {PIPELINE_STAGES.map((stage, idx) => {
                      const isCompleted = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stage.key} className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5 transition-colors",
                            isCompleted ? "bg-ink-950 text-white" : "bg-surface-subtle border border-surface-border text-ink-400"
                          )}>
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                              <span className={cn(
                                "text-xs font-semibold",
                                isCurrent ? "text-ink-950 font-bold underline" : isCompleted ? "text-ink-800" : "text-ink-400"
                              )}>
                                {stage.label}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-mono text-olive-700 font-bold animate-pulse">
                                  CURRENT STAGE
                                </span>
                              )}
                            </div>
                            <p className="text-2xs text-ink-500 mt-0.5 leading-snug">
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Delivery Note */}
                <div className="p-3.5 rounded-sm bg-surface-muted border border-surface-border flex items-center gap-2.5 text-2xs text-ink-700">
                  <Clock className="w-4 h-4 text-ink-900 shrink-0" />
                  <div>
                    <span className="font-semibold text-ink-950 block">Estimated Handover Window</span>
                    <span>{order.estimatedArrival}</span>
                  </div>
                </div>

                {/* Items in this Order */}
                {order.items && (
                  <div className="pt-2 border-t border-surface-border space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block">
                      Manifest
                    </span>
                    <div className="space-y-1.5">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-ink-900">{item.name} (Size {item.size})</span>
                          <span className="font-mono text-ink-600">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 text-center text-xs text-ink-500 bg-surface-muted rounded-md border border-dashed border-surface-border space-y-2">
                <p>No order found matching ID "<strong>{orderIdInput}</strong>".</p>
                <p className="text-[11px] text-ink-400">Please verify the order ID format (e.g. RS-84029) sent to your email.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
