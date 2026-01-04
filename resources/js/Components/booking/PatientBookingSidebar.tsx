import { useBooking } from '@/context/BookingContext';
import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';

interface CustomerBookingSidebarProps {
    doctor?: Doctor;
    doctorId?: string;
}

export function CustomerBookingSidebar({
    doctor,
    doctorId,
}: CustomerBookingSidebarProps) {
    const { bookingData } = useBooking();

    return (
        <div className="border-border-light overflow-hidden rounded-xl border bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/10 bg-primary/5 px-4 py-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                    <span className="material-symbols-outlined text-lg">
                        calendar_clock
                    </span>
                    Ringkasan Jadwal
                </h3>
                {doctorId && (
                    <Link
                        href={`/doctors/${doctorId}/booking`}
                        className="text-xs font-medium text-primary hover:underline"
                    >
                        Ubah
                    </Link>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                {/* Doctor Info */}
                <div className="flex flex-1 items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                        <img
                            alt={doctor?.name || 'Doctor'}
                            className="h-full w-full object-cover"
                            src={
                                doctor?.profile_pic || '/img/default-doctor.png'
                            }
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-text-light">
                            {doctor?.name || 'Loading...'}
                        </p>
                        <p className="text-text-secondary text-xs">
                            {bookingData.service || 'Konsultasi'}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="bg-border-light h-px w-full sm:h-8 sm:w-px"></div>

                {/* Date & Time Info */}
                <div className="flex flex-1 flex-col gap-1 sm:pl-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-text-light">
                        <span className="material-symbols-outlined text-text-secondary text-base">
                            event
                        </span>
                        {bookingData.selectedDate || 'Pilih Tanggal'}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium text-text-light">
                        <span className="material-symbols-outlined text-text-secondary text-base">
                            schedule
                        </span>
                        {bookingData.selectedTime
                            ? `${bookingData.selectedTime} WIB`
                            : 'Pilih Waktu'}
                    </p>
                </div>
            </div>
        </div>
    );
}
