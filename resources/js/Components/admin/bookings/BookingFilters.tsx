export function BookingFilters() {
    return (
        <div className="flex flex-col items-end gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:p-5">
            <label className="flex w-full flex-1 flex-col gap-1.5">
                <span className="text-sm font-semibold text-slate-700">
                    Cari Booking
                </span>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                        search
                    </span>
                    <input
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 transition-shadow placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Cari nama, kode, atau no. telp"
                        type="text"
                    />
                </div>
            </label>
            <label className="flex w-full flex-col gap-1.5 md:w-64">
                <span className="text-sm font-semibold text-slate-700">
                    Filter Status
                </span>
                <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                        expand_more
                    </span>
                    <select className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50">
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
