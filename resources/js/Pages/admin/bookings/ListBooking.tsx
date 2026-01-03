import {
    BookingFilters,
    useBookingFilters,
} from '@/Components/admin/bookings/BookingFilters';
import { BookingPagination } from '@/Components/admin/bookings/BookingPagination';
import {
    BookingTable,
    SortField,
    SortOrder,
} from '@/Components/admin/bookings/BookingTable';
import { PaymentModal } from '@/Components/admin/bookings/PaymentModal';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookingFullItem } from '@/types';
import { Link } from '@inertiajs/react';
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
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortField, setSortField] = useState<SortField>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    // Payment modal state
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] =
        useState<BookingFullItem | null>(null);

    const { filterBookings } = useBookingFilters(bookings);

    // Filter bookings
    const filteredBookings = useMemo(
        () =>
            filterBookings(searchQuery, statusFilter, dateFilter, doctorFilter),
        [filterBookings, searchQuery, statusFilter, dateFilter, doctorFilter],
    );

    // Sort bookings
    const sortedBookings = useMemo(() => {
        if (!sortField) return filteredBookings;

        return [...filteredBookings].sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (sortField) {
                case 'patient_name':
                    aValue = a.patient_name.toLowerCase();
                    bValue = b.patient_name.toLowerCase();
                    break;
                case 'booking_date':
                    aValue = new Date(a.booking_date).getTime();
                    bValue = new Date(b.booking_date).getTime();
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at).getTime();
                    bValue = new Date(b.created_at).getTime();
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredBookings, sortField, sortOrder]);

    // Pagination
    const displayedBookings =
        itemsPerPage === 0
            ? sortedBookings
            : sortedBookings.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage,
              );
    const totalPages =
        itemsPerPage === 0
            ? 1
            : Math.ceil(sortedBookings.length / itemsPerPage);

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

    console.log('book', displayedBookings);

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setDateFilter('');
        setDoctorFilter('');
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
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
                        Kelola semua data booking pasien
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Total: {filteredBookings.length} booking
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
                onSearchChange={(v) => handleFilterChange('search', v)}
                onStatusChange={(v) => handleFilterChange('status', v)}
                onDateChange={(v) => handleFilterChange('date', v)}
                onDoctorChange={(v) => handleFilterChange('doctor', v)}
                onClearFilters={handleClearFilters}
            />

            {/* Table */}
            <BookingTable
                bookings={displayedBookings}
                showExpandable
                showActions
                currentPage={currentPage}
                itemsPerPage={
                    itemsPerPage === 0 ? sortedBookings.length : itemsPerPage
                }
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
                        <option value={0}>Semua</option>
                    </select>
                    <span className="text-sm text-slate-500">data</span>
                </div>

                {/* Pagination */}
                {itemsPerPage !== 0 && (
                    <BookingPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedBookings.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                )}
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
