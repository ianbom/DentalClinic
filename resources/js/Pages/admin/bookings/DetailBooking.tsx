import { BookingDetailHeader } from '@/Components/admin/bookings/detail/BookingDetailHeader';
import { BookingScheduleCard } from '@/Components/admin/bookings/detail/BookingScheduleCard';
import { BookingStatusCard } from '@/Components/admin/bookings/detail/BookingStatusCard';
import { BookingTimeline } from '@/Components/admin/bookings/detail/BookingTimeline';
import { PatientInfoCard } from '@/Components/admin/bookings/detail/PatientInfoCard';
import { getBookingById } from '@/data/bookings';
import AdminLayout from '@/Layouts/AdminLayout';

interface BookingDetailPageProps {
    id: string;
}

function BookingDetailPage({ id }: BookingDetailPageProps) {
    const bookingData = getBookingById(id);

    if (!bookingData) {
        return <div>Booking tidak ditemukan</div>;
    }

    return (
        <>
            <BookingDetailHeader />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column: Main Info, Actions, Schedule */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <BookingStatusCard
                        code={`#${bookingData.code}`}
                        createdDate={bookingData.createdDate}
                        status={bookingData.status}
                    />
                    <BookingScheduleCard
                        doctorName={bookingData.doctor.name}
                        doctorSpeciality={bookingData.doctor.speciality}
                        doctorImage={bookingData.doctor.image}
                        date={bookingData.schedule.date}
                        time={bookingData.schedule.time}
                    />
                    <BookingTimeline />
                </div>

                {/* Right Column: Customer Info */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <PatientInfoCard
                        name={bookingData.patient.name}
                        type={bookingData.patient.type}
                        nik={bookingData.patient.nik}
                        whatsapp={bookingData.patient.phone}
                        email={bookingData.patient.email}
                        note={bookingData.patient.notes}
                        image={bookingData.patient.image}
                    />
                </div>
            </div>
        </>
    );
}

BookingDetailPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default BookingDetailPage;
