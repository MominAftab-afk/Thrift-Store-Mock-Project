import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Truck, MapPin, CreditCard, Banknote, Building2, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const fulfillmentType = useCartStore((s) => s.fulfillmentType);
  const setFulfillmentType = useCartStore((s) => s.setFulfillmentType);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    city: 'Karachi',
    postalCode: '',
    pickupPerson: '',
    paymentMethod: 'cod', // 'cod' | 'bank' | 'card' | 'wallet'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = items.reduce((acc, curr) => acc + curr.shoe.pricing.thriftPrice, 0);
  const savings = items.reduce((acc, curr) => {
    return acc + Math.max(0, curr.shoe.pricing.originalRetail - curr.shoe.pricing.thriftPrice);
  }, 0);
  const shippingFee = fulfillmentType === 'pickup' ? 0 : (subtotal >= 100 ? 0 : 8);
  const totalAmount = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-serif text-xl font-bold text-ink-950">Your Bag is Empty</h2>
        <p className="text-2xs text-ink-500">Add an authenticated pair from our catalog to proceed to checkout.</p>
        <Button asChild variant="primary" size="md">
          <Link to="/shop">Explore Footwear Catalog</Link>
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.phone || (!formData.fullName && fulfillmentType === 'delivery')) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newOrder = await dbService.createOrder({
        customer: {
          email: formData.email,
          phone: formData.phone,
          fullName: formData.fullName || formData.pickupPerson,
          address: formData.address,
          city: formData.city,
        },
        customerName: formData.fullName || formData.pickupPerson || 'Collector',
        customerEmail: formData.email,
        fulfillmentType,
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          id: i.shoe.id,
          name: i.shoe.name,
          brand: i.shoe.brand,
          size: i.selectedSize || i.shoe.sizing.usSize,
          price: i.shoe.pricing.thriftPrice,
          image: i.shoe.images[0],
        })),
        subtotal,
        shippingFee,
        total: totalAmount,
        totalAmount,
        savings,
      });

      // Clear cart and redirect
      clearCart();
      navigate(`/order-confirmation/${newOrder.id}`);
    } catch (err) {
      console.error("Order placement error:", err);
      setErrorMessage("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="border-b border-surface-border pb-4 mb-8">
          <span className="text-2xs font-mono uppercase tracking-archival text-ink-400 block">
            Archive Procurement
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
            Secure Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Intake Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact Information */}
            <div className="p-4 rounded-md border border-surface-border bg-white space-y-4 shadow-fine">
              <h2 className="font-serif text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-ink-950 text-white font-mono text-2xs flex items-center justify-center">1</span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  required
                  placeholder="collector@archive.com"
                  value={formData.email}
                  onChange={handleChange}
                  helperText="We'll send order tracking & lab authenticity certificates here."
                />
                <Input
                  label="Phone / WhatsApp"
                  type="tel"
                  name="phone"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  helperText="For delivery courier coordination."
                />
              </div>
            </div>

            {/* Step 2: Fulfillment Mode */}
            <div className="p-4 rounded-md border border-surface-border bg-white space-y-4 shadow-fine">
              <h2 className="font-serif text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-ink-950 text-white font-mono text-2xs flex items-center justify-center">2</span>
                <span>Fulfillment Method</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={cn(
                    "p-3 rounded-sm border text-left space-y-1 transition-all",
                    fulfillmentType === 'delivery'
                      ? "border-ink-950 bg-surface-subtle/50 ring-1 ring-ink-950 shadow-fine"
                      : "border-surface-border bg-white hover:border-ink-300"
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink-900">
                    <Truck className="w-4 h-4" />
                    <span>Courier Delivery</span>
                  </div>
                  <p className="text-[11px] text-ink-500">
                    Direct to your door in 2–4 business days.
                  </p>
                  <span className="text-[10px] font-mono text-ink-400 block pt-1">
                    {subtotal >= 100 ? 'FREE Shipping' : '$8 Insured Shipping'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={cn(
                    "p-3 rounded-sm border text-left space-y-1 transition-all",
                    fulfillmentType === 'pickup'
                      ? "border-ink-950 bg-surface-subtle/50 ring-1 ring-ink-950 shadow-fine"
                      : "border-surface-border bg-white hover:border-ink-300"
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink-900">
                    <MapPin className="w-4 h-4 text-olive-600" />
                    <span>Local Boutique Pickup</span>
                  </div>
                  <p className="text-[11px] text-ink-500">
                    Inspect in-person before taking home.
                  </p>
                  <span className="text-[10px] font-mono text-olive-700 font-bold block pt-1">
                    FREE in Store
                  </span>
                </button>
              </div>

              {/* Conditional Address or Store Pickup Box */}
              {fulfillmentType === 'delivery' ? (
                <div className="space-y-3 pt-2">
                  <Input
                    label="Full Name"
                    name="fullName"
                    required
                    placeholder="Karim Khan"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Delivery Street Address"
                    name="address"
                    required
                    placeholder="House 42, Street 12, Phase 6, DHA"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="City"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <Input
                      label="Postal Code (Optional)"
                      name="postalCode"
                      placeholder="75500"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-sm bg-surface-muted border border-surface-border space-y-2 text-2xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-ink-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-ink-950 block">RE/SOLE Archive Concept Store</span>
                      <p className="text-ink-600">104 Archive Boulevard, Concept District, Karachi</p>
                      <p className="text-ink-400 mt-1">Hours: Mon–Sat, 11:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-surface-border/60">
                    <Input
                      label="Pickup Person Name"
                      name="pickupPerson"
                      placeholder="Name on ID card"
                      value={formData.pickupPerson}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method (Stubbed Architecture) */}
            <div className="p-4 rounded-md border border-surface-border bg-white space-y-4 shadow-fine">
              <h2 className="font-serif text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-ink-950 text-white font-mono text-2xs flex items-center justify-center">3</span>
                <span>Payment Preference</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'cod', label: 'Cash on Delivery / Pickup', icon: Banknote, desc: 'Pay when your archive pair arrives' },
                  { id: 'bank', label: 'Direct Bank Transfer', icon: Building2, desc: 'Account details provided upon confirmation' },
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard (Test gateway)' },
                  { id: 'wallet', label: 'JazzCash / EasyPaisa', icon: CheckCircle2, desc: 'Instant local mobile wallet' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={cn(
                      "p-3 rounded-xs border text-left flex items-start gap-2.5 transition-colors",
                      formData.paymentMethod === pm.id
                        ? "border-ink-950 bg-surface-subtle ring-1 ring-ink-950"
                        : "border-surface-border bg-white hover:border-ink-300"
                    )}
                  >
                    <pm.icon className="w-4 h-4 text-ink-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-xs font-semibold text-ink-950 block">{pm.label}</span>
                      <span className="text-[10px] text-ink-500 leading-tight block">{pm.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-mono bg-red-50 p-2.5 rounded-sm border border-red-200">
                {errorMessage}
              </p>
            )}

            {/* Place Order CTA */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full h-11 text-xs font-mono uppercase tracking-wider justify-center gap-2"
            >
              <span>Confirm Archive Order • ${totalAmount}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-md border border-surface-border bg-surface-muted/50 space-y-4 shadow-fine">
              <h2 className="font-serif text-sm font-bold text-ink-950 border-b border-surface-border pb-2.5">
                Order Summary ({items.length} Pairs)
              </h2>

              <div className="divide-y divide-surface-border max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.shoe.id} className="py-2.5 flex items-center gap-3">
                    <img
                      src={item.shoe.images[0]}
                      alt={item.shoe.name}
                      className="w-12 h-12 object-cover rounded-xs border border-surface-border bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-semibold text-ink-900 truncate">
                        {item.shoe.name}
                      </h4>
                      <p className="text-[10px] font-mono text-ink-500">
                        Size: US {item.selectedSize || item.shoe.sizing.usSize} • Condition: {item.shoe.condition.label}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-950">
                      ${item.shoe.pricing.thriftPrice}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-1.5 pt-3 border-t border-surface-border text-2xs">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-ink-900">${subtotal}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Store Pickup' : 'Courier'})</span>
                  <span className="font-mono font-medium text-ink-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-clay-700 font-medium">
                    <span>Retail Savings</span>
                    <span className="font-mono">-${savings}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-surface-border flex justify-between text-sm font-serif font-bold text-ink-950">
                  <span>Total Amount</span>
                  <span className="font-mono">${totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="p-3.5 rounded-md border border-surface-border bg-white flex items-start gap-2.5 shadow-fine">
              <ShieldCheck className="w-5 h-5 text-olive-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-2xs">
                <span className="font-serif font-bold text-ink-950 block">Guaranteed Authenticity</span>
                <p className="text-ink-500 leading-relaxed">
                  Every shoe arrives with an authentic restoration inspection tag signed by our lab technician.
                </p>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
