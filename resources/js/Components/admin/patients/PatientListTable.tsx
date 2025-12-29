interface PatientItem {
    id: string;
    name: string;
    nik: string;
    phone: string;
    email: string;
    lastVisit: string;
    totalVisits: number;
    status: 'Active' | 'Inactive';
}

interface PatientListTableProps {
    patients: PatientItem[];
}

export function PatientListTable({ patients }: PatientListTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
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
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">
                                            {patient.name}
                                        </span>
                                        <span className="font-mono text-xs tracking-wide text-slate-400">
                                            {patient.nik}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs">
                                            {patient.email}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {patient.phone}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {patient.lastVisit}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base text-slate-400">
                                            history
                                        </span>
                                        {patient.totalVisits}x
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                            patient.status === 'Active'
                                                ? 'border-green-200 bg-green-100 text-green-700'
                                                : 'border-slate-200 bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="icon-button cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary">
                                            <span className="material-symbols-outlined text-xl">
                                                visibility
                                            </span>
                                        </button>
                                        <button className="icon-button cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary">
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
