import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Camera, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useScroll } from '@/components/ui/use-scroll';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUIStore } from '@/store/useUIStore';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScroll(10);
  const location = useLocation();

  const itemCount = useCartStore((s) => s.getItemCount());
  const savedCount = useWishlistStore((s) => s.savedIds.length);
  const openCart = useUIStore((s) => s.openCart);
  const openVisualSearch = useUIStore((s) => s.openVisualSearch);
  const openQuiz = useUIStore((s) => s.openQuiz);
  const openDropAlert = useUIStore((s) => s.openDropAlert);

  const navLinks = [
    { label: 'Archive Catalog', href: '/shop' },
    { label: 'Shoe Finder', href: '/quiz' },
    { label: 'Drop Alerts', href: '/drop-alerts' },
    { label: 'Sell / Donate', href: '/sell-donate' },
    { label: 'Order Tracking', href: '/track-order' },
    { label: 'Local Pickup', href: '/local-pickup' },
  ];

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200 border-b border-transparent',
        scrolled
          ? 'bg-white/90 supports-[backdrop-filter]:bg-white/60 border-border backdrop-blur-md shadow-fine'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-6">
          <Link to="/" className="group flex items-baseline gap-1.5 focus:outline-none">
            <span className="font-serif text-lg font-bold tracking-tight text-ink-950 group-hover:text-ink-700 transition-colors">
              RE/SOLE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-archival text-ink-400">
              ARCHIVE
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'text-2xs font-mono uppercase tracking-archival h-8 px-2.5',
                    isActive ? 'text-ink-950 font-semibold bg-accent' : 'text-ink-500 hover:text-ink-950'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Visual Search CTA */}
          <button
            type="button"
            onClick={openVisualSearch}
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-sm bg-surface-subtle hover:bg-ink-100 text-ink-800 text-2xs font-mono border border-surface-border transition-colors"
            title="Search catalog by photo"
          >
            <Camera className="w-3 h-3 text-ink-600" />
            <span>Visual Search</span>
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-1.5 rounded-sm hover:bg-accent text-ink-800 transition-colors"
            title="Saved Pairs"
          >
            <Heart className="w-4 h-4 stroke-[1.75]" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-ink-900 text-white font-mono text-[8px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-1.5 rounded-sm hover:bg-accent text-ink-800 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-ink-900 text-white font-mono text-[8px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden h-8 w-8"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={mobileOpen} className="w-4 h-4" duration={250} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Portal */}
      <MobileMenu open={mobileOpen}>
        <div className="flex flex-col justify-between h-full p-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-archival text-ink-400 block mb-3">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-between font-serif text-base py-3 h-auto'
                )}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-ink-400" />
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={openVisualSearch}
              className="w-full justify-center gap-2 h-10 text-xs font-mono uppercase"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Search</span>
            </Button>
            <Button
              className="w-full justify-center h-10 text-xs font-mono uppercase tracking-wider"
              onClick={openCart}
            >
              <span>View Cart ({itemCount})</span>
            </Button>
          </div>
        </div>
      </MobileMenu>
    </header>
  );
};

function MobileMenu({ open, children, className, ...props }) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur-xl',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-border md:hidden animate-in fade-in duration-200'
      )}
    >
      <div className={cn('size-full', className)} {...props}>
        {children}
      </div>
    </div>,
    document.body
  );
}
