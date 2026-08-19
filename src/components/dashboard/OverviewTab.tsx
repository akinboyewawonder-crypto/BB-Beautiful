import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const {
    artistProfile,
    bookingRequests,
    updateBookingStatus,
    setSelectedRequestForDrawer,
    formatPrice,
    setDashboardTab,
    setActiveView,
  } = useApp();

  const newRequestsCount = bookingRequests.filter((b) => b.status === 'pending').length;
  const paymentPendingCount = bookingRequests.filter((b) => b.status === 'payment_submitted').length;
  const approvedCount = bookingRequests.filter((b) => b.status === 'approved').length;
  const totalRevenueUSD = bookingRequests
    .filter((b) => b.status === 'approved' || b.status === 'completed' || b.status === 'payment_submitted')
    .reduce((sum, b) => sum + b.totalAmountUSD, 0);
  const totalRevenueNGN = bookingRequests
    .filter((b) => b.status === 'approved' || b.status === 'completed' || b.status === 'payment_submitted')
    .reduce((sum, b) => sum + b.totalAmountNGN, 0);

  const recentRequests = bookingRequests.slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#1E1B18] text-[#FAF8F5] border border-[#38322B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Artistry Studio
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-white">
            Good day, {artistProfile.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#D9D0C5] font-light mt-1 max-w-xl">
            You have <strong className="text-white font-medium">{paymentPendingCount} payments</strong> awaiting verification and <strong className="text-white font-medium">{newRequestsCount} new client inquiries</strong> ready for review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView('public')}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors flex items-center gap-2"
          >
            <span>View Public Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A97E]" />
          </button>

          <button
            onClick={() => setDashboardTab('requests')}
            className="px-5 py-2.5 rounded-full bg-[#C8A97E] hover:bg-[#D4AF37] text-[#151413] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Review Inquiries</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
              New Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            {newRequestsCount}
          </div>
          <div className="text-[11px] text-[#8C7A6B] mt-1">Awaiting confirmation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
              Payment Proofs
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            {paymentPendingCount}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Ready for verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
              Confirmed Slots
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            {approvedCount}
          </div>
          <div className="text-[11px] text-[#8C7A6B] mt-1">Locked in calendar</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
              Pipeline Volume
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF5ED] text-[#7C6345] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            {formatPrice(totalRevenueUSD, totalRevenueNGN)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">+18% vs last month</div>
        </div>

      </div>

      {/* Recent Booking Inquiries Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
              Recent Client Booking Requests
            </h3>
            <p className="text-xs text-[#6B6158] font-light mt-0.5">
              Click any request to view payment screenshots, client questionnaire answers, or chat via WhatsApp.
            </p>
          </div>

          <button
            onClick={() => setDashboardTab('requests')}
            className="text-xs font-semibold text-[#8C7A6B] hover:text-[#1E1B18] underline underline-offset-4"
          >
            View All ({bookingRequests.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEAE3] text-[#8C7A6B] uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Ref & Client</th>
                <th className="pb-3">Service & Style</th>
                <th className="pb-3">Event Date</th>
                <th className="pb-3">Investment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE7]">
              {recentRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#FAF8F5] transition-colors group">
                  <td className="py-4 pl-2">
                    <div className="font-semibold text-[#1E1B18] text-sm group-hover:text-[#C8A97E] transition-colors">
                      {req.clientName}
                    </div>
                    <div className="text-[11px] font-mono text-[#8C7A6B]">{req.referenceCode}</div>
                  </td>

                  <td className="py-4">
                    <div className="font-medium text-[#1E1B18]">{req.serviceName}</div>
                    <div className="text-[11px] text-[#6B6158] truncate max-w-[200px]">{req.makeupStyle}</div>
                  </td>

                  <td className="py-4">
                    <div className="font-medium text-[#1E1B18]">{req.eventDate}</div>
                    <div className="text-[11px] text-[#8C7A6B]">{req.timeSlot}</div>
                  </td>

                  <td className="py-4 font-semibold text-[#1E1B18]">
                    {formatPrice(req.totalAmountUSD, req.totalAmountNGN)}
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
                        Inquiry Pending
                      </span>
                    )}
                    {req.status === 'completed' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800">
                        Completed
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-right pr-2">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedRequestForDrawer(req)}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1E1B18] text-[#1E1B18] hover:text-white border border-[#D9D0C5] text-[11px] font-semibold transition-all cursor-pointer"
                      >
                        Inspect
                      </button>

                      {req.status !== 'approved' && (
                        <button
                          onClick={() => updateBookingStatus(req.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
