import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  Check,
  X,
  Layers,
  Image as ImageIcon,
  DollarSign,
  Tag,
} from 'lucide-react';
import { LipglossProduct } from '../../types';

export const ShopCMSTab: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductActive,
    showToast,
  } = useApp();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [shadeName, setShadeName] = useState('');
  const [shadeHex, setShadeHex] = useState('#D98695');
  const [price, setPrice] = useState('28');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [finish, setFinish] = useState('Glass Mirror Shine');
  const [scent, setScent] = useState('Vanilla Blossom');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');
  const [stockCount, setStockCount] = useState('45');
  const [highlightsInput, setHighlightsInput] = useState('Maxi-Lip Peptides, Hyaluronic Spheres, 8Hr Moisture');

  const handleStartAdd = () => {
    setName('');
    setSubtitle('Ultra-Hydrating Peptide Lip Glaze');
    setShadeName('Amber Rose 09');
    setShadeHex('#C87D74');
    setPrice('28');
    setOriginalPrice('');
    setDescription('A silky, high-shine lip glaze that cushions and visibly plumps lips without any stickiness.');
    setFinish('Glass Mirror Shine');
    setScent('Vanilla Bean');
    setImage('https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80');
    setBadge('New Release');
    setStockCount('50');
    setHighlightsInput('Maxi-Lip Peptides, Cold-Pressed Jojoba, Vitamin E');
    setEditingProductId(null);
    setIsAddingProduct(true);
  };

  const handleStartEdit = (product: LipglossProduct) => {
    setName(product.name);
    setSubtitle(product.subtitle);
    setShadeName(product.shadeName);
    setShadeHex(product.shadeHex);
    setPrice(product.price.toString());
    setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setDescription(product.description);
    setFinish(product.finish);
    setScent(product.scent);
    setImage(product.image);
    setBadge(product.badge || '');
    setStockCount(product.stockCount.toString());
    setHighlightsInput(product.formulaHighlights.join(', '));
    setEditingProductId(product.id);
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      showToast('Please provide Product Name, Price, and Image URL', 'error');
      return;
    }

    const highlights = highlightsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name,
      subtitle: subtitle || 'Signature Lip Glaze',
      shadeName: shadeName || 'Universal Glow',
      shadeHex: shadeHex || '#D98695',
      price: parseFloat(price) || 28,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      description: description || 'Luxurious cushion-soft lip glaze.',
      finish: finish || 'Mirror Gloss',
      scent: scent || 'Vanilla Blossom',
      volume: '6.5 ml / 0.22 fl oz',
      rating: 5.0,
      reviewCount: 48,
      image,
      galleryImages: [image],
      formulaHighlights: highlights.length > 0 ? highlights : ['Hyaluronic Spheres', 'Vitamin E'],
      badge: badge || undefined,
      isBestSeller: badge?.toLowerCase().includes('best') || false,
      isBundle: name.toLowerCase().includes('vault') || name.toLowerCase().includes('bundle'),
      stockCount: parseInt(stockCount, 10) || 50,
      active: true,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsAddingProduct(false);
    setEditingProductId(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2C9B0]/40 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A68F7A] font-bold">
            <ShoppingBag className="w-4 h-4" />
            <span>Store Inventory CMS</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-1">
            BB Lip Gloss Products
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
            Manage your boutique e-commerce catalogue, shade swatches, pricing, and live inventory.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E2C9B0]" />
          <span>Add New Lip Glaze</span>
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {isAddingProduct && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#A68F7A]/40 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2C9B0]/30 pb-4">
            <h3 className="font-serif-editorial text-xl text-[#1A1A1A]">
              {editingProductId ? 'Edit Product Details' : 'Create New Lip Gloss SKU'}
            </h3>
            <button
              onClick={() => setIsAddingProduct(false)}
              className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Rose Glaze"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Subtitle / Formula Type
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Ultra-Hydrating Peptide Lip Glaze"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Shade Name *
              </label>
              <input
                type="text"
                required
                value={shadeName}
                onChange={(e) => setShadeName(e.target.value)}
                placeholder="e.g. Rose Quartz 02"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Shade Hex Color (Swatch Preview)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={shadeHex}
                  onChange={(e) => setShadeHex(e.target.value)}
                  className="w-9 h-9 rounded-lg border border-[#E2C9B0]/60 p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={shadeHex}
                  onChange={(e) => setShadeHex(e.target.value)}
                  placeholder="#D98695"
                  className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Price (USD $) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="28"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Original Price (For Discount Cross-out, optional)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="34"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Finish Style
              </label>
              <input
                type="text"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                placeholder="e.g. Glass Mirror Shine"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Product Image URL *
              </label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Product Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a luxurious description of the lip gloss..."
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Merchandising Badge (e.g. Best Seller, Bridal Pick)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Bridal Favorite"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Inventory Stock Count
              </label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                Key Formula Highlights (Comma-separated)
              </label>
              <input
                type="text"
                value={highlightsInput}
                onChange={(e) => setHighlightsInput(e.target.value)}
                placeholder="Maxi-Lip Peptides, Hyaluronic Spheres, 8Hr Moisture"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddingProduct(false)}
                className="px-4 py-2 border border-[#E2C9B0]/60 rounded-lg text-xs font-bold text-[#1A1A1A] hover:bg-[#FAF9F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-2 rounded-lg text-xs uppercase tracking-wider font-bold shadow-xs cursor-pointer"
              >
                {editingProductId ? 'Save Product Changes' : 'Publish Product to Boutique'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs flex flex-col justify-between ${
              p.active ? 'border-[#E2C9B0]/50' : 'border-gray-200 opacity-60'
            }`}
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-[#F4EFEA]">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-0.5 rounded-xs text-[10px] font-bold text-[#1A1A1A]">
                  Stock: {p.stockCount}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#A68F7A]">
                    {p.finish}
                  </span>
                  <span className="font-serif-editorial text-lg font-bold text-[#1A1A1A]">
                    ${p.price}.00
                  </span>
                </div>

                <h3 className="font-serif-editorial text-lg font-medium text-[#1A1A1A] leading-snug">
                  {p.name}
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: p.shadeHex }}
                  />
                  <span className="font-semibold text-[#1A1A1A]">{p.shadeName}</span>
                </div>

                <p className="text-xs text-[#1A1A1A]/70 line-clamp-2">{p.description}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#FAF9F6] border-t border-[#E2C9B0]/30 flex items-center justify-between">
              <button
                onClick={() => toggleProductActive(p.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  p.active ? 'text-emerald-700 hover:bg-emerald-50' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {p.active ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Active in Store</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(p)}
                  className="p-1.5 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white rounded-md"
                  title="Edit Product"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
