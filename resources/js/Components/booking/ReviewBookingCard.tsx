'use client';

import { useBooking } from '@/context/BookingContext';
import { Doctor } from '@/types';

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
                                backgroundImage: `url("${doctor?.profile_pic || '/img/default-doctor.png'}")`,
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
                            {bookingData.selectedDate}
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
                            {bookingData.selectedTime}
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
                                    ? `${bookingData.whatsapp}`
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
                    {/* Gender */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                wc
                            </span>
                            <span>Jenis Kelamin</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.gender === 'male'
                                ? 'Laki-laki'
                                : bookingData.gender === 'female'
                                  ? 'Perempuan'
                                  : '-'}
                        </p>
                    </div>
                    {/* Service */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                medical_services
                            </span>
                            <span>Layanan</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.service || '-'}
                            {bookingData.serviceType && (
                                <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                    {bookingData.serviceType === 'long'
                                        ? '45 menit'
                                        : '15 menit'}
                                </span>
                            )}
                        </p>
                    </div>
                    {/* Birthdate */}
                    <div className="group">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                cake
                            </span>
                            <span>Tanggal Lahir</span>
                        </div>
                        <p className="pl-7 font-medium text-text-light">
                            {bookingData.birthdate || '-'}
                        </p>
                    </div>
                    {/* Address */}
                    <div className="group sm:col-span-2">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                home
                            </span>
                            <span>Alamat</span>
                        </div>
                        <div className="pl-7">
                            <p className="font-medium text-text-light">
                                {bookingData.address || '-'}
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
