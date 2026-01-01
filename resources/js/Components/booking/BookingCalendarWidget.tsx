'use client';

import { useBooking } from '@/context/BookingContext';
import {
    DAY_NAMES_SHORT_ID,
    formatDateString,
    getDaysInMonth,
    getFirstDayOfMonth,
    isPastDate,
    MONTH_NAMES_ID,
} from '@/lib/utils/calendar';
import { AvailableSlots } from '@/types';
import { useState } from 'react';

interface BookingCalendarWidgetProps {
    availableSlots: AvailableSlots;
}

export function BookingCalendarWidget({
    availableSlots,
}: BookingCalendarWidgetProps) {
    const { bookingData, setBookingData } = useBooking();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1,
            ),
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1,
            ),
        );
    };

    const getDateString = (day: number) => {
        return formatDateString(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            day,
        );
    };

    const handleDateSelect = (day: number) => {
        const dateString = getDateString(day);
        const slotData = availableSlots[dateString];

        if (slotData) {
            setBookingData({
                selectedDate: slotData.formatted_date,
                rawSelectedDate: dateString, // YYYY-MM-DD format for backend
                selectedTime: '', // Reset time when date changes
            });
        }
    };

    const isDateAvailable = (day: number) => {
        const dateString = getDateString(day);
        const slotData = availableSlots[dateString];
        return slotData?.slots.some((slot) => slot.available) ?? false;
    };

    const isDateSelected = (day: number) => {
        const dateString = getDateString(day);
        const slotData = availableSlots[dateString];
        return bookingData.selectedDate === slotData?.formatted_date;
    };

    const checkIsPastDate = (day: number) => {
        const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
        );
        return isPastDate(date);
    };

    return (
        <div className="mb-10">
            <div className="mb-6 flex items-center justify-between px-2">
                <button
                    onClick={handlePrevMonth}
                    className="cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        arrow_back_ios
                    </span>
                </button>
                <span className="text-base font-bold text-text-light">
                    {MONTH_NAMES_ID[currentMonth.getMonth()]}{' '}
                    {currentMonth.getFullYear()}
                </span>
                <button
                    onClick={handleNextMonth}
                    className="cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        arrow_forward_ios
                    </span>
                </button>
            </div>

            {/* Days of Week */}
            <div className="mb-2 grid grid-cols-7">
                {DAY_NAMES_SHORT_ID.map((day, i) => (
                    <div
                        key={i}
                        className="py-2 text-center text-xs font-bold uppercase tracking-wide text-gray-400"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-x-1 gap-y-2">
                {/* Empty start days */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10 w-full"></div>
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => {
                        const past = checkIsPastDate(day);
                        const available = isDateAvailable(day);
                        const selected = isDateSelected(day);

                        // Past or no available slots
                        if (past || !available) {
                            return (
                                <button
                                    key={day}
                                    className="mx-auto flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full text-sm font-medium text-gray-300"
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
                                    className="mx-auto flex h-10 w-10 scale-110 transform items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30"
                                >
                                    {day}
                                </button>
                            );
                        }

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                className="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-text-light transition-colors hover:bg-gray-100"
                            >
                                {day}
                            </button>
                        );
                    },
                )}
            </div>
        </div>
    );
}
