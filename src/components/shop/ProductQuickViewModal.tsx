import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  Truck,
  Heart,
  Droplets,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LipglossProduct } from '../../types';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    products,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string>('');

  if (!quickViewProduct) return null;

  const product: LipglossProduct = quickViewProduct;
  const currentShade = selectedShade || product.shadeName;
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentShade);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-4xl rounded-xs shadow-2xl border border-[#E2C9B0]/40 overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Images */}
            <div className="p-6 sm:p-8 bg-[#F4EFEA] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2C9B0]/30">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-xs overflow-hidden bg-white shadow-xs border border-[#E2C9B0]/30 group">
                  <img
                    src={gallery[selectedImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-xs shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {gallery.length > 1 && (
                  <div className="flex gap-2">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImageIndex === idx
                            ? 'border-[#1A1A1A] shadow-xs scale-105'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="pt-6 mt-6 border-t border-[#E2C9B0]/40 grid grid-cols-2 gap-3 text-[11px] text-[#1A1A1A]/75">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#A68F7A]" />
                  <span>Ultra-Hydrating & Non-Sticky</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#A68F7A]" />
                  <span>100% Vegan & Cruelty-Free</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div className="space-y-5">
                {/* Brand & Category */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#A68F7A]">
                      BB Gloss Couture Collection
                    </span>
                    <span className="text-xs text-[#1A1A1A]/60 font-medium">
                      {product.volume}
                    </span>
                  </div>
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-normal leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#A68F7A] font-medium tracking-wide">
                    {product.subtitle}
                  </p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">{product.rating}</span>
                  <span className="text-xs text-[#1A1A1A]/50">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-medium">
                    ${product.price}.00
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#1A1A1A]/40 line-through">
                      ${product.originalPrice}.00
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                      Save ${(product.originalPrice - product.price)}.00
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Shade Indicator */}
                <div className="space-y-2 pt-2 border-t border-[#E2C9B0]/30">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                      Selected Shade:
                    </span>
                    <span className="text-[#A68F7A] font-medium">{currentShade}</span>
                  </div>

                  {/* Shade Swatch Pills */}
                  <div className="flex flex-wrap gap-2">
                    {products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedShade(p.shadeName);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs transition-all cursor-pointer ${
                          (selectedShade === p.shadeName || (!selectedShade && product.shadeName === p.shadeName))
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs font-semibold'
                            : 'border-[#E2C9B0]/50 bg-white text-[#1A1A1A] hover:border-[#1A1A1A]/40'
                        }`}
                        title={p.shadeName}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: p.shadeHex }}
                        />
                        <span className="text-[11px] truncate max-w-[120px]">{p.shadeName.split(' ')[1] || p.shadeName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formula Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Key Ingredients & Benefits:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {product.formulaHighlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#1A1A1A]/80">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aroma & Finish Details */}
                <div className="bg-[#F2EDE7] p-3 rounded-xs text-xs space-y-1 text-[#1A1A1A]/80">
                  <div className="flex justify-between">
                    <span className="text-white/60 text-[#1A1A1A]/60">Finish:</span>
                    <span className="font-semibold text-[#1A1A1A]">{product.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 text-[#1A1A1A]/60">Aroma:</span>
                    <span className="font-semibold text-[#1A1A1A]">{product.scent}</span>
                  </div>
                </div>
              </div>

              {/* Add to Bag Controls */}
              <div className="pt-6 mt-6 border-t border-[#E2C9B0]/40 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E2C9B0]/60 rounded-xs bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-sm font-bold hover:bg-[#F2EDE7] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-[#1A1A1A]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-sm font-bold hover:bg-[#F2EDE7] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] py-3 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E2C9B0]" />
                    <span>Add to Bag • ${(product.price * quantity)}.00</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#A68F7A]" />
                    Free US Priority Shipping over $50
                  </span>
                  <span>•</span>
                  <span>In Stock ({product.stockCount} left)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
