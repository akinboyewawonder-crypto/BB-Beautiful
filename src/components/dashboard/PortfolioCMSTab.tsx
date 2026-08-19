import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Trash2,
  Star,
  Upload,
  Sparkles,
  Tag,
  Maximize2,
  X,
} from 'lucide-react';
import { PortfolioItem } from '../../types';

export const PortfolioCMSTab: React.FC = () => {
  const { portfolio, addPortfolioItem, deletePortfolioItem, togglePortfolioFeatured, updatePortfolioItem } = useApp();

  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PortfolioItem['category']>('Bridal');
  const [newClientName, setNewClientName] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const maxQuota = 30;
  const currentCount = portfolio.length;

  const samplePhotoPresets = [
    {
      title: 'Velvet Plum Red Carpet',
      category: 'Full Glam' as const,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
      clientName: 'Sola Adeleke',
      occasion: 'Annual Charity Ball',
    },
    {
      title: 'Luminous Satin Pearl Bride',
      category: 'Bridal' as const,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      clientName: 'Dr. Tari & Kevin',
      occasion: 'Destination Beach Wedding',
    },
    {
      title: 'Traditional Coral Gold Sculpt',
      category: 'Traditional' as const,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      clientName: 'Nkechi Eze',
      occasion: 'Traditional Introduction',
    },
  ];

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addPortfolioItem({
      title: newTitle,
      category: newCategory,
      image: newImageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      clientName: newClientName || undefined,
      occasion: newOccasion || undefined,
      featured: isFeatured,
    });

    setNewTitle('');
    setNewClientName('');
    setNewOccasion('');
    setNewImageUrl('');
    setIsFeatured(false);
    setIsUploading(false);
  };

  const handleApplyPreset = (preset: (typeof samplePhotoPresets)[0]) => {
    setNewTitle(preset.title);
    setNewCategory(preset.category);
    setNewClientName(preset.clientName);
    setNewOccasion(preset.occasion);
    setNewImageUrl(preset.image);
    setIsUploading(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Storage Quota */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Portfolio Curation & Image CMS
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Organize high-resolution editorial photos, pin featured wedding transformations, and manage categories.
          </p>
        </div>

        {/* Quota Badge & Upload Button */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[#FAF5ED] border border-[#E6DDD2] text-xs text-[#7C6345] font-semibold flex items-center gap-1.5">
            <span>Portfolio Storage:</span>
            <strong className="text-[#1E1B18]">{currentCount} / {maxQuota}</strong>
          </div>

          <button
            onClick={() => setIsUploading(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#322D28] transition-all shadow-sm cursor-pointer shrink-0"
          >
            <Upload className="w-4 h-4 text-[#C8A97E]" />
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>

      {/* Upload Modal / Form */}
      {isUploading && (
        <form
          onSubmit={handleSaveItem}
          className="p-6 rounded-3xl bg-white border-2 border-[#C8A97E] shadow-xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE3]">
            <h3 className="font-serif-editorial text-xl text-[#1E1B18]">
              Publish New Look to Editorial Portfolio
            </h3>
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="text-[#8C7A6B] hover:text-[#1E1B18]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#E6DDD2] text-xs">
            <span className="text-[#7C6345] font-semibold block mb-1.5">Quick Demo Image Presets:</span>
            <div className="flex flex-wrap gap-2">
              {samplePhotoPresets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1 rounded bg-white hover:bg-[#1E1B18] hover:text-white border border-[#D9D0C5] text-[11px] font-medium transition-colors"
                >
                  + {p.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Project / Look Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Royal Emerald Bride"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Editorial Category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              >
                <option value="Bridal">Bridal</option>
                <option value="Traditional">Traditional</option>
                <option value="Soft Glam">Soft Glam</option>
                <option value="Full Glam">Full Glam</option>
                <option value="Photoshoot">Photoshoot / Editorial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Client / Model Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Elena & Marcus"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Occasion / Venue (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Destination Lake Como"
                value={newOccasion}
                onChange={(e) => setNewOccasion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Image Web URL (Unsplash or CDN link)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
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
              <span>Pin as Featured / Hero Editorial Image</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsUploading(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#6B6158] hover:text-[#1E1B18]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#1E1B18] text-white text-xs font-semibold hover:bg-[#322D28]"
              >
                Publish to Portfolio
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid of Portfolio Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-white border border-[#E0D7CC] shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
          >
            <div>
              <div className="relative aspect-[4/3] bg-[#EAE2D8] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-white/90 backdrop-blur-sm text-[#1E1B18] shadow-xs">
                  {item.category}
                </span>

                {item.featured && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C8A97E] text-[#151413] shadow-xs flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-[#151413]" /> Featured
                  </span>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-serif-editorial text-lg text-[#1E1B18] font-medium leading-snug">
                  {item.title}
                </h4>
                {item.clientName && (
                  <p className="text-[11px] text-[#8C7A6B] mt-0.5">
                    {item.clientName} {item.occasion ? `• ${item.occasion}` : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="px-4 pb-4 pt-0 border-t border-[#F5EFE7] mt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => togglePortfolioFeatured(item.id)}
                className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
                  item.featured ? 'text-[#C8A97E] font-semibold' : 'text-[#8C7A6B] hover:text-[#1E1B18]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-[#C8A97E]' : ''}`} />
                <span>{item.featured ? 'Featured' : 'Pin Feature'}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Remove "${item.title}" from portfolio?`)) {
                    deletePortfolioItem(item.id);
                  }
                }}
                className="text-rose-600 hover:text-rose-800 p-1"
                title="Delete photo"
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
