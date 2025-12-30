'use client';

import { Booking } from '@/types';

interface BookingDetailsCardProps {
    booking: Booking;
}

export function BookingDetailsCard({ booking }: BookingDetailsCardProps) {
    const patientDetail = booking.patient_detail;
    const doctor = booking.doctor;

    // Format date from Y-m-d to readable format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Format time from HH:mm:ss to HH:mm WIB
    const formatTime = (timeString: string): string => {
        return timeString.slice(0, 5) + ' WIB';
    };

    return (
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <h3 className="text-lg font-bold text-text-light">
                    Detail Booking
                </h3>
                <div className="flex gap-2">
                    <button
                        className="cursor-pointer text-gray-400 transition-colors hover:text-primary"
                        title="Download PDF"
                    >
                        <span className="material-symbols-outlined">
                            download
                        </span>
                    </button>
                    <button
                        className="cursor-pointer text-gray-400 transition-colors hover:text-primary"
                        title="Print"
                    >
                        <span className="material-symbols-outlined">print</span>
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                    {/* Nama Pasien */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">
                            Nama Pasien
                        </span>
                        <span className="font-medium text-text-light">
                            {patientDetail?.patient_name || '-'}
                        </span>
                    </div>

                    {/* NIK */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">NIK</span>
                        <span className="font-medium text-text-light">
                            {patientDetail?.patient_nik || '-'}
                        </span>
                    </div>

                    {/* Nomor WhatsApp */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">
                            Nomor WhatsApp
                        </span>
                        <span className="font-medium text-text-light">
                            {patientDetail?.patient_phone
                                ? `+62 ${patientDetail.patient_phone}`
                                : '-'}
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Email</span>
                        <span className="font-medium text-text-light">
                            {patientDetail?.patient_email || '-'}
                        </span>
                    </div>

                    {/* Dokter */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Dokter</span>
                        <div className="flex items-center gap-2">
                            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                                {doctor?.profile_pic ? (
                                    <img
                                        src={doctor.profile_pic}
                                        alt={doctor.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-primary/20 text-[10px] font-bold text-primary">
                                        DR
                                    </div>
                                )}
                            </div>
                            <span className="font-medium text-text-light">
                                {doctor?.name || 'Drg.'}
                            </span>
                        </div>
                    </div>

                    {/* Jadwal */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Jadwal</span>
                        <span className="font-medium text-text-light">
                            {formatDate(booking.booking_date)} -{' '}
                            {formatTime(booking.start_time)}
                        </span>
                    </div>

                    {/* Keluhan */}
                    {patientDetail?.complaint && (
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <span className="text-sm text-gray-500">
                                Keluhan
                            </span>
                            <span className="font-medium text-text-light">
                                {patientDetail.complaint}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
