export interface RecentPatientItem {
    id: string;
    name: string;
    nik: string;
    phone: string;
    gender: string;
    joined_date: string;
}

interface RecentPatientsTableProps {
    title?: string;
    patients: RecentPatientItem[];
    viewAllLink?: string;
    onViewPatient?: (id: string) => void;
}

export function RecentPatientsTable({
    title = 'Recent Patients',
    patients,
    viewAllLink = '#',
    onViewPatient,
}: RecentPatientsTableProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <a
                    href={viewAllLink}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    View All
                </a>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 text-xs text-slate-500">
                            <th className="px-2 py-3 font-medium">No</th>
                            <th className="px-2 py-3 font-medium">Name</th>
                            <th className="px-2 py-3 font-medium">NIK</th>
                            <th className="px-2 py-3 font-medium">Phone</th>
                            <th className="px-2 py-3 font-medium">Gender</th>
                            <th className="px-2 py-3 font-medium">
                                Joined Date
                            </th>
                            <th className="px-2 py-3 text-right font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {patients.map((patient, index) => (
                            <tr
                                key={patient.id}
                                className="group border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                            >
                                <td className="px-2 py-3 font-medium text-slate-900">
                                    {index + 1}
                                </td>
                                <td className="px-2 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                                            <span className="text-xs font-medium text-slate-500">
                                                {patient.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-slate-700">
                                            {patient.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 text-slate-500">
                                    {patient.nik}
                                </td>
                                <td className="px-2 py-3 text-slate-500">
                                    {patient.phone}
                                </td>
                                <td className="px-2 py-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                            patient.gender === 'male' ||
                                            patient.gender === 'L'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-pink-100 text-pink-600'
                                        }`}
                                    >
                                        {patient.gender === 'male' ||
                                        patient.gender === 'L'
                                            ? 'Male'
                                            : 'Female'}
                                    </span>
                                </td>
                                <td className="px-2 py-3 text-slate-500">
                                    {patient.joined_date}
                                </td>
                                <td className="px-2 py-3 text-right">
                                    <button
                                        onClick={() =>
                                            onViewPatient?.(patient.id)
                                        }
                                        className="p-1 text-slate-400 transition-colors hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {patients.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-400">
                        No recent patients found.
                    </div>
                )}
            </div>
        </div>
    );
}
