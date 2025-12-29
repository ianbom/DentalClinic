export function DoctorFilters() {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
            <div className="group relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
                    search
                </span>
                <input
                    className="w-full rounded-lg border-none bg-slate-50 py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50"
                    placeholder="Cari nama dokter, NIP, atau spesialisasi..."
                    type="text"
                />
            </div>
            <div className="relative w-full md:w-48">
                <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-slate-50 py-2.5 pl-4 pr-10 text-slate-900 focus:ring-2 focus:ring-primary/50">
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Non-aktif</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    expand_more
                </span>
            </div>
        </div>
    );
}
