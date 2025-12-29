export function CheckInSearchForm() {
    return (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col items-end gap-6 lg:flex-row">
                <label className="flex w-full flex-1 flex-col gap-2">
                    <span className="ml-1 text-sm font-semibold text-slate-900">
                        Kode Booking
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            qr_code_2
                        </span>
                        <input
                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan Kode (e.g. BKG-8821)"
                            type="text"
                            defaultValue="BKG-8821"
                        />
                    </div>
                </label>
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-sky-600 active:scale-95 lg:w-auto">
                    <span className="material-symbols-outlined">search</span>
                    Cari Booking
                </button>
            </div>
        </div>
    );
}
