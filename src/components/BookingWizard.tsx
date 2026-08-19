import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  Upload,
  MessageCircle,
  Copy,
  ShieldCheck,
  AlertCircle,
  Search,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingRequest } from '../types';

export const BookingWizard: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    services,
    bookingQuestions,
    artistProfile,
    formatPrice,
    currency,
    createBookingRequest,
    preselectedServiceId,
    setActiveView,
    setLookupReference,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [createdBooking, setCreatedBooking] = useState<BookingRequest | null>(null);

  // Form Fields
  const [eventType, setEventType] = useState('White Wedding / Bridal');
  const [eventDate, setEventDate] = useState('2026-09-18');
  const [eventLocation, setEventLocation] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [makeupStyle, setMakeupStyle] = useState('Timeless Romantic Bridal Glam');
  const [inspirationNote, setInspirationNote] = useState('');

  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Payment proof upload state
  const [paymentProofFile, setPaymentProofFile] = useState<string | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  // Available slots for selected date
  const availableSlots = [
    { time: '08:30 AM', status: 'available' },
    { time: '11:30 AM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '05:30 PM', status: 'available' },
  ];

  // Set default service
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    } else if (services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
  }, [preselectedServiceId, services]);

  // Reset when modal opens
  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
      setCreatedBooking(null);
      setPaymentProofFile(null);
    }
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const activeQuestions = bookingQuestions.filter((q) => q.enabled).sort((a, b) => a.order - b.order);

  // Price Calculation
  const totalUSD = (currentService?.priceUSD || 0) * (numberOfPeople > 1 ? 1 + (numberOfPeople - 1) * 0.75 : 1);
  const totalNGN = (currentService?.priceNGN || 0) * (numberOfPeople > 1 ? 1 + (numberOfPeople - 1) * 0.75 : 1);
  const depositUSD = Math.round((totalUSD * artistProfile.bankDetails.depositPercentage) / 100);
  const depositNGN = Math.round((totalNGN * artistProfile.bankDetails.depositPercentage) / 100);

  // Formatted WhatsApp message preview
  const whatsAppMessage = `Hello BB Beauty Pro,

My name is ${clientName || '[Your Name]'}.
I would like to reserve an exclusive luxury makeup session with BB Beauty Pro.

• Event: ${eventType}
• Date: ${eventDate}
• Preferred Time: ${selectedTimeSlot}
• Location: ${eventLocation || 'Studio / On-Location'}
• Service: ${currentService?.name}
• Style: ${makeupStyle}
• Number of Guests: ${numberOfPeople}
${inspirationNote ? `• Notes: ${inspirationNote}` : ''}

Looking forward to confirming availability and next steps. Thank you!`;

  const handleCustomAnswerChange = (questionText: string, value: string) => {
    setCustomAnswers((prev) => ({ ...prev, [questionText]: value }));
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingProof(true);
      setTimeout(() => {
        // Simulated uploaded receipt image
        setPaymentProofFile('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
        setIsUploadingProof(false);
      }, 600);
    }
  };

  const handleSubmitBooking = () => {
    const newReq = createBookingRequest({
      clientName: clientName || 'Sarah Johnson',
      clientEmail: clientEmail || 'client@example.com',
      clientPhone: clientPhone || '+1 (555) 382-9481',
      serviceId: currentService?.id || 'srv-1',
      serviceName: currentService?.name || 'The Bridal Heirloom Experience',
      eventType,
      eventDate,
      timeSlot: selectedTimeSlot,
      location: eventLocation || 'Luxury Studio / Private Suite',
      numberOfPeople,
      makeupStyle,
      inspirationNote,
      customAnswers,
      totalAmountUSD: totalUSD,
      totalAmountNGN: totalUSD,
      depositPaidUSD: paymentProofFile ? depositUSD : 0,
      depositPaidNGN: paymentProofFile ? depositUSD : 0,
      status: paymentProofFile ? 'payment_submitted' : 'pending',
      paymentProofUrl: paymentProofFile || undefined,
      paymentSubmittedAt: paymentProofFile ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
    });

    setCreatedBooking(newReq);
    setStep(7); // Jump to Confirmation & Receipt Tracker Step
  };

  const copyWhatsAppText = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#151413]/70 backdrop-blur-sm overflow-y-auto">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FAF9F6] w-full max-w-3xl rounded-sm shadow-2xl border border-[#E2C9B0]/40 overflow-hidden my-auto relative flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E2C9B0]/30 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#A68F7A]">
              BB Beauty Pro Studio Concierge
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#1A1A1A] font-normal">
              {step === 7 ? 'Booking Request Submitted' : 'Reserve Your Appointment'}
            </h3>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 text-[#A68F7A] hover:text-[#1A1A1A] hover:bg-[#F2EDE7] rounded-xs transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step < 7 && (
          <div className="bg-[#F2EDE7] px-6 py-3 border-b border-[#E2C9B0]/30 flex items-center justify-between text-xs text-[#1A1A1A]/70">
            <div className="flex items-center gap-2 font-semibold text-[11px] uppercase tracking-wider text-[#1A1A1A]">
              <span className="w-5 h-5 rounded-xs bg-[#1A1A1A] text-[#FAF9F6] flex items-center justify-center text-[10px] font-bold">
                {step}
              </span>
              <span>
                {step === 1 && 'Step 1: Your Event Details'}
                {step === 2 && 'Step 2: Service & Makeup Aesthetic'}
                {step === 3 && 'Step 3: Bespoke Questions'}
                {step === 4 && 'Step 4: Calendar & Time Slot'}
                {step === 5 && 'Step 5: Contact Details'}
                {step === 6 && 'Step 6: Review & WhatsApp'}
              </span>
            </div>

            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-xs transition-all ${
                    s === step
                      ? 'w-6 bg-[#E2C9B0]'
                      : s < step
                      ? 'w-3 bg-[#1A1A1A]'
                      : 'w-3 bg-[#E2C9B0]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-[#1A1A1A]">
          
          {/* STEP 1: EVENT DETAILS */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  What type of event are you preparing for? *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                >
                  <option value="White Wedding / Bridal">White Wedding / Bridal Ceremony</option>
                  <option value="Traditional Wedding Ceremony">Traditional Wedding Ceremony (Engagement / Nikkah)</option>
                  <option value="Red Carpet / Black Tie Gala">Red Carpet / Black Tie Gala</option>
                  <option value="Editorial / Campaign Shoot">Editorial / Campaign Shoot</option>
                  <option value="Birthday / Celebration">Birthday Celebration</option>
                  <option value="Other Special Event">Other VIP Special Occasion</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                    Number of Faces requiring makeup
                  </label>
                  <select
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value={1}>1 Person (Just Me)</option>
                    <option value={2}>2 Persons (e.g. Bride + Maid of Honor)</option>
                    <option value={3}>3 Persons</option>
                    <option value={4}>4 Persons (Bridal Suite)</option>
                    <option value={6}>6+ Persons (Full Glam Squad)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  Glam Session Location / Venue *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#A68F7A] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. Studio in Ikoyi OR Hotel Suite / Private Residence address"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <p className="text-[11px] text-[#A68F7A] mt-1.5">
                  Nicole is available at the private Ikoyi Penthouse Studio or on-location worldwide.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MAKEUP SERVICE & STYLE */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-3">
                  Select Desired Service Package *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.filter(s => s.active).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-xs border cursor-pointer transition-all ${
                        selectedServiceId === service.id
                          ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A] shadow-sm'
                          : 'border-[#E2C9B0]/40 bg-white/70 hover:bg-white hover:border-[#E2C9B0]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-serif-editorial text-base text-[#1A1A1A] font-normal leading-snug">
                          {service.name}
                        </h4>
                        <div className="font-bold text-xs text-[#1A1A1A] shrink-0">
                          {formatPrice(service.priceUSD, service.priceNGN)}
                        </div>
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  Preferred Makeup Aesthetic *
                </label>
                <select
                  value={makeupStyle}
                  onChange={(e) => setMakeupStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                >
                  <option value="Timeless Romantic Bridal Glam">Timeless Romantic Bridal Glam</option>
                  <option value="Luminous Clean Glass Skin & Fluffy Lashes">Luminous Clean Glass Skin & Fluffy Lashes</option>
                  <option value="Regal Traditional Gold & Sculpted Lips">Regal Traditional Gold & Sculpted Lips</option>
                  <option value="High Drama Red Carpet Smoky Eye">High Drama Red Carpet Smoky Eye</option>
                  <option value="Bespoke Moodboard Consultation">Bespoke Moodboard Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  Inspiration or Special Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Attire color palette, veil placement requirements, or Instagram look reference link..."
                  value={inspirationNote}
                  onChange={(e) => setInspirationNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: DYNAMIC BESPOKE QUESTIONS */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="bg-[#F2EDE7] p-4 rounded-xs border border-[#E2C9B0]/40 text-xs text-[#1A1A1A]/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A68F7A] shrink-0" />
                <span>These customized questions help Nicole prepare formulas tailored specifically to your day.</span>
              </div>

              {activeQuestions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A]">
                    {q.question} {q.required && <span className="text-[#E2C9B0]">*</span>}
                  </label>

                  {q.type === 'select' && q.options && (
                    <select
                      value={customAnswers[q.question] || ''}
                      onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                      className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="">Select an option...</option>
                      {q.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {q.type === 'text' && (
                    <input
                      type="text"
                      placeholder={q.placeholder || 'Your response...'}
                      value={customAnswers[q.question] || ''}
                      onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                      className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  )}

                  {q.type === 'textarea' && (
                    <textarea
                      rows={2}
                      placeholder={q.placeholder || 'Enter details...'}
                      value={customAnswers[q.question] || ''}
                      onChange={(e) => handleCustomAnswerChange(q.question, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 4: LUXURY CALENDAR & TIME SLOT */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  Select Your Preferred Appointment Slot for {eventDate}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`p-4 rounded-xs border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot.time
                          ? 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A] shadow-md'
                          : 'bg-white text-[#1A1A1A] border-[#E2C9B0]/50 hover:border-[#1A1A1A]'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1 opacity-70" />
                      <div className="text-sm font-semibold">{slot.time}</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-75 mt-0.5 font-medium">Available</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-sm bg-white border border-[#E2C9B0]/40 space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F2EDE7]">
                  <span className="text-[#1A1A1A]/70">Selected Service:</span>
                  <span className="font-semibold text-[#1A1A1A]">{currentService?.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F2EDE7]">
                  <span className="text-[#1A1A1A]/70">Duration:</span>
                  <span className="font-semibold text-[#1A1A1A]">{currentService?.durationMinutes} Minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F2EDE7]">
                  <span className="text-[#1A1A1A]/70">Total Investment:</span>
                  <span className="font-bold text-[#1A1A1A]">{formatPrice(totalUSD, totalNGN)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#A68F7A]">
                  <span className="font-medium">Required Deposit ({artistProfile.bankDetails.depositPercentage}%):</span>
                  <span className="font-bold text-[#1A1A1A]">{formatPrice(depositUSD, depositNGN)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: CONTACT INFORMATION */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Johnson"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 812 345 6789"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sarah@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xs bg-white border border-[#E2C9B0]/50 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xs bg-[#F2EDE7] border border-[#E2C9B0]/40 text-xs text-[#1A1A1A]/80 space-y-1">
                <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">Privacy & Communication Guarantee</div>
                <p>We respect your privacy. Your details are used solely for appointment logistics, palette consultation, and arrival updates.</p>
              </div>
            </motion.div>
          )}

          {/* STEP 6: REVIEW & WHATSAPP DIRECT MESSAGE GENERATOR */}
          {step === 6 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Review Summary Card */}
              <div className="p-5 rounded-sm bg-white border border-[#E2C9B0]/40 space-y-3">
                <h4 className="font-serif-editorial text-lg text-[#1A1A1A] border-b border-[#F2EDE7] pb-2">
                  Appointment Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Client</span>
                    <p className="font-semibold text-[#1A1A1A]">{clientName || 'Guest'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Date & Time</span>
                    <p className="font-semibold text-[#1A1A1A]">{eventDate} at {selectedTimeSlot}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Service</span>
                    <p className="font-semibold text-[#1A1A1A]">{currentService?.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Deposit Required</span>
                    <p className="font-semibold text-[#1A1A1A]">{formatPrice(depositUSD, depositNGN)}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Message Preview Simulation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    WhatsApp Direct Message Preview
                  </label>
                  <button
                    type="button"
                    onClick={copyWhatsAppText}
                    className="text-[10px] uppercase tracking-wider text-[#A68F7A] hover:text-[#1A1A1A] flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedWhatsApp ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xs bg-[#F2EDE7] border border-[#E2C9B0]/40 text-xs font-mono whitespace-pre-line text-[#1A1A1A] leading-relaxed shadow-inner">
                  {whatsAppMessage}
                </div>
              </div>

              {/* Deposit Bank Details Box */}
              <div className="p-5 rounded-sm bg-[#1A1A1A] text-[#FAF9F6] border border-[#E2C9B0]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#E2C9B0]">
                    Deposit Instructions ({artistProfile.bankDetails.depositPercentage}%)
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E2C9B0]/20 text-[#E2C9B0] px-2.5 py-0.5 rounded-xs border border-[#E2C9B0]/40">
                    {formatPrice(depositUSD, depositNGN)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#FAF9F6]/80 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[#A68F7A] text-[10px] uppercase font-bold block">Bank:</span>
                    <strong className="text-white">{artistProfile.bankDetails.bankName}</strong>
                  </div>
                  <div>
                    <span className="text-[#A68F7A] text-[10px] uppercase font-bold block">Account Name:</span>
                    <strong className="text-white">{artistProfile.bankDetails.accountName}</strong>
                  </div>
                  <div>
                    <span className="text-[#A68F7A] text-[10px] uppercase font-bold block">Account Number:</span>
                    <strong className="text-white">{artistProfile.bankDetails.accountNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[#A68F7A] text-[10px] uppercase font-bold block">Booking Ref Code:</span>
                    <strong className="text-[#E2C9B0]">#MG-{Math.floor(10000 + Math.random() * 90000)}</strong>
                  </div>
                </div>

                {/* Simulated Payment Proof Upload */}
                <div className="pt-3 border-t border-white/10">
                  <label className="block text-[10px] uppercase tracking-widest text-[#A68F7A] mb-2 font-bold">
                    Upload Payment Proof Screenshot (Optional for instant locking)
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xs border border-dashed border-[#E2C9B0]/40 hover:border-[#E2C9B0] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs text-white">
                    <Upload className="w-4 h-4 text-[#E2C9B0]" />
                    <span>
                      {isUploadingProof
                        ? 'Simulating receipt upload...'
                        : paymentProofFile
                        ? '✓ Receipt Screenshot Attached!'
                        : 'Choose Image / Drag Screenshot'}
                    </span>
                    <input type="file" accept="image/*" onChange={handleSimulatedFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 7: SUCCESS CONFIRMATION & REFERENCE CODE */}
          {step === 7 && createdBooking && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-[#E2C9B0] border-2 border-[#E2C9B0] flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A68F7A]">
                  Appointment Request Logged
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-1">
                  Thank you, {createdBooking.clientName}!
                </h3>
              </div>

              {/* Reference Code Card */}
              <div className="p-6 rounded-sm bg-white border border-[#E2C9B0]/40 shadow-md max-w-md mx-auto space-y-3">
                <div className="text-[10px] font-bold text-[#A68F7A] uppercase tracking-widest">
                  Your Unique Booking Reference
                </div>
                <div className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-[#1A1A1A] select-all bg-[#FAF9F6] py-2.5 rounded-xs border border-[#E2C9B0]/40">
                  {createdBooking.referenceCode}
                </div>
                <p className="text-xs text-[#1A1A1A]/70">
                  Save this reference code to check your booking verification status anytime.
                </p>
              </div>

              <div className="p-4 rounded-xs bg-[#F2EDE7] border border-[#E2C9B0]/40 text-xs text-[#1A1A1A]/80 max-w-md mx-auto text-left space-y-1">
                <div className="font-bold text-[#1A1A1A] text-[10px] uppercase tracking-wider">What happens next?</div>
                <p>1. The BB Beauty Pro team reviews your date, look moodboard & requirements.</p>
                <p>2. Once payment is verified, your calendar slot is locked and you receive full arrival prep instructions.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    closeBookingModal();
                    setLookupReference(createdBooking.referenceCode);
                    setActiveView('status-tracker');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-[#1A1A1A] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A2A2A] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#E2C9B0]" />
                  <span>Check Booking Status Portal</span>
                </button>

                <button
                  onClick={() => {
                    closeBookingModal();
                    setActiveView('dashboard');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest border border-[#1A1A1A] hover:bg-[#F2EDE7] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View in Artist Studio Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A68F7A]" />
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Modal Bottom Actions Footer */}
        {step < 7 && (
          <div className="px-6 py-4 bg-white border-t border-[#E2C9B0]/30 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xs text-[10px] font-bold uppercase tracking-wider text-[#A68F7A] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-7 py-3 rounded-xs bg-[#1A1A1A] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A2A2A] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#E2C9B0]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="px-8 py-3.5 rounded-xs bg-[#1A1A1A] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A2A2A] transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E2C9B0]" />
                <span>Confirm & Submit Request</span>
              </button>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};
