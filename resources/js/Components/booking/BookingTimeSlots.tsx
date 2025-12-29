'use client';

import { useBooking } from '@/context/BookingContext';

const timeSlots = [
    { time: '08:00', available: true },
    { time: '09:00', available: false },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
    { time: '20:00', available: true },
];

export function BookingTimeSlots() {
    const { bookingData, setBookingData } = useBooking();

    const handleTimeSelect = (time: string) => {
        setBookingData({ selectedTime: `${time} WIB` });
    };

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
                    const isSelected =
                        bookingData.selectedTime === `${slot.time} WIB`;

                    if (!slot.available) {
                        return (
                            <button
                                key={slot.time}
                                className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-400 line-through"
                                disabled
                            >
                                {slot.time}
                            </button>
                        );
                    }

                    if (isSelected) {
                        return (
                            <button
                                key={slot.time}
                                className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary shadow-sm ring-1 ring-primary/20"
                            >
                                {slot.time}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={slot.time}
                            onClick={() => handleTimeSelect(slot.time)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-primary hover:text-primary"
                        >
                            {slot.time}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
