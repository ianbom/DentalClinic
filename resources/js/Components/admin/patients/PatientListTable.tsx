
interface PatientItem {
    id: string;
    name: string;
    nik: string;
    phone: string;
    email: string;
    lastVisit: string;
    totalVisits: number;
    status: "Active" | "Inactive";
}

interface PatientListTableProps {
    patients: PatientItem[];
}

export function PatientListTable({ patients }: PatientListTableProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Name / NIK</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Last Visit</th>
                            <th className="px-6 py-4">Total Visits</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {patients.map((patient) => (
                            <tr
                                key={patient.id}
                                className="hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">{patient.name}</span>
                                        <span className="text-xs text-slate-400 font-mono tracking-wide">{patient.nik}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs">{patient.email}</span>
                                        <span className="text-xs text-slate-400">{patient.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {patient.lastVisit}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base text-slate-400">history</span>
                                        {patient.totalVisits}x
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${patient.status === "Active"
                                                ? "bg-green-100 text-green-700 border-green-200"
                                                : "bg-slate-100 text-slate-700 border-slate-200"
                                            }`}
                                    >
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-lg cursor-pointer icon-button">
                                            <span className="material-symbols-outlined text-xl">
                                                visibility
                                            </span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-lg cursor-pointer icon-button">
                                            <span className="material-symbols-outlined text-xl">
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
