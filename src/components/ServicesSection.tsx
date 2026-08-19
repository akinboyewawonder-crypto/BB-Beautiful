import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Check, Sparkles, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const ServicesSection: React.FC = () => {
  const { services, formatPrice, openBookingModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Bridal', 'Traditional', 'Glam', 'Editorial'];

  const activeServices = services.filter((s) => s.active);
  const filteredServices =
    activeCategory === 'All'
      ? activeServices
      : activeServices.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 sm:py-32 bg-[#F2EDE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
              The Artistry Collection
            </span>
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4">
            Curated Services for Every <span className="italic text-[#A68F7A]">Defining Occasion</span>
          </h2>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-normal leading-relaxed">
            Each experience is executed with sterile luxury tools, high-definition cosmetic formulations, and bespoke attention to your facial architecture.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                    : 'bg-white/80 text-[#1A1A1A]/70 hover:bg-white border border-[#E2C9B0]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-sm overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${
                service.popular ? 'border-[#E2C9B0] ring-1 ring-[#E2C9B0]/40' : 'border-[#E2C9B0]/30 hover:border-[#E2C9B0]'
              }`}
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E2D9CE]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-sm text-[9px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-[#1A1A1A] shadow-sm">
                    {service.category}
                  </span>

                  {/* Popular Tag */}
                  {service.popular && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-sm text-[9px] font-bold tracking-wider uppercase bg-[#E2C9B0] text-[#1A1A1A] shadow-sm flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-[#1A1A1A]" /> Signature Choice
                    </span>
                  )}

                  {/* Duration Overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#E2C9B0]" />
                    <span>{service.durationMinutes} Minutes</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#1A1A1A] font-normal leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-[10px] text-[#A68F7A] font-bold uppercase tracking-widest">Starting at</span>
                    <span className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                      {formatPrice(service.priceUSD, service.priceNGN)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F2EDE7] mb-6">
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#1A1A1A]/80">
                        <Check className="w-3.5 h-3.5 text-[#A68F7A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => openBookingModal(service.id)}
                  className={`w-full py-3.5 px-4 rounded-xs text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    service.popular
                      ? 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] shadow-sm hover:shadow-md'
                      : 'bg-[#FAF9F6] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#FAF9F6] border border-[#E2C9B0]/50'
                  }`}
                >
                  <span>Select & Book Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Group Booking Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-white border border-[#E2C9B0]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A68F7A]" />
              Large Bridal Parties & Destination Productions
            </div>
            <h4 className="font-serif-editorial text-2xl text-[#1A1A1A] font-normal">
              Planning an international wedding or multi-day campaign?
            </h4>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-normal mt-1">
              We provide full glam squads, on-set assistants, and multi-location travel arrangements.
            </p>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="shrink-0 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-8 py-3.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            Request Custom Proposal
          </button>
        </div>

      </div>
    </section>
  );
};
