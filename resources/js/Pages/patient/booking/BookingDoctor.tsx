import { BookingCalendarWidget } from '@/Components/booking/BookingCalendarWidget';
import { BookingHeader } from '@/Components/booking/BookingHeader';
import { BookingSummarySidebar } from '@/Components/booking/BookingSummarySidebar';
import { BookingTimeSlots } from '@/Components/booking/BookingTimeSlots';
import { ServiceSelection } from '@/Components/booking/ServiceSelection';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import PatientLayout from '@/Layouts/PatientLayout';
import { AvailableSlots, Doctor } from '@/types';

interface BookingPageProps {
    doctor: Doctor;
    availableSlots: AvailableSlots;
}

function BookingPage({ doctor, availableSlots }: BookingPageProps) {
    const { bookingData, setBookingData } = useBooking();

    return (
        <div className="flex min-h-screen flex-1 flex-col items-center bg-background-light px-4 py-8 font-display md:px-10 lg:px-20">
            <div className="flex w-full max-w-6xl flex-col gap-8">
                {/* Progress Bar */}
                <BookingHeader />

                {/* Content Area: Split View */}
                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    {/* Left Column: Calendar & Time Slots */}
                    <div className="w-full flex-1 rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                        {/* Service Selection */}
                        <div className="mb-8">
                            <h3 className="mb-2 text-lg font-bold text-text-light">
                                Pilih Jenis Layanan
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">
                                Pilih jenis layanan yang Anda butuhkan.
                            </p>
                            <ServiceSelection
                                value={bookingData.serviceId}
                                onChange={() => {}}
                                showSisipan={false}
                            />
                        </div>

                        {/* Date Selection Header */}
                        <div className="mb-8 border-t border-gray-100 pt-8">
                            <h3 className="mb-2 text-lg font-bold text-text-light">
                                Pilih Tanggal
                            </h3>
                            <p className="text-sm text-gray-500">
                                Silakan pilih tanggal yang tersedia untuk{' '}
                                {bookingData.service?.toLowerCase() ||
                                    'konsultasi'}{' '}
                                Anda.
                            </p>
                        </div>

                        <BookingCalendarWidget
                            availableSlots={availableSlots}
                        />

                        <div className="border-t border-gray-100 pt-8">
                            <BookingTimeSlots availableSlots={availableSlots} />
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary Sidebar */}
                    <div className="sticky top-28 w-full shrink-0 lg:w-[360px]">
                        <BookingSummarySidebar
                            doctorId={String(doctor.id)}
                            doctor={doctor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
BookingPage.layout = (page: React.ReactNode) => (
    <PatientLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientLayout>
);

export default BookingPage;
