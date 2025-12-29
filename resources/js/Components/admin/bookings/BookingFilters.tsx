import React from "react";

export function BookingFilters() {
    return (
        <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-end">
            <label className="flex flex-col gap-1.5 flex-1 w-full">
                <span className="text-sm font-semibold text-slate-700">
                    Cari Booking
                </span>
                <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                        search
                    </span>
                    <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-shadow"
                        placeholder="Cari nama, kode, atau no. telp"
                        type="text"
                    />
                </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full md:w-64">
                <span className="text-sm font-semibold text-slate-700">
                    Filter Status
                </span>
                <div className="relative">
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] pointer-events-none">
                        expand_more
                    </span>
                    <select className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm appearance-none cursor-pointer">
                        <option value="">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked-in">Checked-in</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </label>
        </div>
    );
}
