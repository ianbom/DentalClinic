'use client';

import { useBooking } from '@/context/BookingContext';
import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';

interface BookingSummarySidebarProps {
    doctorId: string;
    doctor?: Doctor;
}

export function BookingSummarySidebar({
    doctorId,
    doctor,
}: BookingSummarySidebarProps) {
    const { bookingData } = useBooking();

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="border-b border-gray-100 bg-gray-50/50 p-5">
                <h3 className="text-lg font-bold text-text-light">
                    Ringkasan Booking
                </h3>
            </div>
            <div className="flex flex-col gap-6 p-5">
                {/* Doctor Info */}
                <div className="flex items-start gap-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url("${doctor?.profile_pic || '/img/default-doctor.png'}")`,
                            }}
                        ></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="mb-0.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                            Dokter Gigi
                        </span>
                        <p className="font-bold text-text-light">
                            {doctor?.name || 'Loading...'}
                        </p>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-500">
                            Waktu Konsultasi
                        </span>
                        <div className="flex items-center gap-2 text-text-light">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                                calendar_today
                            </span>
                            <p className="font-medium">
                                {bookingData.selectedDate || 'Pilih tanggal'}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-text-light">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                                schedule
                            </span>
                            <p className="font-medium">
                                {bookingData.selectedTime || 'Pilih waktu'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 p-5 pt-2">
                {/* Tombol Kembali */}
                <Link
                    href={`/doctors/${doctorId}`}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    <span>Kembali</span>
                </Link>

                {/* Tombol Lanjut */}
                <Link
                    href={`/doctors/${doctorId}/booking/patient-data`}
                    className={`group flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3.5 font-bold shadow-md transition-colors ${
                        bookingData.selectedDate && bookingData.selectedTime
                            ? 'cursor-pointer bg-primary text-white shadow-primary/20 hover:bg-primary-dark'
                            : 'pointer-events-none cursor-not-allowed bg-gray-200 text-gray-400'
                    }`}
                >
                    <span>Lanjut ke Data Customer</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                    </span>
                </Link>
            </div>
        </div>
    );
}
