import { BookingCalendarWidget } from '@/Components/booking/BookingCalendarWidget';
import { BookingHeader } from '@/Components/booking/BookingHeader';
import { BookingSummarySidebar } from '@/Components/booking/BookingSummarySidebar';
import { BookingTimeSlots } from '@/Components/booking/BookingTimeSlots';
import { ServiceSelection } from '@/Components/booking/ServiceSelection';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import PatientBookingLayout from '@/Layouts/PatientBookingLayout';
import { AvailableSlots, Doctor } from '@/types';

interface BookingPageProps {
    doctor: Doctor;
    availableSlots: AvailableSlots;
}

function BookingPage({ doctor, availableSlots }: BookingPageProps) {
    const { bookingData, setBookingData } = useBooking();

    return (
        <div className="mx-auto w-full max-w-4xl flex-grow px-4 py-8 font-display sm:px-6 sm:py-12">
            <div className="flex flex-col gap-8">
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

                        {/* Date Selection - Only show after service is selected */}
                        {bookingData.serviceId ? (
                            <>
                                <div className="mb-8 border-t border-gray-100 pt-8">
                                    <h3 className="mb-2 text-lg font-bold text-text-light">
                                        Pilih Tanggal
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Silakan pilih tanggal yang tersedia
                                        untuk{' '}
                                        {bookingData.service?.toLowerCase() ||
                                            'konsultasi'}{' '}
                                        Anda.
                                    </p>
                                </div>

                                <BookingCalendarWidget
                                    availableSlots={availableSlots}
                                />

                                <div className="border-t border-gray-100 pt-8">
                                    <BookingTimeSlots
                                        availableSlots={availableSlots}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="border-t border-gray-100 pt-8">
                                <div className="rounded-lg bg-gray-50 p-6 text-center">
                                    <span className="material-symbols-outlined mb-2 text-4xl text-gray-400">
                                        event
                                    </span>
                                    <p className="text-sm text-gray-500">
                                        Pilih jenis layanan terlebih dahulu
                                        untuk melihat jadwal yang tersedia.
                                    </p>
                                </div>
                            </div>
                        )}
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
    <PatientBookingLayout>
        <BookingProvider>{page}</BookingProvider>
    </PatientBookingLayout>
);

export default BookingPage;
