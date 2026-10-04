import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Sparkles, Check, Trash2, Mail, Phone, ShieldCheck, Zap } from 'lucide-react';
import { dbService } from '@/services/db';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DropAlertsPage = () => {
  const [selectedBrands, setSelectedBrands] = useState(['Nike', 'Adidas']);
  const [selectedCategories, setSelectedCategories] = useState(['Terrace', 'Streetwear']);
  const [selectedSizes, setSelectedSizes] = useState(['10.5']);
  const [conditionFloor, setConditionFloor] = useState('9.0');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [frequency, setFrequency] = useState('instant');

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [simulatedAlert, setSimulatedAlert] = useState(null);
  const [activeLedgers, setActiveLedgers] = useState([]);

  const BRANDS = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Salomon', 'Converse'];
  const CATEGORIES = ['Terrace', 'Streetwear', 'Runner', 'Heritage Court'];
  const SIZES = ['8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'];

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('resole_drop_alerts') || '[]');
      setActiveLedgers(stored);
    } catch {
      setActiveLedgers([]);
    }
  }, [successMessage]);

  const toggleBrand = (b) => {
    setSelectedBrands(prev => 
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const toggleCategory = (c) => {
    setSelectedCategories(prev => 
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const toggleSize = (s) => {
    setSelectedSizes(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubmitting(true);
      const preferences = {
        brands: selectedBrands,
        categories: selectedCategories,
        sizes: selectedSizes,
        conditionFloor,
        phone,
        frequency,
      };

      await dbService.subscribeDropAlert(email, preferences);
      setSuccessMessage(`Subscribed ${email} to archival drop alerts!`);

      const stored = JSON.parse(localStorage.getItem('resole_drop_alerts') || '[]');
      setActiveLedgers(stored);

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAlert = (id) => {
    try {
      const stored = JSON.parse(localStorage.getItem('resole_drop_alerts') || '[]');
      const filtered = stored.filter(a => a.id !== id);
      localStorage.setItem('resole_drop_alerts', JSON.stringify(filtered));
      setActiveLedgers(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  const triggerSimulatedNotification = () => {
    const brand = selectedBrands[0] || 'Nike';
    const size = selectedSizes[0] || '10.5';
    setSimulatedAlert({
      time: 'Just now',
      title: `🔔 [DROP ALERT]: New ${brand} Archive Acquisition`,
      body: `An authenticated ${brand} archive pair in US ${size} (Score: 9.4 Near Mint) has just cleared physical inspection in our restoration studio. Reserved priority window open for 15 minutes.`,
    });

    setTimeout(() => {
      setSimulatedAlert(null);
    }, 6500);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-2xs font-mono text-ink-400">
          <Link to="/" className="hover:text-ink-950 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink-800 font-medium">Drop Alert Subscription Center</span>
        </nav>

        {/* Hero Banner */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-clay-50 border border-clay-200 text-clay-700 text-2xs font-mono mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Priority Provenance Intake Alerts</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-950">
            Never Miss a 1-of-1 Vault Drop
          </h1>
          <p className="text-2xs text-ink-500 font-mono leading-relaxed">
            Our sneaker acquisitions are curated as single items. Select your exact brand, style, and size preferences. We notify our alert ledger the moment pairs clear physical authenticity grading.
          </p>
        </div>

        {/* SIMULATED PUSH NOTIFICATION TOAST */}
        {simulatedAlert && (
          <div className="p-4 rounded-md bg-ink-950 text-white border border-ink-800 shadow-2xl flex items-start justify-between gap-3 animate-in slide-in-from-top-4">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-olive-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="space-y-0.5">
                <p className="font-mono text-2xs font-bold text-olive-400">
                  {simulatedAlert.title}
                </p>
                <p className="text-2xs text-ink-300 leading-snug">
                  {simulatedAlert.body}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSimulatedAlert(null)}
              className="text-ink-400 hover:text-white"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Subscription Form Card */}
        <div className="p-6 sm:p-8 rounded-lg bg-white border border-surface-border shadow-fine space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Brands */}
            <div className="space-y-1.5">
              <label className="text-2xs font-mono uppercase tracking-archival text-ink-600 font-semibold block">
                Target Brands
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBrand(b)}
                    className={cn(
                      "px-3 py-1.5 text-2xs font-mono rounded-xs border transition-colors",
                      selectedBrands.includes(b)
                        ? "bg-ink-950 text-white border-ink-950 font-bold"
                        : "bg-surface-subtle text-ink-700 border-surface-border hover:border-ink-400"
                    )}
                  >
                    {b} {selectedBrands.includes(b) && '✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-1.5">
              <label className="text-2xs font-mono uppercase tracking-archival text-ink-600 font-semibold block">
                Silhouettes & Categories
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={cn(
                      "px-3 py-1.5 text-2xs font-mono rounded-xs border transition-colors",
                      selectedCategories.includes(c)
                        ? "bg-ink-950 text-white border-ink-950 font-bold"
                        : "bg-surface-subtle text-ink-700 border-surface-border hover:border-ink-400"
                    )}
                  >
                    {c} {selectedCategories.includes(c) && '✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-1.5">
              <label className="text-2xs font-mono uppercase tracking-archival text-ink-600 font-semibold block">
                Your Sizes (US Men / Unisex)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSize(s)}
                    className={cn(
                      "w-12 py-1.5 text-2xs font-mono rounded-xs border transition-colors text-center",
                      selectedSizes.includes(s)
                        ? "bg-clay-600 text-white border-clay-600 font-bold"
                        : "bg-surface-subtle text-ink-700 border-surface-border hover:border-ink-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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
                  WhatsApp / Phone (Instant Ping)
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
            </div>

            {/* Frequency Selector */}
            <div className="flex items-center justify-between p-3.5 rounded-xs bg-surface-subtle/60 border border-surface-border text-2xs font-mono">
              <div className="space-y-0.5">
                <span className="font-semibold text-ink-900 block">Notification Cadence</span>
                <span className="text-ink-500 text-[10px]">
                  {frequency === 'instant' ? 'Sent within 5m of vault intake' : 'Weekly Sunday digest at 10 AM'}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setFrequency('instant')}
                  className={cn(
                    "px-2.5 py-1 rounded-xs border text-[11px]",
                    frequency === 'instant' ? "bg-ink-950 text-white border-ink-950 font-bold" : "bg-white text-ink-600"
                  )}
                >
                  Instant
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={cn(
                    "px-2.5 py-1 rounded-xs border text-[11px]",
                    frequency === 'weekly' ? "bg-ink-950 text-white border-ink-950 font-bold" : "bg-white text-ink-600"
                  )}
                >
                  Weekly Digest
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
                className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider justify-center"
              >
                {submitting ? 'Subscribing...' : 'Save Drop Preferences'}
              </Button>

              <button
                type="button"
                onClick={triggerSimulatedNotification}
                className="w-full sm:w-auto px-4 py-2 rounded-sm border border-surface-border bg-surface-subtle hover:bg-surface-muted text-ink-800 text-2xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                title="Preview what a customer drop alert notification looks like"
              >
                <Sparkles className="w-3.5 h-3.5 text-clay-600" />
                <span>Simulate Drop Ping</span>
              </button>
            </div>

            {successMessage && (
              <div className="p-3 rounded-xs bg-olive-50 border border-olive-200 text-olive-800 text-2xs font-mono flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-olive-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </form>

          {/* Active Subscriptions List */}
          {activeLedgers.length > 0 && (
            <div className="pt-6 border-t border-surface-border space-y-3">
              <span className="text-2xs font-mono uppercase tracking-archival text-ink-500 font-semibold block">
                Active Subscriptions ({activeLedgers.length}):
              </span>

              <div className="space-y-2">
                {activeLedgers.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-xs border border-surface-border bg-surface-subtle/30 flex items-center justify-between text-2xs font-mono"
                  >
                    <div className="space-y-0.5">
                      <span className="text-ink-950 font-bold block">
                        {alert.email}
                      </span>
                      <span className="text-[10px] text-ink-500 block">
                        Brands: {alert.preferences?.brands?.join(', ') || alert.preferences?.brand || 'All'} • Sizes: {alert.preferences?.sizes?.join(', ') || alert.preferences?.size || 'All'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-1 text-ink-400 hover:text-clay-600 transition-colors"
                      title="Delete subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
