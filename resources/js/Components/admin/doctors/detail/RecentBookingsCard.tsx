import { Link } from '@inertiajs/react';

interface BookingItem {
    id: number;
    patient_name: string;
    patient_avatar: string | null;
    treatment: string;
    date: string;
    time: string;
    status: string;
}

interface RecentBookingsCardProps {
    bookings: BookingItem[];
}

const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
            return 'text-sky-500';
        case 'pending':
            return 'text-orange-500';
        case 'completed':
        case 'selesai':
            return 'text-teal-500';
        case 'cancelled':
            return 'text-red-500';
        default:
            return 'text-slate-500';
    }
};

const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
            return 'Confirmed';
        case 'pending':
            return 'Pending';
        case 'completed':
            return 'Selesai';
        case 'cancelled':
            return 'Dibatalkan';
        default:
            return status;
    }
};

export function RecentBookingsCard({ bookings }: RecentBookingsCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                    Jadwal Booking Terbaru
                </h3>
                <Link
                    href="/admin/bookings"
                    className="text-sm font-bold text-sky-500 hover:underline"
                >
                    Lihat Semua
                </Link>
            </div>
            <div className="divide-y divide-slate-100">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex flex-col items-center justify-between gap-4 p-6 transition-colors hover:bg-slate-50 sm:flex-row"
                        >
                            <div className="flex w-full items-center gap-4 sm:w-auto">
                                <div>
                                    <h4 className="font-bold text-slate-900">
                                        {booking.patient_name}
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        {booking.treatment}
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full flex-row items-center justify-between gap-1 sm:w-auto sm:flex-col sm:items-end">
                                <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                                    <span className="material-symbols-outlined text-[16px] text-slate-400">
                                        calendar_today
                                    </span>
                                    <span>
                                        {booking.date}, {booking.time}
                                    </span>
                                </div>
                                <span
                                    className={`text-sm font-bold ${getStatusBadge(
                                        booking.status,
                                    )}`}
                                >
                                    {getStatusLabel(booking.status)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-slate-500">
                        Belum ada booking untuk dokter ini.
                    </div>
                )}
            </div>
        </div>
    );
}
