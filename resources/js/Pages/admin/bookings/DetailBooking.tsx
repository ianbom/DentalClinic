import { notFound } from "next/navigation";
import { BookingDetailHeader } from "@/app/components/admin/bookings/detail/BookingDetailHeader";
import { BookingStatusCard } from "@/app/components/admin/bookings/detail/BookingStatusCard";
import { BookingScheduleCard } from "@/app/components/admin/bookings/detail/BookingScheduleCard";
import { BookingTimeline } from "@/app/components/admin/bookings/detail/BookingTimeline";
import { PatientInfoCard } from "@/app/components/admin/bookings/detail/PatientInfoCard";
import { getBookingById } from "@/app/data/bookings";

export const metadata = {
    title: "Detail Booking - Klinik Gigi Sehat",
};

interface BookingDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
    const { id } = await params;
    const bookingData = getBookingById(id);

    if (!bookingData) {
        notFound();
    }

    return (
        <>
            <BookingDetailHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Main Info, Actions, Schedule */}
                <div className="lg:col-span-2 flex flex-col gap-6">
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
                <div className="lg:col-span-1 flex flex-col gap-6">
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
