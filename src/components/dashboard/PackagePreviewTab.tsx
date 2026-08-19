import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export const PackagePreviewTab: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
          Digital Architecture Packages & Capabilities
        </h2>
        <p className="text-xs text-[#6B6158] font-light mt-0.5">
          Review the complete feature breakdown powering your high-converting client booking suite.
        </p>
      </div>

      {/* 2-Tier Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Basic Tier ($150) */}
        <div className="p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">
              Essential Digital Foundation
            </span>
            <div className="font-serif-editorial text-3xl text-[#1E1B18] font-normal mt-1">
              Basic Package
            </div>
            <div className="font-serif-editorial text-4xl text-[#1E1B18] font-normal mt-4">
              $150 <span className="text-xs font-sans text-[#8C7A6B] font-light">one-time build</span>
            </div>
            <p className="text-xs text-[#6B6158] mt-2">
              For upcoming makeup artists transitioning away from chaotic WhatsApp chats and paper diaries.
            </p>

            <ul className="space-y-3 pt-6 border-t border-[#F0EAE1] text-xs text-[#4A433D]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-page luxury mobile-responsive website</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard service menu & pricing display</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Basic contact & WhatsApp direct link</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Portfolio gallery (up to 12 images)</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 line-through">
                <span>Multi-step custom consultation questionnaire</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 line-through">
                <span>Payment screenshot upload & verification system</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 line-through">
                <span>Real-time availability slot locking calendar</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 line-through">
                <span>Interactive Before/After transformation slider</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DDD2] text-xs text-[#6B6158]">
            Provides clean credibility for Instagram bio links.
          </div>
        </div>

        {/* Signature Tier ($250) Recommended */}
        <div className="p-8 rounded-3xl bg-[#1E1B18] text-[#FAF8F5] border-2 border-[#C8A97E] shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#C8A97E] text-[#151413] text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm">
            Recommended Tier
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Business Suite
            </div>
            <div className="font-serif-editorial text-3xl text-white font-normal mt-1">
              Signature Package
            </div>
            <div className="font-serif-editorial text-4xl text-white font-normal mt-4">
              $250 <span className="text-xs font-sans text-[#D9D0C5] font-light">one-time build</span>
            </div>
            <p className="text-xs text-[#D9D0C5] mt-2">
              For elite artists charging premium rates who need an end-to-end client booking and payment verification engine.
            </p>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-[#EAE2D8]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>All Basic features</strong> included</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Multi-Step Booking Wizard</strong> with dynamic questions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Payment Screenshot Verification</strong> & proof archive</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Client Status Portal</strong> with reference # tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Interactive Before/After</strong> skin transformation slider</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Expanded Portfolio Quota</strong> (30 high-res editorial looks)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Artist Studio Dashboard</strong> with booking drawer & analytics</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Custom Domain Support</strong> (e.g. nicolemoreau.com)</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-[#D9D0C5]">
            <strong className="text-white block mb-0.5">Why Artists Choose Signature:</strong>
            Saves 10+ hours a week in back-and-forth messaging and eliminates double-booking risks.
          </div>
        </div>

      </div>

    </div>
  );
};
