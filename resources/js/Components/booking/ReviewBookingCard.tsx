'use client';

import { useBooking } from '@/context/BookingContext';
import { Doctor } from '@/lib/doctors';

interface ReviewBookingCardProps {
    doctor?: Doctor;
}

export function ReviewBookingCard({ doctor }: ReviewBookingCardProps) {
    const { bookingData } = useBooking();

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Card Header */}
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <span className="material-symbols-outlined text-xl text-primary">
                    receipt_long
                </span>
                <h3 className="font-semibold text-text-light">
                    Ringkasan Booking
                </h3>
            </div>

            {/* Card Body */}
            <div className="p-6">
                {/* Doctor & Service Highlight */}
                <div className="mb-8 flex flex-col items-start gap-4 border-b border-dashed border-gray-200 pb-8 sm:flex-row sm:items-center">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url("${doctor?.image || ''}")`,
                            }}
                        ></div>
                    </div>
                    <div className="flex-1">
                        <p className="mb-1 text-sm font-medium text-primary">
                            Dokter Pilihan
                        </p>
                        <h4 className="text-lg font-bold text-text-light">
                            {doctor?.name || 'Loading...'}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {doctor?.specialty || ''}
                        </p>
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary sm:mt-0">
                        Scaling Gigi
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* Date */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                calendar_today
                            </span>
                            <span>Tanggal</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.selectedDate ||
                                'Senin, 24 Oktober 2023'}
                        </p>
                    </div>
                    {/* Time */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                schedule
                            </span>
                            <span>Waktu</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.selectedTime || '14:00 WIB'}
                        </p>
                    </div>
                    {/* Patient Name */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                person
                            </span>
                            <span>Nama Pasien</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.fullName || '-'}
                        </p>
                    </div>
                    {/* NIK */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                badge
                            </span>
                            <span>NIK</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.nik || '-'}
                        </p>
                    </div>
                    {/* WhatsApp */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                chat
                            </span>
                            <span>Nomor WhatsApp</span>
                        </div>
                        <div className="flex items-center gap-2 pl-7">
                            <p className="font-medium text-text-light">
                                {bookingData.whatsapp
                                    ? `+62 ${bookingData.whatsapp}`
                                    : '-'}
                            </p>
                            {bookingData.whatsapp && (
                                <span
                                    className="material-symbols-outlined text-[18px] text-green-500"
                                    title="Verified"
                                >
                                    verified
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Email */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                mail
                            </span>
                            <span>Email</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.email || '-'}
                        </p>
                    </div>
                    {/* Complaint */}
                    <div className="group sm:col-span-2">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                sticky_note_2
                            </span>
                            <span>Keluhan</span>
                        </div>
                        <div className="pl-7">
                            <p className="font-medium text-text-light">
                                {bookingData.complaint || '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="flex items-start gap-3 border-t border-primary/10 bg-primary/5 px-6 py-3">
                <span className="material-symbols-outlined mt-0.5 text-xl text-primary">
                    info
                </span>
                <p className="text-xs leading-relaxed text-gray-600">
                    Mohon cek kembali data Anda. Setelah konfirmasi, kami akan
                    mengirimkan detail booking melalui WhatsApp untuk
                    verifikasi.
                </p>
            </div>
        </div>
    );
}
