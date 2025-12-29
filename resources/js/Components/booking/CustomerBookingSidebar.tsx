import { Doctor } from "@/lib/doctors";

interface CustomerBookingSidebarProps {
    doctor?: Doctor;
}

export function CustomerBookingSidebar({ doctor }: CustomerBookingSidebarProps) {
    return (
        <div className="sticky top-24 flex flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm cursor-default">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-text-light">Ringkasan Booking</h3>
                <button className="text-sm font-medium text-primary hover:text-primary-dark cursor-pointer">Edit</button>
            </div>

            {/* Doctor Info */}
            <div className="flex gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${doctor?.image || ""}")` }}
                    ></div>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-text-light">{doctor?.name || "Loading..."}</p>
                    <p className="text-sm text-gray-500">{doctor?.specialty || ""}</p>
                </div>
            </div>

            {/* Details List */}
            <div className="flex flex-col gap-4 rounded-lg bg-background-light p-4">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">calendar_month</span>
                    <div>
                        <p className="text-sm font-semibold text-text-light">Jumat, 25 Oktober 2023</p>
                        <p className="text-xs text-gray-500">14:00 - 15:00 WIB</p>
                    </div>
                </div>
                {/* Location */}
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
                    <div>
                        <p className="text-sm font-semibold text-text-light">Klinik Gigi Sehat</p>
                        <p className="text-xs text-gray-500">{doctor?.location || "Jakarta"}</p>
                    </div>
                </div>
                {/* Treatment */}
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">medical_services</span>
                    <div>
                        <p className="text-sm font-semibold text-text-light">Konsultasi</p>
                        <p className="text-xs text-gray-500">Durasi: 60 Menit</p>
                    </div>
                </div>
            </div>

            {/* IMPORTANT: PRICE REMOVED AS PER REQUIREMENT */}

            {/* Trust Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <p className="text-xs font-medium">Data Anda aman dan terenkripsi.</p>
            </div>
        </div>
    );
}
