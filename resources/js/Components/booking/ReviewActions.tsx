"use client";

import Link from "next/link";

interface ReviewActionsProps {
    doctorId: string;
}

export function ReviewActions({ doctorId }: ReviewActionsProps) {
    return (
        <div className="pt-2 space-y-6">
            {/* Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
                <div className="relative flex items-center pt-0.5">
                    <input
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary transition-all hover:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                        type="checkbox"
                    />
                    <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
                </div>
                <div className="text-sm select-none">
                    <span className="text-gray-700">Saya setuju dengan</span>
                    <a className="text-primary hover:underline font-medium ml-1" href="#">syarat & ketentuan</a>
                    <span className="text-gray-700"> yang berlaku di klinik ini.</span>
                </div>
            </label>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-2">
                <Link
                    href={`/doctors/${doctorId}/booking/customer-data`}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
                >
                    Ubah Data
                </Link>
                <Link
                    href={`/doctors/${doctorId}/booking/success`}
                    className="flex-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span>Konfirmasi Booking</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-4">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Data Anda dilindungi dan terenkripsi.</span>
            </div>
        </div>
    );
}
