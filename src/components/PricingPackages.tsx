import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Star, ShieldCheck, ArrowRight, LayoutDashboard, Calendar, Zap } from 'lucide-react';

export const PricingPackages: React.FC = () => {
  const {
    packageTier,
    setPackageTier,
    setActiveView,
    setDashboardTab,
    openBookingModal,
    showToast,
  } = useApp();

  const essentialFeatures = [
    'Bespoke Editorial Landing & Profile Website',
    'High-Converting Hero with Brand Story',
    'Curated Services Menu & Rate Card in USD',
    'High-Resolution Portfolio Gallery with Filter Categories',
    'Structured Multi-Step Client Booking Form',
    'Pre-Formatted WhatsApp Direct Booking Generator',
    'Client Contact & Social Media Hub (@bb_beauty_pro)',
    'Flawless Mobile Experience for Instagram Bio & TikTok',
    'Custom Domain Ready (bbbeautypro.com)',
    'Fast-Loading Cloud Hosting & Security',
  ];

  const signatureFeatures = [
    'Everything in Essential ($150) Included',
    'Full Artist Business Studio (Client Management Command Center)',
    'Interactive Real-Time Availability & Slot Calendar',
    'Custom Booking Questions Builder with 1-Click Suggestions',
    'Payment Verification Workflow (Deposit & Banking UI)',
    'Real-Time Client Booking Status Tracker (#MG-20481 code)',
    'Pending / Approved / Clarification / Rejected Booking States',
    'Live Portfolio CMS with Upload Quota & Featured Pinning',
    'Zero-Code Website Content Editor (Bio, Rates, Phone, Address)',
    'Studio Location Card with Interactive Directions',
    'Business Growth Analytics (Views, Requests & Conversion Rate)',
  ];

  const handleSelectBasic = () => {
    setPackageTier('basic');
    showToast('Essential Profile Package ($150) Selected', 'info');
  };

  const handleSelectSignature = () => {
    setPackageTier('signature');
    showToast('Signature Business Suite ($250) Selected — Full System Active', 'success');
  };

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
              The Makeup Artist Digital System
            </span>
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4">
            Invest in a Digital Presence as <span className="italic text-[#A68F7A]">Flawless</span> as Your Art
          </h2>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-normal leading-relaxed">
            Stop losing premium brides to chaotic DM chats. Choose the package that matches your business vision and elevate your client experience today.
          </p>

          {/* Interactive Tier Switcher Pills */}
          <div className="mt-8 inline-flex items-center bg-[#F2EDE7] p-1.5 rounded-sm border border-[#E2C9B0]/40 text-xs shadow-xs">
            <button
              onClick={handleSelectBasic}
              className={`px-5 py-2.5 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                packageTier === 'basic'
                  ? 'bg-white text-[#1A1A1A] shadow-md border border-[#1A1A1A]/20'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-white/50'
              }`}
            >
              Essential Profile ($150)
            </button>
            <button
              onClick={handleSelectSignature}
              className={`px-5 py-2.5 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                packageTier === 'signature'
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] shadow-md'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-white/50'
              }`}
            >
              <span>Signature Business Suite ($250)</span>
              <span className="text-[9px] bg-[#E2C9B0] text-[#1A1A1A] px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-tighter">
                RECOMMENDED
              </span>
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Essential $150 */}
          <div
            onClick={handleSelectBasic}
            className={`rounded-sm p-8 sm:p-10 bg-white border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              packageTier === 'basic'
                ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/10 shadow-2xl scale-[1.01]'
                : 'border-[#E2C9B0]/40 shadow-sm opacity-90 hover:opacity-100 hover:border-[#1A1A1A]/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#A68F7A]">
                    Package 01
                  </span>
                  <h3 className="font-serif-editorial text-3xl text-[#1A1A1A] font-normal">
                    Essential Profile
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-serif-editorial text-4xl text-[#1A1A1A] font-normal">
                    $150
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#A68F7A]">One-time setup</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-normal leading-relaxed mb-8 pb-6 border-b border-[#F2EDE7]">
                For makeup artists who need an established, editorial online presence and a smooth way for high-paying clients to discover their work and book via structured WhatsApp inquiries.
              </p>

              {/* Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] mb-2">
                  What’s Included:
                </div>
                {essentialFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A1A1A]/80">
                    <div className="w-4 h-4 rounded-xs bg-[#FAF9F6] border border-[#E2C9B0] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#A68F7A]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F2EDE7] space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectBasic();
                  openBookingModal();
                }}
                className="w-full py-3.5 px-4 rounded-xs text-[10px] uppercase tracking-widest font-bold bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] transition-all text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span>Book With Essential Package ($150)</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectBasic();
                }}
                className={`w-full py-2.5 px-4 rounded-xs text-[10px] uppercase tracking-wider font-semibold transition-all text-center border ${
                  packageTier === 'basic'
                    ? 'bg-[#F2EDE7] text-[#1A1A1A] border-[#1A1A1A]/30 font-bold'
                    : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border-[#E2C9B0]/50'
                }`}
              >
                {packageTier === 'basic' ? '✓ Currently Selected Tier' : 'Select Essential Package'}
              </button>
            </div>
          </div>

          {/* Card 2: Signature $250 (FLAGSHIP / RECOMMENDED) */}
          <div
            onClick={handleSelectSignature}
            className={`rounded-sm p-8 sm:p-10 bg-[#1A1A1A] text-[#FAF9F6] border relative transition-all duration-300 flex flex-col justify-between shadow-2xl cursor-pointer ${
              packageTier === 'signature'
                ? 'border-[#E2C9B0] ring-2 ring-[#E2C9B0]/40 scale-[1.01]'
                : 'border-[#38322B] opacity-95 hover:opacity-100'
            }`}
          >
            {/* Top Recommended Floating Badge */}
            <div className="absolute -top-3 right-6 bg-[#E2C9B0] text-[#1A1A1A] px-3.5 py-1 rounded-xs text-[9px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
              <Star className="w-2.5 h-2.5 fill-[#1A1A1A]" />
              Signature Flagship System
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#E2C9B0]">
                    Package 02
                  </span>
                  <h3 className="font-serif-editorial text-3xl text-white font-normal">
                    Signature Business Suite
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-serif-editorial text-4xl text-white font-normal">
                    $250
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#A68F7A]">Complete System</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#FAF9F6]/75 font-light leading-relaxed mb-8 pb-6 border-b border-white/10">
                For makeup artists who want a complete digital business experience with custom booking questions, calendar management, payment verification, and an owner dashboard to update their website without code.
              </p>

              {/* Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#E2C9B0] mb-2">
                  Complete Digital Business System:
                </div>
                {signatureFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#FAF9F6]/90">
                    <div className="w-4 h-4 rounded-xs bg-[#E2C9B0]/20 border border-[#E2C9B0] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#E2C9B0]" />
                    </div>
                    <span className={i === 0 ? 'font-bold text-white' : ''}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSignature();
                  openBookingModal();
                }}
                className="w-full py-3.5 px-4 rounded-xs text-[10px] uppercase tracking-widest font-bold bg-[#E2C9B0] hover:bg-[#d8be9f] text-[#1A1A1A] transition-all text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-[#1A1A1A]" />
                <span>Book Signature Experience ($250)</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSignature();
                  setActiveView('dashboard');
                  setDashboardTab('overview');
                }}
                className="w-full py-3 px-4 rounded-xs text-[10px] uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span>Test Drive Artist Studio Dashboard Demo</span>
              </button>
            </div>
          </div>

        </div>

        {/* Presentation Note Banner for Client Pitch */}
        <div className="mt-14 max-w-4xl mx-auto p-6 rounded-sm bg-[#F2EDE7] border border-[#E2C9B0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#E2C9B0]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div className="text-xs text-[#1A1A1A]/80">
              <strong className="text-[#1A1A1A] font-bold">Ready for Client Presentation:</strong> Both tiers can be activated in real-time. Switch between the Public Website and the Owner Studio at any time.
            </div>
          </div>

          <button
            onClick={() => {
              setActiveView('dashboard');
              setDashboardTab('overview');
            }}
            className="shrink-0 text-xs uppercase tracking-wider text-[#1A1A1A] font-bold underline underline-offset-4 hover:text-[#A68F7A] cursor-pointer"
          >
            Launch Owner Studio →
          </button>
        </div>

      </div>
    </section>
  );
};
