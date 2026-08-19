import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Feather, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { artistProfile, openBookingModal } = useApp();

  const corePillars = [
    {
      title: 'Skin Architecture First',
      description: 'Luminous, barrier-respecting skincare preparation tailored to your skin type for a radiant, weightless second-skin finish.',
    },
    {
      title: 'Bespoke Color Harmony',
      description: 'Custom pigment blending to complement your skin undertone, attire palette, and the ambient event lighting.',
    },
    {
      title: '16-Hour Celebration Longevity',
      description: 'Waterproof, sweat-proof, and flash-proof formulas engineered to stay pristine from the first photo to the midnight dance.',
    },
    {
      title: 'Serene Wedding Morning Sanctuary',
      description: 'Punctual, organized, and calming presence on high-stakes event mornings so you feel pampered and completely at ease.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Editorial Imagery with Layered Frame */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Secondary Background Image Accent */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-48 h-64 rounded-sm overflow-hidden shadow-xl border-4 border-[#FAF9F6] z-10">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Artistry in motion"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Main Portrait */}
              <div className="rounded-sm overflow-hidden bg-[#F2EDE7] aspect-[3/4] shadow-xl border border-[#E2C9B0]/40 relative">
                <img
                  src={artistProfile.aboutImageUrl}
                  alt={artistProfile.name}
                  className="w-full h-full object-cover filter contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-sm border border-[#E2C9B0]/40 text-[10px] uppercase tracking-wider text-[#1A1A1A] font-bold shadow-md">
                  Studio & On-Location Artistry
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -top-5 right-4 bg-[#1A1A1A] text-[#FAF9F6] p-4 rounded-sm shadow-xl border border-[#E2C9B0]/30 max-w-[200px]">
                <div className="text-[9px] text-[#E2C9B0] uppercase tracking-widest font-bold mb-1">
                  Artistic Creed
                </div>
                <p className="font-serif-editorial text-xs italic text-[#FAF9F6]/90 leading-relaxed">
                  "Makeup is not about hiding; it is about illuminating the soul."
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#E2C9B0]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
                The Artist Behind The Brush
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-6 leading-tight">
              An unwavering commitment to <span className="italic text-[#A68F7A]">refined skin</span> and timeless elegance.
            </h2>

            <div className="space-y-4 text-base text-[#1A1A1A]/80 font-normal leading-relaxed mb-8">
              <p>
                {artistProfile.bio}
              </p>
              <p>
                {artistProfile.philosophy}
              </p>
            </div>

            {/* Core Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {corePillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-sm bg-white border border-[#E2C9B0]/30 shadow-xs hover:border-[#E2C9B0] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-xs bg-[#E2C9B0]/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#1A1A1A]" />
                    </div>
                    <h4 className="text-[11px] font-bold text-[#1A1A1A] tracking-wider uppercase">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed pl-7">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Signature & Booking Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#E2C9B0]/30">
              <div>
                <div className="font-serif-editorial text-2xl italic tracking-wider text-[#1A1A1A]">
                  {artistProfile.name}
                </div>
                <div className="text-[10px] text-[#A68F7A] tracking-widest uppercase font-bold mt-0.5">
                  Founder & Principal Artist, BB Beauty Pro
                </div>
              </div>

              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-8 py-3.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Reserve Your Date</span>
                <Sparkles className="w-3.5 h-3.5 text-[#E2C9B0]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
