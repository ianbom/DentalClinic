import { StatsCard } from '@/Components/admin/dashboard/StatsCard';
import AdminLayout from '@/Layouts/AdminLayout';
import { getInitials, getStatusLabel, getStatusStyles } from '@/lib/utils';
import { BookingListItem, DashboardStats } from '@/types';

interface AdminDashboardPageProps {
    stats: DashboardStats;
    todayBookings: BookingListItem[];
    recentBookings: BookingListItem[];
}

function AdminDashboardPage({
    stats,
    todayBookings,
    recentBookings,
}: AdminDashboardPageProps) {
    const statsCards = [
        {
            title: 'Booking Hari Ini',
            value: stats.bookings_today,
            icon: 'event_available',
            iconBgClass: 'bg-blue-50',
            iconColorClass: 'text-primary',
            borderColorHover: 'border-primary/50',
        },
        {
            title: 'Check-in Hari Ini',
            value: stats.checkins_today,
            icon: 'how_to_reg',
            iconBgClass: 'bg-green-50',
            iconColorClass: 'text-green-500',
            borderColorHover: 'border-green-300',
        },
        {
            title: 'Cancel Hari Ini',
            value: stats.cancellations_today,
            icon: 'cancel',
            iconBgClass: 'bg-red-50',
            iconColorClass: 'text-red-500',
            borderColorHover: 'border-red-300',
        },
        {
            title: 'Reschedule Hari Ini',
            value: stats.reschedules_today,
            icon: 'schedule',
            iconBgClass: 'bg-orange-50',
            iconColorClass: 'text-orange-500',
            borderColorHover: 'border-orange-300',
        },
    ];

    return (
        <>
            {/* Page Heading & Filter */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Dashboard Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Selamat datang, berikut ringkasan aktivitas hari ini.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Filter:</span>
                    <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-primary">
                        <span className="material-symbols-outlined text-xl text-primary">
                            calendar_today
                        </span>
                        Hari Ini
                        <span className="material-symbols-outlined ml-1 text-xl text-slate-400">
                            keyboard_arrow_down
                        </span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Today's Bookings Table */}
            <div className="mt-6">
                <BookingTable
                    title="Booking Hari Ini"
                    bookings={todayBookings}
                    emptyMessage="Tidak ada booking hari ini"
                />
            </div>

            {/* Recent Bookings Table */}
            <div className="mt-6">
                <BookingTable
                    title="Booking Terbaru"
                    bookings={recentBookings}
                    emptyMessage="Tidak ada booking terbaru"
                />
            </div>
        </>
    );
}

interface BookingTableProps {
    title: string;
    bookings: BookingListItem[];
    emptyMessage: string;
}

function BookingTable({ title, bookings, emptyMessage }: BookingTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {bookings.length} booking
                </span>
            </div>

            {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    No
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Kode
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Pasien
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Dokter
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Tanggal & Jam
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Dibuat Pada
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {bookings.map((booking, index) => (
                                <tr
                                    key={booking.id}
                                    className="transition-colors hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 text-center text-sm text-slate-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-sm font-medium text-slate-900">
                                        {booking.code}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
                                                {getInitials(
                                                    booking.patient_name,
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">
                                                    {booking.patient_name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {booking.patient_phone}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {booking.doctor_name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900">
                                                {booking.booking_date}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {booking.start_time} WIB
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500">
                                        {booking.created_at}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
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
            ) : (
                <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                        event_busy
                    </span>
                    <p className="mt-2 text-sm text-slate-500">
                        {emptyMessage}
                    </p>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(status)}`}
        >
            {getStatusLabel(status)}
        </span>
    );
}

AdminDashboardPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default AdminDashboardPage;
