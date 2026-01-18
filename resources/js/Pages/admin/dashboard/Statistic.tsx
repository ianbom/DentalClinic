import {
    BookingRevenueTrendData,
    BookingRevenueTrendsChart,
    CancellationRateCard,
    DoctorBookingData,
    DoctorBookingsChart,
    RecentPatientItem,
    RecentPatientsTable,
    StatCard,
    TopServiceData,
    TopServicesChart,
} from '@/Components/admin/dashboard/statistics';
import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';

interface AvailableMonth {
    value: string;
    label: string;
}

interface StatisticPageProps {
    summaryStats: {
        total_bookings: number;
        bookings_change: number;
        new_patients: number;
        patients_change: number;
        total_revenue: string;
        revenue_change: number;
        cancellation_rate: number;
        cancellation_sparkline: number[];
    };
    bookingRevenueTrends: BookingRevenueTrendData[];
    topServices: TopServiceData[];
    doctorBookings: DoctorBookingData[];
    recentPatients: RecentPatientItem[];
    currentDate: string;
    availableMonths: AvailableMonth[];
    selectedMonth: string;
}

function StatisticPage({
    summaryStats,
    bookingRevenueTrends,
    topServices,
    doctorBookings,
    recentPatients,
    currentDate,
    availableMonths,
    selectedMonth,
}: StatisticPageProps) {
    const handleViewPatient = (id: string) => {
        const patientId = id.replace('P-', '').replace(/-/g, '');
        router.visit(`/admin/patients/${patientId}`);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        router.get(
            '/admin/statistic',
            { month: value },
            { preserveState: true, preserveScroll: true },
        );
    };

    const getFilterLabel = () => {
        if (selectedMonth === 'alltime') {
            return 'All Time';
        }
        const month = availableMonths.find((m) => m.value === selectedMonth);
        return month?.label || selectedMonth;
    };

    return (
        <div className="mx-auto max-w-[1400px] space-y-6">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Dashboard Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Ringkasan statistik dan aktivitas klinik
                    </p>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">
                            calendar_month
                        </span>
                        <select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="cursor-pointer border-none bg-transparent p-0 pr-6 text-sm font-medium text-slate-700 focus:ring-0"
                        >
                            <option value="alltime">All Time</option>
                            {availableMonths.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <a
                        href={`/admin/statistic/export?month=${selectedMonth}`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition-colors hover:bg-slate-50"
                    >
                        <span className="material-symbols-outlined text-[18px] text-slate-400">
                            download
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                            Export Report
                        </span>
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {getFilterLabel()}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-slate-400">
                        System Operational
                    </span>
                </div>
            </div>

            {/* Section 1: Summary Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Bookings"
                    value={summaryStats.total_bookings}
                    icon="calendar_today"
                    iconColorClass="text-primary"
                    subText={getFilterLabel()}
                />
                <StatCard
                    title="New Patients"
                    value={summaryStats.new_patients}
                    icon="person_add"
                    iconColorClass="text-teal-500"
                    subText={getFilterLabel()}
                />
                <StatCard
                    title="Total Revenue"
                    value={summaryStats.total_revenue}
                    icon="payments"
                    iconColorClass="text-green-500"
                    subText="IDR"
                />
                <CancellationRateCard
                    rate={summaryStats.cancellation_rate}
                    target={5}
                    sparklineData={summaryStats.cancellation_sparkline}
                />
            </div>

            {/* Section 2: Booking & Revenue Trends + Top Services */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <BookingRevenueTrendsChart
                        title="Booking & Revenue Trends"
                        subtitle={
                            selectedMonth === 'alltime'
                                ? 'Monthly aggregated data'
                                : `Daily data for ${getFilterLabel()}`
                        }
                        data={bookingRevenueTrends}
                    />
                </div>
                <TopServicesChart
                    title="Top Services"
                    subtitle={`Most booked services - ${getFilterLabel()}`}
                    services={topServices}
                />
            </div>

            {/* Section 3: Doctor Bookings + Recent Patients */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-1">
                    <DoctorBookingsChart
                        title="Bookings by Doctor"
                        subtitle={`Total bookings - ${getFilterLabel()}`}
                        doctors={doctorBookings}
                    />
                </div>
                <div className="xl:col-span-2">
                    <RecentPatientsTable
                        title="Recent Patients"
                        patients={recentPatients}
                        viewAllLink="/admin/patients"
                        onViewPatient={handleViewPatient}
                    />
                </div>
            </div>
        </div>
    );
}

StatisticPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default StatisticPage;
