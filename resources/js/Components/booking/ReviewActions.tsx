'use client';

import { Link } from '@inertiajs/react';

interface ReviewActionsProps {
    doctorId: string;
}

export function ReviewActions({ doctorId }: ReviewActionsProps) {
    return (
        <div className="space-y-6 pt-2">
            {/* Checkbox */}
            <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="relative flex items-center pt-0.5">
                    <input
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:border-primary checked:bg-primary hover:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                        type="checkbox"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        check
                    </span>
                </div>
                <div className="select-none text-sm">
                    <span className="text-gray-700">Saya setuju dengan</span>
                    <a
                        className="ml-1 font-medium text-primary hover:underline"
                        href="#"
                    >
                        syarat & ketentuan
                    </a>
                    <span className="text-gray-700">
                        {' '}
                        yang berlaku di klinik ini.
                    </span>
                </div>
            </label>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row">
                <Link
                    href={`/doctors/${doctorId}/booking/customer-data`}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Ubah Data
                </Link>
                <Link
                    href={`/doctors/${doctorId}/booking/success`}
                    className="flex-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-primary/40"
                >
                    <span>Konfirmasi Booking</span>
                    <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                    </span>
                </Link>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="material-symbols-outlined text-[14px]">
                    lock
                </span>
                <span>Data Anda dilindungi dan terenkripsi.</span>
            </div>
        </div>
    );
}
