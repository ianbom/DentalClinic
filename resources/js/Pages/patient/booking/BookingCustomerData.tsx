import { BookingHeader } from '@/Components/booking/BookingHeader';
import { CustomerBookingSidebar } from '@/Components/booking/PatientBookingSidebar';
import { CustomerDataForm } from '@/Components/booking/PatientDataForm';
import { BookingProvider } from '@/context/BookingContext';
import PatientBookingLayout from '@/Layouts/PatientBookingLayout';
import { Doctor } from '@/types';

interface Province {
    id: number;
    name: string;
}

interface CustomerDataPageProps {
    doctor: Doctor;
    provinces: Province[];
}

function CustomerDataPage({ doctor, provinces }: CustomerDataPageProps) {
    return (
        <div className="mx-auto w-full max-w-4xl flex-grow px-4 py-8 font-display sm:px-6 sm:py-12">
            <div className="flex flex-col gap-8">
                {/* Progress Bar */}
                <BookingHeader currentStep={2} doctorId={String(doctor.id)} />

                {/* Spacer for step labels */}
                <div className="h-1"></div>

                {/* Summary Card */}
                <CustomerBookingSidebar
                    doctor={doctor}
                    doctorId={String(doctor.id)}
                />

                {/* Form Card */}
                <CustomerDataForm
                    doctorId={String(doctor.id)}
                    provinces={provinces}
                />
            </div>
        </div>
    );
}

CustomerDataPage.layout = (page: React.ReactNode) => (
    <PatientBookingLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientBookingLayout>
);

export default CustomerDataPage;
