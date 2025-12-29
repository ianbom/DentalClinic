import React from "react";

export function DoctorFilters() {
    return (
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex-1 relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    search
                </span>
                <input
                    className="w-full bg-slate-50 border-none rounded-lg py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50"
                    placeholder="Cari nama dokter, NIP, atau spesialisasi..."
                    type="text"
                />
            </div>
            <div className="w-full md:w-48 relative">
                <select className="w-full appearance-none bg-slate-50 border-none rounded-lg py-2.5 pl-4 pr-10 text-slate-900 focus:ring-2 focus:ring-primary/50 cursor-pointer">
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Non-aktif</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    expand_more
                </span>
            </div>
        </div>
    );
}
