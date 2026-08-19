import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Check, X, Clock, DollarSign, Sparkles } from 'lucide-react';
import { ServiceItem } from '../../types';

export const ServicesCMSTab: React.FC = () => {
  const { services, addService, updateService, deleteService, formatPrice } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New service state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [priceUSD, setPriceUSD] = useState(180);
  const [priceNGN, setPriceNGN] = useState(250000);
  const [duration, setDuration] = useState('90 mins');
  const [inclusionsStr, setInclusionsStr] = useState('Skin Prep, Premium Mink Lashes, Touch-up Kit');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addService({
      name: title,
      description: subtitle,
      priceUSD,
      priceNGN,
      durationMinutes: 90,
      includes: inclusionsStr.split(',').map((s) => s.trim()).filter(Boolean),
      popular: isFeatured,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
      category: 'Glam',
      active: true,
    });

    setTitle('');
    setSubtitle('');
    setPriceUSD(180);
    setPriceNGN(250000);
    setInclusionsStr('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Service Menu & Pricing Configuration
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Modify experience packages, adjust multi-currency rates, and customize inclusion checklists.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#322D28] transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C8A97E]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Add Service Box */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#C8A97E] shadow-xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE3]">
            <h3 className="font-serif-editorial text-xl text-[#1E1B18]">
              Create New Service Offering
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-[#8C7A6B] hover:text-[#1E1B18]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Service Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Traditional Royal Introduction"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 2.5 hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Price (USD $) *
              </label>
              <input
                type="number"
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Price (NGN ₦) *
              </label>
              <input
                type="number"
                value={priceNGN}
                onChange={(e) => setPriceNGN(Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Short Editorial Description
              </label>
              <input
                type="text"
                placeholder="e.g. Full coral bead setting, high-humidity sweatproof priming, and custom lip pigments."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Inclusions List (Comma separated)
              </label>
              <input
                type="text"
                value={inclusionsStr}
                onChange={(e) => setInclusionsStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EFEAE3]">
            <label className="flex items-center gap-2 text-xs font-medium text-[#1E1B18] cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-[#1E1B18]"
              />
              <span>Highlight as Signature Offering</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#6B6158] hover:text-[#1E1B18]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#1E1B18] text-white text-xs font-semibold hover:bg-[#322D28]"
              >
                Save Offering
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-editorial text-xl text-[#1E1B18] font-medium">
                      {srv.name}
                    </h4>
                    {srv.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C8A97E]/20 text-[#7C6345] uppercase">
                        Signature
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6158] mt-1">{srv.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
                    {formatPrice(srv.priceUSD, srv.priceNGN)}
                  </div>
                  <div className="text-[11px] text-[#8C7A6B] flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{srv.durationMinutes} mins</span>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div className="pt-4 mt-4 border-t border-[#F5EFE7]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
                  Inclusions:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#5C534B]">
                  {srv.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#C8A97E] shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5EFE7] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#8C7A6B]">
                Active on Public Booking Form
              </span>

              <button
                onClick={() => {
                  if (confirm(`Remove "${srv.name}" from your service menu?`)) {
                    deleteService(srv.id);
                  }
                }}
                className="text-rose-600 hover:text-rose-800 p-1"
                title="Delete Service"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
