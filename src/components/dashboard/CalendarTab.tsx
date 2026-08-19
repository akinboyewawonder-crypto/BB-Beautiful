import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Plus,
  Lock,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';

export const CalendarTab: React.FC = () => {
  const { bookingRequests, setSelectedRequestForDrawer, formatPrice, showToast } = useApp();

  const [currentMonth, setCurrentMonth] = useState('September 2026');
  const [selectedDate, setSelectedDate] = useState('2026-09-14');

  // Days in month mock representation
  const daysInSeptember = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-09-${day < 10 ? '0' + day : day}`;
    const bookingsOnDay = bookingRequests.filter((b) => b.eventDate === dateStr);
    return {
      day,
      dateStr,
      hasBooking: bookingsOnDay.length > 0,
      bookings: bookingsOnDay,
      isBlocked: day === 7 || day === 28, // sample off-days
    };
  });

  const selectedDayData = daysInSeptember.find((d) => d.dateStr === selectedDate);
  const selectedBookings = bookingRequests.filter((b) => b.eventDate === selectedDate);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Studio Availability & Appointment Calendar
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Manage your schedule, block personal rest days, and inspect daily bridal itineraries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Date marked as blocked for private commitments')}
            className="px-4 py-2 rounded-full bg-white border border-[#D9D0C5] text-xs font-semibold text-[#1E1B18] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span>Block Selected Date</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Month Calendar Grid */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D7CC] shadow-sm space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
              {currentMonth}
            </h3>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentMonth('August 2026')}
                className="p-1.5 rounded-lg border border-[#D9D0C5] hover:bg-[#FAF8F5]"
              >
                <ChevronLeft className="w-4 h-4 text-[#8C7A6B]" />
              </button>
              <button
                onClick={() => setCurrentMonth('October 2026')}
                className="p-1.5 rounded-lg border border-[#D9D0C5] hover:bg-[#FAF8F5]"
              >
                <ChevronRight className="w-4 h-4 text-[#8C7A6B]" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInSeptember.map((d) => {
              const isSelected = d.dateStr === selectedDate;
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelectedDate(d.dateStr)}
                  className={`aspect-square p-1.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E1B18] text-white border-[#1E1B18] shadow-md'
                      : d.hasBooking
                      ? 'bg-[#FAF5ED] border-[#C8A97E] text-[#1E1B18]'
                      : d.isBlocked
                      ? 'bg-gray-100 border-gray-200 text-gray-400 opacity-60'
                      : 'bg-white border-[#E6DED5] text-[#1E1B18] hover:border-[#C8A97E]'
                  }`}
                >
                  <span className="text-xs font-bold">{d.day}</span>

                  <div className="flex items-center justify-between">
                    {d.hasBooking && (
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-[#C8A97E]'}`} />
                    )}
                    {d.isBlocked && (
                      <Lock className="w-2.5 h-2.5 opacity-60" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#8C7A6B] pt-4 border-t border-[#EFEAE3]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8A97E]" />
              <span>Booked Appointment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#E6DED5]" />
              <span>Available Slot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-gray-400" />
              <span>Personal Blocked Date</span>
            </div>
          </div>
        </div>

        {/* Right: Daily Appointments Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D7CC] shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-1">
              Schedule For Selected Date
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal border-b border-[#EFEAE3] pb-3">
              {selectedDate}
            </h3>

            {selectedBookings.length > 0 ? (
              <div className="space-y-4 mt-4">
                {selectedBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedRequestForDrawer(b)}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D8CC] hover:border-[#C8A97E] transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#1E1B18] px-2 py-0.5 rounded-full">
                          {b.timeSlot}
                        </span>
                        <h4 className="font-serif-editorial text-lg text-[#1E1B18] font-medium mt-1">
                          {b.clientName}
                        </h4>
                      </div>

                      <span className="text-xs font-semibold text-[#1E1B18]">
                        {formatPrice(b.totalAmountUSD, b.totalAmountNGN)}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B6158] font-medium">
                      {b.serviceName}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-[#8C7A6B]">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{b.location}</span>
                    </div>

                    <div className="pt-2 border-t border-[#EAE1D6] flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider">
                        {b.status.replace('_', ' ')}
                      </span>
                      <span className="text-[#8C7A6B] group-hover:text-[#1E1B18] font-medium">
                        Click to Inspect →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#8C7A6B] space-y-2 mt-4 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#D9D0C5]">
                <CalendarIcon className="w-8 h-8 text-[#C8A97E] mx-auto" />
                <p className="font-medium text-[#1E1B18]">No appointments locked on this date.</p>
                <p>Slots remain open for new client inquiries.</p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF5ED] border border-[#E6DDD2] text-xs text-[#5C534B]">
            <strong className="text-[#1E1B18] block mb-1">Calendar Automation:</strong>
            When you approve a booking request in the Requests tab, the appointment slot locks automatically and prevents double-booking.
          </div>
        </div>

      </div>

    </div>
  );
};
