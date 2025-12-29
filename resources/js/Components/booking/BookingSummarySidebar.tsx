"use client";

import Link from "next/link";
import { Doctor } from "@/lib/doctors";
import { useBooking } from "@/context/BookingContext";

interface BookingSummarySidebarProps {
    doctorId: string;
    doctor?: Doctor;
}

export function BookingSummarySidebar({ doctorId, doctor }: BookingSummarySidebarProps) {
    const { bookingData } = useBooking();

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-text-light">Ringkasan Booking</h3>
            </div>
            <div className="p-5 flex flex-col gap-6">
                {/* Doctor Info */}
                <div className="flex items-start gap-4">
                    <div className="relative size-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${doctor?.image || ""}")` }}
                        ></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Dokter Gigi</span>
                        <p className="font-bold text-text-light">{doctor?.name || "Loading..."}</p>
                        <p className="text-sm text-gray-500">{doctor?.specialty || ""}</p>
                    </div>
                </div>
                <hr className="border-gray-100" />

                {/* Booking Details */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 font-medium">Waktu Konsultasi</span>
                        <div className="flex items-center gap-2 text-text-light">
                            <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                            <p className="font-medium">
                                {bookingData.selectedDate || "Pilih tanggal"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-text-light mt-1">
                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                            <p className="font-medium">
                                {bookingData.selectedTime || "Pilih waktu"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="p-5 pt-2 flex flex-col gap-3">
                {/* Tombol Kembali */}
                <Link
                    href={`/doctors/${doctorId}`}
                    className="w-full font-semibold py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Kembali</span>
                </Link>

                {/* Tombol Lanjut */}
                <Link
                    href={`/doctors/${doctorId}/booking/customer-data`}
                    className={`w-full font-bold py-3.5 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 group ${bookingData.selectedDate && bookingData.selectedTime
                        ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/20 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                        }`}
                >
                    <span>Lanjut ke Data Customer</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
}
