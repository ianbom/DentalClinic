import { BookingHeader } from "@/app/components/booking/BookingHeader";
import { BookingCalendarWidget } from "@/app/components/booking/BookingCalendarWidget";
import { BookingTimeSlots } from "@/app/components/booking/BookingTimeSlots";
import { BookingSummarySidebar } from "@/app/components/booking/BookingSummarySidebar";
import { getDoctorById } from "@/lib/doctors";

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = getDoctorById(id);

    return (
        <div className="flex-1 flex flex-col items-center py-8 px-4 md:px-10 lg:px-20 min-h-screen bg-background-light font-display">
            <div className="max-w-6xl w-full flex flex-col gap-8">
                {/* Progress Bar */}
                <BookingHeader />

                {/* Content Area: Split View */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Calendar & Time Slots */}
                    <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        {/* Date Selection Header */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-text-light mb-2">Pilih Tanggal</h3>
                            <p className="text-gray-500 text-sm">Silakan pilih tanggal yang tersedia untuk konsultasi Anda.</p>
                        </div>

                        <BookingCalendarWidget />

                        <div className="border-t border-gray-100 pt-8">
                            <BookingTimeSlots />
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary Sidebar */}
                    <div className="w-full lg:w-[360px] shrink-0 sticky top-28">
                        <BookingSummarySidebar doctorId={id} doctor={doctor} />
                    </div>
                </div>
            </div>
        </div>
    );
}
