import { Doctor } from '@/lib/doctors';

interface DoctorProfileHeaderProps {
    doctor: Doctor;
}

export function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
    return (
        <div className="mb-6 overflow-hidden rounded-xl border border-subtle-light bg-white shadow-sm">
            <div className="p-6 md:p-8">
                <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                    {/* Photo */}
                    <div className="relative shrink-0">
                        <div
                            className="size-32 overflow-hidden rounded-full border-4 border-gray-100 bg-cover bg-center shadow-inner"
                            style={{
                                backgroundImage: `url("${doctor.image}")`,
                            }}
                        ></div>
                        <div
                            className="absolute bottom-1 right-1 size-5 rounded-full border-2 border-white bg-green-500"
                            title="Online"
                        ></div>
                    </div>

                    {/* Info */}
                    <div className="w-full flex-1 space-y-3">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold leading-tight text-text-light md:text-3xl">
                                    {doctor.name}
                                </h1>
                                <p className="text-lg font-medium text-primary">
                                    {doctor.specialty}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 rounded-full border border-yellow-100 bg-yellow-50 px-3 py-1">
                                <span
                                    className="material-symbols-outlined text-sm text-yellow-500"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    star
                                </span>
                                <span className="text-sm font-bold text-text-light">
                                    {doctor.rating}
                                </span>
                                <span className="text-xs text-gray-500">
                                    ({doctor.reviews} Review)
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    verified
                                </span>
                                <span>SIP: 449.1/123.456/DU/2023</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    location_on
                                </span>
                                <span>{doctor.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-subtle-light pt-6 text-center md:grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">
                            10 Thn
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Pengalaman
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">
                            98%
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Kepuasan
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">
                            500+
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Pasien
                        </span>
                    </div>
                    {/* <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-primary">{doctor.price}</span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mulai Dari</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
