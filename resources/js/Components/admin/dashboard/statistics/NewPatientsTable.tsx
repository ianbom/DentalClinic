import { useState } from 'react';

export interface NewPatientItem {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    joined_date: string;
    address: string;
}

interface NewPatientsTableProps {
    title?: string;
    patients: NewPatientItem[];
    onViewHistory?: (patientId: string) => void;
}

export function NewPatientsTable({
    title = 'New Patients',
    patients,
    onViewHistory,
}: NewPatientsTableProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <div className="flex w-full gap-2 sm:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border-none bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    {/* Filter Button */}
                    <button className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20">
                        <span className="material-symbols-outlined text-[20px]">
                            filter_list
                        </span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                    <thead>
                        <tr className="rounded-lg bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                            <th className="rounded-l-lg px-4 py-3 font-medium">
                                Patient ID
                            </th>
                            <th className="px-4 py-3 font-medium">Full Name</th>
                            <th className="px-4 py-3 font-medium">
                                Age/Gender
                            </th>
                            <th className="px-4 py-3 font-medium">
                                Joined Date
                            </th>
                            <th className="px-4 py-3 font-medium">Address</th>
                            <th className="rounded-r-lg px-4 py-3 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredPatients.map((patient) => (
                            <tr
                                key={patient.id}
                                className="border-b border-slate-50 transition-colors hover:bg-slate-50"
                            >
                                <td className="px-4 py-4 font-medium text-slate-900">
                                    {patient.id}
                                </td>
                                <td className="px-4 py-4 font-medium text-slate-900">
                                    {patient.name}
                                </td>
                                <td className="px-4 py-4 text-slate-500">
                                    {patient.age} / {patient.gender}
                                </td>
                                <td className="px-4 py-4 text-slate-500">
                                    {patient.joined_date}
                                </td>
                                <td
                                    className="max-w-[150px] truncate px-4 py-4 text-slate-500"
                                    title={patient.address}
                                >
                                    {patient.address}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button
                                        onClick={() =>
                                            onViewHistory?.(patient.id)
                                        }
                                        className="text-xs font-medium text-primary hover:text-primary-dark"
                                    >
                                        View History
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPatients.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-400">
                        No patients found.
                    </div>
                )}
            </div>
        </div>
    );
}
