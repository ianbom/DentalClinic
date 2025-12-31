interface ScheduleItem {
    id: number;
    shift: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
}

interface ScheduleCardProps {
    schedule: ScheduleItem[];
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
    // Default schedules if no data
    const defaultSchedule: ScheduleItem[] = [
        {
            id: 1,
            shift: 'Pagi',
            start_time: '08:00',
            end_time: '12:00',
            is_active: false,
        },
        {
            id: 2,
            shift: 'Sore',
            start_time: '16:00',
            end_time: '20:00',
            is_active: false,
        },
    ];

    const displaySchedule = schedule.length > 0 ? schedule : defaultSchedule;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-bold text-slate-900">
                Jadwal Praktik Hari Ini
            </h3>
            <div className="space-y-3">
                {displaySchedule.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center justify-between rounded-lg border p-3 ${
                            item.is_active
                                ? 'border-teal-200 bg-teal-50'
                                : 'border-slate-100 bg-slate-50'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`material-symbols-outlined ${
                                    item.is_active
                                        ? 'text-teal-500'
                                        : 'text-slate-400'
                                }`}
                            >
                                schedule
                            </span>
                            <div className="flex flex-col">
                                <span
                                    className={`text-sm font-bold ${
                                        item.is_active
                                            ? 'text-teal-700'
                                            : 'text-slate-700'
                                    }`}
                                >
                                    {item.shift}
                                </span>
                                <span
                                    className={`text-xs ${
                                        item.is_active
                                            ? 'text-teal-600'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    {item.start_time} - {item.end_time}
                                </span>
                            </div>
                        </div>
                        <span
                            className={`rounded px-2.5 py-1 text-xs font-bold ${
                                item.is_active
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-slate-200 text-slate-600'
                            }`}
                        >
                            {item.is_active ? 'Aktif' : 'Libur'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
