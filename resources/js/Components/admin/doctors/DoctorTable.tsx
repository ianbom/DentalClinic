import doctorsData from '@/data/doctors.json';
import { Link } from '@inertiajs/react';

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
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <th className="px-6 py-4">Dokter</th>
                            <th className="px-6 py-4">Spesialisasi</th>
                            <th className="px-6 py-4">Booking (Bulan Ini)</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {doctors.map((doctor) => {
                            const isActive =
                                doctor.badge.dotClass === 'bg-green-500';
                            return (
                                <tr
                                    key={doctor.id}
                                    className="group transition-colors hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="size-10 shrink-0 rounded-full border border-slate-100 bg-slate-200 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url("${doctor.image}")`,
                                                }}
                                            ></div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">
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
                                            className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${doctor.badge.colorClass}`}
                                        >
                                            {doctor.badge.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-medium text-slate-900">
                                            <span className="material-symbols-outlined text-[18px] text-primary">
                                                event_available
                                            </span>
                                            {doctor.reviews}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isActive ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                                <span className="size-1.5 rounded-full bg-primary"></span>
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                                <span className="size-1.5 rounded-full bg-slate-400"></span>
                                                Non-aktif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                                            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                                                Jadwal
                                            </button>
                                            <Link
                                                href={`/admin/doctors/${doctor.id}`}
                                                className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary/5 hover:text-primary"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    edit
                                                </span>
                                            </Link>
                                            <button
                                                className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
