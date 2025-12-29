'use client';

import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

interface BookingResultCardProps {
    onDownload?: () => void;
}

export function BookingResultCard({ onDownload }: BookingResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current || isDownloading) return;

        setIsDownloading(true);

        try {
            // Hide action buttons temporarily for clean screenshot
            const actionsFooter =
                cardRef.current.querySelector('.actions-footer');
            if (actionsFooter) {
                (actionsFooter as HTMLElement).style.display = 'none';
            }

            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                skipFonts: true,
                filter: (node) => {
                    // Skip external stylesheets that may cause CORS issues
                    if (
                        node instanceof HTMLLinkElement &&
                        node.rel === 'stylesheet'
                    ) {
                        return false;
                    }
                    return true;
                },
            });

            // Restore action buttons
            if (actionsFooter) {
                (actionsFooter as HTMLElement).style.display = '';
            }

            // Create download link
            const link = document.createElement('a');
            link.download = `booking-dentalcare-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            if (onDownload) onDownload();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Gagal mengunduh bukti booking. Silakan coba lagi.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div
            ref={cardRef}
            className="animate-fade-in overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200"
        >
            {/* Header Status */}
            <div
                style={{
                    backgroundColor: '#f0fdf4',
                    borderBottom: '1px solid #dcfce7',
                }}
                className="flex flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center"
            >
                <div className="flex items-center gap-3">
                    <div
                        style={{ backgroundColor: '#dcfce7' }}
                        className="flex size-10 items-center justify-center rounded-full text-green-600"
                    >
                        <span className="material-symbols-outlined">
                            check_circle
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Status Booking
                        </p>
                        <p className="text-lg font-bold leading-tight text-green-700">
                            Terkonfirmasi
                        </p>
                    </div>
                </div>
                <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-500">Kode Booking</p>
                    <p className="font-mono text-lg font-bold text-gray-900">
                        #BKG-8821
                    </p>
                </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
                {/* Left Column: Patient Info */}
                <div className="space-y-6">
                    <h3 className="mb-4 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                        Informasi Pasien
                    </h3>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            person
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Nama Pasien
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                Sarah Wijaya
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            badge
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                NIK
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                3171234567890001
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            smartphone
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Nomor WhatsApp
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                0812-****-7890
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            email
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Email
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                sarahw@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Appointment Info */}
                <div className="space-y-6">
                    <h3 className="mb-4 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                        Detail Janji Temu
                    </h3>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            stethoscope
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Dokter
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                Dr. Budi Santoso, Sp.KG
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            calendar_clock
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Jadwal
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                Kamis, 24 Okt 2023
                            </p>
                            <p className="text-sm text-gray-500">
                                Pukul 10:00 WIB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            location_on
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Lokasi
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                DentalCare Clinic
                            </p>
                            <p className="text-sm text-gray-500">
                                Jl. Kesehatan No. 123, Jakarta Selatan
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Note */}
            <div
                style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #dbeafe',
                }}
                className="mx-6 mb-6 flex gap-3 rounded-lg p-4 md:mx-8"
            >
                <span className="material-symbols-outlined shrink-0 text-blue-600">
                    info
                </span>
                <div>
                    <p className="text-sm font-bold text-blue-800">
                        Informasi Pembayaran
                    </p>
                    <p className="mt-1 text-sm text-blue-700">
                        Pembayaran dilakukan secara manual saat Anda tiba di
                        klinik. Mohon datang 15 menit sebelum jadwal.
                    </p>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="actions-footer flex flex-col items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4 sm:flex-row">
                <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 sm:w-auto">
                    <span className="material-symbols-outlined text-[18px]">
                        cancel
                    </span>
                    Batalkan Booking
                </button>
                <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-200 sm:w-auto">
                    <span className="material-symbols-outlined text-[18px]">
                        chat
                    </span>
                    Hubungi Admin
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0da2e7] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0b8fd0] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {isDownloading ? 'hourglass_empty' : 'download'}
                    </span>
                    {isDownloading ? 'Mengunduh...' : 'Unduh Bukti'}
                </button>
            </div>
        </div>
    );
}
