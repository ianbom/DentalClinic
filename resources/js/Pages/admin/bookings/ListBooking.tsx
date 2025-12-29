import { BookingFilters } from '@/Components/admin/bookings/BookingFilters';
import { BookingHeader } from '@/Components/admin/bookings/BookingHeader';
import { BookingPagination } from '@/Components/admin/bookings/BookingPagination';
import { BookingTable } from '@/Components/admin/bookings/BookingTable';
import { BookingTabs } from '@/Components/admin/bookings/BookingTabs';
import AdminLayout from '@/Layouts/AdminLayout';

function BookingPage() {
    return (
        <>
            <BookingHeader />
            <BookingTabs />
            <BookingFilters />
            <div className="flex flex-col">
                <BookingTable />
                <BookingPagination />
            </div>
        </>
    );
}

BookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default BookingPage;
