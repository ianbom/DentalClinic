interface ScheduleItem {
    id: string;
    time: string;
    doctorName: string;
    treatment: string;
    patientName: string;
    patientAvatar: string;
    status: "ongoing" | "upcoming" | "past";
}

interface TodayScheduleProps {
    schedule: ScheduleItem[];
}

export function TodaySchedule({ schedule }: TodayScheduleProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Jadwal Hari Ini
                </h3>
                <button className="text-primary text-sm font-medium hover:underline cursor-pointer">
                    View All
                </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
                {/* Timeline Items */}
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
                    {schedule.map((item) => (
                        <div key={item.id} className="relative">
                            {/* Dot */}
                            <span
                                className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${item.status === "ongoing"
                                        ? "bg-green-500"
                                        : item.status === "upcoming"
                                            ? "bg-primary"
                                            : "bg-slate-300"
                                    }`}
                            ></span>

                            <div className="flex flex-col gap-1">
                                {item.status === "ongoing" ? (
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
                                        Ongoing • {item.time}
                                    </span>
                                ) : item.status === "upcoming" ? (
                                    <span className="text-xs font-semibold text-primary">
                                        {item.time}
                                    </span>
                                ) : (
                                    <span className="text-xs font-semibold text-slate-500">
                                        {item.time}
                                    </span>
                                )}

                                <h4 className="text-sm font-bold text-slate-900 mt-1">
                                    {item.doctorName}
                                </h4>
                                <p className="text-sm text-slate-500">
                                    {item.treatment}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover"
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
