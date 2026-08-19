import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    isCheckoutOpen,
    closeCheckout,
    createShopOrder,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'PayPal'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');

  if (!isCheckoutOpen) return null;

  const freeShippingThreshold = 50;
  const shippingFee = shippingMethod === 'express' ? 15 : cartTotal >= freeShippingThreshold ? 0 : 5.0;
  const promoDiscount = 0; // or applied
  const finalTotal = cartTotal + shippingFee - promoDiscount;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !street || !city || !zipCode) {
      showToast('Please fill in all required shipping address fields', 'error');
      return;
    }
    setStep(2);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      createShopOrder({
        customerName: fullName || 'Elena Rostova',
        customerEmail: email || 'elena.rostova@example.com',
        customerPhone: phone || '+1 (555) 382-9481',
        shippingAddress: {
          street: street || '120 West 57th Street',
          city: city || 'New York',
          state: state || 'NY',
          zipCode: zipCode || '10019',
          country: country || 'United States',
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          shadeName: item.selectedShade || item.product.shadeName,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        subtotal: cartTotal,
        shippingFee,
        discountAmount: promoDiscount,
        total: finalTotal,
        paymentMethod,
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          className="relative bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-4xl rounded-xs shadow-2xl border border-[#E2C9B0]/40 overflow-hidden z-10 my-6"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-[#E2C9B0]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#A68F7A]">
                BB Beauty Pro • Boutique Checkout
              </span>
            </div>
            <button
              onClick={closeCheckout}
              className="p-1 text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center gap-3 text-xs border-b border-[#E2C9B0]/30 pb-4">
                <span
                  className={`flex items-center gap-1.5 font-bold uppercase tracking-wider ${
                    step === 1 ? 'text-[#1A1A1A]' : 'text-[#A68F7A]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Shipping Details
                </span>

                <span className="text-white/40 text-[#1A1A1A]/30">›</span>

                <span
                  className={`flex items-center gap-1.5 font-bold uppercase tracking-wider ${
                    step === 2 ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      step === 2 ? 'bg-[#1A1A1A] text-white' : 'bg-[#E2C9B0]/40 text-[#1A1A1A]'
                    }`}
                  >
                    2
                  </span>
                  Payment & Review
                </span>
              </div>

              {step === 1 ? (
                /* Step 1: Address Form */
                <form onSubmit={handleProceedToPayment} className="space-y-4">
                  <h3 className="font-serif-editorial text-xl text-[#1A1A1A]">
                    Customer & Delivery Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                        Email Address (Order Confirmation) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number (Tracking SMS)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Beverly Hills"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="CA"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A] mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="90210"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E2C9B0]/60 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Speed Selection */}
                  <div className="pt-3 space-y-2">
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A]">
                      Shipping Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <label
                        className={`flex items-start justify-between p-3 rounded-xs border cursor-pointer transition-all ${
                          shippingMethod === 'standard'
                            ? 'border-[#1A1A1A] bg-white shadow-xs'
                            : 'border-[#E2C9B0]/50 bg-[#FAF9F6]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="text-[#1A1A1A]"
                          />
                          <div>
                            <div className="font-bold text-[#1A1A1A]">Standard Priority</div>
                            <div className="text-[11px] text-[#1A1A1A]/60">3–5 Business Days</div>
                          </div>
                        </div>
                        <span className="font-bold text-[#1A1A1A]">
                          {cartTotal >= freeShippingThreshold ? 'FREE' : '$5.00'}
                        </span>
                      </label>

                      <label
                        className={`flex items-start justify-between p-3 rounded-xs border cursor-pointer transition-all ${
                          shippingMethod === 'express'
                            ? 'border-[#1A1A1A] bg-white shadow-xs'
                            : 'border-[#E2C9B0]/50 bg-[#FAF9F6]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="text-[#1A1A1A]"
                          />
                          <div>
                            <div className="font-bold text-[#1A1A1A]">Express VIP Courier</div>
                            <div className="text-[11px] text-[#1A1A1A]/60">1–2 Business Days</div>
                          </div>
                        </div>
                        <span className="font-bold text-[#1A1A1A]">$15.00</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-6 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4 text-[#E2C9B0]" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Payment Details */
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-editorial text-xl text-[#1A1A1A]">
                      Select Payment Method
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#A68F7A] hover:text-[#1A1A1A] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Edit Shipping Info</span>
                    </button>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['Credit Card', 'Apple Pay', 'PayPal'] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-3 text-xs font-bold uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                          paymentMethod === method
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                            : 'border-[#E2C9B0]/60 bg-white text-[#1A1A1A] hover:border-[#1A1A1A]/40'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'Credit Card' && (
                    <div className="p-4 bg-white rounded-xs border border-[#E2C9B0]/50 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#1A1A1A]">
                          Card Information (Encrypted)
                        </span>
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/50 rounded-xs text-xs font-mono focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                            Expires (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/50 rounded-xs text-xs font-mono focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                            Security CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/50 rounded-xs text-xs font-mono focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod !== 'Credit Card' && (
                    <div className="p-6 bg-white rounded-xs border border-[#E2C9B0]/50 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-sm text-[#1A1A1A]">
                        One-Touch {paymentMethod} Integration Active
                      </h4>
                      <p className="text-xs text-[#1A1A1A]/70 max-w-sm mx-auto">
                        Clicking place order will securely complete your authorization.
                      </p>
                    </div>
                  )}

                  {/* Delivery summary */}
                  <div className="p-3 bg-[#F2EDE7] rounded-xs text-xs space-y-1 text-[#1A1A1A]/80">
                    <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">
                      Shipping to:
                    </div>
                    <div>{fullName || 'Elena Rostova'} • {street || '742 Evergreen Terrace'}</div>
                    <div>{city || 'Beverly Hills'}, {state || 'CA'} {zipCode || '90210'}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A] hover:text-[#A68F7A]"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleCompleteOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] py-3.5 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Authorizing & Preparing Parcel...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#E2C9B0]" />
                          <span>Place Order • ${finalTotal.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-[#F4EFEA] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#E2C9B0]/30 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2C9B0]/40">
                  <h4 className="font-serif-editorial text-lg text-[#1A1A1A]">Order Summary</h4>
                  <span className="text-xs text-[#A68F7A] font-semibold">{cart.length} Products</span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-xs">
                      <div className="relative w-12 h-12 rounded-xs overflow-hidden bg-white shrink-0 border border-[#E2C9B0]/30">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-0 right-0 bg-[#1A1A1A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#1A1A1A] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#A68F7A]">{item.selectedShade || item.product.shadeName}</div>
                      </div>
                      <div className="font-semibold text-[#1A1A1A]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-1.5 text-xs text-[#1A1A1A]/80 border-t border-[#E2C9B0]/40 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E2C9B0]/30 text-sm">
                    <span className="font-bold text-[#1A1A1A]">Total Due</span>
                    <span className="font-serif-editorial text-lg font-bold text-[#1A1A1A]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="pt-6 mt-6 border-t border-[#E2C9B0]/40 space-y-2 text-[11px] text-[#1A1A1A]/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-Bit SSL Bank Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A68F7A] shrink-0" />
                  <span>Signature Gold Keepsake Packaging Included</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
