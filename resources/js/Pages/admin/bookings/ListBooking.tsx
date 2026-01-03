import { BookingFilters } from '@/Components/admin/bookings/BookingFilters';
import { BookingPagination } from '@/Components/admin/bookings/BookingPagination';
import {
    BookingTable,
    SortField,
    SortOrder,
} from '@/Components/admin/bookings/BookingTable';
import { PaymentModal } from '@/Components/admin/bookings/PaymentModal';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookingFullItem } from '@/types';
import { Link, router } from '@inertiajs/react'; // Import router
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

interface DoctorOption {
    id: number;
    name: string;
}

interface PaginatedBookings {
    data: BookingFullItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface ListBookingPageProps {
    bookings: PaginatedBookings; // Updated type
    doctors: DoctorOption[];
    filters: {
        search?: string;
        status?: string;
        date?: string;
        doctor?: string;
        per_page?: number;
        sort_field?: string;
        sort_order?: string;
    };
}

function ListBookingPage({ bookings, doctors, filters }: ListBookingPageProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [doctorFilter, setDoctorFilter] = useState(filters.doctor || '');
    const [itemsPerPage, setItemsPerPage] = useState(Number(filters.per_page) || 10);
    const [sortField, setSortField] = useState<SortField>((filters.sort_field as SortField) || '');
    const [sortOrder, setSortOrder] = useState<SortOrder>((filters.sort_order as SortOrder) || 'asc');

    // Payment modal state
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] =
        useState<BookingFullItem | null>(null);

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            updateParams({ search: query, page: 1 });
        }, 500),
        []
    );

    const updateParams = (newParams: any) => {
        router.get(
            '/admin/bookings',
            {
                search: searchQuery,
                status: statusFilter,
                date: dateFilter,
                doctor: doctorFilter,
                per_page: itemsPerPage,
                sort_field: sortField,
                sort_order: sortOrder,
                page: bookings.current_page,
                ...newParams,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const handleFilterChange = (
        type: 'status' | 'date' | 'doctor',
        value: string,
    ) => {
        let newParams = {};
        if (type === 'status') {
            setStatusFilter(value);
            newParams = { status: value, page: 1 };
        }
        else if (type === 'date') {
            setDateFilter(value);
            newParams = { date: value, page: 1 };
        }
        else if (type === 'doctor') {
            setDoctorFilter(value);
            newParams = { doctor: value, page: 1 };
        }
        updateParams(newParams);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setDateFilter('');
        setDoctorFilter('');
        setSortField('');
        setSortOrder('asc');
        router.get('/admin/bookings');
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        updateParams({ per_page: value, page: 1 });
    };

    const handlePageChange = (page: number) => {
        updateParams({ page: page });
    };

    const handleSort = (field: SortField) => {
        let newOrder: SortOrder = 'asc';
        if (sortField === field) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }
        setSortField(field);
        setSortOrder(newOrder);
        updateParams({ sort_field: field, sort_order: newOrder });
    };

    const handlePayment = (booking: BookingFullItem) => {
        setSelectedBooking(booking);
        setPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedBooking(null);
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
                        Kelola todos data booking pasien
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Total: {bookings.total} booking
                    </span>
                    <Link
                        href="/admin/bookings/create"
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            add
                        </span>
                        Buat Booking
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <BookingFilters
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                doctorFilter={doctorFilter}
                doctors={doctors}
                onSearchChange={handleSearchChange}
                onStatusChange={(v) => handleFilterChange('status', v)}
                onDateChange={(v) => handleFilterChange('date', v)}
                onDoctorChange={(v) => handleFilterChange('doctor', v)}
                onClearFilters={handleClearFilters}
            />

            {/* Table */}
            <BookingTable
                bookings={bookings.data}
                showExpandable
                showActions
                currentPage={bookings.current_page}
                itemsPerPage={bookings.per_page}
                emptyMessage="Tidak ada booking ditemukan"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
                onPayment={handlePayment}
            />

            {/* Pagination with Per-Page Selector */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                {/* Per-page selector */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Tampilkan:</span>
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
                        <option value={1000}>1000</option>
                        <option value={10000}>10000</option>
                        {/* option value={0} removed as server-side usually requires limit, or handle special 'all' case */}
                    </select>
                    <span className="text-sm text-slate-500">data</span>
                </div>

                {/* Pagination */}
                <BookingPagination
                    currentPage={bookings.current_page}
                    totalPages={bookings.last_page}
                    totalItems={bookings.total}
                    itemsPerPage={bookings.per_page}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Payment Modal */}
            {selectedBooking && (
                <PaymentModal
                    isOpen={paymentModalOpen}
                    onClose={handleClosePaymentModal}
                    bookingId={selectedBooking.id}
                    bookingCode={selectedBooking.code}
                    existingPayment={selectedBooking.payment}
                />
            )}
        </div>
    );
}

ListBookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default ListBookingPage;
