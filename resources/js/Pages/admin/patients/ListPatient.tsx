import AdminLayout from '@/Layouts/AdminLayout';
import { PatientItem } from '@/types';
import { useMemo, useState } from 'react';

interface ListPatientPageProps {
    patients: PatientItem[];
}

function ListPatientPage({ patients }: ListPatientPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<
        'name' | 'total_visits' | 'last_visit'
    >('last_visit');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter patients
    const filteredPatients = useMemo(() => {
        return patients.filter((patient) => {
            const matchesSearch =
                searchQuery === '' ||
                patient.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                patient.nik.includes(searchQuery) ||
                patient.phone.includes(searchQuery);

            return matchesSearch;
        });
    }, [patients, searchQuery]);

    // Sort patients
    const sortedPatients = useMemo(() => {
        return [...filteredPatients].sort((a, b) => {
            let comparison = 0;
            if (sortField === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortField === 'total_visits') {
                comparison = a.total_visits - b.total_visits;
            } else if (sortField === 'last_visit') {
                comparison =
                    new Date(a.last_visit).getTime() -
                    new Date(b.last_visit).getTime();
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [filteredPatients, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
    const paginatedPatients = sortedPatients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleSort = (field: 'name' | 'total_visits' | 'last_visit') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const SortIcon = ({
        field,
    }: {
        field: 'name' | 'total_visits' | 'last_visit';
    }) => {
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
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Daftar Pasien
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola semua data pasien klinik
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Total: {filteredPatients.length} pasien
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-t-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Cari nama, NIK, atau WhatsApp..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {paginatedPatients.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="w-14 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        No
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-primary"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Nama
                                            <SortIcon field="name" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        NIK
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        WhatsApp
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-primary"
                                        onClick={() =>
                                            handleSort('total_visits')
                                        }
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            Total Kunjungan
                                            <SortIcon field="total_visits" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-primary"
                                        onClick={() => handleSort('last_visit')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Dibuat Pada
                                            <SortIcon field="last_visit" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {paginatedPatients.map((patient, index) => (
                                    <tr
                                        key={patient.nik}
                                        className="group transition-colors hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-3 text-center text-sm text-slate-500">
                                            {(currentPage - 1) * itemsPerPage +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-slate-900">
                                                    {patient.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {patient.email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-sm text-slate-600">
                                            {patient.nik}
                                        </td>
                                        <td className="px-4 py-3">
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
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                {patient.total_visits} Kunjungan
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500">
                                            {patient.first_visit_formatted}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                <button
                                                    className="cursor-pointer rounded-md bg-primary p-1.5 text-white transition-colors hover:bg-sky-600"
                                                    title="Lihat Detail"
                                                >
                                                    <span className="material-symbols-outlined text-lg">
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-slate-500">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{' '}
                        {Math.min(
                            currentPage * itemsPerPage,
                            sortedPatients.length,
                        )}{' '}
                        dari {sortedPatients.length} pasien
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                            className={`flex size-9 items-center justify-center rounded-lg border ${
                                currentPage === 1
                                    ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                                    : 'cursor-pointer border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                chevron_left
                            </span>
                        </button>
                        {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
                                let pageNum = i + 1;
                                if (totalPages > 5) {
                                    if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`flex size-9 items-center justify-center rounded-lg border text-sm font-medium ${
                                            currentPage === pageNum
                                                ? 'border-primary bg-primary text-white'
                                                : 'cursor-pointer border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            },
                        )}
                        <button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className={`flex size-9 items-center justify-center rounded-lg border ${
                                currentPage === totalPages
                                    ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                                    : 'cursor-pointer border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>
            )}

            <footer className="mt-8 pb-8 text-center text-xs text-slate-400">
                © 2024 Dental Clinic Admin. All rights reserved.
            </footer>
        </div>
    );
}

ListPatientPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default ListPatientPage;
