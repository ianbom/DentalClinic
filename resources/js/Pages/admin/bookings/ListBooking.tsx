import { BookingHeader } from "../../components/admin/bookings/BookingHeader";
import { BookingTabs } from "../../components/admin/bookings/BookingTabs";
import { BookingFilters } from "../../components/admin/bookings/BookingFilters";
import { BookingTable } from "../../components/admin/bookings/BookingTable";
import { BookingPagination } from "../../components/admin/bookings/BookingPagination";

export const metadata = {
    title: "Manajemen Booking - Klinik Gigi Sehat",
};

export default function BookingPage() {
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
