import { BookingDetailHeader } from '@/Components/admin/bookings/detail/BookingDetailHeader';
import { BookingScheduleCard } from '@/Components/admin/bookings/detail/BookingScheduleCard';
import { BookingStatusCard } from '@/Components/admin/bookings/detail/BookingStatusCard';
import { BookingTimeline } from '@/Components/admin/bookings/detail/BookingTimeline';
import { PatientInfoCard } from '@/Components/admin/bookings/detail/PatientInfoCard';
import AdminLayout from '@/Layouts/AdminLayout';
import { getStatusLabel } from '@/lib/utils';
import { BookingDetail } from '@/types';

interface BookingDetailPageProps {
    booking: BookingDetail;
}

function BookingDetailPage({ booking }: BookingDetailPageProps) {
    return (
        <>
            <BookingDetailHeader />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column: Main Info, Actions, Schedule */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <BookingStatusCard
                        code={`#${booking.code}`}
                        createdDate={booking.created_at_formatted}
                        status={getStatusLabel(booking.status)}
                    />
                    <BookingScheduleCard
                        doctorName={booking.doctor.name}
                        doctorSpeciality={`SIP: ${booking.doctor.sip}`}
                        doctorImage={
                            booking.doctor.profile_pic ||
                            '/images/default-doctor.jpg'
                        }
                        date={booking.booking_date_formatted}
                        time={`${booking.start_time} WIB`}
                    />
                    <BookingTimeline booking={booking} />
                </div>

                {/* Right Column: Customer Info */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <PatientInfoCard
                        name={booking.patient.name}
                        type="Pasien"
                        nik={booking.patient.nik}
                        whatsapp={booking.patient.phone}
                        email={booking.patient.email}
                        note={booking.patient.complaint}
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
