import { BookingCodeCard } from '@/Components/booking/success/BookingCodeCard';
import { BookingDetailsCard } from '@/Components/booking/success/BookingDetailsCard';
import { PaymentInfoBox } from '@/Components/booking/success/PaymentInfoBox';
import { SuccessActions } from '@/Components/booking/success/SuccessActions';
import { SuccessHero } from '@/Components/booking/success/SuccessHero';
import { SuccessStepper } from '@/Components/booking/success/SuccessStepper';
import { BookingProvider } from '@/context/BookingContext';
import PatientLayout from '@/Layouts/PatientLayout';
import { getDoctorById } from '@/lib/doctors';

interface BookingSuccessPageProps {
    id: string;
}

function BookingSuccessPage({ id }: BookingSuccessPageProps) {
    const doctor = getDoctorById(id);

    return (
        <div className="flex flex-1 justify-center bg-background-light px-4 py-8 font-display md:px-40">
            <div className="flex w-full max-w-[800px] flex-1 flex-col">
                <SuccessStepper />

                <SuccessHero />

                <BookingCodeCard />

                <BookingDetailsCard doctor={doctor} />

                <PaymentInfoBox />

                <SuccessActions />
            </div>
        </div>
    );
}

BookingSuccessPage.layout = (page: React.ReactNode) => (
    <PatientLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientLayout>
);

export default BookingSuccessPage;
