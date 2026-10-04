import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { SellDonatePage } from './pages/SellDonatePage';
import { LocalPickupPage } from './pages/LocalPickupPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StyleGuidePage } from './pages/StyleGuidePage';
import { ShoeFinderQuizPage } from './pages/ShoeFinderQuizPage';
import { DropAlertsPage } from './pages/DropAlertsPage';
import Demo from '@/components/ui/demo';

// Modals
import { VisualSearchModal } from './features/visual-search/VisualSearchModal';
import { ShoeFinderQuizModal } from './features/quiz/ShoeFinderQuizModal';
import { DropAlertModal } from './features/drop-alerts/DropAlertModal';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-ink-900 font-sans selection:bg-ink-900 selection:text-white">
        <AnnouncementBar />
        <Navbar />
        
        {/* Global Cart Slide-Out Drawer */}
        <CartDrawer />

        <main className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />
            <Route path="/local-pickup" element={<LocalPickupPage />} />
            <Route path="/sell-donate" element={<SellDonatePage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/style-guide" element={<StyleGuidePage />} />
            <Route path="/quiz" element={<ShoeFinderQuizPage />} />
            <Route path="/drop-alerts" element={<DropAlertsPage />} />
            <Route path="/header-demo" element={<Demo />} />
            
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Interactive Modals */}
        <VisualSearchModal />
        <ShoeFinderQuizModal />
        <DropAlertModal />
      </div>
    </BrowserRouter>
  );
}

export default App;
