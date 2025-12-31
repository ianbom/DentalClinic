import { BookingDetail } from '@/types';

interface BookingTimelineProps {
    booking: BookingDetail;
}

export function BookingTimeline({ booking }: BookingTimelineProps) {
    const isConfirmed = booking.status === 'confirmed';
    const isCheckedIn = booking.status === 'checked_in';
    const isCancelled = booking.status === 'cancelled';

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">
                    Timeline Status
                </h3>
            </div>
            <div className="p-6">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute bottom-2 left-3.5 top-2 w-0.5 bg-slate-200"></div>

                    {/* Step 1: Created - Always completed */}
                    <TimelineStep
                        icon="add_circle"
                        title="Booking Dibuat"
                        time={booking.created_at_formatted}
                        status="completed"
                    />

                    {/* Step 2: Confirmed */}
                    <TimelineStep
                        icon={isCancelled ? 'cancel' : 'check_circle'}
                        title={
                            isCancelled
                                ? 'Booking Dibatalkan'
                                : 'Booking Dikonfirmasi'
                        }
                        time={
                            isCancelled && booking.cancellation
                                ? booking.cancellation.cancelled_at
                                : isConfirmed || isCheckedIn
                                  ? 'Terkonfirmasi'
                                  : undefined
                        }
                        description={
                            isCancelled && booking.cancellation
                                ? `Oleh ${booking.cancellation.cancelled_by}: ${booking.cancellation.reason}`
                                : undefined
                        }
                        status={
                            isCancelled
                                ? 'cancelled'
                                : isConfirmed || isCheckedIn
                                  ? 'completed'
                                  : 'current'
                        }
                    />

                    {/* Step 3: Check-in */}
                    {!isCancelled && (
                        <TimelineStep
                            icon="how_to_reg"
                            title="Pasien Check-in"
                            time={
                                booking.checkin
                                    ? booking.checkin.checked_in_at_formatted
                                    : undefined
                            }
                            status={
                                isCheckedIn
                                    ? 'completed'
                                    : isConfirmed
                                      ? 'current'
                                      : 'pending'
                            }
                        />
                    )}

                    {/* Step 4: Completed */}
                    {!isCancelled && (
                        <TimelineStep
                            icon="flag"
                            title="Selesai"
                            time={isCheckedIn ? 'Selesai' : undefined}
                            status={isCheckedIn ? 'completed' : 'pending'}
                            isLast
                        />
                    )}

                    {/* Reschedules if any */}
                    {booking.reschedules.length > 0 && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h4 className="mb-4 text-sm font-semibold text-slate-600">
                                Riwayat Reschedule
                            </h4>
                            {booking.reschedules.map((reschedule) => (
                                <TimelineStep
                                    key={reschedule.id}
                                    icon="schedule"
                                    title="Jadwal Diubah"
                                    time={reschedule.created_at}
                                    description={`${reschedule.old_date} ${reschedule.old_time} → ${reschedule.new_date} ${reschedule.new_time}`}
                                    status="completed"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface TimelineStepProps {
    icon: string;
    title: string;
    time?: string;
    description?: string;
    status: 'completed' | 'current' | 'pending' | 'cancelled';
    isLast?: boolean;
}

function TimelineStep({
    icon,
    title,
    time,
    description,
    status,
    isLast = false,
}: TimelineStepProps) {
    const getIconStyles = () => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 ring-2 ring-green-100 text-green-600';
            case 'current':
                return 'bg-primary ring-4 ring-primary/20 text-white animate-pulse';
            case 'cancelled':
                return 'bg-red-100 ring-2 ring-red-100 text-red-600';
            default:
                return 'bg-slate-100 text-slate-400';
        }
    };

    const getTitleStyles = () => {
        switch (status) {
            case 'current':
                return 'text-primary';
            case 'cancelled':
                return 'text-red-600';
            default:
                return 'text-slate-900';
        }
    };

    return (
        <div
            className={`relative flex items-start gap-4 ${isLast ? '' : 'mb-8'} ${status === 'pending' ? 'opacity-50' : ''}`}
        >
            <div
                className={`relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-white ${getIconStyles()}`}
            >
                <span className="material-symbols-outlined text-[16px] font-bold">
                    {status === 'completed' && icon !== 'schedule'
                        ? 'check'
                        : icon}
                </span>
            </div>
            <div className="flex-1 pt-1">
                <h4 className={`text-sm font-bold ${getTitleStyles()}`}>
                    {title}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                    {time ||
                        (status === 'current' ? 'Proses selanjutnya' : '-')}
                </p>
                {description && (
                    <p className="mt-1 text-xs text-slate-600">{description}</p>
                )}
            </div>
        </div>
    );
}
