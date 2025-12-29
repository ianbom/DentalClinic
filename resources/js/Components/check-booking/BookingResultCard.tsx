"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

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
            const actionsFooter = cardRef.current.querySelector('.actions-footer');
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
                    if (node instanceof HTMLLinkElement && node.rel === 'stylesheet') {
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
        <div ref={cardRef} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden transition-colors duration-200 animate-fade-in">
            {/* Header Status */}
            <div style={{ backgroundColor: '#f0fdf4', borderBottom: '1px solid #dcfce7' }} className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div style={{ backgroundColor: '#dcfce7' }} className="size-10 rounded-full flex items-center justify-center text-green-600">
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Status Booking</p>
                        <p className="text-lg font-bold text-green-700 leading-tight">Terkonfirmasi</p>
                    </div>
                </div>
                <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-500">Kode Booking</p>
                    <p className="text-lg font-mono font-bold text-gray-900">#BKG-8821</p>
                </div>
            </div>

            {/* Booking Details Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Patient Info */}
                <div className="space-y-6">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 border-b border-gray-200 pb-2 mb-4">Informasi Pasien</h3>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">person</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Nama Pasien</p>
                            <p className="text-base font-semibold text-gray-900">Sarah Wijaya</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">badge</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">NIK</p>
                            <p className="text-base font-semibold text-gray-900">3171234567890001</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">smartphone</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Nomor WhatsApp</p>
                            <p className="text-base font-semibold text-gray-900">0812-****-7890</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">email</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Email</p>
                            <p className="text-base font-semibold text-gray-900">sarahw@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Appointment Info */}
                <div className="space-y-6">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 border-b border-gray-200 pb-2 mb-4">Detail Janji Temu</h3>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">stethoscope</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Dokter</p>
                            <p className="text-base font-semibold text-gray-900">Dr. Budi Santoso, Sp.KG</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">calendar_clock</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Jadwal</p>
                            <p className="text-base font-semibold text-gray-900">Kamis, 24 Okt 2023</p>
                            <p className="text-sm text-gray-500">Pukul 10:00 WIB</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#0da2e7] mt-0.5">location_on</span>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Lokasi</p>
                            <p className="text-base font-semibold text-gray-900">DentalCare Clinic</p>
                            <p className="text-sm text-gray-500">Jl. Kesehatan No. 123, Jakarta Selatan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Note */}
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe' }} className="mx-6 md:mx-8 mb-6 p-4 rounded-lg flex gap-3">
                <span className="material-symbols-outlined text-blue-600 shrink-0">info</span>
                <div>
                    <p className="text-sm font-bold text-blue-800">Informasi Pembayaran</p>
                    <p className="text-sm text-blue-700 mt-1">Pembayaran dilakukan secara manual saat Anda tiba di klinik. Mohon datang 15 menit sebelum jadwal.</p>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="actions-footer bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-end items-center gap-3">
                <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    Batalkan Booking
                </button>
                <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Hubungi Admin
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#0da2e7] hover:bg-[#0b8fd0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
