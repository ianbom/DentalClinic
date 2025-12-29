"use client";

import { useBooking } from "@/context/BookingContext";
import { useState } from "react";

export function BookingCalendarWidget() {
    const { bookingData, setBookingData } = useBooking();
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateSelect = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        setBookingData({ selectedDate: formattedDate });
    };

    const isDateSelected = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return bookingData.selectedDate === formattedDate;
    };

    const isPastDate = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        date.setHours(0, 0, 0, 0);
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        return date < todayStart;
    };

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6 px-2">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
                </button>
                <span className="text-base font-bold text-text-light">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
                </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 mb-2">
                {dayNames.map((day, i) => (
                    <div key={i} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wide py-2">{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                {/* Empty start days */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10 w-full"></div>
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const past = isPastDate(day);
                    const selected = isDateSelected(day);

                    if (past) {
                        return (
                            <button
                                key={day}
                                className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-gray-300 text-sm font-medium cursor-not-allowed"
                                disabled
                            >
                                {day}
                            </button>
                        );
                    }

                    if (selected) {
                        return (
                            <button
                                key={day}
                                className="h-10 w-10 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold shadow-md shadow-primary/30 transform scale-110"
                            >
                                {day}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-text-light hover:bg-gray-100 text-sm font-medium transition-colors cursor-pointer"
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
