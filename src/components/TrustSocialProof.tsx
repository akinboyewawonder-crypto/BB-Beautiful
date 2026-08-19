import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Clock, Star, MapPin, HeartHandshake } from 'lucide-react';

export const TrustSocialProof: React.FC = () => {
  const { artistProfile } = useApp();

  const metrics = [
    {
      icon: Clock,
      value: `${artistProfile.yearsExperience}+ Years`,
      label: 'Editorial & Bridal Experience',
      subtext: 'Trained in Paris & Lagos',
    },
    {
      icon: HeartHandshake,
      value: `${artistProfile.clientCount}+`,
      label: 'Delighted Brides & Clients',
      subtext: 'Weddings, galas & celebrations',
    },
    {
      icon: Star,
      value: `${artistProfile.rating} / 5`,
      label: 'Impeccable Client Rating',
      subtext: '100% verified 5-star reviews',
    },
    {
      icon: MapPin,
      value: 'Destination Ready',
      label: 'Studio & Worldwide Travel',
      subtext: 'Lagos, London, Paris, Como',
    },
  ];

  const editorialPublications = [
    'BEAUTY EDITORIAL',
    'VOGUE RUNWAY',
    'BELLANAIJA WEDDINGS',
    'WEDDING ELEGANCE',
    'HARPER’S BAZAAR AFRICA',
  ];

  return (
    <section className="bg-[#1A1A1A] text-[#FAF9F6] py-14 border-y border-[#E2C9B0]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Press Ticker */}
        <div className="mb-10 pb-8 border-b border-[#E2C9B0]/20 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68F7A] mb-4 font-bold">
            Featured Looks & Masterclasses Seen In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
            {editorialPublications.map((pub, idx) => (
              <span
                key={idx}
                className="font-serif-editorial text-sm sm:text-base tracking-[0.2em] font-light text-[#E2C9B0] hover:text-white transition-colors"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-sm bg-white/[0.02] border border-[#E2C9B0]/20 hover:border-[#E2C9B0]/60 transition-all group"
              >
                <div className="w-8 h-8 rounded-sm bg-[#E2C9B0]/15 border border-[#E2C9B0]/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-3.5 h-3.5 text-[#E2C9B0]" />
                </div>
                <div className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF9F6] font-normal tracking-tight mb-1">
                  {m.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#E2C9B0] mb-0.5">
                  {m.label}
                </div>
                <div className="text-[10px] text-[#A68F7A] font-light">
                  {m.subtext}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
