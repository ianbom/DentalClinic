import React from "react";

export function BookingHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 text-3xl font-black tracking-tight">
                    Manajemen Booking
                </h1>
                <p className="text-slate-500 text-base">
                    Kelola daftar booking, jadwal, dan status pasien di sini.
                </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary hover:bg-sky-600 text-white text-sm font-bold shadow-sm transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                    add
                </span>
                <span>Tambah Booking Baru</span>
            </button>
        </div>
    );
}
