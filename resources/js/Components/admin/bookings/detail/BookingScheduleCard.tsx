interface BookingScheduleCardProps {
    doctorName: string;
    doctorSpeciality: string;
    doctorImage: string;
    date: string;
    time: string;
}

export function BookingScheduleCard({
    doctorName,
    doctorSpeciality,
    doctorImage,
    date,
    time,
}: BookingScheduleCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">
                    Detail Jadwal
                </h3>
                <button className="text-sm font-medium text-primary hover:underline">
                    Ubah Jadwal
                </button>
            </div>
            <div className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Doctor Info */}
                    <div className="flex min-w-[200px] items-center gap-4">
                        <div
                            className="size-16 rounded-full border-2 border-slate-100 bg-slate-200 bg-cover bg-center"
                            style={{ backgroundImage: `url("${doctorImage}")` }}
                        ></div>
                        <div>
                            <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Dokter
                            </p>
                            <p className="text-lg font-bold text-slate-900">
                                {doctorName}
                            </p>
                            <p className="text-sm text-slate-500">
                                {doctorSpeciality}
                            </p>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="hidden w-px bg-slate-200 sm:block"></div>
                    {/* Time Slot Info */}
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <span className="material-symbols-outlined block">
                                    calendar_month
                                </span>
                            </div>
                            <div>
                                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Tanggal
                                </p>
                                <p className="font-bold text-slate-900">
                                    {date}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <span className="material-symbols-outlined block">
                                    schedule
                                </span>
                            </div>
                            <div>
                                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Waktu
                                </p>
                                <p className="font-bold text-slate-900">
                                    {time}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
