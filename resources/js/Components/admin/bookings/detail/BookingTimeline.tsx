import React from "react";

export function BookingTimeline() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">Timeline Status</h3>
            </div>
            <div className="p-6">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                    {/* Step 1: Created */}
                    <div className="relative flex items-start gap-4 mb-8">
                        <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-green-100 border-2 border-white ring-2 ring-green-100">
                            <span className="material-symbols-outlined text-[16px] text-green-600 font-bold">
                                check
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">
                                Booking Dibuat
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                                20 Okt 2023, 08:30 WIB
                            </p>
                        </div>
                    </div>
                    {/* Step 2: Confirmation (Current) */}
                    <div className="relative flex items-start gap-4 mb-8">
                        <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-primary border-2 border-white ring-4 ring-primary/20 animate-pulse">
                            <span className="material-symbols-outlined text-[16px] text-white">
                                hourglass_empty
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-primary">
                                Menunggu Konfirmasi Admin
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">Sedang berlangsung</p>
                        </div>
                    </div>
                    {/* Step 3: Check-in (Future) */}
                    <div className="relative flex items-start gap-4 mb-8 opacity-50">
                        <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-slate-100 border-2 border-white">
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                                login
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">
                                Pasien Check-in
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">-</p>
                        </div>
                    </div>
                    {/* Step 4: Completed (Future) */}
                    <div className="relative flex items-start gap-4 opacity-50">
                        <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-slate-100 border-2 border-white">
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                                flag
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">Selesai</h4>
                            <p className="text-xs text-slate-500 mt-1">-</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
