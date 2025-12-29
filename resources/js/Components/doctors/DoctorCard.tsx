'use client';

import { Doctor } from '@/lib/doctors';
import { Link } from '@inertiajs/react';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-subtle-light bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
            {/* Image Header */}
            <div className="relative h-48 bg-gray-100">
                <img
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                    src={doctor.image}
                />
                {/* Badge */}
                <div className="absolute left-3 top-3">
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${doctor.badge.colorClass}`}
                    >
                        {doctor.badge.text}
                    </span>
                </div>
                {/* Favorite Button */}
                <button className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-red-500">
                    <span className="material-symbols-outlined text-[18px]">
                        favorite
                    </span>
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Doctor Info */}
                <div className="mb-4">
                    <h3 className="mb-1 text-lg font-bold text-text-light transition-colors group-hover:text-primary">
                        {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>

                {/* Details */}
                <div className="mb-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                            location_on
                        </span>
                        <span className="text-gray-600">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                            calendar_month
                        </span>
                        <span className="text-gray-600">{doctor.days}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                            schedule
                        </span>
                        <span className="text-gray-600">
                            {doctor.practiceHours}
                        </span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <Link
                        href={`/doctors/${doctor.id}`}
                        className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                    >
                        <span>Lihat Profil</span>
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
