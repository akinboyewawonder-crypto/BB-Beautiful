import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSocialProof } from './components/TrustSocialProof';
import { ShopSection } from './components/shop/ShopSection';
import { CartDrawer } from './components/shop/CartDrawer';
import { ProductQuickViewModal } from './components/shop/ProductQuickViewModal';
import { CheckoutModal } from './components/shop/CheckoutModal';
import { OrderConfirmationModal } from './components/shop/OrderConfirmationModal';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ClientJourney } from './components/ClientJourney';
import { PricingPackages } from './components/PricingPackages';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StudioLocation } from './components/StudioLocation';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { BookingStatusTracker } from './components/BookingStatusTracker';
import { LightboxModal } from './components/LightboxModal';
import { ToastContainer } from './components/ToastContainer';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Sparkles, LayoutDashboard, Globe, Clock, ShoppingBag } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, setDashboardTab, openBookingModal, openCart, cartCount } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col font-sans selection:bg-[#C8A97E]/30 selection:text-[#1E1B18]">
      
      {/* Quick Demo Switcher Top Bar */}
      <div className="bg-[#151413] text-[#FAF9F6] py-2 px-4 text-xs border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#D9D0C5] text-[11px]">
            <strong className="text-white">BB Beauty Pro</strong> • Luxury E-Commerce Lipgloss & Bridal Studio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('public')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeView === 'public'
                ? 'bg-[#C8A97E] text-[#151413] font-bold'
                : 'text-[#D9D0C5] hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Public Store & Studio
            </span>
          </button>

          <button
            onClick={() => openCart()}
            className="px-3 py-1 rounded-full text-[11px] font-medium text-[#FAF9F6] bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3 text-[#E2C9B0]" />
            <span>Bag ({cartCount})</span>
          </button>

          <button
            onClick={() => {
              setActiveView('dashboard');
              setDashboardTab('orders');
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-[#C8A97E] text-[#151413] font-bold'
                : 'text-[#D9D0C5] hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" />
              Store CMS & Orders
            </span>
          </button>

          <button
            onClick={() => setActiveView('status-tracker')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeView === 'status-tracker'
                ? 'bg-[#C8A97E] text-[#151413] font-bold'
                : 'text-[#D9D0C5] hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Booking Status (#MG-20481)
            </span>
          </button>
        </div>
      </div>

      {/* Main View Router */}
      {activeView === 'public' && (
        <>
          <Navbar />
          <main className="flex-1">
            <Hero />
            <TrustSocialProof />
            <ShopSection />
            <ServicesSection />
            <PortfolioGallery />
            <AboutSection />
            <ClientJourney />
            <PricingPackages />
            <TestimonialsSection />
            <StudioLocation />
            <FinalCTA />
          </main>
          <Footer />
        </>
      )}

      {activeView === 'shop' && (
        <>
          <Navbar />
          <main className="flex-1">
            <ShopSection isFullPageView />
          </main>
          <Footer />
        </>
      )}

      {activeView === 'dashboard' && <DashboardLayout />}

      {activeView === 'status-tracker' && (
        <>
          <Navbar />
          <main className="flex-1">
            <BookingStatusTracker />
          </main>
          <Footer />
        </>
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductQuickViewModal />
      <CheckoutModal />
      <OrderConfirmationModal />
      <BookingWizard />
      <LightboxModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
