import { PatientItem } from '@/types';
import { Link } from '@inertiajs/react';

type SortField =
    | 'name'
    | 'medical_records'
    | 'total_visits'
    | 'last_visit'
    | 'created_at';

interface PatientTableProps {
    patients: PatientItem[];
    currentPage: number;
    itemsPerPage: number;
    sortField: SortField;
    sortOrder: 'asc' | 'desc';
    onSort: (field: SortField) => void;
}

export function PatientTable({
    patients,
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    onSort,
}: PatientTableProps) {
    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return (
                <span className="material-symbols-outlined text-[16px] text-slate-300">
                    unfold_more
                </span>
            );
        }
        return (
            <span className="material-symbols-outlined text-[16px] text-primary">
                {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
            </span>
        );
    };

    return (
        <div className="w-full overflow-x-auto bg-white">
            {patients.length > 0 ? (
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="w-16 p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                No
                            </th>
                            <th
                                className="min-w-[150px] cursor-pointer p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-primary"
                                onClick={() => onSort('medical_records')}
                            >
                                <div className="flex items-center gap-1">
                                    No RM
                                    <SortIcon field="medical_records" />
                                </div>
                            </th>
                            <th
                                className="min-w-[200px] cursor-pointer p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-primary"
                                onClick={() => onSort('name')}
                            >
                                <div className="flex items-center gap-1">
                                    Nama Pasien
                                    <SortIcon field="name" />
                                </div>
                            </th>
                            <th className="min-w-[100px] p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Gender
                            </th>
                            <th className="min-w-[150px] p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                No WhatsApp
                            </th>
                            <th
                                className="min-w-[140px] cursor-pointer p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-primary"
                                onClick={() => onSort('total_visits')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    Kunjungan
                                    <SortIcon field="total_visits" />
                                </div>
                            </th>
                            <th
                                className="cursor-pointer p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-primary"
                                onClick={() => onSort('created_at')}
                            >
                                <div className="flex items-center gap-1">
                                    Daftar pada
                                    <SortIcon field="created_at" />
                                </div>
                            </th>
                            <th className="w-24 p-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {patients.map((patient, index) => (
                            <tr
                                key={patient.id}
                                className="group transition-colors hover:bg-slate-50"
                            >
                                <td className="p-4 text-center text-sm text-slate-400">
                                    {(currentPage - 1) * itemsPerPage +
                                        index +
                                        1}
                                </td>
                                <td className="p-4 font-mono text-sm font-medium text-slate-600">
                                    {patient.medical_records || '-'}
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {patient.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            NIK: {patient.nik}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">
                                    {patient.gender === 'male'
                                        ? 'Laki-laki'
                                        : 'Perempuan'}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-6 items-center justify-center rounded-md bg-green-50 text-green-500">
                                            <span className="material-symbols-outlined text-[14px]">
                                                chat
                                            </span>
                                        </span>
                                        <span className="font-mono text-sm text-slate-600">
                                            {patient.phone}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                        {patient.total_visits} Kali
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-slate-500">
                                    <div className="flex flex-col">
                                        <span>
                                            {patient.created_at_formatted}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {patient.created_at.split(' ')[1]}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/patients/${patient.id}`}
                                            className="cursor-pointer rounded-md bg-primary p-1.5 text-white transition-colors hover:bg-sky-600"
                                            title="Lihat Detail"
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                visibility
                                            </span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                        person_search
                    </span>
                    <p className="mt-2 text-sm text-slate-500">
                        Tidak ada pasien ditemukan
                    </p>
                </div>
            )}
        </div>
    );
}
