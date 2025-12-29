import { BookingData, bookingsData } from '@/data/bookings';
import { Link } from '@inertiajs/react';

const getStatusStyles = (status: BookingData['status']) => {
    switch (status) {
        case 'Confirmed':
            return 'bg-primary/10 text-primary border-primary/20';
        case 'Checked-in':
            return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'Pending':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'Completed':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'Cancelled':
            return 'bg-slate-100 text-slate-600 border-slate-200';
        default:
            return 'bg-slate-100 text-slate-600';
    }
};

export function BookingTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <th className="w-24 px-6 py-4">Kode</th>
                            <th className="min-w-[240px] px-6 py-4">
                                Customer
                            </th>
                            <th className="min-w-[200px] px-6 py-4">Dokter</th>
                            <th className="min-w-[200px] px-6 py-4">Jadwal</th>
                            <th className="w-40 px-6 py-4">Status</th>
                            <th className="w-24 px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {bookingsData.map((booking) => (
                            <tr
                                key={booking.id}
                                className="group transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-slate-900">
                                        {booking.code}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {booking.patient.name}
                                        </span>
                                        <div className="mt-0.5 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-green-500">
                                                chat
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {booking.patient.phone}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${booking.doctor.colorBg} ${booking.doctor.colorText}`}
                                        >
                                            {booking.doctor.initials}
                                        </div>
                                        <span className="text-sm text-slate-700">
                                            {booking.doctor.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">
                                            {booking.schedule.date}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {booking.schedule.time}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusStyles(
                                            booking.status,
                                        )}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Link
                                        href={`/admin/bookings/${booking.id}`}
                                        className="inline-flex rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
                                        title="Detail"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            visibility
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
