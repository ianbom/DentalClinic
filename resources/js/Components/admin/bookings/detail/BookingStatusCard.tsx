import { Link } from '@inertiajs/react';

interface BookingStatusCardProps {
    bookingId: number;
    code: string;
    createdDate: string;
    status: string; // Could be an enum if strictly typed
}

export function BookingStatusCard({
    bookingId,
    code,
    createdDate,
    status,
}: BookingStatusCardProps) {
    const handleRescheduleClick = () => {
        // Clear booking context state before navigating
        try {
            sessionStorage.removeItem('bookingData');
        } catch (error) {
            console.error('Error clearing booking data:', error);
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-1 flex items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-900">
                            {code}
                        </h2>
                        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                            {status}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Dibuat pada {createdDate}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600">
                    <span className="material-symbols-outlined text-[20px]">
                        check_circle
                    </span>
                    Konfirmasi Booking
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
                    <span className="material-symbols-outlined text-[20px]">
                        cancel
                    </span>
                    Batalkan
                </button>
                <Link
                    href={`/admin/bookings/${bookingId}/reschedule`}
                    onClick={handleRescheduleClick}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        event_repeat
                    </span>
                    Reschedule Booking
                </Link>
            </div>
        </div>
    );
}
