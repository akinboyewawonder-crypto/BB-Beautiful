import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { artistProfile, openBookingModal } = useApp();

  return (
    <section className="py-24 sm:py-32 bg-[#1A1A1A] text-[#FAF9F6] relative overflow-hidden border-t border-[#E2C9B0]/20">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2C9B0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#E2C9B0]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2C9B0]">
            Limited 2026 Calendar Availability
          </span>
          <span className="w-8 h-[1px] bg-[#E2C9B0]" />
        </div>

        <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-6 leading-tight max-w-3xl mx-auto">
          Ready for your next{' '}
          <span className="italic font-normal text-[#E2C9B0]">
            unforgettable look?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#FAF9F6]/75 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Dates for the upcoming wedding & gala season are strictly limited to ensure every client receives undivided personal devotion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E2C9B0] hover:bg-[#d8be9f] text-[#1A1A1A] px-8 py-4 rounded-xs text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#1A1A1A]" />
            <span>Book Your Appointment</span>
          </button>

          <a
            href={`https://wa.me/${artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-[#E2C9B0]/40 px-8 py-4 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>

        <div className="mt-12 text-[10px] uppercase tracking-widest text-[#A68F7A] flex flex-wrap items-center justify-center gap-6 font-semibold">
          <span>✓ Instant Booking Confirmation</span>
          <span>✓ Sterile Luxury Sanitation</span>
          <span>✓ On-Time Guarantee</span>
        </div>

      </div>
    </section>
  );
};
