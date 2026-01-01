'use client';

import { useBooking } from '@/context/BookingContext';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface ReviewActionsProps {
    doctorId: string;
}

export function ReviewActions({ doctorId }: ReviewActionsProps) {
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { bookingData, resetBookingData } = useBooking();

    const handleConfirmBooking = () => {
        if (!isTermsAgreed || isSubmitting) return;

        setIsSubmitting(true);

        // Parse the date from formatted_date to Y-m-d format
        const parseDate = (formattedDate: string): string => {
            // Handle formatted date like "Rabu, 31 Desember 2025"
            const months: Record<string, string> = {
                Januari: '01',
                Februari: '02',
                Maret: '03',
                April: '04',
                Mei: '05',
                Juni: '06',
                Juli: '07',
                Agustus: '08',
                September: '09',
                Oktober: '10',
                November: '11',
                Desember: '12',
            };

            const parts = formattedDate.split(', ')[1]?.split(' ') || [];
            if (parts.length === 3) {
                const day = parts[0].padStart(2, '0');
                const month = months[parts[1]] || '01';
                const year = parts[2];
                return `${year}-${month}-${day}`;
            }
            return formattedDate;
        };

        const formData = {
            doctor_id: doctorId,
            booking_date: parseDate(bookingData.selectedDate),
            start_time: bookingData.selectedTime, // Already in HH:mm format
            service: bookingData.service,
            type: bookingData.serviceType,
            patient_name: bookingData.fullName,
            patient_nik: bookingData.nik,
            patient_email: bookingData.email || null,
            patient_phone: bookingData.whatsapp,
            patient_birthdate: bookingData.birthdate,
            patient_address: bookingData.address,
        };

        router.post('/booking/create', formData, {
            onSuccess: () => {
                // Reset booking context after successful submission
                resetBookingData();
            },
            onError: () => {
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <div className="space-y-6 pt-2">
                {/* Checkbox */}
                <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-4 transition-all hover:bg-white hover:shadow-sm">
                    <div className="relative flex items-center pt-0.5">
                        <input
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:border-primary checked:bg-primary hover:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                            type="checkbox"
                            checked={isTermsAgreed}
                            onChange={(e) => setIsTermsAgreed(e.target.checked)}
                        />
                        <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            check
                        </span>
                    </div>
                    <div className="select-none text-sm">
                        <span className="text-gray-700">
                            Saya setuju dengan
                        </span>
                        <button
                            type="button"
                            className="ml-1 font-medium text-primary hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                        >
                            syarat &amp; ketentuan
                        </button>
                        <span className="text-gray-700">
                            {' '}
                            yang berlaku di klinik ini.
                        </span>
                    </div>
                </label>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row">
                    <Link
                        href={`/doctors/${doctorId}/booking/patient-data`}
                        className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        Ubah Data
                    </Link>
                    {isTermsAgreed ? (
                        <button
                            type="button"
                            onClick={handleConfirmBooking}
                            disabled={isSubmitting}
                            className={`flex-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all ${
                                isSubmitting
                                    ? 'cursor-not-allowed bg-gray-400'
                                    : 'cursor-pointer bg-primary shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Konfirmasi Booking</span>
                                    <span className="material-symbols-outlined text-[20px]">
                                        arrow_forward
                                    </span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="flex-2 flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-300 px-6 py-3 font-bold text-gray-500"
                        >
                            <span>Konfirmasi Booking</span>
                            <span className="material-symbols-outlined text-[20px]">
                                arrow_forward
                            </span>
                        </button>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <span className="material-symbols-outlined text-[14px]">
                        lock
                    </span>
                    <span>Data Anda dilindungi dan terenkripsi.</span>
                </div>
            </div>

            {/* Terms & Conditions Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="text-lg font-bold text-text-light">
                                Syarat &amp; Ketentuan
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex size-8 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                                <h4 className="font-semibold text-text-light">
                                    1. Ketentuan Umum
                                </h4>
                                <p>
                                    Dengan melakukan booking melalui sistem ini,
                                    Anda menyetujui untuk mematuhi semua syarat
                                    dan ketentuan yang berlaku di Cantika Dental
                                    Care.
                                </p>

                                <h4 className="font-semibold text-text-light">
                                    2. Jadwal Kunjungan
                                </h4>
                                <p>
                                    Pasien diharapkan hadir 15 menit sebelum
                                    jadwal yang telah ditentukan. Keterlambatan
                                    lebih dari 30 menit dapat mengakibatkan
                                    pembatalan otomatis booking.
                                </p>

                                <h4 className="font-semibold text-text-light">
                                    3. Pembatalan
                                </h4>
                                <p>
                                    Pembatalan dapat dilakukan minimal 3 jam
                                    sebelum jadwal kunjungan melalui WhatsApp
                                    atau menghubungi klinik secara langsung.
                                </p>

                                <h4 className="font-semibold text-text-light">
                                    4. Pembayaran
                                </h4>
                                <p>
                                    Pembayaran dilakukan langsung di klinik
                                    setelah tindakan selesai. Kami menerima
                                    pembayaran tunai dan non-tunai (kartu
                                    debit/kredit, QRIS).
                                </p>

                                <h4 className="font-semibold text-text-light">
                                    5. Data Pribadi
                                </h4>
                                <p>
                                    Data pribadi Anda akan dijaga kerahasiaannya
                                    dan hanya digunakan untuk keperluan
                                    pelayanan kesehatan di klinik kami sesuai
                                    dengan peraturan yang berlaku.
                                </p>

                                <h4 className="font-semibold text-text-light">
                                    6. Perubahan Jadwal
                                </h4>
                                <p>
                                    Klinik berhak melakukan perubahan jadwal
                                    apabila terjadi kondisi darurat. Kami akan
                                    menginformasikan perubahan tersebut melalui
                                    WhatsApp yang terdaftar.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-100 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsTermsAgreed(true);
                                    setIsModalOpen(false);
                                }}
                                className="w-full cursor-pointer rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
                            >
                                Saya Setuju
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
