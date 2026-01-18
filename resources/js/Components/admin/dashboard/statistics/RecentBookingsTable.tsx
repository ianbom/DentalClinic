export interface RecentBookingItem {
    id: string;
    patient_name: string;
    patient_avatar?: string;
    doctor_name: string;
    date_time: string;
    status: 'pending' | 'completed' | 'cancelled';
}

interface RecentBookingsTableProps {
    title?: string;
    bookings: RecentBookingItem[];
    viewAllLink?: string;
    onViewBooking?: (id: string) => void;
}

export function RecentBookingsTable({
    title = 'Recent Bookings',
    bookings,
    viewAllLink = '#',
    onViewBooking,
}: RecentBookingsTableProps) {
    const getStatusBadge = (
        status: RecentBookingItem['status'],
    ): { className: string; label: string } => {
        switch (status) {
            case 'pending':
                return {
                    className: 'bg-amber-100 text-amber-600',
                    label: 'Pending',
                };
            case 'completed':
                return {
                    className: 'bg-green-100 text-green-600',
                    label: 'Completed',
                };
            case 'cancelled':
                return {
                    className: 'bg-red-100 text-red-600',
                    label: 'Cancelled',
                };
            default:
                return {
                    className: 'bg-slate-100 text-slate-600',
                    label: 'Unknown',
                };
        }
    };

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <a
                    href={viewAllLink}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    View All
                </a>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 text-xs text-slate-500">
                            <th className="px-2 py-3 font-medium">ID</th>
                            <th className="px-2 py-3 font-medium">
                                Patient Name
                            </th>
                            <th className="px-2 py-3 font-medium">Doctor</th>
                            <th className="px-2 py-3 font-medium">Date/Time</th>
                            <th className="px-2 py-3 font-medium">Status</th>
                            <th className="px-2 py-3 text-right font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {bookings.map((booking) => {
                            const statusBadge = getStatusBadge(booking.status);
                            return (
                                <tr
                                    key={booking.id}
                                    className="group border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                                >
                                    <td className="px-2 py-3 font-medium text-slate-900">
                                        {booking.id}
                                    </td>
                                    <td className="px-2 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
                                                {booking.patient_avatar ? (
                                                    <img
                                                        src={
                                                            booking.patient_avatar
                                                        }
                                                        alt={
                                                            booking.patient_name
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-400">
                                                        {booking.patient_name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-slate-700">
                                                {booking.patient_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-3 text-slate-500">
                                        {booking.doctor_name}
                                    </td>
                                    <td className="px-2 py-3 text-slate-500">
                                        {booking.date_time}
                                    </td>
                                    <td className="px-2 py-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusBadge.className}`}
                                        >
                                            {statusBadge.label}
                                        </span>
                                    </td>
                                    <td className="px-2 py-3 text-right">
                                        <button
                                            onClick={() =>
                                                onViewBooking?.(booking.id)
                                            }
                                            className="p-1 text-slate-400 transition-colors hover:text-primary"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                visibility
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {bookings.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-400">
                        No recent bookings found.
                    </div>
                )}
            </div>
        </div>
    );
}
