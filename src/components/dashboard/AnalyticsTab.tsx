import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Users, Calendar, DollarSign, Eye, ArrowUpRight, Award, Sparkles } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { bookingRequests, services, formatPrice } = useApp();

  const totalInquiries = bookingRequests.length;
  const verifiedCount = bookingRequests.filter((b) => b.status === 'approved' || b.status === 'completed').length;
  const conversionRate = totalInquiries > 0 ? ((verifiedCount / totalInquiries) * 100).toFixed(1) : '0';

  const monthlyVolumeUSD = 18450;
  const monthlyVolumeNGN = 25800000;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
          Business Intelligence & Client Conversion
        </h2>
        <p className="text-xs text-[#6B6158] font-light mt-0.5">
          Real-time metrics tracking client inquiries, conversion velocities, and high-ticket service demand.
        </p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
            Bio Link Page Views
          </div>
          <div className="font-serif-editorial text-3xl sm:text-4xl text-[#1E1B18] font-normal">
            4,820
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24.6% this month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
            Inquiry Conversion Rate
          </div>
          <div className="font-serif-editorial text-3xl sm:text-4xl text-[#1E1B18] font-normal">
            {conversionRate}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Industry avg: 12.4%
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
            Average Booking Value
          </div>
          <div className="font-serif-editorial text-3xl sm:text-4xl text-[#1E1B18] font-normal">
            {formatPrice(420, 580000)}
          </div>
          <div className="text-[11px] text-[#8C7A6B] mt-1">
            Driven by bridal & bridal party add-ons
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E6DED5] shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
            Total Pipeline Volume
          </div>
          <div className="font-serif-editorial text-3xl sm:text-4xl text-[#1E1B18] font-normal">
            {formatPrice(monthlyVolumeUSD, monthlyVolumeNGN)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Projected Q3/Q4 Run Rate
          </div>
        </div>

      </div>

      {/* Breakdown Charts / Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Service Popularity Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
          <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
            Top Performing Services by Revenue
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[#1E1B18]">Haute Couture Bridal Experience</span>
                <span className="text-[#8C7A6B]">58% of revenue ($10,700)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF5ED] overflow-hidden">
                <div className="h-full rounded-full bg-[#1E1B18]" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[#1E1B18]">Traditional Nigerian Bridal Luxury</span>
                <span className="text-[#8C7A6B]">24% of revenue ($4,400)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF5ED] overflow-hidden">
                <div className="h-full rounded-full bg-[#C8A97E]" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[#1E1B18]">Signature Red Carpet & Gala Glam</span>
                <span className="text-[#8C7A6B]">12% of revenue ($2,200)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF5ED] overflow-hidden">
                <div className="h-full rounded-full bg-[#8C7A6B]" style={{ width: '12%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[#1E1B18]">Bridal Party & Mother of Bride Add-ons</span>
                <span className="text-[#8C7A6B]">6% of revenue ($1,150)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FAF5ED] overflow-hidden">
                <div className="h-full rounded-full bg-[#D9D0C5]" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Lead Source Channel Distribution */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D7CC] shadow-sm space-y-6">
          <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
            Client Acquisition Channels
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD3] flex items-center justify-between">
              <div>
                <strong className="text-sm font-semibold text-[#1E1B18]">Instagram Bio Link</strong>
                <p className="text-xs text-[#8C7A6B]">Direct traffic from Reels & Stories</p>
              </div>
              <span className="font-serif-editorial text-xl text-[#1E1B18]">64%</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD3] flex items-center justify-between">
              <div>
                <strong className="text-sm font-semibold text-[#1E1B18]">Wedding Planner Referrals</strong>
                <p className="text-xs text-[#8C7A6B]">High-ticket luxury coordinators</p>
              </div>
              <span className="font-serif-editorial text-xl text-[#1E1B18]">22%</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD3] flex items-center justify-between">
              <div>
                <strong className="text-sm font-semibold text-[#1E1B18]">WhatsApp Status & Word of Mouth</strong>
                <p className="text-xs text-[#8C7A6B]">Repeat clients & bridesmaid referrals</p>
              </div>
              <span className="font-serif-editorial text-xl text-[#1E1B18]">14%</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF5ED] border border-[#E6DDD2] text-xs text-[#5C534B]">
            <strong className="text-[#1E1B18] block mb-1">Conversion Insight:</strong>
            Clients who view the Before/After transformation slider have a 3.4x higher booking completion rate.
          </div>
        </div>

      </div>

    </div>
  );
};
