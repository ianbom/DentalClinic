export function BookingTimeline() {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">
                    Timeline Status
                </h3>
            </div>
            <div className="p-6">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute bottom-2 left-3.5 top-2 w-0.5 bg-slate-200"></div>
                    {/* Step 1: Created */}
                    <div className="relative mb-8 flex items-start gap-4">
                        <div className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-white bg-green-100 ring-2 ring-green-100">
                            <span className="material-symbols-outlined text-[16px] font-bold text-green-600">
                                check
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">
                                Booking Dibuat
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">
                                20 Okt 2023, 08:30 WIB
                            </p>
                        </div>
                    </div>
                    {/* Step 2: Confirmation (Current) */}
                    <div className="relative mb-8 flex items-start gap-4">
                        <div className="relative z-10 flex size-8 animate-pulse items-center justify-center rounded-full border-2 border-white bg-primary ring-4 ring-primary/20">
                            <span className="material-symbols-outlined text-[16px] text-white">
                                hourglass_empty
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-primary">
                                Menunggu Konfirmasi Admin
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">
                                Sedang berlangsung
                            </p>
                        </div>
                    </div>
                    {/* Step 3: Check-in (Future) */}
                    <div className="relative mb-8 flex items-start gap-4 opacity-50">
                        <div className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-100">
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                                login
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">
                                Pasien Check-in
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">-</p>
                        </div>
                    </div>
                    {/* Step 4: Completed (Future) */}
                    <div className="relative flex items-start gap-4 opacity-50">
                        <div className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-100">
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                                flag
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-slate-900">
                                Selesai
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">-</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
