import { Patient, patientsData } from '@/data/patients';

export function PatientTable() {
    return (
        <div className="w-full overflow-x-auto bg-white">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="w-16 p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                            #
                        </th>
                        <th className="min-w-[200px] p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Nama
                        </th>
                        <th className="min-w-[180px] p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            NIK
                        </th>
                        <th className="min-w-[160px] p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            WhatsApp
                        </th>
                        <th className="min-w-[140px] p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Total Kunjungan
                        </th>
                        <th className="w-24 p-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {patientsData.map((patient: Patient, index: number) => (
                        <tr
                            key={patient.id}
                            className="group transition-colors hover:bg-slate-50"
                        >
                            <td className="p-4 text-center text-sm text-slate-400">
                                {index + 1}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`h-8 w-8 rounded-full ${patient.colorBg} ${patient.colorText} flex items-center justify-center text-xs font-bold`}
                                    >
                                        {patient.initials}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {patient.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {patient.gender}, {patient.age} y.o
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 font-mono text-sm text-slate-600">
                                {patient.nik}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md bg-green-50 p-1 text-green-500">
                                        <span className="block h-3 w-3 opacity-70">
                                            {/* Simple SVG icon/placeholder for WA as img not available */}
                                            <span className="material-symbols-outlined text-[12px]">
                                                chat
                                            </span>
                                        </span>
                                    </span>
                                    <span className="font-mono text-sm text-slate-600">
                                        {patient.phone}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 text-center">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                    {patient.totalVisits} Kunjungan
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                        className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
                                        title="Edit Customer"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
                                        title="View Details"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
