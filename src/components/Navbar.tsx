import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Calendar,
  Search,
  Menu,
  X,
  LayoutDashboard,
  Globe,
  ChevronRight,
  ShieldCheck,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    artistProfile,
    activeView,
    setActiveView,
    openBookingModal,
    packageTier,
    setPackageTier,
    setDashboardTab,
    cartCount,
    openCart,
    showToast,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Lip Glazes', href: '#shop', isShop: true },
    { label: 'Services & Rates', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string, isShop?: boolean) => {
    setMobileMenuOpen(false);
    if (activeView !== 'public') {
      setActiveView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Presentation Ribbon & Live Mode Bar */}
      <div className="bg-[#141414] text-[#FAF9F6] text-xs border-b border-[#E2C9B0]/20 px-4 py-2 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Brand Announcement / Instagram Direct Link */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-[#E2C9B0] text-[#1A1A1A]">
              <Sparkles className="w-3 h-3 text-[#1A1A1A]" />
              Official Boutique & Studio
            </span>
            <a
              href="https://www.instagram.com/bb_beauty_pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#E2C9B0] transition-colors text-[11px] uppercase tracking-wider group"
            >
              <Instagram className="w-3 h-3 text-[#E2C9B0]" />
              <span>@bb_beauty_pro</span>
              <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <span className="hidden md:inline text-white/40 text-[11px]">|</span>
            <span className="hidden md:inline text-white/70 text-[11px] font-light">
              Free Priority Shipping On Lip Glazes Over $50
            </span>
          </div>

          {/* Presentation Control Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Switcher: Public Website vs Owner Studio */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveView('public')}
                className={`px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'public'
                    ? 'bg-white/20 text-white font-bold border border-white/40 shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-3 h-3 text-[#E2C9B0]" />
                <span className="hidden xs:inline">Live Store & Studio</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setDashboardTab('overview');
                }}
                className={`px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'dashboard'
                    ? 'bg-[#E2C9B0] text-[#1A1A1A] font-bold shadow-sm'
                    : 'text-[#E2C9B0] bg-[#E2C9B0]/15 hover:bg-[#E2C9B0]/25 border border-[#E2C9B0]/40'
                }`}
              >
                <LayoutDashboard className="w-3 h-3" />
                <span>Admin Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header
        className={`sticky top-[37px] z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2C9B0]/40 py-1'
            : 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E2C9B0]/25 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Brand Signature */}
            <button
              onClick={() => {
                setActiveView('public');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none flex flex-col justify-center"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-serif-editorial text-2xl sm:text-3xl tracking-[0.18em] uppercase text-[#1A1A1A] font-medium leading-none group-hover:text-[#A68F7A] transition-colors">
                  BB BEAUTY PRO
                </span>
                <Sparkles className="w-4 h-4 text-[#A68F7A] opacity-80 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-[#A68F7A] font-semibold mt-1">
                Luxury Lip Glazes & Bridal Couture
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/85">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.isShop)}
                  className={`hover:text-[#A68F7A] transition-colors cursor-pointer relative group py-1 ${
                    link.isShop ? 'text-[#1A1A1A] font-bold flex items-center gap-1.5' : ''
                  }`}
                >
                  {link.isShop && (
                    <span className="w-2 h-2 rounded-full bg-[#D98695] animate-pulse" />
                  )}
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E2C9B0] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right Action Hub */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* Shopping Bag Button with Live Counter */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 bg-[#FAF9F6] hover:bg-[#F2EDE7] text-[#1A1A1A] px-3.5 py-2.5 rounded-xs border border-[#E2C9B0]/60 transition-all shadow-2xs hover:border-[#1A1A1A]/40 cursor-pointer group"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#A68F7A] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-bold hidden xs:inline">
                  Bag
                </span>
                {cartCount > 0 && (
                  <span className="bg-[#1A1A1A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center -mr-1 shadow-xs animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Status Tracker Button */}
              <button
                onClick={() => setActiveView('status-tracker')}
                className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#A68F7A] px-3.5 py-2.5 rounded-xs border border-[#E2C9B0]/50 transition-all bg-white/80 hover:bg-white hover:border-[#1A1A1A]/50 cursor-pointer shadow-2xs"
                title="Lookup existing booking status"
              >
                <Search className="w-3.5 h-3.5 text-[#A68F7A]" />
                <span>Track Booking</span>
              </button>

              {/* Primary Luxury CTA Button */}
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer rounded-xs group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E2C9B0] group-hover:scale-110 transition-transform" />
                <span>Book Service</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F2EDE7] rounded-xs transition-colors cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF9F6] border-b border-[#E2C9B0]/40 px-6 py-6 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href, link.isShop)}
                    className="text-left text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#A68F7A] transition-colors py-3 border-b border-[#F2EDE7] flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {link.isShop && <ShoppingBag className="w-3.5 h-3.5 text-[#A68F7A]" />}
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#A68F7A]" />
                  </button>
                ))}

                {/* Mobile Bag link */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="text-left text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] py-3 flex items-center justify-between border-b border-[#F2EDE7] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#A68F7A]" />
                    <span>Shopping Bag ({cartCount} items)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A68F7A]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveView('status-tracker');
                  }}
                  className="text-left text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] py-3 flex items-center gap-2 border-b border-[#F2EDE7] cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#A68F7A]" />
                  <span>Check Booking Status (#MG-20481)</span>
                </button>

                <a
                  href="https://www.instagram.com/bb_beauty_pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] py-3 flex items-center justify-between border-b border-[#F2EDE7]"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#A68F7A]" />
                    <span>Follow @bb_beauty_pro</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A68F7A]" />
                </a>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openBookingModal();
                    }}
                    className="w-full text-center bg-[#1A1A1A] text-[#FAF9F6] py-3.5 text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#E2C9B0]" />
                    <span>Book Your Appointment</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveView('dashboard');
                    }}
                    className="w-full text-center bg-[#E2C9B0] text-[#1A1A1A] py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Artist Business Studio</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

