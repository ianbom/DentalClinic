import { DoctorFilters } from '@/Components/admin/doctors/DoctorFilters';
import { DoctorListHeader } from '@/Components/admin/doctors/DoctorListHeader';
import { DoctorPagination } from '@/Components/admin/doctors/DoctorPagination';
import { DoctorTable } from '@/Components/admin/doctors/DoctorTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { DoctorItem } from '@/types';
import { useMemo, useState } from 'react';

interface DoctorsPageProps {
    doctors: DoctorItem[];
}

function DoctorsPage({ doctors }: DoctorsPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter doctors
    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const matchesSearch =
                searchQuery === '' ||
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.sip.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && doctor.is_active) ||
                (statusFilter === 'inactive' && !doctor.is_active);

            return matchesSearch && matchesStatus;
        });
    }, [doctors, searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const paginatedDoctors = filteredDoctors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Reset page when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: 'all' | 'active' | 'inactive') => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-6">
            <DoctorListHeader totalDoctors={filteredDoctors.length} />
            <DoctorFilters
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                statusFilter={statusFilter}
                setStatusFilter={handleStatusChange}
            />
            <div className="flex flex-col">
                <DoctorTable
                    doctors={paginatedDoctors}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
                <DoctorPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredDoctors.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {/* Footer Hint */}
            <div className="pb-8 text-center">
                <p className="text-xs text-slate-500">
                    © 2024 Klinik Gigi Sehat Admin Panel. All rights reserved.
                </p>
            </div>
        </div>
    );
}

DoctorsPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default DoctorsPage;
