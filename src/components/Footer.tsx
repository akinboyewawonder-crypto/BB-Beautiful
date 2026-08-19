import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, MessageCircle, Phone, Mail, MapPin, Sparkles, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { artistProfile, setActiveView, setDashboardTab } = useApp();

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6] pt-16 pb-12 border-t border-[#E2C9B0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E2C9B0]/20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2C9B0] font-bold block">
              {artistProfile.brandName}
            </span>
            <div className="font-serif-editorial text-3xl text-white font-normal">
              {artistProfile.name}
            </div>
            <p className="text-xs text-[#FAF9F6]/70 font-light leading-relaxed max-w-sm">
              Haute couture and bridal makeup artistry crafted with intentional skin architecture and serene on-day luxury.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#E2C9B0]">
              <Globe className="w-3.5 h-3.5" />
              <span>{artistProfile.customDomain} (Custom Domain Ready)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E2C9B0]">
              Explore Artistry
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/75 font-light">
              <li><a href="#shop" className="hover:text-[#E2C9B0] transition-colors font-medium text-[#E2C9B0]">BB Lip Glazes (Shop)</a></li>
              <li><a href="#about" className="hover:text-[#E2C9B0] transition-colors">About BB Beauty Pro</a></li>
              <li><a href="#services" className="hover:text-[#E2C9B0] transition-colors">Services & Rates</a></li>
              <li><a href="#portfolio" className="hover:text-[#E2C9B0] transition-colors">Haute Portfolio Gallery</a></li>
              <li><a href="#pricing" className="hover:text-[#E2C9B0] transition-colors">Packages & Tiers</a></li>
              <li><a href="#location" className="hover:text-[#E2C9B0] transition-colors">Studio & Travel Locations</a></li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E2C9B0]">
              Studio Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF9F6]/75 font-light">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span>{artistProfile.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E2C9B0]" />
                <span>{artistProfile.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E2C9B0] shrink-0 mt-0.5" />
                <span>{artistProfile.locationCity}</span>
              </li>
            </ul>
          </div>

          {/* Socials & Business System */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E2C9B0]">
              Official Channels
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://www.instagram.com/bb_beauty_pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FAF9F6]/90 hover:text-[#E2C9B0] transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E2C9B0] group-hover:scale-110 transition-transform" />
                <span className="font-medium">@bb_beauty_pro</span>
              </a>

              <a
                href={`https://wa.me/${artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FAF9F6]/75 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setDashboardTab('overview');
                  }}
                  className="px-3.5 py-2 rounded-xs bg-[#E2C9B0]/15 hover:bg-[#E2C9B0]/25 text-[#E2C9B0] text-[10px] uppercase tracking-wider font-bold border border-[#E2C9B0]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Launch Artist Studio (CMS)</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A68F7A]">
          <p>© {new Date().getFullYear()} {artistProfile.brandName} by {artistProfile.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveView('status-tracker')} className="hover:text-white transition-colors cursor-pointer">
              Client Booking Status Lookup (#MG-20481)
            </button>
            <span>•</span>
            <span>Digital Business Suite for Premium Artists</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
