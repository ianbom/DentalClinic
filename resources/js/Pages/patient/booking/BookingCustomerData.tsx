import { BookingHeader } from '@/Components/booking/BookingHeader';
import { CustomerBookingSidebar } from '@/Components/booking/PatientBookingSidebar';
import { CustomerDataForm } from '@/Components/booking/PatientDataForm';
import { BookingProvider } from '@/context/BookingContext';
import PatientLayout from '@/Layouts/PatientLayout';
import { getDoctorById } from '@/lib/doctors';

interface CustomerDataPageProps {
    id: string;
}

function CustomerDataPage({ id }: CustomerDataPageProps) {
    const doctor = getDoctorById(id);

    return (
        <div className="flex min-h-screen flex-1 flex-col items-center bg-background-light px-4 py-8 font-display md:px-10 lg:px-20">
            <div className="flex w-full max-w-6xl flex-col gap-8">
                {/* Progress Bar */}
                <BookingHeader currentStep={2} />

                {/* Content Area: Grid View */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Customer Form */}
                    <div className="lg:col-span-8">
                        <CustomerDataForm doctorId={id} />
                    </div>

                    {/* Right Column: Booking Summary Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <CustomerBookingSidebar doctor={doctor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

CustomerDataPage.layout = (page: React.ReactNode) => (
    <PatientLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientLayout>
);

export default CustomerDataPage;
