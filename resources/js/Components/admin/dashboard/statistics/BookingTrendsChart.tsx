export interface BookingTrendData {
    day: string;
    percentage: number;
}

interface BookingTrendsChartProps {
    title?: string;
    subtitle?: string;
    data: BookingTrendData[];
}

export function BookingTrendsChart({
    title = 'Booking Trends',
    subtitle = 'Daily bookings over the last 7 days',
    data,
}: BookingTrendsChartProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <button className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                        <span className="material-symbols-outlined text-lg">
                            zoom_in
                        </span>
                    </button>
                    <button className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                        <span className="material-symbols-outlined text-lg">
                            more_horiz
                        </span>
                    </button>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-64 w-full border-b border-slate-100 pb-6">
                {/* Y-axis Guide Lines */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                    <div className="h-px w-full bg-slate-100" />
                    <div className="h-px w-full bg-slate-100" />
                    <div className="h-px w-full bg-slate-100" />
                    <div className="h-px w-full bg-slate-100" />
                </div>

                {/* Bars */}
                <div className="relative z-10 flex h-full items-end justify-between gap-4">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-1 cursor-pointer flex-col items-center gap-2"
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-t-sm bg-primary/10">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary transition-all group-hover:opacity-80"
                                    style={{ height: `${item.percentage}%` }}
                                />
                            </div>
                            <span className="text-xs text-slate-500">
                                {item.day}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
