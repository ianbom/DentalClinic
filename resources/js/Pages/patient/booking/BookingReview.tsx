import { BookingHeader } from '@/Components/booking/BookingHeader';
import { ReviewActions } from '@/Components/booking/ReviewActions';
import { ReviewBookingCard } from '@/Components/booking/ReviewBookingCard';
import { ReviewSidebar } from '@/Components/booking/ReviewSidebar';
import { BookingProvider } from '@/context/BookingContext';
import PatientLayout from '@/Layouts/PatientLayout';
import { Doctor } from '@/types';

interface ReviewBookingPageProps {
    doctor: Doctor;
}

function ReviewBookingPage({ doctor }: ReviewBookingPageProps) {
    return (
        <div className="mx-auto w-full max-w-4xl flex-grow px-4 py-8 font-display sm:px-6 sm:py-12">
            {/* Progress Bar */}
            <div className="mb-8">
                <BookingHeader currentStep={3} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {/* Main Content: Review Card */}
                <div className="space-y-6 lg:col-span-2">
                    <ReviewBookingCard doctor={doctor} />
                    <ReviewActions doctorId={String(doctor.id)} />
                </div>

                {/* Sidebar Info */}
                <ReviewSidebar />
            </div>
        </div>
    );
}

ReviewBookingPage.layout = (page: React.ReactNode) => (
    <PatientLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientLayout>
);

export default ReviewBookingPage;
