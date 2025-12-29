export function BookingPagination() {
    return (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <span className="text-xs text-slate-500">
                Menampilkan 1-5 dari 120 Booking
            </span>
            <div className="flex gap-2">
                <button
                    className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-50"
                    disabled
                >
                    <span className="material-symbols-outlined text-[20px]">
                        chevron_left
                    </span>
                </button>
                <button className="rounded p-1 text-slate-500 hover:bg-slate-200">
                    <span className="material-symbols-outlined text-[20px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
