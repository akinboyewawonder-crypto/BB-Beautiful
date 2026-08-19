import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Sparkles,
  ShieldCheck,
  Trash2,
  ExternalLink,
  Edit,
} from 'lucide-react';
import { BookingRequest, BookingStatus } from '../../types';

export const BookingRequestsTab: React.FC = () => {
  const {
    bookingRequests,
    updateBookingStatus,
    deleteBookingRequest,
    selectedRequestForDrawer,
    setSelectedRequestForDrawer,
    formatPrice,
    artistProfile,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');

  const filteredRequests = bookingRequests.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch =
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenDrawer = (req: BookingRequest) => {
    setSelectedRequestForDrawer(req);
    setAdminNoteInput(req.adminNotes || '');
  };

  const handleSaveNotes = () => {
    if (selectedRequestForDrawer) {
      updateBookingStatus(selectedRequestForDrawer.id, selectedRequestForDrawer.status, adminNoteInput);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Client Inquiries & Booking Requests
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Manage incoming requests, verify deposit screenshots, and coordinate calendar locks.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search client or #ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8DFD3] pb-3">
        {[
          { id: 'all', label: `All Requests (${bookingRequests.length})` },
          { id: 'payment_submitted', label: `Proofs Uploaded (${bookingRequests.filter((b) => b.status === 'payment_submitted').length})` },
          { id: 'approved', label: `Approved & Locked (${bookingRequests.filter((b) => b.status === 'approved').length})` },
          { id: 'pending', label: `Pending Deposit (${bookingRequests.filter((b) => b.status === 'pending').length})` },
          { id: 'completed', label: `Completed (${bookingRequests.filter((b) => b.status === 'completed').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              statusFilter === tab.id
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-sm font-semibold'
                : 'bg-white text-[#6B6158] hover:bg-[#FAF8F5] border border-[#E6DED5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-3xl border border-[#E0D7CC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEAE3] bg-[#FAF8F5] text-[#8C7A6B] uppercase tracking-wider font-semibold">
                <th className="py-3.5 pl-4">Client & Code</th>
                <th className="py-3.5">Service Package</th>
                <th className="py-3.5">Event Date & Time</th>
                <th className="py-3.5">Location</th>
                <th className="py-3.5">Total / Deposit</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE7]">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 pl-4">
                    <div className="font-semibold text-sm text-[#1E1B18]">{req.clientName}</div>
                    <div className="text-[11px] font-mono text-[#8C7A6B]">{req.referenceCode}</div>
                  </td>

                  <td className="py-4">
                    <div className="font-medium text-[#1E1B18]">{req.serviceName}</div>
                    <div className="text-[11px] text-[#6B6158]">{req.makeupStyle}</div>
                  </td>

                  <td className="py-4">
                    <div className="font-medium text-[#1E1B18]">{req.eventDate}</div>
                    <div className="text-[11px] text-[#8C7A6B]">{req.timeSlot}</div>
                  </td>

                  <td className="py-4 text-[#6B6158] truncate max-w-[150px]">
                    {req.location}
                  </td>

                  <td className="py-4 font-semibold text-[#1E1B18]">
                    <div>{formatPrice(req.totalAmountUSD, req.totalAmountNGN)}</div>
                    <div className="text-[10px] text-emerald-700 font-normal">
                      Dep: {formatPrice(req.depositPaidUSD, req.depositPaidNGN)}
                    </div>
                  </td>

                  <td className="py-4">
                    {req.status === 'approved' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Approved
                      </span>
                    )}
                    {req.status === 'payment_submitted' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                        Proof Uploaded
                      </span>
                    )}
                    {req.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                        Inquiry Logged
                      </span>
                    )}
                    {req.status === 'completed' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800">
                        Completed
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
                        Declined
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-right pr-4">
                    <button
                      onClick={() => handleOpenDrawer(req)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1E1B18] text-[#FAF8F5] hover:bg-[#322D28] text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="p-12 text-center text-xs text-[#8C7A6B]">
              No booking requests matching the selected filter.
            </div>
          )}
        </div>
      </div>

      {/* REQUEST DETAIL SLIDE-OVER DRAWER */}
      {selectedRequestForDrawer && (
        <div className="fixed inset-0 z-50 bg-[#151413]/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Drawer Top */}
            <div>
              <div className="p-6 bg-[#1E1B18] text-white flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Request Details
                  </div>
                  <h3 className="font-serif-editorial text-2xl font-normal text-white">
                    {selectedRequestForDrawer.clientName}
                  </h3>
                  <div className="text-xs text-[#D9D0C5] font-mono">
                    {selectedRequestForDrawer.referenceCode} • {selectedRequestForDrawer.createdAt}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRequestForDrawer(null)}
                  className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 text-xs text-[#1E1B18]">
                
                {/* Contact bar */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD3] flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5 text-[#8C7A6B]" />
                      <strong>{selectedRequestForDrawer.clientPhone}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="w-3.5 h-3.5 text-[#8C7A6B]" />
                      <span>{selectedRequestForDrawer.clientEmail}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${selectedRequestForDrawer.clientPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Client</span>
                  </a>
                </div>

                {/* Event Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E6DDD2]">
                    <span className="text-[#8C7A6B] block">Service Experience</span>
                    <strong className="text-sm font-semibold">{selectedRequestForDrawer.serviceName}</strong>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E6DDD2]">
                    <span className="text-[#8C7A6B] block">Scheduled Date & Slot</span>
                    <strong className="text-sm font-semibold">{selectedRequestForDrawer.eventDate} at {selectedRequestForDrawer.timeSlot}</strong>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E6DDD2]">
                    <span className="text-[#8C7A6B] block">Event Location</span>
                    <strong className="text-sm font-semibold">{selectedRequestForDrawer.location}</strong>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E6DDD2]">
                    <span className="text-[#8C7A6B] block">Faces / Guests</span>
                    <strong className="text-sm font-semibold">{selectedRequestForDrawer.numberOfPeople} Person(s)</strong>
                  </div>
                </div>

                {/* Client Custom Questionnaire Answers */}
                {selectedRequestForDrawer.customAnswers && Object.keys(selectedRequestForDrawer.customAnswers).length > 0 && (
                  <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-[#E6DDD2] space-y-3">
                    <h4 className="font-semibold uppercase tracking-wider text-[#8C7A6B] text-[11px]">
                      Client Questionnaire Responses
                    </h4>
                    {Object.entries(selectedRequestForDrawer.customAnswers).map(([q, ans], i) => (
                      <div key={i} className="pb-2 border-b border-[#EAE1D6] last:border-0 last:pb-0">
                        <span className="text-[#6B6158] font-medium block">{q}</span>
                        <p className="font-semibold text-[#1E1B18] mt-0.5">{ans || '—'}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payment Proof Preview Screenshot */}
                {selectedRequestForDrawer.paymentProofUrl && (
                  <div className="p-5 rounded-2xl bg-white border border-[#E6DDD2] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
                        Uploaded Payment Proof Screenshot
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        Submitted {selectedRequestForDrawer.paymentSubmittedAt || 'Recently'}
                      </span>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-[#D9D0C5] aspect-[16/9] bg-[#EFEAE3]">
                      <img
                        src={selectedRequestForDrawer.paymentProofUrl}
                        alt="Payment Receipt"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Concierge Notes Editor */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
                    Studio Internal Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Skin sensitive around eye area. Champagne veil kit pre-assembled..."
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1E1B18] text-[#1E1B18] hover:text-white border border-[#D9D0C5] text-[11px] font-medium transition-colors"
                  >
                    Save Notes
                  </button>
                </div>

              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-6 bg-[#FAF8F5] border-t border-[#E8DFD3] space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-1">
                Update Booking Status:
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateBookingStatus(selectedRequestForDrawer.id, 'approved', adminNoteInput)}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve & Lock Slot</span>
                </button>

                <button
                  onClick={() => updateBookingStatus(selectedRequestForDrawer.id, 'payment_submitted', adminNoteInput)}
                  className="py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Clock className="w-4 h-4" />
                  <span>Flag Verification</span>
                </button>

                <button
                  onClick={() => updateBookingStatus(selectedRequestForDrawer.id, 'completed', adminNoteInput)}
                  className="py-3 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Mark Completed</span>
                </button>

                <button
                  onClick={() => updateBookingStatus(selectedRequestForDrawer.id, 'rejected', adminNoteInput)}
                  className="py-3 px-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Decline Request</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this booking request?')) {
                    deleteBookingRequest(selectedRequestForDrawer.id);
                  }
                }}
                className="w-full text-center text-xs text-rose-600 hover:text-rose-800 py-1"
              >
                Delete Request Permanently
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
