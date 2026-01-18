export interface DoctorBookingData {
    id: number;
    name: string;
    bookings: number;
    profile_pic?: string;
}

interface DoctorBookingsChartProps {
    title?: string;
    subtitle?: string;
    doctors: DoctorBookingData[];
}

export function DoctorBookingsChart({
    title = 'Bookings by Doctor',
    subtitle = 'Total bookings per doctor this month',
    doctors,
}: DoctorBookingsChartProps) {
    const maxBookings = Math.max(...doctors.map((d) => d.bookings), 1);

    // Sort by bookings descending
    const sortedDoctors = [...doctors].sort((a, b) => b.bookings - a.bookings);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mb-6 text-xs text-slate-500">{subtitle}</p>

            <div className="space-y-4">
                {sortedDoctors.map((doctor) => {
                    const percentage = (doctor.bookings / maxBookings) * 100;

                    return (
                        <div key={doctor.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-700">
                                        {doctor.name}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-primary">
                                    {doctor.bookings}
                                </span>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-primary/70 transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}

                {doctors.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-400">
                        No doctor data available.
                    </div>
                )}
            </div>
        </div>
    );
}
