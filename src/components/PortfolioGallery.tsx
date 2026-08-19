import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Maximize2, Heart, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

export const PortfolioGallery: React.FC = () => {
  const { portfolio, openLightbox, openBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const categories = ['All', 'Bridal', 'Traditional', 'Soft Glam', 'Full Glam', 'Photoshoot'];

  const filteredPortfolio =
    selectedCategory === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#E2C9B0]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
                The Portfolio
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
              A Gallery of <span className="italic text-[#A68F7A]">Timeless</span> Transformations
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xs text-[10px] uppercase tracking-widest font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                    : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border border-[#E2C9B0]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPortfolio.map((item, index) => {
            const isFeatured = item.featured;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative rounded-sm overflow-hidden bg-[#F2EDE7] border border-[#E2C9B0]/40 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${
                  isFeatured && index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-[3/4]'
                }`}
                onClick={() => openLightbox(item)}
              >
                {/* Main Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-[#FAF9F6]/95 backdrop-blur-sm text-[#1A1A1A] shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Lightbox Trigger Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xs bg-[#1A1A1A]/80 backdrop-blur-md border border-[#E2C9B0]/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Card Information */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif-editorial text-2xl text-white font-normal mb-1">
                    {item.title}
                  </h3>
                  {item.clientName && (
                    <p className="text-xs text-[#E2C9B0] font-light">
                      {item.clientName} {item.occasion ? `— ${item.occasion}` : ''}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#E2C9B0] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Click to view full editorial details</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Before & After Skin Preparation Transformation Module */}
        <div className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-sm bg-[#1A1A1A] text-[#FAF9F6] border border-[#E2C9B0]/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sliders className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2C9B0]">
                  Interactive Skin Transformation
                </span>
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-white mb-4 leading-tight">
                The Anatomy of <span className="italic text-[#E2C9B0]">Skin Architecture</span>
              </h3>

              <p className="text-sm text-[#FAF9F6]/75 font-light leading-relaxed mb-6">
                Drag the interactive slider to examine our skin-first philosophy. We prep the natural skin barrier to mirror soft daylight before building subtle pigment layers for camera-ready perfection.
              </p>

              <div className="space-y-3 mb-8 text-xs text-[#A68F7A]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2C9B0]" />
                  <span>Left: Clean, hydrated skin foundation with lymphatic massage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A68F7A]" />
                  <span>Right: Finished haute couture soft glam with feathered lashes</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal()}
                className="bg-[#E2C9B0] text-[#1A1A1A] hover:bg-[#d8be9f] px-8 py-3.5 rounded-xs text-[10px] font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Experience The Transformation
              </button>
            </div>

            {/* Before / After Interactive Slider */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#E2C9B0]/30 select-none shadow-xl">
                {/* "After" Image (Background) */}
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"
                  alt="After Glamour Transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 right-4 bg-[#1A1A1A]/85 backdrop-blur-md px-3 py-1 rounded-xs text-[9px] uppercase font-bold tracking-wider text-[#E2C9B0] border border-[#E2C9B0]/30 z-10">
                  After (Finished Glam)
                </span>

                {/* "Before" Image (Clipped Overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                    alt="Before Skin Preparation"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#FAF9F6]/95 backdrop-blur-md px-3 py-1 rounded-xs text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A] shadow-sm z-10">
                    Before (Skin Prep)
                  </span>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#E2C9B0] shadow-2xl z-20 cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#E2C9B0] text-white flex items-center justify-center shadow-lg -translate-x-1/2">
                    <Sliders className="w-3 h-3 text-[#E2C9B0]" />
                  </div>
                </div>

                {/* Range Slider for Accessible Interaction */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Drag to compare before and after makeup look"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
