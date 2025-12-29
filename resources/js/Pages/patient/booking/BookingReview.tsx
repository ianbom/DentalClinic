import { BookingHeader } from "@/app/components/booking/BookingHeader";
import { ReviewBookingCard } from "@/app/components/booking/ReviewBookingCard";
import { ReviewActions } from "@/app/components/booking/ReviewActions";
import { ReviewSidebar } from "@/app/components/booking/ReviewSidebar";
import { getDoctorById } from "@/lib/doctors";

export default async function ReviewBookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = getDoctorById(id);

    return (
        <div className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 font-display">
            {/* Progress Bar */}
            <div className="mb-8">
                <BookingHeader currentStep={3} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
                {/* Main Content: Review Card */}
                <div className="lg:col-span-2 space-y-6">
                    <ReviewBookingCard doctor={doctor} />
                    <ReviewActions doctorId={id} />
                </div>

                {/* Sidebar Info */}
                <ReviewSidebar />
            </div>
        </div>
    );
}
