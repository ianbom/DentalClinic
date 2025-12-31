interface StatsGridProps {
    stats: {
        total_bookings: number;
        completed_bookings: number;
        unique_patients: number;
    };
}

export function StatsGrid({ stats }: StatsGridProps) {
    const completionRate =
        stats.total_bookings > 0
            ? Math.round(
                  (stats.completed_bookings / stats.total_bookings) * 100,
              )
            : 0;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Booking */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-sky-50 p-2 text-sky-500">
                        <span className="material-symbols-outlined text-[24px]">
                            calendar_month
                        </span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">
                        Total Booking
                    </span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                    {stats.total_bookings.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-sky-500">
                    <span className="material-symbols-outlined text-[16px]">
                        trending_up
                    </span>
                    <span>+12% bulan ini</span>
                </div>
            </div>

            {/* Selesai */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-teal-50 p-2 text-teal-500">
                        <span className="material-symbols-outlined text-[24px]">
                            check_circle
                        </span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">
                        Selesai
                    </span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                    {stats.completed_bookings.toLocaleString()}
                </p>
                <div className="mt-2 text-xs font-medium text-slate-500">
                    <span>{completionRate}% penyelesaian</span>
                </div>
            </div>

            {/* Pasien */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-cyan-50 p-2 text-cyan-500">
                        <span className="material-symbols-outlined text-[24px]">
                            groups
                        </span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">
                        Pasien
                    </span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                    {stats.unique_patients.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-teal-500">
                    <span className="material-symbols-outlined text-[16px]">
                        trending_up
                    </span>
                    <span>+5% pasien baru</span>
                </div>
            </div>
        </div>
    );
}
