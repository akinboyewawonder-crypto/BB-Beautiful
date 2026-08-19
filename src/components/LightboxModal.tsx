import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Sparkles, Heart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LightboxModal: React.FC = () => {
  const { lightboxItem, closeLightbox, openBookingModal } = useApp();

  if (!lightboxItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#1A1A1A]/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#1A1A1A] text-[#FAF9F6] max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl border border-[#E2C9B0]/30 flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xs bg-[#1A1A1A]/80 border border-[#E2C9B0]/40 text-white flex items-center justify-center hover:bg-[#E2C9B0] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: High-Res Image */}
        <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={lightboxItem.image}
            alt={lightboxItem.title}
            className="w-full h-full object-cover max-h-[60vh] md:max-h-[80vh]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Editorial Details */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-[#E2C9B0]/20 text-[#E2C9B0] border border-[#E2C9B0]/40 mb-4">
              <Tag className="w-3 h-3" />
              {lightboxItem.category}
            </div>

            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal mb-2 leading-tight">
              {lightboxItem.title}
            </h3>

            {lightboxItem.clientName && (
              <p className="text-xs text-[#E2C9B0] font-medium mb-1">
                Client: {lightboxItem.clientName}
              </p>
            )}

            {lightboxItem.occasion && (
              <p className="text-xs text-[#A68F7A] mb-6">
                Occasion: {lightboxItem.occasion}
              </p>
            )}

            <div className="space-y-3 text-xs text-[#FAF9F6]/75 font-light leading-relaxed border-t border-white/10 pt-4">
              <p>
                Executed using custom pigment harmonization, water-resistant base layering, and individually placed feather lashes to withstand celebration emotions and high-definition photography.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={() => {
                closeLightbox();
                openBookingModal();
              }}
              className="w-full py-3.5 px-4 rounded-xs bg-[#E2C9B0] hover:bg-[#d8be9f] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Exact Look</span>
            </button>

            <button
              onClick={closeLightbox}
              className="w-full text-center text-[10px] uppercase tracking-wider font-semibold text-[#A68F7A] hover:text-white transition-colors cursor-pointer"
            >
              Return to Gallery
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
