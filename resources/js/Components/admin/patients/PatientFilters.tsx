import React from "react";

export function PatientFilters() {
    return (
        <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                        placeholder="Cari Nama, NIK, atau WhatsApp..."
                        type="text"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors w-full md:w-auto">
                        <span className="material-symbols-outlined text-[18px]">
                            filter_list
                        </span>
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors w-full md:w-auto">
                        <span className="material-symbols-outlined text-[18px]">
                            download
                        </span>
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
