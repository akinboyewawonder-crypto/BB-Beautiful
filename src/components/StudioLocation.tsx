import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Phone, Mail, Clock, Sparkles, Plane, Car } from 'lucide-react';

export const StudioLocation: React.FC = () => {
  const { artistProfile, openBookingModal } = useApp();

  return (
    <section id="location" className="py-20 sm:py-32 bg-[#F2EDE7] relative border-t border-[#E2C9B0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Studio Information & Concierge */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#E2C9B0]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
                Studio & Global Availability
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-6">
              A Private Sanctuary for <span className="italic text-[#A68F7A]">Bespoke Beauty</span>
            </h2>

            <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-normal leading-relaxed mb-8">
              Experience total privacy in our daylight-calibrated penthouse studio in Ikoyi, or book our mobile team for direct hotel suite and destination wedding accommodations.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-5 rounded-sm bg-white border border-[#E2C9B0]/30">
                <div className="w-9 h-9 rounded-xs bg-[#E2C9B0]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#1A1A1A]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#A68F7A]">
                    Primary Studio Address
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A1A] mt-0.5">
                    {artistProfile.studioAddress}
                  </div>
                  <div className="text-xs text-[#1A1A1A]/65 mt-0.5">
                    Private valet parking & secure biometric lift access provided upon appointment confirmation.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-sm bg-white border border-[#E2C9B0]/30">
                <div className="w-9 h-9 rounded-xs bg-[#E2C9B0]/20 flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4 text-[#1A1A1A]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#A68F7A]">
                    Worldwide Destination Travel
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A1A] mt-0.5">
                    Available for UK, Europe, UAE, North America & Pan-African Weddings
                  </div>
                  <div className="text-xs text-[#1A1A1A]/65 mt-0.5">
                    All travel logistics, flight bookings, and luggage insurance handled seamlessly.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  window.open(`https://maps.google.com/?q=${encodeURIComponent(artistProfile.studioAddress)}`, '_blank');
                }}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-7 py-3.5 rounded-xs text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span>Get Studio Directions</span>
              </button>

              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white text-[#1A1A1A] border border-[#1A1A1A] px-7 py-3.5 rounded-xs text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>Inquire About Travel Dates</span>
              </button>
            </div>

          </div>

          {/* Right Column: Realistic Luxury Map Mockup Placeholder */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden bg-[#E2D8CC] border border-[#E2C9B0]/40 shadow-2xl aspect-[4/3] group">
              
              {/* Map background pattern / visual */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Studio Location Map"
                className="w-full h-full object-cover filter contrast-[0.9] saturate-[0.8] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Map Dark Tint Overlay */}
              <div className="absolute inset-0 bg-[#1A1A1A]/35 backdrop-blur-[1px]" />

              {/* Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-[#E2C9B0] shadow-2xl flex items-center justify-center text-white mx-auto animate-bounce">
                    <Sparkles className="w-5 h-5 text-[#E2C9B0]" />
                  </div>
                  <div className="w-3.5 h-3.5 bg-[#1A1A1A] rotate-45 mx-auto -mt-2 border-r-2 border-b-2 border-[#E2C9B0]" />
                </div>

                <div className="mt-3 bg-[#FAF9F6]/95 backdrop-blur-md px-4 py-2 rounded-xs shadow-xl border border-[#E2C9B0]/40 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] inline-block whitespace-nowrap">
                  Aura Artistry Flagship Penthouse
                  <span className="block text-[9px] font-semibold text-[#A68F7A]">Ikoyi, Lagos</span>
                </div>
              </div>

              {/* Map Controls Simulation */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-xs border border-[#E2C9B0]/40 shadow-md text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-[#A68F7A]" />
                <span>Valet Concierge on Duty</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
