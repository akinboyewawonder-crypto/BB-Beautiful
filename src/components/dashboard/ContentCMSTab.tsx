import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Sparkles, CheckCircle, ShieldCheck, Globe, DollarSign } from 'lucide-react';
import { ArtistProfile } from '../../types';

export const ContentCMSTab: React.FC = () => {
  const { artistProfile, updateArtistProfile, showToast, setActiveView } = useApp();

  const [formData, setFormData] = useState<ArtistProfile>({ ...artistProfile });

  const handleChange = (field: keyof ArtistProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateArtistProfile(formData);
    showToast('Artist branding & studio details updated successfully!', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Studio Identity & Concierge Settings
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Update your public brand name, editorial biography, WhatsApp contact, and payment wire credentials.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#322D28] transition-all shadow-md cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#C8A97E]" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Brand & Artist Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
        <h3 className="font-serif-editorial text-xl text-[#1E1B18] font-medium border-b border-[#EFEAE3] pb-3">
          1. Brand & Artist Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Artist Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Studio / Brand Name *
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Primary Role Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Custom Domain URL
            </label>
            <input
              type="text"
              value={formData.customDomain}
              onChange={(e) => handleChange('customDomain', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Editorial Biography & Philosophy
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full p-4 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E] leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact & Socials */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
        <h3 className="font-serif-editorial text-xl text-[#1E1B18] font-medium border-b border-[#EFEAE3] pb-3">
          2. Concierge Contacts & Social Media
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Phone (Concierge line)
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              WhatsApp Number (with country code)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Concierge Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              TikTok Handle
            </label>
            <input
              type="text"
              value={formData.tiktok}
              onChange={(e) => handleChange('tiktok', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              City / Region
            </label>
            <input
              type="text"
              value={formData.locationCity}
              onChange={(e) => handleChange('locationCity', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Full Physical Studio Address
            </label>
            <input
              type="text"
              value={formData.studioAddress}
              onChange={(e) => handleChange('studioAddress', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>
        </div>
      </div>

      {/* Payment & Bank Wire Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#C8A97E]" />
          <h3 className="font-serif-editorial text-xl text-[#1E1B18] font-medium">
            3. Deposit & Bank Transfer Instructions (Shown to Booking Clients)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Bank Name
            </label>
            <input
              type="text"
              value={formData.bankDetails?.bankName}
              onChange={(e) => handleBankChange('bankName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Account Number / IBAN
            </label>
            <input
              type="text"
              value={formData.bankDetails?.accountNumber}
              onChange={(e) => handleBankChange('accountNumber', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
              Account Beneficiary Name
            </label>
            <input
              type="text"
              value={formData.bankDetails?.accountName}
              onChange={(e) => handleBankChange('accountName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#322D28] transition-all shadow-md cursor-pointer"
          >
            Save All Identity & Payment Settings
          </button>
        </div>
      </div>

    </form>
  );
};
