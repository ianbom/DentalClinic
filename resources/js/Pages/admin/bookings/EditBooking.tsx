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
    gender: string | null;
    medical_records: string | null;
}

interface DoctorData {
    id: number;
    name: string;
}

interface PaymentData {
    amount: number;
    payment_method: string;
    note: string | null;
}

interface CheckinData {
    checked_in_at: string;
}

interface CancellationData {
    cancelled_at: string;
    cancelled_by: string;
    reason: string | null;
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
    payment: PaymentData | null;
    checkin: CheckinData | null;
    cancellation: CancellationData | null;
}

interface EditBookingProps {
    booking: BookingData;
    allDoctors: Doctor[];
    doctor: Doctor | null;
    availableSlots: AvailableSlots;
    selectedDoctorId: number;
}

const paymentMethods = [
    { value: 'cash', label: 'Tunai' },
    { value: 'transfer', label: 'Transfer Bank' },
    { value: 'qris', label: 'QRIS' },
    { value: 'debit', label: 'Kartu Debit' },
    { value: 'credit', label: 'Kartu Kredit' },
];

const cancelledByOptions = [
    { value: 'patient', label: 'Pasien' },
    { value: 'admin', label: 'Admin' },
    { value: 'system', label: 'System' },
];

function EditBookingForm({
    booking,
    allDoctors,
    doctor,
    availableSlots,
    selectedDoctorId,
}: EditBookingProps) {
    const { bookingData, setBookingData, resetBookingData } = useBooking();
    const [currentDoctorId, setCurrentDoctorId] =
        useState<number>(selectedDoctorId);
    const [service, setService] = useState(booking.service);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Patient form state
    const [patientName, setPatientName] = useState(booking.patient.name);
    const [patientNik, setPatientNik] = useState(booking.patient.nik);
    const [patientPhone, setPatientPhone] = useState(booking.patient.phone);
    const [patientBirthdate, setPatientBirthdate] = useState(
        booking.patient.birthdate || '',
    );
    const [patientAddress, setPatientAddress] = useState(
        booking.patient.address || '',
    );
    const [patientGender, setPatientGender] = useState(
        booking.patient.gender || '',
    );
    const [patientMedicalRecords, setPatientMedicalRecords] = useState(
        booking.patient.medical_records || '',
    );

    // Status state
    const [bookingStatus, setBookingStatus] = useState(booking.status);

    // Payment state
    const [paymentAmount, setPaymentAmount] = useState(
        booking.payment?.amount?.toString() || '',
    );
    const [paymentMethod, setPaymentMethod] = useState(
        booking.payment?.payment_method || 'cash',
    );
    const [paymentNote, setPaymentNote] = useState(booking.payment?.note || '');

    // Checkin state
    const [checkedInAt, setCheckedInAt] = useState(
        booking.checkin?.checked_in_at || '',
    );

    // Cancellation state
    const [cancelledAt, setCancelledAt] = useState(
        booking.cancellation?.cancelled_at || '',
    );
    const [cancelledBy, setCancelledBy] = useState(
        booking.cancellation?.cancelled_by || 'admin',
    );
    const [cancellationReason, setCancellationReason] = useState(
        booking.cancellation?.reason || '',
    );

    // Initialize booking data
    useEffect(() => {
        if (!isInitialized) {
            resetBookingData();
            setTimeout(() => {
                setBookingData({
                    service: '',
                    serviceType: '',
                    selectedDate: '',
                    rawSelectedDate: '',
                    selectedTime: '',
                    fullName: '',
                    nik: '',
                    whatsapp: '',
                    gender: '' as 'male' | 'female' | '',
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
                `/admin/bookings/${booking.id}/edit`,
                { doctor_id: doctorId },
                { preserveState: false },
            );
        }
    };

    // Handle service change
    const handleServiceChange = (value: string) => {
        setService(value);
    };

    // Format currency
    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Handle submit
    const handleSubmit = () => {
        if (!currentDoctorId) return;

        setIsSubmitting(true);

        router.put(
            `/admin/bookings/${booking.id}/edit`,
            {
                // Booking data
                doctor_id: currentDoctorId,
                service: bookingData.service || booking.service,
                type: bookingData.serviceType || booking.type,
                booking_date:
                    bookingData.rawSelectedDate || booking.booking_date,
                start_time: bookingData.selectedTime || booking.start_time,
                status: bookingStatus,
                // Patient data
                patient_name: patientName,
                patient_nik: patientNik,
                patient_phone: patientPhone,
                patient_birthdate: patientBirthdate || null,
                patient_address: patientAddress || null,
                patient_gender: patientGender || null,
                patient_medical_records: patientMedicalRecords || null,
                // Payment data
                payment_amount: paymentAmount
                    ? parseInt(paymentAmount.replace(/\D/g, ''), 10)
                    : null,
                payment_method: paymentMethod,
                payment_note: paymentNote || null,
                // Checkin data
                checked_in_at: checkedInAt || null,
                // Cancellation data
                cancelled_at: cancelledAt || null,
                cancelled_by: cancelledBy,
                cancellation_reason: cancellationReason || null,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const statusOptions = [
        {
            value: 'confirmed',
            label: 'Confirmed',
            color: 'bg-green-100 text-green-700',
        },
        {
            value: 'checked_in',
            label: 'Checked In',
            color: 'bg-blue-100 text-blue-700',
        },
        {
            value: 'cancelled',
            label: 'Cancelled',
            color: 'bg-red-100 text-red-700',
        },
        {
            value: 'no_show',
            label: 'No Show',
            color: 'bg-gray-100 text-gray-700',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fbfc] p-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0d171c]">
                            Edit Booking
                        </h1>
                        <p className="text-sm text-[#49829c]">
                            Edit semua data booking #{booking.code}
                        </p>
                    </div>
                    <button
                        onClick={() =>
                            router.get(`/admin/bookings/${booking.id}`)
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Edit Forms */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Status Selection */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    1
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Status Booking
                                </h2>
                            </div>
                            <select
                                value={bookingStatus}
                                onChange={(e) =>
                                    setBookingStatus(e.target.value)
                                }
                                className="w-full rounded-lg border border-[#cee0e8] bg-white px-4 py-3 text-[#0d171c] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                {statusOptions.map((status) => (
                                    <option
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Doctor Selection */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    2
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

                        {/* Service Selection */}
                        {doctor && (
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                        3
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

                        {/* Date & Time Selection */}
                        {doctor && service && (
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                        4
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
                                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                    {(bookingData.selectedDate ||
                                        booking.booking_date_formatted) && (
                                        <div className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
                                            📅 Tanggal:{' '}
                                            {bookingData.selectedDate ||
                                                booking.booking_date_formatted}
                                        </div>
                                    )}
                                    {(bookingData.selectedTime ||
                                        booking.start_time) && (
                                        <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                                            ⏰ Jam:{' '}
                                            {bookingData.selectedTime ||
                                                booking.start_time}{' '}
                                            WIB
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Patient Data Form */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    5
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Data Pasien
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Nama Lengkap*
                                    </label>
                                    <input
                                        type="text"
                                        value={patientName}
                                        onChange={(e) =>
                                            setPatientName(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        NIK*
                                    </label>
                                    <input
                                        type="text"
                                        value={patientNik}
                                        onChange={(e) =>
                                            setPatientNik(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 font-mono text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        No. Telepon*
                                    </label>
                                    <input
                                        type="text"
                                        value={patientPhone}
                                        onChange={(e) =>
                                            setPatientPhone(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        No. Rekam Medis
                                    </label>
                                    <input
                                        type="text"
                                        value={patientMedicalRecords}
                                        onChange={(e) =>
                                            setPatientMedicalRecords(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: RM-001"
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 font-mono text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        value={patientBirthdate}
                                        onChange={(e) =>
                                            setPatientBirthdate(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        value={patientGender}
                                        onChange={(e) =>
                                            setPatientGender(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">
                                            Perempuan
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={patientAddress}
                                        onChange={(e) =>
                                            setPatientAddress(e.target.value)
                                        }
                                        rows={2}
                                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                                    💳
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Pembayaran
                                </h2>
                                {booking.payment && (
                                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                        Sudah Bayar
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Nominal (Rp)
                                    </label>
                                    <input
                                        type="text"
                                        value={formatCurrency(paymentAmount)}
                                        onChange={(e) =>
                                            setPaymentAmount(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    '',
                                                ),
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Metode
                                    </label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        {paymentMethods.map((m) => (
                                            <option
                                                key={m.value}
                                                value={m.value}
                                            >
                                                {m.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Catatan Pembayaran
                                    </label>
                                    <textarea
                                        value={paymentNote}
                                        onChange={(e) =>
                                            setPaymentNote(e.target.value)
                                        }
                                        rows={2}
                                        placeholder="Catatan opsional..."
                                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Checkin Form */}
                        <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    ✓
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Check-in
                                </h2>
                                {booking.checkin && (
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                        Sudah Check-in
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Waktu Check-in
                                </label>
                                <input
                                    type="datetime-local"
                                    value={checkedInAt}
                                    onChange={(e) =>
                                        setCheckedInAt(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:w-1/2"
                                />
                                <p className="text-xs text-slate-500">
                                    Kosongkan untuk menghapus data check-in
                                </p>
                            </div>
                        </div>

                        {/* Cancellation Form */}
                        <div className="rounded-xl border border-red-200 bg-red-50/30 p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                                    ✕
                                </span>
                                <h2 className="text-lg font-bold text-[#0d171c]">
                                    Pembatalan
                                </h2>
                                {booking.cancellation && (
                                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                        Dibatalkan
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Waktu Pembatalan
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={cancelledAt}
                                        onChange={(e) =>
                                            setCancelledAt(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Dibatalkan Oleh
                                    </label>
                                    <select
                                        value={cancelledBy}
                                        onChange={(e) =>
                                            setCancelledBy(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        {cancelledByOptions.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Alasan Pembatalan
                                    </label>
                                    <textarea
                                        value={cancellationReason}
                                        onChange={(e) =>
                                            setCancellationReason(
                                                e.target.value,
                                            )
                                        }
                                        rows={2}
                                        placeholder="Alasan pembatalan booking..."
                                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                Kosongkan waktu pembatalan untuk menghapus data
                                pembatalan
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={
                                isSubmitting ||
                                !patientName ||
                                !patientNik ||
                                !patientPhone
                            }
                            className="w-full rounded-lg bg-primary py-4 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Current Booking Info */}
                            <div className="rounded-xl border border-[#e7f0f4] bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-bold text-[#0d171c]">
                                    Data Asli
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
                                        <span className="font-medium text-[#0d171c]">
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
                                    {booking.patient.medical_records && (
                                        <div className="flex justify-between">
                                            <span className="text-[#49829c]">
                                                No. RM
                                            </span>
                                            <span className="font-mono font-medium text-[#0d171c]">
                                                {
                                                    booking.patient
                                                        .medical_records
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Summary of Changes */}
                            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
                                <h3 className="mb-4 text-lg font-bold text-primary">
                                    Perubahan
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Status
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {bookingStatus}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Dokter
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {doctor?.name ||
                                                booking.doctor.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#49829c]">
                                            Pasien
                                        </span>
                                        <span className="font-medium text-[#0d171c]">
                                            {patientName}
                                        </span>
                                    </div>
                                    {paymentAmount && (
                                        <div className="flex justify-between">
                                            <span className="text-[#49829c]">
                                                Pembayaran
                                            </span>
                                            <span className="font-medium text-green-700">
                                                Rp{' '}
                                                {formatCurrency(paymentAmount)}
                                            </span>
                                        </div>
                                    )}
                                    {checkedInAt && (
                                        <div className="flex justify-between">
                                            <span className="text-[#49829c]">
                                                Check-in
                                            </span>
                                            <span className="font-medium text-blue-700">
                                                ✓
                                            </span>
                                        </div>
                                    )}
                                    {cancelledAt && (
                                        <div className="flex justify-between">
                                            <span className="text-[#49829c]">
                                                Dibatalkan
                                            </span>
                                            <span className="font-medium text-red-700">
                                                ✕
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditBookingPage(props: EditBookingProps) {
    return <EditBookingForm {...props} />;
}

EditBookingPage.layout = (page: React.ReactNode) => (
    <AdminLayout>
        <BookingProvider>{page}</BookingProvider>
    </AdminLayout>
);

export default EditBookingPage;
