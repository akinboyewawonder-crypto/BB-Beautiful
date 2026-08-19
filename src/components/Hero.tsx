import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Calendar, ArrowUpRight, Sparkles, Star, Award, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { artistProfile, openBookingModal } = useApp();

  return (
    <section className="relative overflow-hidden pt-6 pb-20 sm:pt-12 sm:pb-28">
      {/* Subtle ambient light gradient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3ECE1] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#EFE4D6] rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#E2C9B0]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
                {artistProfile.tagline || 'Professional Artistry'}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08] mb-6">
              Beauty, <br className="hidden sm:inline" />
              thoughtfully <br className="hidden sm:inline" />
              <span className="italic text-[#A68F7A]">created</span> for your most iconic moments.
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-sans leading-relaxed max-w-xl mb-10 font-normal">
              {artistProfile.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-3 bg-[#E2C9B0] hover:bg-[#d8be9f] text-[#1A1A1A] px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer rounded-xs"
              >
                <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                <span>Start Booking</span>
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1A1A1A] hover:text-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A] px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all rounded-xs"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats / Trust Grid */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[#E2C9B0]/20">
              <div>
                <div className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1A1A]">{artistProfile.clientCount}+</div>
                <div className="text-[10px] uppercase tracking-widest text-[#A68F7A] font-semibold mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1A1A]">{artistProfile.yearsExperience}+ Yrs</div>
                <div className="text-[10px] uppercase tracking-widest text-[#A68F7A] font-semibold mt-1">Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1A1A]">{artistProfile.rating} / 5.0</div>
                <div className="text-[10px] uppercase tracking-widest text-[#A68F7A] font-semibold mt-1">Client Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Visual & Luxury Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Border Offset */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#E2C9B0]/40 rounded-sm -rotate-1 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative rounded-sm overflow-hidden bg-[#F2EDE7] shadow-xl aspect-[4/5] border border-[#E2C9B0]/30">
                <img
                  src={artistProfile.portraitUrl}
                  alt={artistProfile.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />

                {/* Floating Luxury Seal Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-sm bg-white/95 backdrop-blur-md border border-[#E2C9B0]/40 shadow-md flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-[#A68F7A] uppercase">
                      <Sparkles className="w-3 h-3 text-[#A68F7A]" />
                      Master Artistry
                    </div>
                    <div className="font-serif-editorial text-lg text-[#1A1A1A] font-normal">
                      {artistProfile.name}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">{artistProfile.yearsExperience}+ Years</div>
                    <div className="text-[10px] text-[#A68F7A] uppercase tracking-tighter">Haute Couture & Bridal</div>
                  </div>
                </div>
              </div>

              {/* Decorative Luxury Floating Badge */}
              <div className="hidden sm:block absolute -top-3 -right-3 bg-[#E2C9B0] text-[#1A1A1A] px-3.5 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest shadow-md">
                ✦ 2026 Dates Now Open
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
