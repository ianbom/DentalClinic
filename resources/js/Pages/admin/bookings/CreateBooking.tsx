import { BookingCalendarWidget } from '@/Components/booking/BookingCalendarWidget';
import { BookingTimeSlots } from '@/Components/booking/BookingTimeSlots';
import { CustomerDataForm } from '@/Components/booking/PatientDataForm';
import { ServiceSelection } from '@/Components/booking/ServiceSelection';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import AdminLayout from '@/Layouts/AdminLayout';
import { AvailableSlots, Doctor } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Province {
    id: number;
    name: string;
}

interface CreateBookingProps {
    allDoctors: Doctor[];
    doctor: Doctor | null;
    availableSlots: AvailableSlots;
    selectedDoctorId: number | null;
    provinces: Province[];
}

function CreateBookingForm({
    allDoctors,
    doctor,
    availableSlots,
    selectedDoctorId,
    provinces,
}: CreateBookingProps) {
    const { bookingData, resetBookingData } = useBooking();
    const [currentDoctorId, setCurrentDoctorId] = useState<number | null>(
        selectedDoctorId,
    );
    const [service, setService] = useState('');

    // Handle reset - clears all selections
    const handleReset = () => {
        resetBookingData();
        setService('');
        // Reload page without doctor selection
        router.get('/admin/bookings/create', {}, { preserveState: false });
    };

    // Handle doctor change
    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const doctorId = e.target.value;
        setCurrentDoctorId(doctorId ? Number(doctorId) : null);

        // Reload page with new doctor
        if (doctorId) {
            router.get(
                '/admin/bookings/create',
                { doctor_id: doctorId },
                { preserveState: false },
            );
        }
    };

    // Handle service change
    const handleServiceChange = (value: string) => {
        setService(value);
    };

    return (
        <div className="min-h-screen bg-[#f8fbfc] p-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#0d171c]">
                        Buat Booking Baru
                    </h1>
                    <p className="text-sm text-[#49829c]">
                        Buat booking manual untuk pasien
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Forms */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Step 1: Doctor Selection */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    1
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Pilih Dokter
                                </h2>
                            </div>
                            <select
                                value={currentDoctorId || ''}
                                onChange={handleDoctorChange}
                                className="w-full rounded-lg border border-[#cee0e8] bg-white px-4 py-3 text-[#0d171c] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">-- Pilih Dokter --</option>
                                {allDoctors.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        {doc.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Step 2: Service Selection */}
                        {doctor && (
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                        2
                                    </span>
                                    <h2 className="text-lg font-bold text-[#0d171c]">
                                        Pilih Layanan
                                    </h2>
                                </div>
                                <ServiceSelection
                                    value={service}
                                    onChange={handleServiceChange}
                                    showSisipan={true}
                                />
                            </div>
                        )}

                        {/* Step 3: Date & Time Selection */}
                        {doctor && service && (
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                        3
                                    </span>
                                    <h2 className="text-lg font-bold text-[#0d171c]">
                                        Pilih Tanggal & Jam
                                    </h2>
                                </div>
                                <p className="mb-4 text-sm text-[#49829c]">
                                    Pilih tanggal. Jam bisa dikosongkan jika
                                    belum pasti.
                                </p>

                                <BookingCalendarWidget
                                    availableSlots={availableSlots}
                                />

                                <div className="mt-6 border-t border-[#e7f0f4] pt-6">
                                    <BookingTimeSlots
                                        availableSlots={availableSlots}
                                    />
                                </div>

                                {/* Display selected values */}
                                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                    {bookingData.selectedDate && (
                                        <div className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
                                            📅 Tanggal:{' '}
                                            {bookingData.selectedDate}
                                        </div>
                                    )}
                                    {bookingData.selectedTime && (
                                        <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                                            ⏰ Jam: {bookingData.selectedTime}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Patient Data (Step 3 for sisipan) */}
                        {doctor && service && bookingData.selectedDate && (
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                        4
                                    </span>
                                    <h2 className="text-lg font-bold text-[#0d171c]">
                                        Data Pasien
                                    </h2>
                                </div>

                                <CustomerDataForm
                                    doctorId={String(doctor.id)}
                                    isAdmin={true}
                                    provinces={provinces}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-bold text-[#0d171c]">
                                Ringkasan Booking
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#49829c]">
                                        Dokter
                                    </span>
                                    <span className="font-medium text-[#0d171c]">
                                        {doctor?.name || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#49829c]">
                                        Layanan
                                    </span>
                                    <span className="font-medium text-[#0d171c]">
                                        {bookingData.service || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#49829c]">
                                        Tanggal
                                    </span>
                                    <span className="font-medium text-[#0d171c]">
                                        {bookingData.selectedDate || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#49829c]">Jam</span>
                                    <span className="font-medium text-[#0d171c]">
                                        {bookingData.selectedTime ||
                                            'Belum dipilih'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#49829c]">
                                        Pasien
                                    </span>
                                    <span className="font-medium text-[#0d171c]">
                                        {bookingData.fullName || '-'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleReset}
                                className="mt-6 w-full rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-500/20"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateBookingPage(props: CreateBookingProps) {
    return <CreateBookingForm {...props} />;
}

CreateBookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>
        <BookingProvider>{page}</BookingProvider>
    </AdminLayout>
);

export default CreateBookingPage;
