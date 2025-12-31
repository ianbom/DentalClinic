import { BookingTable } from '@/Components/admin/bookings/BookingTable';
import { StatsCard } from '@/Components/admin/dashboard/StatsCard';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookingFullItem, DashboardStats } from '@/types';

interface AdminDashboardPageProps {
    stats: DashboardStats;
    todayBookings: BookingFullItem[];
    recentBookings: BookingFullItem[];
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

AdminDashboardPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default AdminDashboardPage;
