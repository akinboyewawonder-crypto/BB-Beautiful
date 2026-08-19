import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  HelpCircle,
  Settings,
  TrendingUp,
  Package,
  ShoppingBag,
  Truck,
  ArrowLeft,
  Eye,
  LogOut,
  Bell,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { OverviewTab } from './OverviewTab';
import { BookingRequestsTab } from './BookingRequestsTab';
import { CalendarTab } from './CalendarTab';
import { PortfolioCMSTab } from './PortfolioCMSTab';
import { ServicesCMSTab } from './ServicesCMSTab';
import { QuestionsCMSTab } from './QuestionsCMSTab';
import { ContentCMSTab } from './ContentCMSTab';
import { AnalyticsTab } from './AnalyticsTab';
import { PackagePreviewTab } from './PackagePreviewTab';
import { ShopCMSTab } from './ShopCMSTab';
import { StoreOrdersTab } from './StoreOrdersTab';
import { DashboardTab } from '../../types';

export const DashboardLayout: React.FC = () => {
  const {
    artistProfile,
    dashboardTab,
    setDashboardTab,
    setActiveView,
    bookingRequests,
    shopOrders,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingProofs = bookingRequests.filter((b) => b.status === 'payment_submitted').length;
  const pendingRequests = bookingRequests.filter((b) => b.status === 'pending').length;
  const pendingOrders = shopOrders.filter((o) => o.status === 'processing').length;

  const navItems: { id: DashboardTab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'orders',
      label: 'Lipgloss Orders',
      icon: Truck,
      badge: pendingOrders > 0 ? pendingOrders : undefined,
    },
    { id: 'shop_cms', label: 'Lipgloss Products CMS', icon: ShoppingBag },
    {
      id: 'requests',
      label: 'Booking Requests',
      icon: Inbox,
      badge: pendingProofs + pendingRequests > 0 ? pendingProofs + pendingRequests : undefined,
    },
    { id: 'calendar', label: 'Availability & Dates', icon: Calendar },
    { id: 'portfolio', label: 'Portfolio Gallery CMS', icon: ImageIcon },
    { id: 'services', label: 'Services & Pricing', icon: Sparkles },
    { id: 'questions', label: 'Booking Questionnaire', icon: HelpCircle },
    { id: 'content', label: 'Studio Identity & Wire', icon: Settings },
    { id: 'analytics', label: 'Analytics & Insights', icon: TrendingUp },
    { id: 'package_preview', label: 'Packages & Tiers', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#1E1B18] text-[#FAF8F5] p-4 flex items-center justify-between sticky top-0 z-30 border-b border-[#332E29]">
        <div className="flex items-center gap-2.5">
          <span className="text-xs uppercase tracking-widest text-[#C8A97E] font-medium">
            {artistProfile.brandName}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A97E]/20 text-[#D4AF37] font-semibold">
            Studio CMS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('public')}
            className="p-1.5 text-xs text-white/80 hover:text-white"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-full md:h-screen w-64 bg-[#1E1B18] text-[#FAF8F5] p-6 flex flex-col justify-between border-r border-[#332E29] transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Studio Brand Header */}
          <div className="border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C8A97E] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio & Boutique Portal</span>
            </div>
            <h1 className="font-serif-editorial text-2xl text-white font-normal mt-1">
              {artistProfile.name}
            </h1>
            <div className="text-[11px] text-[#A69788] mt-0.5">
              {artistProfile.customDomain}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setDashboardTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#C8A97E] text-[#151413] font-bold shadow-md'
                      : 'text-[#D9D0C5] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#151413]' : 'text-[#A69788]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-[#151413] text-[#C8A97E]' : 'bg-amber-500 text-[#151413]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={() => setActiveView('public')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Public Website Preview</span>
          </button>

          <div className="text-[10px] text-center text-[#8C7E72]">
            BB Beauty Pro Suite • E-Commerce & Bookings
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 max-w-7xl">
        {dashboardTab === 'overview' && <OverviewTab />}
        {dashboardTab === 'orders' && <StoreOrdersTab />}
        {dashboardTab === 'shop_cms' && <ShopCMSTab />}
        {dashboardTab === 'requests' && <BookingRequestsTab />}
        {dashboardTab === 'calendar' && <CalendarTab />}
        {dashboardTab === 'portfolio' && <PortfolioCMSTab />}
        {dashboardTab === 'services' && <ServicesCMSTab />}
        {dashboardTab === 'questions' && <QuestionsCMSTab />}
        {dashboardTab === 'content' && <ContentCMSTab />}
        {dashboardTab === 'analytics' && <AnalyticsTab />}
        {dashboardTab === 'package_preview' && <PackagePreviewTab />}
      </main>

    </div>
  );
};

