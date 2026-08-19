import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle,
  Package,
  Truck,
  Copy,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    lastCompletedOrder,
    setLastCompletedOrder,
    artistProfile,
    showToast,
    setActiveView,
  } = useApp();

  if (!lastCompletedOrder) return null;

  const order = lastCompletedOrder;

  const handleCopyTracking = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      showToast('Tracking number copied to clipboard', 'info');
    }
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello ${artistProfile.name},

I just placed order *${order.id}* for $${order.total.toFixed(2)} on your website. 
Tracking: ${order.trackingNumber || 'Processing'}

Could you please confirm receipt and dispatch timeline? Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLastCompletedOrder(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Receipt Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-2xl rounded-xs shadow-2xl border border-[#E2C9B0]/40 overflow-hidden z-10 my-6"
        >
          {/* Close button */}
          <button
            onClick={() => setLastCompletedOrder(null)}
            className="absolute top-4 right-4 p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] rounded-full hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Celebration Banner */}
          <div className="bg-[#1A1A1A] text-[#FAF9F6] p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
            <div className="w-14 h-14 bg-[#E2C9B0]/20 rounded-full flex items-center justify-center mx-auto text-[#E2C9B0]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2C9B0]">
                Payment Authorized & Confirmed
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal">
                Thank You for Your Order
              </h2>
              <p className="text-xs text-[#FAF9F6]/80 max-w-md mx-auto font-light">
                Your BB Gloss Couture collection items are being hand-packed in our signature gold satin gift box.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Order Reference Box */}
            <div className="p-4 bg-white rounded-xs border border-[#E2C9B0]/50 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A68F7A] font-bold block">
                  Order Reference
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#1A1A1A]">
                  {order.id}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A68F7A] font-bold block">
                  Tracking Code
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1A1A1A]">
                  <span>{order.trackingNumber || 'Pending Dispatch'}</span>
                  {order.trackingNumber && (
                    <button
                      onClick={handleCopyTracking}
                      className="p-1 hover:text-[#A68F7A] text-[#1A1A1A]/60"
                      title="Copy Tracking"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A68F7A] font-bold block">
                  Status
                </span>
                <span className="inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-xs bg-amber-100 text-amber-900">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Itemized Order List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                Purchased Items ({order.items.length})
              </h4>
              <div className="divide-y divide-[#E2C9B0]/30 border border-[#E2C9B0]/40 rounded-xs bg-white">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded-xs bg-[#F4EFEA]"
                      />
                      <div>
                        <div className="font-bold text-[#1A1A1A]">{item.productName}</div>
                        <div className="text-[11px] text-[#A68F7A]">
                          Shade: {item.shadeName} • Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-serif-editorial text-sm font-semibold text-[#1A1A1A]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#F4EFEA] rounded-xs border border-[#E2C9B0]/30 space-y-1">
                <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A68F7A]" />
                  Shipping Destination
                </div>
                <div className="text-[#1A1A1A]/80">{order.customerName}</div>
                <div className="text-[#1A1A1A]/70">{order.shippingAddress.street}</div>
                <div className="text-[#1A1A1A]/70">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </div>
              </div>

              <div className="p-3.5 bg-[#F4EFEA] rounded-xs border border-[#E2C9B0]/30 space-y-1">
                <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">
                  Financial Summary
                </div>
                <div className="flex justify-between text-[#1A1A1A]/80">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#1A1A1A]/80">
                  <span>Shipping:</span>
                  <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[#1A1A1A] pt-1 border-t border-[#E2C9B0]/40">
                  <span>Total Paid:</span>
                  <span className="font-serif-editorial text-sm font-bold text-[#1A1A1A]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#F2EDE7] hover:bg-[#EAE3DB] text-[#1A1A1A] py-3 px-6 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-[#E2C9B0]/40 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Message BB Beauty Pro on WhatsApp regarding this order</span>
              </button>

              <button
                onClick={() => {
                  setLastCompletedOrder(null);
                  setActiveView('shop');
                }}
                className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white py-3 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Continue Exploring the Boutique</span>
                <ArrowRight className="w-4 h-4 text-[#E2C9B0]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
