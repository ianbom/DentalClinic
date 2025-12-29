interface ScheduleItem {
    id: string;
    time: string;
    doctorName: string;
    treatment: string;
    patientName: string;
    patientAvatar: string;
    status: 'ongoing' | 'upcoming' | 'past';
}

interface TodayScheduleProps {
    schedule: ScheduleItem[];
}

export function TodaySchedule({ schedule }: TodayScheduleProps) {
    return (
        <div className="flex h-full min-h-[400px] flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                    Jadwal Hari Ini
                </h3>
                <button className="cursor-pointer text-sm font-medium text-primary hover:underline">
                    View All
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {/* Timeline Items */}
                <div className="relative space-y-8 border-l-2 border-slate-100 pl-4">
                    {schedule.map((item) => (
                        <div key={item.id} className="relative">
                            {/* Dot */}
                            <span
                                className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${
                                    item.status === 'ongoing'
                                        ? 'bg-green-500'
                                        : item.status === 'upcoming'
                                          ? 'bg-primary'
                                          : 'bg-slate-300'
                                }`}
                            ></span>

                            <div className="flex flex-col gap-1">
                                {item.status === 'ongoing' ? (
                                    <span className="w-fit rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">
                                        Ongoing • {item.time}
                                    </span>
                                ) : item.status === 'upcoming' ? (
                                    <span className="text-xs font-semibold text-primary">
                                        {item.time}
                                    </span>
                                ) : (
                                    <span className="text-xs font-semibold text-slate-500">
                                        {item.time}
                                    </span>
                                )}

                                <h4 className="mt-1 text-sm font-bold text-slate-900">
                                    {item.doctorName}
                                </h4>
                                <p className="text-sm text-slate-500">
                                    {item.treatment}
                                </p>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="size-6 overflow-hidden rounded-full bg-slate-200">
                                        <img
                                            className="h-full w-full object-cover"
                                            alt="Patient avatar"
                                            src={item.patientAvatar}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-slate-700">
                                        Patient: {item.patientName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
