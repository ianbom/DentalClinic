'use client';

import { useBooking } from '@/context/BookingContext';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface CustomerDataFormProps {
    doctorId: string;
}

export function CustomerDataForm({ doctorId }: CustomerDataFormProps) {
    const { bookingData, setBookingData } = useBooking();
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setBookingData({ [field]: value });
        // Reset verification status when phone number changes
        if (field === 'whatsapp') {
            setVerificationSent(false);
            setVerificationError('');
        }
    };

    const handleVerifyWhatsApp = () => {
        if (!bookingData.whatsapp || bookingData.whatsapp.length < 10) {
            setVerificationError('Masukkan nomor WhatsApp yang valid');
            return;
        }

        setIsVerifying(true);
        setVerificationError('');

        router.post(
            '/verify-wa',
            { patient_phone: bookingData.whatsapp },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setVerificationSent(true);
                    setIsVerifying(false);
                },
                onError: () => {
                    setVerificationError(
                        'Gagal mengirim pesan verifikasi. Coba lagi.',
                    );
                    setIsVerifying(false);
                },
            },
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Heading */}
            <div className="flex flex-col gap-2 border-b border-subtle-light pb-6">
                <h1 className="text-3xl font-bold leading-tight text-text-light">
                    Isi Data Diri
                </h1>
                <p className="text-sm text-gray-500">
                    Pastikan nomor WhatsApp aktif untuk verifikasi pesanan dan
                    notifikasi jadwal.
                </p>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-6">
                {/* Nama Lengkap & NIK */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-medium text-text-light"
                            htmlFor="fullname"
                        >
                            Nama Lengkap*
                        </label>
                        <input
                            className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            id="fullname"
                            placeholder="Masukkan nama lengkap Anda sesuai KTP"
                            type="text"
                            required
                            value={bookingData.fullName}
                            onChange={(e) =>
                                handleInputChange('fullName', e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-medium text-text-light"
                            htmlFor="nik"
                        >
                            NIK*
                        </label>
                        <input
                            className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            id="nik"
                            placeholder="Masukkan NIK Anda sesuai KTP"
                            type="text"
                            required
                            value={bookingData.nik}
                            onChange={(e) =>
                                handleInputChange('nik', e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Nomor WhatsApp & Email Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Nomor WhatsApp */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-medium text-text-light"
                            htmlFor="whatsapp"
                        >
                            Nomor WhatsApp*
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <span className="font-medium text-gray-500">
                                    📞
                                </span>
                                <div className="ml-2 h-4 w-px bg-gray-300"></div>
                            </div>
                            <input
                                className="flex h-12 w-full rounded-lg border border-gray-200 bg-white py-3 pl-[70px] pr-4 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                id="whatsapp"
                                placeholder="0812-3456-7890"
                                type="tel"
                                required
                                value={bookingData.whatsapp}
                                onChange={(e) =>
                                    handleInputChange(
                                        'whatsapp',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        {/* Verify WhatsApp Button */}
                        <button
                            type="button"
                            onClick={handleVerifyWhatsApp}
                            disabled={
                                isVerifying ||
                                !bookingData.whatsapp ||
                                bookingData.whatsapp.length < 10
                            }
                            className={`mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                isVerifying ||
                                !bookingData.whatsapp ||
                                bookingData.whatsapp.length < 10
                                    ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                    : 'cursor-pointer bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {isVerifying ? 'hourglass_empty' : 'verified'}
                            </span>
                            {isVerifying
                                ? 'Mengirim...'
                                : 'Verifikasi Nomor WhatsApp'}
                        </button>

                        {/* Success Message */}
                        {verificationSent && (
                            <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        check_circle
                                    </span>
                                    <p>
                                        Pesan verifikasi telah dikirim ke
                                        WhatsApp Anda, jika sudah menerima
                                        lanjutkan proses booking. Jika belum cek
                                        kembali nomor Anda.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {verificationError && (
                            <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        error
                                    </span>
                                    <p>{verificationError}</p>
                                </div>
                            </div>
                        )}

                        <p className="mt-1 text-xs text-gray-400">
                            Klik tombol di atas untuk memverifikasi nomor
                            WhatsApp Anda.
                        </p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-medium text-text-light"
                            htmlFor="email"
                        >
                            Email{' '}
                            <span className="font-normal text-gray-400">
                                (Opsional)
                            </span>
                        </label>
                        <input
                            className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            id="email"
                            placeholder="contoh@email.com"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) =>
                                handleInputChange('email', e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Keluhan / Catatan */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium text-text-light"
                        htmlFor="notes"
                    >
                        Keluhan / Catatan{' '}
                        <span className="font-normal text-gray-400">
                            (Opsional)
                        </span>
                    </label>
                    <textarea
                        className="flex w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        id="notes"
                        placeholder="Jelaskan keluhan singkat atau catatan khusus untuk dokter..."
                        rows={4}
                        value={bookingData.complaint}
                        onChange={(e) =>
                            handleInputChange('complaint', e.target.value)
                        }
                    ></textarea>
                </div>

                {/* CTA Buttons */}
                <div className="mt-4 flex flex-col justify-end gap-3 border-t border-subtle-light pt-4 sm:flex-row">
                    {/* Tombol Kembali */}
                    <Link
                        href={`/doctors/${doctorId}/booking`}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 md:w-auto"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            arrow_back
                        </span>
                        <span>Kembali</span>
                    </Link>

                    {/* Tombol Lanjut */}
                    <Link
                        href={`/doctors/${doctorId}/booking/patient-data/review`}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary-dark focus:ring-4 focus:ring-primary/20 md:w-auto"
                    >
                        <span>Lanjut ke Review</span>
                        <span className="material-symbols-outlined text-[20px]">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
