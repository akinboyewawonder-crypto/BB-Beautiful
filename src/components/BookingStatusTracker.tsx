import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
  MessageCircle,
  FileText,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { BookingStatus } from '../types';

export const BookingStatusTracker: React.FC = () => {
  const {
    bookingRequests,
    lookupReference,
    setLookupReference,
    setActiveView,
    formatPrice,
    artistProfile,
    showToast,
  } = useApp();

  const [inputCode, setInputCode] = useState(lookupReference || '#MG-20481');
  const [searchedBooking, setSearchedBooking] = useState(
    bookingRequests.find(
      (b) => b.referenceCode.toLowerCase() === (lookupReference || '#MG-20481').toLowerCase()
    ) || bookingRequests[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim();
    const found = bookingRequests.find(
      (b) => b.referenceCode.toLowerCase() === cleanCode.toLowerCase()
    );
    if (found) {
      setSearchedBooking(found);
      setLookupReference(found.referenceCode);
    } else {
      showToast(`No booking found matching "${cleanCode}". Try #MG-20481 or #MG-19804`, 'error');
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Approved & Calendar Slot Locked
          </span>
        );
      case 'payment_submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Payment Proof Received (Under Verification)
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-[#FAF9F6] text-[#1A1A1A] border border-[#E2C9B0]">
            <Clock className="w-3.5 h-3.5 text-[#A68F7A]" />
            Inquiry Logged (Awaiting Deposit)
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-[#F2EDE7] text-[#1A1A1A] border border-[#A68F7A]">
            <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A]" />
            Appointment Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold bg-rose-50 text-rose-900 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Date Unavailable / Clarification Required
          </span>
        );
    }
  };

  return (
    <div className="min-h-[85vh] py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <button
          onClick={() => setActiveView('public')}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A68F7A] hover:text-[#1A1A1A] mb-8 group transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Aura Artistry Website</span>
        </button>

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-6 h-[1px] bg-[#E2C9B0]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A68F7A]">
              Client Portal
            </span>
            <span className="w-6 h-[1px] bg-[#E2C9B0]" />
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-1">
            Check Booking Status
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 font-light mt-2">
            Enter your booking reference code to view real-time verification and appointment schedule.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="flex rounded-xs bg-white border border-[#E2C9B0]/60 p-1.5 shadow-sm focus-within:border-[#1A1A1A]">
            <div className="flex items-center pl-3 text-[#A68F7A]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. #MG-20481"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[#1A1A1A] bg-transparent focus:outline-none uppercase font-mono tracking-wider font-semibold"
            />
            <button
              type="submit"
              className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FAF9F6] px-6 py-2.5 rounded-xs text-[10px] uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              Lookup
            </button>
          </div>
          <div className="text-center text-[10px] uppercase tracking-wider text-[#A68F7A] mt-2 font-medium">
            Try sample reference: <button type="button" onClick={() => { setInputCode('#MG-20481'); setSearchedBooking(bookingRequests.find(b => b.referenceCode === '#MG-20481') || bookingRequests[0]); }} className="underline font-mono font-bold text-[#1A1A1A] cursor-pointer">#MG-20481</button> or <button type="button" onClick={() => { setInputCode('#MG-19804'); setSearchedBooking(bookingRequests.find(b => b.referenceCode === '#MG-19804') || bookingRequests[0]); }} className="underline font-mono font-bold text-[#1A1A1A] cursor-pointer">#MG-19804</button>
          </div>
        </form>

        {/* Booking Details Card */}
        {searchedBooking ? (
          <div className="bg-white rounded-sm border border-[#E2C9B0]/40 shadow-xl overflow-hidden">
            
            {/* Header Banner */}
            <div className="p-6 sm:p-8 bg-[#1A1A1A] text-[#FAF9F6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2C9B0]/20">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#E2C9B0] font-bold">
                  Booking Reference
                </div>
                <div className="font-serif-editorial text-3xl font-normal text-white mt-0.5">
                  {searchedBooking.referenceCode}
                </div>
                <div className="text-xs text-[#FAF9F6]/75 mt-1">
                  Submitted for <strong className="text-white">{searchedBooking.clientName}</strong> on {searchedBooking.createdAt}
                </div>
              </div>

              <div>
                {getStatusBadge(searchedBooking.status)}
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="p-6 sm:p-8 bg-[#FAF9F6] border-b border-[#E2C9B0]/30">
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#A68F7A] mb-4">
                Appointment Lifecycle
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xs bg-[#1A1A1A] text-[#E2C9B0] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1A]">1. Inquired</div>
                    <div className="text-[11px] text-[#1A1A1A]/65">Request Logged</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    searchedBooking.status !== 'pending' ? 'bg-[#1A1A1A] text-[#E2C9B0]' : 'bg-[#E2C9B0] text-[#1A1A1A] animate-pulse'
                  }`}>
                    {searchedBooking.status !== 'pending' ? '✓' : '2'}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1A]">2. Deposit Proof</div>
                    <div className="text-[11px] text-[#1A1A1A]/65">
                      {searchedBooking.status !== 'pending' ? 'Proof Submitted' : 'Pending Upload'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    searchedBooking.status === 'approved' || searchedBooking.status === 'completed'
                      ? 'bg-[#1A1A1A] text-[#E2C9B0]'
                      : 'bg-[#E2C9B0]/30 text-[#A68F7A]'
                  }`}>
                    {searchedBooking.status === 'approved' || searchedBooking.status === 'completed' ? '✓' : '3'}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1A]">3. Slot Locked</div>
                    <div className="text-[11px] text-[#1A1A1A]/65">
                      {searchedBooking.status === 'approved' ? 'Confirmed in Calendar' : 'Awaiting Review'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    searchedBooking.status === 'completed' ? 'bg-[#1A1A1A] text-[#E2C9B0]' : 'bg-[#E2C9B0]/30 text-[#A68F7A]'
                  }`}>
                    4
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1A]">4. Event Day</div>
                    <div className="text-[11px] text-[#1A1A1A]/65">Sanctuary Glamour</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Service Experience</span>
                  <strong className="text-sm text-[#1A1A1A] font-semibold">{searchedBooking.serviceName}</strong>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Date & Scheduled Time</span>
                  <strong className="text-sm text-[#1A1A1A] font-semibold">{searchedBooking.eventDate} at {searchedBooking.timeSlot}</strong>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Event Type & People</span>
                  <strong className="text-sm text-[#1A1A1A] font-semibold">{searchedBooking.eventType} ({searchedBooking.numberOfPeople} person)</strong>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Glam Location</span>
                  <strong className="text-sm text-[#1A1A1A] font-semibold">{searchedBooking.location}</strong>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Total Investment</span>
                  <strong className="text-sm text-[#1A1A1A] font-bold">{formatPrice(searchedBooking.totalAmountUSD, searchedBooking.totalAmountNGN)}</strong>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68F7A] block">Deposit Status</span>
                  <strong className="text-sm text-emerald-700 font-bold">
                    {searchedBooking.depositPaidUSD > 0
                      ? `${formatPrice(searchedBooking.depositPaidUSD, searchedBooking.depositPaidNGN)} Verified`
                      : 'Pending Deposit'}
                  </strong>
                </div>
              </div>

              {/* Admin note if any */}
              {searchedBooking.adminNotes && (
                <div className="p-4 rounded-xs bg-[#F2EDE7] border border-[#E2C9B0]/40 text-xs text-[#1A1A1A]/85">
                  <strong className="text-[#1A1A1A] block mb-0.5 font-bold uppercase text-[10px] tracking-wider">Concierge Note:</strong>
                  {searchedBooking.adminNotes}
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-6 border-t border-[#F2EDE7] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/${artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-3 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => showToast('Simulating official booking confirmation PDF voucher download...', 'info')}
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#F2EDE7] text-[#1A1A1A] border border-[#E2C9B0] px-5 py-3 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A68F7A]" />
                    <span>Download Voucher</span>
                  </button>
                </div>

                <div className="text-xs text-[#A68F7A]">
                  Need date adjustment? Contact Nicole's concierge team at <strong className="text-[#1A1A1A]">{artistProfile.phone}</strong>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-sm border border-[#E2C9B0]/40 text-[#1A1A1A]/70">
            <AlertCircle className="w-8 h-8 text-[#A68F7A] mx-auto mb-2" />
            <p className="text-sm">No booking record found for reference: "{inputCode}".</p>
          </div>
        )}

      </div>
    </div>
  );
};
