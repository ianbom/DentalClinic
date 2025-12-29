import React from "react";

interface BookingStatusCardProps {
    code: string;
    createdDate: string;
    status: string; // Could be an enum if strictly typed
}

export function BookingStatusCard({
    code,
    createdDate,
    status,
}: BookingStatusCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-black text-slate-900">{code}</h2>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                            {status}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">Dibuat pada {createdDate}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                <button className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-sky-600 text-white px-5 py-2.5 text-sm font-semibold transition-colors shadow-sm gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                        check_circle
                    </span>
                    Konfirmasi Booking
                </button>
                <button className="inline-flex items-center justify-center rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-600 px-5 py-2.5 text-sm font-semibold transition-colors gap-2">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    Batalkan
                </button>
            </div>
        </div>
    );
}
