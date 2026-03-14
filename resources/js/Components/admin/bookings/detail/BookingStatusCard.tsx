import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface BookingStatusCardProps {
    bookingId: number;
    code: string;
    createdDate: string;
    status: string; // The raw status value like 'confirmed', 'checked_in', etc.
    rawStatus: string; // Raw status for conditional logic
}

export function BookingStatusCard({
    bookingId,
    code,
    createdDate,
    status,
    rawStatus,
}: BookingStatusCardProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCheckinConfirm, setShowCheckinConfirm] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    // Only show check-in and cancel for 'confirmed' status
    const canCheckinOrCancel = rawStatus === 'confirmed';
    // Reschedule available for confirmed and pending
    const canReschedule = rawStatus === 'confirmed' || rawStatus === 'pending';

    const handleClearBookingSession = () => {
        // Clear booking context state before navigating
        try {
            sessionStorage.removeItem('bookingData');
        } catch (error) {
            console.error('Error clearing booking data:', error);
        }
    };

    const handleCheckin = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        router.post(
            '/admin/checkin/perform',
            { code: code.replace('#', '') },
            {
                onFinish: () => {
                    setIsSubmitting(false);
                    setShowCheckinConfirm(false);
                },
            },
        );
    };

    const handleCancel = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        router.post(
            `/admin/bookings/${bookingId}/cancel`,
            {},
            {
                onFinish: () => {
                    setIsSubmitting(false);
                    setShowCancelConfirm(false);
                },
            },
        );
    };

    // Get status badge styles based on status
    const getStatusBadgeStyles = () => {
        switch (rawStatus) {
            case 'confirmed':
                return 'border-blue-200 bg-blue-100 text-blue-800';
            case 'checked_in':
                return 'border-green-200 bg-green-100 text-green-800';
            case 'cancelled':
                return 'border-red-200 bg-red-100 text-red-800';
            case 'no_show':
                return 'border-gray-200 bg-gray-100 text-gray-800';
            case 'completed':
                return 'border-emerald-200 bg-emerald-100 text-emerald-800';
            default:
                return 'border-amber-200 bg-amber-100 text-amber-800';
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-1 flex items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-900">
                            #{code.replace('#', '')}
                        </h2>
                        <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyles()}`}
                        >
                            {status}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Dipesan pada {createdDate}
                    </p>
                </div>
            </div>

            {/* Checkin Confirmation Dialog */}
            {showCheckinConfirm && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="mb-3 text-sm font-medium text-green-800">
                        Apakah Anda yakin ingin melakukan check-in untuk booking
                        ini?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowCheckinConfirm(false)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleCheckin}
                            disabled={isSubmitting}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Memproses...' : 'Ya, Check-in'}
                        </button>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Dialog */}
            {showCancelConfirm && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="mb-3 text-sm font-medium text-red-800">
                        Apakah Anda yakin ingin membatalkan booking ini?
                        Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowCancelConfirm(false)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Tidak
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Membatalkan...' : 'Ya, Batalkan'}
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                {/* Left side buttons */}
                <div className="flex flex-wrap gap-3">
                    {canCheckinOrCancel && (
                        <>
                            <button
                                onClick={() => setShowCheckinConfirm(true)}
                                disabled={
                                    isSubmitting ||
                                    showCheckinConfirm ||
                                    showCancelConfirm
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    how_to_reg
                                </span>
                                Check-in
                            </button>
                            <button
                                onClick={() => setShowCancelConfirm(true)}
                                disabled={
                                    isSubmitting ||
                                    showCheckinConfirm ||
                                    showCancelConfirm
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    cancel
                                </span>
                                Batalkan
                            </button>
                        </>
                    )}
                    {canReschedule && (
                        <Link
                            href={`/admin/bookings/${bookingId}/reschedule`}
                            onClick={handleClearBookingSession}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                event_repeat
                            </span>
                            Reschedule
                        </Link>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Edit button on the right */}
                <Link
                    href={`/admin/bookings/${bookingId}/edit`}
                    onClick={handleClearBookingSession}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        edit
                    </span>
                    Edit
                </Link>
            </div>
        </div>
    );
}
