import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Star,
  Eye,
  Sparkles,
  Heart,
  Droplets,
  Award,
  Check,
  ArrowRight,
  Filter,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';
import { LipglossProduct } from '../../types';

interface ShopSectionProps {
  isFullPageView?: boolean;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ isFullPageView = false }) => {
  const {
    products,
    addToCart,
    setQuickViewProduct,
    openCart,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeShadeSelections, setActiveShadeSelections] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: 'All Glazes' },
    { id: 'bestseller', label: 'Best Sellers' },
    { id: 'hydrating', label: 'Glass Finish' },
    { id: 'plumping', label: 'Plumping Peptide' },
    { id: 'nude', label: 'Velvet Nudes' },
    { id: 'bundle', label: 'Vaults & Bundles' },
  ];

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (!product.active) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'bestseller') return product.isBestSeller;
    if (selectedCategory === 'hydrating') return product.finish.toLowerCase().includes('glass') || product.name.toLowerCase().includes('crystal');
    if (selectedCategory === 'plumping') return product.finish.toLowerCase().includes('plump') || product.name.toLowerCase().includes('honey');
    if (selectedCategory === 'nude') return product.finish.toLowerCase().includes('velvet') || product.name.toLowerCase().includes('caramel') || product.name.toLowerCase().includes('rose');
    if (selectedCategory === 'bundle') return product.isBundle || product.name.toLowerCase().includes('vault');
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const handleSelectShade = (productId: string, shadeName: string) => {
    setActiveShadeSelections((prev) => ({ ...prev, [productId]: shadeName }));
  };

  return (
    <section
      id="shop"
      className={`relative w-full ${isFullPageView ? 'py-12 sm:py-16' : 'py-20 sm:py-28'} bg-[#FAF9F6] text-[#1A1A1A]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2C9B0]/20 border border-[#E2C9B0]/40 text-[#A68F7A] text-[11px] uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3 h-3 text-[#A68F7A]" />
            <span>The Signature Lip Gloss Collection</span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1A1A1A] font-normal tracking-tight">
            BB Gloss Couture
          </h2>

          <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed max-w-2xl mx-auto">
            Curated and formulated by celebrity artist BB Beauty Pro. Glass-like mirror shine, 
            zero stickiness, infused with Maxi-Lip™ peptides and organic botanicals for 8-hour pillow softness.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E2C9B0]/40 pb-5">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F2EDE7] border border-[#E2C9B0]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-[#1A1A1A]/60 flex items-center gap-1 text-[11px] uppercase font-bold tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A68F7A]" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E2C9B0]/60 rounded-xs px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Curated & Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {sortedProducts.map((product) => {
            const selectedShade = activeShadeSelections[product.id] || product.shadeName;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group flex flex-col justify-between bg-white rounded-xs border border-[#E2C9B0]/40 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#A68F7A]/60 transition-all duration-300"
              >
                {/* Image Container with Badges & Hover Actions */}
                <div className="relative aspect-4/5 overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#1A1A1A]/90 backdrop-blur-xs text-[#FAF9F6] text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-xs shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white/95 hover:bg-white text-[#1A1A1A] px-4 py-2 rounded-xs text-[11px] uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#A68F7A]" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Shade Swatch Overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xs flex items-center gap-1.5 border border-black/5 shadow-2xs">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: product.shadeHex }}
                    />
                    <span className="text-[10px] font-semibold text-[#1A1A1A] truncate max-w-[100px]">
                      {product.shadeName}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#1A1A1A] text-[11px]">{product.rating}</span>
                        <span className="text-[#1A1A1A]/40 text-[10px]">({product.reviewCount})</span>
                      </div>
                      <span className="text-[10px] text-[#A68F7A] font-semibold uppercase tracking-wider">
                        {product.finish}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-serif-editorial text-lg text-[#1A1A1A] font-medium leading-snug group-hover:text-[#A68F7A] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#1A1A1A]/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="space-y-3 pt-3 border-t border-[#E2C9B0]/30">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-editorial text-xl font-medium text-[#1A1A1A]">
                          ${product.price}.00
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#1A1A1A]/40 line-through">
                            ${product.originalPrice}.00
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A68F7A] font-semibold">
                        {product.volume}
                      </span>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      onClick={() => addToCart(product, 1, selectedShade)}
                      className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] py-2.5 px-4 rounded-xs text-[11px] uppercase tracking-[0.18em] font-bold flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#E2C9B0]" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luxury Formula Banner */}
        <div className="bg-[#1A1A1A] text-[#FAF9F6] rounded-xs p-8 sm:p-12 relative overflow-hidden border border-[#E2C9B0]/30">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2C9B0]">
                Clean Glamour Standard
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-4xl text-white font-normal leading-tight">
                Why BB Gloss Outshines Everything Else
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/80 font-light leading-relaxed max-w-xl">
                Every bottle is infused with ultra-hydrating cold-pressed Jojoba, Vitamin E spheres, 
                and volumetric peptides. Formulated to cushion lips during bridal ceremonies, photo shoots, and everyday glamour.
              </p>
            </div>

            <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2.5 text-xs text-[#FAF9F6]">
                <Check className="w-4 h-4 text-[#E2C9B0]" />
                <span>Zero Stickiness, High Mirror Reflectivity</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FAF9F6]">
                <Check className="w-4 h-4 text-[#E2C9B0]" />
                <span>8-Hour Deep Moisture Lock</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FAF9F6]">
                <Check className="w-4 h-4 text-[#E2C9B0]" />
                <span>Custom Vanilla-Berry Aroma</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FAF9F6]">
                <Check className="w-4 h-4 text-[#E2C9B0]" />
                <span>Signature Keepsake Box on Every Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
