'use client';

import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';

interface DoctorCardProps {
    doctor: Doctor;
    days: string;
}

// Clear booking data from sessionStorage when starting new booking
const clearBookingData = () => {
    try {
        sessionStorage.removeItem('bookingData');
    } catch (error) {
        console.error('Error clearing booking data:', error);
    }
};

export function DoctorCard({ doctor, days }: DoctorCardProps) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-subtle-light bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
            {/* Image Header */}
            <div className="relative h-64 bg-gray-100">
                <img
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                    src={doctor.profile_pic || '/img/default-doctor.png'}
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Doctor Info */}
                <div className="mb-4">
                    <h3 className="mb-1 text-lg font-bold text-text-light transition-colors group-hover:text-primary">
                        {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {doctor.experience} tahun pengalaman
                    </p>
                </div>

                {/* Details */}
                <div className="mb-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                            location_on
                        </span>
                        <span className="text-gray-600">
                            Cantika Dental Care
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                            calendar_month
                        </span>
                        <span className="text-gray-600">{days}</span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <Link
                        href={`/doctors/${doctor.id}/booking`}
                        onClick={clearBookingData}
                        className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                    >
                        <span>Booking</span>
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
