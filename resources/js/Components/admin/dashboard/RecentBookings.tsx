interface BookingItem {
    id: string;
    patientName: string;
    patientAvatar: string | null; // Allow null for fallback
    patientInitials?: string; // Optional for fallback
    service: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'New';
}

interface RecentBookingsProps {
    bookings: BookingItem[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    const getStatusBadge = (status: BookingItem['status']) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'New':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                    Booking Terbaru
                </h3>
                <button className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-primary/30 transition-colors hover:bg-sky-600">
                    + Add Booking
                </button>
            </div>
            <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Patient Name</th>
                            <th className="px-6 py-4">Service</th>
                            <th className="px-6 py-4">Doctor</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {booking.patientAvatar ? (
                                            <img
                                                className="size-9 rounded-full object-cover"
                                                alt={`Avatar of ${booking.patientName}`}
                                                src={booking.patientAvatar}
                                            />
                                        ) : (
                                            <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
                                                {booking.patientInitials}
                                            </div>
                                        )}
                                        <span className="font-medium text-slate-900">
                                            {booking.patientName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {booking.service}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {booking.doctorName}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex flex-col">
                                        <span>{booking.date}</span>
                                        <span className="text-xs text-slate-400">
                                            {booking.time}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                            booking.status,
                                        )}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="cursor-pointer text-slate-400 transition-colors hover:text-primary">
                                        <span className="material-symbols-outlined text-xl">
                                            more_vert
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
