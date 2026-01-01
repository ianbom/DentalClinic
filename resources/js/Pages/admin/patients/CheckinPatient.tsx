import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface BookingData {
    id: number;
    code: string;
    status: string;
    service: string;
    booking_date: string;
    booking_date_formatted: string;
    start_time: string;
    patient: {
        name: string;
        nik: string;
        phone: string;
        email: string | null;
    };
    doctor: {
        id: number;
        name: string;
        sip: string;
    };
}

interface CheckInPageProps {
    booking: BookingData | null;
    searchCode: string | null;
}

function CheckInPage({ booking, searchCode }: CheckInPageProps) {
    const [code, setCode] = useState(searchCode || '');
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSearch = () => {
        if (!code.trim()) return;
        setIsSearching(true);
        router.get(
            '/admin/checkin/patiens',
            { bookingCode: code.trim() },
            {
                preserveState: false,
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleCheckin = () => {
        if (!booking) return;
        setIsSubmitting(true);
        router.post(
            '/admin/checkin/perform',
            { code: booking.code },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<
            string,
            { bg: string; text: string; label: string }
        > = {
            pending: {
                bg: 'bg-amber-100 border-amber-200',
                text: 'text-amber-700',
                label: 'Menunggu Konfirmasi',
            },
            confirmed: {
                bg: 'bg-blue-100 border-blue-200',
                text: 'text-blue-700',
                label: 'Terkonfirmasi',
            },
            checked_in: {
                bg: 'bg-green-100 border-green-200',
                text: 'text-green-700',
                label: 'Sudah Check-in',
            },
            cancelled: {
                bg: 'bg-red-100 border-red-200',
                text: 'text-red-700',
                label: 'Dibatalkan',
            },
        };
        return (
            styles[status] || {
                bg: 'bg-gray-100 border-gray-200',
                text: 'text-gray-700',
                label: status,
            }
        );
    };

    const canCheckin =
        booking &&
        (booking.status === 'confirmed' || booking.status === 'pending');

    return (
        <div className="flex h-full flex-col bg-[#f8fbfc]">
            <div className="mx-auto w-full max-w-5xl flex-1">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Check-in Pasien
                    </h1>
                    <p className="text-sm text-slate-500">
                        Cari booking dengan kode booking untuk melakukan
                        check-in
                    </p>
                </div>

                {/* Search Form */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                    <div className="flex flex-col items-end gap-6 lg:flex-row">
                        <label className="flex w-full flex-1 flex-col gap-2">
                            <span className="ml-1 text-sm font-semibold text-slate-900">
                                Kode Booking
                            </span>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    qr_code_2
                                </span>
                                <input
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Masukkan Kode (e.g. BKG-20260102ABCDEF)"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSearch()
                                    }
                                />
                            </div>
                        </label>
                        <button
                            onClick={handleSearch}
                            disabled={isSearching || !code.trim()}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-sky-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
                        >
                            <span className="material-symbols-outlined">
                                search
                            </span>
                            {isSearching ? 'Mencari...' : 'Cari Booking'}
                        </button>
                    </div>
                </div>

                {/* Search Result */}
                {searchCode && !booking && (
                    <div className="overflow-hidden rounded-2xl border border-red-200 bg-red-50 shadow-md">
                        <div className="flex items-center gap-4 p-6">
                            <div className="rounded-full bg-red-100 p-2 text-red-600">
                                <span className="material-symbols-outlined text-[24px]">
                                    error
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-red-800">
                                    Booking Tidak Ditemukan
                                </h3>
                                <p className="text-sm text-red-600">
                                    Tidak ada booking dengan kode "{searchCode}
                                    ". Pastikan kode yang dimasukkan benar.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {booking && (
                    <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
                        {/* Status Header */}
                        <div
                            className={`flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 ${booking.status === 'checked_in' ? 'border-green-100 bg-green-50' : 'border-emerald-100 bg-emerald-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`rounded-full p-1 ${booking.status === 'checked_in' ? 'bg-green-100 text-green-600' : 'bg-emerald-100 text-emerald-600'}`}
                                >
                                    <span
                                        className="material-symbols-outlined text-[20px]"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        {booking.status === 'checked_in'
                                            ? 'verified'
                                            : 'check_circle'}
                                    </span>
                                </div>
                                <span
                                    className={`text-lg font-bold ${booking.status === 'checked_in' ? 'text-green-800' : 'text-emerald-800'}`}
                                >
                                    Booking Ditemukan
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${getStatusBadge(booking.status).bg} ${getStatusBadge(booking.status).text}`}
                                >
                                    {getStatusBadge(booking.status).label}
                                </span>
                                <span className="rounded-md border border-emerald-200 bg-white px-3 py-1 shadow-sm">
                                    <span className="font-mono text-xs font-bold tracking-wider text-emerald-700">
                                        #{booking.code}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="p-6 lg:p-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                                {/* Left Column: Patient Info */}
                                <div className="flex flex-col gap-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400">
                                            person
                                        </span>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                            Informasi Pasien
                                        </h3>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
                                            <span className="material-symbols-outlined text-3xl text-slate-400">
                                                person
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xl font-bold text-slate-900">
                                                {booking.patient.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {booking.service ||
                                                    'Pemeriksaan Gigi'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-4">
                                        <div className="flex flex-col border-b border-slate-100 pb-3">
                                            <span className="mb-1 text-xs text-slate-400">
                                                NIK (Nomor Induk Kependudukan)
                                            </span>
                                            <span className="font-mono font-medium text-slate-900">
                                                {booking.patient.nik}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="mb-1 text-xs text-slate-400">
                                                WhatsApp / Telepon
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px] text-green-500">
                                                    chat
                                                </span>
                                                <span className="font-medium text-slate-900">
                                                    {booking.patient.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Schedule Info */}
                                <div className="flex flex-col gap-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400">
                                            calendar_clock
                                        </span>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                            Jadwal &amp; Dokter
                                        </h3>
                                    </div>
                                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-col">
                                                <p className="mb-1 text-xs text-slate-500">
                                                    Dokter Gigi
                                                </p>
                                                <p className="text-lg font-bold text-slate-900">
                                                    {booking.doctor.name}
                                                </p>
                                                <p className="text-sm font-medium text-primary">
                                                    SIP: {booking.doctor.sip}
                                                </p>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <span className="material-symbols-outlined text-2xl text-primary">
                                                    medical_services
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-slate-200"></div>
                                        <div className="flex gap-6">
                                            <div className="flex flex-col">
                                                <p className="mb-1 text-xs text-slate-500">
                                                    Tanggal
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-slate-400">
                                                        event
                                                    </span>
                                                    <p className="text-base font-semibold text-slate-900">
                                                        {
                                                            booking.booking_date_formatted
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="mb-1 text-xs text-slate-500">
                                                    Waktu
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-slate-400">
                                                        schedule
                                                    </span>
                                                    <p className="text-base font-semibold text-slate-900">
                                                        {booking.start_time} WIB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            {canCheckin && (
                                <div className="mt-10 flex flex-col-reverse justify-end gap-4 border-t border-slate-100 pt-6 sm:flex-row">
                                    <button
                                        onClick={() => {
                                            setCode('');
                                            router.get(
                                                '/admin/checkin/patiens',
                                            );
                                        }}
                                        className="h-12 w-full rounded-lg border border-slate-300 px-6 font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleCheckin}
                                        disabled={isSubmitting}
                                        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-sky-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            check_circle
                                        </span>
                                        {isSubmitting
                                            ? 'Memproses...'
                                            : 'Konfirmasi Check-in'}
                                    </button>
                                </div>
                            )}

                            {booking.status === 'checked_in' && (
                                <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="material-symbols-outlined text-green-600"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            verified
                                        </span>
                                        <p className="text-sm font-medium text-green-800">
                                            Pasien ini sudah melakukan check-in
                                            sebelumnya.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {booking.status === 'cancelled' && (
                                <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-red-600">
                                            cancel
                                        </span>
                                        <p className="text-sm font-medium text-red-800">
                                            Booking ini sudah dibatalkan dan
                                            tidak dapat di-check-in.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

CheckInPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default CheckInPage;
