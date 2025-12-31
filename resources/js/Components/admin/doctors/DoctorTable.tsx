import { DoctorItem } from '@/types';
import { Link } from '@inertiajs/react';

interface DoctorTableProps {
    doctors: DoctorItem[];
    currentPage: number;
    itemsPerPage: number;
}

export function DoctorTable({
    doctors,
    currentPage,
    itemsPerPage,
}: DoctorTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {doctors.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <th className="w-14 px-6 py-4 text-center">
                                    No
                                </th>
                                <th className="px-6 py-4">Dokter</th>
                                <th className="px-6 py-4">SIP</th>
                                <th className="px-6 py-4 text-center">
                                    Pengalaman
                                </th>
                                <th className="px-6 py-4 text-center">
                                    Total Booking
                                </th>
                                <th className="px-6 py-4 text-center">
                                    Status
                                </th>
                                <th className="px-6 py-4">Dibuat Pada</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {doctors.map((doctor, index) => (
                                <tr
                                    key={doctor.id}
                                    className="group transition-colors hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 text-center text-sm text-slate-500">
                                        {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-200">
                                                {doctor.profile_pic ? (
                                                    <img
                                                        src={doctor.profile_pic}
                                                        alt={doctor.name}
                                                        className="size-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex size-full items-center justify-center bg-primary/10 text-primary">
                                                        <span className="material-symbols-outlined text-lg">
                                                            person
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">
                                                    {doctor.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-slate-600">
                                        {doctor.sip}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-slate-600">
                                        {doctor.experience} tahun
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {doctor.total_bookings}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {doctor.is_active ? (
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
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {doctor.created_at_formatted}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                        stethoscope
                    </span>
                    <p className="mt-2 text-sm text-slate-500">
                        Tidak ada dokter ditemukan
                    </p>
                </div>
            )}
        </div>
    );
}
