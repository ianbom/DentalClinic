import { Doctor } from '@/types';

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
                                backgroundImage: `url("${doctor.profile_pic || '/img/default-doctor.png'}")`,
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
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                            {doctor.sip && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        verified
                                    </span>
                                    <span>SIP: {doctor.sip}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    location_on
                                </span>
                                <span>Cantika Dental Care</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-subtle-light pt-6 text-center md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">
                            {doctor.experience} Thn
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Pengalaman
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">
                            99%
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Kepuasan
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
