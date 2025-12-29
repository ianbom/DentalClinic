"use client";

import { useBooking } from "@/context/BookingContext";

const timeSlots = [
    { time: "08:00", available: true },
    { time: "09:00", available: false },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
    { time: "18:00", available: true },
    { time: "19:00", available: true },
    { time: "20:00", available: true },
];

export function BookingTimeSlots() {
    const { bookingData, setBookingData } = useBooking();

    const handleTimeSelect = (time: string) => {
        setBookingData({ selectedTime: `${time} WIB` });
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-light">Ketersediaan Waktu</h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border border-gray-300 bg-white"></span>
                        <span className="text-gray-500">Tersedia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                        <span className="text-gray-500">Dipilih</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                        <span className="text-gray-500">Penuh</span>
                    </div>
                </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {timeSlots.map(slot => {
                    const isSelected = bookingData.selectedTime === `${slot.time} WIB`;

                    if (!slot.available) {
                        return (
                            <button
                                key={slot.time}
                                className="py-2.5 px-4 rounded-lg bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed line-through"
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
                                className="py-2.5 px-4 rounded-lg border-2 border-primary bg-primary/10 text-primary text-sm font-bold shadow-sm ring-1 ring-primary/20"
                            >
                                {slot.time}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={slot.time}
                            onClick={() => handleTimeSelect(slot.time)}
                            className="py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:border-primary hover:text-primary transition-all bg-white cursor-pointer"
                        >
                            {slot.time}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
