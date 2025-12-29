import React from "react";

export function PatientPagination() {
    return (
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-b-xl">
            <span className="text-sm text-slate-500">
                Show <span className="font-semibold text-slate-700">1</span> to{" "}
                <span className="font-semibold text-slate-700">5</span> of{" "}
                <span className="font-semibold text-slate-700">142</span>{" "}
                patients
            </span>
            <div className="flex items-center gap-1">
                <button
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium shadow-sm transition-all">
                    1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all">
                    2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all">
                    3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400">
                    ...
                </span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all">
                    12
                </button>
                <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
