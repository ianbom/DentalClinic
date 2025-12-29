import { DoctorProfileHeader } from "@/app/components/doctor-detail/DoctorProfileHeader";
import { BookingCalendar } from "@/app/components/doctor-detail/BookingCalendar";
import { StickyBookingBar } from "@/app/components/doctor-detail/StickyBookingBar";
import { getDoctorById, getDoctorIds } from "@/lib/doctors";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return getDoctorIds().map((id) => ({ id }));
}

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = getDoctorById(id);

    if (!doctor) {
        notFound();
    }

    return (
        <div className="flex-grow w-full max-w-[960px] mx-auto px-4 py-8 pb-24 font-display">
            <DoctorProfileHeader doctor={doctor} />
            <BookingCalendar doctor={doctor} doctorId={id} />
            <div className="h-20"></div>
            {/* <StickyBookingBar doctorId={id} price={doctor.price} /> */}
        </div>
    );
}
