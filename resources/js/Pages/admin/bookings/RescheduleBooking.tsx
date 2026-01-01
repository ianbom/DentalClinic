import { BookingCalendarWidget } from '@/Components/booking/BookingCalendarWidget';
import { BookingTimeSlots } from '@/Components/booking/BookingTimeSlots';
import { ServiceSelection } from '@/Components/booking/ServiceSelection';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import AdminLayout from '@/Layouts/AdminLayout';
import { AvailableSlots, Doctor } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface PatientData {
    id: number;
    name: string;
    nik: string;
    phone: string;
    email: string | null;
    birthdate: string | null;
    address: string | null;
}

interface DoctorData {
    id: number;
    name: string;
}

interface BookingData {
    id: number;
    code: string;
    service: string;
    type: string;
    booking_date: string;
    booking_date_formatted: string;
    start_time: string | null;
    status: string;
    created_at_formatted: string;
    patient: PatientData;
    doctor: DoctorData;
}

interface RescheduleBookingProps {
    booking: BookingData;
    allDoctors: Doctor[];
    doctor: Doctor | null;
    availableSlots: AvailableSlots;
    selectedDoctorId: number;
}

function RescheduleBookingForm({
    booking,
    allDoctors,
    doctor,
    availableSlots,
    selectedDoctorId,
}: RescheduleBookingProps) {
    const { bookingData, setBookingData, resetBookingData } = useBooking();
    const [currentDoctorId, setCurrentDoctorId] =
        useState<number>(selectedDoctorId);
    const [service, setService] = useState(booking.service);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Reset and initialize with existing booking data on mount
    useEffect(() => {
        if (!isInitialized) {
            // First reset all old data
            resetBookingData();

            // Then set the current booking data after a short delay
            // to ensure reset has completed
            setTimeout(() => {
                setBookingData({
                    service: booking.service,
                    serviceType: booking.type as
                        | 'short'
                        | 'long'
                        | 'sisipan'
                        | '',
                    selectedDate: booking.booking_date_formatted,
                    rawSelectedDate: booking.booking_date,
                    selectedTime: booking.start_time || '',
                    // Reset all patient-related fields
                    fullName: '',
                    nik: '',
                    whatsapp: '',
                    email: '',
                    birthdate: '',
                    address: '',
                    isWhatsappVerified: false,
                    isNikChecked: false,
                });
                setIsInitialized(true);
            }, 0);
        }
    }, [booking, isInitialized, resetBookingData, setBookingData]);

    // Handle doctor change
    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const doctorId = e.target.value;
        setCurrentDoctorId(Number(doctorId));

        if (doctorId) {
            router.get(
                `/admin/bookings/${booking.id}/reschedule`,
                { doctor_id: doctorId },
                { preserveState: false },
            );
        }
    };

    // Handle service change
    const handleServiceChange = (value: string) => {
        setService(value);
    };

    // Handle submit
    const handleSubmit = () => {
        if (!currentDoctorId || !bookingData.rawSelectedDate) {
            return;
        }

        setIsSubmitting(true);

        router.put(
            `/admin/bookings/${booking.id}/reschedule`,
            {
                doctor_id: currentDoctorId,
                service: bookingData.service,
                type: bookingData.serviceType,
                booking_date: bookingData.rawSelectedDate,
                start_time: bookingData.selectedTime || null,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            confirmed: 'bg-green-100 text-green-700 border-green-200',
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
            completed: 'bg-blue-100 text-blue-700 border-blue-200',
        };
        return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-[#f8fbfc] p-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#0d171c]">
                        Reschedule Booking
                    </h1>
                    <p className="text-sm text-[#49829c]">
                        Ubah jadwal booking #{booking.code}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Edit Forms */}
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
                                value={currentDoctorId}
                                onChange={handleDoctorChange}
                                className="w-full rounded-lg border border-[#cee0e8] bg-white px-4 py-3 text-[#0d171c] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
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
                                            ⏰ Jam: {bookingData.selectedTime}{' '}
                                            WIB
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        {doctor && service && bookingData.rawSelectedDate && (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-primary py-4 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </button>
                        )}
                    </div>

                    {/* Right Column - Current Booking Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Current Booking */}
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-bold text-[#0d171c]">
                                    Booking Saat Ini
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Kode
                                        </span>
                                        <span className="font-mono font-medium text-[#0d171c]">
                                            {booking.code}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Status
                                        </span>
                                        <span
                                            className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadge(booking.status)}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Dokter
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {booking.doctor.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Layanan
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {booking.service}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Tanggal
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {booking.booking_date_formatted}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Jam
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {booking.start_time
                                                ? `${booking.start_time} WIB`
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Dibuat
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {booking.created_at_formatted}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Info */}
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-bold text-[#0d171c]">
                                    Data Pasien
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-xs text-[#49829c]">
                                            Nama
                                        </span>
                                        <p className="font-medium text-[#0d171c]">
                                            {booking.patient.name}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-[#49829c]">
                                            NIK
                                        </span>
                                        <p className="font-mono text-[#0d171c]">
                                            {booking.patient.nik}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-[#49829c]">
                                            Telepon
                                        </span>
                                        <p className="text-[#0d171c]">
                                            {booking.patient.phone}
                                        </p>
                                    </div>
                                    {booking.patient.email && (
                                        <div>
                                            <span className="text-xs text-[#49829c]">
                                                Email
                                            </span>
                                            <p className="text-[#0d171c]">
                                                {booking.patient.email}
                                            </p>
                                        </div>
                                    )}
                                    {booking.patient.address && (
                                        <div>
                                            <span className="text-xs text-[#49829c]">
                                                Alamat
                                            </span>
                                            <p className="text-[#0d171c]">
                                                {booking.patient.address}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* New Schedule Summary */}
                            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
                                <h3 className="mb-4 text-lg font-bold text-primary">
                                    Jadwal Baru
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
                                        <span className="text-[#49829c]">
                                            Jam
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {bookingData.selectedTime
                                                ? `${bookingData.selectedTime} WIB`
                                                : 'Belum dipilih'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RescheduleBookingPage(props: RescheduleBookingProps) {
    return <RescheduleBookingForm {...props} />;
}

RescheduleBookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>
        <BookingProvider>{page}</BookingProvider>
    </AdminLayout>
);

export default RescheduleBookingPage;
