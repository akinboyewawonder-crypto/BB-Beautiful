import React from 'react';
import { Sparkles, Calendar, Palette, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClientJourney: React.FC = () => {
  const { openBookingModal } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Consultation & Date Lock',
      subtitle: 'Seamless Digital Inquiry',
      description:
        'Submit your event details and moodboard through our multi-step booking suite. We lock your date instantly upon deposit verification.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Palette Harmony & Skin Prep',
      subtitle: 'Tailored Aesthetic Blueprint',
      description:
        'We analyze your facial undertones, attire fabric swatches, and lighting environment to curate your custom pigment and lash map.',
      icon: Palette,
    },
    {
      number: '03',
      title: 'The Unforgettable Masterpiece',
      subtitle: '16-Hour Radiance & Calm',
      description:
        'Sit back in a tranquil bridal sanctuary on your big day. Enjoy sterile tools, luxury skin treatments, and a look built to endure tears of joy.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#FAF9F6] relative border-b border-[#E2C9B0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-6 bg-[#E2C9B0]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A68F7A]">
              The Client Journey
            </span>
            <span className="h-[1px] w-6 bg-[#E2C9B0]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4">
            How We Bring Your Vision To Life
          </h2>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-light leading-relaxed">
            From the initial digital consultation to your final touch-up, every touchpoint is designed to feel effortless, organized, and deeply luxurious.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-sm bg-white border border-[#E2C9B0]/40 shadow-sm hover:shadow-xl hover:border-[#1A1A1A] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-editorial text-4xl text-[#E2C9B0] font-light group-hover:text-[#1A1A1A] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xs bg-[#FAF9F6] border border-[#E2C9B0]/60 flex items-center justify-center text-[#A68F7A] group-hover:bg-[#1A1A1A] group-hover:text-[#FAF9F6] group-hover:border-[#1A1A1A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#A68F7A] mb-1.5">
                    {step.subtitle}
                  </div>

                  <h3 className="font-serif-editorial text-2xl text-[#1A1A1A] font-normal mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F2EDE7] flex items-center text-[10px] uppercase tracking-wider font-bold text-[#A68F7A] group-hover:text-[#1A1A1A] transition-colors">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Trigger */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-8 py-4 rounded-xs text-[10px] uppercase tracking-widest font-bold shadow-md transition-all cursor-pointer"
          >
            <span>Begin Your Reservation</span>
            <ArrowRight className="w-4 h-4 text-[#E2C9B0]" />
          </button>
        </div>

      </div>
    </section>
  );
};
