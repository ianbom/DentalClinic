import {
    BookingFilters,
    useBookingFilters,
} from '@/Components/admin/bookings/BookingFilters';
import { BookingPagination } from '@/Components/admin/bookings/BookingPagination';
import { BookingTable } from '@/Components/admin/bookings/BookingTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookingFullItem } from '@/types';
import { useMemo, useState } from 'react';

interface DoctorOption {
    id: number;
    name: string;
}

interface ListBookingPageProps {
    bookings: BookingFullItem[];
    doctors: DoctorOption[];
}

function ListBookingPage({ bookings, doctors }: ListBookingPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { filterBookings } = useBookingFilters(bookings);

    // Filter bookings
    const filteredBookings = useMemo(
        () =>
            filterBookings(searchQuery, statusFilter, dateFilter, doctorFilter),
        [filterBookings, searchQuery, statusFilter, dateFilter, doctorFilter],
    );

    // Pagination
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleFilterChange = (
        type: 'search' | 'status' | 'date' | 'doctor',
        value: string,
    ) => {
        setCurrentPage(1);
        if (type === 'search') setSearchQuery(value);
        else if (type === 'status') setStatusFilter(value);
        else if (type === 'date') setDateFilter(value);
        else if (type === 'doctor') setDoctorFilter(value);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setDateFilter('');
        setDoctorFilter('');
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Daftar Booking
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola semua data booking pasien
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Total: {filteredBookings.length} booking
                    </span>
                </div>
            </div>

            {/* Filters */}
            <BookingFilters
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                doctorFilter={doctorFilter}
                doctors={doctors}
                onSearchChange={(v) => handleFilterChange('search', v)}
                onStatusChange={(v) => handleFilterChange('status', v)}
                onDateChange={(v) => handleFilterChange('date', v)}
                onDoctorChange={(v) => handleFilterChange('doctor', v)}
                onClearFilters={handleClearFilters}
            />

            {/* Table */}
            <BookingTable
                bookings={paginatedBookings}
                showExpandable
                showActions
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                emptyMessage="Tidak ada booking ditemukan"
            />

            {/* Pagination */}
            <BookingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredBookings.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

ListBookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default ListBookingPage;
