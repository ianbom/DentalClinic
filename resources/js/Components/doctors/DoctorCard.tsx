import Link from "next/link";
import { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="group bg-white rounded-2xl border border-subtle-light overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col">
            {/* Image Header */}
            <div className="relative h-48 bg-gray-100">
                <img
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    src={doctor.image}
                />
                {/* Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${doctor.badge.colorClass}`}>
                        {doctor.badge.text}
                    </span>
                </div>
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Doctor Info */}
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-text-light mb-1 group-hover:text-primary transition-colors">
                        {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>

                {/* Details */}
                <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                        <span className="text-gray-600">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
                        <span className="text-gray-600">{doctor.days}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                        <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                        <span className="text-gray-600">{doctor.practiceHours}</span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <Link
                        href={`/doctors/${doctor.id}`}
                        className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-bold px-4 py-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 group/btn"
                    >
                        <span>Lihat Profil</span>
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
