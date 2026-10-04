import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const isOpen = useUIStore((s) => s.isCartDrawerOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const fulfillmentType = useCartStore((s) => s.fulfillmentType);
  const setFulfillmentType = useCartStore((s) => s.setFulfillmentType);

  const subtotal = items.reduce((acc, curr) => acc + curr.shoe.pricing.thriftPrice, 0);
  const savings = items.reduce((acc, curr) => {
    return acc + Math.max(0, curr.shoe.pricing.originalRetail - curr.shoe.pricing.thriftPrice);
  }, 0);

  const shippingFee = fulfillmentType === 'pickup' ? 0 : (subtotal >= 100 ? 0 : 8);
  const finalTotal = subtotal + shippingFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-surface-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-ink-900" />
              <h2 className="font-serif text-sm font-semibold text-ink-950">
                Archive Bag ({items.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1 rounded-sm text-ink-400 hover:text-ink-900 hover:bg-surface-subtle transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center text-ink-400">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-base font-semibold text-ink-900">
                  Your Archive Bag is Empty
                </h3>
                <p className="text-2xs text-ink-500 max-w-xs leading-relaxed">
                  Every sneaker in our collection is a verified 1-of-1 pre-owned classic. Once sold, it may not return.
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="mt-2 text-xs"
                >
                  Explore Archives
                </Button>
              </div>
            ) : (
              <>
                {/* Fulfillment Selector */}
                <div className="p-2.5 rounded-sm bg-surface-muted border border-surface-border space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block">
                    Fulfillment Preference
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={cn(
                        "flex items-center gap-1.5 p-2 rounded-xs border text-left text-2xs transition-colors",
                        fulfillmentType === 'delivery'
                          ? "bg-white border-ink-900 text-ink-900 font-medium shadow-fine"
                          : "bg-surface-subtle border-surface-border text-ink-500 hover:text-ink-800"
                      )}
                    >
                      <Truck className="w-3.5 h-3.5 shrink-0" />
                      <div>
                        <span className="block leading-tight">Delivery</span>
                        <span className="text-[9px] text-ink-400 font-mono">
                          {subtotal >= 100 ? 'Free over $100' : '$8 courier'}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('pickup')}
                      className={cn(
                        "flex items-center gap-1.5 p-2 rounded-xs border text-left text-2xs transition-colors",
                        fulfillmentType === 'pickup'
                          ? "bg-white border-ink-900 text-ink-900 font-medium shadow-fine"
                          : "bg-surface-subtle border-surface-border text-ink-500 hover:text-ink-800"
                      )}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <div>
                        <span className="block leading-tight">Local Pickup</span>
                        <span className="text-[9px] text-olive-700 font-mono font-medium">Free in Store</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-surface-border">
                  {items.map((item) => (
                    <div key={item.shoe.id} className="py-3 flex gap-3">
                      <img
                        src={item.shoe.images[0]}
                        alt={item.shoe.name}
                        className="w-16 h-16 object-cover rounded-xs border border-surface-border shrink-0 bg-surface-subtle"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif text-xs font-semibold text-ink-900 truncate">
                              {item.shoe.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.shoe.id)}
                              className="text-ink-400 hover:text-red-600 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-2xs text-ink-500">
                              Size: US {item.selectedSize || item.shoe.sizing.usSize}
                            </span>
                            <span className="text-ink-300">•</span>
                            <span className="badge-archival bg-surface-subtle text-ink-700 border-surface-border">
                              {item.shoe.condition.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between pt-1">
                          <span className="font-serif text-sm font-bold text-ink-950">
                            ${item.shoe.pricing.thriftPrice}
                          </span>
                          <span className="text-2xs font-mono text-ink-400 line-through">
                            ${item.shoe.pricing.originalRetail}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 border-t border-surface-border bg-surface-muted/40 space-y-3">
              <div className="space-y-1.5 text-2xs">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-ink-900">${subtotal}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Local Store' : 'Courier'})</span>
                  <span className="font-mono font-medium text-ink-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-clay-700 font-medium">
                    <span>Total Archive Savings</span>
                    <span className="font-mono">-${savings}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-surface-border flex justify-between text-sm font-serif font-bold text-ink-950">
                  <span>Total Due</span>
                  <span className="font-mono">${finalTotal}</span>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="w-full h-10 text-xs uppercase font-mono tracking-wider justify-center gap-1.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-ink-400">
                <ShieldCheck className="w-3 h-3 text-olive-600" />
                <span>100% Authenticity Guaranteed • 1-of-1 Reserved</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
