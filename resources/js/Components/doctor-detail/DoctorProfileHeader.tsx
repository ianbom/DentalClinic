import { Doctor } from "@/lib/doctors";

interface DoctorProfileHeaderProps {
    doctor: Doctor;
}

export function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-subtle-light overflow-hidden mb-6">
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    {/* Photo */}
                    <div className="relative shrink-0">
                        <div
                            className="size-32 rounded-full border-4 border-gray-100 overflow-hidden bg-cover bg-center shadow-inner"
                            style={{ backgroundImage: `url("${doctor.image}")` }}
                        >
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 border-2 border-white size-5 rounded-full" title="Online"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-3 w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-text-light leading-tight">{doctor.name}</h1>
                                <p className="text-primary font-medium text-lg">{doctor.specialty}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                                <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="font-bold text-text-light text-sm">{doctor.rating}</span>
                                <span className="text-gray-500 text-xs">({doctor.reviews} Review)</span>
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                <span>SIP: 449.1/123.456/DU/2023</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span>{doctor.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-subtle-light text-center ">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">10 Thn</span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pengalaman</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">98%</span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Kepuasan</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-text-light">500+</span>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pasien</span>
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
