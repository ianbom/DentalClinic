import React from "react";

export function DoctorPagination() {
    return (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
                Menampilkan{" "}
                <span className="font-medium text-slate-900">1-6</span> dari{" "}
                <span className="font-medium text-slate-900">6</span> dokter
            </p>
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center justify-center size-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>
                <button className="flex items-center justify-center size-9 rounded-lg bg-primary text-white font-medium shadow-sm">
                    1
                </button>
                <button
                    className="flex items-center justify-center size-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
