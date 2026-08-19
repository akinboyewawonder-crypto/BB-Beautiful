import React from 'react';
import { initialTestimonials } from '../data/initialData';
import { Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A68F7A]">
              Client Testimonials
            </span>
            <span className="w-8 h-[1px] bg-[#E2C9B0]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4">
            Words from <span className="italic text-[#A68F7A]">Unforgettable</span> Days
          </h2>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-normal leading-relaxed">
            Real reflections from high-profile brides, red-carpet honorees, and private clients who trusted our artistry.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-sm bg-white border border-[#E2C9B0]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#E2C9B0]"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#E2C9B0] mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E2C9B0]" />
                  ))}
                </div>

                <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1A1A] font-normal leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 border-t border-[#F2EDE7] flex items-center gap-3.5">
                <img
                  src={item.avatarUrl}
                  alt={item.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-[#E2C9B0]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-editorial text-base text-[#1A1A1A] font-normal leading-snug">
                    {item.clientName}
                  </h4>
                  <div className="text-[10px] uppercase tracking-wider text-[#A68F7A] font-semibold">
                    {item.roleOrEvent} • {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
