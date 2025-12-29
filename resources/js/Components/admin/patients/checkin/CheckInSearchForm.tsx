import React from "react";

export function CheckInSearchForm() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 mb-6">
            <div className="flex flex-col lg:flex-row gap-6 items-end">
                <label className="flex flex-col flex-1 w-full gap-2">
                    <span className="text-slate-900 text-sm font-semibold ml-1">
                        Kode Booking
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            qr_code_2
                        </span>
                        <input
                            className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 font-medium placeholder:text-slate-400"
                            placeholder="Masukkan Kode (e.g. BKG-8821)"
                            type="text"
                            defaultValue="BKG-8821"
                        />
                    </div>
                </label>
                <button className="h-12 px-8 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all w-full lg:w-auto active:scale-95">
                    <span className="material-symbols-outlined">search</span>
                    Cari Booking
                </button>
            </div>
        </div>
    );
}
