'use client';

import { useBooking } from '@/context/BookingContext';
import { AvailableSlots, TimeSlot } from '@/types';
import { useMemo } from 'react';

interface BookingTimeSlotsProps {
    availableSlots: AvailableSlots;
}

export function BookingTimeSlots({ availableSlots }: BookingTimeSlotsProps) {
    const { bookingData, setBookingData } = useBooking();

    // Get time slots for selected date
    const timeSlots = useMemo((): TimeSlot[] => {
        if (!bookingData.rawSelectedDate && !bookingData.selectedDate) {
            return [];
        }

        // First, try to find by rawSelectedDate (YYYY-MM-DD format) as direct key
        if (
            bookingData.rawSelectedDate &&
            availableSlots[bookingData.rawSelectedDate]
        ) {
            return availableSlots[bookingData.rawSelectedDate].slots ?? [];
        }

        // Fallback: find by formatted_date matching
        const dateEntry = Object.values(availableSlots).find(
            (slot) => slot.formatted_date === bookingData.selectedDate,
        );

        return dateEntry?.slots ?? [];
    }, [availableSlots, bookingData.rawSelectedDate, bookingData.selectedDate]);

    // Check if slot is available based on service type
    const isSlotAvailable = (slot: TimeSlot): boolean => {
        if (bookingData.serviceType === 'short') {
            return slot.available_for_short ?? slot.available;
        } else if (bookingData.serviceType === 'long') {
            return slot.available_for_long ?? slot.available;
        }
        return slot.available;
    };

    const handleTimeSelect = (time: string) => {
        // Toggle: if same time is clicked again, deselect it
        if (bookingData.selectedTime === time) {
            setBookingData({ selectedTime: '' });
        } else {
            setBookingData({ selectedTime: time });
        }
    };

    // Check if service is selected
    if (!bookingData.serviceType) {
        return (
            <div className="py-8 text-center">
                <span className="material-symbols-outlined mb-2 text-4xl text-amber-400">
                    warning
                </span>
                <p className="text-gray-500">
                    Silakan pilih jenis layanan terlebih dahulu
                </p>
            </div>
        );
    }

    if (!bookingData.selectedDate) {
        return (
            <div className="py-8 text-center">
                <span className="material-symbols-outlined mb-2 text-4xl text-gray-300">
                    calendar_month
                </span>
                <p className="text-gray-500">
                    Silakan pilih tanggal terlebih dahulu
                </p>
            </div>
        );
    }

    if (timeSlots.length === 0) {
        return (
            <div className="py-8 text-center">
                <span className="material-symbols-outlined mb-2 text-4xl text-gray-300">
                    event_busy
                </span>
                <p className="text-gray-500">
                    Tidak ada jadwal tersedia untuk tanggal ini
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-light">
                    Ketersediaan Waktu
                </h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border border-gray-300 bg-white"></span>
                        <span className="text-gray-500">Tersedia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-primary"></span>
                        <span className="text-gray-500">Dipilih</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-gray-200"></span>
                        <span className="text-gray-500">Penuh</span>
                    </div>
                </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                {timeSlots.map((slot) => {
                    const isSelected = bookingData.selectedTime === slot.time;
                    const slotAvailable = isSlotAvailable(slot);

                    if (!slotAvailable) {
                        return (
                            <button
                                key={slot.time}
                                className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-400 line-through"
                                disabled
                                title={
                                    slot.reason === 'booked'
                                        ? 'Sudah dibooking'
                                        : slot.reason === 'time_off'
                                          ? 'Dokter tidak tersedia'
                                          : 'Tidak tersedia'
                                }
                            >
                                {slot.time} WIB
                            </button>
                        );
                    }

                    if (isSelected) {
                        return (
                            <button
                                key={slot.time}
                                className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary shadow-sm ring-1 ring-primary/20"
                            >
                                {slot.time} WIB
                            </button>
                        );
                    }

                    return (
                        <button
                            key={slot.time}
                            onClick={() => handleTimeSelect(slot.time)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-primary hover:text-primary"
                        >
                            {slot.time} WIB
                        </button>
                    );
                })}
            </div>
        </>
    );
}
