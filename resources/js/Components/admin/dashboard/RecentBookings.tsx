interface BookingItem {
    id: string;
    patientName: string;
    patientAvatar: string | null; // Allow null for fallback
    patientInitials?: string; // Optional for fallback
    service: string;
    doctorName: string;
    date: string;
    time: string;
    status: "Confirmed" | "Pending" | "New";
}

interface RecentBookingsProps {
    bookings: BookingItem[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    const getStatusBadge = (status: BookingItem["status"]) => {
        switch (status) {
            case "Confirmed":
                return "bg-green-100 text-green-700 border-green-200";
            case "Pending":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "New":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Booking Terbaru
                </h3>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors shadow-sm shadow-primary/30 cursor-pointer">
                    + Add Booking
                </button>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
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
                                className="hover:bg-slate-50 transition-colors"
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
                                            <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
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
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                                            booking.status
                                        )}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
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
