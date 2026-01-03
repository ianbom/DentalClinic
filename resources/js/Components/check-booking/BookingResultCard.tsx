'use client';

import { Booking } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

interface BookingResultCardProps {
    booking: Booking;
}

export function BookingResultCard({ booking }: BookingResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const { errors, flash } = usePage().props as {
        errors?: Record<string, string>;
        flash?: { success?: string };
    };

    const patientDetail = booking.patient || booking.patient_detail;
    const doctor = booking.doctor;

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Format time
    const formatTime = (timeString: string): string => {
        if (!timeString) return 'Menunggu Konfirmasi Admin';
        return timeString.slice(0, 5) + ' WIB';
    };

    // Mask phone number for privacy
    const maskPhone = (phone: string): string => {
        if (phone.length < 8) return phone;
        return phone.slice(0, 4) + '-****-' + phone.slice(-4);
    };

    const maskNik = (nik: string): string => {
        if (!nik || nik.length !== 16) return nik;
        return nik.slice(0, 6) + '********' + nik.slice(14);
    };

    // Format birthdate from ISO to readable date
    const formatBirthdate = (dateString: string): string => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Check if can check-in (booking is today and within 1 hour before)
    const canCheckin = (): { allowed: boolean; reason: string } => {
        if (booking.status === 'checked_in') {
            return { allowed: false, reason: 'Anda sudah melakukan check-in.' };
        }
        if (booking.status === 'cancelled') {
            return { allowed: false, reason: 'Booking ini sudah dibatalkan.' };
        }

        const today = new Date();
        const bookingDate = new Date(booking.booking_date);

        // Check if same day
        if (
            today.getFullYear() !== bookingDate.getFullYear() ||
            today.getMonth() !== bookingDate.getMonth() ||
            today.getDate() !== bookingDate.getDate()
        ) {
            return {
                allowed: false,
                reason: 'Check-in hanya bisa dilakukan pada hari H booking.',
            };
        }

        // Parse booking time
        const [hours, minutes] = booking.start_time.split(':').map(Number);
        const bookingDateTime = new Date(bookingDate);
        bookingDateTime.setHours(hours, minutes, 0, 0);

        const oneHourBefore = new Date(
            bookingDateTime.getTime() - 60 * 60 * 1000,
        );
        const now = new Date();

        if (now < oneHourBefore) {
            const availableTime = oneHourBefore.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
            });
            return {
                allowed: false,
                reason: `Check-in baru bisa dilakukan mulai pukul ${availableTime} WIB.`,
            };
        }

        if (now > bookingDateTime) {
            return {
                allowed: false,
                reason: 'Waktu booking sudah lewat.',
            };
        }

        return { allowed: true, reason: '' };
    };

    const checkinStatus = canCheckin();

    // Get status display
    const getStatusDisplay = (status: string) => {
        const statusMap: Record<
            string,
            { label: string; bgColor: string; textColor: string; icon: string }
        > = {
            confirmed: {
                label: 'Terkonfirmasi',
                bgColor: '#f0fdf4',
                textColor: 'text-green-700',
                icon: 'check_circle',
            },
            checked_in: {
                label: 'Sudah Check-in',
                bgColor: '#eff6ff',
                textColor: 'text-blue-700',
                icon: 'how_to_reg',
            },
            cancelled: {
                label: 'Dibatalkan',
                bgColor: '#fef2f2',
                textColor: 'text-red-700',
                icon: 'cancel',
            },
            no_show: {
                label: 'Tidak Hadir',
                bgColor: '#fef3c7',
                textColor: 'text-yellow-700',
                icon: 'warning',
            },
        };
        return (
            statusMap[status] || {
                label: status,
                bgColor: '#f3f4f6',
                textColor: 'text-gray-700',
                icon: 'help',
            }
        );
    };

    const statusDisplay = getStatusDisplay(booking.status);

    const handleCheckin = () => {
        if (!checkinStatus.allowed || isCheckingIn) return;

        setIsCheckingIn(true);
        router.post(
            '/booking/checkin',
            { code: booking.code },
            {
                preserveScroll: true,
                onFinish: () => setIsCheckingIn(false),
            },
        );
    };

    const handleDownload = async () => {
        if (!cardRef.current || isDownloading) return;

        setIsDownloading(true);

        try {
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
                    if (
                        node instanceof HTMLLinkElement &&
                        node.rel === 'stylesheet'
                    ) {
                        return false;
                    }
                    return true;
                },
            });

            if (actionsFooter) {
                (actionsFooter as HTMLElement).style.display = '';
            }

            const link = document.createElement('a');
            link.download = `booking-${booking.code}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
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
            {/* Success Message */}
            {flash?.success && (
                <div className="flex items-center gap-3 border-b border-green-200 bg-green-50 px-6 py-3">
                    <span className="material-symbols-outlined text-green-600">
                        check_circle
                    </span>
                    <p className="text-sm font-medium text-green-700">
                        {flash.success}
                    </p>
                </div>
            )}

            {/* Error Message */}
            {errors?.checkin && (
                <div className="flex items-center gap-3 border-b border-red-200 bg-red-50 px-6 py-3">
                    <span className="material-symbols-outlined text-red-600">
                        error
                    </span>
                    <p className="text-sm font-medium text-red-700">
                        {errors.checkin}
                    </p>
                </div>
            )}

            {/* Header Status */}
            <div
                style={{
                    backgroundColor: statusDisplay.bgColor,
                    borderBottom: '1px solid #dcfce7',
                }}
                className="flex flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center"
            >
                <div className="flex items-center gap-3">
                    <div
                        style={{ backgroundColor: '#dcfce7' }}
                        className={`flex size-10 items-center justify-center rounded-full ${statusDisplay.textColor}`}
                    >
                        <span className="material-symbols-outlined">
                            {statusDisplay.icon}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Status Booking
                        </p>
                        <p
                            className={`text-lg font-bold leading-tight ${statusDisplay.textColor}`}
                        >
                            {statusDisplay.label}
                        </p>
                    </div>
                </div>
                <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-500">Kode Booking</p>
                    <p className="font-mono text-lg font-bold text-gray-900">
                        {booking.code}
                    </p>
                </div>
            </div>

            {/* Check-in Section */}
            {booking.status === 'confirmed' && (
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h3 className="text-sm font-bold text-gray-700">
                                Check-in Online
                            </h3>
                            {checkinStatus.allowed ? (
                                <p className="mt-1 text-sm text-green-600">
                                    ✓ Anda bisa melakukan check-in sekarang
                                </p>
                            ) : (
                                <p className="mt-1 text-sm text-gray-500">
                                    {checkinStatus.reason}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleCheckin}
                            disabled={!checkinStatus.allowed || isCheckingIn}
                            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold transition-all ${
                                checkinStatus.allowed && !isCheckingIn
                                    ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
                                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {isCheckingIn
                                    ? 'hourglass_empty'
                                    : 'how_to_reg'}
                            </span>
                            {isCheckingIn
                                ? 'Memproses...'
                                : 'Check-in Sekarang'}
                        </button>
                    </div>
                </div>
            )}

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
                                {patientDetail?.patient_name || '-'}
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
                                {patientDetail?.patient_nik
                                    ? maskNik(patientDetail.patient_nik)
                                    : '-'}
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
                                {patientDetail?.patient_phone
                                    ? maskPhone(patientDetail.patient_phone)
                                    : '-'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            cake
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Tanggal Lahir
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                {patientDetail?.patient_birthdate
                                    ? formatBirthdate(
                                          patientDetail.patient_birthdate,
                                      )
                                    : '-'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            home
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Alamat
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                {patientDetail?.patient_address || '-'}
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
                                {doctor?.name || '-'}
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
                                {formatDate(booking.booking_date)}
                            </p>
                            <p className="text-sm text-gray-500">
                                Pukul {formatTime(booking.start_time)}
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
                                Cantika Dental Care
                            </p>
                            <p className="text-sm text-gray-500">
                                Dandong, Kec. Srengat, Kabupaten Blitar
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-[#0da2e7]">
                            medical_services
                        </span>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Layanan
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                                {booking.service || '-'}
                                {booking.type && (
                                    <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                        {booking.type === 'long'
                                            ? '45 menit'
                                            : '15 menit'}
                                    </span>
                                )}
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
