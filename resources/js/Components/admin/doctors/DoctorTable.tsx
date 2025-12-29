import Link from "next/link";
import React from "react";
import doctorsData from "@/data/doctors.json";

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    reviews: number;
    badge: {
        text: string;
        colorClass: string;
        dotClass: string;
    };
}

export function DoctorTable() {
    const doctors = doctorsData as Doctor[];

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                            <th className="px-6 py-4">Dokter</th>
                            <th className="px-6 py-4">Spesialisasi</th>
                            <th className="px-6 py-4">Booking (Bulan Ini)</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {doctors.map((doctor) => {
                            const isActive = doctor.badge.dotClass === "bg-green-500";
                            return (
                                <tr
                                    key={doctor.id}
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="size-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border border-slate-100"
                                                style={{ backgroundImage: `url("${doctor.image}")` }}
                                            ></div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">
                                                    {doctor.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    ID: {doctor.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${doctor.badge.colorClass}`}
                                        >
                                            {doctor.badge.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-slate-900 font-medium">
                                            <span className="material-symbols-outlined text-[18px] text-primary">
                                                event_available
                                            </span>
                                            {doctor.reviews}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                                                <span className="size-1.5 rounded-full bg-primary"></span>
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                                <span className="size-1.5 rounded-full bg-slate-400"></span>
                                                Non-aktif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors">
                                                Jadwal
                                            </button>
                                            <Link
                                                href={`/admin/doctors/${doctor.id}`}
                                                className="size-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    edit
                                                </span>
                                            </Link>
                                            <button
                                                className="size-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                                title="More Options"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    more_vert
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
