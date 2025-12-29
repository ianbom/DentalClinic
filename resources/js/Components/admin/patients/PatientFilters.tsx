export function PatientFilters() {
    return (
        <div className="rounded-t-xl border-b border-slate-100 bg-white p-5">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="relative w-full md:max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-slate-400">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full rounded-lg border-none bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary"
                        placeholder="Cari Nama, NIK, atau WhatsApp..."
                        type="text"
                    />
                </div>
                <div className="flex w-full gap-2 md:w-auto">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 md:w-auto">
                        <span className="material-symbols-outlined text-[18px]">
                            filter_list
                        </span>
                        <span>Filter</span>
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 md:w-auto">
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
