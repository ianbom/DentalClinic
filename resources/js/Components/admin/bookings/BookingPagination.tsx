import React from "react";

export function BookingPagination() {
    return (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
                Menampilkan 1-5 dari 120 Booking
            </span>
            <div className="flex gap-2">
                <button
                    className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-50"
                    disabled
                >
                    <span className="material-symbols-outlined text-[20px]">
                        chevron_left
                    </span>
                </button>
                <button className="p-1 rounded hover:bg-slate-200 text-slate-500">
                    <span className="material-symbols-outlined text-[20px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
