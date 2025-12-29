import React from "react";

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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">Detail Jadwal</h3>
                <button className="text-primary text-sm font-medium hover:underline">
                    Ubah Jadwal
                </button>
            </div>
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div
                            className="size-16 rounded-full bg-slate-200 bg-cover bg-center border-2 border-slate-100"
                            style={{ backgroundImage: `url("${doctorImage}")` }}
                        ></div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                                Dokter
                            </p>
                            <p className="font-bold text-slate-900 text-lg">{doctorName}</p>
                            <p className="text-sm text-slate-500">{doctorSpeciality}</p>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-slate-200"></div>
                    {/* Time Slot Info */}
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined block">
                                    calendar_month
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                                    Tanggal
                                </p>
                                <p className="font-bold text-slate-900">{date}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined block">schedule</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                                    Waktu
                                </p>
                                <p className="font-bold text-slate-900">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
