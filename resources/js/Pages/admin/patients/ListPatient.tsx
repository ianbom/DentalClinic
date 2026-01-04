import { PatientFilters } from '@/Components/admin/patients/PatientFilters';
import { PatientListHeader } from '@/Components/admin/patients/PatientListHeader';
import { PatientPagination } from '@/Components/admin/patients/PatientPagination';
import { PatientTable } from '@/Components/admin/patients/PatientTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { PatientItem } from '@/types';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

type SortField =
    | 'name'
    | 'medical_records'
    | 'total_visits'
    | 'last_visit'
    | 'created_at';

interface PaginatedPatients {
    data: PatientItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface ListPatientPageProps {
    patients: PaginatedPatients;
    filters: {
        search?: string;
        gender?: string;
        per_page?: number;
        sort_field?: string;
        sort_order?: string;
    };
}

function ListPatientPage({ patients, filters }: ListPatientPageProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [genderFilter, setGenderFilter] = useState(filters.gender || '');
    const [sortField, setSortField] = useState<SortField>(
        (filters.sort_field as SortField) || 'created_at',
    );
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
        (filters.sort_order as 'asc' | 'desc') || 'desc',
    );
    const [itemsPerPage, setItemsPerPage] = useState(
        Number(filters.per_page) || 10,
    );

    const updateParams = (newParams: Record<string, any>) => {
        router.get(
            '/admin/patients',
            {
                search: searchQuery,
                gender: genderFilter,
                per_page: itemsPerPage,
                sort_field: sortField,
                sort_order: sortOrder,
                page: patients.current_page,
                ...newParams,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // Debounced search
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            updateParams({ search: query, page: 1 });
        }, 500),
        [],
    );

    // Handlers
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const handleGenderChange = (value: string) => {
        setGenderFilter(value);
        updateParams({ gender: value, page: 1 });
    };

    const handleSort = (field: SortField) => {
        let newOrder: 'asc' | 'desc' = 'asc';
        if (sortField === field) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }
        setSortField(field);
        setSortOrder(newOrder);
        updateParams({ sort_field: field, sort_order: newOrder });
    };

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        updateParams({ per_page: value, page: 1 });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setGenderFilter('');
        setSortField('created_at');
        setSortOrder('desc');
        router.get('/admin/patients');
    };

    return (
        <div className="flex flex-col gap-6">
            <PatientListHeader totalPatients={patients.total} />

            <div className="flex flex-col rounded-xl shadow-sm">
                <PatientFilters
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    genderFilter={genderFilter}
                    onGenderChange={handleGenderChange}
                    onClearFilters={handleClearFilters}
                />
                <PatientTable
                    patients={patients.data}
                    currentPage={patients.current_page}
                    itemsPerPage={patients.per_page}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                />

                {/* Pagination with Per-Page Selector */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-white px-4 py-3 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">
                            Tampilkan:
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) =>
                                handleItemsPerPageChange(Number(e.target.value))
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-slate-500">data</span>
                    </div>

                    <PatientPagination
                        currentPage={patients.current_page}
                        totalPages={patients.last_page}
                        totalItems={patients.total}
                        itemsPerPage={patients.per_page}
                        setCurrentPage={handlePageChange}
                    />
                </div>
            </div>

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
