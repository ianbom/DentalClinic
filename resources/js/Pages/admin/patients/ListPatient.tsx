import { PatientFilters } from '@/Components/admin/patients/PatientFilters';
import { PatientListHeader } from '@/Components/admin/patients/PatientListHeader';
import { PatientPagination } from '@/Components/admin/patients/PatientPagination';
import { PatientTable } from '@/Components/admin/patients/PatientTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { PatientItem } from '@/types';
import { useMemo, useState } from 'react';

type SortField = 'name' | 'total_visits' | 'last_visit';

interface ListPatientPageProps {
    patients: PatientItem[];
}

function ListPatientPage({ patients }: ListPatientPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>('last_visit');
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

    // Handlers
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <PatientListHeader totalPatients={filteredPatients.length} />

            <div className="flex flex-col rounded-xl shadow-sm">
                <PatientFilters
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                />
                <PatientTable
                    patients={paginatedPatients}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                />
                <PatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedPatients.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
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
