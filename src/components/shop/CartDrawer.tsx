import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
  Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    openCheckout,
    artistProfile,
    showToast,
  } = useApp();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>({
    code: 'GLOSS10',
    percent: 10,
  });

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const discountAmount = appliedPromo ? (cartTotal * appliedPromo.percent) / 100 : 0;
  const shippingFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 5.0;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'GLOSS10') {
      setAppliedPromo({ code: 'GLOSS10', percent: 10 });
      showToast('Promo code GLOSS10 applied (10% OFF)!', 'success');
      setPromoCodeInput('');
    } else if (code === 'BRIDALGLAM') {
      setAppliedPromo({ code: 'BRIDALGLAM', percent: 15 });
      showToast('VIP Bridal Code BRIDALGLAM applied (15% OFF)!', 'success');
      setPromoCodeInput('');
    } else {
      showToast('Invalid promo code. Try "GLOSS10" or "BRIDALGLAM"', 'error');
    }
  };

  const handleWhatsAppOrder = () => {
    const itemList = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (${item.selectedShade || item.product.shadeName}) - $${item.product.price * item.quantity}`
      )
      .join('\n');

    const msg = `Hello ${artistProfile.name},

I would like to place an order from your BB Gloss Couture Collection:

${itemList}

• Subtotal: $${cartTotal.toFixed(2)}
• Total with shipping: $${finalTotal.toFixed(2)}

Please let me know how to finalize payment and shipping details!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Window */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#FAF9F6] text-[#1A1A1A] shadow-2xl flex flex-col justify-between border-l border-[#E2C9B0]/40"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#E2C9B0]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#A68F7A]" />
                <div>
                  <h3 className="font-serif-editorial text-xl text-[#1A1A1A] font-medium leading-none">
                    Shopping Bag
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-[#A68F7A] font-semibold">
                    {cartCount} {cartCount === 1 ? 'Item' : 'Items'} Selected
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F2EDE7] rounded-full transition-colors cursor-pointer"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-[#F4EFEA] px-6 py-3 border-b border-[#E2C9B0]/30 text-xs">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-medium text-[#1A1A1A] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A68F7A]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">You unlocked FREE Priority Shipping!</span>
                  ) : (
                    <span>Add <strong className="text-[#1A1A1A] font-bold">${remainingForFreeShipping.toFixed(2)}</strong> for Free Shipping</span>
                  )}
                </span>
                <span className="font-bold text-[#A68F7A]">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2C9B0]/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1A1A1A] transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2EDE7] flex items-center justify-center mx-auto text-[#A68F7A]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif-editorial text-xl text-[#1A1A1A]">Your bag is empty</h4>
                    <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto">
                      Explore the BB Gloss Couture line to experience non-sticky high-shine lip glazes.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FAF9F6] px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-[#2A2A2A] transition-all"
                  >
                    <span>Browse Lip Glazes</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E2C9B0]" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 bg-white rounded-xs border border-[#E2C9B0]/30 shadow-2xs transition-all hover:border-[#E2C9B0]/70"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-xs shrink-0 bg-[#F4EFEA]"
                    />

                    {/* Info & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-[#1A1A1A] truncate max-w-[170px]">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: item.product.shadeHex }}
                            />
                            <span className="text-[11px] text-[#A68F7A] font-medium truncate">
                              {item.selectedShade || item.product.shadeName}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#1A1A1A]/40 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E2C9B0]/60 rounded-xs bg-[#FAF9F6]">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#1A1A1A] hover:bg-[#E2C9B0]/30 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-[#1A1A1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#1A1A1A] hover:bg-[#E2C9B0]/30 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif-editorial text-sm font-semibold text-[#1A1A1A]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 bg-white border-t border-[#E2C9B0]/40 space-y-4 shadow-lg">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#A68F7A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. GLOSS10)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider bg-[#FAF9F6] border border-[#E2C9B0]/50 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#FAF9F6] hover:bg-[#E2C9B0]/40 text-[#1A1A1A] px-3.5 py-2 text-xs font-bold uppercase tracking-wider border border-[#E2C9B0]/60 rounded-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xs">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Code <strong>{appliedPromo.code}</strong> Applied ({appliedPromo.percent}% OFF)
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-emerald-900 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotal Calculations */}
                <div className="space-y-1.5 text-xs text-[#1A1A1A]/80 border-t border-b border-[#F2EDE7] py-2.5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">${cartTotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({appliedPromo.percent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-[#F2EDE7] text-sm">
                    <span className="font-bold text-[#1A1A1A]">Estimated Total</span>
                    <span className="font-serif-editorial text-lg font-bold text-[#1A1A1A]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTAs */}
                <div className="space-y-2">
                  <button
                    onClick={openCheckout}
                    className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] py-3.5 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#E2C9B0]" />
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#F2EDE7] hover:bg-[#EAE3DB] text-[#1A1A1A] py-2.5 px-6 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-[#E2C9B0]/40 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Quick Buy via WhatsApp</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] text-[#1A1A1A]/60 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Secure Encrypted Checkout
                  </span>
                  <span>•</span>
                  <span>100% Satisfaction Guaranteed</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
